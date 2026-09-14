# Claims & Ledger Strategy

## What Claims & Ledger Is

Claims & Ledger manages the financial journey from completed dental treatment to the insurer's decision and the patient's final balance. A claim is the practice's request for insurance payment. The ledger is the permanent financial history of the resulting charges, insurer payments, adjustments, patient responsibility, and corrections.

For example, after a dentist completes a $200 filling, the billing coordinator confirms the patient, insurer, dentist, procedure, and fee before creating and submitting the claim through a clearinghouse. If the insurer allows $140, pays $100, assigns $40 to the patient, and requires a $60 contractual adjustment, the ledger records each amount and explains why the patient owes $40.

## Why It Is Important

Billing staff lack one reliable workflow to create an accurate claim, track it through the insurer's decision, and record the correct financial outcome. The work can span PbN's PMS, the clearinghouse, the insurer portal, the payment explanation, and the bank record, each updating at a different time. Staff repeatedly search, compare, enter, and recheck information while handling rejections, delays, denials, partial payments, duplicates, corrections, and reversals. A missed rejection delays payment, a duplicate posting overstates collections, and an incorrect adjustment can produce the wrong patient bill.

Practice by Numbers (PbN) already helps dental practices manage analytics, patient communication, scheduling, forms, insurance verification, and patient payments.<sup>6</sup> Claims & Ledger would connect these capabilities to the missing workflow between completed treatment and the final balance. This would expand PbN from showing practices how their business is performing to helping them operate the workflow that produces revenue.

AI makes this workflow easier to automate now. It can identify missing information, interpret insurer messages, prioritize work, and suggest payment matches, while deterministic rules remain responsible for claim validation and every financial posting. PbN already provides AI-based insurance summaries and operational insights, so this extends an existing product experience.<sup>7</sup> The transaction infrastructure is also mature: **90% of dental claims were submitted electronically in 2024**.<sup>4</sup>

The United States has **135,665 dental-practice establishments** and **202,485 professionally active dentists**.<sup>1,2</sup> Dental benefits cover **87% of the population**, making insurance billing a large, recurring workflow.<sup>3</sup> Meanwhile, **58% of dentists responding to an ADA poll identified reimbursement, denied coverage, delayed payments, or other insurance issues among their expected 2025 challenges**, while staffing shortages limit the time available for administrative work.<sup>5</sup> Claims & Ledger therefore addresses a large customer pain, builds on PbN's existing strengths, and creates a differentiated path from operational insight to financial action.

## Customer Segments

Dental practices differ in the number of locations they operate and whether insurance billing is handled locally or by a central team. These differences affect claim volume, staff handoffs, access controls, and implementation complexity.

| Segment | Definition | Buyer and primary user |
|---|---|---|
| Independent single-location practice | One practice where insurance billing is performed locally, often alongside other office work. | Practice owner; office manager or billing coordinator. |
| Multi-location dental group | Several locations under common management, with centralized or hybrid insurance billing and mostly standardized systems. | Owner or operations leader; central billing team and revenue manager. |
| Enterprise DSO | An organization providing business services to many affiliated practices, often across legal entities and heterogeneous systems. | Finance or revenue-cycle leader; billing, cash-posting, and regional operations teams. |

PbN serves single practices, multi-practice owners, and DSOs.<sup>14–16</sup>

Initially, PbN will focus on the Claims & Ledger needs common to all three segments. After the product gains adoption, PbN can use segment-specific needs and usage patterns to add configurable workflows, permissions, reporting, and integrations.

## Target Customer and Users

The initial target customer is a U.S. multi-location dental group that accepts insurance, uses PbN as its dental PMS, and centralizes some or all insurance billing. This segment has enough claim volume and cross-location handoffs to benefit from automation, while its systems and processes are more consistent than those of an enterprise DSO. Designing for organization, practice, and location boundaries also creates a path to serve independent practices and enterprise DSOs later.

