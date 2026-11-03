# Dawn Oil Limited — AI Website Development Documentation v1.0
Status: **draft for developer implementation and management review**, not publication approval. 31 October 2026.

Source hierarchy: **S1** `Dawn_Oil_Website_Development_Brief.docx` (original 18 pages, 21 Oct 2026) is the governing business-content and sitemap source; **U1** user instructions 30–31 Oct 2026 confirm the supplied official logo and lighter palette; **U2** and **U3** user instructions on 3 Nov 2026 clarify project-specific image direction, with U3 selecting the former Aureum pumpjack/crane image for Dawn's homepage hero; **R1–R3** external websites are inspiration only. Earlier generated proposal and developer plan are secondary interpretation, not independent facts. No unsupported claims should reach a public build.

Project boundary: **DAWN OIL ONLY**. Never import Aureum materials, branding, assets, product categories, marketing copy, palette or services. Both client projects run concurrently but remain separate repositories and documentation.


## Design references — research as of 31 October 2026
| Source | URL | Observed useful patterns | Adapt for Dawn | Never transfer |
|---|---|---|---|---|
| Atlas Oil | https://www.atlasoil.com/ | Short, direct commercial hero; numbered service cards; human-centred section; prominent inquiry | Three focus pathways (acquisitions, licensing, partnerships), repeated Contact | Supply/trading claims, history, stats, partnerships |
| Renaissance Africa Energy | https://www.renaissanceafrica.com/ | Editorial hero and section rhythm; strategic pillars, values, leadership, safety storytelling, news blocks | One hero + opportunity pillars; leadership and responsibility sections; thoughtful photography | Operating JV, production, programmes, statistics, 2026 news |
| Chevron | https://www.chevron.com/ | Featured image-led editorial storytelling; who-we-are / what-we-do; people, sustainability and news; modular content | Identity/capabilities narrative, restrained image transitions, leadership credibility | Named facilities, customers, production, climate targets, claims, logos |

### Video policy
Reference sites use cinematic/feature-led imagery and media modules, but **no verified Dawn footage is supplied**. Use the client-directed pumpjack still as the hero. Do not fabricate a hero video or auto-play generic video pretending to represent Dawn. If owner supplies licensed footage later, offer an optional silent muted loop with a pumpjack/extraction poster image, pause control, reduced-motion fallback and no autoplay sound.

## User-supplied assets
| Asset | Local file | Use | Caveat |
|---|---|---|---|
| Dawn Oil logo | `assets/brand/DawnOil_Logo_Supplied.png` | Header/footer/favicon derivative only with care | Artwork unmodified; verify crop/background/legibility |
| Pumpjack field (former Aureum hero, reassigned by client) | `public/assets/hero/dawn-upstream-pumpjack.png` | Main homepage hero | Client-supplied asset; original creator/licence metadata not identified; representative industry context, not identified as a Dawn asset |
| Pumpjack at sunset (S1 embedded `word/media/image1.jpg`) | `public/assets/hero/dawn-brief-pumpjack.jpg` | Retained for selected inner-page banners | Zbynek Burival / Unsplash; representative industry context, not identified as a Dawn asset |
| Offshore platform at dusk | Removed from Dawn public assets | Aureum Energy only | Must not be used on Dawn pages |

## Suggested additional image directions
- Professional upstream commercial meeting with diverse team reviewing non-sensitive documents (About/Capabilities).
- Wide neutral energy infrastructure landscape (Focus); avoid named assets.
- An editorial close-up of clean pumpjack or extraction geometry with natural light.
- Genuine management headshots for Leadership only after supplied/approved.
- Nature/landscape aerial and responsible site operations (Responsibility), never as Dawn programme evidence.
- Use licensed photographers/stock with rights documented; don't fetch and publish arbitrary Google Images or competitor photos.

## Attribution register template
| ID | File | Photographer/source | Licence proof | Usage restrictions | Approved? |
|---|---|---|---|---|---|
| A01 | former offshore-platform hero (+ derivatives) | developer-supplied | verify provenance | Removed from Dawn public assets; Aureum Energy only | excluded from Dawn |
| A02 | logo (+ 248px visually faithful WebP derivative) | user-supplied brand | corporate artwork | no redraw/recolour | supplied official |
| A03 | `public/assets/editorial/industrial-pipework.jpg` (+ WebP derivatives) | Ricardo Gomez Angel / Unsplash, S1 reference B | https://unsplash.com/license; https://unsplash.com/photos/41X6FwTwPh4 | retained in archive; removed from active Dawn hero use because it reads as equipment/services support | inactive |
| A04 | `public/assets/editorial/offshore-infrastructure.jpg` (+ WebP derivatives) | Leonardo Benitez / Unsplash, S1 reference A | https://unsplash.com/license; https://unsplash.com/photos/F8fYuNwHvHU | retained in archive; removed from active use because the source appears soft and weathered | inactive |
| A05 | `public/assets/editorial/ghana-mangrove-waterway.webp` (+ 900px derivative) | Ato Aikins / Unsplash | https://unsplash.com/license; https://unsplash.com/photos/QF_Ja8UMn4Y | Responsibility hero; identified only as a Ghanaian landscape | source-recorded |
| A06 | `public/assets/editorial/industrial-safety-inspection.webp` (+ 900px derivative) | Ümit Yıldırım / Unsplash | https://unsplash.com/license; https://unsplash.com/photos/Ass0DusYDk4 | Responsibility safety section; neutral industry context, no Dawn facility claim | source-recorded |
| A07 | `public/assets/editorial/bright-meeting-room.webp` (+ 900px derivative) | Darshan Patel / Unsplash | https://unsplash.com/license; https://unsplash.com/photos/DfzzpBRZCT0 | Contact hero; generic business lounge, not a Dawn office | source-recorded |
| A08 | `public/assets/editorial/lagos-cityscape.webp` (+ 900px derivative) | Emmanuel Ikwuegbu / Unsplash | https://unsplash.com/license; https://unsplash.com/photos/foXolHDZPeU | Contact supporting image; factual Lagos context only | source-recorded |
| A09 | `public/assets/editorial/leadership-boardroom.webp` (+ 900px derivative) | Jakub Żerdzicki / Unsplash | https://unsplash.com/license; https://unsplash.com/photos/Jrq1Bmb2Mmk | Leadership hero; generic empty boardroom, not a Dawn office | source-recorded |
| A10 | `public/assets/hero/dawn-brief-pumpjack.jpg` (+ WebP derivatives) | Zbynek Burival / Unsplash; embedded as S1 `word/media/image1.jpg` | https://unsplash.com/license; https://unsplash.com/photos/GrmwVnVSSdU | Retained for selected inner pages; representative context only | source-recorded |
| A11 | `public/assets/hero/dawn-upstream-pumpjack.png` (+ optimized JPEG derivative) | Former Aureum hero reassigned by the client; original creator not identified | production-use provenance requires confirmation | Dawn homepage hero; representative upstream context only; no facility-ownership claim | client-directed |
