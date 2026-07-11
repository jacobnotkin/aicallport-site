# AI-ABCX Scheduling Director Build Checklist

This document turns the Scheduling Director from a strongly defined concept and partial implementation into a practical launch build sequence.

Its purpose is to answer one direct execution question:

`What exactly has to be built, normalized, and tested for Scheduling Director to become a real AI-ABCX launch director?`

This is a build-level document.

It sits below:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_MASTER_LAUNCH_ROADMAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_TIER_1_BUILD_PLAN.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_PHASE_1_EXECUTION_CHECKLIST.md`

---

## 1. Scheduling Director Mission

Scheduling Director is the appointment control and scheduling-truth lane of AI-ABCX.

Its job is to:

- turn inbound demand into visible appointment records
- preserve one clean scheduling truth for the President
- support manual scheduling at Stage A
- support automated scheduling at higher levels
- distinguish sales scheduling from service scheduling
- support worker assignment, reroute, confirmation, and reschedule logic where automation is active
- keep scheduling pressure visible before it becomes operational chaos
- coordinate with call handling, estimating, follow-up, field execution, and revenue truth

It should not behave like a basic calendar widget.

It should behave like a corporate scheduling control lane under President visibility.

---

## 2. Scheduling Director Launch Standard

Scheduling Director is launch-ready only when it can do all of the following:

1. support a clearly defined Stage A manual scheduling model
2. support a clearly defined higher-level automated scheduling model
3. distinguish sales appointments, service appointments, and combined workflows
4. preserve one scheduling record from intake to outcome
5. surface scheduling state visibly to the President
6. support confirmation, reschedule, no-show, and follow-up-needed logic
7. integrate credibly with call handling, follow-up, field execution, and revenue reporting
8. support A / B / C level definitions clearly

If one of those is missing, the director is not complete.

---

## 3. Canonical Role Definition

## Public-facing name

`Scheduling Director`

## Internal role meaning

The AI-ABCX director responsible for appointment creation, scheduling truth, confirmation logic, assignment flow, reschedule control, and scheduling-state visibility.

## Executive owner

`COO`

Scheduling Director belongs to the operations lane because it controls when promised work actually enters operational reality.

It also acts as one of the strongest bridge directors in the system because it connects intake, estimating, field execution, and revenue truth.

---

## 4. Commercial Promise

Scheduling Director should promise this:

- cleaner appointment control
- fewer lost or confused bookings
- better visibility into what is provisional, confirmed, rescheduled, completed, or broken
- stronger operating discipline
- better handoff between front-end demand and actual execution
- clearer next-step ownership for the President

Scheduling Director should not promise only “online booking.”

It should promise:

- scheduling truth
- control
- visibility
- continuity
- operational discipline

---

## 5. What AI-ABCX Must Match

Based on Calendly, Jobber, Housecall Pro, ServiceTitan, GoHighLevel booking flows, and dispatch-first field software, Scheduling Director must match the market on:

- appointment creation
- calendar / scheduling visibility
- reschedule handling
- confirmation handling
- no-show visibility
- service vs sales appointment distinction
- basic customer-facing booking clarity

At minimum, AI-ABCX must not feel weaker than modern service-business scheduling products in keeping appointments visible and controlled.

---

## 6. Where AI-ABCX Can Beat the Market

Scheduling Director can beat outside tools in these areas:

- it treats scheduling as part of one corporate operating system instead of a standalone calendar
- it preserves President-level truth in Stage A instead of forcing fake automation before the company is ready
- it supports multiple operational realities:
  - sales-only appointments
  - service-only appointments
  - sales-first then service
  - one worker doing both
- it connects directly to Call Handling Director, Estimator Director, Follow-Up Director, Dispatch Director, and field outcome reporting
- it can explain why manual scheduling is still recommended or why automation should be activated next
- it keeps one job record alive across stages instead of splitting the workflow across disconnected systems

This is the core differentiation.

AI-ABCX is not only “a scheduler.”

It is a President-visible scheduling control lane.

---

## 7. A / B / C Definition Draft

This checklist assumes these working level definitions.

They can be refined later, but implementation should move around this structure.

### Level A

- President-visible manual scheduling truth
- provisional appointment capture
- manual confirmation logic
- reschedule visibility
- outcome and amount-paid tracking after the appointment
- no worker-dashboard dependency required

### Level B

- structured scheduling engine
- worker assignment logic
- worker confirmation timing
- reroute logic
- customer confirmation messaging
- stronger workflow-state handling

### Level C

- highest readiness for multi-worker, higher-volume, tighter-control scheduling
- stronger automation depth
- richer exception handling
- stronger scheduling accountability reporting
- stronger coordination across sales, service, and dispatch-style workloads

---

## 8. Required Scheduling Modes

Scheduling Director must support multiple real business modes.

Required launch modes:

- `no_scheduling_layer`
- `sales_scheduling`
- `service_scheduling`
- `sales_and_service_scheduling`
- `dispatch_style_scheduling`

These are already reflected in guided activation direction and should stay consistent across product, pricing, and recommendation logic.

---

## 9. Required Scheduling States

At minimum, Scheduling Director must support the following states.

### Stage A states

- `provisional`
- `awaiting_manual_confirmation`
- `confirmed`
- `rescheduled`
- `completed`
- `canceled`
- `no_show`
- `follow_up_needed`

### Higher-automation states

- `awaiting_worker_assignment`
- `awaiting_worker_confirmation`
- `rerouted`
- `awaiting_customer_confirmation`
- `in_progress`

These state rules should remain aligned with:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_SCHEDULING_ENGINE_SPEC.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_SCHEDULING_STATE_MACHINE.md`

