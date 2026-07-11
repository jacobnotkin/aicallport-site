# AI-ABCX Dispatch Director Build Checklist

This checklist turns Dispatch Director from a partial operational implementation into a launch-ready AI-ABCX director with a clear role, clear dependencies, and a practical build sequence.

## 1. Dispatch Director Mission

Dispatch Director controls live assignment movement after a job reaches the operational handoff stage.

Core mission:

- assign work to the right worker or crew
- control confirmation timing
- handle reroutes and reassignments
- manage same-day urgency pressure
- preserve live operational visibility
- surface assignment blockers before they become lost jobs
- keep the President informed without forcing the President to run every movement manually

Dispatch Director is not the same as Scheduling Director.

- Scheduling Director controls appointment truth
- Dispatch Director controls operational movement after scheduling truth exists

## 2. Dispatch Director Launch Standard

At launch, Dispatch Director must provide:

- a visible assignment queue
- clear worker assignment decisions
- reroute and reassignment control
- confirmation and escalation visibility
- support for sales, service, and combined worker roles
- operational handoff logic tied to the same job record
- clear A, B, and C level definitions

If Dispatch Director exists at launch, it cannot remain a vague "dispatcher dashboard" concept. It has to become a normalized director with a defined commercial role.

## 3. Canonical Role Definition

Public-facing name:

- `Dispatch Director`

Executive owner:

- `COO`

Internal role meaning:

- field assignment and live operational movement control

Canonical responsibility:

- once a job is ready for assignment or live movement, Dispatch Director controls who owns it, when they confirm it, whether it needs rerouting, and whether the day stays operationally clean

## 4. Commercial Promise

Dispatch Director should promise the customer:

- faster assignment movement
- fewer dropped operational handoffs
- better same-day job control
- less confusion about who is going where
- better visibility into worker ownership and movement
- cleaner escalation when something blocks the route

Simple customer-facing value:

- "Your scheduling truth stays clean, your assignments stay visible, and your field movement stays under control."

## 5. What AI-ABCX Must Match

Dispatch Director must match the practical expectations customers already have from operational field-service tools:

- assignment boards
- worker or crew ownership visibility
- reassignment logic
- same-day operational handling
- route and dispatch pressure visibility
- in-progress movement control
- closeout tracking

If it cannot do these things reliably, it is not launch-ready.

## 6. Where AI-ABCX Can Beat the Market

AI-ABCX can beat typical dispatch tools by making dispatch part of a connected corporate operating model instead of an isolated board.

Advantages:

- Dispatch is connected to Call Handling, Scheduling, Follow-Up, Field Execution, and Revenue Truth
- the President can still see operational movement from above
- the COO lane stays visible as an executive operating lane
- dispatch pressure becomes part of accountability, not just calendar shuffling
- the same job record survives from intake to completion

This is stronger than a standard dispatch board because it preserves one business narrative instead of breaking work into disconnected tools.

## 7. A / B / C Definition Draft

### Level A

Level A Dispatch Director is operational visibility with manual control.

Includes:

- assignment queue visibility
- manual assignment decisions
- manual reroute decisions
- assignment blocker visibility
- confirmation status visibility
- President and COO visibility into live movement

Best fit:

- smaller service teams
- lower route complexity
- companies where dispatch is still human-led but needs structure

### Level B

Level B Dispatch Director adds stronger operating control.

Includes everything in A, plus:

- worker confirmation logic
- reroute recommendations
- urgency prioritization
- stronger assignment state tracking
- cleaner sales/service/combined worker handling
- operational pressure awareness across the day

Best fit:

- companies with multiple active workers
- same-day movement pressure
- growing service operations needing operational discipline

### Level C

Level C Dispatch Director adds high-automation operating orchestration.

Includes everything in B, plus:

- advanced routing logic
- stronger prioritization automation
- live balancing of assignment pressure
- tighter accountability signals across movement states
- more autonomous operational recommendations

Best fit:

- multi-worker and multi-lane service operations
- higher urgency volume
- businesses trying to grow aggressively without losing operational control

## 8. Required Dispatch States

Dispatch Director needs its own operational states even when those states are connected to Scheduling Director.

Required states:

- `awaiting_dispatch_review`
- `awaiting_assignment`
- `awaiting_worker_confirmation`
- `assigned`
- `rerouted`
- `dispatch_blocked`
- `ready_for_departure`
- `in_progress`
- `closeout_pending`
- `completed`
- `follow_up_needed`

Important rule:

- these states must connect to the shared scheduling engine and shared job record
- they must not create a second truth model

## 9. Required Shared Job Record

Dispatch Director must operate on the same record used by the rest of AI-ABCX.

That record should preserve:

