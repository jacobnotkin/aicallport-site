# AI-ABCX Tier 1 Build Plan

This document turns the launch checklist into a concrete build plan for the first implementation wave.

Its purpose is to answer one practical question:

`What exactly has to be built first so AI-ABCX can become commercially real, technically testable, and structurally ready for launch?`

This plan is intentionally limited to the three highest-priority Tier 1 directors:

- Estimator Director
- Call Handling Director
- Website Director

These are the first three because they represent the strongest commercial entry paths into the system:

- estimate-led entry
- phone-led entry
- website-led entry

Together they create the strongest early revenue engine and the strongest system lock-in base.

---

## 1. Tier 1 Rule

Tier 1 should be treated as a gate.

Tier 2 work should not be treated as launch-critical implementation until Tier 1 has:

- usable product surfaces
- locked naming
- valid A / B / C definitions
- dependency logic
- dashboard visibility
- guided activation logic
- internal test scenarios

This does not mean Tier 2 thinking stops.

It means Tier 1 must become real first.

---

## 2. Tier 1 Sequence

Recommended build order:

1. Estimator Director
2. Call Handling Director
3. Website Director

Why this order:

- Estimator Director is the clearest outside benchmark gap and the strongest direct quote-to-revenue entry path.
- Call Handling Director is one of the strongest AI-ABCX differentiators and can feed both estimating and scheduling.
- Website Director is the strongest infrastructure and long-term lock-in path, especially when customers need a website that is built to support the rest of the system.

---

## 3. Shared Tier 1 Requirements

All three Tier 1 directors must follow the same system discipline.

### Shared requirement 1: Canonical naming

- one public-facing director name
- one internal config name
- one dashboard name
- one registry name

### Shared requirement 2: A / B / C architecture

Each Tier 1 director must have:

- Level A
- Level B
- Level C
- upgrade triggers
- downgrade rules if applicable

### Shared requirement 3: Dependency logic

Each Tier 1 director must clearly state:

- what it can do alone
- what it can do only in combination
- what other directors it can feed
- what other directors it can require

### Shared requirement 4: President visibility

Each Tier 1 director must show up in the President structure as:

- visible operational lane
- visible outcomes
- visible unresolved states
- visible next action path

### Shared requirement 5: Guided activation logic

Step 1 must eventually be able to:

- qualify whether the customer needs the director
- qualify what level the customer is ready for
- explain why that recommendation was made

### Shared requirement 6: Testing discipline

Each Tier 1 director must have:

- isolated test flows
- bundle test flows
- dashboard verification
- upgrade path testing

---

# 4. Estimator Director Build Plan

## Objective

Build the first commercially strong estimating module that can intake quote demand from multiple sources, generate estimate workflow visibility, and feed follow-up, sales, and scheduling.

## Why it is first

- strongest benchmark gap against outside companies
- easiest direct revenue story
- strong fit for service businesses already searching for better quoting
- can become one of the best acquisition entry products

## Current repo starting point

Current status: `Spec Only`

Current evidence:

- benchmark and planning direction already exist
- no clear standalone Estimator Director screen or app found
- no normalized estimator role in the strongest visible dashboard files

Practical implication:

- Estimator Director must be built almost from zero as a real product surface
- but it can attach to the current dashboard shell and guided activation flow

## Existing files likely to extend

- `/Users/yakovnotkin/Documents/New project/new-president-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/new-president-dashboard-preview.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`
- `/Users/yakovnotkin/Documents/New project/crm.html`
- `/Users/yakovnotkin/Documents/New project/step1.html`
- `/Users/yakovnotkin/Documents/New project/step2.html`
- `/Users/yakovnotkin/Documents/New project/step3.html`

## New files likely needed

