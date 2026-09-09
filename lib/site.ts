/** Site-wide constants shared by layouts and metadata. */
export const site = {
  name: 'NEX.dev',
  title: 'NEX.dev Documentation',
  description:
    'Install guides, configuration references, and troubleshooting for every NEX.dev FiveM script.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.nexdev.store',
  links: {
    discord: 'https://discord.gg/nexdev',
    website: 'https://nexdev.store',
  },
} as const;
