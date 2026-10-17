const DB_NAME = "pbn-claims-ledger-workflow";
const DB_VERSION = 1;
const ORGANIZATION_ID = "org-river-dental";
const CASE_ID = "case-maya-filling";

const STORES = [
  "cases", "procedures", "claims", "claimLines", "claimVersions", "submissions",
  "clearinghouseTransactions", "claimStatusEvents", "remittances", "remittanceLines",
  "remittanceAdjustments", "postings", "financialEvents", "journalEntries", "journalLines",
  "payments", "reconciliations", "balanceProjections", "exceptionCases", "auditEvents"
];

const STORE_LABELS = {
  cases: "Cases", procedures: "Procedures", claims: "Claims", claimLines: "Claim lines",
  claimVersions: "Claim versions", submissions: "Submissions",
  clearinghouseTransactions: "Clearinghouse transactions", claimStatusEvents: "Claim status events",
  remittances: "Remittances", remittanceLines: "Remittance lines",
  remittanceAdjustments: "Remittance adjustments", postings: "Postings",
  financialEvents: "Financial events", journalEntries: "Journal entries", journalLines: "Journal lines",
  payments: "Payments", reconciliations: "Reconciliations", balanceProjections: "Balance projections",
  exceptionCases: "Exception cases", auditEvents: "Audit events"
};

const STAGES = [
  {
    short: "Prepare",
    title: "Claim preparation",
    description: "Create a complete claim from the treatment recorded in the practice-management system.",
    actor: "Billing coordinator",
    trigger: "Dentist completes the insured filling",
    result: "Claim becomes Ready",
    button: "Complete claim preparation",
    fields: [
      { name: "patientName", label: "Patient", value: "Maya Chen" },
      { name: "memberId", label: "Insurance member ID", value: "A-882410" },
      { name: "payerName", label: "Primary insurer", value: "Insurer A" },
      { name: "providerName", label: "Treating dentist", value: "Dr. Elena Ruiz" },
      { name: "serviceDate", label: "Service date", type: "date", value: "2026-09-13" },
      { name: "procedureCode", label: "CDT procedure code", value: "D2391", help: "One-surface posterior composite filling" },
      { name: "tooth", label: "Tooth and surface", value: "#30, occlusal" },
      { name: "billedAmount", label: "Fee", type: "number", step: "0.01", value: "200.00" },
      { name: "preparationDecision", label: "Validation result", type: "select", value: "ready", options: [
        ["ready", "Complete and valid"], ["missing", "Missing required information"], ["duplicate", "Possible duplicate procedure"]
      ], full: true }
    ]
  },
  {
    short: "Submit",
    title: "Submission",
    description: "Freeze the approved claim version and send one electronic claim through the selected clearinghouse.",
    actor: "Billing coordinator and PbN",
    trigger: "Coordinator submits a Ready claim",
    result: "Submission becomes Accepted",
    button: "Send claim",
    fields: [
      { name: "clearinghouseRoute", label: "Clearinghouse route", type: "select", value: "clearinghouse-1", options: [["clearinghouse-1", "Clearinghouse 1"]] },
      { name: "idempotencyKey", label: "Unique submission key", value: "submit-claim-001-v1", help: "A retry with this key returns the same submission." },
      { name: "partnerClaimId", label: "Clearinghouse claim ID", value: "CH1-837-8891" },
      { name: "submissionDecision", label: "Acknowledgement", type: "select", value: "accepted", options: [
        ["accepted", "Accepted for insurer review"], ["rejected", "Rejected before insurer review"], ["delivery-failed", "Delivery failed"]
      ] }
    ]
  },
  {
    short: "Track",
    title: "Claim tracking",
    description: "Append the insurer's latest status without overwriting the history that explains how the claim changed.",
    actor: "PbN and billing coordinator",
    trigger: "Status response arrives or a check is due",
    result: "Claim becomes Adjudicated",
    button: "Record status event",
    fields: [
      { name: "payerClaimId", label: "Insurer claim ID", value: "A-CLAIM-9911" },
      { name: "statusCheckDate", label: "Status effective date", type: "date", value: "2026-09-20" },
      { name: "trackingDecision", label: "Latest insurer status", type: "select", value: "adjudicated", options: [
        ["adjudicated", "Adjudication complete"], ["pending", "Still under review"], ["delayed", "No response received"], ["conflicting", "Conflicting response"]
      ], full: true }
    ]
  },
  {
    short: "Post",
    title: "Remittance and posting",
    description: "Match the insurer's decision to the claim, confirm the amounts balance, and post immutable ledger entries.",
    actor: "PbN; coordinator reviews exceptions",
    trigger: "835 electronic remittance arrives",
    result: "Remittance becomes Posted",
    button: "Match and post remittance",
    fields: [
      { name: "eraControlNumber", label: "ERA control number", value: "ERA-A-7788" },
      { name: "paymentTrace", label: "Payment trace", value: "EFT-A-4455" },
      { name: "billedAmount", label: "Billed amount", type: "number", step: "0.01", value: "200.00" },
      { name: "allowedAmount", label: "Allowed amount", type: "number", step: "0.01", value: "140.00" },
      { name: "paidAmount", label: "Insurer payment", type: "number", step: "0.01", value: "100.00" },
      { name: "adjustmentAmount", label: "Contractual adjustment", type: "number", step: "0.01", value: "60.00" },
      { name: "patientResponsibility", label: "Patient responsibility", type: "number", step: "0.01", value: "40.00" },
      { name: "remittanceDecision", label: "Match result", type: "select", value: "exact", options: [
        ["exact", "Exact claim-line match"], ["unmatched", "No matching claim line"], ["unbalanced", "Amounts do not balance"]
      ] }
    ]
  },
  {
    short: "Reconcile",
    title: "Reconciliation and balances",
    description: "Match the insurer's bank payment to the remittance and derive the final insurance and patient balances from the ledger.",
    actor: "PbN; coordinator reviews differences",
    trigger: "Posted remittance and EFT are available",
    result: "Payment becomes Reconciled",
    button: "Reconcile payment",
    fields: [
      { name: "eraPaymentTrace", label: "ERA payment trace", value: "EFT-A-4455" },
      { name: "bankPaymentTrace", label: "Bank payment trace", value: "EFT-A-4455" },
      { name: "eraPaymentAmount", label: "ERA payment amount", type: "number", step: "0.01", value: "100.00" },
      { name: "bankPaymentAmount", label: "Bank deposit amount", type: "number", step: "0.01", value: "100.00" },
      { name: "bankTransactionId", label: "Bank transaction ID", value: "BANK-90210" },
      { name: "reconciliationDecision", label: "Reconciliation result", type: "select", value: "matched", options: [
        ["matched", "Trace and amount match"], ["mismatch", "Trace or amount differs"]
      ] }
    ]
  }
];

