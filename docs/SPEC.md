# linway — website brief

Status: proposed build specification, prepared 1 October 2026. This pass delivers analysis and starter material; the application will be built in a later step.

## Objective

An English-language home for Lina Makarenko's ministry journey and supporter updates, with a secondary experience/CV page. A visitor should understand who Lina is, read an honest update, and find a real way to stay connected or support her when she has provided one. The user confirmed both language and ministry-first emphasis.

Proposed positioning: **A personal record of faith, service, and learning along the way.**

Primary audiences are friends, church community, and supporters. Secondary audiences are ministry teams or other people who need an overview of her experience. The site should feel personal, thoughtful, and welcoming. It must not imply that linway is an official church programme or registered charity.

## Pages and navigation

| Route | Purpose | Required content |
| --- | --- | --- |
| `/` | Introduce Lina and orient readers | Hero, short introduction, journey overview, recent published update or honest empty state, supporter invitation |
| `/story/` | Tell the personal journey | Edited source narrative, service and learning, current chapter only when confirmed |
| `/journal/` | Keep supporters informed | Date-sorted published entries, simple category labels, empty state when none exist |
| `/journal/[slug]/` | Read one update | Title, actual publication date, category, readable article, back link; only real published entries get routes |
| `/experience/` | Read the CV | Ministry experience, other work, education, skills; dates and completion status only when evidenced |
| `/support/` | Explain ways to support | Prayer/encouragement copy; contact or official giving links only after confirmation |
| `/404.html` | Recover from an invalid link | Brief message and working link home |

Desktop navigation: My story · Journal · Support. Experience lives in the story page and footer so the ministry narrative leads. On mobile, keep a compact two-line navigation if it fits; introduce a menu only when necessary. Logo always links home. No search or filtering until the volume of published writing justifies it.

## Homepage order

1. **Identity and invitation.** linway wordmark; Lina's name; proposed headline “Faith, people, and the next step.” Use the supplied sky image with a carefully positioned crop. Primary action: My story. Secondary: Read the journal.
2. **Short introduction.** A first-person paragraph in Lina's voice, with a real portrait only when provided and approved. Do not make a generic or generated person stand in for Lina.
3. **Along the way.** A few evidence-backed story moments arranged as open editorial rows. The detail is in the content draft; avoid unconfirmed chronological dates.
4. **From the journal.** Up to three published updates. If none exist: “Updates will appear here as I begin sharing this part of the journey.” No mock articles presented as published.
5. **Walk alongside.** An understated invitation to pray, read updates, or send encouragement. `/support/` must accurately describe which actions are available.
6. **Footer.** Name, navigation including Experience, confirmed contact/social links if supplied. No fabricated email address or production domain.

## Content architecture

Copy source: `docs/CONTENT-DRAFT.md`; factual provenance and unresolved claims: `docs/CONTENT-AUDIT.md`. Starter data in `starter/content/site.json` intentionally leaves missing URLs and current status null. Editorial article ideas in `starter/content/journal-ideas.json` are not published articles.

Journal fields: `title`, `description`, `category`, `draft`, optional `publishedAt` and `updatedAt`, optional `cover`/`coverAlt`, and body Markdown. Public entries require `draft: false`, an actual nonfuture publication date, and Lina-approved writing. Use a single visibility function for every public surface, including direct static route generation. Treat a date-only value as a calendar date, not a locale-dependent timestamp. Verify the intended date policy before scheduling future posts.

Experience entries have a role, organisation if sourced, description, and optional dates. When dates are absent, group under “Ministry experience” and “Other experience” without fabricating a timeline. The CV is HTML with a clean print stylesheet. Add a downloadable PDF only after producing and inspecting a sanitized version.

## Technical proposal

