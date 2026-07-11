# AI-ABCX Accounting Director Build Checklist

This document turns Accounting Director from an already visible but still incomplete AI-ABCX role into a normalized launch director with a clear mission, clear dependencies, and a practical build sequence.

Its purpose is to answer one direct execution question:

`What exactly has to be built, normalized, and tested for Accounting Director to become a real AI-ABCX launch director?`

This is a build-level document.

It sits below:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_MASTER_LAUNCH_ROADMAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_TIER_1_BUILD_PLAN.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_PHASE_1_EXECUTION_CHECKLIST.md`

---

## 1. Accounting Director Mission

Accounting Director is the month-close and financial-record discipline lane of AI-ABCX.

Its job is to:

- keep close tasks explicit
- preserve clean categorization
- make pending accounting items visible
- reduce ambiguity before financial close
- maintain record integrity across the company
- support reconciliations and finance truth review
- keep approvals and source records aligned
- help the President trust that the books are orderly before strategic decisions are made

Accounting Director should not feel like a generic bookkeeping screen.

It should feel like the finance operations director that turns accounting discipline into a live management function inside the President-led system.

---

## 2. Accounting Director Launch Standard

Accounting Director is launch-ready only when it can do all of the following:

1. show month-close status clearly
2. show pending accounting items clearly
3. show categorization quality clearly
4. show accounting risk without ambiguity
5. connect approvals, source records, and finance review
6. connect cleanly with Reconciliation, Revenue Control, Payroll, Executive Reporting, and Strategy
7. support daily accounting control and not just end-of-month review
8. support A / B / C levels clearly

If one of these is missing, the director is not complete.

---

## 3. Canonical Role Definition

### Public-facing name

`Accounting Director`

This may later receive a more business-facing commercial label, but this is the current canonical internal naming.

### Internal role meaning

The AI-ABCX director responsible for month-close discipline, categorization quality, pending finance item control, and clear accounting visibility across the system.

### Executive owner

`CFO`

Accounting Director belongs to the CFO lane because it is the operating finance layer that keeps accounting records organized, reviewable, and close-ready.

---

## 4. Commercial Promise

Accounting Director should promise:

- cleaner books
- less month-close stress
- fewer hidden accounting loose ends
- clearer visibility into what still needs attention
- stronger categorization discipline
- better confidence that finance records are organized before decisions are made

The commercial promise is not merely:

- "You can see accounting data."

It is:

- "Your accounting discipline becomes visible, structured, and manageable before small finance issues become larger business risks."

---

## 5. What AI-ABCX Must Match

Accounting Director must match the practical expectations customers already have from serious accounting-control and close-discipline systems:

- clear close checklists
- clear pending-item visibility
- record completeness
- categorization confidence
- approval tracking
- usable accounting risk visibility

At minimum, it must not feel weaker than the accounting review layer inside a mature service-business finance system.

---

## 6. Where AI-ABCX Can Beat the Market

Accounting Director can beat typical outside systems because:

- it sits in the same corporate structure as the operational lanes producing the records
- it can connect source records, approvals, service outcomes, and finance review in one system
- it can show month-close risk before the close fails
- it can feed directly into Reconciliation, Revenue Control, Executive Reporting, and Strategy
- it can make accounting discipline a President-visible operating lane rather than a hidden back-office function

This is stronger than generic accounting software because the accounting view is connected to the operational truth creating the entries.

---

## 7. A / B / C Definition Draft

### Level A

Level A Accounting Director is visible close discipline and accounting record order.

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

Level B Accounting Director adds stronger record-governance and accounting review depth.

Includes everything in A, plus:

- stronger categorization control
- clearer issue ownership
- better source-record completeness checks
- stronger approval-log discipline
- deeper connection to Reconciliation and Revenue Control

Best fit:

- growing companies
- businesses with more transactions and more finance review needs
- teams that need stronger accounting consistency without a larger manual department

### Level C

Level C Accounting Director adds advanced accounting intelligence and control automation.

Includes everything in B, plus:

- stronger ambiguity detection
- richer exception identification
- more advanced accounting health guidance
- stronger close-readiness logic
- deeper executive-grade finance discipline

Best fit:

- larger or scaling service businesses
- companies with higher finance volume
- businesses needing executive-grade accounting control without heavy manual supervision

---

## 8. Required Accounting Categories

Accounting Director should support at least these launch categories:

- close checklist
- pending items
- categorization quality
- source-record integrity
- approval-log integrity
- accounting risk
- close readiness

These categories should remain distinct so the President can understand whether the accounting issue is task completion, categorization drift, missing records, approval gaps, or close ambiguity.

---

## 9. Required Accounting States

At minimum, Accounting Director should support:

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

These states should make accounting control operational rather than abstract.

---

## 10. Required Shared Record

Accounting Director must operate from the same company truth used by the rest of AI-ABCX.

That record should preserve:

- related customer / job / transaction reference
- category assignment
- source-record status
- approval status
- pending-item status
- close-task status
- accounting risk note
- close-readiness state
- linked revenue / payment reference where relevant
- President-facing note

Accounting Director should never create a detached accounting truth layer.

---

## 11. Required Product Surfaces

Accounting Director should appear in the product through:

- President Dashboard finance summaries
- CFO lane views
- dedicated Accounting Director dashboard
- executive summary surfaces
- priorities, risks, and dependencies tabs
- close-review and pending-item surfaces

Current repo evidence is already strong enough to justify this build normalization.

Known repo evidence already exists in:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`

