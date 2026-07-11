# Bring Corporate Structure to Service Businesses

# AI-ABC Stage Interface Specification

## Purpose

This document defines the boundary between:

- shared core system behavior
- Stage A behavior
- Stage B behavior
- Stage C behavior
- future Stage X behavior

It exists to protect AI-ABC from stage drift.

Without this specification, later-stage development can accidentally:

- break earlier stages
- rewrite stable workflows
- fork the product into separate versions
- create hidden dependencies between modules
- make upgrades unsafe for customers

This document makes one rule explicit:

later stages must extend earlier stages without replacing their core behavior.

---

## Core Principle

AI-ABC should have:

- one shared core codebase
- one shared data model
- one shared operating structure
- additive stage layers on top of that core

Each stage must be operationally complete at its own level.

Each later stage may consume the outputs of earlier stages.

Each later stage may not redefine the ownership of earlier stages.

This means:

- Stage A must work by itself
- Stage B must add to Stage A without breaking Stage A
- Stage C must add to Stage A and Stage B without breaking either
- future Stage X must remain additive as well

---

# 1. Architectural Rule

The system should be treated as:

## Layer 1: Shared Core

The permanent foundation used by every company and every stage.

## Layer 2: Stage A Interface

The communication and intake layer.

## Layer 3: Stage B Interface

The scheduling and execution-coordination layer.

## Layer 4: Stage C Interface

The governance and advanced-management layer.

## Layer 5: Future Stage X Interface

Additional expansion layers such as HR, accounting, advertising, and other future corporate modules.

This is the correct expansion model.

It should not be replaced by separate full product files for each stage.

Milestone backups are good.

Separate live architectures are not.

---

# 2. Shared Core Layer

## Purpose

The shared core holds the system contracts that must remain stable across all stages.

## Shared core includes

- company configuration object
- module gating object
- role registry
- reporting hierarchy
- customer ID generation
- customer origin and routing model
- CRM record structure
- accountability event schema
- revenue intelligence base records
- dashboard shell structure
- company memory foundations

## Shared core outputs

The shared core should always be able to produce:

- normalized company identity
- normalized customer records
- normalized role relationships
- normalized workflow ownership
- normalized reporting references
- normalized event history

## Shared core rule

No stage is allowed to redefine the shape of the shared core in a way that makes earlier stages invalid.

Stages may extend the core.

They may not fork it.

---

# 3. Stage A Interface

## Mission

Capture, qualify, and structure incoming demand.

## Stage A owns

- AI inbound call handling
- missed-call recovery
- after-hours handling
- lead qualification
- transcript creation
- recording creation
- AI call summaries
- CRM record creation
- customer number creation
- customer origin assignment
- customer routing assignment
- outbound follow-up on historical data
- legacy import activation
- referral intake activation
- manual next-step preparation

## Stage A required outputs

Stage A should produce stable outputs that later stages are allowed to consume.

### Required outputs

- `customerId`
- `customerOrigin`
- `originPrefix`
- `pipelineKey`
- `routingOwnerRole`
- `priorityLevel`
- `lifecycleStage`
- `currentStatus`
- `callTranscript`
- `callRecording`
- `callSummary`
- `qualificationResult`
- `urgencyResult`
- `preferredAppointmentWindow`
- `assignedNextOwner`
- `estimatePlaceholder`
- `completionPlaceholder`
- `financialPlaceholder`

## Stage A may include

Stage A may already support:

- sales dashboard intake actions
- service dashboard intake actions
- owner referral portal
- customer reactivation workflows
- estimate amount entry after a visit
- job completion reporting
- owner financial outcome entry

As long as those behaviors do not require automatic scheduling.

## Stage A must remain functional if B and C are off

That means:

- communication capture still works
- customer routing still works
- referral routing still works
- legacy import routing still works
- sales follow-up still works in manual form
- service reporting still works in manual form
- owner financial confirmation still works

---

# 4. What Stage B May Use From Stage A

Stage B may use the outputs of Stage A as its input contract.

## Stage B may consume

- customer identity
- customer origin
- qualification result
- preferred appointment window
- assigned next owner
- transcript and recording
- lead status
- estimate placeholder
- completion placeholder
- revenue placeholder

## Stage B may add

- availability matching
- automatic scheduling
- appointment confirmations
- reminder logic
- staff confirmations
- automatic rerouting
- service execution workflow
- sales execution workflow
- structured completion reporting