The buyer is the owner or operations leader, who needs predictable collections, lower administrative cost, and consistent processes across locations.

The primary user is the billing coordinator, who creates and tracks claims, resolves exceptions, and posts insurer decisions.

The revenue leader is a secondary user who monitors collections, aging claims, staff productivity, and financial exceptions across locations.

Front-desk staff are secondary users who collect patient balances and explain what the patient owes.

The patient receives an accurate, understandable bill after the insurer's decision.

## Claims Workflow Stages and Pain Points

The workflow contains five stages, each with a distinct activity and customer pain.

| Stage | What happens | Common pain |
|---|---|---|
| 1. Claim preparation | After treatment is completed, the system converts the recorded procedures into an insurance claim. It verifies the patient, insurance plan, dentist, procedure codes, fees, and required documents. This stage ends when the claim is complete and ready to submit. | Required data is incomplete, inconsistent, or repeatedly entered. |
| 2. Submission | The system sends the claim through a clearinghouse to the insurer. The clearinghouse and insurer check whether they can accept it for review. If they reject it because information is missing or invalid, staff correct and resubmit it. Acceptance means the insurer will review the claim, not that it will pay it. | Clearinghouse and insurer responses or rejections require staff to search and rework data. |
| 3. Claim tracking | The insurer reviews the accepted claim, a process called adjudication. During this period, the claim may remain pending or require additional information. Staff need one place to see its status, owner, deadline, and next action. This stage ends when the insurer makes a payment decision. | Claim statuses and requests for more information are fragmented across systems. |
| 4. Remittance and posting | The insurer sends an ERA or EOB explaining what it paid, denied, adjusted, or assigned to the patient. The system matches this decision to the correct claim and procedures, then records the resulting financial entries in the ledger. Ambiguous matches require staff review. | Staff must translate the decision into payments, adjustments, denials, and patient responsibility. |
| 5. Reconciliation and balances | The system confirms that the insurer's payment matches the ERA/EOB and the ledger entries. It then calculates the remaining insurance and patient balances. Any mismatch becomes an exception for staff to resolve. This stage ends when the payment is accounted for and every balance can be explained. | The ERA/EOB, bank deposit, ledger, and patient balance may disagree. |

Exception handling cuts across all five stages. Each exception enters a staff queue with its reason, owner, and next action, and may return the claim to an earlier stage for correction and resubmission.

The five stages consolidate established industry transactions and operating steps: the ADA dental claim captures the information required to bill for treatment;<sup>17</sup> the X12 837D submits the claim;<sup>18</sup> the X12 276/277 exchanges claim status;<sup>19</sup> the ERA/EOB communicates the insurer's decision and supports posting;<sup>11,13</sup> and the ERA payment reference connects the explanation to the corresponding EFT for reconciliation.<sup>20</sup>

## Initial Scope

The five workflow stages define what Claims & Ledger must do. The following scope dimensions define which version of that workflow PbN will support initially. Claim coverage determines which claims move through the stages and when their balances become final. Transaction channel determines how claim and payment information enters the workflow. Connection route determines how stages 2–4 exchange information with insurers. Supported exceptions determine which problems staff can resolve without leaving PbN. Automation boundary then determines which actions PbN completes and which require staff approval.

### Shared hypothetical scenario

River Dental completes two treatments:

| Patient | Completed treatment | Insurance coverage | Connection route |
|---|---|---|---|
| Maya | Crown billed at $1,000 | Insurer A is primary; Insurer B is secondary | Clearinghouse 1 connects to both insurers |
| Noah | Filling billed at $200 | Insurer C is primary | Clearinghouse 2 connects to Insurer C |

For Maya's crown, Insurer A pays $600, applies a $200 contractual adjustment, and leaves $200. Each scope dimension below changes one part of this scenario while keeping the remaining facts constant.

### Claim coverage

