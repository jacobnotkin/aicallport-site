# AI-ABCX Revenue Control Director Product Spec

This document defines the implementation-grade product specification for `Revenue Control Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Revenue Control Director is one of the first Wave 4 launch directors because it gives the CFO lane a real money-truth anchor, separates expected revenue from confirmed revenue, and prevents the President from operating on assumption instead of collected business reality.

---

## 1. Product Identity

### Public name

`Revenue Control Director`

### Executive owner

`CFO`

### Mission

Revenue Control Director tracks expected revenue, confirmed revenue, revenue gaps, revision effects, and control status so the President can govern the company from real financial truth instead of wishful pipeline assumptions.

### Core promise

Revenue Control Director should not feel like a generic finance chart or abstract accounting dashboard.

It should promise:

- clearer money truth
- less confusion between quoted money and real money
- faster visibility into what is still unclosed
- better period control
- cleaner month-end understanding
- stronger financial confidence for the President
- better revenue decisions across the company

---

## 2. Strategic Role Inside AI-ABCX

Revenue Control Director is the expected-vs-actual revenue truth lane of the system.

It manages the operating span between:

`estimate expectation -> service and payment movement -> confirmed revenue truth -> revenue gap visibility -> period control -> President action`

It is strategically important because:

- businesses often operate mentally on quoted revenue instead of collected revenue
- revisions, partial collections, and unresolved payment truth create hidden financial distortion
- strong operations still need clear revenue truth to support decision-making
- month-end becomes unreliable if expected and confirmed money are blurred together
- the President needs to know what the company hoped to earn, what it actually earned, and what still needs to be closed

Revenue Control Director can be:

- part of the core financial-control layer
- part of a full-system recommendation
- a required money-truth layer whenever quoting, scheduling, service, and payments are active

It should not be positioned as a standalone bookkeeping product detached from the rest of business operations.

---

## 3. Benchmark Position

### Strongest outside benchmarks

- revenue-tracking systems
- collections-visibility tools
- finance-control dashboards
- job-cost and revenue-status systems
- executive revenue scorecards

### What they do well

- show forecast vs actual
- expose collection gaps
- summarize period performance
- surface revision impact
- help management understand money movement

### What AI-ABCX must match

- visible expected revenue
- visible confirmed revenue
- clear revenue-gap visibility
- understandable control status
- usable period summaries
- clarity around revisions and collection movement

### Where AI-ABCX should beat them

- revenue control reads the same shared operating truth as Estimator, Sales, Scheduling, Service, Follow-Up, and Reporting
- expected and confirmed money stay explicitly separated
- the system can identify revenue weakness before the period closes
- the President can move from money truth directly into corrective action
- CFO control is embedded inside the same operating system that creates, changes, and closes the work

---

## 4. Ideal Customer Fit

Revenue Control Director is a strong fit for:

- companies issuing quotes and needing cleaner financial truth
- businesses with revisions, partial payments, or delayed collections
- owners who feel revenue reporting is too optimistic or unclear
- teams where service delivery, scheduling, and payment confirmation are not perfectly aligned
- companies growing beyond simple owner memory

It is especially strong for:

- service businesses with active estimating
- companies where several jobs may be open at once
- businesses with different payment states across jobs
- companies that want cleaner executive reporting and strategy decisions tied to real money

---

## 5. Required User Outcomes

Revenue Control Director must let a business owner say:

- “I know what revenue is only expected and what revenue is actually real.”
- “I can see what still needs to be closed.”
- “I can tell when revisions changed the expected money picture.”
- “Month-end no longer feels vague.”
- “I can see money truth before small issues become a bigger reporting problem.”
- “The system shows me financial reality, not optimistic assumptions.”
- “I can make President-level decisions from trustworthy revenue visibility.”

---

## 6. Functional Scope

Revenue Control Director must cover eight major functions:

1. expected revenue visibility
2. confirmed revenue visibility
3. revenue-gap visibility
4. estimate truth vs payment truth separation
5. revision impact tracking
6. period control summaries
7. month-end attention logic
8. President-facing revenue-control guidance

---

## 7. Revenue Categories

Revenue Control Director must support category-aware money-truth logic.

Launch-required categories:

- expected revenue
- confirmed revenue
- revenue gap
- estimate truth
- payment truth
- revision impact
- month-end control

Each category should remain distinct inside the system and inside reporting surfaces.

---

## 8. Required Revenue States

Revenue Control Director needs its own financial-control states while still staying tied to the same shared company record.

Launch-required states:

- `expected_visible`
- `collected_visible`
- `gap_open`
- `gap_closing`
- `revenue_confirmed`
- `revision_pending`
- `payment_truth_missing`
- `month_end_attention_needed`
- `control_status_strong`
- `president_attention_needed`

Each state must preserve:

- expected amount
- confirmed amount
- gap amount
- revision condition
- payment confirmation condition
- revenue stage
- related job / customer / lane
- period status
- President-facing note

---

## 9. Shared Company Record Requirement

Revenue Control Director must operate on the same company truth used by the rest of AI-ABCX.

Required launch fields:

- estimate amount
- expected revenue amount
- collected revenue amount
- revenue gap amount
- payment confirmation state
- estimate revision state
- revenue stage
- related customer / job / lane
- month-end status
- President-facing note

Revenue Control must never create a detached money-truth subsystem with its own separate financial reality.

---

## 10. Product Surfaces

Revenue Control Director must not launch as hidden finance logic only.

It needs visible product surfaces.

### Surface 1. Executive Summary

Purpose:

- show the current company revenue truth in one short financial brief

Required visibility:

- expected revenue
- confirmed revenue
- open revenue gap
- strongest attention item
- next corrective action

### Surface 2. Priorities

Purpose:

- show which money-truth issues matter most right now

Required visibility:

- large unresolved gaps
- payment truth missing
- revision-heavy jobs
- open collection exposure

### Surface 3. Risks

Purpose:

- surface where revenue assumptions may be overstated or unstable

Required visibility:

- delayed confirmation
- revision distortion
- open collection risk
- unreliable month-end picture

### Surface 4. Dependencies

Purpose:

- show where financial truth depends on other lanes completing correctly

Required visibility:

- estimator dependency
- service completion dependency
- scheduling and outcome dependency
- reconciliation dependency
- reporting dependency

### Surface 5. Revenue Gap Summary

Purpose:

- give the President one visible score area for expected-vs-confirmed money truth

Required visibility:

- expected total
- confirmed total
- current gap
- gap trend
- strongest open gap lane

### Surface 6. Month-End Control Review

Purpose:

- create a structured close-control view before period-end ambiguity hardens

Required visibility:

- period close readiness
- unresolved revenue items
- revision drag
- missing confirmations
- President attention flag

---

## 11. Business Logic

Revenue Control Director must follow six launch logic rules:

1. expected revenue and confirmed revenue must never collapse into one number
2. revisions must visibly affect expected revenue truth
3. payment truth must be explicit, not implied
4. the open revenue gap must remain visible until truly closed
5. period control must work daily, not only at month-end
6. President-facing summaries must distinguish “money expected” from “money real”

Launch logic should distinguish between:

- quoted expectation
- revised expectation
- earned / confirmed truth
- partially confirmed truth
- unresolved gap
- period-ready closure

---

## 12. Dependencies

Revenue Control Director has broad cross-lane dependencies because money truth is produced by the rest of the operating system.

### Hard dependencies

- `Estimator Director`
- `Executive Reporting Director`
- `Reconciliation Director`

### Strong operational dependencies

- `Sales Director`
- `Scheduling Director`
- `Service Director`
- `Follow-Up Director`
- `Strategy Director`

### Optional but valuable dependencies

- `Accounting Director`
- `Payroll Director`
- `Approval Director`
- `Support Director`

Without these dependencies, Revenue Control Director can still exist conceptually, but it becomes weaker because fewer lanes are available to confirm what revenue actually became real.

---

## 13. A / B / C Definition

### Level A

Level A provides:

- expected revenue visibility
- confirmed revenue visibility
- revenue-gap visibility
- basic control status
- basic month-end awareness

### Level B

Level B adds:

- stronger revision visibility
- stronger revenue-stage discipline
- better linkage to reconciliation
- stronger collection-risk visibility
- better period-level control summaries

### Level C

Level C adds:

- stronger automated truth classification
- deeper revenue-gap analysis
- richer cross-lane connection to service and finance truth
- stronger exception handling
- stronger executive-level revenue-control guidance

---

## 14. Pricing Direction

Revenue Control Director should be priced as a financial-governance lane, not as a generic reporting add-on.

Pricing should reflect:

- amount of active revenue flow
- number of jobs / open financial records
- strength of control logic
- depth of cross-lane integration
- executive review depth

Commercially, it fits best:

- inside improved and advanced recommendations
- inside full-system executive-control configurations
- inside businesses where quoting and service volume make financial ambiguity costly

It should not be treated as a light cosmetic dashboard feature.

---

## 15. Diagnostic Recommendation Logic

The system should recommend Revenue Control Director more strongly when:

- the company has active estimates turning into completed jobs
- the owner wants stronger understanding of what the business actually earned
- revisions are common
- collections are not always immediate or simple
- the business wants better month-end clarity
- several people influence jobs, pricing, service completion, or payment status

The recommendation should become stronger as:

- job volume rises
- revenue complexity rises
- more directors activate
- the owner expresses concern about financial visibility, closing discipline, or money-truth confidence

---

## 16. Recommended Diagnostic Questions

Recommended Step 1 diagnostic questions for Revenue Control Director:

- “Do you always know how much quoted revenue has actually become real revenue?”
- “Do estimate changes or payment timing make your revenue picture harder to trust?”
- “Do you want the system to show expected money separately from confirmed money?”
- “Do you ever feel that month-end numbers become clear too late?”
- “Would stronger revenue visibility help you manage the business with more confidence?”
- “Do multiple people affect quoting, service completion, or payment collection?”
- “Do you want the President dashboard to show open revenue gaps clearly?”

---

## 17. Dashboard Requirements

Revenue Control Director must appear clearly inside the President-facing system.

Launch-required dashboard elements:

- expected revenue summary
- confirmed revenue summary
- revenue gap board
- revision impact board
- month-end control summary
- President financial attention board
- revenue truth briefing

The dashboard must answer:

- what revenue is expected
- what revenue is actually confirmed
- where the gap is
- what changed because of revisions
- what still needs closure
- whether the period is financially clean enough for confident decision-making

---

## 18. Launch Test Scenarios

Before launch, Revenue Control Director must pass at least these scenarios:

1. expected revenue tracking flow
2. confirmed revenue posting flow
3. gap-open to gap-closing flow
4. estimate revision impact flow
5. payment truth missing flow
6. month-end attention flow
7. President revenue-control briefing flow
8. cross-lane estimator-to-service-to-revenue truth flow

Each scenario must prove:

- expected and confirmed money remain separate
- gaps update correctly
- revisions affect the right values
- control summaries remain readable
- President attention is raised at the right time

---

## 19. Launch Exit Condition

Revenue Control Director is ready for launch when:

- expected revenue is visible and reliable
- confirmed revenue is visible and reliable
- open revenue gaps are clear
- payment truth does not remain ambiguous
- revision impact is visible
- month-end control view is trustworthy
- Executive Reporting and Strategy can rely on Revenue Control outputs without manual reinterpretation

---

## 20. Build Priority

Revenue Control Director is:

- `Wave 4`
- `Tier 3`
- `CFO-lane critical`

It should be built immediately after the CEO lane begins to stabilize, because:

- executive clarity needs money truth
- strategy needs real financial ground
- reconciliation and deeper finance branches depend on a clean revenue-control anchor

---

## 21. Final Product Statement

Revenue Control Director gives AI-ABCX a real money-truth spine.

It separates what the company expects to earn from what it has actually confirmed, keeps the revenue gap visible, tracks revision distortion, and helps the President make decisions from collected business reality instead of hopeful pipeline thinking.

Without Revenue Control Director, the system can show activity.

With it, the system can show whether the activity has actually become real money.
