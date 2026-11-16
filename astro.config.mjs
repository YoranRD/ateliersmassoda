import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ateliersmassoda.fr',
  base: '/',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !/\/(boutique|journal)\/$/.test(page) })],
});
