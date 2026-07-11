# AI-ABCX Sales Director Product Spec

This document defines the implementation-grade product specification for `Sales Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Sales Director is the final Wave 2 launch director because it converts visible demand into visible revenue outcomes and connects consults, estimates, follow-up, and conversion pressure into one President-visible operating lane.

---

## 1. Product Identity

### Public name

`Sales Director`

### Executive owner

`CRO`

### Mission

Sales Director receives sales-ready opportunities, preserves ownership clearly, controls consultation and estimate movement, structures outcomes, and keeps conversion pressure visible under President oversight.

### Core promise

Sales Director should not feel like a generic CRM list or loose opportunity board.

It should promise:

- clearer sales ownership
- faster movement from opportunity to decision
- structured consultation and estimate outcomes
- fewer dropped high-value opportunities
- better follow-up continuity after sales interactions
- stronger President visibility into conversion pressure

---

## 2. Strategic Role Inside AI-ABCX

Sales Director is the conversion lane of the system.

It manages the operating span between:

`sales-ready opportunity -> consult or quote movement -> result entry -> next-step ownership -> revenue outcome`

It is strategically important because:

- generated demand has no business value until it converts
- estimate-heavy businesses often lose opportunities between consult, quote, and decision
- sales ownership must stay visible without mixing unrelated operational noise
- conversion pressure needs its own executive lane under the CRO
- the President should see where revenue is stalling without manually reviewing every opportunity

Sales Director can be:

- a standalone revenue-conversion director
- part of a sales bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `ServiceTitan`
- `Housecall Pro`
- `Jobber`
- `HighLevel`
- `HubSpot`

### What they do well

- assigned opportunity visibility
- consultation tracking
- estimate continuity
- win/loss tracking
- personal ownership visibility
- next-step discipline

### What AI-ABCX must match

- visible sales assignments
- consult calendar control
- estimate and consult outcome entry
- win, loss, and follow-up clarity
- opportunity aging visibility
- personal and team sales ownership

### Where AI-ABCX should beat them

- the sales lane lives inside one President-led corporate structure
- one shared operating record survives from lead to estimate to follow-up to revenue truth
- Sales Director connects directly to Estimator, Call Handling, Lead Generation, Scheduling, Website, and Follow-Up
- opportunity history stays unified instead of split across CRM, calendar, and notes tools
- conversion pressure reports directly into the President Dashboard

---

## 4. Ideal Customer Fit

Sales Director is a strong fit for:

- estimate-driven service businesses
- companies with one or more salespeople or consult reps
- teams needing structured ownership across quotes and consultations
- businesses where high-value opportunities can age or disappear
- companies that want clearer revenue accountability

It is especially strong for:

- home services
- remodel and replacement businesses
- consultation-based services
- multi-offer estimate businesses
- teams trying to improve close rate and follow-through discipline

---

## 5. Required User Outcomes

Sales Director must let a business owner say:

- “I can see who owns each real sales opportunity.”
- “I know which consults are upcoming, completed, or stuck.”
- “I can tell which estimates are still pending.”
- “High-value opportunities do not disappear.”
- “Sales results are entered consistently.”
- “The President Dashboard shows conversion pressure clearly.”
- “Revenue ownership stays visible from opportunity to outcome.”

---

## 6. Functional Scope

Sales Director must cover eight major functions:

1. assigned opportunity visibility
2. consultation assignment and confirmation
3. estimate continuity
4. structured sales result entry
5. win/loss and pending-state visibility
6. next-step ownership
7. aging and value-pressure visibility
8. President-visible conversion pressure

---

## 7. Sales Categories

Sales Director should support category-aware conversion logic.

Launch-required categories:

- new lead consult
- estimate follow-up opportunity
- quote review
- on-site sales consult
- upsell or expansion opportunity
- reactivation sales opportunity

Each category should remain distinct so the system can recommend different next actions and bundles.

---

## 8. Required Sales States

Sales Director needs its own conversion states while still staying tied to the same shared record.

Launch-required states:

- `new_assignment`
- `awaiting_sales_confirmation`
- `customer_confirmation_pending`
- `consult_scheduled`
- `consult_completed`
- `estimate_given`
- `sold_not_completed`
- `sold_and_completed`
- `follow_up_needed`
- `not_sold`
- `rescheduled`
- `no_show`
- `president_attention_needed`

Each state must preserve:

- assigned salesperson
- opportunity identity
- consult timing
- estimate status
- customer response state
- next expected action
- expected value
- President-visible summary

---

## 9. Shared Job / Opportunity Record Requirement

Sales Director must operate on the same record used by the rest of AI-ABCX.

Required launch fields:

- opportunity source
- assigned salesperson
- confirmation timing
- consultation date and time
- estimate status
- sales outcome
- next-step owner
- follow-up requirement
- revenue expectation
- final revenue truth

Sales must never become a detached sales-only truth layer.

---

## 10. Product Surfaces

Sales Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Assigned Work Board

Purpose:

- show each salesperson’s active conversion workload
- preserve clear ownership

Required visibility:

- opportunity
- assigned rep
- urgency
- value
- current state
- next action

### Surface 2. Personal Calendar / Upcoming Consults

Purpose:

- make consultation timing visible and structured

Required visibility:

- scheduled consults
- confirmation state
- reschedules
- no-shows
- follow-up-needed consults

### Surface 3. Opportunity Detail / Result Entry

Purpose:

- record consult and estimate outcomes consistently

Required visibility:

- opportunity summary
- estimate status
- result entry controls
- notes
- next-step controls

### Surface 4. Sales Pressure View

Purpose:

- surface aging, stalled, and high-value opportunities

Required visibility:

- aging opportunities
- pending decisions
- high-value open items
- no-response items
- high-risk follow-up items

### Surface 5. President Dashboard Summary

Purpose:

- give the President a top-line reading of conversion health

Required visibility:

- open opportunities
- pending estimates
- high-value open items
- consult pressure
- recommended next action

---

## 11. Business Logic

Sales Director must apply clear conversion logic.

Core launch logic:

1. Every sales-ready opportunity must have visible ownership.
2. Consults must preserve confirmation truth, not just calendar placement.
3. An estimate given is not the same as a won opportunity.
4. Open opportunities must remain visible until they are won, lost, or intentionally closed.
5. Follow-up-needed outcomes must route into Follow-Up Director clearly.
6. High-value aging items must escalate visibility.
7. No-show and reschedule states must preserve conversion continuity instead of losing the opportunity.

---

## 12. Dependencies

Sales Director has meaningful dependencies, but it can still operate independently once opportunities exist.

### Can operate with:

- manual lead intake
- manual quote preparation
- manual consult scheduling
- standalone conversion tracking

### Strongest paired combinations:

- `Estimator Director + Sales Director`
- `Follow-Up Director + Sales Director`
- `Lead Generation Director + Sales Director`
- `Scheduling Director + Sales Director`
- `Call Handling Director + Sales Director`

### Strongest revenue bundle:

- `Lead Generation Director`
- `Call Handling Director`
- `Estimator Director`
- `Follow-Up Director`
- `Sales Director`

---

## 13. A / B / C Definition

### Level A

- assigned sales work visibility
- personal calendar visibility
- consultation confirmation flow
- structured result entry
- basic next-step ownership
- President visibility into open sales pressure

### Level B

- stronger routing and assignment handling
- better quote and consult continuity
- stronger follow-up coordination
- better opportunity prioritization
- stronger visibility into aging and value leakage

### Level C

- stronger recommendation logic
- deeper close-pressure visibility
- tighter multi-director coordination
- stronger automation around conversion paths and next-step handling
- richer President and CRO control surfaces

### Level X

- future autonomous revenue orchestration
- predictive conversion management
- self-improving close guidance
- deeper board-level accountability

---

## 14. Pricing Direction

Sales Director pricing should not be positioned as “CRM access.”

It should be positioned as:

- conversion ownership
- consult discipline
- estimate continuity
- revenue-pressure visibility
- President-visible close control

Commercially, Sales Director can be:

- a standalone revenue-control director
- part of a revenue bundle
- part of a full-system recommendation

Exact pricing can be finalized later inside the broader pricing architecture.

---

## 15. Diagnostic Recommendation Logic

Sales Director should be recommended when Step 1 or later qualification shows:

- the company provides estimates or consultations before a sale
- more than one person participates in selling
- opportunities can age or disappear
- quote follow-up is inconsistent
- high-value opportunities need more structure
- the owner wants clearer revenue visibility

It should be strongly recommended when the business says:

- “We lose track of open quotes.”
- “We need clearer ownership of sales opportunities.”
- “We want better control after the estimate is given.”
- “We want the owner to see where revenue is stuck.”

---

## 16. Recommended Diagnostic Questions

Sales Director qualification should include questions like:

1. Do you provide estimates, consultations, or proposals before a customer buys?
2. How many people currently handle sales conversations or quoting?
3. Do open quotes sometimes go quiet without a clear next step?
4. Is it important to know which salesperson owns each live opportunity?
5. Do you want stronger visibility into consult confirmations, no-shows, and reschedules?
6. Are high-value opportunities important enough to deserve more structured follow-through?
7. Do you want the President view to show real conversion pressure clearly?

---

## 17. Dashboard Requirements

Sales Director must provide clear dashboard behavior.

### Required launch blocks

- Open opportunities count
- Pending estimates count
- Upcoming consult count
- Aging opportunities count
- High-value open item count
- Won / lost summary

### Required launch drill-ins

- assigned opportunities
- upcoming consults
- completed consults needing action
- pending estimates
- aging and high-value items

### President-facing summary language must answer:

- What is still open?
- What is waiting on customer response?
- What high-value opportunities need attention?
- What sales pressure matters most right now?
- What action is recommended next?

---

## 18. Launch Test Scenarios

Sales Director is not launch-ready unless these scenarios work:

1. A sales-ready opportunity is assigned and appears clearly to the rep.
2. A consultation is scheduled and preserves confirmation truth.
3. A consult completes and routes into estimate-given or follow-up-needed outcome correctly.
4. A no-show remains visible and does not disappear.
5. A high-value open opportunity ages and escalates visibility.
6. A won opportunity routes toward downstream execution truth correctly.
7. A lost opportunity is closed without corrupting reporting.
8. Sales pressure appears correctly inside the President Dashboard summary.

---

## 19. Launch Exit Condition

Sales Director is launch-complete only when:

- assigned sales work is clearly visible
- consult and estimate states are structured
- follow-up-needed outcomes route cleanly
- high-value opportunities remain visible
- sales ownership stays clear
- President can see conversion pressure clearly
- A / B / C positioning is coherent
- standalone and bundled recommendation logic is credible

---

## 20. Build Priority

Sales Director is a `Wave 2` priority director.

It belongs immediately after:

- `Follow-Up Director`
- `Scheduling Director`
- `Dispatch Director`
- `Service Director`

because once AI-ABCX can capture, book, assign, and execute work, it must also show who is converting revenue, where deals are stalling, and what business action should happen next.

---

## 21. Final Product Statement

Sales Director is the AI-ABCX director that turns sales opportunities into visible, owned, structured conversion workflows.

It keeps consults, estimates, next actions, and outcomes connected inside one President-led operating system, so the company can see what revenue is moving, what is stuck, and what needs action next.
