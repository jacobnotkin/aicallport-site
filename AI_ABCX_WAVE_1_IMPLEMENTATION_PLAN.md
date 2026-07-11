# AI-ABCX Wave 1 Implementation Plan

This document converts the build sequence into the first practical implementation block.

Wave 1 is the commercial entry layer.

Its purpose is to make `AI-ABCX` immediately sellable through the strongest first-offer functions.

---

## 1. Wave 1 Scope

Wave 1 includes:

1. `Estimator Director`
2. `Call Handling Director`
3. `Website Director`

These three directors should be treated as the first launch-critical product set because they:

- are easiest to explain to owners
- create direct visible value
- support both standalone and bundled entry offers
- create the strongest bridge into the rest of the system

---

## 2. Wave 1 Objective

At the end of Wave 1, AI-ABCX should be able to do all of the following:

- sell through an estimating-led offer
- sell through an AI receptionist / call-handling offer
- sell through a website-led offer
- support custom system recommendations built around those entry paths
- connect each entry path back to the President-centered corporate structure

Wave 1 is complete only when those offers are not just described, but actually operable.

---

## 3. Wave 1 Completion Standard

Each Wave 1 director is complete only if it has:

1. a clear business-facing identity
2. a real screen or product surface
3. A/B/C logic
4. dependency logic
5. pricing logic
6. dashboard visibility
7. a working test scenario

If one of those is missing, the director is not complete.

---

## 4. Estimator Director

### Core purpose

Capture quote demand from multiple sources and turn it into a structured estimate workflow that can move toward sale, follow-up, or booking.

### What must be built

#### Product identity

- lock business-facing name: `Estimator Director`
- define what Level A, Level B, and Level C mean
- define what “request captured” means
- define what “estimate created” means
- define what “estimate accepted” means

#### Input sources

- website form
- AI call agent handoff
- manual internal entry
- ad / campaign source
- direct referral / social / link source

#### Required product surfaces

- Estimator Director main screen
- request intake screen
- estimate workflow state view
- estimate result / quote output view
- President dashboard visibility for estimate status
- Sales / Follow-Up visibility for open quotes

#### Required business logic

- request source tagging
- quote stage tracking
- accepted / pending / declined / expired state logic
- conversion into follow-up workflow
- conversion into scheduling workflow where allowed
- write-back to shared CRM / operating record

#### Required A/B/C logic

- `A`: basic quote capture and visible estimate workflow
- `B`: deeper quote structuring, better routing, stronger integration with sales / follow-up / scheduling
- `C`: advanced quoting intelligence, stronger automation, and broader workflow coordination

#### Required dependency rules

- valid standalone Estimator Director path
- rules with Sales Director
- rules with Follow-Up Director
- rules with Call Handling Director
- rules with Website Director
- rules with Scheduling Director when estimate becomes booked work

#### Required pricing decisions

- standalone A/B/C pricing
- bundle pricing behavior
- full-system upgrade behavior

#### Required testing

- estimate request from website
- estimate request from AI call intake
- manual internal estimate creation
- quote accepted path
- quote pending / follow-up path
- quote-to-scheduling path

### Estimator completion milestone

`A company can enter AI-ABCX through quoting alone and see a real structured estimate workflow.`

---

## 5. Call Handling Director

### Core purpose

Receive calls, understand intent, qualify the caller, preserve visibility, and route the conversation into the correct business workflow.

### What must be built

#### Product identity

- lock business-facing name: `Call Handling Director`
- define A/B/C levels in plain business language
- define visible outcomes:
  - intake captured
  - lead qualified
  - appointment proposed
  - escalation triggered
  - unresolved follow-up needed

#### Required product surfaces

- Call Handling Director main screen
- behavior / package control surface
- activity / outcomes reporting surface
- President dashboard visibility
- escalated call visibility
- follow-up-needed visibility

#### Required business logic

- 24/7 answer logic
- spam filter logic
- after-hours logic
- urgency logic
- multilingual logic
- lead qualification logic
- appointment-intent handling
- CRM write-back
- escalation path to human / President visibility

#### Required A/B/C logic

- `A`: basic receptionist, intake, call capture, and visible routing
- `B`: stronger qualification, better workflow branching, scheduling connection
- `C`: broadest intent capture, richer automation, and deeper workflow orchestration

#### Required dependency rules

- standalone call-handling path
- rules with Website Director
- rules with Scheduling Director
- rules with Follow-Up Director
- rules with Estimator Director
- rules with Sales Director

