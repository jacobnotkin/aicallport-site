# AI-ABCX Scheduling State Machine

This document defines the scheduling workflow states for `AI-ABCX`.

It builds on:

- [AI_ABCX_SCHEDULING_ENGINE_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_SCHEDULING_ENGINE_SPEC.md)

Its purpose is to make Stage A and Stage B workflow logic precise enough to implement.

---

## Core Rule

The same job record should survive across stages.

What changes is not the existence of the record.
What changes is how the record moves.

- `Stage A`: record is moved manually by the President
- `Stage B`: record is moved by the scheduling engine plus worker/customer actions

---

## Shared Job Record

Every scheduling workflow should attach to one job record containing:

- job number
- customer name
- phone
- appointment type
- requested/provisional time
- final confirmed time
- assigned representative name
- status
- outcome
- amount paid
- notes
- call transcript
- call recording reference

---

## Stage A State Flow

Stage A is manual.

Recommended Stage A states:

1. `provisional`
2. `awaiting_manual_confirmation`
3. `confirmed`
4. `rescheduled`
5. `completed`
6. `canceled`
7. `no_show`
8. `follow_up_needed`

### Stage A transitions

`provisional` ->
- `awaiting_manual_confirmation`

`awaiting_manual_confirmation` ->
- `confirmed`
- `rescheduled`
- `canceled`

`confirmed` ->
- `completed`
- `no_show`
- `rescheduled`
- `follow_up_needed`

`rescheduled` ->
- `confirmed`
- `canceled`

`completed` ->
- terminal for scheduling flow

`no_show` ->
- `rescheduled`
- `canceled`
- `follow_up_needed`

`follow_up_needed` ->
- `confirmed`
- `canceled`
- `completed`

### Stage A owner of transitions

In Stage A, transitions are primarily recorded by the President.

That means:

- worker communication happens outside the system
- customer confirmation is not system-automated
- President updates the scheduling truth

---

## Stage B State Flow

Stage B activates the scheduling engine.

Recommended Stage B states:

1. `provisional`
2. `awaiting_worker_assignment`
3. `awaiting_worker_confirmation`
4. `rerouted`
5. `awaiting_customer_confirmation`
6. `confirmed`
7. `in_progress`
8. `completed`
9. `follow_up_needed`
10. `canceled`
11. `no_show`

### Stage B transitions

`provisional` ->
- `awaiting_worker_assignment`

`awaiting_worker_assignment` ->
- `awaiting_worker_confirmation`
- `canceled`

`awaiting_worker_confirmation` ->
- `awaiting_customer_confirmation`
- `rerouted`
- `canceled`

`rerouted` ->
- `awaiting_worker_confirmation`
- `canceled`

`awaiting_customer_confirmation` ->
- `confirmed`
- `rescheduled`
- `canceled`

`confirmed` ->
- `in_progress`
- `rescheduled`
- `no_show`
- `canceled`

`in_progress` ->
- `completed`
- `follow_up_needed`

`completed` ->
- terminal for scheduling flow

`no_show` ->
- `rescheduled`
- `follow_up_needed`
- `canceled`

`follow_up_needed` ->
- `confirmed`
- `completed`
- `canceled`

---

## Stage B Key Engine Events

The important system events are:

### 1. Provisional appointment created

Triggered after the AI call agent gets a valid appointment window.

### 2. Worker assignment attempt

The engine identifies:

- sales worker
- service worker
- combined worker

based on appointment type and availability.

### 3. Worker confirmation timer starts

Assigned worker must confirm in time.

If no confirmation happens:

- appointment moves to `rerouted`
- next worker is selected

### 4. Customer confirmation SMS

After worker confirms:

- system sends customer confirmation SMS
- record moves to `awaiting_customer_confirmation`

### 5. Appointment execution

Once customer confirms:

- record becomes `confirmed`
- then `in_progress` once the appointment is being executed

### 6. Outcome capture

After appointment:

- salesperson may enter estimate amount and notes
- service worker may enter completion note
- President enters amount paid

This drives reporting and President suggestions.

---

## Outcome Layer

Status and outcome are not the same.

Status tracks workflow movement.
Outcome tracks business result.

Recommended outcome values:

- `estimate_given`
- `sold_not_completed`
- `sold_and_completed`
- `service_completed`
- `follow_up_needed`
- `not_sold`
- `canceled`
- `no_show`

---

## Payment Layer

Payment is not the same as completion.

A job may be:

- completed and paid
- completed and not fully paid
- sold and not yet completed

So payment should remain a separate tracked field even when status becomes `completed`.

Current agreed minimum:

- amount paid

Future likely extensions:

- estimate amount
- sold amount
- balance due

---

## Combined Worker Case

Some companies use one person for both sales and service.

The state machine must allow:

- a worker to receive sales appointment assignment
- the same worker to complete the work on the spot

This means one workflow can produce:

- `sold_and_completed`

without requiring separate users.

---

## President Control

President remains the override authority.

That means the President should be able to:

- change appointment time
- override assignment
- record final outcome truth
- record amount paid

Even in Stage B, automation should not remove President authority.

---

## Practical Implementation Order

Recommended build order:

1. job record model
2. Stage A manual state flow
3. Stage B assignment states
4. worker confirmation timer logic
5. reroute logic
6. customer confirmation SMS state
7. outcome capture
8. reporting and President suggestions

---

## Meaning For Dashboard Design

This state machine should shape dashboard behavior:

- Stage A dashboard should show manual scheduling truth
- Stage B dashboard should show assignment/confirmation workflow truth
- Stage C dashboard should show optimization, ratings, and predictive pressure built on top of this workflow
