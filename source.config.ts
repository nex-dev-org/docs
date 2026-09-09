import { defineConfig } from 'fumadocs-mdx/config';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      // `server.cfg` snippets use ```cfg; highlight them like shell.
      // The alias target must be preloaded, otherwise Shiki reports the
      // alias as loaded before the real grammar is and throws.
      langAlias: {
        cfg: 'shellscript',
      },
      langs: ['shellscript', 'lua', 'sql', 'json'],
      // Never fail a build on a language Shiki doesn't know.
      fallbackLanguage: 'plaintext',
    },
  },
});