Claim coverage defines which insurance scenarios PbN supports: primary, secondary, or tertiary claims after treatment, and predeterminations before treatment. The choice changes where the workflow begins, how many insurer decisions it must coordinate, and when the patient's balance becomes final.

For Maya's crown, primary-only support would record Insurer A's decision and assign the remaining $200 to Maya. Secondary support instead keeps the $200 assigned to insurance, creates a claim for Insurer B containing Insurer A's decision, and waits. If Insurer B pays $150, PbN then assigns the final $50 to Maya.

Options and workflow implications:

- Primary completed-treatment claims require PbN to create, track, and post one insurer's decision. The workflow runs once and calculates the patient balance after that decision.
- Secondary claims require PbN to wait for the primary decision, create a linked claim containing the original treatment and primary payment information, and track both claims. The workflow repeats for the second insurer and delays the final patient balance until it responds.
- Tertiary claims require PbN to coordinate three dependent insurer decisions. The workflow runs a third time, and a correction from an earlier insurer may require recalculating and resubmitting later claims.
- Predeterminations require separate estimate statuses, expiration handling, and a link to the eventual treatment claim. The workflow begins before treatment and ends without a payment or ledger entry.

### Transaction channel

Transaction channel defines the form in which PbN exchanges claims and insurer responses: structured electronic transactions, human-readable documents, or both. The choice changes how PbN receives, validates, matches, and posts the information and how much staff verification is required.

Insurer A can send its decision for Maya's crown as an electronic ERA or a paper EOB. The ERA places the claim identifier, $600 payment, $200 adjustment, and $200 remainder in defined fields, so PbN can match and validate them automatically. A paper EOB presents the same amounts as text in a document, so PbN must upload it, extract the amounts, and ask staff to confirm them. If both arrive, PbN must recognize the same decision and post it only once.

Options and workflow implications:

- Electronic support requires adapters and validation for defined data fields. Structured information can move through matching and posting without staff re-entering the insurer's decision.
- Paper support requires document upload or scanning, data extraction or manual entry, staff verification, and retention of the original document. The workflow pauses for staff confirmation before the information changes the ledger.
- Mixed support requires electronic and paper inputs to produce the same internal claim record. It covers more transactions but must recognize the same decision in both formats to prevent duplicate posting.

### Connection route

Connection route defines the path used to exchange information with an insurer: one clearinghouse, multiple clearinghouses, a direct insurer connection, or a combination. An electronic 837D is the package; the connection route is the courier. The choice changes how PbN enrolls providers, routes transactions, tracks external identifiers, monitors failures, and prevents duplicate submissions.

Maya's $1,000 crown claim goes through Clearinghouse 1 because it connects to Insurer A. Noah's $200 filling claim goes through Clearinghouse 2 because it connects to Insurer C. With only Clearinghouse 1, PbN cannot support Noah's claim. With both clearinghouses, PbN must send each claim through the correct partner, check both partners for responses, and combine the results into one view. Sending Noah's claim through Clearinghouse 1 may cause it to be rejected or never reach Insurer C; checking only Clearinghouse 1 may leave staff incorrectly seeing Noah's claim as pending.

Options and workflow implications:

- One clearinghouse requires one integration and one place to monitor submissions and responses. Every supported claim follows the same route, but PbN cannot serve insurers outside that partner's network.
- Multiple clearinghouses require PbN to select and retain the correct route for each claim and monitor every partner for responses. This expands insurer coverage but adds routing and operational complexity.
- Direct payer connections require separate enrollment, certification, integration, and operation for each insurer. They remove the clearinghouse intermediary but increase the work required to add each insurer.
- A combined model requires PbN to select either a clearinghouse or direct connection for each insurer and combine every response into one claim history. It provides the most routing flexibility but has the highest integration and operating complexity.

### Supported exceptions

Supported exceptions define which non-standard outcomes staff can resolve completely inside PbN. Displaying an error is not sufficient: staff must be able to take the required action and return the claim to a correct payment and balance.

