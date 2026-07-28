# Discord activity log — setup

`workflows/discord-activity.yml` posts push, pull-request and issue cards to
Discord via [Pipeline Pling](https://github.com/Qbox-project/pipeline-pling).

It is **separate from the release announcement**. Two different pipelines, two
different Discord mechanisms, two different channels:

| | `discord-activity.yml` | `release-discord.yml` |
|---|---|---|
| Fires on | every push / PR / issue | a published release |
| Auth | Discord **webhook URL** | Discord **bot token** |
| Secret | `DISCORD_WEBHOOK_URL` | `DISCORD_BOT_TOKEN` |
| Channel | internal dev feed | public announcements |

## Configuration — per repository, not org-wide

> **`nex-dev-org` is on GitHub Free.** Organization-level secrets and variables
> are *not readable by private repositories* on that plan — the lookup silently
> resolves to an empty string and the workflow behaves as though unconfigured.
> There is no "all repositories" access policy to select. Every secret must
> therefore be set on **each repository individually**. This is the same reason
> `DISCORD_BOT_TOKEN` is already a per-repo secret everywhere.

### 1. Create the Discord webhook

In the target Discord channel: *Edit Channel → Integrations → Webhooks → New
Webhook*, then **Copy Webhook URL**. It looks like:

```
https://discord.com/api/webhooks/<id>/<token>
```

Do **not** append `/github` — that suffix is for GitHub's own native webhook
format and Pipeline Pling does not use it.

### 2. Set it as a repository secret on every repo

Fastest path is the CLI, which avoids doing this 18 times by hand:

```bash
URL="https://discord.com/api/webhooks/<id>/<token>"
for r in nexdev_animpos nexdev_bossmenu nexdev_crafting nexdev_crutchsystem \
         nexdev_dealerships nexdev_donatorsystem nexdev_elevators nexdev_gangs \
         nexdev_garages nexdev_hotels nexdev_itemwhitelist nexdev_loadingscreen \
         nexdev_queue nexdev_scalemenu nexdev_uipack nexdev_watermark \
         versions docs; do
  printf '%s' "$URL" | gh secret set DISCORD_WEBHOOK_URL --repo "nex-dev-org/$r"
done
```

Or per repo in the UI: *Settings → Secrets and variables → Actions → New
repository secret*, named `DISCORD_WEBHOOK_URL`.

### 3. Optional repository variables

*Settings → Secrets and variables → Actions → Variables*

| Variable | Effect |
|---|---|
| `DISCORD_THREAD_ID` | Post into a forum thread instead of the channel |
| `EMBED_COLOR` | Brand accent, `#RRGGBB`. Defaults to `#FF3B3B` |

`EMBED_COLOR` is also read by the release workflow, so setting it keeps the two
feeds visually consistent.

> The public repos (`versions`, `docs`) *could* use org-level secrets, since the
> Free-plan restriction only applies to private repos. They are configured
> per-repo anyway so that every repo in the org works the same way.

## Retiring the old org webhook

`nex-dev-org` has a webhook under **Settings → Webhooks** posting to a Discord
`…/github` endpoint. Once the cards above are arriving, every push is being
reported **twice** — GitHub's plain embed and a Pipeline Pling card. To finish
the migration:

1. Open <https://github.com/organizations/nex-dev-org/settings/hooks> and copy
   the payload URL.
2. Strip the trailing `/github` — that remainder is the value for the
   `DISCORD_WEBHOOK_URL` secret in step 2 above.

   ```
   https://discord.com/api/webhooks/<id>/<token>/github   <- old org webhook
   https://discord.com/api/webhooks/<id>/<token>          <- the secret value
   ```

3. Confirm a Pipeline Pling card lands in Discord.
4. Delete (or untick **Active** on) the org webhook.

Reusing the same Discord webhook for both is fine — it is the same channel and
the same credential, just consumed two different ways.

## Rate limiting

Every repo posts to the same webhook, and Discord allows roughly 5 requests per
2 seconds per webhook. Pushing a batch of repos at once — a multi-script
release, for example — makes them all post simultaneously and Discord answers
`429 Too Many Requests`. Pipeline Pling posts once and does not retry, so those
cards would simply be lost.

The workflow handles this in two steps:

1. **Stagger** — each run waits `hash(repo + run_id) % 15` seconds before
   posting, so sibling repos land in different slots. A single push still posts
   almost immediately, and the delay stays inside the one-minute billing
   round-up, so it costs nothing extra.
2. **Retry** — the post is `continue-on-error`, and on failure the job backs off
   8 seconds and posts once more. Only if *both* attempts fail does the run go
   red, via the final `Report result` step.

If you ever see runs failing on 429 despite this, raise the stagger modulus.

## Silencing a commit

Put `!silent` in a commit **body** to keep it out of the feed, or `!anon` to
redact it entirely. Release version-bump commits are a good candidate for
`!silent`, since `release-discord.yml` already announces them.

## Updating the action

The workflow tracks `@v1`, so patch and minor releases arrive automatically. To
pin to an exact commit instead, replace `@v1` with the commit SHA of the
desired tag across all repos.