- `/Users/yakovnotkin/Documents/New project/estimator-director.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-estimator-director-app.js`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_ABC_LEVEL_DEFINITION.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_WORKFLOW_SPEC.md`

## Required product surfaces

- estimate request intake
- source tagging
- estimate workflow board
- quote generation / quote result state
- accepted / pending / lost / follow-up-needed states
- write-back to CRM / President record

## Required logic blocks

- source capture:
  - website
  - ad lead
  - call lead
  - manual entry
  - external direct request
- estimate status model
- quote result model
- estimate-to-follow-up handoff
- estimate-to-sales handoff
- estimate-to-scheduling handoff

## Required A / B / C definition work

### Level A

- basic estimate intake
- manual or semi-assisted estimate workflow
- source visibility
- basic quote result tracking

### Level B

- stronger automation
- structured estimate qualification
- recommended quote structures
- better handoff rules to follow-up and sales

### Level C

- full intelligent estimate orchestration
- deeper source-aware routing
- stronger upsell structure
- tighter integration into sales, scheduling, and President control

## Required dependency rules

Estimator Director must explicitly define rules with:

- Sales Director
- Follow-Up Director
- Website Director
- Call Handling Director
- Scheduling Director

Key dependency principle:

- Estimator can exist as a commercial entry path
- but its highest-value use comes when it can hand off into Follow-Up, Sales, and Scheduling

## Required guided activation implications

Step 1 must learn:

- whether the business quotes work
- whether quotes are slow or manual
- whether pricing is inconsistent
- whether they want faster quote turnaround
- whether they want customers to approve estimates digitally

Step 2 recommendation must explain:

- why Estimator Director is included
- what level is recommended
- what business problem it solves

## Required pricing decisions

- standalone Estimator Director price
- bundle price when paired with Follow-Up / Sales / Scheduling
- level upgrade logic
- whether quote volume affects price

## Required tests

- manual estimate request
- website estimate request
- estimate request from call
- quote accepted path
- quote pending path
- quote rejected / no response path
- estimate escalated to follow-up
- estimate escalated to scheduling after acceptance

## Completion gate

Estimator Director is only complete when:

- it has a standalone working surface
- it appears in the President structure
- it writes meaningful record states
- it supports A / B / C logic
- it passes isolated and bundle tests

---

# 5. Call Handling Director Build Plan

## Objective

Build the AI-ABCX phone entry system that captures, qualifies, routes, escalates, and reports inbound demand while feeding CRM, estimating, scheduling, and follow-up.

## Why it is second

- one of the strongest AI-ABCX differentiators
- directly tied to missed lead prevention
- fits many service businesses immediately
- can stand alone or feed multiple other directors

## Current repo starting point

Current status: `Spec Only`

Current evidence:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_CALL_AGENT_AND_VOICE_STRUCTURE.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_CALL_AGENT_BEHAVIOR_PACKAGE_LIST.md`

Practical implication:

- conceptual system is strong
- product surface, dashboard logic, and pricing controls still need to be built

## Existing files likely to extend

- `/Users/yakovnotkin/Documents/New project/new-president-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`
- `/Users/yakovnotkin/Documents/New project/crm.html`
- `/Users/yakovnotkin/Documents/New project/step1.html`
- `/Users/yakovnotkin/Documents/New project/step2.html`
- `/Users/yakovnotkin/Documents/New project/step3.html`

## New files likely needed

- `/Users/yakovnotkin/Documents/New project/call-handling-director.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-call-handling-director-app.js`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_CALL_HANDLING_ABC_LEVEL_DEFINITION.md`

## Required product surfaces

- live call activity surface
- call outcome / qualification surface
- unresolved / escalated call queue
- multilingual behavior surface
- after-hours behavior visibility
- urgency / emergency logic visibility
- minute / usage reporting

## Required logic blocks

- inbound answer behavior
- qualification behavior
- intent capture
- urgency routing
- spam / invalid caller logic
- after-hours behavior
- multilingual behavior
- handoff to human or President record
- handoff to Estimator / Scheduling / Follow-Up where applicable

## Required A / B / C definition work

### Level A

- basic AI receptionist
- intake capture
- simple qualification
- clear call logging and escalation

### Level B

- stronger behavioral branching
- structured qualification
- appointment-aware or estimate-aware routing
- deeper workflow writing into the system

### Level C

- advanced multi-behavior call handling
- richer intent capture
- stronger service-specific decision trees
- more autonomous orchestration with scheduling, follow-up, and sales

## Required dependency rules

Call Handling Director must explicitly define rules with:

- Website Director
- Scheduling Director
- Follow-Up Director
- Estimator Director
- Sales Director

Key dependency principle:

- Call Handling can be sold independently
- but its outcome value grows dramatically when it feeds estimate, schedule, and follow-up paths

## Required guided activation implications

Step 1 must learn:

- whether calls are missed
- whether after-hours matters
- whether urgency matters
- whether they need multilingual support
- whether they need booking from calls
- whether calls mostly create leads, appointments, estimates, or information requests

Step 2 recommendation must explain:

- why Call Handling Director is included
- what call problems it solves
- what level of automation the company is actually ready for

## Required pricing decisions

- director fee
- usage logic
- minute logic
- free trial logic
- partner logic
- upgrade logic

## Required tests

- simple intake call
- quote/estimate inquiry call
- booking request call
- after-hours call
- urgent call
- multilingual call
- spam filtering call
- unresolved / escalation call

## Completion gate

Call Handling Director is only complete when:

- calls create visible system states
- unresolved cases are visible
- A / B / C logic is real
- minute / usage logic is understood
- it passes isolated and bundle tests

---

# 6. Website Director Build Plan

## Objective

Build the web infrastructure director that can analyze current websites, run in hosted or connector mode, collect business inputs for site creation, and support the rest of the system through lead capture and marketing-ready structure.

## Why it is third

- strongest infrastructure lock-in path
- can be an independent commercial entry
- supports marketing, advertising, lead generation, call handling, and estimating
- directly supports the user’s “custom system with future expansion” model

## Current repo starting point

Current status: `Partial`

Current evidence:

- Website Director appears in `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`
- strong public-facing landing work already exists
- website logic is already central in planning

Practical implication:

- Website Director has stronger positioning than implementation
- the product logic must now catch up to the concept

## Existing files likely to extend

- `/Users/yakovnotkin/Documents/New project/prelaunch-page.html`
- `/Users/yakovnotkin/Documents/New project/step1.html`
- `/Users/yakovnotkin/Documents/New project/step2.html`
- `/Users/yakovnotkin/Documents/New project/step3.html`
- `/Users/yakovnotkin/Documents/New project/new-president-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-config.js`

## New files likely needed

- `/Users/yakovnotkin/Documents/New project/website-director.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-website-director-app.js`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_WEBSITE_DIRECTOR_ABC_LEVEL_DEFINITION.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_WEBSITE_ANALYZER_AND_HOSTING_SPEC.md`

