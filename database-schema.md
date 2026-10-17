# Claims & Ledger V1 — Database Table Schema

This appendix uses PostgreSQL-style logical types. Identifiers are UUIDs, monetary values use `numeric(12,2)`, and timestamps use UTC `timestamptz`. Short identifiers such as `org-001` are readable examples of UUID values. Every foreign key includes `organization_id` so a record cannot reference another tenant.

The existing PbN PMS supplies these referenced records: `organizations(org-001)`, `practices(practice-001)`, `locations(location-001)`, `users(user-007)`, `patient_accounts(account-001)`, `patients(patient-001)`, `coverages(coverage-001)`, `payers(payer-a)`, `providers(provider-001)`, and `procedures(procedure-001)`. The example procedure is the completed $200 filling used throughout the specification.

## Claim preparation

### `claims`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `claim_id` | `uuid` | PK | `claim-001` |
| `patient_id` | `uuid` | FK → `patients` | `patient-001` |
| `account_id` | `uuid` | FK → `patient_accounts` | `account-001` |
| `coverage_id` | `uuid` | FK → `coverages` | `coverage-001` |
| `practice_id` | `uuid` | FK → `practices` | `practice-001` |
| `location_id` | `uuid` | FK → `locations` | `location-001` |
| `claim_number` | `varchar(50)` | Unique within organization | `PB-1001` |
| `processing_status` | `varchar(30)` | Required state value | `ADJUDICATED` |
| `adjudication_outcome` | `varchar(30)` | Nullable until adjudication | `PAID` |
| `row_version` | `bigint` | Optimistic concurrency value | `6` |
| `created_at` | `timestamptz` | Required | `2026-09-13T16:00:00Z` |

### `claim_lines`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `claim_line_id` | `uuid` | PK | `claim-line-001` |
| `claim_id` | `uuid` | FK → `claims` | `claim-001` |
| `procedure_id` | `uuid` | FK → `procedures`; one active claim line per procedure | `procedure-001` |
| `line_number` | `smallint` | Unique within claim | `1` |
| `procedure_code` | `varchar(10)` | Required | `D2391` |
| `billed_amount` | `numeric(12,2)` | Non-negative | `200.00` |
| `status` | `varchar(30)` | Required state value | `ADJUDICATED` |

### `claim_versions`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `claim_version_id` | `uuid` | PK | `claim-version-001` |
| `claim_id` | `uuid` | FK → `claims` | `claim-001` |
| `version_number` | `integer` | Unique within claim | `1` |
| `claim_snapshot` | `jsonb` | Immutable after approval | `{"patient_id":"patient-001","lines":[{"code":"D2391","amount":200.00}]}` |
| `content_hash` | `varchar(64)` | Immutable SHA-256 hash | `8b1a...e92c` |
| `approved_by` | `uuid` | FK → `users` | `user-007` |
| `approved_at` | `timestamptz` | Required | `2026-09-13T16:10:00Z` |

## Submission and tracking

### `submissions`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `submission_id` | `uuid` | PK | `submission-001` |
| `claim_version_id` | `uuid` | FK → `claim_versions` | `claim-version-001` |
| `idempotency_key` | `varchar(100)` | Unique within organization | `submit-claim-001-v1` |
| `clearinghouse_route` | `varchar(50)` | Required | `clearinghouse-1` |
| `status` | `varchar(30)` | Required state value | `ACCEPTED` |
| `attempt_count` | `integer` | At least 1 | `1` |
| `submitted_at` | `timestamptz` | Nullable until sent | `2026-09-13T16:11:00Z` |

### `clearinghouse_transactions`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `transaction_id` | `uuid` | PK | `transaction-837-001` |
| `submission_id` | `uuid` | Nullable FK → `submissions` | `submission-001` |
| `claim_id` | `uuid` | Nullable FK → `claims` | `claim-001` |
| `transaction_type` | `varchar(20)` | Required | `837D` |
| `direction` | `varchar(10)` | `OUTBOUND` or `INBOUND` | `OUTBOUND` |
| `partner_message_id` | `varchar(100)` | Unique with clearinghouse and direction when present | `CH1-837-8891` |
| `correlation_id` | `varchar(100)` | Indexed across related messages | `corr-claim-001` |
| `payload_uri` | `text` | Required immutable object location | `object://org-001/837/8891` |
| `payload_hash` | `varchar(64)` | Required | `71ac...300f` |
| `occurred_at` | `timestamptz` | Required | `2026-09-13T16:11:00Z` |
| `processing_status` | `varchar(30)` | Required state value | `PROCESSED` |

### `claim_status_events`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `status_event_id` | `uuid` | PK | `status-004` |
| `claim_id` | `uuid` | FK → `claims` | `claim-001` |
| `transaction_id` | `uuid` | Nullable FK → `clearinghouse_transactions` | `transaction-277-001` |
| `status` | `varchar(30)` | Required | `ADJUDICATED` |
| `effective_at` | `timestamptz` | Insurer-effective time | `2026-09-20T15:00:00Z` |
| `received_at` | `timestamptz` | PbN ingestion time | `2026-09-20T15:02:00Z` |
| `source_sequence` | `varchar(50)` | Nullable partner ordering value | `4` |
| `reason_code` | `varchar(30)` | Nullable | `null` |

