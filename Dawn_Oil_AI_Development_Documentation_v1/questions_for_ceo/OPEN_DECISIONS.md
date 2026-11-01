# Dawn Oil Limited — AI Website Development Documentation v1.0
Status: **draft for developer implementation and management review**, not publication approval. 31 October 2026.

Source hierarchy: **S1** `Dawn_Oil_Website_Development_Brief.docx` (original 18 pages, 21 Oct 2026) is the governing business-content and sitemap source; **U1** user instructions 30–31 Oct 2026 supersede visual directions and confirm the supplied official logo and offshore-platform hero image; **R1–R3** external websites are inspiration only. Earlier generated proposal and developer plan are secondary interpretation, not independent facts. No unsupported claims should reach a public build.

Project boundary: **DAWN OIL ONLY**. Never import Aureum materials, branding, assets, product categories, marketing copy, palette or services. Both client projects run concurrently but remain separate repositories and documentation.


## Settled developer/client instructions
| Decision | Status |
|---|---|
| Eight main pages initially | Defined in original 18-page Dawn brief |
| Cream and amber, lighter design, moderate text | User instruction 31 October 2026 |
| Supplied offshore platform as hero; sunset crane excluded | User instruction |
| Supplied Dawn Oil logo used unchanged | User-supplied artwork |
| Atlas Oil, Renaissance Africa and Chevron are references | User instruction |
| Animations restrained and accessibility-respecting | Brief + user request |
| CEO owns project and authorises launch | Prior project working arrangement; clarify actual accounts separately |

## High-value confirmations — only if unavailable in S1
1. Confirm legal registered company name and RC for public footer and structured data.
2. Confirm current public office address, official telephone and inbound email for website.
3. Confirm which director names/titles, portraits and final biographies are approved for publication.
4. Confirm whether optional gas investment focus should be published.
5. Approve any named partner description (Waltersmith etc.); otherwise omit entirely.
6. Choose website enquiry implementation: managed form-to-email or direct verified mailbox; privacy responsibility and data retention.
7. Confirm ownership/licensing of supplied platform photo and approved image library, if any.
8. Confirm whether Dawn requires non-technical content editing access; user prefers no backend but original Dawn brief requested CMS. Default to static until resolved.

## Phase 2D leadership publication status
- The Leadership route and reusable director-card/biography structures are implemented locally for review.
- Navigation and homepage activation remain blocked until at least one director's full public name, current Dawn title, approved portrait, short and full biographies, relevant previous experience and approved qualifications are confirmed for publication.
- The draft profile in S1 Section 9 has not been published or used to create a biography route.

## Developer decisions — DO NOT ask CEO to do developer's work
Astro vs other static tool choice, minor colour tokens, font scale, screenshot measurements, CSS, responsive breakpoints, image optimisation, animation timing, deployment recommendation, QA implementation, copy editing from approved source. CEO approves final appearance, not every CSS pixel.

## Deferred / excluded
Sand management or any technical field service not established as Dawn's activity; do not add merely because discussed earlier. News, asset maps, production stats, credentials, named partners and project claims require separately approved proof. Contact documents uploads excluded initially.

## Phase 2C contact integration status
- The contact interface is implemented locally with required fields, validation and enquiry-type preselection.
- Submission remains disabled because no approved receiving mailbox or managed form provider is configured. Required decisions: provider/account owner, recipient mailbox, spam controls, retention and processor/privacy terms.
- No public office address, telephone number or corporate mailbox has been supplied, so only the verified company name is displayed.
- A final approved Privacy Notice is still required before an enabled form can link to it or process personal data.

## Phase 3A search, metadata and legal status
- All public routes have unique titles and descriptions. Shared Open Graph and Twitter metadata is implemented; canonical, `og:url` and absolute social-image URLs are emitted only after an approved production site URL is configured.
- No sitemap is generated while the production domain is unknown, preventing preview or invented URLs from entering search metadata. The future sitemap must use the approved domain and exclude `/leadership`.
- `/leadership` remains unlinked and now carries `noindex, nofollow, noarchive`. `robots.txt` permits crawlers to read that page-level directive; the route is absent from navigation and any sitemap. These controls do not provide access control, so the route must not be deployed publicly until its content is approved or the hosting environment protects it.
- Internal Privacy Notice and Website Terms drafts are in `questions_for_ceo/DRAFT_PRIVACY_NOTICE_AND_WEBSITE_TERMS.md`. They must not become public routes until company details, providers, retention and legal wording are approved.
