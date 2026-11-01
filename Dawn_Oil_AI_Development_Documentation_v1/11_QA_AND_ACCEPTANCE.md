# Dawn Oil Limited — AI Website Development Documentation v1.0
Status: **draft for developer implementation and management review**, not publication approval. 31 October 2026.

Source hierarchy: **S1** `Dawn_Oil_Website_Development_Brief.docx` (original 18 pages, 21 Oct 2026) is the governing business-content and sitemap source; **U1** user instructions 30–31 Oct 2026 supersede visual directions and confirm the supplied official logo and offshore-platform hero image; **R1–R3** external websites are inspiration only. Earlier generated proposal and developer plan are secondary interpretation, not independent facts. No unsupported claims should reach a public build.

Project boundary: **DAWN OIL ONLY**. Never import Aureum materials, branding, assets, product categories, marketing copy, palette or services. Both client projects run concurrently but remain separate repositories and documentation.


## Homepage acceptance checklist
- [ ] Exact supplied logo visible, not overlarge; has adequate clearance/contrast; no break-out.
- [ ] Exact supplied offshore image is hero; subject remains visible at 1440/768/390; image not represented as Dawn-owned.
- [ ] Cream/amber palette dominates; dark hero portion balanced by light page sections; strong text contrast.
- [ ] Hero text not enormous; H2 visually smaller than H1; nav 15–16px and not crammed.
- [ ] Meaningful active-nav/focus states and clear mobile menu; no hover-only content.
- [ ] Three focus cards accurately explain interest in acquisitions/licensing/partnerships; no blocks, production or assets invented.
- [ ] Leadership preview contains only actual approved people; no stock faces pretending to be directors.
- [ ] Every public sentence is customer-facing; no terms like 'brief', 'placeholder', 'approval pending', 'draft', 'this preview', 'no claims'.
- [ ] Privacy/contact route functional or removed before publication; no invented information.
- [ ] All photos licensed/provenance documented; no competitor logos.
- [ ] Build passes, no JS console errors, no overflow at 320/390/768/1280/1440.
- [ ] `prefers-reduced-motion` removes unnecessary animation and content stays visible.
- [ ] Private documentation does not ship in `dist`.

## Verification cadence for credit efficiency
- Text/CSS one-component changes: focused local build and affected screenshot.
- New page: relevant route tests + mobile/desktop visual.
- Before public deployment: site-wide SEO, navigation, claims and functional review with full test suite.
- Never auto-update golden screenshots; record intent and obtain developer approval.
