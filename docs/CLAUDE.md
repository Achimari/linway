# linway

## Purpose and scope

Build Lina Makarenko's English-language one-screen ministry site: a short poster-like opening with optional information sheets, a donation link, and Instagram. The current interaction and copy brief is `docs/NEXT-WAVE-PROMPT.md`.

This workspace contains a working private-preview Astro site in `site/`. Read `site/README.md`, `docs/CONTENT-AUDIT.md`, `docs/EXPANDABLE-CONTENT-CONCEPTS.md`, and `docs/NEXT-WAVE-PROMPT.md` before changing it. `docs/SPEC.md` and `docs/CLAUDE-PROMPT.md` describe earlier iterations where they conflict with the current brief.

## Workspace boundaries

- The app lives in `site/` (Astro, static). See `site/README.md` for commands and content authoring.
- `MyCV/` is a separate, existing Achimari streaming website with its own Git repository. Do not modify it or reuse its biography, links, portrait, audio, video, metadata, or deployment settings for Lina.
- Root PDF/DOCX files are private source material. Use the sanitized content documents by default. Never copy those originals into `site/public/`, commit them, link them as a CV download, or include them in a deployed archive.
- `MainPage.jpg` is a supplied image, not a verified photograph of Lina. Its publication rights need confirmation; local design preview is fine.
- `starter/` is an editable visual/content kit, not production output. `docs/references/` holds internal research screenshots, never website assets.
- No publishing, remote Git changes, subscriptions, message sending, or payment integration is part of this preparation request.

## Content rules

- English only for the first version. Site name is lowercase **linway**; the person is **Lina Makarenko**.
- Use sourced history, distinguish plans from completed events, and do not infer current participation from a programme calendar. Read the evidence notes in `docs/CONTENT-AUDIT.md` when a fact is uncertain.
- Website copy in `docs/CONTENT-DRAFT.md` is proposed editing for Lina's review, not automatically approved for publication. Render safe copy in local previews; omit unconfirmed present-tense claims.
- Do not invent ministry roles, qualifications, dates, impact statistics, testimonials, social accounts, articles, donation URLs, or public contact details.
- No addresses, personal phone numbers, date of birth, immigration identifiers, signatures, medical information, reference contacts, or private third-party stories in public output.
- Hide any unavailable link or action. Do not render `href="#"`, fake form success, a pretend newsletter signup, or a CV download without a real sanitized PDF.
- Journal ideas remain drafts. Production routes, lists, RSS and sitemap must exclude drafts and future-dated posts using the same publication rule.

## Design and skills

Read only the skills relevant to the current step; copied skills are in `.claude/skills/` and catalogued in `docs/CLAUDE-SKILLS.md`.

- `frontend-design`: visual composition and responsive implementation.
- `emil-design-eng`: interaction details and restrained motion.
- `apple-design`: targeted guidance for typography and responsive feedback, when useful.
- `web-design-guidelines`: final UI/accessibility review; disclose if its external retrieval tool is unavailable.
- `vercel-react-best-practices`: conditional, only if React is actually introduced. The default proposal uses Astro and Markdown.

Project instructions and the user's chosen direction take priority over stylistic defaults in copied skills. No extra interaction library, React layer, or design effect is required just because a skill describes it. Keep the wordmark, readable content, sky image, flat layouts, and a clear sense of Lina's voice.

## Implementation and verification

Use `docs/NEXT-WAVE-PROMPT.md` for the current route, content, interaction, and acceptance criteria. Keep the app static unless a confirmed requirement needs a backend. All public assets belong inside `site/`; deploying the workspace root is prohibited.

Verify real routes, keyboard access, mobile layout, readable contrast, reduced motion, and empty/draft states. Report exactly what you tested. Do not claim this starter has a production build, CMS, mailing list, donation flow, or verified current placement.