For example, Noah's $200 filling claim is rejected because it lacks a tooth number. PbN can show the rejection, let staff add the missing value, and resubmit the same claim; successful acceptance provides a clear end state. By contrast, assume Insurer A denies Maya's $1,000 crown as medically unnecessary. Resolving an appeal may require clinical notes, X-rays, a dentist's justification, payer-specific rules, filing deadlines, correspondence, and repeated review. PbN can identify and route that denial without managing the full appeal.

Options and workflow implications:

- Happy-path support requires a claim to be accepted, fully paid, and matched without ambiguity. The PbN workflow stops at the first exception, which staff must resolve elsewhere.
- Core exception support requires correction and resubmission, partial posting, manual matching, duplicate prevention, denial routing, and ledger reversal. Common failures remain inside PbN until staff resolve them and the balance is correct.
- Full denial and appeal management requires case ownership, clinical evidence, payer correspondence, filing deadlines, repeated follow-up, and outcome tracking. A denied claim remains inside PbN through the appeal and subsequent insurer decision.

### Automation boundary

After PbN defines the exceptions it supports, the automation boundary determines whether a staff member, deterministic rule, or AI model decides and completes each action. The choice determines when staff approval is required and how much risk PbN assumes when an action changes a claim or financial balance.

If Insurer A's ERA identifies Maya's crown claim and its $600 payment, $200 adjustment, and $200 remainder account for the full $1,000, a deterministic rule can post the decision. If the identifier is missing, AI may recommend Maya's claim using her name, treatment date, and billed amount. AI assistance waits for staff approval before posting; autonomous AI posts the recommended match without prior approval.

Options and workflow implications:

- Manual processing requires staff to decide and confirm every submission, match, and posting while PbN organizes and records the work. It provides full staff control but requires the most manual effort.
- Deterministic automation requires explicit rules, exact matching conditions, and an exception path when those conditions fail. Routine cases move automatically, while uncertain cases pause without changing the financial record.
- AI assistance requires a recommendation, supporting evidence, and staff approval before PbN acts. It reduces staff research but keeps a person responsible for ambiguous decisions.
- Autonomous AI requires measured accuracy thresholds, action limits, monitoring, and reversal controls. It removes the approval delay but increases the impact of an incorrect decision.

The initial scope selects the following options.

| Scope dimension | Selected option(s) | Why |
|---|---|---|
| Claim coverage | Primary completed-treatment claims | Each claim follows one insurer decision before PbN calculates the patient balance, avoiding the dependent workflows required for secondary and tertiary claims and the separate pre-treatment workflow required for predeterminations. |
| Transaction channel | Electronic support | Structured claim, status, and remittance data can be validated and matched without document extraction or manual re-entry. |
| Connection route | One clearinghouse | Every supported claim follows one partner connection, avoiding routing and monitoring across multiple clearinghouses or direct insurer integrations. |
| Supported exceptions | Core exception support for rejection, denial, partial payment, duplicate, unmatched remittance, and reversal | These exceptions keep the claim and financial record correct without adding the clinical evidence, correspondence, deadlines, and repeated follow-up required for full appeal management. |
| Automation boundary | Manual processing for claim submissions; deterministic automation for exact, balanced remittance matches; AI assistance for ambiguous matches | Routine financial cases move automatically, AI helps staff investigate ambiguity, and no probabilistic decision changes a claim or balance without approval. Autonomous AI is excluded. |

The resulting scope supports primary completed-treatment claims through one clearinghouse and electronic transactions. PbN handles six core exception types, automates exact financial matches, assists staff with ambiguous matches, and requires staff approval before submitting claims.

## Appendices

### Glossary

#### Claims and insurance

