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
7. RELEASE BLOCKER: confirm the original creator/source and production-use permission for the client-directed homepage pumpjack image. Its Dawn source record says it was previously used as an Aureum hero; do not infer exclusive use or current Aureum deployment from Dawn records.
8. Recover and verify the individual Unsplash source records for the Partnerships and Contact hero photographs; the retained register has no item-level photographer/source links.
9. Confirm whether Dawn requires non-technical content editing access; user prefers no backend but original Dawn brief requested CMS. Default to static until resolved.

## Phase 2D leadership publication status
- The five profiles supplied in `Dawn Oil LImited - Corporate Bios.pdf` have been integrated into the Leadership route and individual biography routes for client review.
- The document supplies names, professional histories and qualifications, but does not establish a current Dawn Oil appointment for Banke Alakija-Balogun, Emmanuel Ukegbu, Dr. Lazarus A. Angbazo, Ike Oguine or Anthony Muoneke. No Dawn-specific title is displayed until those appointments are confirmed.
- No approved director photographs were supplied in the document; the client-review version uses a text-led profile treatment rather than stock portraits.

## Developer decisions — DO NOT ask CEO to do developer's work
Astro vs other static tool choice, minor colour tokens, font scale, screenshot measurements, CSS, responsive breakpoints, image optimisation, animation timing, deployment recommendation, QA implementation, copy editing from approved source. CEO approves final appearance, not every CSS pixel.

## Deferred / excluded
Sand management or any technical field service not established as Dawn's activity; do not add merely because discussed earlier. News, asset maps, production stats, credentials, named partners and project claims require separately approved proof. Contact documents uploads excluded initially.

## Phase 2C contact integration status
- The contact interface is implemented locally with required fields, validation and enquiry-type preselection.
- Submission remains disabled because no approved receiving mailbox or managed form provider is configured. Required decisions: provider/account owner, recipient mailbox, spam controls, retention and processor/privacy terms.
- No public office address, telephone number or corporate mailbox has been supplied, so only the verified company name is displayed.
- A final approved Privacy Notice is still required before an enabled form can link to it or process personal data.

## Production finalisation — legal and image-rights blockers
- `/privacy` and `/terms` are implemented as noindex review routes and must receive management/legal approval before publication as final notices.
- Confirm the approved privacy contact, legal entity details, Formspree account and recipient mailbox, hosting provider, provider processing locations, cross-border safeguards, retention periods and data-subject request workflow.
- The homepage pumpjack photograph remains the client-directed asset, but its original creator, source URL, rights holder and production-use permission are not documented. Obtain confirmation before public launch; do not replace the approved hero automatically.
- The Partnerships and Contact hero records still lack item-level photographer/source URLs. Confirm those records and any required attribution before public launch.
- No analytics or advertising scripts are present in the current codebase. Confirm this remains true for the production hosting configuration.

### Image-source investigation — 9 November 2026
- `public/assets/hero/dawn-upstream-pumpjack.jpg` is the homepage hero and remains the client-directed former Aureum hero. Its local JPEG metadata identifies Canva (Lightspeed Local) as editing software only; no creator, source URL, rights holder or production-use permission was found in Dawn documents, Git history, embedded metadata or targeted web searches.
- `public/assets/editorial/partnerships-strategy.webp` is the `/partnerships` hero and `public/assets/editorial/contact-business-meeting.webp` is the `/contact` hero. Both are recorded as Unsplash images, but their WebP metadata, Dawn documents, Git history, filenames and targeted web searches do not establish the exact image-page URLs or photographers.
- Next practical step: obtain the original downloads or source records from the asset supplier/client. If unavailable, upload each original file to Google Lens or TinEye, compare the exact composition rather than a visually similar result, and retain the matched image-page URL plus licence evidence before changing the manifest or Image Credits page.

## Phase 3A search, metadata and legal status
- All public routes have unique titles and descriptions. Shared Open Graph and Twitter metadata is implemented; canonical, `og:url` and absolute social-image URLs are emitted only after an approved production site URL is configured.
- No sitemap is generated while the production domain is unknown, preventing preview or invented URLs from entering search metadata. The future sitemap must use the approved domain and exclude `/leadership`.
- `/leadership` remains unlinked and now carries `noindex, nofollow, noarchive`. `robots.txt` permits crawlers to read that page-level directive; the route is absent from navigation and any sitemap. These controls do not provide access control, so the route must not be deployed publicly until its content is approved or the hosting environment protects it.
- Internal legal drafts remain in `questions_for_ceo/DRAFT_PRIVACY_NOTICE_AND_WEBSITE_TERMS.md`; the new `/privacy` and `/terms` routes are noindex review routes only and must not be treated as final policies until company details, providers, retention and legal wording are approved.
