# Dawn Oil Limited — AI Website Development Documentation v1.0
Status: **draft for developer implementation and management review**, not publication approval. 31 October 2026.

Source hierarchy: **S1** `Dawn_Oil_Website_Development_Brief.docx` (original 18 pages, 21 Oct 2026) is the governing business-content and sitemap source; **U1** user instructions 30–31 Oct 2026 supersede visual directions and confirm the supplied official logo and offshore-platform hero image; **R1–R3** external websites are inspiration only. Earlier generated proposal and developer plan are secondary interpretation, not independent facts. No unsupported claims should reach a public build.

Project boundary: **DAWN OIL ONLY**. Never import Aureum materials, branding, assets, product categories, marketing copy, palette or services. Both client projects run concurrently but remain separate repositories and documentation.


## Phase 0 — Evidence and baseline
- Read S1 in full. Extract proposed copy as draft and annotate page/section source. Verify logo and platform image open successfully. Inspect EXIF/licence provenance with developer; do not assume image depicts Dawn property.
- Capture 1440×900, 1280×800, 768×1024, 390×844 reference-site screenshots **only where permitted** and note exact source URLs/date; no need to reproduce the competitor pages.
- Draft design tokens and one homepage wireframe with desktop/mobile states.
- Gate G0: source matrix and design direction consistent; unresolved publication facts tracked, not guessed.

## Phase 1 — Homepage foundation
- Recommend Astro static + TypeScript + global CSS, subject to toolchain compatibility; no CMS, DB, sign-in, dashboards.
- Set up semantic shell, responsive navigation, logo, hero using developer-supplied offshore-platform photo, restrained animation, sections per S1 p6.
- Use proposed brief hero text as draft, not a mandatory slogan: 'Building value in Nigerian upstream energy'. Keep line breaks moderate and natural.
- Implement CTAs only to existing routes or explicit non-functional design states in private preview; no dead links on published site.
- Gate G1: responsive homepage + one selected inner-page design presented together, desktop/mobile, before full site build.

## Phase 2 — Eight-page content architecture
- Reuse components (header, footer, section, split editorial block, focus card, leadership card, CTA).
- Implement pages in order: About, Our Focus, Capabilities, Leadership, Partnerships, Responsibility, Contact.
- Leadership: no fabricated directors or photos; publish only approved profiles. Dedicated /leadership/[slug] for approved director biographies.
- Hide future Assets/Projects and News routes until verified and approved. Include Privacy and Website Terms only when reviewed.
- Gate G2: content review confirms no company/partner conflation or invented history.

## Phase 3 — Contact decision and hardening
- Choose verified company email and public phone/address. S1 requests a functioning form; static site can use a managed form-to-email provider without a custom backend, but provider, privacy and retention need approval.
- No confidential financial, bid or data-room attachments through public contact form.
- SEO title/description, canonical after domain confirmed, sitemap, robots, 404, semantic headings, asset alt text, accessible forms and consent approach.
- Gate G3: functional tests prove delivery (if form approved) and no placeholder contacts visible.

## Phase 4 — Visual QA, staged review, controlled launch
- Playwright Firefox 1.38.0 is **known to work in user's Monterey project**, but pin only if it works in Dawn's environment; do not automatically upgrade Node or system software.
- Screenshot tests at 1440, 1280, 768, 390 widths; reduced motion, keyboard nav, links, mobile menu; test real image sizes/crops.
- Recheck public copy for internal text leakage, unverified metrics, inaccurate imagery, legal privacy statements.
- Use private staging, company-owned hosting/domain, CEO final launch approval. Archive approved screenshots and release commit; rollback tested.
- Gate G4: CEO approval, accurate contacts, image licences and publication rights.

## AI efficiency
- Work ONE phase and one page at a time. Do not audit all briefs for a small CSS change. Focused tests for focused changes. Do not update baseline screenshots without visual approval. Report <= 12 concise lines per change.