let db;
let workflow;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));
const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}-${crypto.randomUUID()}`;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      STORES.forEach((name) => {
        if (database.objectStoreNames.contains(name)) return;
        const store = database.createObjectStore(name, { keyPath: "id" });
        store.createIndex("organizationId", "organizationId", { unique: false });
        if (name !== "cases") store.createIndex("caseId", "caseId", { unique: false });
      });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function put(storeName, record) {
  const transaction = db.transaction(storeName, "readwrite");
  transaction.objectStore(storeName).put(record);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function get(storeName, key) {
  return requestResult(db.transaction(storeName, "readonly").objectStore(storeName).get(key));
}

async function getAll(storeName) {
  return requestResult(db.transaction(storeName, "readonly").objectStore(storeName).getAll());
}

async function clearDatabase() {
  await Promise.all(STORES.map((name) => new Promise((resolve, reject) => {
    const transaction = db.transaction(name, "readwrite");
    transaction.objectStore(name).clear();
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  })));
}

function baseRecord(recordId) {
  return { id: recordId, organizationId: ORGANIZATION_ID, caseId: CASE_ID };
}

async function seedExample() {
  const createdAt = now();
  workflow = {
    ...baseRecord(CASE_ID),
    patientName: "Maya Chen",
    payerName: "Insurer A",
    procedureCode: "D2391",
    procedureName: "One-surface posterior composite filling",
    billedAmount: 200,
    currentStage: 0,
    completedStages: [],
    claimStatus: "NOT_CREATED",
    remittanceStatus: "NOT_RECEIVED",
    reconciliationStatus: "NOT_STARTED",
    insuranceBalance: 200,
    patientBalance: 0,
    createdAt,
    updatedAt: createdAt
  };
  await put("cases", workflow);
  await put("procedures", {
    ...baseRecord("procedure-001"),
    patientId: "patient-001",
    accountId: "account-001",
    providerId: "provider-001",
    status: "COMPLETED",
    serviceDate: "2026-09-13",
    procedureCode: "D2391",
    billedAmount: 200,
    createdAt
  });
}

async function loadWorkflow() {
  workflow = await get("cases", CASE_ID);
  if (!workflow) await seedExample();
}

function readForm() {
  return Object.fromEntries(new FormData($("#stage-form")).entries());
}

function fieldMarkup(field) {
  const attributes = [
    `name="${field.name}"`, `id="${field.name}"`, field.type === "number" ? `step="${field.step || "1"}"` : "",
    field.type !== "select" ? `value="${field.value}"` : "", "required"
  ].filter(Boolean).join(" ");
  const control = field.type === "select"
    ? `<select ${attributes}>${field.options.map(([value, label]) => `<option value="${value}" ${value === field.value ? "selected" : ""}>${label}</option>`).join("")}</select>`
    : `<input type="${field.type || "text"}" ${attributes} />`;
  return `<div class="field ${field.full ? "full" : ""}"><label for="${field.name}">${field.label}</label>${control}${field.help ? `<small>${field.help}</small>` : ""}</div>`;
}

function renderStageRail() {
  const active = Math.min(workflow.currentStage, STAGES.length - 1);
  $("#stage-rail").innerHTML = STAGES.map((stage, index) => {
    const complete = workflow.completedStages.includes(index);
    const isActive = index === active && workflow.currentStage < STAGES.length;
    return `<button class="stage-button ${complete ? "complete" : ""} ${isActive ? "active" : ""}" type="button" disabled aria-current="${isActive ? "step" : "false"}">
      <span class="stage-number">${complete ? "✓" : index + 1}</span><span class="stage-label">${stage.short}</span>
    </button>`;
  }).join("");
}

function renderStage() {
  const complete = workflow.currentStage >= STAGES.length;
  const index = complete ? STAGES.length - 1 : workflow.currentStage;
  const stage = STAGES[index];
  $("#stage-kicker").textContent = complete ? "Workflow complete" : `Stage ${index + 1} of ${STAGES.length}`;
  $("#stage-title").textContent = complete ? "Claim reconciled" : stage.title;
  $("#stage-description").textContent = complete
    ? "The insurer payment is accounted for, and both balances are derived from the posted ledger entries."
    : stage.description;
  $("#stage-state").textContent = complete ? "Reconciled" : "Ready to begin";
  $("#stage-state").className = `state-pill ${complete ? "complete" : ""}`;
  $("#contract-strip").innerHTML = [
    ["Actor", stage.actor], ["Trigger", stage.trigger], ["Expected result", stage.result]
  ].map(([label, value]) => `<div class="contract-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#stage-form").innerHTML = complete
    ? `<div class="contract-item field full"><span>Final output</span><strong>${money(workflow.insuranceBalance)} insurance balance · ${money(workflow.patientBalance)} patient balance</strong></div>`
    : stage.fields.map(fieldMarkup).join("");
  $("#stage-submit").textContent = complete ? "Workflow complete" : stage.button;
  $("#stage-submit").disabled = complete;
  $("#form-message").textContent = complete ? "Every result is retained in the browser database and event trail." : "Complete the fields, then trigger the stage result.";
  $("#form-message").className = "form-message";
}

