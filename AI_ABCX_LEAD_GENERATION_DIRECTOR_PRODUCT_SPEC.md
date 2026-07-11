# AI-ABCX Lead Generation Director Product Spec

This document defines the implementation-grade product specification for `Lead Generation Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Lead Generation Director is the first Wave 3 launch director because it controls the quality of inbound demand before that demand enters the revenue lane and turns source visibility into President-visible business intelligence.

---

## 1. Product Identity

### Public name

`Lead Generation Director`

### Executive owner

`CRO`

### Mission

Lead Generation Director makes incoming demand visible by source, protects lead quality over raw lead volume, classifies inbound opportunities correctly at entry, and preserves clean routing into the rest of the AI-ABCX revenue system.

### Core promise

Lead Generation Director should not feel like a vague marketing summary or a generic list of inbound contacts.

It should promise:

- clearer visibility into where demand is coming from
- better understanding of which sources produce high-fit opportunities
- fewer weak or mismatched leads wasting time
- cleaner ownership and routing before revenue work begins
- faster movement on the best opportunities
- stronger President visibility into demand quality pressure

---

## 2. Strategic Role Inside AI-ABCX

Lead Generation Director is the demand-entry control lane of the system.

It manages the operating span between:

`incoming source activity -> lead classification -> quality judgment -> routing decision -> clean handoff into revenue work`

It is strategically important because:

- high lead volume without quality creates false growth
- businesses often mix calls, forms, ads, referrals, and repeat demand without real source discipline
- weak-fit, duplicate, or aging leads distort the entire revenue lane
- demand quality should be an operating issue, not only a marketing metric
- the President should see whether the company is attracting the right opportunities, not just more of them

Lead Generation Director can be:

- a standalone demand-control director
- part of a growth bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `HighLevel`
- `HubSpot`
- `ServiceTitan`
- `Housecall Pro`
- `CallRail`
- `Jobber`

### What they do well

- source attribution
- lead capture visibility
- routing ownership
- qualification awareness
- duplicate awareness
- response timing awareness
- source-level performance reporting

### What AI-ABCX must match

- visible incoming leads by source
- source attribution consistency
- ownership and routing clarity
- qualification visibility
- duplicate review logic
- response and aging visibility

### Where AI-ABCX should beat them

- demand quality lives inside one President-led corporate system
- source truth connects directly to Website, Advertising, Marketing, Call Handling, Sales, Estimator, Follow-Up, and Reactivation
- one opportunity record survives across the whole system instead of fragmenting between ad tools, forms, call logs, and CRM notes
- lead quality becomes visible as executive pressure, not just campaign reporting
- routing into downstream lanes is built into the operating model instead of bolted on

---

## 4. Ideal Customer Fit

Lead Generation Director is a strong fit for:

- companies receiving inbound demand from multiple channels
- businesses that want to improve lead quality, not just lead count
- companies with websites, ads, call traffic, or referral flow
- teams that want cleaner routing into sales or estimate workflows
- owner-led companies that do not trust their current lead pipeline quality

It is especially strong for:

- local service businesses
- ad-driven businesses
- estimate-heavy service companies
- website and phone-driven companies
- businesses trying to scale demand without drowning in weak-fit inquiries

---

## 5. Required User Outcomes

Lead Generation Director must let a business owner say:

- “I can see where each opportunity came from.”
- “I can tell the difference between volume and quality.”
- “Weak-fit and duplicate leads do not pollute the real queue.”
- “The best leads move faster.”
- “I know which source types are helping the business most.”
- “The President Dashboard shows demand quality clearly.”
- “Lead routing stays structured instead of random.”

---

## 6. Functional Scope

Lead Generation Director must cover eight major functions:

1. source-level lead visibility
2. source taxonomy and labeling
3. lead quality classification
4. duplicate awareness
5. routing and ownership control
6. lead aging and queue pressure visibility
7. source-to-outcome visibility
8. President-visible demand quality pressure

---

## 7. Lead Categories

Lead Generation Director must support category-aware demand logic.

Launch-required categories:

- ad lead
- website form lead
- inbound call lead
- referral lead
- reactivation lead
- direct outreach lead
- repeat customer lead

Each category should remain distinct so AI-ABCX can route and prioritize demand intelligently.

---

## 8. Required Lead States

Lead Generation Director needs its own demand-entry states while still staying tied to the same shared record.

Launch-required states:

- `new_lead`
- `awaiting_review`
- `qualified`
- `unqualified`
- `routed`
- `unrouted`
- `duplicate_review`
- `follow_up_needed`
- `in_sales_handoff`
- `lost`
- `president_attention_needed`

Each state must preserve:

- source channel
- source category
- lead type
- fit status
- assigned owner
- routing target
- time received
- time reviewed
- next expected action
- President-visible summary

---

## 9. Shared Opportunity Record Requirement

Lead Generation Director must operate on the same shared record used by the rest of AI-ABCX.

Required launch fields:

- source channel
- source category
- lead type
- fit score or fit class
- assigned owner
- routing target
- time received
- time reviewed
- next-step status
- handoff status
- follow-up requirement

Lead Generation Director should never create a detached source-only truth layer.

---

## 10. Product Surfaces

Lead Generation Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Lead Source Summary

Purpose:

- show incoming demand by source clearly
- give top-line visibility into demand mix

Required visibility:

- source breakdown
- lead volume
- lead quality mix
- routing status

### Surface 2. Open Lead Queue

Purpose:

- show what is new, waiting, or unrouted

Required visibility:

- lead
- source
- fit class
- owner
- current state
- age

### Surface 3. Lead Quality Summary

Purpose:

- distinguish quality from volume

Required visibility:

- qualified count
- unqualified count
- duplicate review count
- high-fit pressure
- weak-fit pressure

### Surface 4. Routing / Ownership View

Purpose:

- preserve clean handoff into revenue work

Required visibility:

- routing target
- assigned owner
- unrouted items
- stalled handoff items

### Surface 5. Source Performance Summary

Purpose:

- connect source activity to downstream business outcomes

Required visibility:

- source
- volume
- quality
- routed outcomes
- stalled outcomes

### Surface 6. President Dashboard Summary

Purpose:

- give the President a top-line reading of demand quality

Required visibility:

- total new demand
- qualified demand
- weak-fit pressure
- duplicate pressure
- unrouted pressure
- next recommended action

---

## 11. Business Logic

Lead Generation Director must apply clear demand-entry logic.

Core launch logic:

1. Every inbound opportunity must preserve visible source identity.
2. Lead quality is not the same thing as lead quantity.
3. Duplicate or unclear entries must not silently contaminate downstream queues.
4. High-fit opportunities should move faster than weak-fit ones.
5. Unrouted leads should remain visible as an operating failure, not hidden backlog.
6. Source-level reporting should connect to what happens after routing.
7. Demand quality pressure should surface to the President when weak-fit, duplicate, or stalled intake increases.

---

## 12. Dependencies

Lead Generation Director has meaningful dependencies, but it can still operate independently once sources exist.

### Can operate with:

- manual form intake
- manual phone intake
- manual source tagging
- standalone routing review

### Strongest paired combinations:

- `Website Director + Lead Generation Director`
- `Advertising Director + Lead Generation Director`
- `Marketing Director + Lead Generation Director`
- `Call Handling Director + Lead Generation Director`
- `Sales Director + Lead Generation Director`
- `Estimator Director + Lead Generation Director`

### Strongest growth bundle:

- `Website Director`
- `Advertising Director`
- `Marketing Director`
- `Lead Generation Director`
- `Sales Director`
- `Follow-Up Director`

---

## 13. A / B / C Definition

### Level A

- visible lead source labeling
- lead capture visibility
- basic fit logic
- clear ownership and routing states
- high-fit vs low-fit awareness
- President visibility into demand quality pressure

### Level B

- stronger qualification handling
- better source comparison
- better queue and response visibility
- stronger coordination with Sales and Follow-Up
- better visibility into where leads stall or weaken

### Level C

- deeper source-level prioritization
- tighter autonomous routing logic
- stronger opportunity ranking
- deeper coordination with Advertising and Website optimization
- richer President and CRO visibility into demand mix and quality drift

### Level X

- future autonomous demand governance
- self-improving source prioritization
- predictive quality control
- deeper board-level acquisition accountability

---

## 14. Pricing Direction

Lead Generation Director pricing should not be positioned as “lead reporting.”

It should be positioned as:

- source-quality control
- clean inbound routing
- demand efficiency
- higher-fit opportunity protection
- President-visible growth intelligence

Commercially, Lead Generation Director can be:

- a standalone demand-control director
- part of a growth bundle
- part of a full-system recommendation

Exact pricing can be finalized later inside the broader pricing architecture.

---

## 15. Diagnostic Recommendation Logic

Lead Generation Director should be recommended when Step 1 or later qualification shows:

- the company receives leads from more than one source
- the business struggles to see which channels actually matter
- weak-fit leads waste time
- routing from intake to sales is inconsistent
- website, ads, or calls need cleaner handoff logic
- the owner wants better visibility into source quality

It should be strongly recommended when the business says:

- “We get leads, but not all of them are good.”
- “We do not always know where the best opportunities come from.”
- “Leads sometimes sit too long before someone takes action.”
- “We want a clearer picture of demand quality, not just lead count.”

---

## 16. Recommended Diagnostic Questions

Lead Generation Director qualification should include questions like:

1. Where do most of your new inquiries come from today?
2. Do you get leads from more than one source, like calls, website forms, ads, or referrals?
3. Do weak or low-quality inquiries sometimes waste your team’s time?
4. Is it important to know which sources bring the best leads, not just the most leads?
5. Do some inquiries sit too long before someone takes action?
6. Do you want the owner or President view to show which demand is strong and which is weak?
7. Are you trying to improve demand quality as part of your growth goals?

---

## 17. Dashboard Requirements

Lead Generation Director must provide clear dashboard behavior.

### Required launch blocks

- Total new leads
- Qualified leads
- Unqualified leads
- Duplicate review count
- Unrouted leads count
- High-fit lead count

### Required launch drill-ins

- by-source view
- open lead queue
- duplicate review items
- weak-fit items
- unrouted items
- routed-to-sales items

### President-facing summary language must answer:

- Where is new demand coming from?
- Which demand is high-fit?
- Which demand is weak or duplicated?
- What is not routed yet?
- What action is recommended next?

---

## 18. Launch Test Scenarios

Lead Generation Director is not launch-ready unless these scenarios work:

1. A website form lead enters with the correct source tag.
2. An ad-driven lead is captured and classified correctly.
3. An inbound call lead is routed into the correct downstream lane.
4. A duplicate lead is surfaced visibly for review.
5. A high-fit lead is routed faster than a weak-fit one.
6. An unrouted lead remains visible until ownership is assigned.
7. A lead handed to Sales preserves source and fit context.
8. Demand quality pressure appears correctly inside the President Dashboard summary.

---

## 19. Launch Exit Condition

Lead Generation Director is launch-complete only when:

- incoming demand is clearly visible by source
- lead quality is distinguishable from lead volume
- duplicate and weak-fit handling is visible
- routing stays structured
- source-to-outcome visibility exists
- President can see demand quality pressure clearly
- A / B / C positioning is coherent
- standalone and bundled recommendation logic is credible

---

## 20. Build Priority

Lead Generation Director is a `Wave 3` priority director.

It belongs first in Wave 3 because AI-ABCX cannot become a true growth system until it can show exactly where demand is coming from, what quality it has, and how it enters the revenue lane.

---

## 21. Final Product Statement

Lead Generation Director is the AI-ABCX director that turns incoming demand into visible, structured, qualified opportunity flow.

It keeps source identity, fit quality, routing, and demand pressure connected inside one President-led operating system, so the company can see which demand is worth acting on and what needs attention next.
