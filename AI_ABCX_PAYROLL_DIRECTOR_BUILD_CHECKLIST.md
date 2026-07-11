# AI-ABCX Payroll Director Build Checklist

This document turns Payroll Director from a partially surfaced but still incomplete AI-ABCX role into a normalized launch director with a clear mission, clear dependencies, and a practical build sequence.

Its purpose is to answer one direct execution question:

`What exactly has to be built, normalized, and tested for Payroll Director to become a real AI-ABCX launch director?`

This is a build-level document.

It sits below:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_MASTER_LAUNCH_ROADMAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_TIER_1_BUILD_PLAN.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_PHASE_1_EXECUTION_CHECKLIST.md`

---

## 1. Payroll Director Mission

Payroll Director is the labor-cost timing and payroll-discipline lane of AI-ABCX.

Its job is to:

- keep payroll load visible
- monitor whether overtime is contributing to margin pressure
- track hiring timing against actual business needs
- preserve payroll approval discipline
- connect staffing cost to financial forecasting
- help the President see whether labor cost is healthy, early, and controlled
- keep payroll drift from silently becoming margin damage
- support cleaner labor-cost planning across the company

Payroll Director should not feel like a payroll processor screen.

It should feel like the AI-ABCX labor-cost control lane that tells the President whether staffing cost, overtime, and hiring timing are still aligned with the company’s real operating condition.

---

## 2. Payroll Director Launch Standard

Payroll Director is launch-ready only when it can do all of the following:

1. show payroll load clearly
2. show overtime visibility clearly
3. show hiring timing and staffing-fit pressure clearly
4. show payroll risk before cost drift becomes structural
5. connect payroll timing to forecasting and approvals
6. connect cleanly with Accounting, Revenue Control, Reconciliation, People, Performance, and Strategy
7. support ongoing labor-cost control and not only payroll processing
8. support A / B / C levels clearly

If one of these is missing, the director is not complete.

---

## 3. Canonical Role Definition

### Public-facing name

`Payroll Director`

The canonical map still groups this under `Accounting / Payroll Director`, but the live product evidence already exposes a real `Payroll Director` role, so this checklist normalizes payroll as its own practical director lane.

### Internal role meaning

The AI-ABCX director responsible for payroll load visibility, overtime control, hiring-timing discipline, staffing-fit review, and payroll-related margin protection.

### Executive owner

`CFO`

Payroll Director belongs to the CFO lane because labor cost and payroll timing are financial-control issues even when they depend on People, Performance, and operational staffing decisions.

---

## 4. Commercial Promise

Payroll Director should promise:

- clearer payroll cost visibility
- less hidden overtime drift
- better hiring timing discipline
- stronger labor-cost forecasting
- earlier warning when payroll begins pressuring margin
- more confidence that labor cost is still under control

The commercial promise is not merely:

- "You can see payroll numbers."

It is:

- "You know whether staffing cost is still healthy before payroll quietly starts eroding your margin."

---

## 5. What AI-ABCX Must Match

Payroll Director must match the practical expectations customers already have from strong labor-cost and payroll-control systems:

- visible payroll load
- visible overtime cost
- hiring timing awareness
- approval-log clarity
- staffing-load visibility
- payroll risk review
- forecast linkage

At minimum, it must not feel weaker than a serious labor-cost and payroll-visibility layer inside a mature service-business operating system.

---

## 6. Where AI-ABCX Can Beat the Market

Payroll Director can beat typical outside systems because:

- it can connect payroll cost to the same AI-ABCX operating structure producing staffing demand
- it can relate payroll pressure directly to growth timing, overtime pressure, scheduling load, and service execution reality
- it can show margin pressure before it appears as a late accounting surprise
- it can connect payroll review directly into President and CFO decision-making
- it can make labor-cost discipline part of a live executive-control system instead of a separate back-office payroll function

This is stronger than generic payroll tooling because it connects labor cost to real operational conditions, not just payroll processing outputs.

---

## 7. A / B / C Definition Draft

### Level A

Level A Payroll Director is visible payroll load and basic labor-cost control.

Includes:

- payroll load visibility
- overtime visibility
- hiring timing visibility
- staffing-load visibility
- basic payroll risk visibility

Best fit:

- owner-led service businesses
- smaller teams
- companies that need basic labor-cost control before adding deeper payroll intelligence

### Level B

Level B Payroll Director adds stronger labor-cost discipline and staffing-fit review.

Includes everything in A, plus:

- stronger overtime control logic
- better payroll timing visibility
- stronger forecast-fit review
- clearer hiring-hold / hiring-drift visibility
- deeper connection to Accounting and finance review

Best fit:

- growing companies
- businesses with multiple field or sales staff
- companies where payroll begins to materially affect margin discipline

### Level C

Level C Payroll Director adds advanced payroll intelligence and labor-efficiency control.

Includes everything in B, plus:

- stronger labor-efficiency analysis
- earlier cost-drift detection
- deeper hiring-timing intelligence
- stronger executive guidance around staffing-fit pressure
- more advanced payroll performance-control visibility

Best fit:

- larger or scaling service businesses
- companies with meaningful staffing complexity
- businesses needing executive-grade labor-cost control without building a large finance management layer

---

## 8. Required Payroll Categories

Payroll Director should support at least these launch categories:

- payroll load
- overtime
- hiring timing
- staffing load
- payroll variance
- approval integrity
- forecast fit
- labor-cost risk

These categories should remain distinct so the President can understand whether the payroll issue is cost, timing, hiring, approval discipline, or forecast misalignment.

---

## 9. Required Payroll States

At minimum, Payroll Director should support:

- `payroll_visible`
- `overtime_visible`
- `overtime_review_needed`
- `hiring_timing_pending`
- `staffing_load_controlled`
- `payroll_variance_low`
- `forecast_fit_healthy`
- `margin_pressure_visible`
- `approval_logs_clear`
- `president_attention_needed`

These states should make payroll governance operational rather than passive.

---

## 10. Required Shared Record

Payroll Director must operate from the same company truth used by the rest of AI-ABCX.

That record should preserve:

- employee / team reference
- payroll load by period
- overtime amount
- new-hire timing state
- staffing-load state
- approval-log state
- forecast-fit state
- expense-mapping state
- labor-cost variance note
- President-facing note

Payroll Director should never create a detached payroll truth layer.

---

## 11. Required Product Surfaces

Payroll Director should appear in the product through:

- President Dashboard finance summaries
- CFO lane views
- dedicated Payroll Director dashboard
- executive summary surfaces
- priorities, risks, and dependencies tabs
- labor-cost review and staffing-fit surfaces

Current repo evidence is already strong enough to justify this build normalization.

Known repo evidence already exists in:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_CANONICAL_LAUNCH_DIRECTOR_MAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`