function renderSummary() {
  $("#case-title").textContent = `${workflow.patientName} · Filling`;
  $("#case-procedure").textContent = workflow.procedureCode;
  $("#case-charge").textContent = money(workflow.billedAmount);
  $("#case-payer").textContent = workflow.payerName;
  $("#claim-status").textContent = workflow.claimStatus.replaceAll("_", " ").toLowerCase().replace(/^./, (c) => c.toUpperCase());
  $("#insurance-balance").textContent = money(workflow.insuranceBalance);
  $("#patient-balance").textContent = money(workflow.patientBalance);
  if (workflow.currentStage === 0) {
    $("#balance-check").textContent = "No ledger yet";
    $("#balance-equation").textContent = "Complete claim preparation to record the $200 charge";
  } else if (workflow.currentStage < 3) {
    $("#balance-check").textContent = "Charge recorded";
    $("#balance-equation").textContent = `${money(workflow.billedAmount)} charge awaits the insurer's decision`;
  } else if (workflow.currentStage === 3) {
    $("#balance-check").textContent = "Awaiting remittance";
  } else {
    $("#balance-check").textContent = workflow.currentStage >= 5 ? "Ledger reconciled" : "Ledger posted";
    $("#balance-equation").textContent = "$200 charge = $100 insurer payment + $60 adjustment + $40 patient balance";
  }
}

