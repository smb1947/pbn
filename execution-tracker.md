# 16-Hour Execution Tracker

## Goal

Produce a defensible PbN Claims & Ledger strategy by Sunday, September 13, 2026 at 9:00 PM Pacific Time. Use eight focused hours per day and reserve the final three hours of Day 2 for review, refinement, and submission. The CEO and potentially other CxOs will read it.

## Progress

| Updated | Current phase | Used | Remaining | Next action |
|---|---|---:|---:|---|
| 2026-09-13 | Day 1: Draft | 3.75h | 12.25h | Define the exact initial product workflow and requirements in `product-design.md`. |

Latest work block: moved the undeveloped product and technical design sections from `draft-strategy.md` to `product-design.md`.

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
| 2 | Final six-page PRFAQ: 1.5-page press release + 4.5-page FAQs | Convert the approved strategy into the only final submission. |

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

## Day 2 — Final PRFAQ | 8 hours

| Work | Time | Status | Output |
|---|---:|---|---|
| Press release | 1.5h | Not started | Write 1.5 pages explaining the customer, problem, launch, experience, and measurable value without technical jargon. |
| Product FAQs | 1h | Not started | Cover users, workflow, V1 scope, exclusions, metrics, and edge cases. |
| Technical and financial FAQs | 2h | Not started | Cover services, sources of truth, states, data, APIs, ledger entries, reversals, and balances. |
| Reliability, tenancy, and launch FAQs | 0.5h | Not started | Cover duplicates, concurrency, reconciliation, tenant isolation, rollout, and monitoring. Build supporting appendices alongside the FAQs. |
| Review, refine, and submit | 3h | Not started | Red-team the scope, accounting, architecture, failure behavior, assumptions, and tradeoffs; fix gaps and ambiguity; verify page limits and PDF rendering; submit. |

**4.5-page FAQ allocation**

- 1 page: customer, workflow, V1, exclusions, and success metrics
- 2 pages: architecture, data ownership, ledger, balances, and APIs
- 1 page: reliability, reconciliation, multi-tenancy, and security
- 0.5 page: rollout, migration, risks, assumptions, and tradeoffs

## Appendices — Must-have only

- Plain-language glossary
- End-to-end sequence and state model
- Service-boundary and tenant-isolation diagram
- Core data model with keys and uniqueness constraints
- Balanced ledger examples, including a reversal
- API and idempotency/error table
- Failure, reconciliation, rollout, and metrics matrix

## Final gates

- Trace one claim from completed procedure through submission, adjudication, posting, and balances.
- Explain denial, partial payment, duplicate ERA, correction, reversal, and unmatched remittance behavior.
- Confirm every journal entry balances and every retry is safe from duplicate posting.
- Answer every assignment requirement in the PRFAQ or appendix.
- Cut anything that does not improve correctness, buildability, financial rigor, product judgment, or defensibility.
