# Paste into Claude Code from the linway project root

Make one focused **copy-editing pass** on the existing Astro site in `site/`. The words currently sound over-polished and AI-written. Keep the site’s six scenes, photographs, typography, animations, navigation, and prominent Stewardship action. This task is to make Lina’s words sound like a person speaking plainly to friends and supporters. Implement the edited copy in the private preview, inspect it in a browser, and **do not deploy or push**.

## Read before editing

Read `site/src/pages/index.astro`, `site/src/data/site.ts`, `site/README.md`, `docs/CONTENT-AUDIT.md`, `docs/COPY-LEDGER.md`, and `docs/CLAUDE.md`. Privately read `Untitled document.docx` and `My First Month of MT.docx` for facts and Lina’s recurring concerns. Those documents contain draft and private material: do not publish the files, identifiers, third-party stories, or unsupported claims. Treat their prose as source material, **not** as a style template; some of it also uses generic “journey/season/grow” language. Use `.claude/skills/frontend-design/SKILL.md` to keep the new lines readable in the existing composition and `.claude/skills/web-design-guidelines/SKILL.md` for the final interface check. Say briefly how the relevant skills informed the result.

## Editorial direction

Write the visible narrative in Lina’s first person, in natural UK English; metadata can stay factual third person. Use concrete details from her actual account: Omsk, Riga, baptism, worship and youth work, MTS, Free English, the new church and team, studying 1 Corinthians, and the challenge of speaking English. Choose only details that serve the scene. Let her Christian faith remain explicit and unembarrassed. Keep her modest, conversational tone, including ordinary words and varied sentence lengths. Correct clear grammar errors without flattening her phrasing.

Cut lines that sound like a brochure, sermon summary, or fundraising template. In particular, examine the Year chapter’s programme description and repeated “learn/serve/grow” claims; “real friendships,” “practical side of the year,” and similar abstractions; and the repeated explanation of Free English in Year and First month. Replace vague claims with a specific sourced detail, or remove them. Avoid slogans, tidy three-part rhythms, “new chapter,” “journey,” “season,” “meaningful impact,” invented quotations, and emotional pressure to donate. Do not make every sentence the same length or start every line with “I’m learning.” Keep the visible copy short enough for the existing photographic design. Preserve the plain **“Voluntary. Unpaid.”** idea and the direct reason someone might support Lina.

## Recent user edits are fixed

Keep these lines and facts; do not paraphrase them away:

- Story: “I was baptised and I served in church on the worship team, youth group and church camps.”
- Story: she “worked alongside my studies.”
- Prayer: “For people at Free English to come to know Jesus and for our team to serve well together.”
- First month: the sentence “I don’t need to know or do everything yet. I’m here to learn.” was deliberately removed. Do not reintroduce it or a rewritten version.

Keep names, dates, and present-tense claims aligned with the source audit. Do not infer that anyone has come to faith, claim ministry results, invent costs or a fundraising target, or change the donation destination. Keep the WhatsApp, email, Instagram, and Stewardship links exactly as they are. Leave `copyReviewedByLina`, `currentStatusConfirmed`, photo-consent, and image-rights flags false; the final first-person wording still needs Lina’s review.

## Work and verification

1. Make a short line-by-line copy audit of **all six scenes**, the “More from the month” disclosure, CTA supporting text, and page description. Identify the lines that sound least natural and why, with specific examples.
2. Choose **one** lean revision, then implement it. Maintain the meaning and evidence for each changed factual line. Prefer deletion to filler. Keep navigation labels and the main support button clear.
3. Update `docs/COPY-LEDGER.md` with changed lines, their source, and approval status. Keep review notes out of the visible site.
4. Inspect the actual page at 1440 × 900 and 390 × 844, plus a short phone viewport and 200% zoom. Check for awkward wraps, clipping, readable contrast, and a usable Support button. Natural scrolling is fine on small screens.
5. Run `cd /Users/achimari/Desktop/linway/site && npm run check && npm test && npm run build && npm run audit:dist`. Report the before/after copy by scene, what you cut, where each new fact came from, browser observations, and the test results. Do not deploy or push.
