# AI-ABCX Wave 3 Implementation Plan

This document defines the third implementation block after Waves 1 and 2.

Wave 3 is the growth and expansion layer.

Its purpose is to help a company grow after the core intake and operating chain are already functioning.

---

## 1. Wave 3 Scope

Wave 3 includes:

1. `Lead Generation Director`
2. `Reactivation Director`
3. `Marketing Director`
4. `Advertising Director`
5. `SEO Director`

These directors should be treated as the first real growth engine around the core system.

Wave 1 gets customers into the system.

Wave 2 keeps operations visible and controlled.

Wave 3 increases demand, recovers missed value, and creates stronger growth outcomes.

---

## 2. Wave 3 Objective

At the end of Wave 3, AI-ABCX should be able to do all of the following:

- create new demand
- recover old demand
- improve ongoing customer acquisition
- connect website traffic to real system workflows
- connect ads and marketing to actual business outcomes
- recommend stronger growth configurations based on the company’s intent and readiness

Wave 3 is complete only when AI-ABCX can demonstrate a real growth loop instead of only intake and operations control.

---

## 3. Wave 3 Completion Standard

Each Wave 3 director is complete only if it has:

1. a clear business-facing identity
2. a real screen or product surface
3. A/B/C logic
4. dependency logic
5. pricing logic
6. measurable output visibility
7. at least one isolated test scenario
8. at least one integrated growth workflow test

If one of those is missing, the director is still incomplete.

---

## 4. Lead Generation Director

### Core purpose

Capture incoming opportunities from multiple demand sources and turn them into visible, trackable demand inside the system.

### What must be built

#### Product identity

- lock business-facing name: `Lead Generation Director`
- define what counts as a lead
- define lead-source classes
- define lead quality states

#### Required product surfaces

- Lead Generation Director main screen
- source performance view
- captured lead queue
- source-to-outcome visibility
- President dashboard visibility

#### Required business logic

- lead source tagging
- source channel classification
- lead quality status
- route into Sales / Estimator / Call Handling
- route into Follow-Up when unresolved
- route into Website / Marketing / Advertising performance reporting

#### Required A/B/C logic

- `A`: visible lead capture and source classification
- `B`: stronger source analysis and cleaner lead routing
- `C`: deepest source intelligence and strongest cross-director orchestration

#### Required dependency rules

- rules with Website Director
- rules with Advertising Director
- rules with Marketing Director
- rules with Call Handling Director
- rules with Sales Director
- rules with Estimator Director

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- lead from website form
- lead from ad path
- lead from call path
- lead routed to sales
- lead routed to estimate request

### Lead Generation completion milestone

`Demand sources become visible, classified, and connected to real downstream action.`

---

## 5. Reactivation Director

### Core purpose

Recover inactive leads, old quotes, missed opportunities, and dormant customers that still have revenue potential.

### What must be built

#### Product identity

- lock business-facing name: `Reactivation Director`
- define reactivation targets:
  - old quote
  - inactive lead
  - past customer
  - no-response follow-up

#### Required product surfaces

- Reactivation Director main screen
- dormant audience queue
- campaign / sequence state view
- outcome visibility
- President dashboard visibility

#### Required business logic

- inactivity detection
- audience grouping
- reactivation trigger rules
- response tracking
- route back into Sales / Follow-Up / Scheduling where needed

#### Required A/B/C logic

- `A`: visible reactivation queue and manual recovery structure
- `B`: stronger sequence logic and better targeting
- `C`: deepest recovery automation and richer cross-system orchestration

#### Required dependency rules

- rules with Follow-Up Director
- rules with Sales Director
- rules with Marketing Director
- rules with Website Director
- rules with Call Handling Director where re-engagement creates calls

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- dormant quote recovery
- inactive lead reactivation
- past-customer reactivation
- reactivated lead routed into active sales flow

### Reactivation completion milestone

`The system can recover value that would otherwise sit dead in the database.`

---

## 6. Marketing Director

### Core purpose

Coordinate the business’s customer-facing marketing activity and move it from scattered effort into structured growth control.

### What must be built

#### Product identity

- lock business-facing name: `Marketing Director`
- convert the existing marketing specs into a real operating module
- define what marketing controls at launch

#### Required product surfaces

- Marketing Director main screen
- campaign / initiative visibility
- messaging / offer visibility
- outcome reporting surface
- President visibility

#### Required business logic

- campaign grouping
- offer grouping
- lead / result connection
- route into Lead Generation
- route into Reactivation where relevant
- route into Website and Advertising reporting

#### Required A/B/C logic

- `A`: visible marketing control and simple structured activity
- `B`: stronger campaign logic and better connected outcomes
- `C`: deepest marketing orchestration and strongest system integration

#### Required dependency rules

