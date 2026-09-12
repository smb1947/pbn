# Claims + Ledger Strategy — Working Draft

## Page 1 — Problem

### PbN context and opportunity

Practice by Numbers (PbN) helps dental practices manage analytics, patient communication, scheduling, forms, insurance verification, and patient payments in one platform. For this strategy, we assume PbN does not have an end-to-end Claims + Ledger capability. Adding it would connect completed treatment to insurance payment and the patient's final balance, advancing PbN's goal of simplifying how a dental practice operates.

### Target customer and users

The working target customer is a U.S. dental practice or multi-location dental group that accepts insurance and uses PbN with a practice-management system. The buyer is the practice owner or operations leader, who needs predictable collections, lower administrative cost, and consistent processes. The primary user is the person responsible for insurance billing: a billing coordinator in a larger organization or an office manager in a smaller practice. Secondary users include revenue leaders who monitor performance, front-desk staff who collect patient balances, and patients who need accurate bills. These definitions require validation before choosing V1.

### Current workflow and customer pain

A claim is the practice's request for an insurer to pay for completed treatment. After treatment, billing staff verify the claim information, attach required documents, and send it through a clearinghouse to the insurer. They monitor its status, correct rejections, and follow up on delays or denials. When the insurer decides the claim, staff match its payment explanation and bank deposit to the claim, record the result in the ledger, and bill the patient for any remaining amount. The ledger is the permanent financial history of charges, payments, adjustments, and reversals.

For example, a practice charges $200 for a filling. The insurer allows $140, pays $100, assigns $40 to the patient, and requires the practice to adjust off $60. The ledger must preserve each step and show the correct $40 balance. Doing this is difficult because the practice-management system, clearinghouse, insurer, and bank update at different times. One payment may cover several claims, while each claim may contain several procedures with different decisions. Staff must resolve missing information, rejections, denials, partial payments, duplicates, corrections, and reversals across disconnected systems.

### Problem statement

Billing staff lack one reliable workflow to create an accurate claim from completed treatment, submit and track it through the insurer's decision, and record the resulting payment, adjustments, and patient balance. Fragmented data and manual reconciliation create unnecessary work, delay collections, allow revenue to leak, and increase the risk of billing patients incorrectly.

### Goals and constraints

The product goal is to give billing staff one reliable path from completed treatment to a correct, explainable balance. Staff should know which claims need action, what the insurer decided, what was recorded financially, and what the patient owes. The business goal is to collect the correct amount sooner while reducing manual work, preventable errors, and unresolved balances.

The product must exchange data with practice-management systems, clearinghouses, insurers, and payment records that update asynchronously and may send delayed, duplicate, or conflicting information. It must protect patient data, isolate each organization's data, preserve a complete audit history, and remain financially correct through retries, concurrent work, corrections, and reversals. PbN does not decide whether an insurer should pay a claim; it must accurately record the insurer's decision and route unclear cases to staff. V1 exclusions will be chosen after these constraints and the highest-priority customer problem are validated.

## Page 2 — Product strategy

### Product principles

_To be drafted next._

### V1 recommendation and rationale

_To be drafted._

### End-to-end V1 workflow

_To be drafted._

### Scope and exclusions

_To be drafted._

### Success metrics

Success should be measured by time from completed treatment to accepted claim, claim acceptance rate, days to insurance payment, staff touches per claim, percentage of insurer responses posted without manual entry, posting-error and duplicate-posting rates, and unreconciled dollars. Baselines and targets should come from customer discovery and an initial production cohort; this strategy should not invent them.

## Page 3 — Execution strategy

### System and ledger design

_To be drafted._

### Multi-tenancy and reliability

_To be drafted._

### Key trade-offs and risks

_To be drafted._

### Rollout and validation

_To be drafted._

### Assumptions

_To be drafted._
