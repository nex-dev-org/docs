# NEX.dev Documentation

The official documentation for NEX.dev's FiveM scripts — install guides,
configuration references, and troubleshooting for every resource.

Built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Editing

Pages are MDX files with YAML frontmatter under `content/docs/`, organized
into one folder per script:

```
content/docs/
├── index.mdx              # home page (/)
├── meta.json              # top-level sidebar order and section labels
├── general/               # getting started, FAQ, support
├── changelog/
└── nexdev_<script>/       # one folder per resource
    ├── meta.json          # sidebar title, icon, page order
    ├── overview.mdx
    ├── installation.mdx
    └── ...
```

The sidebar is driven by `meta.json` files. Each script folder lists its
pages in order and picks a [lucide](https://lucide.dev/icons) icon name:

```json
{
  "title": "nexdev_garages",
  "icon": "Warehouse",
  "pages": ["overview", "installation", "configuration", "troubleshooting"]
}
```

A page that is not listed in its folder's `meta.json` will not appear in the
sidebar.

### Components

Fumadocs' MDX components are available in every page without imports:

```mdx
<Callout type="info">Good to know.</Callout>
<Callout type="warn">Be careful.</Callout>
<Callout type="error">This will break things.</Callout>

<Cards>
  <Card title="Installation" icon="Rocket" href="/nexdev_garages/installation">
    Get the resource running.
  </Card>
</Cards>
```

`Card` accepts any lucide icon name as a string, plus `"Discord"`.

Give a heading a stable anchor with `## Heading text [#custom-id]`.

## Local preview

```
npm install
npm run dev
```

The site is served at `http://localhost:3000`.

## Checks

```
npm run build          # full production build; fails on MDX or type errors
npm run check:links    # verify every internal link and #anchor (run after build)
```

## Publishing

This is a standard Next.js app. Deploy it to Vercel, Netlify, or any Node
host. Set `NEXT_PUBLIC_SITE_URL` to the public URL so canonical links, the
sitemap, and robots.txt point at the right domain.
