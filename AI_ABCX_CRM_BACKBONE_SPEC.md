# AI-ABCX CRM Backbone Specification

This document defines the `CRM backbone` for AI-ABCX.

It should not be understood as a narrow sales CRM.

It should be understood as:

`the shared operating truth layer for the entire AI-ABCX corporate system`

---

## 1. Core Definition

The AI-ABCX CRM backbone is the central system memory and business-truth layer that all major modules depend on.

It must support:

- Call Handling
- Marketing
- Dispatcher
- Scheduling
- Closeout
- President Follow-Up
- President Dashboard
- future advanced management layers

The CRM is the common record system that allows separate modules to behave like one connected corporate structure.

---

## 2. Main Product Rule

The CRM must not behave like:

- simple contact storage
- a basic lead list
- a standalone sales pipeline app
- a disconnected data table

It must behave like:

- corporate memory
- operational truth
- cross-module shared state
- President-readable business reality

---

## 3. Mission

Give AI-ABCX one reliable business-truth backbone so all modules can read from the same record history, write to the same record lifecycle, and support President-level control.

---

## 4. What The CRM Must Support

The CRM must support the entire operational chain:

`demand -> call -> qualification -> record -> scheduling -> assignment -> execution -> outcome -> payment -> follow-up -> President oversight`

This is broader than traditional CRM.

---

## 5. Module Support Responsibilities

### 5.1 Call Handling Support

The CRM must support:

- caller identity
- business/contact capture
- transcript storage or reference
- recording storage or reference
- call intent
- urgency classification
- caller qualification
- lead qualification
- requested service
- requested timing
- source attribution
- next-step status

### 5.2 Marketing Support

The CRM must support:

- source tracking
- campaign tracking
- channel attribution
- lead quality comparison
- booked and sold path measurement
- repeat-customer and reactivation history
- paid revenue linkage

### 5.3 Dispatcher / Scheduling Support

The CRM must support:

- requested appointment time
- confirmed appointment time
- scheduling status
- assignment owner
- worker or rep ownership
- reschedule state
- hold state
- reroute state
- confirmation state

### 5.4 Closeout Support

The CRM must support:

- job or opportunity outcome
- completed vs not completed
- amount paid
- canceled / lost state
- outcome notes
- reason for unresolved state

### 5.5 Follow-Up Support

The CRM must support:

- follow-up reason
- unresolved state
- next-step owner
- next-step due timing
- callback or estimate follow-up history
- reactivation history

### 5.6 President Dashboard Support

The CRM must support:

- summary visibility
- accountability visibility
- next-action pressure
- filtered queue views
- executive recommendations
- trusted activity history

---

## 6. Core Record Model

The CRM backbone should revolve around a shared operating record.

Depending on business variant later, the dominant record object may vary.

For launch field-service scope, the shared record should support:

- lead
- customer
- appointment
- job
- outcome
- follow-up state

This can live as one connected record model rather than many disconnected objects in the early system.

---

## 7. Required Core Data Fields

These are the minimum important CRM field groups.

### Identity Fields

- record ID
- company name
- customer name
- customer phone
- customer email
- address or service location
- service area fit

### Source Fields

- source
- campaign
- channel
- partner/referral source
- landing page or intake origin
- first-touch source
- latest-touch source

### Call Handling Fields

- call timestamp
- transcript reference
- recording reference
- call intent
- urgency
- qualification status
- lead qualification status
- intake notes

### Service / Opportunity Fields

- service type
- appointment type
- requested service details
- estimate path vs direct-service path
- priority

### Scheduling Fields

- requested time
- confirmed time
- scheduling mode
- assignment owner
- assigned worker or rep
- confirmation status
- reschedule status
- reroute status
- hold status

### Pipeline / Lifecycle Fields

- lead stage
- record status
- outcome
- closed/open state
- follow-up required flag
- follow-up reason

### Revenue Fields

- estimate amount
- amount paid
- sold/not sold
- completed/not completed
- revenue status

### Accountability Fields

- owner
- next action
- next action due
- executive lane
- module-origin context

---

