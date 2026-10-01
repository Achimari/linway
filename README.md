# linway — private site and source material

linway is Lina Makarenko's one-screen ministry site. The current next wave adds optional information panels, shorter poster copy, direct archival typography, and purposeful motion.

This workspace contains private source material, planning documents, and a private Astro preview in `site/`. The site is not ready for public deployment.

## Start here

1. Run the current site from `site/` with `npm ci && npm run dev`. See [`site/README.md`](site/README.md).
2. Review [`docs/EXPANDABLE-CONTENT-CONCEPTS.md`](docs/EXPANDABLE-CONTENT-CONCEPTS.md) for proposed short copy and panel concepts.
3. Use [`docs/NEXT-WAVE-PROMPT.md`](docs/NEXT-WAVE-PROMPT.md) for the next implementation pass.

## Package map

| Path | What it contains |
| --- | --- |
| `docs/SPEC.md` | Historical multi-page specification |
| `docs/CLAUDE.md` | Persistent project instructions and privacy rules for Claude |
| `docs/CLAUDE-PROMPT.md` | Historical initial-build prompt |
| `docs/CONTENT-AUDIT.md` | Facts found in the supplied material, provenance, uncertainty, privacy exclusions |
| `docs/CONTENT-DRAFT.md` | Earlier proposed website copy; check claims before reuse |
| `docs/REFERENCE-ANALYSIS.md` | Historical reference analysis |
| `docs/DESIGN.md` | Earlier visual system notes |
| `site/` | Current Astro implementation for private review |
| `docs/EXPANDABLE-CONTENT-CONCEPTS.md` | Proposed opening copy, information panels, and interaction direction |
| `docs/NEXT-WAVE-PROMPT.md` | Prompt for the next design and content pass |
| `.claude/skills/` | Five relevant Claude skills copied as portable project files |
| `docs/CLAUDE-SKILLS.md` | Skill selection, provenance, limitations, and integrity notes |

## Privacy and project boundary

The root PDF/DOCX documents are private sources. They are excluded by `.gitignore` and must not be deployed. The site already lives in `site/`.

`MainPage.jpg` is the current hero source. It shows an anonymous hand holding a Bible, not Lina. Confirm publication rights before putting it online.

## Confirm before the public build

- Is Lina currently participating in the 2026–27 Ministry Training Scheme, and is Free English her confirmed placement?
- Does Lina approve the first-person poster and expandable-panel copy?
- Does Lina want any current London or Free English wording added?
- Is `MainPage.jpg` licensed for public use?
- What is the production domain?

These gaps do not block a private local build. Missing items should be omitted or shown with an honest empty state.
