# AI-ABCX Wave 2 Implementation Plan

This document defines the second implementation block after Wave 1.

Wave 2 is the operations continuity layer.

Its purpose is to make the business flow actually work after demand is created.

---

## 1. Wave 2 Scope

Wave 2 includes:

1. `Follow-Up Director`
2. `Scheduling Director`
3. `Dispatch Director`
4. `Service Director`
5. `Sales Director`

These directors are the first real operating backbone.

Wave 1 gets demand into the system.

Wave 2 makes sure that demand is:

- tracked
- moved
- booked
- assigned
- worked
- followed through
- visible to the President

---

## 2. Wave 2 Objective

At the end of Wave 2, AI-ABCX should be able to do all of the following:

- move open leads and estimates into visible next steps
- schedule appointments with clear truth states
- coordinate field work and dispatch visibility
- show service execution status
- keep sales ownership visible
- preserve President-level control across the whole operational chain

Wave 2 is complete only when the system can run a real service workflow from intake through scheduled and visible work.

---

## 3. Wave 2 Completion Standard

Each Wave 2 director is complete only if it has:

1. a normalized business-facing identity
2. a real screen or product surface
3. A/B/C logic
4. dependency logic
5. pricing logic
6. President dashboard visibility
7. at least one isolated test scenario
8. at least one integrated workflow test

If any of those are missing, the director is still incomplete.

---

## 4. Follow-Up Director

### Core purpose

Make sure open items do not disappear and that the next business action is visible, owned, and timed.

### What must be built

#### Product identity

- lock business-facing name: `Follow-Up Director`
- define visible follow-up states
- define what counts as:
  - pending
  - follow-up needed
  - follow-up active
  - follow-up complete
  - follow-up failed / overdue

#### Required product surfaces

- Follow-Up Director main screen
- queue / list view
- item detail / next action surface
- President visibility
- Sales visibility
- Service visibility where relevant

#### Required business logic

- follow-up trigger creation
- follow-up ownership
- due date logic
- status transitions
- overdue logic
- visibility of unresolved items
- write-back to shared operating record

#### Required A/B/C logic

- `A`: visible follow-up queue and manual next-step control
- `B`: stronger automation, prioritization, and cross-director visibility
- `C`: deepest workflow orchestration and intelligent follow-up routing

#### Required dependency rules

- rules with Estimator Director
- rules with Sales Director
- rules with Call Handling Director
- rules with Scheduling Director
- rules with Service Director
- rules with Reactivation Director

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- quote follow-up created automatically
- missed call follow-up created
- overdue follow-up visible to President
- closed follow-up removed correctly

### Follow-Up completion milestone

`Nothing important disappears from view once it enters the system.`

---

## 5. Scheduling Director

### Core purpose

Control appointment creation, appointment truth, and scheduling visibility with level-based automation.

### What must be built

#### Product identity

- lock business-facing name: `Scheduling Director`
- define booking states clearly
- define manual vs assisted vs deeper automated scheduling behavior

#### Required product surfaces

- Scheduling Director main screen
- appointment queue / calendar logic view
- scheduling truth / slot state view
- President visibility
- Service / Dispatch visibility

#### Required business logic

- appointment creation
- manual confirmation logic
- reschedule logic
- no-show logic
- route-to-dispatch logic
- route-to-service visibility
- route back to President truth

#### Required A/B/C logic

- `A`: manual scheduling truth with visible appointment control
- `B`: stronger coordination and more structured scheduling workflow
- `C`: highest operational depth and strongest scheduling automation behavior

#### Required dependency rules

- rules with Call Handling Director
- rules with Estimator Director
- rules with Dispatch Director
- rules with Service Director
- rules with Website Director where booking is web-connected

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- appointment created from call intake
- appointment created from accepted estimate
- manual confirmation path
- reschedule path
- no-show path

### Scheduling completion milestone

`Appointments become visible operational truth rather than scattered office memory.`

---

## 6. Dispatch Director

### Core purpose

Coordinate field movement, assignment visibility, and operational execution after scheduling has created work to be performed.

### What must be built

#### Product identity

- lock business-facing name: `Dispatch Director`
- normalize all old dispatcher naming into canonical director naming
- define dispatch states:
  - unassigned
  - assigned
  - en route
  - active
  - closed

#### Required product surfaces

- Dispatch Director main screen
- assignment / queue surface
- route / job movement surface
- President visibility
- Service visibility

#### Required business logic

- assignment creation
- assignment ownership
- route / sequencing logic
- job movement state logic
- route back to scheduling truth
- route back to service execution visibility

#### Required A/B/C logic

- `A`: visible dispatch truth and basic assignment control
- `B`: stronger routing structure and better operational coordination
- `C`: highest coordination depth and strongest workflow automation

#### Required dependency rules

