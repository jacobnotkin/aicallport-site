# AI-ABCX Call Agent Behavior Package List

This document defines the official behavior-package list for the AI-ABCX Call Agent.

Its purpose is to support:

- activation configuration
- itemized pricing
- valid call-agent combinations
- future upgrades from the dashboard

The key commercial idea is:

- customers should pay for the call-agent behaviors they actually need
- customers should not feel they are paying for behavior they will not use
- behavior packages should still remain structured and controlled

This list exists to keep that model disciplined.

---

## 1. Core Rule

Call Handling should not be sold as one vague block of capability.

It should be configured through:

- Call Agent automation level
- Voice tier
- language packs
- behavior packages
- per-minute usage
- administrative charge

Behavior packages are one of the main configurable layers.

---

## 2. Behavior Package Rule

Behavior packages should represent:

- real business-use functions
- understandable call goals
- clear pricing units

They should not be:

- unlimited tiny custom toggles
- vague technical options
- uncontrolled one-off exceptions

This should remain a controlled list of supported behavior modules.

---

## 3. Primary Behavior Packages

These are the recommended core behavior packages for launch and near-launch.

| Behavior Package | Purpose |
|---|---|
| Information Response | Answer common business questions and provide basic company/service information |
| Lead Qualification | Determine whether the caller is a real opportunity and capture fit/priority details |
| Appointment Booking Intake | Capture requested timing and begin the appointment-booking path |
| After-Hours Continuity | Handle calls outside normal business hours and preserve business truth without losing the opportunity |
| Emergency Handling | Recognize urgency or emergency conditions and apply the correct intake/escalation logic |
| Reschedule / Cancellation Handling | Manage changes to existing appointment timing and route the new state correctly |
| Callback / Follow-Up Intake | Capture missed-call callbacks, follow-up requests, and unresolved customer contact needs |

---

## 4. Behavior Package Definitions

## 4.1 Information Response

### Purpose

Handle calls where the main value is:

- answering questions
- explaining services
- providing availability expectations
- giving business information

### Examples

- service area questions
- hours questions
- service-type questions
- “do you handle this?” questions

### Why it matters

This is a common low-friction entry behavior and useful for basic A-level call handling.

---

## 4.2 Lead Qualification

### Purpose

Determine whether the call is a real business opportunity and capture the important details.

### Examples

- fit / non-fit lead
- urgency
- job type
- service area fit
- readiness level

### Why it matters

This behavior is important for both operations and growth quality.

---

## 4.3 Appointment Booking Intake

### Purpose

Begin the booking path by capturing:

- requested timing
- appointment type
- key scheduling details

### Examples

- new appointment request
- estimate appointment request
- service visit request

### Why it matters

This is one of the most important field-service behaviors.

---

## 4.4 After-Hours Continuity

### Purpose

Protect demand and customer communication outside business hours.

### Examples

- late-night inquiry
- weekend request
- office closed but customer still needs response

### Why it matters

This preserves opportunities that would otherwise be missed.

---

## 4.5 Emergency Handling

### Purpose

Apply special logic to urgent or emergency situations.

### Examples

- broken pipe
- urgent no-heat or no-cooling issue
- safety concern
- immediate service need

### Why it matters

This protects quality and routing discipline in the highest-pressure calls.

---

## 4.6 Reschedule / Cancellation Handling

### Purpose

Handle callers who need to:

- reschedule
- cancel
- change appointment timing

### Why it matters

This behavior helps preserve scheduling truth and operational continuity.

---

## 4.7 Callback / Follow-Up Intake

### Purpose

Capture:

- missed-call return contact
- estimate follow-up contact
- unresolved customer contact
- callback request

### Why it matters

This behavior supports continuity and reduces lost business after the first interaction.

---

## 5. Launch Recommendation By Stage

### Stage A

Recommended launch-ready behavior packages:

- Information Response
- Lead Qualification
- Appointment Booking Intake
- After-Hours Continuity
- Emergency Handling
- Reschedule / Cancellation Handling
- Callback / Follow-Up Intake

All of these can be valid at `Call Agent A`, but with foundational behavior depth.

### Stage B

The same behaviors can become more automated and more deeply connected to Dispatcher, CRM, and workflow logic.

### Stage C

The same behaviors can become more intelligent, more controlled, and more management-aware.

This means the behavior list can stay stable while the automation level improves.

---

## 6. Behavior Package And Level Rule

Behavior packages and agent levels are different things.

### Behavior package

What the call agent is allowed to do.

### Agent level

How advanced the handling and workflow intelligence are.

So:

- `Call Agent A + Appointment Booking Intake`
- `Call Agent B + Appointment Booking Intake`

both support the same general business function,
but at different automation depth.

This is an important distinction.

---

## 7. Pricing Rule

Behavior packages should be usable in itemized pricing.

That means activation can produce a configured offer like:

- Call Agent A
- Voice B
- Lead Qualification
- Appointment Booking Intake
- After-Hours Continuity
- English included
- per-minute usage
- administrative charge

This makes the total system price feel:

- configured
- fair
- understandable

---

## 8. Upgrade Rule

Customers should be able to:

- add new behavior packages later
- remove or replace behavior packages later if business needs change
- upgrade the automation level of the same behavior package over time

This should eventually be manageable from inside the customer dashboard.

---

## 9. Bundle Rule

Behavior packages can also be grouped into recommended discounted sets.

Examples:

- Basic Intake Set
- Field Service Booking Set
- After-Hours Protection Set
- High-Urgency Response Set

This should make pricing easier for customers who do not want to configure everything one by one.

---

## 10. Main Definition

The AI-ABCX Call Agent behavior system should be defined as:

`a controlled list of configurable business-use behaviors that can be combined with agent level, voice tier, language packs, usage pricing, and administration pricing`

This is the governing behavior-package model for Call Handling.