async function renderEvents() {
  const events = (await getAll("auditEvents")).filter((event) => event.caseId === CASE_ID).sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  $("#event-timeline").innerHTML = events.length ? events.map((event) => `
    <article class="event-item">
      <div class="event-meta"><span>${event.actor}</span><time>${new Date(event.occurredAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></div>
      <h3>${event.action}</h3>
      <p>${event.output}</p>
    </article>`).join("") : `<p class="timeline-empty">Complete claim preparation to create the first workflow event.</p>`;
}

async function renderRecords() {
  const select = $("#store-select");
  if (!select.options.length) {
    select.innerHTML = STORES.map((name) => `<option value="${name}">${STORE_LABELS[name]}</option>`).join("");
  }
  const records = (await getAll(select.value || STORES[0])).filter((record) => record.caseId === CASE_ID || record.id === CASE_ID);
  $("#record-count").textContent = `${records.length} record${records.length === 1 ? "" : "s"} stored in IndexedDB`;
  $("#record-view").textContent = records.length ? JSON.stringify(records, null, 2) : "No records yet.";
}

async function renderAll() {
  renderStageRail();
  renderStage();
  renderSummary();
  await Promise.all([renderEvents(), renderRecords()]);
}

async function saveWorkflow(updates) {
  workflow = { ...workflow, ...updates, updatedAt: now() };
  await put("cases", workflow);
}

async function writeAudit(stageIndex, input, decision, action, output, failurePath = null) {
  await put("auditEvents", {
    ...baseRecord(id("audit")),
    stage: STAGES[stageIndex].title,
    actor: STAGES[stageIndex].actor,
    trigger: STAGES[stageIndex].trigger,
    input,
    action,
    decision,
    output,
    failurePath,
    occurredAt: now()
  });
}

async function createException(stageIndex, type, reason, input) {
  const exceptionId = id("exception");
  await put("exceptionCases", {
    ...baseRecord(exceptionId),
    exceptionType: type,
    relatedClaimId: workflow.claimId || null,
    status: "OPEN",
    owner: "Billing coordinator",
    reason,
    sourceStage: STAGES[stageIndex].title,
    createdAt: now()
  });
  await writeAudit(stageIndex, input, type, "Stopped automatic processing", `${reason} No downstream financial state changed.`, reason);
  return exceptionId;
}

async function advance(stageIndex, updates = {}) {
  const completedStages = [...new Set([...workflow.completedStages, stageIndex])];
  await saveWorkflow({ ...updates, completedStages, currentStage: stageIndex + 1 });
}

async function writeJournal(eventType, amount, lines, postingId = null) {
  const eventId = id("financial");
  const entryId = id("journal");
  await put("financialEvents", {
    ...baseRecord(eventId), postingId, procedureId: eventType === "CHARGE" ? "procedure-001" : null,
    eventType, amount: Number(amount), effectiveAt: now(), reversesFinancialEventId: null
  });
  await put("journalEntries", {
    ...baseRecord(entryId), financialEventId: eventId, entryNumber: `JE-${Date.now()}-${Math.floor(Math.random() * 100)}`,
    effectiveAt: now(), postedAt: now(), reversesJournalEntryId: null
  });
  await Promise.all(lines.map((line, index) => put("journalLines", {
    ...baseRecord(id("line")), journalEntryId: entryId, patientAccountId: "account-001",
    claimLineId: workflow.claimLineId || null, ledgerAccount: line.account,
    debitAmount: line.debit || 0, creditAmount: line.credit || 0, sequence: index + 1
  })));
  return { eventId, entryId };
}