| Term | Plain-language definition |
|---|---|
| ADA (American Dental Association) | The U.S. professional association that publishes the standard dental claim form and maintains CDT procedure codes. |
| X12 | The organization and electronic transaction standards used to exchange healthcare information, including 837D claims, 276/277 claim status, and 835 remittance. |
| Provider | The dentist or dental organization that delivers treatment and bills for it. |
| Payer or insurer | The insurance company responsible for deciding and paying a covered claim. |
| Claim | A request from a dental practice to an insurer for payment for completed treatment. |
| Claim identifier | A unique value used by PbN, a clearinghouse, or an insurer to identify and track a claim. Different systems may assign different identifiers to the same claim. |
| Claim line or procedure line | One billed procedure within a claim. A claim can contain several lines. |
| CDT code | The standard code used to identify a dental procedure on a claim. |
| Primary insurance | The insurance plan that receives and decides the claim first. |
| Secondary insurance | A second plan that may pay after the primary insurer has decided the claim. |
| Coordination of benefits | The rules for dividing payment responsibility when a patient has more than one insurance plan. |
| Clearinghouse | An intermediary that checks, converts, and routes electronic transactions between a practice and an insurer. |
| Payer network | The insurers and transaction types that a clearinghouse can reach through its connections. |
| Direct payer connection | An integration through which PbN exchanges transactions with an insurer without using a clearinghouse. |
| Insurer or payer portal | An insurer's website where practice staff can submit claims, review statuses, retrieve documents, or resolve issues manually. |
| 837D | The standard electronic transaction used to submit a dental claim. |
| 276/277 | The paired electronic transactions used to request and receive a claim's current status. |
| Acknowledgement | A response confirming that a clearinghouse or insurer received and accepted or rejected a transaction. It is not a payment decision. |
| Rejection | A claim returned before payment review because required information or formatting is invalid. Staff correct the problem and resubmit the claim. |
| Adjudication | The insurer's process for deciding what it will pay, adjust, deny, or assign to the patient. |
| Denial | An insurer's decision, after reviewing a claim, not to pay all or part of it. Staff determine whether to correct, follow up, appeal, or transfer the allowed responsibility. |
| Partial payment | An insurer pays less than the billed amount and explains how the remainder was adjusted, denied, or assigned to the patient. PbN must post each component rather than treat the difference as unexplained. |
| Duplicate | The same claim submission or remittance arrives more than once. PbN retains the repeated event for audit but prevents a second submission or financial posting. |
| Clean claim | A complete and valid claim that can be processed without requesting corrections or missing information. |
| Claim attachment | Supporting material, such as an X-ray or clinical note, submitted with or linked to a claim. |
| Claim-status inquiry | A request asking an insurer where a submitted claim is in its process. |
| Remittance | The insurer's explanation of how it decided a claim, including payments, adjustments, denials, and patient responsibility. It may arrive electronically as an ERA or as a human-readable EOB. |
| ERA or 835 | Electronic Remittance Advice: the standard electronic explanation of how an insurer decided one or more claims. |
| EOB | Explanation of Benefits: a human-readable explanation of what the insurer allowed, paid, denied, adjusted, or assigned to the patient. |
| EFT | Electronic Funds Transfer: the movement of the insurer's payment into the practice's bank account. It is separate from the ERA explaining the payment. |
| CARC | Claim Adjustment Reason Code: a standard code explaining why an insurer changed or did not pay a billed amount. |
| RARC | Remittance Advice Remark Code: a standard code providing more detail about an insurer's decision or required action. |
| Predetermination | A pre-treatment request asking an insurer how it expects to cover proposed treatment; it is not a guarantee of payment. |
| Appeal | A request asking an insurer to reconsider a denial or payment decision. |
| Medical necessity | The insurer's assessment of whether a treatment meets its clinical coverage rules. A denial based on medical necessity may require clinical evidence and a dentist's justification. |

#### Financial records

