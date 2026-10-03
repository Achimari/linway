# linway — site

A one-page photographic essay for Lina Makarenko: a short LINWAY intro, then six one-screen states — Home (“What next?”), Story, The year, First month, Support, Prayer. Each chapter has its own ground colour, headline and typographic gesture, and most bring their own photographs. One primary action, “Support Lina’s year” (with the line “Opens her Stewardship page”), goes straight to Stewardship in every state; Instagram is a quieter secondary link. On phones the two ride in a slim bar at the bottom of the screen, so the support link is in the first viewport of every chapter; at the end of a page the bar rests in place and covers nothing. Support also carries a quiet “Contact Lina” block under the action (WhatsApp and email, from `site.contact`). Static Astro build; the states switch with CSS `:target`, and a ~2 KB inline script adds the intro animation, `aria-current`, and Escape-to-Home.

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
| `@fontsource/ibm-plex-mono` | 5.3.0 | IBM Plex Mono 500, Latin — section labels. SIL OFL 1.1, self-hosted |

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
| Page copy, the intro, the six scenes, layout, enhancement script | `src/pages/index.astro` |
| Copy sources and what still needs Lina’s approval | `../docs/COPY-LEDGER.md` |
| Donation link, Instagram, release gates, domain | `src/data/site.ts` |
| The Bible photograph (with rights note) | `src/assets/hero/hero-sky.jpg`, `src/assets/hero/SOURCE.md` |
| Gallery photographs (with consent notes) | `src/assets/gallery/*.jpg`, `src/assets/gallery/SOURCE.md` |
| Icons (outward, back and next arrows, Instagram) | `src/components/Icon.astro` |
| Favicons: the supplied oxblood cross and path set (`linway-favicon-A`, added 3 October 2026) | `public/favicon.ico`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, and `site.webmanifest` |
| Privacy audit | `scripts/audit-dist.ts` |
| Tests | `tests/site.test.ts` (build, routes, actions, scene contract, audit) |

## Intro and chapters

**Intro.** A full-screen LINWAY with an oxblood Y. Click or tap anywhere, or press Enter: the Y’s arms fade, its stem grows into a full-height line, and the line travels left, thinning, as the edge that reveals the page (about 0.8 s, Web Animations API). “Skip intro”, Escape, or a second click finishes it at once. It shows only when the inline head script sets `html.entry`: JavaScript on, first visit this session (`sessionStorage`), no `#chapter` in the URL, and motion allowed. Both intro links point to `#home`, so if the page script fails the link still gets the visitor in (CSS hides the intro once a scene is targeted). The page’s own arrival animation waits behind the intro and plays as it ends.

**Chapters.** The header links are plain `#story`, `#year`, `#month`, `#support`, `#prayer` anchors; the wordmark goes to `#home`, and each chapter has a “Next” link (Prayer’s returns to the start). Each chapter is a `<section>` scene, and CSS shows the one that is the URL’s `:target` (Home when none is). So the state is the URL: deep links, browser Back and the whole site work without JavaScript, and rapid switching can never leave stale text or a wrong active link. The script sets `aria-current` and makes Escape go Home, returning focus to that chapter’s link. A chapter link always lands at the top of the page.

| Chapter | Ground | Headline | Gesture | Photographs |
| --- | --- | --- | --- | --- |
| Home | sky and mist | What next? | — | Bible (background) |
| 01 Story | warm paper `#f3eadb`, chair green `#1f3a2c`, rust `#93441f` | Faith became my own. | the route line draws under the four turning points (its only rule) | gathering, dissolving into the paper |
| 02 The year | night blue `#0e1233`, lamp amber `#f2c27b`, violet `#9aa3ff` | 2026–27 (in lamp amber) | Learn / Serve / Grow / Discern | All Souls at night melting into the ground; Free English via the switch |
| First month | café oat `#e7e0c9`, espresso ink `#2c2219`, oxblood accent `#8b2e3d` | One month in. | four short lines; “More from the month” opens in place (`<details>`) | café (friends), full height, dissolving into the oat ground |
| 04 Support | oxblood over the Bible | Voluntary. Unpaid. | inverted Stewardship button | Bible (background) |
| 05 Prayer | mist over the Bible | — | the numbered requests at headline scale | Bible (background) |