## Remittance and posting

### `remittances`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `remittance_id` | `uuid` | PK | `remittance-001` |
| `payer_id` | `uuid` | FK → `payers` | `payer-a` |
| `source_transaction_id` | `uuid` | FK → `clearinghouse_transactions` | `transaction-835-001` |
| `era_control_number` | `varchar(100)` | Unique with payer | `ERA-A-7788` |
| `payment_trace` | `varchar(100)` | Indexed | `EFT-A-4455` |
| `total_payment_amount` | `numeric(12,2)` | Non-negative | `100.00` |
| `received_at` | `timestamptz` | Required | `2026-09-20T16:00:00Z` |
| `status` | `varchar(30)` | Required state value | `POSTED` |

### `remittance_lines`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `remittance_line_id` | `uuid` | PK | `remittance-line-001` |
| `remittance_id` | `uuid` | FK → `remittances` | `remittance-001` |
| `claim_line_id` | `uuid` | Nullable FK → `claim_lines` | `claim-line-001` |
| `payer_claim_id` | `varchar(100)` | Indexed for matching | `A-CLAIM-9911` |
| `service_line_number` | `smallint` | Unique within remittance | `1` |
| `billed_amount` | `numeric(12,2)` | Non-negative | `200.00` |
| `allowed_amount` | `numeric(12,2)` | Non-negative | `140.00` |
| `paid_amount` | `numeric(12,2)` | Non-negative | `100.00` |
| `patient_responsibility_amount` | `numeric(12,2)` | Non-negative | `40.00` |
| `denied_amount` | `numeric(12,2)` | Non-negative | `0.00` |
| `match_status` | `varchar(30)` | Required state value | `EXACT_MATCH` |

### `remittance_adjustments`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `remittance_adjustment_id` | `uuid` | PK | `adjustment-001` |
| `remittance_line_id` | `uuid` | FK → `remittance_lines` | `remittance-line-001` |
| `group_code` | `varchar(10)` | Required insurer code | `CO` |
| `reason_code` | `varchar(20)` | Required insurer code | `45` |
| `amount` | `numeric(12,2)` | Non-negative | `60.00` |
| `remark_codes` | `jsonb` | Nullable list of insurer remarks | `[]` |

### `postings`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `posting_id` | `uuid` | PK | `posting-001` |
| `remittance_line_id` | `uuid` | FK → `remittance_lines` | `remittance-line-001` |
| `claim_line_id` | `uuid` | FK → `claim_lines` | `claim-line-001` |
| `posting_mode` | `varchar(20)` | `AUTO` or `MANUAL` | `AUTO` |
| `idempotency_key` | `varchar(100)` | Unique within organization | `post-remline-001-v1` |
| `status` | `varchar(30)` | Required state value | `POSTED` |
| `approved_by` | `uuid` | Nullable FK → `users` | `null` |
| `posted_at` | `timestamptz` | Required when posted | `2026-09-20T16:01:00Z` |
| `row_version` | `bigint` | Optimistic concurrency value | `1` |

### `financial_events`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `financial_event_id` | `uuid` | PK | `financial-payment-001` |
| `posting_id` | `uuid` | Nullable FK → `postings` | `posting-001` |
| `procedure_id` | `uuid` | Nullable FK → `procedures` | `null` |
| `payment_id` | `uuid` | Nullable FK → `payments` | `payment-001` |
| `event_type` | `varchar(30)` | Required enum | `INSURER_PAYMENT` |
| `amount` | `numeric(12,2)` | Positive | `100.00` |
| `effective_at` | `timestamptz` | Required | `2026-09-20T16:01:00Z` |
| `reverses_financial_event_id` | `uuid` | Nullable self-FK | `null` |

### `journal_entries`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `journal_entry_id` | `uuid` | PK | `journal-payment-001` |
| `financial_event_id` | `uuid` | Unique FK → `financial_events` | `financial-payment-001` |
| `entry_number` | `varchar(50)` | Unique within organization | `JE-1002` |
| `effective_at` | `timestamptz` | Required | `2026-09-20T16:01:00Z` |
| `posted_at` | `timestamptz` | Required; immutable afterward | `2026-09-20T16:01:00Z` |
| `reverses_journal_entry_id` | `uuid` | Nullable self-FK | `null` |

### `journal_lines`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `journal_line_id` | `uuid` | PK | `journal-line-003` |
| `journal_entry_id` | `uuid` | FK → `journal_entries` | `journal-payment-001` |
| `patient_account_id` | `uuid` | FK → `patient_accounts` | `account-001` |
| `claim_line_id` | `uuid` | Nullable FK → `claim_lines` | `claim-line-001` |
| `ledger_account` | `varchar(40)` | Required enum | `CASH` |
| `debit_amount` | `numeric(12,2)` | Non-negative; one side must be zero | `100.00` |
| `credit_amount` | `numeric(12,2)` | Non-negative; one side must be zero | `0.00` |
| `sequence` | `smallint` | Unique within journal entry | `1` |

