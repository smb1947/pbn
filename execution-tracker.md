# 16-Hour Execution Tracker

## Goal

Produce a defensible PbN Claims & Ledger V1 Product and Technical Specification by Sunday, September 13, 2026 at 9:00 PM Pacific Time. Use eight focused hours per day and reserve the final three hours of Day 2 for review, refinement, and submission. The CEO and potentially other CxOs will read it.

## Progress

| Updated | Current phase | Used | Remaining | Next action |
|---|---|---:|---:|---|
| 2026-09-14 | Day 2: Claim preparation deep dive | 3.75h | 12.25h | Review the completed Claim-preparation specification for consistency, then add the minimum end-to-end coverage required by the brief. |

Latest work block: simplified the Claim-preparation boundaries into separate lists of five assumptions and five exclusions. Reliability requirements and rollout remain open; the product metrics still need a claim-creation integrity measure and a staff-effort measure.

Update this row and the phase status after every work block.

## Approach

- Treat the assignment's breadth and ambiguity as a prioritization test, not a request to cover everything.
- Do not infer the V1 from the assignment title or required deliverables. Frame the problem before choosing the solution.
- Optimize for confidence and implementability. A small, complete scope is better than a broad, shallow design.
- Include only decisions Shankar can explain, reason about, and defend under executive or technical questioning.
- Make deliberate prioritization visible by stating the chosen scope, assumptions, tradeoffs, and exclusions.

## Output contract

| Day | Main document | Purpose |
|---|---|---|
| 1 | Internal working strategy narrative | Capture the customer, problem, constraints, goals, V1, success measures, design choices, and trade-offs without a page limit. Condense after the strategy is complete. This is not submitted. |
| 2 | Claims & Ledger V1 Product and Technical Specification | Complete, review, render, and submit the product and technical design. |

Appendices may be any length, but include only material needed to prove or defend the main narrative.

## Day 1 — Internal strategy narrative | 8 hours

| Work | Time | Status | Output |
|---|---:|---|---|
| Audit | 0.5h | Complete | Map every assignment requirement to the final document or appendix without assuming an existing draft. See `requirements-audit.md`. |
| Frame and learn | 2h | Complete | Three operating-model segments and five common workflow needs are drafted. Segment-specific pain points are intentionally deferred pending primary and secondary customer research. |
| Decide | 1.5h | Complete | Defined the beachhead, claim coverage, clearinghouse boundary, automation rule, required exceptions, and later scope. |
| Draft | 2.5h | In progress (0.5h used) | Problem and product-strategy sections are drafted. System design and the remaining execution sections have not started. |
| Review | 1.5h | Not started | Remove ambiguity and repetition; test the narrative against all six evaluation criteria. |

**Working narrative structure**

1. **Problem:** PbN context, target customer, primary users, current workflow, pain points, importance, goals, non-goals, and constraints.
2. **Product strategy:** Segment definitions, customer-research boundary, common workflow needs, V1 coverage and automation choices, rationale, later scope, principles, and success measures.
3. **Execution strategy:** High-level system and ledger design, multi-tenancy, reliability, key trade-offs, risks, rollout, validation, and assumptions.

Put detailed data models, APIs, accounting examples, state diagrams, and failure scenarios in the appendices.

There is no Day 1 page limit during discovery. Preserve important evidence, assumptions, alternatives, and rationale now; remove repetition and condense only after the strategy is complete.

**Day 1 gate:** Shankar can explain the customer problem, goals, constraints, and strategy in five minutes and defend why the V1 is neither smaller nor larger.

## Day 2 — Final Product and Technical Specification | 8 hours

| Work | Time | Status | Output |
|---|---:|---|---|
| Product and workflow design | 1.5h | In progress | Finalize users, workflows, functional requirements, scope, exclusions, metrics, and edge cases. |
| Architecture and financial design | 2h | Not started | Finalize sources of truth, services, data flow, ledger entries, reversals, and balances. |
| Data, APIs, and reliability | 1h | Not started | Finalize entities, contracts, duplicate protection, concurrency, and reconciliation. |
| Tenancy, rollout, and assumptions | 0.5h | Not started | Finalize tenant isolation, security, rollout, migration, validation, risks, and assumptions. |
| Review, refine, and submit | 3h | Not started | Red-team the scope, accounting, architecture, failure behavior, assumptions, and tradeoffs; fix gaps and ambiguity; verify completeness and PDF rendering; submit. |

## Appendices — Must-have only

- Plain-language glossary
- End-to-end sequence and state model
- Service-boundary and tenant-isolation diagram
- Core data model with keys and uniqueness constraints
- Balanced ledger examples, including a reversal
- API, concurrency, and error table
- Failure, reconciliation, rollout, and metrics matrix

## Final gates

- Trace one claim from completed procedure through submission, adjudication, posting, and balances.
- Explain denial, partial payment, duplicate ERA, correction, reversal, and unmatched remittance behavior.
- Confirm every journal entry balances and every retry is safe from duplicate posting.
- Answer every assignment requirement in the final specification or appendix.
- Cut anything that does not improve correctness, buildability, financial rigor, product judgment, or defensibility.

## Workspace maintenance — October 17, 2026

Moved the resume PDF and its extracted text copy to Trash at Shankar’s request. Prepared the tracked deletions and this maintenance note for a normal commit and push on codex/claim-preparation-spec. The separate claims-ledger-workflow repository is excluded. Specification progress and focused-work-hour totals are unchanged.

Prepared the updated AGENTS.md and all workflow-lab files for commit and push in the parent repository. The workflow lab’s local Git metadata is preserved and excluded from the parent commit. Specification progress and focused-work-hour totals are unchanged.

Added the assignment PDF to .gitignore and removed it from Git tracking while retaining the local file. Specification progress and focused-work-hour totals are unchanged.

Added assignment.txt to .gitignore and removed both the root and tmp/pdfs copies from Git tracking while retaining the local files. Specification progress and focused-work-hour totals are unchanged.

Created README.md with linked summaries of the strategy narrative and the current claim-preparation specification, distinguishing the overall product scope from the stage covered in detail. Specification progress and focused-work-hour totals are unchanged.