| Term | Plain-language definition |
|---|---|
| Ledger | The permanent financial history of charges, payments, adjustments, and reversals used to explain a balance. |
| Charge | The amount the practice records for treatment provided. |
| Allowed amount | The amount the insurer recognizes for a service under the patient's plan and the provider's contract. |
| Contractual adjustment or write-off | The part of the charge an in-network practice agrees not to collect because its contract sets a lower allowed amount. |
| Patient responsibility | The amount the insurer assigns to the patient, such as a deductible, copayment, or coinsurance amount. |
| Posting | Recording a payment, adjustment, or other financial event in the ledger. |
| Automatic posting | Software records the insurer's decision without staff entry because the claim, procedures, and amounts match defined rules. |
| Manual posting | A staff member reviews and records the insurer's decision. |
| Unmatched remittance | PbN cannot reliably connect an insurer's payment explanation to the correct claim and procedure lines. It creates a staff-review task without changing the ledger. |
| Adjustment | A change to the amount the practice expects to collect without receiving a payment. |
| Reversal | An insurer cancels or changes an earlier financial decision. PbN preserves the original entries and records new entries that reverse their financial effect. |
| Immutable | Already-recorded financial entries cannot be edited or deleted; corrections use new entries. |
| Double-entry ledger | A ledger in which every financial event creates equal debit and credit amounts, keeping the accounts balanced. |
| Debit and credit | The two sides of a double-entry record. Their effect depends on the account being updated. |
| Balance | The amount still owed after charges, payments, and adjustments are applied. |
| Accounts receivable (A/R) | Money the practice has earned but has not yet collected from insurers or patients. |
| Reconciliation | Comparing claims, payment explanations, bank deposits, and ledger entries to find and correct differences. |
| Revenue leakage | Money the practice should collect but loses because of missed claims, denials, underpayments, errors, or failed follow-up. |

#### Product structure and controls

| Term | Plain-language definition |
|---|---|
| Practice-management system (PMS) | The dental office's core software for patient records, treatment, scheduling, billing, and balances. PbN is the PMS in this design. |
| DSO (dental support organization) | An organization that provides shared business and administrative services to multiple affiliated dental practices. |
| Organization | The customer account that may own or manage one or more dental practices. |
| Practice | A dental business or operating unit within an organization. |
| Location | A physical office where a practice treats patients. |
| Tenant | One customer's logically isolated users and data within PbN's shared software. |
| Multi-tenancy | One software platform serving many customers while keeping each customer's data and access separate. |
| Supported exception | A non-standard outcome that staff can identify, act on, and resolve completely inside PbN. Displaying an error without a resolution workflow does not constitute support. |
| Happy-path support | A workflow that completes only cases in which every expected step succeeds without ambiguity or correction. |
| Core exception support | Workflows for common failures such as rejection, denial, partial payment, duplicate, unmatched remittance, and reversal, without full appeal management. |
| Integration adapter | Software that converts between PbN's internal data and an external partner's transaction format and connection method. |
| Deterministic automation | Automation that acts only when explicit rules and input data produce one valid result. |
| AI assistance | AI recommends an action and presents supporting evidence, but a staff member approves or changes it before PbN acts. |
| Autonomous AI | AI completes an action without prior staff approval based on a probabilistic recommendation. |
| Auditability | The ability to identify what changed, when it changed, who or what caused it, and the evidence supporting the change. |
| Protected health information (PHI) | Patient-identifiable health information that requires privacy and security protections. |
| HIPAA | The U.S. federal framework governing the privacy, security, and electronic exchange of protected health information. |

Dental insurance and transaction definitions follow ADA and CMS usage.<sup>10–13,17–20</sup> Product-scope and automation terms are defined for this strategy.

### References