Story, The year and First month each treat the photograph as part of the scene: Story's fills the right of the poster and dissolves into the paper behind the text (a CSS mask), The year's fades into the night ground on two edges, and First month's full-height friends photo dissolves into its oat ground. Photographs carry no visible captions; their alt text describes them. The year shows one photograph at a time; a switch of native radio buttons under the text (legend “Photo”, for assistive tech only) crossfades to the second (arrow keys, works without script). Each chapter also recolours the Stewardship button (`--btn`, `--btn-ink`). On phones the photograph leads each chapter and fades into the ground; the route turns vertical. Off-stage scenes collapse to zero height rather than being positioned, so a panel always measures against the whole poster. Off-stage scenes leave the layout, so the page is only as tall as the current chapter; at short heights, 200% zoom and on phones for photo chapters, the page scrolls normally.

Motion: on a change the Bible photo re-crops (650 ms), the ground colour and accent cross-fade, the old scene fades in 130 ms, then the new rule draws, lines settle in turn and photographs settle inside their frames. All CSS transitions, so they retarget on rapid input. Under `prefers-reduced-motion` there is no intro and recomposition is immediate.

The page carries no review markers. What still needs Lina’s approval, and why, is in `docs/COPY-LEDGER.md`.

## Copy and sources

The page text was condensed from Lina’s prayer & support letter and her draft text (`Untitled document.docx`, read locally, never copied), with high-level facts cross-checked against the private programme documents (read locally, never copied). Verified facts are stated plainly (for example, that she was **accepted** onto the 2026–27 Ministry Training Scheme at All Souls Church, London, and that the scheme is voluntary and unpaid). Lina’s first-month update (`My First Month of MT.docx`, read locally, never copied) describes the scheme and Free English as under way; The year, First month and Prayer use that account, still pending her approval. The page publishes no age, identifiers, immigration or financial details, and no contact details other than Lina’s two supplied ones (`site.contact`). Every line and its source is in `docs/COPY-LEDGER.md`. `copyReviewedByLina` stays `false` until Lina approves the final wording.

- **Donate:** `site.donate` → `https://www.stewardship.org.uk/partners/20645926` (supplied by the site owner; the Stewardship page is titled with Lina’s name). The site links out; it has no payment form.
- **Contact:** `site.contact` → WhatsApp `https://wa.me/447778474925` (+44 77 7847 4925) and `mailto:linamak1111@gmail.com`, shown only in Support. Supplied by the site owner.
- **Instagram:** `site.instagram` → `https://www.instagram.com/linren__/`. A follow/contact route, never the donation link.

## Before any public deployment

1. Lina approves the page wording → set `copyReviewedByLina: true`.
2. Publication rights for `hero-sky.jpg` are confirmed (or the image is replaced) → set `heroRightsConfirmed: true`.
3. Lina confirms whether she is in London and serving at Free English → set `currentStatusConfirmed: true` and, if she wants, switch the year chapter to her present-tense wording (see `docs/COPY-LEDGER.md`).
4. Written consent for every gallery photo (a guardian for the minor in `gathering.jpg`) → set each `site.photos[*].consentConfirmed: true`, or remove the photo. See `src/assets/gallery/SOURCE.md`.
5. A production domain is chosen → set `productionUrl` (enables canonical URLs, removes `noindex`, opens `robots.txt`).
6. Run the full gate:

   ```sh
   npm ci && npm run check && npm test && npm run build && npm run audit:release
   ```

7. Deploy **only** `site/dist/`. Never deploy the workspace root, which holds private source documents.

`audit:dist` fails if `dist/` contains: any image other than Astro’s resized derivatives of the five expected photographs, a missing photograph, or an image over 600 KB; document files (PDF/DOCX/MD…); private-source, reference-screenshot or retired-photo filenames; an unexpected HTML page or a retired route that isn’t a redirect home; document-number-like identifiers, phone numbers, emails or `wa.me`/`tel:` links other than the exact `site.contact` values, postcodes/addresses, money figures, or immigration/identity wording; `href="#"`; HTML or source comments (such as `// Copy:`); TODO/placeholder text; or dev-toolbar markup. The test plants an identifier, a `// Copy:` comment, an original photo, and an extra email, phone number and WhatsApp link to prove the audit catches them while still passing Lina’s two contacts.
