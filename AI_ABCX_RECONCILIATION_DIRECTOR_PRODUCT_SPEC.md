# AI-ABCX Reconciliation Director Product Spec

This document defines the implementation-grade product specification for `Reconciliation Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Reconciliation Director is one of the first Wave 4 launch directors because it gives the CFO lane a verified-finance-truth anchor, separates visible numbers from trusted numbers, and prevents the President from governing from partially corrected records.

---

## 1. Product Identity

### Public name

`Reconciliation Director`

### Executive owner

`CFO`

### Mission

Reconciliation Director verifies that recorded revenue, payment status, categorization, and close-state truth actually match so the President can operate from numbers that are reconciled and safe to trust.

### Core promise

Reconciliation Director should not feel like a generic bookkeeping note or passive accounting table.

It should promise:

- cleaner finance truth
- clearer unresolved mismatch visibility
- safer month-close confidence
- less confusion between recorded and verified numbers
- stronger President trust in the reports being presented
- faster identification of items still needing correction
- better control over finance ambiguity before it affects decisions

---

## 2. Strategic Role Inside AI-ABCX

Reconciliation Director is the verified-finance-truth lane of the system.

It manages the operating span between:

`recorded finance activity -> mismatch detection -> issue classification -> verification discipline -> month-close readiness -> verified truth for President control`

It is strategically important because:

- recorded numbers are not the same as reconciled numbers
- businesses often confuse visible revenue with verified revenue
- unresolved finance items quietly distort reporting quality
- month-close becomes unreliable if categorization and pending-item issues stay hidden
- the President needs to know whether the financial record is safe to trust right now

Reconciliation Director can be:

- part of the core financial-control layer
- part of a full-system recommendation
- a required finance-verification layer whenever Revenue Control, Accounting, Payroll, and executive reporting are active

It should not be positioned as a standalone accounting package detached from the operating system.

---

## 3. Benchmark Position

### Strongest outside benchmarks

- accounting close-control workflows
- reconciliation dashboards
- payment-verification systems
- finance issue-tracking systems
- month-end review tools

### What they do well

- show whether records were reviewed
- highlight unresolved mismatches
- support period-close discipline
- identify categorization issues
- separate pending items from complete items

### What AI-ABCX must match

- visible reconciliation status
- unresolved mismatch visibility
- clear month-close readiness
- pending-item visibility
- categorization integrity visibility
- usable executive understanding of finance truth

### Where AI-ABCX should beat them

- Reconciliation is connected to the same shared operating record as Revenue Control, Estimator, Scheduling, Service, and Reporting
- the system can tie finance mismatches back to the workflow that created them
- the President can see whether numbers are merely recorded or actually verified
- unresolved finance ambiguity can flow directly into Reporting and Strategy
- finance truth is governed inside one corporate operating system instead of across disconnected tools

---

## 4. Ideal Customer Fit

Reconciliation Director is a strong fit for:

- companies with more than simple owner-memory finance control
- businesses where payments, service outcomes, and recorded revenue do not always line up cleanly
- owners who want stronger month-close confidence
- teams with unresolved pending items or correction drift
- companies scaling toward more formal reporting discipline

It is especially strong for:

- businesses with active estimating and collections
- companies with partial payments, revisions, and mixed close states
- service businesses where operations and finance truth must stay aligned
- companies preparing for stronger executive reporting and strategic planning

---

## 5. Required User Outcomes

Reconciliation Director must let a business owner say:

- “I know whether the numbers are only recorded or actually reconciled.”
- “I can see what still needs verification before month-close.”
- “I can tell which finance issues are open and why.”
- “I can see categorization drift before it pollutes the reporting.”
- “I know whether finance truth is safe enough to govern from.”
- “The system makes close readiness visible instead of vague.”
- “My reports feel trustworthy because the underlying record was verified.”

---

## 6. Functional Scope

Reconciliation Director must cover eight major functions:

1. reconciliation status visibility
2. unresolved mismatch detection
3. pending finance item control
4. categorization integrity visibility
5. month-close checklist discipline
6. recorded-vs-verified truth separation
7. issue ownership and correction flow
8. President-facing finance-verification guidance

---

## 7. Reconciliation Categories

Reconciliation Director must support category-aware finance-verification logic.

Launch-required categories:

- month-close checklist
- reconciliation completion
- pending finance items
- categorization integrity
- revenue truth verification
- unresolved mismatch visibility
- finance-control status

Each category should remain distinct so the President can understand whether the risk is completion, categorization, pending verification, or actual finance mismatch.

---

## 8. Required Reconciliation States

Reconciliation Director needs its own finance-verification states while still staying tied to the same shared company record.

Launch-required states:

- `reconciliation_visible`
- `reconciliation_in_progress`
- `reconciliation_complete`
- `pending_items_open`
- `categorization_drift_visible`
- `month_close_at_risk`
- `verification_needed`
- `finance_truth_confirmed`
- `president_attention_needed`
- `close_ready`

Each state must preserve:

- expected amount
- recorded amount
- verified amount if applicable
- mismatch condition
- pending-item condition
- categorization condition
- month-close condition
- related customer / job / transaction / lane
- issue note
- President-facing note

---

## 9. Shared Company Record Requirement

Reconciliation Director must operate on the same company truth used by the rest of AI-ABCX.

Required launch fields:

- related customer / job / transaction reference
- expected revenue value
- recorded revenue value
- payment confirmation state
- categorization state
- reconciliation state
- pending-item count
- month-close status
- mismatch explanation
- President-facing note

Reconciliation Director must never create a detached finance-truth subsystem with its own separate verified reality.

---

## 10. Product Surfaces

Reconciliation Director must not launch as hidden finance logic only.

It needs visible product surfaces.

### Surface 1. Executive Summary

Purpose:

- show whether the company’s finance truth is actually reconciled

Required visibility:

- reconciliation status
- open pending items
- mismatch count
- month-close risk
- next corrective action

### Surface 2. Verification Queue

Purpose:

- show what still must be verified before numbers are trusted

Required visibility:

- pending finance items
- unresolved mismatches
- categorization drift
- issue age
- ownership state

### Surface 3. Month-Close Control

Purpose:

- make close readiness explicit

Required visibility:

- checklist completion
- open blockers
- unresolved transaction issues
- incomplete verification items
- close-ready or at-risk state

### Surface 4. President Control View

Purpose:

- let the President understand finance trust without becoming an accountant

Required visibility:

- are the numbers reconciled
- what remains unresolved
- what operational lane is contributing to the issue
- whether strategy and reporting are safe to trust

### Surface 5. CFO Review Surface

Purpose:

- provide deeper verification and correction workflow control

Required visibility:

- mismatch groupings
- categorization integrity
- payment confirmation gaps
- recurring issue patterns
- issue priority

---

## 11. Core Business Logic

Reconciliation Director must follow five core rules:

### Rule 1. Recorded is not verified

A number can be visible in the system without yet being trusted as reconciled truth.

### Rule 2. Pending items block confidence

Open finance items must reduce close confidence and remain visible until resolved.

### Rule 3. Categorization quality matters

Misclassified or ambiguous entries must be treated as finance-truth risk, not cosmetic detail.

### Rule 4. Month-close is a controlled state

Month-close cannot be considered complete if verification blockers remain open.

### Rule 5. Reconciliation must support executive action

Reconciliation is not only for book correction. It must improve Reporting, Strategy, and President confidence.

---

## 12. Dependency Structure

### Hard dependencies

- Revenue Control Director
- Accounting Director
- Executive Reporting Director

### Strong dependencies

- Payroll Director
- Strategy Director
- Estimator Director
- Service Director
- Scheduling Director

### Useful surrounding dependencies

- Sales Director
- Follow-Up Director
- Accountability Director

### Dependency logic

Revenue Control says what money should be true versus what appears to be true.

Reconciliation confirms whether the record has actually been verified and corrected enough to trust.

Accounting and Payroll carry finance detail.

Executive Reporting and Strategy depend on reconciled truth before they should be treated as safe executive guidance.

---

## 13. A / B / C Definition

### Level A

Level A Reconciliation Director is visible finance-verification discipline.

Includes:

- reconciliation visibility
- pending finance item visibility
- basic categorization visibility
- month-close checklist visibility
- basic correction prompts

Best fit:

- owner-led service businesses
- lean finance environments
- companies needing verified finance truth before deeper automation

### Level B

Level B Reconciliation Director adds stronger verification control and issue discipline.

Includes everything in A, plus:

- stronger mismatch classification
- clearer issue ownership
- deeper linkage to Revenue Control and Accounting
- better recurring-drift visibility
- stronger close review discipline

Best fit:

- growing companies
- businesses with more transaction volume
- teams needing better finance process clarity

### Level C

Level C Reconciliation Director adds advanced verification intelligence and executive-grade finance control.

Includes everything in B, plus:

- stronger automated mismatch prioritization
- deeper root-cause visibility
- stronger cross-lane finance-truth guidance
- recurring issue-pattern recognition
- more advanced month-close risk control

Best fit:

- scaling companies
- higher-complexity finance environments
- businesses needing stronger CFO-grade trust logic without heavy manual oversight

---

## 14. Pricing Direction

Reconciliation Director should be priced as a finance-control and verified-truth director, not as a commodity bookkeeping widget.

Pricing should reflect:

- protection against bad reporting decisions
- stronger month-close confidence
- better finance visibility for the President
- improved trust in Reporting and Strategy

Commercially it likely belongs:

- inside improved and advanced finance recommendations
- inside full-system recommendations
- inside CFO-lane bundles

It can also be offered as an upgrade when the customer’s main pain is finance trust rather than revenue generation alone.

---

## 15. Diagnostic Recommendation Logic

Step 1 should recommend Reconciliation Director more strongly when the customer shows:

- unclear month-close process
- confusion about whether numbers are accurate
- open payment or categorization issues
- mixed service completion and finance truth
- multiple jobs moving at once
- owner frustration with unreliable reporting

It should become stronger when:

- Revenue Control is recommended
- Accounting is required
- the customer wants better executive reporting
- the customer describes finance confusion, correction work, or trust issues

It should weaken when:

- the company is extremely small
- finance movement is minimal
- the customer only wants isolated front-end tools

---

## 16. Recommended Diagnostic Questions

The diagnostic should ask:

- “Do you fully trust your current month-end numbers?”
- “Do payments, job results, and recorded revenue always match cleanly?”
- “How often do you discover finance issues after the fact?”
- “Do you have unresolved items sitting open at the end of the month?”
- “Is it easy for you to tell which numbers are final and which still need verification?”
- “Do you want the system to flag finance mismatches before reports are treated as complete?”

These questions should sound like owner-language, not accountant-language.

---

## 17. Dashboard Requirements

Reconciliation Director requires dashboard visibility at three levels.

### President Dashboard

Must show:

- reconciliation health
- open mismatch count
- month-close readiness
- strongest finance-truth warning

### CFO Dashboard

Must show:

- verification queue
- categorization drift
- unresolved finance items
- issue aging
- close blockers

### Executive Summary Layer

Must show:

- whether reports are safe to trust
- whether finance truth is still provisional
- whether unresolved issues could distort strategy

---

## 18. Launch Test Scenarios

Reconciliation Director is not launch-ready until it passes realistic scenarios.

Required tests:

1. recorded revenue exists but payment truth is incomplete
2. expected and recorded values mismatch and the issue is surfaced clearly
3. month-close stays blocked when pending finance items remain
4. categorization drift becomes visible before reporting is finalized
5. resolved items remove risk and improve close-readiness state
6. President summary clearly distinguishes recorded numbers from verified numbers
7. CFO surface groups unresolved issues into usable correction workflow

---

## 19. Launch Exit Condition

Reconciliation Director is launch-ready only when:

- reconciliation status is visible
- unresolved finance mismatches are visible
- pending-item logic is working
- month-close readiness is explicit
- categorization drift is surfaced
- Reporting can distinguish provisional vs reconciled truth
- President-facing finance trust is understandable
- A / B / C differences are real and testable

If these conditions are not met, the director is not complete enough for launch.

---

## 20. Build Priority

Reconciliation Director is a Wave 4 CFO-lane director.

It should follow:

- Revenue Control Director
- or be built in close coordination with Revenue Control Director

Why:

- Revenue Control establishes expected-vs-confirmed money truth
- Reconciliation verifies whether the actual record is corrected enough to trust

These two directors should work as neighboring but distinct lanes.

---

## 21. Final Product Statement

Reconciliation Director is the AI-ABCX finance-verification lane that confirms whether the company’s recorded numbers are actually reconciled, corrected, and safe to govern from. It gives the President visible finance truth, stronger month-close confidence, and clear visibility into unresolved mismatches before they become reporting and strategy problems.