Use **Astro + TypeScript + Markdown**, with plain CSS using the supplied design tokens. This is a recommendation for the later build, not an installed stack. Astro's content collections can load and validate structured local writing; its deployment documentation covers static build output. This fits an editorial site with little application state. Sources: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [Astro deployment](https://docs.astro.build/en/guides/deploy/).

Check current stable package and Node compatibility at implementation time and record exact installed versions. No database, accounts, CMS, analytics, cookie banner, contact form, payment processing, or newsletter service in v1 unless the user adds a concrete requirement. A future editor-friendly CMS remains possible; local Markdown currently assumes someone can edit and redeploy files.

Proposed future structure:

```text
site/
  package.json
  package-lock.json
  astro.config.mjs
  src/
    assets/                 # approved images and licensed fonts
    components/             # Header, Footer, JourneyRow, JournalEntry, SupportNote
    content/journal/        # real Markdown posts only
    content.config.ts       # schema using the installed Astro version
    data/                   # public site and CV data only
    layouts/                # BaseLayout and ArticleLayout
    pages/                  # routes in the table above
    styles/                 # tokens, global, prose, print
  public/                   # explicit public assets only
  tests/                    # publication rules and route smoke checks
```

Commands to provide in the future `site/package.json`:

```sh
cd site
npm install
npm run dev -- --host 127.0.0.1
npm run check
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

`dev`, `build`, and `preview` wrap the Astro CLI; `check` runs the configured Astro/TypeScript checks; `test` runs the selected minimal test runner. These commands are a contract for the later implementation and **do not work yet**. There is no package manifest in the workspace root.

Code style: short components, meaningful names, content separate from layout, TypeScript strict checks, 2-space indentation. Example of the intended content shape (not an installed API):

```ts
type Contact = { label: string; href: string };
const publicContact: Contact | null = null;
// Render an action only when real contact data exists.
```

## Acceptance criteria for the later build

- Every specified page works directly and after reload; unknown journal slugs return a genuine not-found response/page.
- Lina's name, purpose, and a working story link appear in the first viewport at typical desktop and mobile sizes.
- Journal drafts and future entries never leak through direct URLs, related posts, the homepage, metadata, RSS or sitemap. Test each applicable public output; an empty journal is valid.
- CV dates, education status and programme participation match the evidence and later confirmations. No full source-document download exists.
- At 360, 390, 768, and 1440 CSS pixels wide, no horizontal overflow, clipped words, or overlapping controls. At 200% zoom, text and navigation remain usable.
- Semantic headings, landmarks, skip link, visible keyboard focus, meaningful image alternatives, adequate contrast, and comfortable touch targets. Reduced-motion preference removes nonessential motion. Verify these in a real browser.
- Main copy is visible without JavaScript. No scroll hijacking, autoplay sound, pinned reading sections, perpetual decorative motion, or timed delays before text is readable.
- Optimized responsive hero image with explicit dimensions; prioritize the above-fold image and lazy-load lower images. Target initial transferred page assets under 1 MB and minimal client JS; measure rather than claim Core Web Vitals without field data.
- Unique page titles and descriptions. Generate canonical URLs, sitemap and RSS using the actual deployment URL when supplied. Do not guess `linway.com` or any other domain. Previews remain non-indexable.
- Internal navigation and external actions are checked; forms and integrations exist only if functional. No fabricated success states.
- Type checks, relevant tests and build pass. Inspect the final `site/dist/` for private documents, source identifiers, third-party reference assets and draft text.

## Boundaries and outstanding decisions

Always: preserve originals; work in `site/`; use sourced facts; record assumptions; complete local verification before presenting a build. Ask for missing factual information when it changes a claim, and continue independent design work. Never invent content or turn a private source into a public asset.

Before public launch, Lina needs to confirm current programme/placement status, education completion and role dates where desired, the final copy and first update, image rights, public contact/social details, any support/giving destination, and the production domain. These gaps do not block a local implementation: omit unavailable items and use truthful evergreen wording. Do not deploy until the user asks for deployment.

