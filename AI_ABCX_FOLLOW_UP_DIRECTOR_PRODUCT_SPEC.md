# AI-ABCX Follow-Up Director Product Spec

This document defines the implementation-grade product specification for `Follow-Up Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Follow-Up Director is one of the first Wave 2 launch directors because it protects unresolved value across the system and keeps missed next steps from disappearing after the first customer interaction.

---

## 1. Product Identity

### Public name

`Follow-Up Director`

### Executive owner

`CRO`

### Mission

Follow-Up Director preserves continuity after inquiry, quote, scheduling, service activity, and payment-related events by keeping unresolved next steps visible, owned, and actionable under President oversight.

### Core promise

Follow-Up Director should not feel like a basic reminder app.

It should promise:

- fewer lost opportunities
- visible unresolved pressure
- stronger next-step discipline
- clearer ownership of pending actions
- better continuity after estimates, bookings, and service activity
- President-level visibility into what still needs to happen

---

## 2. Strategic Role Inside AI-ABCX

Follow-Up Director is the system's continuity lane.

It controls what happens after something important has started but not finished:

`inquiry -> quote -> waiting -> reminder -> action -> resolution`

It is strategically important because:

- many businesses do not lose revenue on first contact, they lose it in weak follow-up
- unresolved estimates, callbacks, confirmations, and payment issues create silent leakage
- follow-up connects revenue, operations, scheduling, and service outcomes
- the President must be able to see not only new activity, but unfinished activity

Follow-Up Director can be:

- a standalone recovery-focused director
- part of a revenue-focused bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `GoHighLevel`
- `HubSpot`
- `ServiceTitan`
- `Jobber`
- `Housecall Pro`

### What they do well

- reminder logic
- pipeline continuity
- customer nurture sequences
- task visibility
- estimate and booking follow-up

### What AI-ABCX must match

- unresolved opportunity visibility
- estimate follow-up tracking
- scheduling follow-up tracking
- reminder sequencing
- ownership visibility
- escalation handling

### Where AI-ABCX should beat them

- follow-up categories are separated by business reality, not only CRM stage
- President sees follow-up pressure directly
- follow-up can coordinate with Estimator, Call Handling, Scheduling, Sales, Service, and Revenue Control
- unresolved business promises stay visible until resolved, lost, or escalated
- follow-up becomes a corporate operating lane, not just background automation

---

## 4. Ideal Customer Fit

Follow-Up Director is a strong fit for:

- companies losing estimates after they are sent
- businesses where callbacks are inconsistent
- service teams that miss confirmation or post-service next steps
- owner-led companies where unresolved items live in memory instead of a system
- businesses with multiple leads, jobs, and people creating continuity gaps

It is especially strong for:

- estimate-driven services
- appointment-based services
- service businesses with repeat-client follow-up needs
- teams where several people touch one customer before resolution

---

## 5. Required User Outcomes

Follow-Up Director must let a business owner say:

- “I can see what is still open.”
- “I know why it is still open.”
- “I know who owns the next step.”
- “I know which unresolved items are most urgent.”
- “I can see the difference between estimate, scheduling, service, and payment follow-up.”
- “Nothing important disappears after first contact.”
- “The President Dashboard shows unfinished business clearly.”

---

## 6. Functional Scope

Follow-Up Director must cover seven major functions:

1. unresolved-item creation
2. category-aware follow-up tracking
3. next-step ownership
4. reminder logic
5. escalation logic
6. timeline continuity
7. President-visible unresolved pressure

---

## 7. Follow-Up Categories

Follow-Up Director must preserve category-aware continuity.

Launch-required categories:

- estimate follow-up
- scheduling follow-up
- service-result follow-up
- payment / revenue-truth follow-up
- customer-response-needed follow-up
- internal-owner-needed follow-up

Optional later categories:

- retention follow-up
- review / referral follow-up
- complaint resolution follow-up
- reactivation follow-up

Each category must remain distinguishable in views, reporting, and recommendation logic.

---

## 8. Follow-Up States

Minimum required states:

- `new_follow_up`
- `pending_customer_response`
- `pending_internal_action`
- `scheduled_follow_up`
- `overdue`
- `escalated`
- `resolved`
- `lost`
- `president_attention_needed`

Each state must preserve:

- source record
- category
- current owner
- next expected action
- due date or timing expectation
- President-visible summary

---

## 9. Product Surfaces

Follow-Up Director must not launch as hidden automation only.

It needs visible product surfaces.

### Surface 1. Follow-Up Queue View

Purpose:

- show unresolved pressure
- separate items by category and urgency
- help the President or operator see what still needs attention

Required visibility:

- category
- status
- age
- urgency
- current owner
- next action

### Surface 2. Follow-Up Record View

Purpose:

- show one unresolved item in full context
- preserve why the item still exists
- make the next action obvious

Required visibility:

- linked customer or job
- linked source record
- follow-up category
- state
- required next step
- last activity
- due or overdue status

### Surface 3. Follow-Up Timeline

Purpose:

- preserve sequence truth
- show what already happened
- prevent repeated confusion or duplicate effort

Required visibility:

- created time
- last outreach
- last internal action
- last customer response
- escalation events
- resolution event

### Surface 4. Guidance / Recommendation Surface

Purpose:

- convert passive tracking into active management
- tell the user what should happen next

Required visibility:

- why the item matters
- what risk exists if ignored
- recommended next action
- recommended escalation path where needed

---

## 10. Business Logic

Follow-Up Director must create and preserve unresolved items when:

- an estimate is sent and no decision is received
- an estimate revision is requested
- a callback is required
- a scheduling confirmation is still missing
- an appointment result still needs recording
- a payment or revenue-truth action remains incomplete
- an internal commitment has not been completed

### Core business rules

#### 1. Follow-up must be source-aware

Every follow-up item must know what created it:

- estimate
- call
- schedule
- service event
- payment event
- manual creation

#### 2. Follow-up must be category-aware

The system must not flatten every unresolved item into one generic reminder.

#### 3. Follow-up must be owner-aware

Each item must have a visible owner:

- President
- executive lane
- director lane
- team user
- customer waiting state

#### 4. Follow-up must be urgency-aware

Items should be classifiable as:

- low
- medium
- high
- president attention

#### 5. Follow-up must close cleanly

Items must move into:

- resolved
- lost
- escalated

They should not remain invisible or stale forever.

---

## 11. Dependencies

Follow-Up Director is highly connected and should be treated as a system glue director.

### Can work independently

Yes, in a limited continuity role, especially for:

- manual callback discipline
- unresolved estimate reminders
- manual next-step visibility

### Works much better with

- `Estimator Director`
- `Call Handling Director`
- `Scheduling Director`
- `Sales Director`
- `Service Director`
- `Revenue Control Director`
- `Retention Director`

### Strongest launch combinations

- `Estimator + Follow-Up`
- `Call Handling + Follow-Up`
- `Scheduling + Follow-Up`
- `Estimator + Scheduling + Follow-Up`
- `Call Handling + Estimator + Follow-Up`
- `Full Revenue Lane`

---

## 12. A / B / C Definition

### Level A

- visible follow-up queue
- manual or semi-assisted reminder support
- unresolved estimate and scheduling follow-up visibility
- basic owner assignment
- President can see open unresolved items

### Level B

- structured reminder logic
- branching by category
- stronger ownership control
- better escalation handling
- stronger continuity across estimate, schedule, and service-result states

### Level C

- multi-lane follow-up orchestration
- deeper automated sequencing
- stronger overdue and exception handling
- executive accountability visibility
- stronger coordination across revenue, service, and retention lanes

---

## 13. Pricing Direction

Follow-Up Director should be priced as a value-protection and continuity director, not as a simple reminder widget.

### Pricing logic

- `A` = core continuity visibility
- `B` = structured reminder and escalation depth
- `C` = stronger orchestration and accountability depth

Its pricing should feel justified by:

- recovered lost opportunities
- fewer forgotten callbacks
- cleaner estimate conversion
- better unresolved-value discipline

It should upsell naturally when combined with Estimator, Scheduling, or Call Handling.

---

## 14. Diagnostic Recommendation Logic

Follow-Up Director should be recommended when:

- the owner says leads often go cold
- estimates are sent but not followed consistently
- callbacks are frequently forgotten
- several team members touch the same customer
- appointments or next steps often remain unclear
- payment or service outcomes are not consistently recorded

### Strong recommendation triggers

- high quote volume
- multi-step customer journey
- multiple staff handling customer contact
- owner complaint about dropped balls or weak discipline

---

## 15. Recommended Diagnostic Questions

Useful Step 1 diagnostic questions for Follow-Up Director:

- “Do leads or estimates ever disappear without a clear next step?”
- “How do you currently remember who still needs a callback?”
- “Who follows up when a customer does not answer?”
- “Do you often lose track of unresolved appointments, quotes, or promises?”
- “Do different people in the company handle different stages of the same customer?”
- “Would you like the system to show overdue next steps automatically?”

---

## 16. Dashboard Requirements

The President Dashboard should show:

- total open follow-up count
- overdue follow-up count
- follow-up pressure by category
- highest-risk unresolved items
- items needing President attention

The Follow-Up Director view should show:

- queue by urgency
- queue by category
- queue by owner
- items resolved today
- unresolved aging

---

## 17. Launch Test Scenarios

Follow-Up Director is not launch-ready until these scenarios work:

1. estimate sent, no response, follow-up item created and visible
2. callback required after call, item assigned and tracked
3. scheduling confirmation missing, unresolved state preserved
4. service-result follow-up still pending after appointment
5. overdue item escalates visibly
6. item resolves cleanly with timeline preserved
7. President can see unresolved pressure without opening every record
8. category separation remains clear across all surfaces

---

## 18. Launch Exit Condition

Follow-Up Director is launch-ready when:

- unresolved items are created consistently
- categories are distinct
- queue and record views are usable
- owner and next-step logic are visible
- overdue and escalation logic work credibly
- President can see unfinished business clearly
- the director feels like a continuity operating lane, not a generic reminder tool

---

## 19. Build Priority

Follow-Up Director should remain a top Wave 2 build priority because it multiplies the value of Estimator, Call Handling, and Scheduling.

Without it:

- unresolved value leaks
- workflows stop after first action
- the system loses corporate discipline

With it:

- AI-ABCX starts behaving like a real managed operating structure

---

## 20. Final Product Statement

Follow-Up Director is the AI-ABCX continuity and accountability lane that keeps unresolved estimates, callbacks, appointments, service outcomes, and revenue actions visible until they are resolved, lost, or escalated under President control.