## 8. Required Lifecycle Stages

For launch, the CRM backbone should support a practical lifecycle such as:

1. new intake
2. qualified / unqualified
3. booked / pending booking
4. confirmed / awaiting confirmation
5. assigned / awaiting assignment
6. in progress / appointment active
7. completed / sold / unresolved / canceled
8. follow-up required or closed

The exact labels can evolve, but the lifecycle must support all active modules.

---

## 9. Shared Timeline Requirement

Every record must have a unified activity timeline.

The timeline should capture events such as:

- call received
- transcript linked
- recording linked
- qualification changed
- appointment requested
- appointment confirmed
- assignment changed
- worker confirmed
- customer confirmed
- reroute triggered
- outcome saved
- amount paid updated
- follow-up created
- reactivation attempt made
- recommendation issued

This timeline is critical for trust, continuity, and President visibility.

---

## 10. Read / Write Rule By Module

The CRM backbone should allow modules to contribute to the same shared truth.

### Call Handling writes

- intake identity
- transcript and recording
- intent
- urgency
- qualification
- requested service

### Marketing writes

- source and campaign context
- channel attribution
- reactivation activity

### Dispatcher writes

- assignment state
- confirmation state
- reroute / hold / reschedule state

### Closeout writes

- outcome
- amount paid
- unresolved reason
- close state

### Follow-Up writes

- next-step reason
- next-step owner
- follow-up timing

### President layer writes

- overrides
- notes
- manual status changes
- accountability direction

No module should create isolated truth that cannot be seen by the rest of the system.

---

## 11. Shared Data Rule

Every module should depend on the same CRM backbone instead of maintaining separate realities.

This is what allows modular packaging without fragmenting the corporate system.

One module can be sold first.

But every module must still connect into the same larger structure.

---

## 12. Launch Scope Rule

For launch, the CRM backbone should be designed first for:

- small and medium field service businesses

It must still be broad enough to support:

- Marketing
- Call Handling
- Dispatcher
- Closeout
- Follow-Up
- President Core

The CRM should be designed as field-service-ready and future-variant-extensible.

---

## 13. Relationship To Marketing

A truly advanced Marketing module depends on this CRM backbone.

Without the CRM backbone, Marketing cannot reliably measure:

- qualified leads
- booked work
- sold work
- paid revenue
- repeat-customer value
- reactivation performance

So advanced Marketing is not separate from CRM.

It sits on top of the CRM backbone.

---

## 14. Relationship To Call Handling

Call Handling also depends on this CRM backbone.

Without CRM support, call handling cannot reliably preserve:

- identity
- source
- qualification
- urgency
- service request details
- next-step status

So Call Handling should write into CRM immediately.

The CRM is what turns the call from a conversation into business truth.

---

## 15. Relationship To Scheduling

Scheduling and Dispatcher cannot function cleanly without the CRM backbone.

The CRM must carry:

- requested time
- confirmed time
- status
- assignment ownership
- worker/rep context
- exception state

So scheduling is not outside CRM.

It is one of the operating layers powered by CRM truth.

---

## 16. Relationship To Closeout And Follow-Up

Closeout and Follow-Up must not be separate data islands.

They must update the same record history.

That is how the President can trust:

- what happened
- what got paid
- what is still unresolved
- what needs action next

---

## 17. President Rule

The President dashboard should be able to depend on the CRM backbone as the trusted truth source.

That means the President sees:

- what entered the business
- where it came from
- who owns it now
- what happened to it
- what revenue it produced
- what remains unresolved

This is the practical meaning of corporate structure inside AI-ABCX.

---

## 18. Main Definition

The AI-ABCX CRM backbone should be defined as:

`the shared operating truth layer that supports call handling, marketing, scheduling, closeout, follow-up, and President-level control across the whole corporate system`

---

## 19. Immediate Next Decisions

To move from concept to architecture, the next steps should define:

1. exact launch record schema
2. exact lifecycle stage model
3. exact timeline event schema
4. module-specific read/write permissions and boundaries
5. how the CRM backbone appears in UI as a module or set of screens
