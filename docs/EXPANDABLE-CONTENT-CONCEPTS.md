# One-screen content and interaction concepts

Prepared 2 October 2026 from `Untitled document.docx`, the existing site, and `CONTENT-AUDIT.md`. This is proposed public copy for Lina's review, not final approval. The DOCX mixes Russian photo direction with English biography, programme, prayer, and support drafts; it is a source, not text to paste wholesale.

## Editorial finding

The strongest specific thread is simple: Lina prayed about what came after study and work, applied to All Souls' Ministry Training Scheme, and was accepted. The current opening screen repeats chronology and explains living costs before a visitor knows what to do. Keep only one thought on the poster; let visitors request more.

The DOCX also says Lina is currently in London, serving at Free English, and fully funding the year herself. The evidence audit does not confirm those claims. Do not publish them as facts until Lina confirms them. Do not add the DOCX's email form without a real mailing system and consent process. The supplied Stewardship link can be the donation action without claiming a target, amount, or funding arrangement.

## Visual directions

1. **Index / folio — recommended.** The Bible photo remains the single full-screen image. Three small numbered buttons sit along the top: `01 STORY`, `02 THE YEAR`, `03 PRAYER`. Each opens a short paper-like sheet above the poster. Use a strong condensed sans-serif headline, monospaced index labels, rules, and restrained oxblood accents. This gives the directness the user associates with USSR lists without propaganda imagery.
2. **Archive rail.** Put the same numbered controls on one edge of the image, like catalogue markers. A narrow content rail opens beside them. This leaves more of the book visible on wide screens but may crowd a 390-pixel viewport.
3. **Fold-out letter.** A small “READ THE NOTE” control unfolds one letter with three sections. The motion could feel intimate, but it gives the visitor fewer obvious choices and risks recreating a scrolling page inside a panel.

Use direction 1 for the next implementation. Keep the actions `GIVE THROUGH STEWARDSHIP` and `INSTAGRAM` distinct and visible on the poster even when every panel is closed.

## Proposed poster copy

**Name:** LINA MAKARENKO  
**Headline:** WHAT NEXT?  
**One-line text:** I prayed about that question for a long time. I was accepted for the 2026–27 Ministry Training Scheme at All Souls, London.  
**Actions:** GIVE THROUGH STEWARDSHIP · INSTAGRAM  
**Open controls:** 01 STORY · 02 THE YEAR · 03 PRAYER

The headline and labels are intentionally direct. Do not add a second slogan, a CV summary, or a paragraph about living costs on the opening screen.

## Proposed open panels

### 01 / Story

> I grew up in Omsk in a Christian family. Faith became my own as a teenager, and I was baptised at 17. I helped with youth groups, camps and worship teams. In 2023, I moved to Latvia to study Business and Management.

Source: `Untitled document.docx`, “My Story”; cross-checked with `CONTENT-AUDIT.md`. Family detail and first-person wording need Lina's approval.

### 02 / The year

> While studying and working in Riga, I began asking what to do next. I heard about the Ministry Training Scheme at All Souls, applied, and was accepted for 2026–27. The scheme brings Bible learning and practical service together in a local church.

Source: DOCX story and MTS sections, prayer letter, and programme audit. “Accepted” is supported; current participation and Free English placement remain unconfirmed.

### 03 / Prayer

> If you pray, please remember:
>
> 01 / Wisdom for decisions.  
> 02 / Care for the people I meet.  
> 03 / Faithfulness in everyday work.

Source: DOCX “Pray with me” section. The numbered list makes the request easier to scan and suits the chosen visual language.

### Optional small giving note inside the open panel

> The training arrangement is voluntary. If you would like to help with practical costs, you can use my Stewardship page.

Only use this if the main donation action needs context. Do not describe the year as “self-funded,” state a target, or suggest a gift amount.

## Motion and interaction concept

- **Arrival:** a brief image mask reveal and typographic entry, once on initial load. Keep text readable before animation and never replay it on every panel change.
- **Controls:** an index rule extends on hover/focus; press feedback is immediate. Do not animate keyboard focus into place or delay clicks.
- **Open sheet:** the panel emerges from the selected index position with a short fade and small translation. Close reverses it. Keep the photograph visible around the sheet so this still feels like one composition.
- **Switching:** changing from one open panel to another should be quick and quiet; no full-page transition.
- **Accessibility:** open by click, Enter or Space; close by button and Escape; return focus to the trigger. Provide a no-JavaScript path to the text. Respect reduced-motion and high-contrast preferences. No infinite parallax, scroll-triggered motion, typewriter effect, or audio.

At normal 390 × 844 and 1440 × 900 viewports, the poster stays one screen. A panel may scroll internally only when the user enlarges text or uses a shorter viewport; never clip the copy to enforce the one-screen rule.