## Reconciliation and balances

### `payments`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `payment_id` | `uuid` | PK | `payment-001` |
| `source_type` | `varchar(20)` | `INSURER` or `PATIENT` | `INSURER` |
| `source_identifier` | `uuid` | Payer or patient identifier | `payer-a` |
| `amount` | `numeric(12,2)` | Positive | `100.00` |
| `payment_trace` | `varchar(100)` | Indexed | `EFT-A-4455` |
| `bank_transaction_id` | `varchar(100)` | Unique when present | `BANK-90210` |
| `received_at` | `timestamptz` | Required | `2026-09-20T17:00:00Z` |
| `status` | `varchar(30)` | Required state value | `MATCHED` |

### `reconciliations`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `reconciliation_id` | `uuid` | PK | `reconciliation-001` |
| `remittance_id` | `uuid` | FK → `remittances` | `remittance-001` |
| `payment_id` | `uuid` | FK → `payments` | `payment-001` |
| `matched_amount` | `numeric(12,2)` | Non-negative | `100.00` |
| `difference_amount` | `numeric(12,2)` | May be positive or negative | `0.00` |
| `status` | `varchar(30)` | Required state value | `RECONCILED` |
| `resolved_by` | `uuid` | Nullable FK → `users` | `null` |
| `resolution_reason` | `text` | Nullable | `null` |
| `resolved_at` | `timestamptz` | Nullable | `null` |

### `balance_projections`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `projection_id` | `uuid` | PK | `balance-001` |
| `account_id` | `uuid` | FK → `patient_accounts` | `account-001` |
| `claim_id` | `uuid` | Nullable FK → `claims` | `claim-001` |
| `projection_type` | `varchar(20)` | Required enum | `CLAIM` |
| `insurance_balance` | `numeric(12,2)` | Derived from ledger | `0.00` |
| `patient_balance` | `numeric(12,2)` | Derived from ledger | `40.00` |
| `last_journal_sequence` | `bigint` | Monotonically increasing | `4` |
| `calculated_at` | `timestamptz` | Required | `2026-09-20T17:01:00Z` |
| `row_version` | `bigint` | Optimistic concurrency value | `4` |

## Workflow control and audit

### `exception_cases`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `exception_id` | `uuid` | PK | `exception-002` |
| `exception_type` | `varchar(30)` | Required enum | `UNMATCHED_REMITTANCE` |
| `subject_type` | `varchar(30)` | Required enum | `REMITTANCE_LINE` |
| `subject_id` | `uuid` | Required polymorphic reference | `remittance-line-002` |
| `reason` | `text` | Required | `No claim line matched` |
| `status` | `varchar(20)` | Required state value | `OPEN` |
| `owner_id` | `uuid` | Nullable FK → `users` | `user-007` |
| `next_action` | `text` | Required | `Select the correct claim line` |
| `resolution` | `text` | Nullable | `null` |
| `resolved_at` | `timestamptz` | Nullable | `null` |

### `audit_events`

| Column | Type | Key or constraint | Example |
|---|---|---|---|
| `organization_id` | `uuid` | PK; FK → `organizations` | `org-001` |
| `audit_event_id` | `uuid` | PK | `audit-019` |
| `actor_type` | `varchar(20)` | `USER`, `SERVICE`, or `EXTERNAL` | `SERVICE` |
| `actor_id` | `varchar(100)` | Required | `posting-service` |
| `action` | `varchar(50)` | Required | `REMITTANCE_POSTED` |
| `subject_type` | `varchar(30)` | Required enum | `POSTING` |
| `subject_id` | `uuid` | Required polymorphic reference | `posting-001` |
| `source_id` | `varchar(100)` | Nullable evidence identifier | `transaction-835-001` |
| `correlation_id` | `varchar(100)` | Indexed | `corr-claim-001` |
| `event_at` | `timestamptz` | Required | `2026-09-20T16:01:00Z` |
| `metadata_hash` | `varchar(64)` | Required tamper-evidence value | `5cad...11b8` |

## Example financial rows

The $200 filling produces four business events. Each event has one immutable journal entry whose debit and credit lines balance.

| Event | Debit | Credit | Amount |
|---|---|---|---:|
| Completed procedure | Insurance A/R | Service revenue | $200.00 |
| Insurer payment | Cash | Insurance A/R | $100.00 |
| Contractual adjustment | Contractual adjustment | Insurance A/R | $60.00 |
| Transfer to patient | Patient A/R | Insurance A/R | $40.00 |

After these entries, Insurance A/R is $0 and Patient A/R is $40. The ERA payment of $100 matches the EFT payment of $100, so `reconciliations.status` becomes `RECONCILED` and the balance projection shows a $0 insurance balance and a $40 patient balance.