#### Required pricing decisions

- director fee
- usage / minute logic
- trial logic
- bundle behavior
- upgrade behavior

#### Required testing

- simple inbound intake call
- quote request call
- appointment request call
- after-hours call
- urgent call
- multilingual call
- unresolved issue escalation

### Call Handling completion milestone

`A company can enter AI-ABCX through calls alone and see a real visible call-to-workflow system.`

---

## 6. Website Director

### Core purpose

Provide the website layer that either powers the system directly through an AI-ABCX website or connects the customer’s existing site into the AI-ABCX operating model.

### What must be built

#### Product identity

- lock business-facing name: `Website Director`
- define two operating paths:
  - AI-ABCX-hosted website path
  - external website connector path
- define what Level A, B, and C mean for each path

#### Required product surfaces

- Website Director main screen
- website analyzer / website status view
- hosted website preview / builder path
- external website connector path
- intake / logo / style / content setup path
- President dashboard website visibility

#### Required business logic

- website status analysis
- hosted-site generation path
- external-site connection rules
- lead capture compatibility rules
- form / tracking / CTA / contact readiness checks
- marketing and call-handling compatibility checks
- monitoring / statistics visibility

#### Required A/B/C logic

- `A`: basic website control / visibility layer
- `B`: stronger system-ready structure and marketing / call workflow support
- `C`: fullest website-system integration and highest readiness for advanced automation

#### Required dependency rules

- all website-involving configurations must include Website Director
- rules for external site at A
- rules for external site at B/C where allowed
- rules where AI-ABCX hosted site becomes required
- rules with Marketing Director
- rules with Advertising Director
- rules with SEO Director
- rules with Call Handling Director
- rules with Lead Generation Director

#### Required pricing decisions

- hosted website A/B/C pricing
- external connector A/B/C pricing
- upgrade path from external to hosted
- upgrade path from B to C

#### Required testing

- external website analysis
- hosted website generation intake
- hosted website preview generation
- external website connector validation
- Website Director with Marketing
- Website Director with Call Handling
- Website Director with Lead Generation

### Website completion milestone

`A company can enter AI-ABCX through website improvement or website creation and still become part of the full system.`

---

## 7. Cross-Director Wave 1 Work

These pieces must move in parallel across all three directors.

### Shared naming

- all screens, docs, and registry naming must match the canonical director names

### Shared CRM / operating record logic

- every director must write to the same truth structure

### Shared President visibility

- every Wave 1 director must produce visible outcomes in the President layer

### Shared recommendation logic

- Step 1 diagnostic must be able to recommend each Wave 1 director:
  - as standalone
  - as bundle
  - as full-system entry point

### Shared pricing presentation

- pricing must remain dollar-based
- no AI-credit confusion in public-facing presentation
- no hidden-cost positioning must remain visible

---

## 8. Recommended Wave 1 Internal Order

Even inside Wave 1, the cleanest execution order is:

1. `Estimator Director`
2. `Call Handling Director`
3. `Website Director`
4. `Cross-director dashboard visibility`
5. `Cross-director recommendation and bundle logic`
6. `Wave 1 integrated testing`

### Why this order works

- Estimator gives the clearest benchmark pressure and commercial gap
- Call Handling is the strongest intake and differentiation layer
- Website Director then turns the whole entry structure into a connected system

---

## 9. Wave 1 Integrated Test Scenarios

Wave 1 should not be considered complete unless these integrated flows work:

### Scenario 1

Website visit -> estimate request -> estimate created -> follow-up visible

### Scenario 2

Inbound call -> qualified by AI call handling -> estimate created -> President visibility updated

### Scenario 3

Customer with weak website -> Website Director recommendation -> hosted-site path shown -> custom configuration produced

### Scenario 4

Customer with strong existing website -> Website Director external connector path -> call handling and lead capture compatibility confirmed

### Scenario 5

Step 1 diagnostic -> intent-fit configuration -> improved configuration -> advanced configuration -> Wave 1 pricing shown clearly

---

## 10. Wave 1 Exit Condition

Wave 1 is complete when:

- Estimator Director is real
- Call Handling Director is real
- Website Director is real
- the three directors can be recommended by Step 1
- the three directors can appear in pricing clearly
- the three directors can be tested in real scenarios
- the President dashboard can show their outcomes

At that point, AI-ABCX becomes commercially real even before the full system depth is finished.