async function handlePreparation(input) {
  if (input.preparationDecision !== "ready") {
    const reason = input.preparationDecision === "missing" ? "Required claim information is missing." : "The procedure may already be linked to another active claim.";
    await createException(0, input.preparationDecision === "missing" ? "MISSING_INFORMATION" : "DUPLICATE", reason, input);
    await saveWorkflow({ claimStatus: "NEEDS_CORRECTION" });
    throw new Error(reason);
  }
  const claimId = "claim-001";
  const claimLineId = "claim-line-001";
  const claimVersionId = "claim-version-001";
  const amount = Number(input.billedAmount);
  await put("claims", { ...baseRecord(claimId), claimId, patientId: "patient-001", accountId: "account-001", coverageId: "coverage-001", practiceId: "practice-001", locationId: "location-001", claimNumber: "PB-1001", processingStatus: "READY", adjudicationOutcome: null, rowVersion: 1, createdAt: now() });
  await put("claimLines", { ...baseRecord(claimLineId), claimLineId, claimId, procedureId: "procedure-001", lineNumber: 1, procedureCode: input.procedureCode, tooth: input.tooth, billedAmount: amount, status: "READY" });
  await put("claimVersions", { ...baseRecord(claimVersionId), claimVersionId, claimId, versionNumber: 1, claimSnapshot: input, contentHash: "demo-sha256-claim-001-v1", approvedBy: "user-007", approvedAt: now() });
  await saveWorkflow({ patientName: input.patientName, payerName: input.payerName, procedureCode: input.procedureCode, billedAmount: amount, claimId, claimLineId, claimVersionId, claimStatus: "READY", insuranceBalance: amount });
  await writeJournal("CHARGE", amount, [{ account: "INSURANCE_AR", debit: amount }, { account: "SERVICE_REVENUE", credit: amount }]);
  await writeAudit(0, input, "Complete, valid, no duplicate", "Created and validated claim PB-1001", `Claim moved Draft → Ready; ${money(amount)} charge recorded.`);
  await advance(0);
}

async function handleSubmission(input) {
  if (input.submissionDecision !== "accepted") {
    const reason = input.submissionDecision === "rejected" ? "The clearinghouse rejected the claim before insurer review." : "The claim could not be delivered to the clearinghouse.";
    await createException(1, input.submissionDecision.toUpperCase().replace("-", "_"), reason, input);
    await saveWorkflow({ claimStatus: input.submissionDecision === "rejected" ? "REJECTED" : "READY" });
    throw new Error(reason);
  }
  const submissionId = "submission-001";
  await put("submissions", { ...baseRecord(submissionId), submissionId, claimVersionId: workflow.claimVersionId, idempotencyKey: input.idempotencyKey, clearinghouseRoute: input.clearinghouseRoute, status: "ACCEPTED", attemptCount: 1, submittedAt: now() });
  await put("clearinghouseTransactions", { ...baseRecord("transaction-837-001"), transactionId: "transaction-837-001", submissionId, claimId: workflow.claimId, transactionType: "837D", direction: "OUTBOUND", partnerMessageId: input.partnerClaimId, correlationId: "corr-claim-001", payloadUri: "browser://837/claim-001", payloadHash: "demo-sha256-837", occurredAt: now(), processingStatus: "PROCESSED" });
  await put("clearinghouseTransactions", { ...baseRecord("transaction-ack-001"), transactionId: "transaction-ack-001", submissionId, claimId: workflow.claimId, transactionType: "ACK", direction: "INBOUND", partnerMessageId: `${input.partnerClaimId}-ACK`, correlationId: "corr-claim-001", payloadUri: "browser://ack/claim-001", payloadHash: "demo-sha256-ack", occurredAt: now(), processingStatus: "PROCESSED" });
  await put("claimStatusEvents", { ...baseRecord("status-accepted-001"), statusEventId: "status-accepted-001", claimId: workflow.claimId, transactionId: "transaction-ack-001", status: "ACCEPTED", effectiveAt: now(), receivedAt: now(), sourceSequence: "1", reasonCode: null });
  const claim = await get("claims", workflow.claimId);
  await put("claims", { ...claim, processingStatus: "ACCEPTED", rowVersion: 2 });
  await writeAudit(1, input, "Accepted for payment review", "Sent approved claim version through Clearinghouse 1", "Submission moved Queued → Sent → Accepted; partner identifiers retained.");
  await advance(1, { submissionId, claimStatus: "ACCEPTED" });
}