---

## 10. Required Shared Job Record

Scheduling Director must not invent disconnected records.

The same appointment / job record should survive across stages.

Required launch fields:

- job number
- customer name
- phone
- appointment type
- requested / provisional time
- final confirmed time
- assigned representative name
- status
- outcome
- amount paid
- notes
- call transcript
- call recording reference

This is one of the most important structural requirements in the whole director stack.

---

## 11. Required Product Surfaces

Scheduling Director should not launch as hidden backend logic only.

It needs visible product surfaces.

### Surface 1: Scheduling Queue / Calendar Surface

Purpose:

- show provisional, confirmed, rescheduled, and broken appointments clearly
- let the President and operations lane see scheduling pressure in one place

Required visibility:

- appointment type
- current state
- assigned owner
- requested time
- confirmed time
- urgency

### Surface 2: Job / Appointment Record Surface

Purpose:

- preserve one scheduling truth for each appointment
- show what happened before and after confirmation

Required visibility:

- call source
- timeline
- state
- owner
- outcome
- amount paid

### Surface 3: Scheduling Recommendation Surface

Purpose:

- tell the President what needs attention now
- make the scheduling lane operational, not passive

Required visibility:

- manual confirmation needed
- reschedule pressure
- no-show pressure
- worker confirmation breakdown
- routing delay risk

### Surface 4: Activation / Configuration Surface

Purpose:

- let guided activation qualify the business correctly for scheduling depth
- explain why the company is being recommended for A, B, or C

Required visibility:

- current scheduling style
- who handles scheduling today
- whether service and sales share the same people
- whether dispatch-style control is needed

---

## 12. Required Dashboard Visibility

Scheduling Director should appear in at least these lanes:

### President Dashboard

Must show:

- scheduling pressure
- manual confirmations pending
- reschedules
- no-shows
- whether the company is still running manual truth or automated truth

### COO / Operations Surface

Must show:

- queue health
- assignment issues
- confirmation timing issues
- reschedule control

### Worker / Field Surface

Where applicable at higher levels, must show:

- assigned visit
- confirmation expectation
- outcome path after the visit

### Dispatch Surface

Where dispatch logic is active, must show:

- assignment board
- route / owner clarity
- urgent booking changes

Current implementation evidence already exists in:

- `/Users/yakovnotkin/Documents/New project/dispatcher-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-dispatcher-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/field-dashboard.html`

---

## 13. Required Director Handoffs

Scheduling Director is one of the strongest handoff hubs in AI-ABCX.

It must connect credibly to:

### Call Handling Director

Reason:

- many appointments begin from inbound call handling
- provisional appointments may be created there first

### Estimator Director

Reason:

- accepted estimates often move into scheduling
- estimate consultations may need scheduling before the quote itself

### Follow-Up Director

Reason:

- unresolved confirmations
- reschedules
- no-shows
- outcome gaps

all become follow-up pressure.

### Dispatch Director

Reason:

- dispatch is not the same as scheduling, but it sits directly on top of scheduling truth in many business types
- dispatch-style companies need controlled interaction between the two

### Field / Service Execution Surface

Reason:

- appointment execution must feed result truth back into the same record

### Revenue Control Director

Reason:

- amount paid and scheduling completion are not the same
- revenue truth must attach to the scheduling record

---

## 14. Guided Activation Requirements

Guided activation must collect enough information to qualify Scheduling Director properly.

Required questions include:

