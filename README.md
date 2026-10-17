# Claims & Ledger

Claims & Ledger connects completed dental treatment to an insurance claim, the insurer’s payment decision, and an explainable patient balance. The strategy defines the overall product direction; the current product and technical specification details the claim-preparation stage.

## Strategy narrative

The [Claims & Ledger Strategy](<strategy narrative.md>) targets U.S. multi-location dental groups that use PbN as their practice-management system and centralize some or all insurance billing. Billing coordinators need one workflow to prepare accurate claims, track insurer responses, resolve exceptions, and record correct financial outcomes without repeatedly comparing and entering information across systems.

The proposed initial scope supports primary claims for completed treatment, electronic transactions, and one clearinghouse. It covers preparation, submission, tracking, remittance posting, and reconciliation, with handling for rejections, denials, partial payments, duplicates, unmatched remittances, and reversals. Staff approve submissions; deterministic rules automate exact, balanced remittance matches; AI assists with ambiguous matches that require staff approval. Secondary and tertiary claims, predeterminations, paper processing, full appeal management, and autonomous AI are outside the initial scope. The narrative explains these tradeoffs through concrete examples and includes a domain glossary and references.

## Claim-preparation product and technical specification

The [Claims & Ledger V1 specification](claims-ledger-v1-spec.md) defines the workflow from a completed insured procedure to a validated, staff-approved claim in `READY` state. PbN assembles a draft from existing patient, coverage, provider, location, and procedure records. The billing coordinator corrects source data, resolves blocking validation errors, and approves the claim. Approval creates an immutable snapshot of the approved values; clearinghouse submission begins the next stage.

The specification includes functional requirements and acceptance conditions, the review experience, component ownership, an entity-relationship diagram, and a logical database schema. It defines duplicate protection, stale-edit rejection, atomic approval and version creation, and an append-only audit history. Its tenant-isolation design combines authenticated organization context, composite keys, and PostgreSQL row-level security. Proposed product targets measure preparation completion, first-pass validation, preparation time, and manual re-entry.