async function handleTracking(input) {
  if (["delayed", "conflicting"].includes(input.trackingDecision)) {
    const reason = input.trackingDecision === "delayed" ? "No status response arrived by the scheduled check." : "The latest response conflicts with the last confirmed claim status.";
    await createException(2, input.trackingDecision.toUpperCase(), reason, input);
    throw new Error(reason);
  }
  const status = input.trackingDecision === "pending" ? "PENDING" : "ADJUDICATED";
  const transactionId = id("transaction-277");
  const statusEventId = id("status");
  await put("clearinghouseTransactions", { ...baseRecord(transactionId), transactionId, submissionId: workflow.submissionId, claimId: workflow.claimId, transactionType: "277CA", direction: "INBOUND", partnerMessageId: input.payerClaimId, correlationId: "corr-claim-001", payloadUri: `browser://277/${statusEventId}`, payloadHash: `demo-${status.toLowerCase()}`, occurredAt: now(), processingStatus: "PROCESSED" });
  await put("claimStatusEvents", { ...baseRecord(statusEventId), statusEventId, claimId: workflow.claimId, transactionId, status, effectiveAt: `${input.statusCheckDate}T15:00:00.000Z`, receivedAt: now(), sourceSequence: String(Date.now()), reasonCode: null });
  const claim = await get("claims", workflow.claimId);
  await put("claims", { ...claim, processingStatus: status, adjudicationOutcome: status === "ADJUDICATED" ? "PAID" : null, rowVersion: claim.rowVersion + 1 });
  await writeAudit(2, input, status, "Stored source response and appended status event", status === "PENDING" ? "Claim remains Pending; prior statuses retained." : "Claim moved Pending → Adjudicated; complete status history retained.");
  if (status === "PENDING") {
    await saveWorkflow({ claimStatus: status });
    return { stay: true, message: "Pending status recorded. Record the next insurer status when it arrives." };
  }
  await advance(2, { claimStatus: status });
}

async function handleRemittance(input) {
  const billed = Number(input.billedAmount);
  const paid = Number(input.paidAmount);
  const adjustment = Number(input.adjustmentAmount);
  const patient = Number(input.patientResponsibility);
  const balances = Math.abs(billed - paid - adjustment - patient) < 0.005;
  if (input.remittanceDecision !== "exact" || !balances) {
    const reason = input.remittanceDecision === "unmatched" ? "The ERA line cannot be matched to one claim line." : "The remittance amounts do not equal the billed charge.";
    await put("remittances", { ...baseRecord("remittance-001"), remittanceId: "remittance-001", payerId: "payer-a", sourceTransactionId: "transaction-835-001", eraControlNumber: input.eraControlNumber, paymentTrace: input.paymentTrace, totalPaymentAmount: paid, receivedAt: now(), status: "NEEDS_REVIEW" });
    await createException(3, input.remittanceDecision === "unmatched" ? "UNMATCHED_REMITTANCE" : "UNBALANCED_REMITTANCE", reason, input);
    await saveWorkflow({ remittanceStatus: "NEEDS_REVIEW" });
    throw new Error(`${reason} The ledger was not changed.`);
  }
  await put("clearinghouseTransactions", { ...baseRecord("transaction-835-001"), transactionId: "transaction-835-001", submissionId: workflow.submissionId, claimId: workflow.claimId, transactionType: "835", direction: "INBOUND", partnerMessageId: input.eraControlNumber, correlationId: "corr-claim-001", payloadUri: "browser://835/ERA-A-7788", payloadHash: "demo-sha256-835", occurredAt: now(), processingStatus: "PROCESSED" });
  await put("remittances", { ...baseRecord("remittance-001"), remittanceId: "remittance-001", payerId: "payer-a", sourceTransactionId: "transaction-835-001", eraControlNumber: input.eraControlNumber, paymentTrace: input.paymentTrace, totalPaymentAmount: paid, receivedAt: now(), status: "POSTED" });
  await put("remittanceLines", { ...baseRecord("remittance-line-001"), remittanceLineId: "remittance-line-001", remittanceId: "remittance-001", claimLineId: workflow.claimLineId, payerClaimId: "A-CLAIM-9911", serviceLineNumber: 1, billedAmount: billed, allowedAmount: Number(input.allowedAmount), paidAmount: paid, patientResponsibilityAmount: patient, deniedAmount: 0, matchStatus: "EXACT_MATCH" });
  await put("remittanceAdjustments", { ...baseRecord("adjustment-001"), remittanceAdjustmentId: "adjustment-001", remittanceLineId: "remittance-line-001", groupCode: "CO", reasonCode: "45", amount: adjustment, remarkCodes: [] });
  await put("postings", { ...baseRecord("posting-001"), postingId: "posting-001", remittanceLineId: "remittance-line-001", claimLineId: workflow.claimLineId, postingMode: "AUTO", idempotencyKey: "post-remline-001-v1", status: "POSTED", approvedBy: null, postedAt: now(), rowVersion: 1 });
  await writeJournal("INSURER_PAYMENT", paid, [{ account: "CASH", debit: paid }, { account: "INSURANCE_AR", credit: paid }], "posting-001");
  await writeJournal("CONTRACTUAL_ADJUSTMENT", adjustment, [{ account: "CONTRACTUAL_ADJUSTMENT", debit: adjustment }, { account: "INSURANCE_AR", credit: adjustment }], "posting-001");
  await writeJournal("TRANSFER_TO_PATIENT", patient, [{ account: "PATIENT_AR", debit: patient }, { account: "INSURANCE_AR", credit: patient }], "posting-001");
  await writeAudit(3, input, "Exact match and balanced", "Matched ERA line and posted three financial events", `Remittance moved Received → Matched → Posted; ${money(patient)} transferred to patient responsibility.`);
  await advance(3, { remittanceStatus: "POSTED", insuranceBalance: 0, patientBalance: patient, paymentTrace: input.paymentTrace, paidAmount: paid });
}