- does the business need no scheduling, sales scheduling, service scheduling, both, or dispatch-style scheduling
- who handles scheduling today
- does one person do sales and service or are those roles separate
- how many salespeople exist
- how many service people exist
- how many bookings happen in a typical week or month
- is scheduling mostly manual today
- is routing / assignment complexity already painful
- is the owner trying to keep manual truth for now or actively move toward automation

These requirements should stay aligned with existing guided activation evidence in:

- `/Users/yakovnotkin/Documents/New project/step1.html`
- `/Users/yakovnotkin/Documents/New project/guided-activation-preview.html`

---

## 15. Pricing Decisions Required

Before Scheduling Director is commercially final, these decisions must be fixed:

1. whether Scheduling Director can be sold truly standalone
2. whether it always requires at least one intake source:
   - Call Handling Director
   - Estimator Director
   - Website Director
   - manual President entry
3. whether dispatch-style scheduling is priced under Scheduling Director or as a deeper Dispatch Director path
4. whether A / B / C pricing changes based on:
   - team size
   - number of dashboard users
   - assignment complexity
   - automation depth
5. what role user-count pricing plays in higher scheduling levels

Current planning direction strongly suggests Scheduling Director can be commercially independent in some cases, but its value increases sharply when connected to other demand-entry directors.

---

## 16. Build Sequence

Recommended execution order:

### Phase 1: Normalize the role

- lock the canonical definition of Scheduling Director
- separate it clearly from Dispatch Director
- preserve the relationship between the two
- keep state vocabulary consistent everywhere

### Phase 2: Normalize the state model

- align live UI states with:
  - `AI_ABCX_SCHEDULING_ENGINE_SPEC.md`
  - `AI_ABCX_SCHEDULING_STATE_MACHINE.md`
- make sure Stage A and higher-automation states are not mixed incorrectly

### Phase 3: Normalize the appointment record

- ensure all scheduling views use the same core record model
- verify transcript, notes, outcome, and amount-paid fields stay attached

### Phase 4: Build / normalize visible surfaces

- President-facing scheduling truth
- operations / dispatcher view
- scheduling queue detail
- recommendation / next-step surfaces

### Phase 5: Connect handoffs

- call to schedule
- estimate to schedule
- schedule to follow-up
- schedule to field result
- schedule to revenue truth

### Phase 6: Activation and pricing logic

- qualify A / B / C paths
- define dependency logic
- define seat-count impact if applicable
- define whether dispatch-style businesses are upsold into stronger combinations

### Phase 7: Internal test pack

- run manual-truth tests
- run automated scheduling tests
- run failure / reroute / no-show tests

---

## 17. Internal Test Scenarios

Scheduling Director should not be treated as complete without scenario testing.

Minimum launch scenarios:

1. call creates provisional Stage A service appointment
2. President manually confirms time
3. appointment completes and amount paid is recorded
4. appointment is rescheduled after first confirmation
5. no-show becomes follow-up-needed
6. accepted estimate becomes scheduling record
7. higher-level assignment tries one worker, fails, reroutes to next
8. customer confirmation succeeds after worker confirmation
9. customer confirmation fails and the appointment remains visible
10. same worker handles both sales and service in one business model
11. sales-only appointment stays distinct from service-only appointment
12. dispatch-style company sees stronger coordination path without breaking scheduling truth

---

## 18. File Planning

Scheduling Director work should stay anchored to these files first:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_SCHEDULING_ENGINE_SPEC.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_SCHEDULING_STATE_MACHINE.md`
- `/Users/yakovnotkin/Documents/New project/dispatcher-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-dispatcher-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/field-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/step1.html`
- `/Users/yakovnotkin/Documents/New project/guided-activation-preview.html`

Additional files can be added later, but these are the first anchor files for turning Scheduling Director into a normalized launch product.

---

## 19. Completion Gate

Scheduling Director is complete for launch only when:

- the canonical role is fixed
- state logic is normalized
- one appointment record survives across stages
- Stage A manual scheduling works cleanly
- higher-level automated scheduling behavior is clearly specified and surfaced
- President visibility is strong
- handoffs to call, estimate, follow-up, dispatch, field, and revenue lanes are clear
- activation qualification is clear
- pricing and dependency logic are fixed
- internal scenario testing passes

If those conditions are not met, Scheduling Director should still be treated as partial.

---

## 20. Practical Conclusion

Scheduling Director is not a side feature.

It is one of the structural operating lanes of AI-ABCX.

It determines whether demand becomes real appointments, whether appointments stay clean, and whether the President can trust the business timeline.

If Call Handling Director captures the first moment and Follow-Up Director protects the unresolved next step, Scheduling Director protects the operational promise itself.

That makes it one of the most important launch directors in the entire system.