- rules with Website Director
- rules with Lead Generation Director
- rules with Advertising Director
- rules with SEO Director
- rules with Call Handling Director where campaigns create phone demand

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- marketing campaign created
- marketing campaign tied to lead outcomes
- marketing recommendation shown in configuration logic

### Marketing completion milestone

`Marketing becomes a structured business lane, not just disconnected activity.`

---

## 7. Advertising Director

### Core purpose

Control paid demand generation and connect it to real lead, call, estimate, and booking outcomes.

### What must be built

#### Product identity

- lock business-facing name: `Advertising Director`
- define what advertising controls at launch
- define outcome states for paid campaigns

#### Required product surfaces

- Advertising Director main screen
- campaign visibility view
- spend / result view
- source outcome reporting
- President visibility

#### Required business logic

- campaign source tagging
- paid source classification
- route into Lead Generation
- route into Call Handling where phone-heavy ads are used
- route into Website Director where landing path matters
- connect ad outcomes to sales and estimate creation

#### Required A/B/C logic

- `A`: visible paid demand structure
- `B`: stronger control and clearer source-to-result visibility
- `C`: deepest campaign orchestration and strongest system-wide coordination

#### Required dependency rules

- rules with Website Director
- rules with Lead Generation Director
- rules with Marketing Director
- rules with Call Handling Director
- rules with Estimator Director where ads push quotes

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- paid source lead captured
- paid source call captured
- ad source routed into estimate or sales workflow
- ad results visible in President layer

### Advertising completion milestone

`Paid demand is no longer blind spend; it becomes visible, attributable, and controllable.`

---

## 8. SEO Director

### Core purpose

Improve discoverability and organic lead opportunity while keeping SEO tied to real business outcomes instead of vanity metrics.

### What must be built

#### Product identity

- lock business-facing name: `SEO Director`
- define what SEO visibility means at launch
- define what SEO improvements are visible in system terms

#### Required product surfaces

- SEO Director main screen
- website / page visibility review
- issue / opportunity reporting
- organic performance visibility
- President visibility

#### Required business logic

- website readiness checks
- page / structure improvement opportunities
- local discoverability visibility
- route into Website Director where fixes are needed
- route into Lead Generation reporting where organic traffic matters

#### Required A/B/C logic

- `A`: visible SEO health and issue discovery
- `B`: stronger structure and performance control
- `C`: deepest optimization visibility and strongest connected reporting

#### Required dependency rules

- rules with Website Director
- rules with Marketing Director
- rules with Lead Generation Director

#### Required pricing decisions

- standalone price logic
- bundle logic
- upgrade logic

#### Required testing

- site analyzed for SEO readiness
- SEO issues surfaced clearly
- SEO recommendations tied back to Website Director and lead outcomes

### SEO completion milestone

`SEO becomes part of the growth system instead of an invisible outside task.`

---

## 9. Cross-Director Wave 3 Work

These pieces must move across all five directors.

### Shared growth truth

- source truth
- campaign truth
- recovered-demand truth
- website-performance truth
- organic / paid lead visibility

### Shared President visibility

- what is creating demand
- what is recovering demand
- what channels are weak
- what channels deserve stronger investment

### Shared recommendation engine

- Step 1 must be able to recommend growth layers based on:
  - owner intent
  - current traffic / lead condition
  - website condition
  - call dependence
  - expansion goals

### Shared pricing presentation

- growth bundles must be understandable
- upgraded growth options must clearly show why they improve outcomes

---

## 10. Recommended Wave 3 Internal Order

Inside Wave 3, the cleanest execution order is:

1. `Lead Generation Director`
2. `Marketing Director`
3. `Advertising Director`
4. `SEO Director`
5. `Reactivation Director`
6. `Wave 3 integrated reporting`
7. `Wave 3 integrated testing`

### Why this order works

- Lead Generation is the growth truth anchor
- Marketing and Advertising then generate and shape demand
- SEO strengthens the long-term demand layer
- Reactivation then recovers already-owned opportunity

---

## 11. Wave 3 Integrated Test Scenarios

Wave 3 should not be considered complete unless these flows work:

### Scenario 1

Website traffic -> lead created -> source tagged -> routed to sales or estimate

### Scenario 2

Ad-driven phone lead -> Call Handling captures it -> lead source preserved -> routed correctly

### Scenario 3

Dormant quote -> reactivation triggered -> customer re-engages -> follow-up active again

### Scenario 4

Weak website -> Website Director + SEO Director recommendations -> stronger growth configuration shown

### Scenario 5

Intent-fit configuration vs improved vs advanced configuration shows how more growth directors change the projected outcome

---

## 12. Wave 3 Exit Condition

Wave 3 is complete when:

- new demand is attributable
- old demand can be recovered
- marketing and advertising are visible as operating lanes
- SEO is tied to real business outcomes
- President can see not only operations, but where future growth is coming from

At that point, AI-ABCX becomes not only an operating system, but a visible growth system.
