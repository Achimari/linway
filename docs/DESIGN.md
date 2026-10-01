# linway design direction

## Concept

**A field journal under an open sky.** The site combines the clarity of a supporter letter with the space and image confidence of the two reference sites. The Bible-and-sky image creates the opening atmosphere; warm paper sections make Lina’s writing feel personal and readable. Thin horizontal rules suggest a path and a horizon.

The design is ministry-led and human. It should not look like a church institution, charity campaign, skincare app, or CV template.

## Identity

- Wordmark: `linway`, lowercase. Use plain text with careful spacing; no stock religious icon.
- Personal signature: `Lina Makarenko` in small uppercase/sans text near the hero eyebrow and footer.
- Distinctive device: a 1px horizon rule with circular journey markers. Use it structurally, not as decoration on every container.
- Image language: real places, hands at work, tables, notebooks, city details, and community settings when consent permits. Avoid generic praying silhouettes, glowing crosses, staged diversity stock, or an invented portrait of Lina.

## Palette

The exact starter variables live in `starter/tokens.css`.

| Token | Value | Use |
| --- | --- | --- |
| Sky | `#8DB8DA` | selected surfaces, rules, small labels |
| Sky light | `#DCEAF3` | section background, focus support |
| Paper | `#F5F0E7` | main content background |
| Paper light | `#FBF8F2` | article/prose surfaces |
| Ink | `#17212A` | primary text |
| Ink muted | `#5D6870` | metadata and secondary copy |
| Oxblood | `#8B2E3D` | rare accent, links, active marker |
| White | `#FFFFFF` | hero text or clean surfaces |

Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful interface boundaries. Never place long text over a busy image. Add a local image overlay only where needed for stable contrast.

## Typography

Starter preview uses local system stacks so it works offline:

- Display: `Iowan Old Style`, `Baskerville`, `Times New Roman`, serif.
- Interface/body: `Avenir Next`, `Avenir`, `Segoe UI`, sans-serif.

For production, optionally self-host a properly licensed variable serif such as Newsreader and a neutral sans such as Manrope, including license files and only the weights actually used. Do not block the build on font sourcing; the local stack is acceptable and privacy-friendly.

Suggested scale:

- Hero: `clamp(3.6rem, 8.5vw, 8.5rem)`, 0.88–0.95 line-height, at most three short lines.
- Section title: `clamp(2.3rem, 5vw, 5rem)`.
- Article heading: `clamp(2.6rem, 6vw, 5.5rem)`.
- Body: `clamp(1rem, 1.2vw, 1.15rem)`, 1.65 line-height, 64–70 characters per line.
- Labels: 0.72–0.78rem, uppercase with 0.12em tracking; use sparingly.

Avoid fully justified text, ultra-light weights, and body copy below 16 CSS pixels.

## Layout

- Maximum outer width: 1600px; content gutters: `clamp(1rem, 4vw, 4rem)`.
- Hero: near-full viewport on desktop. Copy occupies the left 45%; image focus remains right. Give the header its own paper/white band.
- Reading column: 680–760px.
- Journey: open rows on a 12-column grid, separated by the horizon rule. Alternate the text start, not the reading direction.
- Journal list: one featured entry followed by flat rows. Avoid a generic three-card grid.
- Support: one quiet, high-contrast section with clear available actions and no emotional pressure.

At 760px and below, stack hero text before the image. The supplied image is very wide; use an aspect ratio around 4/3 or 1/1 and focus near `72% 50%` so the hand and Bible remain visible. Never shrink desktop columns until the words become narrow vertical strips.

## Components

| Component | Purpose | Key behavior |
| --- | --- | --- |
| Header | Identity and primary navigation | Sticky only if it does not cover reading; compact mobile layout; visible focus |
| Hero | Position Lina and invite the first action | Text readable immediately; correct responsive crop; no autoplay or parallax |
| TextLink | Main navigation and editorial actions | Arrow moves a few pixels on hover; underline remains discoverable |
| JourneyRow | Show one meaningful stage | Number/label, heading, short copy, thin shared horizon rule |
| JournalRow | Present real writing | Title, description, category, date; entire row not secretly clickable |
| EmptyJournal | Truthful launch state | Short message; no fake post cards or disabled controls |
| SupportNote | Prayer, reading, contact, giving | Render only actions with real destinations |
| Prose | Long-form story and journal | Stable line length, clear heading rhythm, links and blockquotes |
| Footer | Secondary navigation and ownership | Experience link, confirmed contacts, current year |

## Motion and interaction

Motion should feel like turning attention toward something, not like a campaign reveal.

- Initial load: optional 180–300ms fade/translate for hero text only. Content stays visible if scripts fail.
- Links: underline/arrow transition under 180ms.
- Journey markers: a small colour change as sections enter the viewport only if implemented without hiding content or adding a heavy client bundle.
- No smooth-scroll hijacking, pinned sections, scroll scrubbing, custom cursors, autoplay sound/video, or moving background gradients.
- Under `prefers-reduced-motion: reduce`, remove transforms and nonessential transitions.

## Images

- Preserve original files outside public output. Create derived AVIF/WebP/JPEG sizes during the build.
- Supply width/height and `srcset`/`sizes`; preload or prioritize only the above-fold hero.
- Hero alt depends on purpose. If the image communicates the site’s faith theme: “A hand holding a Bible against a blue sky.” If it is treated as atmosphere beside equivalent text, use empty alt text.
- Do not label the anonymous hand as Lina.
- For community images, obtain permission and avoid identifying vulnerable people or ministry participants without explicit consent.

## Accessibility and content integrity

- A skip link appears first on keyboard focus.
- One `h1` per page; headings describe real sections, not visual sizes.
- Current navigation uses `aria-current="page"`; menu buttons expose name, state, and relationship to the controlled menu.
- Focus outline: at least 2px ink/oxblood with offset and sufficient contrast.
- Use real links for navigation and buttons for actions. Do not make entire text cards ambiguous click targets.
- Dates use machine-readable `<time datetime>` and human English display.
- Missing data removes the corresponding interface. Empty states tell the truth.
- Print styles for Experience remove navigation, backgrounds, actions, and decorative image areas while retaining contact data only when public.

## Starter preview

`starter/index.html` is a standalone design/content preview. It intentionally contains no app framework, tracking, forms, or outbound actions. It tests the design direction and responsive crop; it is not production markup or a substitute for the route-level build described in `SPEC.md`.

