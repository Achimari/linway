# Paste into Claude Code from the linway project root

This is the final editorial and design pass for the existing Astro site in `site/`. **Implement the changes, inspect the rendered site, and do not deploy.** Replace the Life chapter with **First month**, using `My First Month of MT.docx` as the source. Use the proposed copy and evidence notes in `docs/FIRST-MONTH-DRAFT.md`; improve its phrasing only where the page reads more naturally, without changing facts or inventing a date. Add the two public contact details supplied below. Keep the site a clean, art-directed, one-page photographic essay whose clearest action is **Support Lina's year**.

## Read the project and use skills

Read `docs/CLAUDE.md`, `docs/FIRST-MONTH-DRAFT.md`, `docs/CONTENT-AUDIT.md`, `docs/COPY-LEDGER.md`, `site/README.md`, the current page and styles, and the gallery `SOURCE.md`. Privately read `My First Month of MT.docx`; do not copy the DOCX or its metadata into public assets. Audit all chapters in a real browser at desktop and phone sizes before editing. Use `.claude/skills/frontend-design/SKILL.md` for the photographic composition and type; `.claude/skills/emil-design-eng/SKILL.md` and `.claude/skills/apple-design/SKILL.md` for restrained transitions and interaction; and `.claude/skills/web-design-guidelines/SKILL.md` for the final accessibility review. State briefly which skill guidance shaped the result. The user's instructions here supersede older project notes that prohibit *all* personal contact details: only the two exact contacts below are authorized.

## Replace Life with First month

Change the navigation label, chapter marker, section ID/deep link, title, and related styles from Life to **First month**. Preserve the existing six-chapter order: Home, Story, The year, First month, Support, Prayer. Remove the Sport/Friends switch, sport photo, and old sport/free-time copy. Use **only** the existing `cafe.jpg` (`LinaWithFriends2.jpg`) friends photo in this chapter. Make it feel as substantial as the other chapters: generous crop, faces visible, color sampled from the photo, and coherent type, spacing, buttons, and transitions. The photo was not documented as being taken during MTS or Free English; use neutral alt text/caption only. Its two identifiable friends still need publication consent; do not change consent flags without evidence.

Use the short First month draft as the visible story. Its concrete details are the new city/church/team rhythm, Free English, 1 Corinthians/discipleship, English as a challenge, and learning to be patient. Keep the wording in Lina's direct first-person voice; no AI-style slogans, invented impact claims, or CV timeline. If the longer Free English/conference detail improves the page, put it in a restrained, accessible in-place reveal. Do not force all the text into the first viewport by shrinking it. The desktop composition should fit a normal viewport; on phones, short viewports, and at 200% zoom, allow natural scrolling instead of clipping. Keep the Support action visible and usable, including on mobile.

The new first-month account says Free English sessions have started. Update the Year chapter's stale “I hope to serve with Free English” line to a source-supported current statement; use the draft's suggested wording or a tighter equivalent. Refresh the Prayer list from the new DOCX while keeping the page's strong visual treatment and three brief requests. Record every changed first-person claim in `docs/COPY-LEDGER.md`, and update `docs/CONTENT-AUDIT.md` so its old warning about *no evidence* of participation does not contradict this new source. This DOCX is evidence for a private preview; Lina's approval of exact public wording is still pending. Leave `copyReviewedByLina` and `currentStatusConfirmed` false until she explicitly confirms them.

## Add the supplied contact details

In a quiet **Contact Lina** area of Support, add exactly:

- WhatsApp **+44 77 7847 4925** → `https://wa.me/447778474925`
- Email **linamak1111@gmail.com** → `mailto:linamak1111@gmail.com`

Make both links keyboard and touch accessible. They are secondary to the direct primary Stewardship button, which must still link to `https://www.stewardship.org.uk/partners/20645926`. Keep Instagram as another secondary route. Do not add a fake form, copy private contacts from other documents, or let contact links displace the support action. Update the old contact prohibition in `docs/CLAUDE.md` and `docs/CONTENT-AUDIT.md` to make a **narrow exception for these two owner-supplied public contacts only**.

`site/scripts/audit-dist.ts` currently rejects all phone numbers and email addresses. Change that rule to allow **only** these exact visible values and link destinations, while retaining rejection of any other phone/email or sensitive material. Update meaningful tests for the exact links and for rejection of an extra contact. If the sport photo is no longer used anywhere, remove it from page imports and expected public-image checks; retain the original source file unless normal asset cleanup makes removal clearly safe. Update `site/README.md` and source/photo notes to match the finished chapter. Preserve all unrelated user work and the existing Support chapter improvements.

## Verify and report

Inspect all chapters at **1440 × 900**, **1920 × 1080**, and **390 × 844**, plus a short viewport and 200% zoom. Confirm the First month photo and story read well, the Support button is immediately obvious, the two contact links work, and the page is consistent across chapters. Check keyboard focus, touch targets, browser Back/deep links, no-JavaScript access, reduced motion, contrast, and the LINWAY entry/skip path. Run:

```sh
cd /Users/achimari/Desktop/linway/site
npm run check
npm test
npm run build
npm run audit:dist
```

Report the changed copy, photo treatment, exact contact placement, viewport observations, test results, and remaining publication gates. **Do not deploy or mark approval/consent flags true.**
