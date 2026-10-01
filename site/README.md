# linway — site

A one-screen poster for Lina Makarenko: one photograph, the headline “What next?”, one sentence, two actions (give through Stewardship, follow on Instagram), and an index of three short information sheets (01 Story, 02 The year, 03 Prayer). Static Astro build; the only JavaScript is a 1.6 KB inline script that turns the index into sheet toggles.

## Requirements

- Node.js **22.18 or newer** (the test and audit scripts run TypeScript directly). Built and verified with Node 25.2.1.
- npm (the lockfile pins every dependency).

| Package | Version | Why |
| --- | --- | --- |
| `astro` | 7.3.5 | Static site and image optimisation (includes `sharp`) |
| `@astrojs/check` | 0.9.10 (dev) | `npm run check` |
| `typescript` | 6.0.3 (dev) | Required by `@astrojs/check` (TypeScript 7 is outside its supported range) |
| `@types/node` | 22.20.4 (dev) | Type checking for tests and scripts |
| `@fontsource-variable/archivo` | 5.3.0 | Archivo variable (width axis) — headline and text. SIL OFL 1.1, self-hosted |
| `@fontsource/ibm-plex-mono` | 5.3.0 | IBM Plex Mono 500, Latin — index labels. SIL OFL 1.1, self-hosted |

## Commands

Run everything from `site/`.

```sh
cd site
npm install                              # or `npm ci` for an exact lockfile install
npm run dev -- --host 127.0.0.1          # dev server at http://127.0.0.1:4321
npm run check                            # Astro + TypeScript checks
npm test                                 # builds the site and checks the route contract and audit
npm run build                            # static output in dist/
npm run preview -- --host 127.0.0.1      # serve dist/ (Astro 7 runs this in the background)
npx astro preview stop                   # stop the preview server
npm run audit:dist                       # privacy audit of dist/ (should pass now)
npm run audit:release                    # same + open deployment decisions (fails until resolved)
```

## Route contract

| Path | What it is |
| --- | --- |
| `/` | The page |
| `/404.html` | Not-found page linking home and to Stewardship |
| `/story/`, `/experience/`, `/support/`, `/journal/` | Retired routes from the earlier multi-page site; static meta-refresh redirects to `/` (configured in `astro.config.mjs`) |
| `/robots.txt` | `Disallow: /` until a production URL is set |

The earlier multi-page version (story, experience, support, journal with publication rules, three extra photos) was retired on 2 October 2026. A full copy of its source is in the workspace at `.backups/site-before-single-page-2026-10-01.tar.gz` (outside `site/`, gitignored).

## Where things live

| What | File |
| --- | --- |
| Page copy, sheet text, layout, panel script | `src/pages/index.astro` |
| Sheet open/close/focus rules (pure, unit-tested) | `src/lib/panels.ts` |
| Donation link, Instagram, release gates, domain | `src/data/site.ts` |
| The photograph (with rights note) | `src/assets/hero/hero-sky.jpg`, `src/assets/hero/SOURCE.md` |
| Icons (outward arrow, Instagram, close) | `src/components/Icon.astro` |
| Favicon: horizon + journey marker on oxblood | `public/favicon.svg`, with `favicon-32.png` (fallback) and `apple-touch-icon.png` (180 px, full-bleed) rendered from it with `sharp` |
| Privacy audit | `scripts/audit-dist.ts` |
| Tests | `tests/panels.test.ts` (sheet state + focus), `tests/site.test.ts` (build, routes, no-JS sheets, audit) |

## Copy and sources

## Information sheets

The index items are plain `#story` / `#year` / `#prayer` links in the HTML. Without JavaScript they jump to the same text, rendered as a section under the poster. With JavaScript they become toggle buttons (`aria-expanded`, `aria-controls`); one sheet opens below the index, focus moves into it, and the close button, Escape, or the same index button closes it and returns focus to that button. Switching goes straight to the other sheet. Long text scrolls inside the sheet at large zoom. On desktop the index sits in the left type column under the wordmark and the sheet hangs from it, so the Bible stays clear; an oxblood marker slides to the active cell and sits on the sheet’s top edge. Arrival runs once: sky colour → photo rises in → headline → index rule and cells. Sheets unfold downward with the title, then body, a beat behind; all open/close/switch motion is CSS transitions, so rapid input reverses cleanly. Under `prefers-reduced-motion` nothing moves (sheets and marker switch instantly).

## Copy and sources

The page text was condensed from Lina’s prayer & support letter and her draft text (`Untitled document.docx`, read locally, never copied), with high-level facts cross-checked against the private programme documents (read locally, never copied). It says only that she was **accepted** onto the 2026–27 Ministry Training Scheme at All Souls Church, London. It does not claim current participation or a specific ministry placement, and it publishes no age, contact details, identifiers, immigration or financial details. `copyReviewedByLina` stays `false` until Lina approves the final wording.

- **Donate:** `site.donate` → `https://www.stewardship.org.uk/partners/20645926` (supplied by the site owner; the Stewardship page is titled with Lina’s name). The site links out; it has no payment form.
- **Instagram:** `site.instagram` → `https://www.instagram.com/linren__/`. A follow/contact route, never the donation link.

## Before any public deployment

1. Lina approves the page wording → set `copyReviewedByLina: true`.
2. Publication rights for `hero-sky.jpg` are confirmed (or the image is replaced) → set `heroRightsConfirmed: true`.
3. A production domain is chosen → set `productionUrl` (enables canonical URLs, removes `noindex`, opens `robots.txt`).
4. Run the full gate:

   ```sh
   npm ci && npm run check && npm test && npm run build && npm run audit:release
   ```

5. Deploy **only** `site/dist/`. Never deploy the workspace root, which holds private source documents.

`audit:dist` fails if `dist/` contains: document files (PDF/DOCX/MD…); private-source, reference-screenshot or retired-photo filenames; an unexpected HTML page or a retired route that isn’t a redirect home; document-number-like identifiers, phone numbers, emails, postcodes/addresses, money figures, or immigration/identity wording; `href="#"`; HTML or source comments (such as `// Copy:`); TODO/placeholder text; or dev-toolbar markup. The test plants an identifier and a `// Copy:` comment to prove the audit catches them.