Important evidence already surfaced:

- `id: "accounting"`
- `role: "Accounting Director"`
- `askPrompt: "Accounting Director, where is month-close at risk?"`
- `action: "Close the pending confirmation and lock expense categorization before close."`
- executive summary says:
  - `Month-close, reconciliations, and categorization are visible here.`
- metrics already include:
  - `Close Checklist`
  - `Pending Items`
  - `Categorization`
  - `Reconciliations`
- priorities already include:
  - `Priority Items`
  - `Misclassified`
  - `Close Tasks`
  - `Checks`
- risks already include:
  - `Ambiguous Entries`
  - `Late Inputs`
  - `Close Delay`
  - `Audit Flags`
- dependencies already include:
  - `Source Records`
  - `Approvals Logged`
  - `Missing Notes`
  - `Policy Sync`

That means Accounting Director is already more than a theory. It is already a structured dashboard role that now needs full build normalization and testing.

---

## 12. Required Dashboard Visibility

At minimum, Accounting Director should expose:

- close checklist completion
- pending-item count
- categorization quality
- misclassified item count
- source-record integrity
- approvals logged
- ambiguous entry count
- close-readiness status

This should be readable in seconds by the President and CFO.

---

## 13. Required Handoffs

Accounting Director must hand off cleanly to and from:

- `Reconciliation Director`
- `Revenue Control Director`
- `Payroll Director`
- `Executive Reporting Director`
- `Strategy Director`
- `Service Director`

Examples:

- Accounting should surface unresolved close issues, and Reconciliation should verify whether those issues are fully corrected.
- Revenue Control should surface expected vs collected truth, and Accounting should preserve clean categorization and close discipline around that truth.
- Executive Reporting should not overstate finance clarity if Accounting still shows unresolved pending items or ambiguous entries.

---

## 14. Guided Activation Requirements

If Accounting Director is part of a recommended system configuration, guided activation should help determine:

- how the business currently closes the month
- whether accounting tasks are explicit or ad hoc
- whether categorization is consistent
- whether approvals and source notes are reliable
- whether close is delayed by missing confirmations
- whether owners trust that the books are orderly

This matters because customers rarely ask for "Accounting Director" directly.

They usually describe it as:

- "Month-close is messy."
- "We always have a few things left hanging."
- "I don't know if the books are really clean."
- "We lose time chasing down missing confirmations."
- "I want cleaner records before we scale."

The activation logic must translate those human complaints into the Accounting Director recommendation.

---

## 15. Pricing Decisions Still Required

Pricing is not finalized in this document.

Accounting Director pricing still depends on:

- whether it is sold mainly as part of a finance bundle
- whether it can be added independently in smaller businesses
- whether B / C levels require Reconciliation and Revenue Control together
- how deeply it is tied to month-close automation and executive reporting depth

This document only defines what must exist before pricing can be finalized.

---

## 16. Build Sequence

Recommended build sequence:

1. normalize the role definition
2. define A / B / C behavior cleanly
3. define close-task, categorization, and pending-item states
4. connect Accounting Director to Revenue Control and Reconciliation
5. formalize President / CFO-facing dashboard summaries
6. build pending-item and close-review surfaces
7. build approval-log and source-record integrity logic
8. test accounting-risk reporting
9. test cross-lane finance consistency
10. validate commercial clarity

This should be built as a finance-discipline operating lane, not as a generic bookkeeping page.

---

## 17. Internal Tests Required

Accounting Director should not be considered launch-ready until internal testing proves it can handle:

- a clean month-close
- a close with pending items
- a close with misclassified entries
- incomplete source records
- missing approvals
- ambiguous entries
- late inputs
- handoff into Reconciliation
- handoff into Executive Reporting

It also has to be tested for clarity:

- Can the President understand what still makes close unsafe?
- Can the CFO understand which items require attention immediately?
- Can the system distinguish a stable close from a merely visible close?

---

## 18. File / Surface Planning

Accounting Director will likely require, at minimum:

- a dedicated director spec
- launch dashboard content
- metrics configuration
- pending-item and close-state logic
- source-record and approval review surfaces
- recommendation and handoff rules

Possible future file targets may include:

- accounting dashboard HTML
- accounting config blocks
- President summary modules
- guided activation recommendation logic
- finance-state shared record definitions

Exact filenames can be decided later, but the role should no longer remain only embedded inside broader finance content.

---

## 19. Completion Gate

Accounting Director is complete only when:

- the role is clearly distinct from Reconciliation and Revenue Control
- month-close visibility is usable
- pending-item logic is operational
- categorization and source-record integrity are visible
- A / B / C levels behave clearly
- President and CFO views are understandable
- cross-lane finance truth remains consistent
- internal tests pass
- the director feels commercially understandable

If it is still only a set of tab labels without a fully defined operating lane, it is not complete.

---

## 20. Practical Conclusion

Accounting Director is one of the strongest finance directors already visible in the AI-ABCX repo.

The repo already tells us six useful things:

1. the role already exists as a real dashboard director
2. it already has a real ask-prompt
3. it already has a real President-facing action
4. it already has executive summary, priorities, risks, and dependencies tabs
5. it already defines live metrics around close, categorization, pending items, and reconciliations
6. it already behaves like a real CFO-lane control function

So the task now is not to guess what Accounting Director might be.

The task is to turn the existing dashboard evidence into a fully normalized launch-grade finance director that keeps month-close, accounting order, and record discipline under visible executive control.
