# AI-ABCX Scheduling Director Product Spec

This document defines the implementation-grade product specification for `Scheduling Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Scheduling Director is one of the first Wave 2 launch directors because it controls the moment demand becomes real operational commitment.

---

## 1. Product Identity

### Public name

`Scheduling Director`

### Executive owner

`COO`

### Mission

Scheduling Director turns inbound demand into visible appointment truth, preserves one clean scheduling record from intake to outcome, and controls booking, confirmation, reschedule, and no-show logic under President visibility.

### Core promise

Scheduling Director should not feel like a basic booking widget.

It should promise:

- cleaner appointment control
- fewer lost or confused bookings
- visible scheduling truth
- better confirmation discipline
- stronger reschedule and no-show handling
- clearer handoff into dispatch, service, and revenue truth
- President-level visibility into what is actually booked, provisional, broken, or completed

---

## 2. Strategic Role Inside AI-ABCX

Scheduling Director is the appointment-control lane of the system.

It manages the transition from:

`lead or estimate -> appointment promise -> confirmed operational reality`

It is strategically important because:

- many service businesses create chaos between “customer asked” and “appointment is truly locked”
- scheduling often breaks where call handling, quoting, office confirmation, and field execution meet
- the business needs one scheduling truth instead of calendar fragments, memory, and text chains
- Stage A and higher automation levels require different scheduling behavior, but both must stay visible to the President

Scheduling Director can be:

- a standalone booking-control director
- part of an operations bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `Calendly`
- `Jobber`
- `Housecall Pro`
- `ServiceTitan`
- `GoHighLevel`

### What they do well

- appointment creation
- calendar visibility
- reschedule support
- customer confirmation flows
- online booking
- basic team scheduling control

### What AI-ABCX must match

- appointment creation
- scheduling visibility
- reschedule handling
- no-show handling
- service vs sales appointment clarity
- customer-facing booking clarity
- booking-state tracking

### Where AI-ABCX should beat them

- preserve President-visible scheduling truth in Stage A manual operation
- support multiple business realities:
  - sales-only scheduling
  - service-only scheduling
  - sales then service
  - dispatch-style field scheduling
- keep one job record alive across the whole lifecycle
- explain when manual scheduling is correct and when deeper automation should activate
- connect directly to Call Handling, Estimator, Follow-Up, Dispatch, Service, and Revenue Control

---

## 4. Ideal Customer Fit

Scheduling Director is a strong fit for:

- companies with appointment confusion
- businesses where confirmations are inconsistent
- teams that handle both sales and service appointments
- companies where owners still manually settle final timing
- service businesses preparing to move from manual coordination into stronger automation

It is especially strong for:

- appointment-based service businesses
- estimate-driven service businesses
- field teams
- office-led service companies
- companies with multiple workers or technicians
- businesses with repeat scheduling volume

---

## 5. Required User Outcomes

Scheduling Director must let a business owner say:

- “I can see every appointment clearly.”
- “I know what is provisional and what is truly confirmed.”
- “I know whether the appointment is sales, service, or both.”
- “I can see what was rescheduled, canceled, or missed.”
- “I know what still needs confirmation.”
- “The President Dashboard shows scheduling pressure clearly.”
- “One scheduling record stays alive from intake to final outcome.”

---

## 6. Functional Scope

Scheduling Director must cover eight major functions:

1. appointment creation
2. appointment-type classification
3. provisional vs confirmed truth control
4. confirmation logic
5. reschedule logic
6. no-show and broken-appointment handling
7. handoff into dispatch and service
8. President-visible scheduling pressure

---

## 7. Required Scheduling Modes

Scheduling Director must support multiple real business modes.

Launch-required modes:

- `no_scheduling_layer`
- `sales_scheduling`
- `service_scheduling`
- `sales_and_service_scheduling`
- `dispatch_style_scheduling`

These modes must stay consistent across:

- diagnostic logic
- recommendation logic
- pricing logic
- UI copy

---

## 8. Scheduling States

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

Each state must preserve:

- appointment type
- requested time
- provisional time
- final confirmed time
- assigned representative
- current owner
- next expected action
- President-visible summary

---

## 9. Shared Job Record Requirement

Scheduling Director must not create disconnected scheduling records.

The same job or appointment record should survive across stages.

Required launch fields:

- job number
- customer name
- phone
- appointment type
- source
- requested time
- provisional time
- final confirmed time
- assigned representative
- current status
- outcome
- amount paid
- notes
- call transcript reference
- call recording reference

This is one of the most important structural requirements in the system.

---

## 10. Product Surfaces

Scheduling Director must not launch as backend logic only.

It needs visible product surfaces.

### Surface 1. Scheduling Queue / Calendar Surface

Purpose:

- show provisional, confirmed, rescheduled, canceled, and broken appointments clearly
- let the President and operations lane see scheduling pressure in one place

Required visibility:

- appointment type
- current state
- date and time
- assigned representative
- confirmation status
- next action

### Surface 2. Scheduling Record View

Purpose:

- show one appointment from intake to outcome
- preserve one clean scheduling truth
- show what is still unresolved

Required visibility:

- source record
- customer
- appointment type
- requested time
- confirmed time
- status history
- assigned representative
- outcome

### Surface 3. Scheduling State Summary Surface

Purpose:

- make Stage A vs higher-automation behavior understandable
- show why an appointment is still provisional, awaiting confirmation, rerouted, or broken

Required visibility:

- current scheduling mode
- reason for state
- next required action
- escalation or follow-up recommendation

### Surface 4. President Scheduling Visibility

Purpose:

- show the President what is operationally real today
- highlight pressure before it becomes chaos

Required visibility:

- provisional count
- confirmed count
- rescheduled count
- no-show count
- follow-up-needed count
- highest-risk scheduling issues

---

## 11. Business Logic

Scheduling Director must create and preserve scheduling truth when:

- a call creates a booking request
- an estimate is accepted
- an appointment request comes from the website
- a customer needs reschedule
- a worker or owner changes timing
- an appointment result still needs recording

### Core business rules

#### 1. Scheduling must preserve one truth

The system must know whether an appointment is:

- requested only
- provisional
- manually confirmed
- customer-confirmed
- worker-confirmed
- completed
- broken

#### 2. Stage A must stay honest

If scheduling is manual at Stage A, the system must not pretend deeper automation exists.

It should show:

- provisional state
- awaiting manual confirmation
- final manual confirmation

#### 3. Scheduling must distinguish appointment types

The system must separate:

- sales appointments
- service appointments
- combined sales-and-service paths

#### 4. Scheduling must coordinate downstream lanes

A scheduling state should be able to trigger:

- Dispatch visibility
- Service visibility
- Follow-Up creation
- Revenue truth preservation

#### 5. Broken scheduling must stay visible

No-show, reschedule, cancellation, and unresolved confirmation issues must remain President-visible.

---

## 12. Dependencies

Scheduling Director can be sold independently, but it becomes strongest when connected to upstream and downstream lanes.

### Can work independently

Yes, especially for:

- basic booking control
- manual scheduling truth
- confirmation discipline

### Works much better with

- `Call Handling Director`
- `Estimator Director`
- `Follow-Up Director`
- `Dispatch Director`
- `Service Director`
- `Website Director`

### Strongest launch combinations

- `Scheduling + Follow-Up`
- `Call Handling + Scheduling`
- `Estimator + Scheduling`
- `Scheduling + Dispatch + Service`
- `Call Handling + Estimator + Scheduling + Follow-Up`

---

## 13. A / B / C Definition

### Level A

- manual scheduling truth
- provisional appointment capture
- manual confirmation logic
- reschedule visibility
- outcome and amount-paid visibility after the appointment
- no worker-dashboard dependency required

### Level B

- structured scheduling engine
- worker assignment logic
- worker confirmation timing
- reroute logic
- customer confirmation messaging
- stronger workflow-state handling

### Level C

- highest depth for multi-worker and higher-volume scheduling
- stronger automation behavior
- richer exception handling
- stronger scheduling accountability reporting
- stronger coordination across sales, service, and dispatch-style workloads

---

## 14. Pricing Direction

Scheduling Director should be priced as an operations-control director, not just as a calendar.

### Pricing logic

- `A` = visible manual scheduling truth
- `B` = stronger coordination and worker assignment logic
- `C` = higher automation depth and richer exception handling

Its pricing should feel justified by:

- fewer broken appointments
- less office confusion
- stronger booking reliability
- cleaner handoff into field execution

It should upsell naturally when paired with Call Handling, Estimator, or Dispatch.

---

## 15. Diagnostic Recommendation Logic

Scheduling Director should be recommended when:

- the company books appointments
- the owner says timing and confirmations are messy
- several people influence booking outcomes
- reschedules and no-shows create operational pain
- the customer journey includes estimate-to-appointment movement

### Strong recommendation triggers

- high appointment volume
- field team coordination
- multiple service types
- owner complaint about office confusion
- customer complaints around booking clarity

---

## 16. Recommended Diagnostic Questions

Useful Step 1 diagnostic questions for Scheduling Director:

- “Do you book appointments, estimates, consultations, or service visits?”
- “Who currently confirms final time with the customer?”
- “Do you have one person handling scheduling or several people?”
- “Do customers ever miss appointments or get unclear time windows?”
- “Do your sales and service appointments follow the same process or different ones?”
- “Would you like the system to keep provisional and final appointment truth visible automatically?”

---

## 17. Dashboard Requirements

The President Dashboard should show:

- provisional appointments
- confirmed appointments
- rescheduled appointments
- no-show count
- follow-up-needed scheduling items
- highest-risk scheduling problems

The Scheduling Director view should show:

- appointment queue by day
- appointment queue by status
- service vs sales mix
- broken appointment count
- unresolved confirmation count

---

## 18. Launch Test Scenarios

Scheduling Director is not launch-ready until these scenarios work:

1. appointment created from call intake
2. appointment created from accepted estimate
3. Stage A manual confirmation path stays visible
4. customer reschedule path preserves one record
5. no-show path triggers visible follow-up need
6. service outcome can still connect back to the same scheduling record
7. President can distinguish provisional vs confirmed truth instantly
8. service vs sales appointment separation remains clear

---

## 19. Launch Exit Condition

Scheduling Director is launch-ready when:

- one scheduling record survives from intake to outcome
- Stage A manual truth works honestly
- higher-level automation states are structurally defined
- schedule states are visible and understandable
- broken appointments remain visible
- downstream handoff works credibly
- the director feels like a corporate scheduling control lane, not a generic calendar

---

## 20. Final Product Statement

Scheduling Director is the AI-ABCX appointment-control lane that turns requested work into visible scheduling truth, preserves confirmation and reschedule discipline, and keeps the President in control of what is truly booked, still provisional, broken, or complete.
