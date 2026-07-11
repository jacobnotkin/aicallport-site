# AI-ABCX Accounting Director Product Spec

This document defines the implementation-grade product specification for `Accounting Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Accounting Director is one of the first Wave 4 launch directors because it gives the CFO lane a real accounting-discipline layer, keeps close tasks explicit, and prevents the President from making decisions on top of disorganized finance records.

---

## 1. Product Identity

### Public name

`Accounting Director`

### Executive owner

`CFO`

### Mission

Accounting Director keeps accounting records orderly, categorized, reviewable, approval-aligned, and close-ready so the President can trust that the business books are organized before relying on executive summaries and strategy decisions.

### Core promise

Accounting Director should not feel like a generic bookkeeping page or passive ledger export.

It should promise:

- cleaner books
- clearer accounting discipline
- less month-close stress
- fewer hidden finance loose ends
- stronger categorization quality
- clearer pending-item control
- better trust that finance records are orderly before decisions are made

---

## 2. Strategic Role Inside AI-ABCX

Accounting Director is the finance-operations discipline lane of the system.

It manages the operating span between:

`source records -> categorization -> pending item control -> approval alignment -> close-task discipline -> accounting order for executive trust`

It is strategically important because:

- finance truth fails when the underlying records are incomplete or disorganized
- unresolved accounting tasks quietly damage reporting quality
- owners often discover accounting issues too late, after they have already looked at the numbers
- strong revenue visibility still depends on orderly accounting structure underneath
- month-close quality depends on visible accounting discipline, not only final summaries

Accounting Director can be:

- part of the core CFO stack
- part of a full-system recommendation
- a required accounting-order layer whenever Revenue Control, Reconciliation, Payroll, and executive reporting are active

It should not be positioned as a detached external bookkeeping app replacement without connection to the operating system.

---

## 3. Benchmark Position

### Strongest outside benchmarks

- accounting close-control tools
- bookkeeping workflow systems
- categorization review systems
- source-record audit workflows
- finance task-management tools

### What they do well

- maintain accounting checklists
- surface missing or incomplete records
- support categorization discipline
- organize close work
- keep finance review visible

### What AI-ABCX must match

- clear close checklist visibility
- pending-item visibility
- source-record completeness visibility
- categorization quality visibility
- approval tracking
- understandable accounting risk visibility

### Where AI-ABCX should beat them

- Accounting Director sits inside the same President-led corporate operating system as the operational lanes producing the records
- source records, approvals, service outcomes, and revenue implications can be connected in one shared record
- the President can see accounting discipline without entering a traditional accounting tool
- accounting order can feed directly into Reconciliation, Revenue Control, Executive Reporting, and Strategy
- accounting problems can be surfaced as operating management issues instead of hidden back-office detail

---

## 4. Ideal Customer Fit

Accounting Director is a strong fit for:

- companies growing beyond simple owner-memory finance control
- businesses with several jobs, payments, and record types moving at once
- owners who feel month-close or bookkeeping review is messy
- companies where approvals, source documents, and categories do not stay consistently aligned
- teams that want cleaner executive reporting and stronger money trust

It is especially strong for:

- businesses with active estimating and payment collection
- service companies where operations create many finance-relevant records
- companies adding Payroll, Reconciliation, and Revenue Control
- businesses that want more structure before scaling harder

---

## 5. Required User Outcomes

Accounting Director must let a business owner say:

- “I know the books are orderly before I rely on the numbers.”
- “I can see what accounting items still need attention.”
- “I can tell whether records are categorized cleanly.”
- “Month-close no longer feels like hidden cleanup work.”
- “I know whether the accounting layer is organized enough to trust Reporting and Strategy.”
- “Approvals and source records are visible instead of scattered.”
- “The system makes accounting discipline feel like part of how the company is run.”

---

## 6. Functional Scope

Accounting Director must cover eight major functions:

1. close checklist visibility
2. pending accounting item control
3. categorization quality visibility
4. source-record completeness visibility
5. approval alignment visibility
6. accounting risk visibility
7. close-readiness discipline
8. President-facing accounting guidance

---

## 7. Accounting Categories

Accounting Director must support category-aware accounting-discipline logic.

Launch-required categories:

- close checklist
- pending items
- categorization quality
- source-record integrity
- approval-log integrity
- accounting risk
- close readiness

Each category should remain distinct so the President can understand whether the problem is unfinished accounting work, bad categorization, missing records, incomplete approvals, or broader close risk.

---

## 8. Required Accounting States

Accounting Director needs its own finance-operations states while still staying tied to the same shared company record.

Launch-required states:

- `close_checklist_visible`
- `pending_items_open`
- `pending_items_cleared`
- `categorization_strong`
- `categorization_drift_visible`
- `source_records_strong`
- `source_records_incomplete`
- `approval_log_complete`
- `accounting_risk_visible`
- `close_ready`
- `president_attention_needed`

Each state must preserve:

- related customer / job / transaction / record reference
- category assignment state
- source-record state
- approval state
- pending-item state
- close-task state
- accounting-risk note
- close-readiness note
- President-facing note

---

## 9. Shared Company Record Requirement

Accounting Director must operate on the same company truth used by the rest of AI-ABCX.

Required launch fields:

- related customer / job / transaction reference
- category assignment
- source-record status
- approval status
- pending-item status
- close-task status
- accounting risk note
- close-readiness state
- linked revenue or payment reference where relevant
- President-facing note

Accounting Director must never create a detached accounting truth layer separate from the rest of the operating system.

---

## 10. Product Surfaces

Accounting Director must not launch as hidden accounting logic only.

It needs visible product surfaces.

### Surface 1. Executive Summary

Purpose:

- show whether accounting order is strong enough to support trusted reporting

Required visibility:

- close-readiness state
- open pending items
- categorization health
- strongest accounting risk
- next corrective action

### Surface 2. Accounting Control Board

Purpose:

- give the CFO lane a live accounting-discipline workspace

Required visibility:

- pending accounting items
- source-record completeness
- missing approvals
- categorization drift
- close checklist progress

### Surface 3. Month-Close View

Purpose:

- make month-close an explicit operating state

Required visibility:

- checklist completion
- unresolved blockers
- at-risk areas
- incomplete records
- ready / not-ready status

### Surface 4. President Control View

Purpose:

- let the President understand whether the books are orderly without getting lost in bookkeeping detail

Required visibility:

- whether accounting order is strong
- whether unresolved items remain
- whether close can be trusted
- which issues need attention now

### Surface 5. Finance Risk View

Purpose:

- isolate structural accounting problems before they distort revenue truth and executive summaries

Required visibility:

- category drift
- missing documents
- missing approvals
- aging pending items
- repeated weak patterns

---

## 11. Core Business Logic

Accounting Director must follow five core rules:

### Rule 1. Order comes before trust

If the accounting layer is disorganized, executive reporting should not be treated as fully trustworthy.

### Rule 2. Pending items stay visible

Open accounting loose ends must remain visible until cleared.

### Rule 3. Categorization quality matters

Weak categorization must be treated as business risk, not cosmetic cleanup.

### Rule 4. Approvals and source records matter

Missing supporting records or approval states must weaken accounting confidence.

### Rule 5. Accounting discipline must support President decisions

Accounting exists inside AI-ABCX to strengthen company control, not to hide finance operations behind specialist language.

---

## 12. Dependency Structure

### Hard dependencies

- Revenue Control Director
- Reconciliation Director
- Executive Reporting Director

### Strong dependencies

- Payroll Director
- Strategy Director
- Approval Director

### Useful surrounding dependencies

- Estimator Director
- Service Director
- Scheduling Director
- Accountability Director

### Dependency logic

Revenue Control measures expected vs confirmed money.

Reconciliation verifies whether finance truth is actually corrected enough to trust.

Accounting keeps the underlying record organized enough for those two directors to function reliably.

Executive Reporting and Strategy should depend on accounting order before being treated as safe executive guidance.

---

## 13. A / B / C Definition

### Level A

Level A Accounting Director is visible accounting order and close discipline.

Includes:

- close checklist visibility
- pending-item visibility
- categorization visibility
- source-record visibility
- basic accounting risk visibility

Best fit:

- owner-led service businesses
- lean finance operations
- companies that need cleaner accounting order before deeper automation

### Level B

Level B Accounting Director adds stronger record governance and accounting review depth.

Includes everything in A, plus:

- stronger categorization control
- clearer issue ownership
- better source-record completeness checks
- stronger approval-log discipline
- deeper connection to Reconciliation and Revenue Control

Best fit:

- growing companies
- businesses with more transaction volume
- teams that need stronger accounting consistency without a larger manual department

### Level C

Level C Accounting Director adds advanced accounting intelligence and control automation.

Includes everything in B, plus:

- stronger ambiguity detection
- richer exception identification
- more advanced accounting health guidance
- stronger close-readiness logic
- deeper executive-grade accounting discipline

Best fit:

- larger or scaling service businesses
- higher-volume finance environments
- businesses needing stronger CFO-grade accounting control without heavy manual supervision

---

## 14. Pricing Direction

Accounting Director should be priced as a finance-control and record-discipline director, not as a generic bookkeeping line item.

Pricing should reflect:

- cleaner month-close process
- stronger record order
- fewer hidden finance loose ends
- safer reporting foundation
- stronger President confidence in the books

Commercially it likely belongs:

- inside improved and advanced finance recommendations
- inside CFO-lane bundles
- inside full-system recommendations where financial control matters

It can also be offered as an upgrade when the customer’s main pain is bookkeeping disorder, close stress, or weak record control.

---

## 15. Diagnostic Recommendation Logic

Step 1 should recommend Accounting Director more strongly when the customer shows:

- month-close confusion
- weak bookkeeping discipline
- missing or inconsistent categories
- unresolved accounting loose ends
- several people touching financial records
- owner frustration with finance organization

It should become stronger when:

- Revenue Control is recommended
- Reconciliation is recommended
- Payroll is needed
- the customer wants stronger executive reporting

It should weaken when:

- the company is extremely small
- financial movement is minimal
- the customer only wants isolated front-end growth tools

---

## 16. Recommended Diagnostic Questions

The diagnostic should ask:

- “Do you feel your books stay clean and organized month to month?”
- “Do accounting tasks often stay unfinished until the end of the month?”
- “Is it easy for you to tell whether records are categorized correctly?”
- “Do you ever discover missing documents, approvals, or finance details too late?”
- “Would stronger bookkeeping visibility help you trust your numbers more?”
- “Do you want the system to keep accounting tasks and finance records visibly organized for you?”

These questions should sound like owner-language, not accounting-textbook language.

---

## 17. Dashboard Requirements

Accounting Director requires dashboard visibility at three levels.

### President Dashboard

Must show:

- accounting order health
- close-readiness state
- open pending-item count
- strongest accounting-risk warning

### CFO Dashboard

Must show:

- close checklist
- source-record completeness
- categorization drift
- unresolved accounting items
- approval integrity

### Executive Summary Layer

Must show:

- whether accounting order is strong enough for trust
- whether unresolved accounting issues could distort reporting
- whether close readiness is strong or at risk

---

## 18. Launch Test Scenarios

Accounting Director is not launch-ready until it passes realistic scenarios.

Required tests:

1. month-close checklist remains incomplete and the risk is visible
2. pending accounting items remain open and appear clearly in CFO and President views
3. category drift becomes visible before reports are treated as final
4. missing source records reduce accounting confidence
5. missing approvals are surfaced as accounting risk
6. clearing items improves close-readiness state
7. executive summary distinguishes orderly books from provisional accounting condition

---

## 19. Launch Exit Condition

Accounting Director is launch-ready only when:

- close checklist visibility works
- pending accounting items are visible
- categorization quality is visible
- source-record completeness is visible
- approval-log integrity is visible
- accounting risk can be surfaced clearly
- President-facing accounting trust is understandable
- A / B / C differences are real and testable

If these conditions are not met, the director is not complete enough for launch.

---

## 20. Build Priority

Accounting Director is a Wave 4 CFO-lane director.

It should be built in close coordination with:

- Revenue Control Director
- Reconciliation Director

Why:

- Revenue Control establishes money truth visibility
- Reconciliation verifies finance truth
- Accounting keeps the underlying record clean enough for both to be trusted

These three directors should read as one coherent CFO stack with distinct responsibilities.

---

## 21. Final Product Statement

Accounting Director is the AI-ABCX finance-operations discipline lane that keeps books orderly, accounting tasks visible, categories clean, records reviewable, and close readiness explicit. It gives the President confidence that the accounting foundation is organized enough to trust reporting, strategy, and money-control decisions.
