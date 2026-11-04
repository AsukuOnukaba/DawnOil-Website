# Dawn Oil Limited — AI Website Development Documentation v1.0
Status: **draft for developer implementation and management review**, not publication approval. 31 October 2026.

Source hierarchy: **S1** `Dawn_Oil_Website_Development_Brief.docx` (original 18 pages, 21 Oct 2026) is the governing business-content and sitemap source; **U1** user instructions 30–31 Oct 2026 supersede visual directions and confirm the supplied official logo and offshore-platform hero image; **R1–R3** external websites are inspiration only. Earlier generated proposal and developer plan are secondary interpretation, not independent facts. No unsupported claims should reach a public build.

Project boundary: **DAWN OIL ONLY**. Never import Aureum materials, branding, assets, product categories, marketing copy, palette or services. Both client projects run concurrently but remain separate repositories and documentation.


## Accounts and ownership
CEO is final launch approver and company account owner per project's working arrangement. The actual Dawn domain, registrar/host, email account and deployment destination are **not supplied**. Do not assume same domain/host as Aureum.

## Local
Check installed Node and Astro versions first. Use project-local dependencies; no global upgrades on user's Intel macOS Monterey without consent. `npm install`, `npm run dev`, `npm run build`, `npm run test:browser` only after scripts exist and are approved.

## Enquiry options
- Option A: verified `mailto` for initial presentation and launch if company approves; no form submission tracking, relies on client email application.
- Option B: managed form-to-email provider with spam controls, attachment restrictions and privacy review; no custom backend, but vendor processes submitted personal data. Needs provider/account/receiving mailbox/retention confirmation.
- The original brief requests a working form; track deviation if only email link is deployed. Do not invent operational contact details or claim it works when inactive.

## Formspree contact integration
- Create a Formspree account-owned form and copy its form ID from the Formspree dashboard. Do not substitute an email address or invented ID.
- Copy `.env.example` to `.env` for local work, or set `PUBLIC_FORMSPREE_FORM_ID` in the build environment. The ID is a public form identifier, not a private API credential.
- Configure the recipient only in Formspree: verify the approved recipient address with the account, then select that verified address in the form's Workflow/Email target settings.
- To test delivery after privacy/processing approval, use a protected, non-indexed staging build, an approved verified test recipient, synthetic test data and the real staging Formspree ID. Set `PUBLIC_FORMSPREE_ENABLED=true` only in that staging build; keep the public/production build flag false until production approvals are complete. Never use real personal data for unapproved tests. Automated browser tests mock Formspree and make no external submissions.
- Production builds remain disabled by default. Enable submissions only after the recipient mailbox, Privacy Notice, data-retention arrangement and processing approval are confirmed; then set `PUBLIC_FORMSPREE_ENABLED=true` and rebuild/redeploy with the approved ID.
- To disable submissions immediately, set `PUBLIC_FORMSPREE_ENABLED=false` and rebuild/redeploy. The form then shows an unavailable state and has no active endpoint/action.
- The form uses Formspree's `@formspree/ajax` client and `_gotcha` spam honeypot. No files are accepted. The visitor's `email` field is used by Formspree for the email Reply-To header.

## Domain, hosting, analytics
- Staging URL may be private, no indexing; use account protection where available. Configure correct canonical only after domain is supplied.
- Deployment: static build folder (`dist/` for Astro), HTTPS, appropriate cache headers, redirects and custom 404. Avoid uploading documents to public folder.
- Analytics optional; obtain consent/privacy approach before enabling tracking if required.

## Deployment gate and rollback
1. `npm run build` succeeds; check output for documents/private assets.
2. Verify all eight routes or hide unready routes; links, contact handling, mobile nav, 404 and metadata.
3. Confirm image permissions and logo ownership; platform hero never described as owned Dawn asset.
4. CEO signs off brand, copy, contacts, legal terms and privacy.
5. Deploy release commit to company-owned target. Confirm production pages and SSL.
6. Rollback via previous successful static deployment/commit; record release ID and who authorised it.

## Maintenance
Developer makes source-controlled changes as requested. This does not imply a permanent CMS operator. Confirm commercial maintenance arrangement separately from technical stack.
