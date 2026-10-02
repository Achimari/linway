# Gallery photos — source and consent note

Optimised from photos supplied to the workspace root (originals stay there and never enter `site/`).
Each file was re-encoded at its original size (no upscaling), EXIF orientation applied, no metadata kept.
Astro generates the AVIF/WebP/JPEG sizes that ship.

| File | From | What it shows | Before public release |
| --- | --- | --- | --- |
| `gathering.jpg` | `LinaWithkid.jpg` | Lina from behind at a seated gathering, arm around the person beside her; other attendees | **Shows a minor.** Guardian consent and Lina’s consent; otherwise remove |
| `all-souls.jpg` | `church.jpg` | All Souls Church, Langham Place, at night; street with cyclists and a bus | Photographer’s permission (unknown) |
| `free-english.jpg` | `LinaInMissinMetteng.jpg` | Lina and another woman with name badges in a hall; screen reads “Free English Classes” | Consent of the second woman. Her first name (badge and card) is **blurred in this derivative**; her face is visible |
| `cafe.jpg` (First month chapter) | `LinaWithFriends2.jpg` | Lina and two friends in a café with green iced drinks | Consent of both friends |

Not used: `LinaWithfriend1.jpg` (five identifiable people; would invite an unverified caption) and `LinaSportsmen.jpg` (its derivative `sport.jpg` was removed with the Life chapter). The café photo’s date and occasion are unknown: it is never described as an MTS or Free English event.

Captions describe only what each image shows: no dates, names of others, event titles or roles.
`site.photos[*].consentConfirmed` gates `npm run audit:release`.
