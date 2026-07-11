# AI-ABCX Dispatch Director Product Spec

This document defines the implementation-grade product specification for `Dispatch Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Dispatch Director is one of the first Wave 2 launch directors because it controls live assignment movement after scheduling truth already exists and turns booked work into visible operational execution.

---

## 1. Product Identity

### Public name

`Dispatch Director`

### Executive owner

`COO`

### Mission

Dispatch Director controls field assignment movement after a job reaches the operational handoff stage, keeps worker or crew ownership visible, manages reroutes and reassignments, and preserves live operational visibility under President oversight.

### Core promise

Dispatch Director should not feel like a generic dispatch board.

It should promise:

- faster assignment movement
- fewer dropped operational handoffs
- better same-day control
- clearer worker or crew ownership
- better reroute visibility
- stronger blocker awareness
- President-level visibility into operational movement without forcing the President to manually run every assignment

---

## 2. Strategic Role Inside AI-ABCX

Dispatch Director is the live movement lane of the system.

It manages the transition from:

`confirmed appointment -> assignment decision -> worker confirmation -> live work movement`

It is strategically important because:

- scheduling truth alone does not guarantee operational execution
- service businesses lose control where assignment, confirmation, reroute, and same-day pressure collide
- field movement needs its own logic separate from booking logic
- the President should see movement pressure without living inside dispatcher details

Dispatch Director can be:

- a standalone operational-control director
- part of a service-execution bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `ServiceTitan`
- `Housecall Pro`
- `Jobber`
- `FieldPulse`
- `Workiz`

### What they do well

- assignment boards
- technician ownership visibility
- reassignment handling
- route and dispatch awareness
- in-progress job control
- closeout tracking

### What AI-ABCX must match

- visible assignment queue
- worker or crew ownership visibility
- reassignment logic
- same-day pressure visibility
- route and movement-state tracking
- completion and closeout awareness

### Where AI-ABCX should beat them

- dispatch is part of one connected corporate operating model
- the same job record survives from intake to completion
- President can see operational movement from above
- dispatch pressure connects to Follow-Up, Scheduling, Service, and Revenue Truth
- the COO lane stays visible as an executive operating lane, not just a back-office board

---

## 4. Ideal Customer Fit

Dispatch Director is a strong fit for:

- companies assigning multiple workers or crews
- businesses with same-day service pressure
- companies where routing and reassignment happen often
- teams where office staff coordinate field movement
- service operations where assignment confusion causes delays, lost jobs, or poor customer experience

It is especially strong for:

- home services
- field service teams
- companies with traveling technicians
- mixed sales-and-service operations
- multi-worker local service businesses

---

## 5. Required User Outcomes

Dispatch Director must let a business owner say:

- “I can see who owns each live job.”
- “I can see what is waiting for assignment.”
- “I know what is blocked.”
- “I know when something needs reroute.”
- “I can tell what is already in progress.”
- “Field movement stays visible instead of turning into chaos.”
- “The President Dashboard shows operational pressure clearly.”

---

## 6. Functional Scope

Dispatch Director must cover eight major functions:

1. assignment queue control
2. worker or crew assignment
3. assignment confirmation tracking
4. reroute and reassignment logic
5. blocker visibility
6. in-progress movement tracking
7. closeout readiness visibility
8. President-visible operational pressure

---

## 7. Required Dispatch States

Dispatch Director needs its own operational states while still staying tied to the same shared job record.

Launch-required states:

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

Each state must preserve:

- current owner
- assigned worker or crew
- dispatch timing
- blocker notes
- current urgency
- next expected action
- President-visible summary

---

## 8. Shared Job Record Requirement

Dispatch Director must operate on the same record used by the rest of AI-ABCX.

Required launch fields:

- intake source
- appointment truth
- assigned worker or crew
- route timing
- confirmation state
- customer notes
- blocker notes
- movement status
- closeout status
- follow-up visibility
- final outcome
- revenue-truth readiness

Dispatch must never become a detached subsystem with its own separate business truth.

---

## 9. Product Surfaces

Dispatch Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Assignment Queue

Purpose:

- show what is waiting for dispatch review or assignment
- highlight live operational pressure

Required visibility:

- job
- appointment time
- urgency
- location
- current state
- assigned owner

### Surface 2. Assignment Decision Surface

Purpose:

- make assignment, reassignment, and reroute decisions visible and structured

Required visibility:

- recommended worker or crew
- current workload pressure
- assignment reason
- reroute option
- escalation option

### Surface 3. Routing Lanes / Movement View

Purpose:

- show operational movement across the day
- preserve live visibility for dispatcher and President

Required visibility:

- awaiting assignment
- assigned
- in progress
- blocked
- closeout pending

### Surface 4. Dispatch Blocker View

Purpose:

- surface operational issues before they become lost jobs

Required visibility:

- blocker type
- blocker age
- current owner
- recommended next action

### Surface 5. President Dispatch Summary

Purpose:

- let the President see field pressure from above
- preserve control without forcing micromanagement

Required visibility:

- jobs waiting
- jobs assigned
- jobs blocked
- jobs in progress
- jobs needing reroute

---

## 10. Business Logic

Dispatch Director must create movement truth when:

- a confirmed appointment becomes ready for assignment
- a worker must confirm job ownership
- a same-day urgent job enters the active queue
- a job must be rerouted or reassigned
- a job is in progress but blocked
- a completed job still needs closeout or follow-up

### Core business rules

#### 1. Dispatch starts after scheduling truth exists

Dispatch Director must not overwrite Scheduling Director.

Scheduling controls appointment truth.

Dispatch controls operational movement after appointment truth exists.

#### 2. Dispatch must preserve clear ownership

Every live job must have visible ownership:

- unassigned
- awaiting worker confirmation
- assigned to worker
- reassigned
- escalated

#### 3. Dispatch must support different worker realities

The system must support:

- service-only workers
- sales-only workers
- combined sales-and-service workers
- crews where more than one person owns execution

#### 4. Dispatch must preserve blocker truth

If a job cannot move cleanly, the blocker must remain visible:

- unavailable worker
- timing conflict
- route conflict
- customer issue
- internal office issue

#### 5. Dispatch must flow into closeout and next steps

When work completes or stalls, Dispatch Director should be able to trigger:

- Service visibility
- Follow-Up creation
- Revenue Control readiness

---

## 11. Dependencies

Dispatch Director can operate independently as an operational board, but it is strongest when connected to the rest of the operations stack.

### Can work independently

Yes, in a limited movement-control role, especially for:

- assignment visibility
- manual dispatching
- reroute management

### Works much better with

- `Scheduling Director`
- `Call Handling Director`
- `Follow-Up Director`
- `Service Director`
- `Revenue Control Director`

### Strongest launch combinations

- `Scheduling + Dispatch`
- `Dispatch + Service`
- `Call Handling + Scheduling + Dispatch`
- `Dispatch + Follow-Up + Revenue Control`
- `Full Operations Lane`

---

## 12. A / B / C Definition

### Level A

- assignment queue visibility
- manual assignment decisions
- manual reroute decisions
- assignment blocker visibility
- worker confirmation visibility
- President and COO visibility into live movement

### Level B

- stronger worker confirmation logic
- reroute recommendations
- urgency prioritization
- stronger assignment-state tracking
- cleaner sales / service / combined worker handling
- stronger day-pressure visibility

### Level C

- advanced routing logic
- stronger prioritization automation
- live balancing of assignment pressure
- tighter accountability signals across movement states
- more autonomous operational recommendations

---

## 13. Pricing Direction

Dispatch Director should be priced as a field-control and live-movement director, not as a generic calendar extension.

### Pricing logic

- `A` = visible dispatch control
- `B` = stronger operating coordination
- `C` = highest automation and route-pressure control

Its pricing should feel justified by:

- fewer dropped handoffs
- clearer daily execution
- less assignment confusion
- faster response to operational changes

It should upsell naturally when paired with Scheduling and Service.

---

## 14. Diagnostic Recommendation Logic

Dispatch Director should be recommended when:

- the company dispatches multiple workers
- workers travel between jobs
- same-day urgency matters
- service areas are wide or operationally complex
- the owner says daily movement feels chaotic
- reroutes happen often
- office staff coordinate several active jobs at once

### Strong recommendation triggers

- multiple field workers
- active same-day workload
- mixed sales and service movement
- customer complaints caused by timing or crew confusion

---

## 15. Recommended Diagnostic Questions

Useful Step 1 diagnostic questions for Dispatch Director:

- “Do you assign jobs to multiple workers or crews?”
- “Do workers travel between several jobs during the day?”
- “Do urgent jobs or same-day changes happen often?”
- “Who currently decides where each worker goes next?”
- “Do reroutes or assignment changes create confusion?”
- “Would you like the system to keep assignment movement visible and controlled automatically?”

---

## 16. Dashboard Requirements

The President Dashboard should show:

- jobs awaiting assignment
- jobs assigned
- jobs blocked
- jobs in progress
- reroute count
- highest-risk operational movement issues

The Dispatch Director view should show:

- assignment queue
- jobs by worker or crew
- jobs by state
- blocked-job count
- closeout-pending count

---

## 17. Launch Test Scenarios

Dispatch Director is not launch-ready until these scenarios work:

1. confirmed job enters dispatch review cleanly
2. worker or crew assignment becomes visible
3. worker confirmation logic updates state correctly
4. reroute path preserves the same job record
5. blocked job remains visible until resolved
6. in-progress state can be shown clearly
7. completed work can move to closeout-pending or completed state
8. President can see dispatch pressure without opening every job

---

## 18. Launch Exit Condition

Dispatch Director is launch-ready when:

- confirmed work flows into visible assignment control
- ownership is always visible
- reroute and blocker logic work credibly
- the same job record survives from scheduling into execution
- President and COO can see operational movement clearly
- the director feels like a real live-movement operating lane, not a vague dispatcher concept

---

## 19. Build Priority

Dispatch Director should remain a top Wave 2 priority because it turns scheduling truth into field execution control.

Without it:

- scheduled work still breaks operationally
- assignment ownership becomes unclear
- service pressure remains hidden

With it:

- AI-ABCX starts behaving like a real operational company system

---

## 20. Final Product Statement

Dispatch Director is the AI-ABCX live-movement lane that controls assignment, confirmation, reroute, and blocker visibility after work is booked, keeping field execution under President-visible operational control.