- intake source
- appointment truth
- assigned worker or crew
- route timing
- confirmation state
- customer notes
- blocker notes
- closeout status
- follow-up visibility
- final outcome and revenue truth

Dispatch cannot become a detached sub-system.

## 10. Required Product Surfaces

Launch surfaces should include:

- Assignment Queue
- Job Record Focus
- Assignment Decision Surface
- Routing Lanes
- Reassignment / Reroute controls
- Dispatch blocker visibility
- Operational pressure summary

## 11. Required Dashboard Visibility

Dispatch must be visible in the right places:

- President Dashboard
- Dispatcher Dashboard
- Field / Worker-facing surface
- Follow-Up visibility where the assignment outcome creates next action

The President should always be able to see:

- what is waiting
- what is assigned
- what is blocked
- what is in progress
- what needs reroute

## 12. Required Director Handoffs

Dispatch Director must hand off cleanly with:

### Scheduling Director

- receives appointment truth
- does not overwrite scheduling truth
- updates movement state after truth exists

### Call Handling Director

- receives urgent jobs and same-day pressure
- supports fast operational conversion from incoming demand to assignment review

### Follow-Up Director

- sends unresolved or incomplete jobs into follow-up control
- preserves visibility when movement did not produce closure

### Field / Service Execution

- controls who owns the live work
- updates in-progress and closeout visibility

### Revenue Control Director

- hands off completed or outcome-ready jobs into revenue truth

## 13. Guided Activation Requirements

To recommend Dispatch Director correctly, activation has to learn:

- whether the company dispatches multiple workers
- whether workers travel between jobs
- whether same-day urgency matters
- whether service areas are simple or wide
- whether dispatch is currently owner-led, office-led, or chaotic
- whether the company mixes sales visits and service visits
- whether workers confirm jobs manually today
- whether reroutes happen often

These answers should shape:

- whether Dispatch Director is recommended at all
- whether it should be A, B, or C
- whether it should be paired with Scheduling Director and Call Handling Director

## 14. Pricing Decisions Required

Pricing still needs explicit launch decisions for Dispatch Director.

Questions that must be finalized:

- can Dispatch Director be sold independently
- does it require Scheduling Director in some or all cases
- does same-day urgency increase the recommended level
- does service territory complexity affect level recommendation
- do worker count and team structure affect price

Likely launch rule:

- Dispatch Director is commercially stronger when paired with Scheduling Director
- but operationally it should still remain a distinct director

## 15. Build Sequence

### Phase 1: Role Normalization

- normalize "dispatcher" into canonical `Dispatch Director`
- update copy and naming across launch documents

### Phase 2: State Normalization

- define dispatch states clearly
- connect dispatch states to the shared job record
- connect dispatch logic to the scheduling engine

### Phase 3: Surface Normalization

- normalize assignment queue
- normalize decision controls
- normalize reroute and blocker surfaces

### Phase 4: Handoff Integration

- enforce clean handoff rules with Scheduling, Call Handling, Follow-Up, and Field Execution

### Phase 5: Activation and Pricing Logic

- define when Dispatch Director appears in recommended configurations
- define A/B/C recommendation logic
- define dependency logic

### Phase 6: Test Pack

- run real operational test scenarios across all levels

## 16. Internal Test Scenarios

Dispatch Director is not complete until it survives practical tests.

Required scenarios:

1. urgent same-day service request enters queue and gets assigned correctly
2. assigned worker fails to confirm and the job is rerouted cleanly
3. mixed sales and service team uses the same queue without state confusion
4. dispatch blocker appears because access or timing is unclear
5. worker completes visit but closeout is still pending
6. job needs follow-up after field visit and remains visible to leadership
7. multiple same-day jobs compete for limited operational capacity

## 17. File Planning

Dispatch Director should anchor to these files first:

- `/Users/yakovnotkin/Documents/New project/dispatcher-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-dispatcher-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_SCHEDULING_ENGINE_SPEC.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_SCHEDULING_STATE_MACHINE.md`
- `/Users/yakovnotkin/Documents/New project/field-dashboard.html`

It should also stay aligned with:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_CANONICAL_LAUNCH_DIRECTOR_MAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md`

## 18. Completion Gate

Dispatch Director is launch-ready only when all of the following are true:

- role is canonically named and documented
- A, B, and C are defined
- dispatch states are normalized
- same job record is preserved
- assignment, confirmation, reroute, and blocker logic all exist
- dashboard visibility is complete
- activation logic can recommend it correctly
- pricing logic is decided
- internal test scenarios pass

## 19. Practical Conclusion

Dispatch Director should launch as a real operational control layer, not just a dispatcher-themed screen.

If Scheduling Director protects appointment truth, Dispatch Director must protect assignment movement truth.

That distinction is important because it makes AI-ABCX more professional, more modular, and easier to sell correctly.