Important evidence already surfaced:

- `payroll: { A: "Limited Active", B: "Active", C: "Advanced", activatesAt: "A" }`
- `id: "payroll"`
- `role: "Payroll Director"`
- `askPrompt: "Payroll Director, is payroll contributing to margin pressure?"`
- executive summary says:
  - `Payroll remains controlled, but it still affects margin sensitivity.`
- metrics already include:
  - `Payroll Load`
  - `Overtime`
  - `New-hire Timing`
  - `Staffing Load`
- priorities already include:
  - `Priority Review`
  - `Hiring Holds`
  - `Variance`
  - `Forecast Fit`
- risks already include:
  - `Overtime Risk`
  - `Approval Gaps`
  - `Hiring Drift`
  - `Compliance Flags`
- dependencies already include:
  - `HR Timing`
  - `Approval Logs`
  - `Forecast Sync`
  - `Expense Mapping`
- stage recommendations already say:
  - `Use Stage B payroll depth to tighten overtime timing and staffing-fit control.`
  - `Use Stage C payroll intelligence to pressure-test labor efficiency before cost drift appears.`
  - `Stage C turns payroll into a monitored performance-control lane.`

That means Payroll Director is already behaving like a real launch lane, even if its standalone workflows still need to be fully defined and tested.

---

## 12. Required Dashboard Visibility

At minimum, Payroll Director should expose:

- payroll load
- overtime amount and overtime risk
- hiring timing status
- staffing-load status
- variance level
- forecast-fit quality
- approval-log integrity
- payroll risk status

This should be readable in seconds by the President and CFO.

---

## 13. Required Handoffs

Payroll Director must hand off cleanly to and from:

- `Accounting Director`
- `Reconciliation Director`
- `Revenue Control Director`
- `People Director`
- `Performance Director`
- `Strategy Director`
- `Service Director`
- `Scheduling Director`

