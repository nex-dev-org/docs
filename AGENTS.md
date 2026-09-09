# NEX.dev docs — project instructions

## About this project

- Documentation for NEX.dev's FiveM scripts.
- Built with Fumadocs on Next.js. Pages are MDX files with YAML frontmatter
  under `content/docs/`; one folder per script.
- Sidebar order, section labels, and folder icons live in `meta.json` files
  (one at `content/docs/meta.json`, one per script folder).

## Structure

- One folder per resource (e.g. `content/docs/nexdev_garages/`), each with an
  `overview` page plus pages like `installation`, `configuration`,
  `troubleshooting`.
- Shared pages live under `content/docs/general/`; release notes under
  `content/docs/changelog/`.
- Page URLs mirror the folder path with no prefix:
  `content/docs/nexdev_garages/installation.mdx` -> `/nexdev_garages/installation`.
- Internal links are root-relative and omit the file extension
  (e.g. `/nexdev_garages/installation`).
- Adding a page: create the `.mdx` file **and** add its name to the folder's
  `meta.json` `pages` array, or it will not show in the sidebar.
- Adding a script: create the folder, its pages, a `meta.json` with `title`,
  `icon` (a lucide icon name), and `pages`, then add the folder name to
  `content/docs/meta.json` under the `---Scripts---` separator. Also add a
  `<Card>` for it on `content/docs/index.mdx`.
- Site files: `app/` (layouts, routes), `lib/` (content source, nav links,
  site constants), `components/` (MDX component overrides, logo, icons),
  `source.config.ts` (MDX/highlighting options).

## Components

- Callouts: `<Callout type="info">`, `<Callout type="warn">`,
  `<Callout type="error">`. Put a blank line after the opening tag and before
  the closing tag.
- Cards: `<Cards>` containing `<Card title="..." icon="Rocket" href="...">`.
  `icon` is a lucide icon name string (or `"Discord"`).
- Custom heading anchors: `## Heading text [#custom-id]`. Use these when a
  heading contains punctuation (em dashes, slashes, dots) so links stay clean.
- Code fences: `lua`, `sql`, `json`, and `cfg` (for `server.cfg`) are
  highlighted. Unknown languages fall back to plain text.

## Terminology

- Refer to products by their full name: "NEX.dev Garage", "NEX.dev Queue", etc.
- "Resource" or "script" for a FiveM resource; "framework" for QBCore / Qbox / ESX.

## Style preferences

- Use active voice and second person ("you").
- Keep sentences concise — one idea per sentence.
- Use sentence case for headings.
- Bold for UI elements: Click **Settings**.
- Code formatting for file names, commands, paths, and config keys.
- Use callouts for notes and cautions.

## Checks

- `npm run build` must pass before pushing; it fails on MDX or type errors.
- `npm run check:links` (after a build) verifies every internal link and
  `#anchor` resolves.

## Confidentiality

The scripts are sold as CFX-escrowed products. The docs describe **what a script
does and how to use it — never how it is built.**

- Never name UI frameworks, libraries, or build tooling (React, Vue, Svelte,
  Tailwind, Node, npm, bun, Vite, etc.) **in page content**. This rule is about
  the scripts, not about this docs site itself.
- Never document internal source structure (`web/src`, `web/dist`, `web/build`,
  `client/`, `server/` file names) or include UI build/rebuild instructions.
  If UI files are missing, the fix is "re-download from your purchase".
- Say "the UI ships ready to use — no build step" instead of naming the stack.
- Fine to mention: user-editable files (`config.lua`, `install/`, SQL files),
  public third-party dependencies (`ox_lib`, `oxmysql`, `ox_inventory` paths),
  and generic FiveM platform terms (NUI focus, ACE permissions, convars).

## Branding

- Colors are black (`#000000`) and white (`#FFFFFF`); the site uses the
  Fumadocs `black` preset.
- Logos in `public/logo/`: `nex-wordmark.png` (header; white on transparent, CSS-inverted in light mode) and `nex-logo.png` (mark). Favicons are `app/icon.png` and `app/apple-icon.png`, generated from the mark on a black rounded tile.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
