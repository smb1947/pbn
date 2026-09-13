
## V1 AI experience and financial controls

V1 applies AI to three judgment-heavy tasks while deterministic software remains the authority for claim state and money movement.

| V1 capability | AI-assisted experience | Financial control |
|---|---|---|
| Claim readiness | Identify missing or conflicting patient, coverage, provider, procedure, and fee information; suggest corrections. | Deterministic rules validate required fields and formats. Staff approve every claim before submission. |
| Exception work | Translate rejection and denial messages into plain language and prioritize work by filing deadline, claim value, age, and next action. | AI never changes claim status. Confirmed external events and approved staff actions do. |
| Posting review | Suggest matches between remittance lines, claims, procedures, and deposits; explain the resulting balance. | Only exact, balanced matches post automatically. Staff approve ambiguous matches, and explanations are generated from ledger entries rather than calculated by AI. |

Each AI request is restricted to the requesting tenant. V1 does not train shared models on customer claims or protected health information. Every staff-approved suggestion records the model version, recommendation, user, and resulting action in the audit history.

## V1 scoping decision

V1 will create claims from completed procedures, submit and track them, receive and post insurer responses, handle denials, partial payments, and reversals, and update patient and insurance balances. Four decisions define the boundary of that workflow.

| Dimension | Decision controlled | Choices considered | V1 decision |
|---|---|---|---|
| Claim coverage | Which bills enter the workflow | Primary only; primary and secondary; electronic and paper; predetermination; self-pay | Electronic primary-insurance claims for completed treatment. Claims may contain multiple procedure lines. |
| External integrations | How claims and insurer responses move between systems | One or multiple clearinghouses; direct payer connections; automated or manual bank matching | One clearinghouse integration for submission, status, and electronic remittance. Bank deposits are confirmed manually using the remittance's payment reference. |
| Automation | Which actions occur without staff approval | Manual processing; deterministic rules; probabilistic or AI decisions | AI assists claim readiness, exception work, and posting review. Staff approve submissions and ambiguous financial responses; only deterministic, exact, and balanced remittance matches post automatically. |
| Exception coverage | Which non-happy paths the product must complete safely | Happy path only; minimum operational set; broad denial and appeal management | Correct and resubmit rejected claims; post partial payments; prevent duplicate posting; support manual matching, corrections, and reversals; record denials without managing appeals. |

V1 supports organization, practice, and location boundaries, but the pilot focuses on one multi-location group using the selected clearinghouse and a limited payer set.

Later releases add secondary and tertiary insurance, coordination of benefits, paper claims and remittances, predeterminations, complex attachments, denial appeals, multiple clearinghouses, direct payer connections, automated bank reconciliation, and historical migration. Patient responsibility is created in V1; collecting self-pay balances remains in PbN's existing payment workflow rather than being rebuilt in Claims & Ledger.

This boundary limits claim types, integrations, automation, and exception depth while preserving a complete path from treatment to an accurate balance.

## Product principles

Correctness comes before speed. Uncertain financial events go to staff; they are not guessed or silently posted.

Completeness comes before breadth. PbN proves one end-to-end workflow before adding claim types, insurers, or automation.

History must remain preserved and explainable. PbN shows every exception and corrects financial errors with traceable reversals, not deletion.