async function handleReconciliation(input) {
  const amountDifference = Number(input.bankPaymentAmount) - Number(input.eraPaymentAmount);
  const traceMatches = input.bankPaymentTrace === input.eraPaymentTrace;
  if (input.reconciliationDecision !== "matched" || !traceMatches || Math.abs(amountDifference) >= 0.005) {
    const reason = "The bank deposit does not match the ERA payment trace and amount.";
    await put("reconciliations", { ...baseRecord("reconciliation-001"), reconciliationId: "reconciliation-001", remittanceId: "remittance-001", paymentId: null, matchedAmount: 0, differenceAmount: amountDifference, status: "MISMATCH", resolvedBy: null, resolutionReason: null, resolvedAt: null });
    await createException(4, "PAYMENT_MISMATCH", reason, input);
    await saveWorkflow({ reconciliationStatus: "MISMATCH" });
    throw new Error(reason);
  }
  await put("payments", { ...baseRecord("payment-001"), paymentId: "payment-001", sourceType: "INSURER", sourceIdentifier: "payer-a", amount: Number(input.bankPaymentAmount), paymentTrace: input.bankPaymentTrace, bankTransactionId: input.bankTransactionId, receivedAt: now(), status: "MATCHED" });
  await put("reconciliations", { ...baseRecord("reconciliation-001"), reconciliationId: "reconciliation-001", remittanceId: "remittance-001", paymentId: "payment-001", matchedAmount: Number(input.bankPaymentAmount), differenceAmount: 0, status: "RECONCILED", resolvedBy: null, resolutionReason: null, resolvedAt: now() });
  await put("balanceProjections", { ...baseRecord("balance-001"), projectionId: "balance-001", accountId: "account-001", claimId: workflow.claimId, projectionType: "CLAIM", insuranceBalance: 0, patientBalance: workflow.patientBalance, lastJournalSequence: 4, calculatedAt: now(), rowVersion: 4 });
  const remittance = await get("remittances", "remittance-001");
  await put("remittances", { ...remittance, status: "RECONCILED" });
  await writeAudit(4, input, "Trace and amount match", "Matched EFT to ERA and recalculated balances", `Remittance is Reconciled; insurance balance is $0.00 and patient balance is ${money(workflow.patientBalance)}.`);
  await advance(4, { remittanceStatus: "RECONCILED", reconciliationStatus: "RECONCILED" });
}