- rules with Scheduling Director
- rules with Service Director
- rules with Call Handling Director where same-day work is created

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- assignment from confirmed appointment
- dispatch reassignment
- route / status progression
- completed job state visibility

### Dispatch completion milestone

`Work no longer sits between office and field without ownership or visibility.`

---

## 7. Service Director

### Core purpose

Show what is happening in real work delivery and make service execution visible as a controlled business lane.

### What must be built

#### Product identity

- lock business-facing name: `Service Director`
- define service states and review states
- define what “service truth” means in the system

#### Required product surfaces

- Service Director main screen
- service operations view
- service status / progress visibility
- President visibility
- links back to scheduling and dispatch

#### Required business logic

- service start / active / complete states
- issue / follow-up outcomes from field work
- route back to follow-up if unfinished
- route back to revenue / financial truth where needed

#### Required A/B/C logic

- `A`: visible service operations review and controlled workflow states
- `B`: stronger reporting, execution checkpoints, and operational depth
- `C`: fullest service-control depth and broadest connected execution visibility

#### Required dependency rules

- rules with Scheduling Director
- rules with Dispatch Director
- rules with Follow-Up Director
- rules with Revenue Control Director later

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- confirmed service execution path
- incomplete job path
- service-generated follow-up path
- service completion visibility in President layer

### Service completion milestone

`The business can see not only what was booked, but what actually happened in service delivery.`

---

## 8. Sales Director

### Core purpose

Keep lead-to-close ownership visible and make the sales lane measurable rather than informal.

### What must be built

#### Product identity

- lock business-facing name: `Sales Director`
- define lead / quote / follow-up / closed states inside the sales lane
- define how salesperson ownership appears

#### Required product surfaces

- Sales Director main screen
- sales pipeline / ownership view
- open opportunity visibility
- President visibility
- Follow-Up / Estimator linkage

#### Required business logic

- opportunity ownership
- estimate-to-sales linkage
- stage progression
- close / no-close / delayed outcomes
- handoff to follow-up
- handoff to scheduling where sale is accepted

#### Required A/B/C logic

- `A`: visible sales lane and open opportunity control
- `B`: stronger process structure and salesperson accountability
- `C`: fullest workflow control and performance visibility

#### Required dependency rules

- rules with Estimator Director
- rules with Follow-Up Director
- rules with Call Handling Director
- rules with Scheduling Director
- rules with Reactivation Director

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- quote converted to sales opportunity
- open opportunity followed correctly
- sale closed into scheduling
- delayed sale routed to follow-up

### Sales completion milestone

`The company can see who owns revenue opportunities, what stage they are in, and what must happen next.`

---

## 9. Cross-Director Wave 2 Work

These pieces must move across all five directors.

### Shared naming normalization

- old screen names must map cleanly to canonical directors
- public naming and internal naming must match

### Shared operational truth

- appointment truth
- follow-up truth
- dispatch truth
- service truth
- sales truth

All five must write into one connected operating record.

### Shared President visibility

- open items must appear clearly
- ownership must appear clearly
- unresolved states must be visible
- next action must be visible

### Shared dependency enforcement

- invalid combinations must be blocked
- weak combinations must be explained
- upgrades must unlock legitimate next capabilities

### Shared pricing presentation

- operational bundles must remain understandable
- users must understand why certain directors belong together

---

## 10. Recommended Wave 2 Internal Order

Inside Wave 2, the cleanest execution order is:

1. `Follow-Up Director normalization`
2. `Scheduling Director productization`
3. `Dispatch Director normalization`
4. `Service Director formalization`
5. `Sales Director completion`
6. `Wave 2 integrated dashboard visibility`
7. `Wave 2 integrated testing`

### Why this order works

- Follow-Up is the first continuity control
- Scheduling creates structured work truth
- Dispatch moves that work
- Service confirms what really happened
- Sales keeps revenue ownership visible through the process

---

## 11. Wave 2 Integrated Test Scenarios

Wave 2 should not be considered complete unless these flows work:

### Scenario 1

Estimate accepted -> follow-up closed -> appointment created -> scheduling visible

### Scenario 2

Call intake -> appointment request -> scheduled -> dispatched -> service active -> service completed

### Scenario 3

Open quote -> sales owner visible -> follow-up triggered -> sale accepted -> scheduling created

### Scenario 4

Appointment rescheduled -> dispatch updated -> President dashboard reflects new truth

### Scenario 5

Service not completed -> follow-up created -> owner visible -> President sees unresolved next action

---

## 12. Wave 2 Exit Condition

Wave 2 is complete when:

- Follow-Up Director is normalized and working
- Scheduling Director is working
- Dispatch Director is normalized and working
- Service Director is formalized and working
- Sales Director is complete and visible
- all five directors write to one operational truth
- the President dashboard can show the real flow from opportunity to scheduled and serviced work

At that point, AI-ABCX stops being only a powerful entry system and becomes a real operating system for service workflow.