## Required product surfaces

- website analysis result surface
- hosted vs connector mode surface
- business website intake form
- preview / approval surface
- site style / brand preferences
- website monitoring / statistics surface

## Required logic blocks

- website present / missing branch
- current website quality branch
- hosted AI-ABCX website path
- external website connector path
- content / image / logo collection path
- generic content fallback path
- style selection path
- preview-before-activation logic

## Required A / B / C definition work

### Level A

- website connection / basic monitoring layer
- enough to support simpler system paths
- can work with current site if acceptable

### Level B

- stronger integration requirements
- improved lead / marketing / intake support
- more structured web control

### Level C

- highest readiness for deeper AI-ABCX integration
- full custom site / stronger infrastructure path when needed
- richer marketing and operating integration

## Required dependency rules

Website Director must explicitly define rules with:

- Marketing Director
- Advertising Director
- Lead Generation Director
- Call Handling Director
- Estimator Director

Key dependency principle:

- every web-connected system path should have Website Director
- but the director can run in two modes:
  - connector mode for external sites
  - hosted mode for AI-ABCX-built sites

## Required guided activation implications

Step 1 must learn:

- whether they already have a website
- if yes, what URL it uses
- whether it performs well enough for their goals
- whether they want marketing / ads / intake / lead capture through the website
- whether they need a new site or only connection and monitoring
- preferred style direction
- whether they have logo, content, and photos

Step 2 recommendation must explain:

- whether their current site is enough
- whether they need AI-ABCX hosted website infrastructure
- what Website Director level is recommended
- why that recommendation affects the rest of the system

## Required pricing decisions

- hosted mode pricing
- connector mode pricing
- level-based pricing
- upgrade pricing
- whether support/monitoring is included at every level

## Required tests

- no-website path
- current-website analysis path
- hosted website recommendation path
- connector path
- style selection path
- preview / approval path
- website + marketing integration path
- website + call handling + lead capture path

## Completion gate

Website Director is only complete when:

- it can analyze or configure the website path
- it can support both hosted and connector logic
- it has clear A / B / C logic
- it visibly supports system entry and expansion
- it passes isolated and bundle tests

---

## 7. Tier 1 Bundle Tests

These tests must exist before Tier 1 is considered complete as a group.

### Bundle test 1: Website-led path

- customer enters through website need
- system recommends Website Director
- website path also feeds lead capture and future expansion

### Bundle test 2: Call-led path

- customer enters through missed or unmanaged calls
- system recommends Call Handling
- qualified call feeds estimate or schedule path

### Bundle test 3: Estimate-led path

- customer enters through quote-speed or quote-quality pain
- system recommends Estimator
- estimate handoff feeds follow-up or scheduling

### Bundle test 4: Connected system path

- customer needs website + calls + estimating together
- all three directors create one connected outcome
- President dashboard shows real flow between them

---

## 8. Immediate Build Recommendation

The next implementation phase should do the following in order:

1. Create Estimator Director spec + surface
2. Create Call Handling Director surface from existing specs
3. Create Website Director product surface and mode logic
4. Normalize all three in dashboard config and naming
5. Add Step 1 qualification hooks for all three
6. Define pricing architecture for all three
7. Run isolated and bundle tests

---

## 9. Practical Conclusion

If Tier 1 is completed well, AI-ABCX becomes much more than a concept.

It becomes a system with three strong commercial doors:

- “Help me quote better.”
- “Help me handle calls better.”
- “Help me get the right website infrastructure.”

That is enough to create real market entry while the rest of the launch directors are being finished around it.