const HANDLERS = [handlePreparation, handleSubmission, handleTracking, handleRemittance, handleReconciliation];

async function completeCurrentStage(input = readForm()) {
  if (workflow.currentStage >= STAGES.length) return { status: "complete", stage: "Workflow complete" };
  const stageIndex = workflow.currentStage;
  const result = await HANDLERS[stageIndex](input);
  await loadWorkflow();
  await renderAll();
  if (result?.stay) {
    showToast(result.message);
    return { status: "pending", stage: STAGES[stageIndex].title, message: result.message };
  }
  showToast(`${STAGES[stageIndex].title} complete. ${workflow.currentStage < STAGES.length ? STAGES[workflow.currentStage].title + " is ready." : "The claim is reconciled."}`);
  return { status: "complete", stage: STAGES[stageIndex].title, nextStage: STAGES[workflow.currentStage]?.title || null };
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3500);
}

async function resetExample() {
  await clearDatabase();
  await seedExample();
  await renderAll();
  showToast("The $200 filling example has been reset.");
}

function bindTabs() {
  ["events", "records"].forEach((name) => {
    $(`#${name}-tab`).addEventListener("click", async () => {
      ["events", "records"].forEach((tab) => {
        const active = tab === name;
        $(`#${tab}-tab`).classList.toggle("active", active);
        $(`#${tab}-tab`).setAttribute("aria-selected", String(active));
        $(`#${tab}-panel`).classList.toggle("hidden", !active);
      });
      if (name === "records") await renderRecords();
    });
  });
}

function registerWebMCP() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "read_claim_workflow_state",
      title: "Read claim workflow state",
      description: "Read the current stage, claim state, remittance state, and balances without changing them.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async () => ({ currentStage: STAGES[workflow.currentStage]?.title || "Complete", claimStatus: workflow.claimStatus, remittanceStatus: workflow.remittanceStatus, reconciliationStatus: workflow.reconciliationStatus, insuranceBalance: workflow.insuranceBalance, patientBalance: workflow.patientBalance })
    },
    {
      name: "complete_current_claim_stage",
      title: "Complete current claim stage",
      description: "Complete the currently visible claim stage with the supplied form values and advance only when its decision succeeds.",
      inputSchema: { type: "object", properties: { values: { type: "object", additionalProperties: { type: ["string", "number"] } } }, required: ["values"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async ({ values }) => {
        if (!values || typeof values !== "object" || Array.isArray(values)) throw new Error("values must be an object");
        const defaults = Object.fromEntries(STAGES[workflow.currentStage]?.fields.map((field) => [field.name, field.value]) || []);
        return completeCurrentStage({ ...defaults, ...values });
      }
    },
    {
      name: "reset_claim_workflow_example",
      title: "Reset claim workflow example",
      description: "Delete the device-local workflow records and restore the original $200 filling example.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async () => { await resetExample(); return { status: "reset", caseId: CASE_ID }; }
    }
  ];
  tools.forEach((tool) => {
    try { void Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch (_) {}
  });
}

async function boot() {
  try {
    db = await openDatabase();
    await loadWorkflow();
    $("#storage-status").classList.add("ready");
    $("#storage-status").lastChild.textContent = " Saved in this browser";
    await renderAll();
    registerWebMCP();
  } catch (error) {
    $("#storage-status").textContent = "Browser database unavailable";
    $("#form-message").textContent = "The browser database could not be opened. Reload the page or check browser storage permissions.";
    $("#form-message").className = "form-message error";
    $("#stage-submit").disabled = true;
  }
}

$("#stage-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  $("#stage-submit").disabled = true;
  $("#form-message").textContent = "Recording state change…";
  try {
    await completeCurrentStage();
  } catch (error) {
    await loadWorkflow();
    await renderAll();
    $("#stage-state").textContent = "Needs attention";
    $("#stage-state").className = "state-pill error";
    $("#form-message").textContent = error.message;
    $("#form-message").className = "form-message error";
    $("#stage-submit").disabled = false;
    showToast(error.message);
  }
});

$("#reset-button").addEventListener("click", resetExample);
$("#store-select").addEventListener("change", renderRecords);
bindTabs();
boot();
