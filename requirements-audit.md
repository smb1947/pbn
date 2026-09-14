# Assignment Requirement Map

## Purpose

This document maps PbN's requirements to the final Product and Technical Specification and its appendices. The Day 1 strategy narrative is an internal decision artifact; it establishes the decisions used in the final specification and is not submitted separately.

## Deliverable map

| Requirement | Final specification | Appendix evidence | Priority |
|---|---|---|---|
| Customer problem, primary users, and responsibilities | Strategy context and functional requirements | Roles and permissions table | Must-have |
| Create, submit, track, remit, post, and update balances | Functional requirements | End-to-end sequence | Must-have |
| V1 scope, later scope, and rationale | Selected initial scope and deferred scope | Scope table | Must-have |
| Success metrics | Rollout and success metrics | Metric definitions and guardrails | Must-have |
| Included and deferred edge cases | Functional requirements and deferred scope | Edge-case matrix | Must-have |
| Sources of truth and service boundaries | System architecture | Architecture and data-flow diagram | Must-have |
| Synchronous calls, events, and consistency | System architecture | End-to-end sequence | Must-have |
| Organization, practice, location, and tenant isolation | Non-functional requirements and architecture | Tenancy and authorization controls | Must-have |
| Ledger choice, reversals, and balance derivation | Ledger and balance design | Balanced journal examples | Must-have |
| Entities, fields, relationships, indexes, and constraints | Core data model | Entity-relationship model and schema table | Must-have |
| Seven APIs with requests, responses, idempotency, and errors | API contracts | API contract table and examples | Must-have |
| Duplicate ERA and clearinghouse callbacks | Non-functional requirements | Idempotency matrix | Must-have |
| Concurrent posting and partial failure | Non-functional requirements | Failure sequence and recovery matrix | Must-have |
| Drift detection, monitoring, and repair | Non-functional requirements | Reconciliation matrix | Must-have |
| Feature flags and progressive rollout | Rollout plan | Rollout stages and exit criteria | Must-have |
| Migration and production validation | Rollout plan | Migration and shadow-validation plan | Must-have |
| Day-one instrumentation | Rollout and success metrics | Metric definitions, thresholds, and owners | Must-have |
| Three to ten assumptions, exclusions, and AI disclosure | Assumptions, deferred scope, trade-offs, and AI usage | None unless detail is necessary | Must-have |

## Evaluation map

| PbN criterion | Evidence required |
|---|---|
| Billing correctness | A plain-language claim-to-payment journey and accurate exception handling |
| Technical depth | Explicit ownership, contracts, states, consistency, and tradeoffs |
| Multi-tenant thinking | Enforced organization, practice, and location isolation across data and infrastructure |
| Financial rigor | Balanced immutable entries, reversals, projections, and reconciliation |
| Buildability | Concrete data model, APIs, errors, and failure behavior |
| V1 judgment | A narrow, complete scope with explicit exclusions and rationale |

## Decision sequence

Do not make solution or V1 decisions until the problem framing is complete.

1. Establish the customer, users, current workflow, challenges, and business impact.
2. Establish constraints, goals, non-goals, decision criteria, and evidence gaps.
3. Separate assignment facts and external evidence from assumptions that require validation.
4. Choose the V1 boundary, supported paths, success measures, and explicit exclusions.
5. Choose the product, ledger, architecture, tenancy, reliability, and rollout design.
6. Record the major trade-offs and why the chosen design wins.