1. American Dental Association Health Policy Institute, [Dental Practice Research](https://www.ada.org/resources/research/health-policy-institute/dental-practice-research). Source for 135,665 U.S. dental-practice establishments, based on 2023 U.S. Census Bureau County Business Patterns data.
2. American Dental Association Health Policy Institute, [Dentist Workforce](https://www.ada.org/resources/research/health-policy-institute/dentist-workforce). Source for 202,485 professionally active U.S. dentists in 2024.
3. National Association of Dental Plans, [2024 Dental Benefits Report: Enrollment summary](https://www.nadp.org/nadp-report-reveals-overall-decrease-in-dental-benefits-enrollment/). Source for dental-benefits enrollment covering 87% of the U.S. population.
4. CAQH, [2024 CAQH Index](https://www.caqh.org/hubfs/Index/2024%20Index%20Report/CAQH_IndexReport_2024_FINAL.pdf), p. 22. Source for 90% electronic dental-claim submission adoption in 2024.
5. American Dental Association Health Policy Institute, [Economic Outlook and Emerging Issues in Dentistry, Q4 2024](https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/research/hpi/dec2024_hpi_economic_outlook_dentistry_slides.pdf), p. 14. Source for 58% of respondents identifying insurance-related issues among their expected 2025 challenges.
6. Practice by Numbers, [Product and pricing overview](https://practicenumbers.com/pricing/). Source for PbN's adjacent insurance-verification, analytics, and payment capabilities.
7. Practice by Numbers, [IntelliSuite](https://practicenumbers.com/pbn-ai/intellisuite/). Source for PbN's existing AI-based insurance summaries, operational insights, predictions, and workflow assistance.
8. American Dental Association Health Policy Institute, [Economic Outlook and Emerging Issues in Dentistry, Q3 2024](https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/research/hpi/sept2024_hpi_economic_outlook_dentistry_main.pdf). Source for insurance-related administrative burden.
9. American Dental Association, [Dental Insurance Frequently Asked Questions](https://www.ada.org/resources/practice/dental-insurance/dental-insurance-resources/dental-insurance-frequently-asked-questions). Source for common claim errors and rejection handling.
10. American Dental Association, [Coordination of Benefits](https://www.ada.org/resources/practice/dental-insurance/dental-plans-coordination-of-benefits). Source for coordination-of-benefits rules and complexity.
11. Centers for Medicare & Medicaid Services, [Health Care Payment and Remittance Advice](https://www.cms.gov/medicare/coding-billing/electronic-billing/health-care-payment-remittance-advice). Source for remittance terminology.
12. Centers for Medicare & Medicaid Services, [Medicare Fee-for-Service Companion Guides](https://www.cms.gov/medicare/coding-billing/electronic-billing/medicare-fee-for-service-compainion-guides). Source for electronic healthcare transaction terminology.
13. American Dental Association, [Explanation of Benefits Statement](https://www.ada.org/resources/practice/dental-insurance/explanation-of-benefits-statement). Source for EOB terminology.
14. Practice by Numbers, [Solutions for Single Practices](https://practicenumbers.com/use-cases/single-practices/). Source for PbN's single-practice customer segment.
15. Practice by Numbers, [Solutions for Multiple Practices](https://practicenumbers.com/use-cases/multiple-practices/). Source for PbN's multi-practice customer segment.
16. Practice by Numbers, [Solutions for DSOs](https://practicenumbers.com/use-cases/dsos/). Source for PbN's DSO customer segment.
17. American Dental Association, [ADA Dental Claim Form](https://www.ada.org/publications/cdt/ada-dental-claim-form). Source for the standard information and format used to report dental services to a dental benefit plan.
18. Centers for Medicare & Medicaid Services, [Adopted Standards and Operating Rules](https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/hipaa/adopted-standards-operating-rules). Source for the X12 837 standard used for electronic dental claims.
19. Centers for Medicare & Medicaid Services, [Claim Status Request and Response](https://www.cms.gov/medicare/coding-billing/electronic-billing/claim-status-request-response). Source for electronic claim-status inquiry and response through X12 276/277 transactions.
20. Centers for Medicare & Medicaid Services, [Health Care Payment and Remittance Advice and Electronic Funds Transfer](https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions/health-care-payment-remittance-advice-electronic-funds-transfer). Source for matching an ERA to its corresponding EFT using the payment reference.
