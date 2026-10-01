# Paste into Claude Code from the linway project root

Polish the **existing one-screen Astro site** in `site/`. Implement the changes, inspect them in a browser, and report what you changed. Focus on the favicon, the desktop information controls, and richer purposeful motion. The mobile control row works well; preserve its basic layout. Do not deploy.

## Read and use skills

Read `docs/CLAUDE.md`, `site/README.md`, and the current `site/src/pages/index.astro`, `site/src/styles/global.css`, `site/src/components/Icon.astro`, `site/src/lib/panels.ts`, and `site/public/favicon.svg`. Use `.claude/skills/frontend-design/SKILL.md` for the composition, `.claude/skills/emil-design-eng/SKILL.md` for the motion decisions, `.claude/skills/apple-design/SKILL.md` for feedback and interruptibility where relevant, and `.claude/skills/web-design-guidelines/SKILL.md` for the final interface review. Explain briefly which skill informed each substantive change. Keep the existing Astro stack and avoid a new animation dependency unless a measured need justifies it.

## New favicon

Replace the current rounded dark square with a plain “L”; it is too generic and does not express the site. Explore two or three simple vector concepts, then implement the strongest: an abstract open page, a path/horizon, or a compact mark that connects the two. It should feel like the same art object as the page, without drawing a detailed hand, a clip-art Bible, or a stock cross. Use a restrained one- or two-colour SVG with clear negative space. Render and inspect it at **16, 32 and 64 pixels**, in both light and dark browser contexts. At 16 pixels the mark must still be recognizable. Update the favicon asset and any needed fallback/touch icon; keep file sizes small. Mention why you chose the final mark.

## Desktop controls

At 1440 × 900, the current `01 STORY / 02 THE YEAR / 03 PRAYER` controls look like a tiny pale spreadsheet strip in the upper-right corner, detached from the headline. The open sheet then hangs below that strip over the Bible. Recompose the desktop controls as a deliberate part of the poster's type grid: larger and easier to scan, aligned with a major rule, the wordmark, or the left copy edge. Give the numbers and labels enough space and a clear active state. The open sheet should feel connected to its trigger and should not cover the Bible more than necessary. Preserve the **mobile** three-cell row and its comfortable tap targets. Do not turn this into a standard navbar, card grid, or separate page.

Show the redesign at 1440 × 900 and 1920 × 1080, with each sheet closed and open. Check 390 × 844 to ensure the good mobile layout has not regressed. Keep the poster within one screen at normal zoom. At short viewports or 200% zoom, allow content to scroll instead of clipping it.

## More motion, with a clear sequence

The page already has an image mask reveal, a slight headline rise, index-rule animation, hover states, and a 220 ms sheet transition. Develop these into a more visible, coherent sequence rather than layering on unrelated effects:

1. **Arrival:** a one-time photo reveal or sky-colour wipe, followed by the two headline lines and the index settling into place. The whole sequence should feel intentional and finish quickly; text must be readable if animation does not run.
2. **Desktop index:** a moving rule or active marker that visibly connects the selected button to the open sheet. Hover and press feedback should begin immediately. Keep keyboard focus clearly visible.
3. **Sheet:** open from the selected control with a short origin-aware reveal, then bring in its title and body with a very small stagger. Switching between sheets should feel continuous and interruptible; closing should return the sheet to its source. Preserve focus placement, focus return, Escape, and the no-JavaScript content path.
4. **Actions:** give the Stewardship button and Instagram link distinct, subtle hover/press feedback, such as a small arrow movement or ink-rule change. Do not animate continuously.

Use transforms and opacity where practical; avoid long fades, bouncy menus, typewriter text, auto-looping effects, scroll hijacking, and heavy parallax. Follow reduced-motion preferences with immediate state changes. Test fast repeated open/switch/close interactions so animation state never gets stuck or blocks input.

## Preserve the site contract

Keep the short poster copy and the three existing content sheets. Keep `https://www.stewardship.org.uk/partners/20645926` as the donation destination and `https://www.instagram.com/linren__/` as the separate social link. Do not reintroduce the three removed photographs, multi-page navigation, private source files, or unconfirmed claims. Leave `copyReviewedByLina` and `heroRightsConfirmed` false.

Run `cd /Users/achimari/Desktop/linway/site && npm run check && npm test && npm run build && npm run audit:dist`. In a real browser verify the desktop closed/open states, mobile layout, all panel interactions by mouse and keyboard, reduced motion, the external links, and the favicon at small sizes. Finish with a concise before/after explanation, screenshots or exact viewport observations, tests run, and any remaining limitations.
