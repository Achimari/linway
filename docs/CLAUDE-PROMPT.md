# Paste this prompt into Claude Code from the linway project root

Build the complete local v1 of **linway**, Lina Makarenko’s English-language ministry journey and supporter-update website.

Before changing files, read these project sources in this order:

1. `CLAUDE.md`
2. `SPEC.md`
3. `docs/CONTENT-AUDIT.md`
4. `docs/CONTENT-DRAFT.md`
5. `docs/REFERENCE-ANALYSIS.md`
6. `docs/DESIGN.md`
7. `docs/CLAUDE-SKILLS.md`
8. `starter/index.html`, `starter/tokens.css`, and the JSON files under `starter/content/`

Use the project skill `frontend-design` for visual implementation. Use `emil-design-eng` and `apple-design` only for the interaction, typography, responsive, and reduced-motion details that fit the documented concept. Use `web-design-guidelines` for the final review and clearly report if its required current-guidelines fetch cannot run. Use `vercel-react-best-practices` only if you introduce React; the expected build does not require React.

## Outcome

Create a new application under `site/`. Do not modify `MyCV/`; it is an unrelated Achimari streaming site and its biography, links, assets, dependencies, repository, and deployment configuration must remain untouched. Do not turn the root workspace into the app.

Implement the routes, content behavior, privacy boundaries, and acceptance criteria in `SPEC.md`. The main experience is Lina’s story, published journal updates, and ways to walk alongside her. Experience/CV is secondary. Match the design direction “a field journal under an open sky,” using the horizon-line device and the sky/paper/ink/oxblood palette. Take structural inspiration from the supplied reference analysis without cloning either website.

Use Astro, TypeScript, local Markdown/content collections, and plain CSS. Before installing, check the current official Astro documentation and choose mutually compatible stable package versions; commit an npm lockfile. Prefer static output and no client framework. Add a small dependency only when it materially improves correctness or accessibility and document why.

## Content safety

The root PDF/DOCX files are private research. Use the sanitized audit and draft by default. Never copy source documents, private identifiers, addresses, phone numbers, signatures, immigration details, reference contacts, medical information, or private third-party stories into `site/`, generated HTML, tests, fixtures, metadata, or logs.

The draft copy is proposed copy. It is safe for a private local preview, but claims marked for confirmation must not appear as confirmed facts. Use the evergreen wording in `starter/content/site.json`, or omit the relevant block. Specifically:

- do not claim Lina is currently in London or actively participating in the 2026–27 scheme;
- do not claim Free English is her active placement;
- do not claim a completed degree or invent education/employment dates;
- do not show a public email, social account, subscription form, donation target, giving button, or Stewardship link without real data;
- do not create fake published posts. The journal launches with the documented empty state;
- do not expose draft/future content through a generated route, homepage, journal list, RSS, sitemap, related entries, metadata, or data payload.

`MainPage.jpg` may be copied into the app only as a derived, optimized local-preview hero asset. Add a nearby source note in the repository that publication rights must be confirmed before deployment. The image shows an anonymous hand holding a Bible; never identify it as Lina. Do not add a stock or AI-generated portrait.

## Required implementation

- Build `/`, `/story/`, `/journal/`, `/experience/`, `/support/`, and a real 404 page.
- Set up a typed journal content collection and one shared `isPublished` policy. Add a real automated test proving draft and future entries cannot create public output. A journal with zero published entries must build successfully.
- Keep body copy server-rendered/static and usable without JavaScript.
- Implement responsive navigation, skip link, semantic landmarks, correct heading hierarchy, visible focus, reduced-motion handling, and high-contrast states.
- Make the supplied hero composition work at 360, 390, 768, and 1440 CSS pixels. On narrow screens place text before the image and preserve the Bible/hand crop.
- Create a readable long-form prose system and a print stylesheet for the Experience page.
- Add only working links. When data is null, omit the action rather than rendering `#`, a disabled link, or fake success.
- Add title/description metadata. Configure canonical URLs, sitemap, and RSS only if an actual site URL is supplied; otherwise document the missing production-domain step and prevent indexing of local/staging output as appropriate.
- Add a clear `site/README.md` with exact install, dev, check, test, build, preview, content-authoring, and pre-deployment commands.
- Include a deployment audit script or documented command that verifies `site/dist/` contains no PDF/DOCX originals, private-source filenames, draft entry text, or reference screenshots.

## Visual expectations

Use `starter/index.html` as a direction, not as production code. Keep the opening spacious and image-led, with the headline “Faith, people, and the next step.” Keep section content open and editorial; avoid a dashboard/card-grid look. Use one strong hero, open journey rows, a flat journal list/empty state, and a quiet support invitation. No gradients, glass panels, app mockups, giant icon sets, marketing badges, made-up metrics, testimonials, scroll hijacking, pinned sections, autoplay media, custom cursor, or popup.

Do not hide text for animation. If you add entrance motion, keep it brief, progressive-enhancement-safe, and removed under reduced motion. Keep total client JavaScript minimal and justify every hydrated component.

## Work method and verification

Implement the whole local v1 without pausing for optional missing facts. Resolve those gaps using truthful omissions and the specified empty states. Stop only if a required technical choice cannot be made safely from the files and official documentation.

After implementation:

1. Run type checks, tests, and the production build.
2. Serve the production build locally and inspect every route in a real isolated browser at 390 × 844 and 1440 × 1000; additionally check layout at 360 and 768 widths.
3. Verify keyboard navigation, skip link, focus states, mobile menu, 200% zoom, reduced motion, print preview, 404 behavior, and a zero-error browser console.
4. Inspect the built output for private files/data and draft leakage.
5. Compare screenshots against `docs/DESIGN.md` and fix visible hierarchy, crop, overflow, and spacing problems before stopping.
6. Run the final interface review using the available project skill and address its applicable findings.

Return a concise handoff: what was built, exact versions chosen, commands run with results, browser sizes/routes checked, any measurable asset/performance findings, files needing Lina’s approval, and the remaining steps before public deployment. Do not deploy, create a remote repository, send messages, or activate external services.

