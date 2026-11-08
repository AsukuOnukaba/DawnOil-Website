import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://dawnoilinc.com',
  build: {
    assets: '_assets',
  },
});
