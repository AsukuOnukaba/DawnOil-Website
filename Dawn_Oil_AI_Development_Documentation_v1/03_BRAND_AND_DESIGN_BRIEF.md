# Dawn Oil Limited — AI Website Development Documentation v1.0
Status: **draft for developer implementation and management review**, not publication approval. 31 October 2026.

Source hierarchy: **S1** `Dawn_Oil_Website_Development_Brief.docx` (original 18 pages, 21 Oct 2026) is the governing business-content and sitemap source; **U1** user instructions 30–31 Oct 2026 confirm the supplied official logo and lighter palette; **U2** and **U3** user instructions on 3 Nov 2026 clarify project-specific image direction, with U3 selecting the former Aureum pumpjack/crane image for Dawn's homepage hero; **R1–R3** external websites are inspiration only. Earlier generated proposal and developer plan are secondary interpretation, not independent facts. No unsupported claims should reach a public build.

Project boundary: **DAWN OIL ONLY**. Never import Aureum materials, branding, assets, product categories, marketing copy, palette or services. Both client projects run concurrently but remain separate repositories and documentation.


## Brand attributes
Dawn Oil is an upstream **investment and commercial opportunity** business; credible, restrained, purposeful, established in tone without implying a production history. Do not use visual cues that falsely imply owned offshore assets or existing operations.

## Locked and proposed assets
- **Official supplied artwork:** `assets/brand/DawnOil_Logo_Supplied.png` (1240×981 RGBA source image). Keep exact artwork, no recolouring, cropping of letters, tracing or AI replacement. Inspect its apparent background on both cream and dark areas; adjust the **container background**, not the logo.
- **Primary hero (clarified 3 November 2026):** `public/assets/hero/dawn-upstream-pumpjack.png` (1913×1341), the former Aureum pumpjack/crane image reassigned by the client to Dawn. Use as representative upstream-industry context, never as a Dawn-owned or operated facility. Preserve a readable text field in the existing responsive crop.
- The former Dawn offshore-platform photograph is superseded for Dawn’s homepage, designated as Aureum Energy’s homepage hero, and may be reused on Dawn inner pages as clean upstream context.

## Colour direction — requested by client
- Main canvas: warm cream `#F7F1E6` (proposed), off-white `#FFFDF9` (proposed), white `#FFFFFF`.
- Amber highlights: `#D89A3C` (proposed), deep amber for readable buttons `#A96621` (proposed).
- Ink: charcoal `#26303B` (proposed); deep ink blue `#27384B` (proposed) for tiny areas/footer if required.
- White text allowed **only on backgrounds/images with verified sufficient contrast**; do not force white text over cream.
- Existing brief p4 navy/teal/gold palette is **superseded by latest user direction**; new values above are working design tokens, not official corporate hex codes. Keep colour use minimal and avoid orange blocks or black-heavy sections.

## Type and spacing
- Sans-serif: Inter, Source Sans 3 or similar; favor readable normal case over giant all-caps. Suggested desktop H1 48–58px, H2 34–42px, H3 22–28px; body 16–18px. Mobile H1 34–40px, H2 27–32px. Final sizes measured against screenshots in fidelity file.
- Max content width 1200–1280px, text measure 55–70ch, section padding desktop 72–104px/mobile 44–64px; nav 15–16px with comfortable gaps.
- Hero: one powerful photographic image, concise headline, primary CTA. No forced autoplay video, audio, or carousel. Optional subtle motion on still image must not imply a video exists.
- Components: slightly rounded buttons/cards (4–8px radius), soft section separators, restrained borders, visible active nav and footer link coverage.

## Motion system
- Hover underline 160–220ms, card lift 2–4px, image reveal 300–550ms, scroll reveal used sparingly and only where content is always accessible without JS.
- Respect `prefers-reduced-motion`; no mandatory parallax, excessive transitions, auto-sound or background animation that affects performance.

## Image art direction beyond hero
- About: professional Nigerian business meeting/energy-industry planning context, without logos, sensitive documents or implied actual staff.
- Focus: high-quality offshore industrial infrastructure **as sector context**; energy landscape; clear asset opportunity maps only if abstract and not identifying Dawn holdings.
- Capabilities: boardroom document review, contract/planning imagery, technical/commercial discussion (not welding rigs as a Dawn service).
- Leadership: genuine supplied director portraits, never stock stand-ins for named people.
- Partnerships: hands reviewing project documents or industrial landscape; no competitor or unapproved partner logos.
- Responsibility: ecological landscape or generic safe-work scene without claimed projects or safety achievements.
- Avoid unrelated saturated sunset stock, rusted, worn, damaged or poor-condition machinery, watermarked stock and competitor-branded photographs. The client-selected pumpjack hero is the approved upstream image direction.