Examples:

- People and Performance should surface staffing and labor realities, and Payroll Director should show whether those realities are turning into cost drift.
- Accounting should preserve clean labor-cost records, and Payroll Director should surface whether the spend is healthy before month-close.
- Strategy should not recommend aggressive growth if Payroll Director is already showing staffing-fit or overtime pressure.

---

## 14. Guided Activation Requirements

If Payroll Director is part of a recommended system configuration, guided activation should help determine:

- how many people currently work in the business
- which roles they actually perform
- whether overtime is common
- whether staffing is stable or reactive
- whether hiring is planned or rushed
- whether owners understand their labor-cost pressure clearly
- whether margin problems are partly payroll-driven

This matters because customers rarely ask for "Payroll Director" directly.

They usually describe it as:

- "Payroll keeps creeping up."
- "We’re paying too much overtime."
- "I’m not sure when to hire."
- "We’re busy, but profit still feels tight."
- "I need to know whether labor cost is still healthy."

The activation logic must translate those human business complaints into the Payroll Director recommendation.

---

## 15. Pricing Decisions Still Required

Pricing is not finalized in this document.

Payroll Director pricing still depends on:

- whether it is sold mainly inside larger finance or staffing combinations
- whether it can be added independently for labor-cost visibility alone
- whether B / C levels require People, Performance, or Revenue Control together
- how strongly payroll intelligence is tied to multi-user and multi-staff environments

This document only defines what must exist before pricing can be finalized.

---

## 16. Build Sequence

Recommended build sequence:

1. normalize the role definition
2. define A / B / C behavior cleanly
3. define payroll load, overtime, and hiring-timing states
4. connect Payroll Director to Accounting, Reconciliation, and finance review
5. connect Payroll Director to People and Performance dependencies
6. formalize President / CFO-facing dashboard summaries
7. build labor-cost review and staffing-fit surfaces
8. test payroll-risk reporting
9. test cross-lane labor-cost truth consistency
10. validate commercial clarity

This should be built as a labor-cost control lane, not as a generic payroll administration screen.

---

## 17. Internal Tests Required

Payroll Director should not be considered launch-ready until internal testing proves it can handle:

- stable payroll with no overtime risk
- overtime beginning to pressure margin
- hiring timing delay
- hiring hold state
- forecast misalignment
- incomplete approval logs
- expense mapping mismatch
- labor-cost review before month-close
- handoff into Accounting and Reconciliation

It also has to be tested for clarity:

- Can the President understand whether payroll is still healthy?
- Can the CFO understand whether labor cost is becoming a margin problem?
- Can the system distinguish normal payroll load from payroll drift?

---

## 18. File / Surface Planning

Payroll Director will likely require, at minimum:

- a dedicated director spec
- launch dashboard content
- metrics configuration
- overtime, variance, and staffing-fit logic
- labor-cost review surfaces
- recommendation and handoff rules

Possible future file targets may include:

- payroll dashboard HTML
- payroll config blocks
- President summary modules
- guided activation recommendation logic
- labor-cost shared record definitions

Exact filenames can be decided later, but payroll should no longer remain only loosely grouped under broader finance language.

---

## 19. Completion Gate

Payroll Director is complete only when:

- the role is clearly distinct from Accounting and Reconciliation
- overtime and staffing-fit logic are operational
- payroll load visibility is usable
- A / B / C levels behave clearly
- President and CFO views are understandable
- cross-lane labor-cost truth remains consistent
- internal tests pass
- the director feels commercially understandable

If it is still only a finance-adjacent dashboard snippet, it is not complete.

---

## 20. Practical Conclusion

Payroll Director already has enough repo evidence to justify real build normalization.

The repo already tells us seven useful things:

1. the payroll lane already exists in live config
2. it already has A / B / C behavior
3. it already has a real director ID and role label
4. it already has a real ask-prompt
5. it already has real summary, priorities, risks, and dependencies tabs
6. it is already tied to margin sensitivity, overtime, and hiring timing
7. Stage C already treats it as a monitored performance-control lane

So the task now is not to decide whether Payroll Director should exist.

The task is to turn the existing dashboard evidence into a fully normalized launch-grade labor-cost control director that helps the President govern staffing cost, payroll timing, and margin pressure with real visibility.
