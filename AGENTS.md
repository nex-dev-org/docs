# NEX.dev docs — project instructions

## About this project

- Documentation for NEX.dev's FiveM scripts.
- Pages are MDX files with YAML frontmatter; one folder per script.
- Navigation and site configuration live in `docs.json`.

## Structure

- One folder per resource (e.g. `nexdev_garages/`, `nexdev_queue/`), each with an
  `overview` page plus pages like `installation`, `configuration`,
  `troubleshooting`.
- Shared pages live under `general/`; release notes under `changelog/`.
- Internal links are root-relative and omit the file extension
  (e.g. `/nexdev_garages/installation`).

## Terminology

- Refer to products by their full name: "NEX.dev Garage", "NEX.dev Queue", etc.
- "Resource" or "script" for a FiveM resource; "framework" for QBCore / Qbox / ESX.

## Style preferences

- Use active voice and second person ("you").
- Keep sentences concise — one idea per sentence.
- Use sentence case for headings.
- Bold for UI elements: Click **Settings**.
- Code formatting for file names, commands, paths, and config keys.
- Use callouts (`<Info>`, `<Warning>`, `<Danger>`) for notes and cautions.

## Confidentiality

The scripts are sold as CFX-escrowed products. The docs describe **what a script
does and how to use it — never how it is built.**

- Never name UI frameworks, libraries, or build tooling (React, Vue, Svelte,
  Tailwind, Node, npm, bun, Vite, etc.).
- Never document internal source structure (`web/src`, `web/dist`, `web/build`,
  `client/`, `server/` file names) or include UI build/rebuild instructions.
  If UI files are missing, the fix is "re-download from your purchase".
- Say "the UI ships ready to use — no build step" instead of naming the stack.
- Fine to mention: user-editable files (`config.lua`, `install/`, SQL files),
  public third-party dependencies (`ox_lib`, `oxmysql`, `ox_inventory` paths),
  and generic FiveM platform terms (NUI focus, ACE permissions, convars).

## Branding

- Colors are black (`#000000`) and white (`#FFFFFF`).
- Logos: `logo/nexdev-black.png` (light mode), `logo/nexdev-logo.png` (dark mode).