## Stage B may not override

Stage B may not redefine:

- how Stage A identifies a customer
- how Stage A stores call transcripts
- how Stage A stores call summaries
- how Stage A assigns customer origin
- how Stage A defines routing records
- how Stage A creates the first CRM record

If Stage B needs more fields, it must extend the record rather than replace it.

---

# 5. Stage B Interface

## Mission

Turn captured demand into coordinated, trackable execution.

## Stage B owns

- automatic scheduling
- appointment creation
- availability logic
- service staff coordination
- sales staff coordination
- appointment confirmations
- reminder flows
- rerouting after no confirmation
- rescheduling logic
- completion reporting workflows
- estimate-tracking workflow
- execution visibility for owner and managers

## Stage B required outputs

- appointment status
- assigned staff member
- confirmation state
- reroute state
- completion state
- estimate amount entered
- pending financial outcome state
- next required action

## Stage B must remain functional if Stage C is off

That means:

- scheduling still works
- confirmations still work
- rerouting still works
- completion reporting still works
- owner can still review pending revenue outcomes

Stage C is not allowed to be a hidden requirement for Stage B stability.

---

# 6. What Stage C May Use From Earlier Stages

Stage C may consume:

- all shared core records
- all Stage A communication records
- all Stage B execution records
- all estimate and financial placeholders
- all completion and exception events

## Stage C may add

- approvals
- escalations
- exception routing
- workflow enforcement
- outcome checking
- advanced accountability views
- governance controls
- executive recommendations

## Stage C may not override

Stage C may not redefine:

- how Stage A captures communication
- how Stage B creates appointments
- how Stage B tracks confirmations
- how Stage B records completion

Stage C may interpret earlier outputs.

It may not rewrite the ownership model of earlier stages.

---

# 7. Stage C Interface

## Mission

Turn business activity into governed business outcomes.

## Stage C owns

- advanced owner approvals
- exception handling
- escalation management
- workflow enforcement
- outcome checking
- accountability visibility
- governance routing
- advanced executive recommendations
- operational drift detection

## Stage C required outputs

- approval state
- escalation state
- unresolved risk state
- accountability state
- governance summaries
- executive recommendations
- President action items

## Stage C must remain optional

A company must still be allowed to operate on:

- Stage A only
- Stage A + B

without enabling Stage C.

That means no core communication or scheduling behavior should require governance-layer activation in order to keep functioning.

---

# 8. Future Stage X Rule

Future stages such as:

- HR
- bookkeeping
- accounting
- advertising
- advanced marketing
- additional executive layers

must follow the same pattern.

## Future-stage rule

Every future stage must:

- use shared core contracts
- consume stable prior outputs
- add new behavior
- avoid replacing prior stage ownership

If a future stage requires rewriting Stage A or Stage B from scratch, the interface model has failed.

---

# 9. Non-Negotiable Interface Rules

## Rule 1

Later stages may extend earlier stages.

They may not erase them.

## Rule 2

Each stage must be usable without later stages being active.

## Rule 3

Stable outputs from earlier stages must be treated as contracts.

## Rule 4

Shared data structures should be extended, not forked.

## Rule 5

Milestone backups are allowed.

Separate live production architectures for each stage are not the primary model.

## Rule 6

Disabling a later stage must never break earlier-stage workflows.

---

# 10. Recommended Milestone Practice

The product should preserve stage-complete milestones for safety.

## Recommended milestone model

- Stage A complete and tested -> freeze milestone
- Stage B complete and tested -> freeze milestone
- Stage C complete and tested -> freeze milestone

This preserves progress without splitting the live architecture into multiple codebases.

Milestone preservation is good for:

- rollback safety
- testing confidence
- historical reference
- launch discipline

But milestone preservation should not become:

- a separate Stage A product file
- a separate Stage B product file
- a separate Stage C product file

The live system should remain one expandable operating structure.

---

# 11. What This Means In Practice

Before building any later stage, the team should ask:

- what does the earlier stage already own
- what outputs already exist
- what new behavior is being added
- what fields are truly new
- what must remain untouched

If the answer requires replacing earlier-stage contracts, the design should be rejected and redesigned.

---

# 12. Core Principle

AI-ABC is one operating structure with additive stage layers.

It should grow like a company that opens new departments, not like three separate software products fighting over the same foundation.

The rule should be:

`Shared core stays stable.`

`Each stage owns its layer.`

`Later stages add. They do not replace.`
