// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/data/site.ts';

// No production domain is confirmed yet. When `site.productionUrl` is set,
// Astro gets a `site` value and pages emit canonical URLs and allow indexing.
export default defineConfig({
  site: site.productionUrl ?? undefined,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  // The site is one page. Old routes from the multi-page version point home;
  // in a static build Astro writes a small meta-refresh page for each.
  redirects: {
    '/story': '/',
    '/experience': '/',
    '/support': '/',
    '/journal': '/',
  },
});
