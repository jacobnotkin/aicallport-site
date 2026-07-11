# AI-ABCX Sales Director Build Checklist

This document turns Sales Director from a partially implemented launch role into a normalized AI-ABCX launch director with a clear mission, clear dependencies, and a practical build sequence.

Its purpose is to answer one direct execution question:

`What exactly has to be built, normalized, and tested for Sales Director to become a real AI-ABCX launch director?`

This is a build-level document.

It sits below:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_MASTER_LAUNCH_ROADMAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_TIER_1_BUILD_PLAN.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_PHASE_1_EXECUTION_CHECKLIST.md`

---

## 1. Sales Director Mission

Sales Director is the conversion lane of AI-ABCX.

Its job is to:

- receive sales-ready opportunities
- control consultation and quote movement
- preserve sales ownership clearly
- keep estimate and appointment outcomes structured
- show which opportunities are high-value, aging, pending, won, or lost
- surface what action should happen next
- report conversion pressure directly to the President

Sales Director should not feel like a generic CRM contact list.

It should feel like a structured revenue-conversion operating lane under President control.

---

## 2. Sales Director Launch Standard

Sales Director is launch-ready only when it can do all of the following:

1. show assigned sales work clearly
2. preserve personal sales visibility without exposing unrelated team noise
3. support consultation assignment and confirmation logic
4. support structured estimate and consult outcomes
5. support sales-result states consistently
6. coordinate cleanly with Estimator Director, Follow-Up Director, and Lead Generation Director
7. surface high-value opportunity pressure visibly to the President
8. support A / B / C levels clearly

If one of these is missing, the director is not complete.

---

## 3. Canonical Role Definition

### Public-facing name

`Sales Director`

### Internal role meaning

The AI-ABCX director responsible for sales workflow control, assigned opportunity ownership, consult handling, conversion visibility, structured result entry, and next-step movement after a sales interaction.

### Executive owner

`CRO`

Sales Director belongs to the revenue lane because it converts demand into actual business value.

---

## 4. Commercial Promise

Sales Director should promise:

- clearer sales ownership
- faster movement from opportunity to decision
- structured consult and estimate outcomes
- fewer dropped high-value opportunities
- better follow-up continuity after sales interactions
- better President visibility into conversion pressure

The commercial promise is not merely:

- "You get a sales dashboard."

It is:

- "Your sales workflow becomes visible, structured, and accountable."

---

## 5. What AI-ABCX Must Match

Sales Director must match the practical market expectations customers already have from strong sales workflow tools:

- assigned opportunity visibility
- consult calendar control
- outcome entry
- win / loss / follow-up clarity
- estimate continuity
- personal and team sales ownership

At minimum, it must not feel weaker than a modern service-business sales board.

---

## 6. Where AI-ABCX Can Beat the Market

Sales Director can beat typical outside sales tools because:

- it lives inside one President-led corporate structure
- it shares the same job record from intake to estimate to follow-up to revenue truth
- it can coordinate directly with Estimator, Call Handling, Lead Generation, Scheduling, Website, and Follow-Up
- it can preserve one narrative of the opportunity instead of splitting it across CRM, scheduling, and notes tools
- it can report executive pressure directly to the President

This is stronger than a typical isolated pipeline tool because it keeps the revenue lane connected to the whole company model.

---

## 7. A / B / C Definition Draft

### Level A

Level A Sales Director is structured personal and assigned opportunity control.

Includes:

- assigned sales work visibility
- personal calendar visibility
- consultation confirmation flow
- structured result entry
- basic next-step ownership
- President visibility into open sales pressure

Best fit:

- small teams
- owner-led or one-salesperson companies
- businesses needing discipline more than deep automation

### Level B

Level B Sales Director adds stronger conversion control.

Includes everything in A, plus:

- stronger routing and assignment handling
- better quote / consult continuity
- stronger follow-up coordination
- better opportunity prioritization
- stronger visibility into aging and value leakage

Best fit:

- companies with multiple sales staff
- estimate-heavy businesses
- teams that need structured conversion management

### Level C

Level C Sales Director adds high-automation revenue orchestration.

Includes everything in B, plus:

- stronger recommendation logic
- deeper priority and close-pressure visibility
- tighter multi-director coordination
- stronger automation around conversion paths and next-step handling
- richer President and CRO control surfaces

Best fit:

- companies actively trying to scale sales volume
- higher-value consult businesses
- teams needing more autonomous conversion support

---

## 8. Required Sales Categories

Sales Director should support at least these launch categories:

- new lead consult
- estimate follow-up opportunity
- quote review
- on-site sales consult
- upsell / expansion opportunity
- reactivation sales opportunity

These categories should remain distinguishable so the system can recommend different next steps.

---

## 9. Required Sales States

At minimum, Sales Director should support:

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

These states already align well with the visible sales dashboard behavior and should be normalized rather than reinvented.

---

## 10. Required Shared Job Record

Sales Director must operate on the same record used by the rest of AI-ABCX.

That record should preserve:

- source of opportunity
- assigned salesperson
- confirmation timing
- consultation date and time
- estimate status
- sales outcome
- next-step owner
- follow-up requirement
- revenue expectation
- final revenue truth

Sales Director should never create a detached sales-only truth layer.

---

## 11. Required Product Surfaces

Sales Director should launch with visible surfaces, not just hidden workflow logic.

Required surfaces:

- Assigned Work Board
- Personal Calendar
- Upcoming Appointments
- Past Consultations
- Appointment Result Entry
- Sales pressure and outcome summary

These surfaces are already strongly implied by the existing sales dashboard and should be normalized into the canonical director product.

---

## 12. Required Dashboard Visibility

Sales Director must be visible in the right places:

- President Dashboard
- Sales Director dashboard
- CRO lane summaries
- Follow-Up visibility where a consult creates unresolved pressure

The President should always be able to see:

- high-value open opportunities
- consult volume
- pending outcomes
- aging quotes
- silent or stalled opportunities

---

## 13. Required Director Handoffs

Sales Director must hand off cleanly with:

### Lead Generation Director

- receives source-qualified opportunities
- preserves source context into conversion flow

### Estimator Director

- consumes quote and estimate outputs
- uses estimate results as the commercial decision layer

### Call Handling Director

- receives qualified inbound demand
- converts call outcomes into routed sales opportunities when appropriate

### Follow-Up Director

- hands off unresolved quote and consult outcomes
- returns silent, pending, or not-yet-closed opportunities into continuity control

### Scheduling Director

- shares consult timing truth where consults are appointment-based

### Revenue Control Director

- passes won business into revenue-truth visibility

---

## 14. Guided Activation Requirements

To recommend Sales Director correctly, activation should learn:

- whether the company sells by consult, estimate, or immediate booking
- whether multiple salespeople exist
- whether sales and service are separated or combined
- whether quotes are created manually today
- whether follow-up after estimates is weak
- whether high-value opportunities are aging or lost
- whether the owner currently manages the sales process manually

These answers should shape:

- whether Sales Director is recommended
- what level is recommended
- whether Estimator, Follow-Up, Lead Generation, and Scheduling should be bundled

---

## 15. Pricing Decisions Required

Pricing still needs explicit launch decisions for Sales Director.

Questions to finalize:

- can Sales Director be sold independently
- does it require CRM / shared operating record
- when does it require Estimator Director
- when does it require Follow-Up Director
- how should user count affect price
- should level recommendation change with team size and sales complexity

Likely launch rule:

- Sales Director can be commercially strong as a visible standalone revenue-control module
- but its best configurations likely include Estimator Director and Follow-Up Director

---

## 16. Build Sequence

### Phase 1: Role Normalization

- normalize Sales Director naming everywhere
- align dashboard copy, planning docs, and role registry

### Phase 2: State Normalization

- normalize sales states
- normalize assigned-work and result-entry logic
- connect sales states to shared job records

### Phase 3: Surface Normalization

- normalize assigned board
- normalize personal calendar view
- normalize upcoming / history / result-entry surfaces

### Phase 4: Handoff Integration

- enforce clean handoff rules with Lead Generation, Estimator, Call Handling, Scheduling, and Follow-Up

### Phase 5: Activation and Pricing Logic

- define A/B/C recommendation rules
- define user-count logic
- define bundle logic

### Phase 6: Test Pack

- run practical revenue-conversion scenarios across all levels

---

## 17. Internal Test Scenarios

Sales Director is not complete until it survives practical test flows.

Required scenarios:

1. inbound qualified lead becomes an assigned consult
2. salesperson fails to confirm and routing logic still preserves opportunity control
3. consult happens and result is entered as estimate given
4. consult happens and result is entered as sold not completed
5. consult happens and result is entered as follow-up needed
6. silent quote becomes a Follow-Up Director case
7. won sale passes into Revenue Control visibility
8. one salesperson sees only personal work, not the whole team board

---

## 18. File Planning

Sales Director should anchor first to:

- `/Users/yakovnotkin/Documents/New project/sales-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_CANONICAL_LAUNCH_DIRECTOR_MAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md`

It should also stay aligned with:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_FOLLOW_UP_DIRECTOR_BUILD_CHECKLIST.md`

---

## 19. Completion Gate

Sales Director is launch-ready only when all of the following are true:

- role is canonically named and documented
- A, B, and C are defined
- sales states are normalized
- personal and assigned visibility rules are clear
- result-entry logic is complete
- shared job record continuity is preserved
- handoffs with Estimator, Lead Generation, Follow-Up, and Revenue Control are defined
- activation logic can recommend it correctly
- pricing logic is decided
- internal test scenarios pass

---

## 20. Practical Conclusion

Sales Director should launch as a real conversion-control lane, not as a generic "sales dashboard" concept.

If Estimator Director captures the quote path, Sales Director must control who owns the opportunity, what happened during the consult, and what happens next.

That makes the CRO lane much stronger and keeps AI-ABCX closer to a real autonomous company structure instead of a disconnected software bundle.
