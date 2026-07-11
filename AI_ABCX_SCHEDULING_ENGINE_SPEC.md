# AI-ABCX Scheduling Engine Spec

This document defines the current scheduling model for `AI-ABCX`.

It exists to keep:

- Stage A scheduling behavior clear
- Stage B scheduling automation boundaries clear
- dashboard behavior aligned with real workflow
- future implementation grounded in the agreed operating model

---

## Core Rule

Scheduling exists in both `Stage A` and `Stage B`.

The difference is:

- `Stage A` scheduling is manual
- `Stage B` scheduling is automated

This is the defining distinction.

---

## Stage A Manual Scheduling

Stage A does **not** include:

- salesman dashboards
- service dashboards
- worker availability in the system
- automated assignment
- automated rerouting
- in-system worker confirmation workflow

Stage A scheduling works like this:

1. AI call agent asks the customer what time is convenient.
2. AI call agent creates a provisional appointment.
3. Customer is told the appointment will be confirmed by a representative.
4. Salesman or service person communicates with the President outside the system.
5. President updates the final confirmed time inside `AI-ABCX`.
6. After the appointment, President records:
   - outcome
   - amount paid to the company

Stage A therefore provides:

- President-level appointment visibility
- manual scheduling record management
- outcome tracking
- revenue tracking

It is President-facing only.

---

## Stage B Automated Scheduling

Stage B activates the scheduling engine.

Stage B adds:

- salesman dashboard
- service dashboard
- in-system worker availability
- automated assignment logic
- worker confirmation timing
- automated rerouting
- customer confirmation SMS
- structured workflow capture after the appointment

Stage B workflow:

1. A qualifying call leads to an appointment.
2. The system determines whether the appointment belongs to:
   - sales
   - service
   - sales and service
3. The system checks worker availability.
4. The system routes the appointment to the relevant available person.
5. The assigned person must confirm availability on time.
6. If confirmation does not happen on time, the system reroutes to the next available person.
7. Once the worker confirms, the system sends SMS to the customer for confirmation.
8. When customer confirmation is received, the system stores the confirmed appointment and waits for outcome reporting.
9. Sales and service outcomes feed reporting and President recommendations.

---

## Worker Role Model For Stage B

Some companies separate sales and service.

Some companies use the same person for both.

So the scheduling engine must support:

- sales-only worker
- service-only worker
- combined sales and service worker

This means the assignment model should be capability-based, not title-based.

Suggested capability tags:

- `sales`
- `service`
- `sales_and_service`

---

## Appointment Flow Reality

The system must support multiple real-world outcomes.

A job may be:

- sales only
- service only
- sales first, service later
- sold and completed on the spot by the same person

The workflow must not assume strict separation between sales and service.

---

## Stage A Minimum Job Record

The agreed minimum Stage A appointment/job record is:

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

This same record should later become the base record for Stage B and Stage C.

---

## Controlled Vocabulary

These values should be kept controlled so reporting remains consistent.

### Appointment Type

- `sales`
- `service`
- `sales_and_service`

### Status

- `provisional`
- `awaiting_confirmation`
- `confirmed`
- `rescheduled`
- `completed`
- `canceled`
- `no_show`

### Outcome

- `estimate_given`
- `sold_not_completed`
- `sold_and_completed`
- `service_completed`
- `follow_up_needed`
- `not_sold`
- `canceled`
- `no_show`

---

## President Role

In Stage A, the President is the system truth-entry point for scheduling outcomes.

The President can:

- update final appointment time
- record outcome
- record amount paid

In Stage B, the President shifts from manual updater to overseer of the automated scheduling engine.

The President should still retain override authority, but the workflow itself becomes system-driven.

---

## Reporting Value

Even before automation, Stage A scheduling should already support:

- appointment visibility
- outcome tracking
- revenue tracking
- representative accountability visibility

Stage B should deepen this into:

- automated assignment reporting
- confirmation speed reporting
- reroute reporting
- sales/service throughput reporting
- stronger next-step suggestions to the President

---

## Product Meaning

The scheduling model now defines one of the clearest product distinctions inside `AI-ABCX`:

- `Stage A` = assisted manual scheduling with President reporting
- `Stage B` = automated scheduling engine with worker workflow

This distinction should stay visible in:

- President dashboard behavior
- activation map language
- landing-page explanations
- Stage A/B/C product messaging
