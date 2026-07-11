# AI-ABCX Estimator Director Product Spec

This document defines the first implementation-grade product specification for `Estimator Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Estimator Director is one of the first three launch-critical directors because it gives `AI-ABCX` a strong commercial entry point and connects directly to revenue creation.

---

## 1. Product Identity

### Public name

`Estimator Director`

### Executive owner

`CRO`

### Mission

Estimator Director captures quote demand from any relevant source, structures the estimate workflow, keeps estimate opportunities visible, and turns quoting into a controlled corporate operating lane under President oversight.

### Core promise

Estimator Director should not feel like a loose quoting widget.

It should promise:

- faster estimate handling
- fewer lost quote opportunities
- clearer quote visibility
- stronger follow-up discipline
- cleaner handoff into scheduling and sales
- President-level visibility into open revenue opportunities

---

## 2. Strategic Role Inside AI-ABCX

Estimator Director is the first major revenue threshold controller in the system:

`inquiry -> quote -> decision -> follow-up / booking / loss`

It is commercially important because:

- many service businesses buy tools to improve quote speed first
- quote visibility is directly tied to close rate
- estimate requests can come from almost every other director
- it creates a natural bridge into Follow-Up, Scheduling, Sales, and Revenue Control

Estimator Director can be:

- a standalone entry director
- part of a partial system
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `QuoteIQ`
- `ServiceTitan`
- `Jobber`
- `Housecall Pro`
- `FieldPulse`

### What they do well

- mobile-friendly estimate creation
- professional quote delivery
- quick acceptance path
- clean visual quote structure
- multiple estimate formats

### What AI-ABCX must match

- fast quote capture
- multiple estimate formats
- text / email / link quote delivery
- quote state visibility
- source-aware intake
- mobile-first customer acceptance

### Where AI-ABCX should beat them

- estimate requests can enter from more sources
- unresolved estimates remain visible to the President
- estimate workflow is tied to one connected operating system
- quote outcomes can trigger follow-up, scheduling, sales, and reporting
- quoting can be sold at `A / B / C` by operating depth, not only as one flat quoting tool

---

## 4. Ideal Customer Fit

Estimator Director is a strong fit for:

- companies losing quotes because response is too slow
- owner-led businesses where quote requests disappear
- service teams doing manual estimate follow-up
- companies that need structured quote visibility before they need full automation
- companies with inbound demand from ads, website, calls, referrals, or repeat clients

It is especially strong for:

- home services
- estimate-driven field services
- remodeling
- roofing
- plumbing
- HVAC
- electrical
- painting
- flooring
- cleaning and restoration
- solar and windows / doors

---

## 5. Required User Outcomes

Estimator Director must let a business owner say:

- “I can see every quote request.”
- “I know where each request came from.”
- “I know what still needs action.”
- “I know which estimates were accepted, lost, or need revision.”
- “I can see what should move into follow-up or scheduling next.”
- “The President Dashboard shows quote truth, not guesses.”

---

## 6. Functional Scope

Estimator Director must cover six major functions:

1. estimate request intake
2. source tracking
3. quote workflow control
4. customer-facing estimate delivery
5. decision-state visibility
6. handoff into next operating lane

---

## 7. Input Sources

Launch-required estimate sources:

- website form request
- AI call agent handoff
- manual internal estimate creation
- ad / campaign sourced request
- referral / social / direct link request
- existing-customer repeat estimate request

Each request must be tagged with source.

Minimum source tags:

- `website`
- `call_agent`
- `manual_internal`
- `ad_campaign`
- `social_or_referral`
- `existing_customer`

Optional later tags:

- `qr_code`
- `partner_referral`
- `email_campaign`
- `re-activation`

---

## 8. Estimate Workflow States

Minimum required states:

- `new_request`
- `intake_in_progress`
- `estimate_preparing`
- `estimate_sent`
- `waiting_on_customer`
- `accepted`
- `rejected`
- `revision_requested`
- `follow_up_needed`
- `scheduled_after_acceptance`
- `lost`

Each state must have:

- timestamp
- current owner
- next expected action
- President-visible summary

---

## 9. Estimate Formats

Estimator Director should launch with multiple estimate structures because this is one of the clearest competitive advantages in the market.

### Required estimate formats

#### 1. Standard estimate

- one quote
- one price
- fastest approval path

#### 2. Options estimate

- customer selects one or more services
- dynamic total behavior
- useful for upsells and add-ons

#### 3. Package estimate

- tiered offer structure
- good / better / best presentation
- decoy pricing behavior where appropriate

#### 4. Quick estimate

- ultra-fast quote send path
- designed for urgent or repeat jobs

### Level guidance

- `A` should support standard estimate clearly
- `B` should support standard + options
- `C` should support standard + options + package + stronger quick-estimate logic

If implementation allows all formats sooner, that is preferable.

---

## 10. Product Surfaces

Estimator Director needs visible product surfaces, not backend logic only.

### Surface 1. Estimate Intake View

Purpose:

- create estimate requests
- capture customer and property details
- capture request source
- classify urgency and service type

Required concepts:

- source
- customer name
- contact info
- address / service location
- service category
- requested work summary
- urgency
- attachment area
- quote complexity flag

### Surface 2. Estimator Director Main Screen

Purpose:

- show all estimate opportunities
- sort by status
- sort by urgency
- sort by age
- sort by source

Required widgets:

- new requests count
- estimate sent count
- follow-up needed count
- accepted count
- revision requested count
- lost count

### Surface 3. Estimate Record View

Purpose:

- show one estimate request from intake through outcome

Required sections:

- request summary
- source details
- estimate type
- current state
- customer-facing output
- revision history
- next action
- connected follow-up / sales / scheduling link

### Surface 4. Customer-Facing Quote View

Purpose:

- deliver a professional estimate
- support acceptance, rejection, or revision path

Required actions:

- accept
- request revision
- decline
- open supporting details / attachments

### Surface 5. President Dashboard Visibility

Purpose:

- surface quote truth to the President

Required summary:

- open estimate count
- pending customer decisions
- accepted estimates
- stuck estimates
- revision backlog
- source-based quote performance

---

## 11. Business Logic

Estimator Director must include the following logic at launch:

### Intake logic

- create request record from any source
- normalize customer identity
- attach source tag
- set initial workflow state

### Routing logic

- determine if request goes directly to estimating
- determine if request first needs qualification
- determine if request needs follow-up instead of quote send

### Status logic

- update state as workflow progresses
- create visible “stuck” condition for inactivity
- preserve revision history

### Handoff logic

- accepted estimate can create scheduling-ready state
- unresolved estimate can create follow-up-needed state
- strategic or high-value estimate can surface to Sales Director

### Visibility logic

- write estimate truth into shared operating record
- expose quote pipeline state to President Dashboard
- expose estimate accountability to CRO lane

---

## 12. Dependencies

Estimator Director can be sold independently, but it should still respect dependency logic.

### Can work standalone

Yes, if the business needs quote visibility and quote workflow without broader system automation.

### Strong recommended connections

#### With Call Handling Director

- calls create quote requests directly
- call outcomes enter estimate workflow without loss

#### With Website Director

- web forms feed estimate intake
- higher website levels create better estimator infrastructure

#### With Follow-Up Director

- unresolved / pending estimates automatically become follow-up lanes

#### With Scheduling Director

- accepted estimates can trigger booking path

#### With Sales Director

- larger or more complex estimates can route into active sales workflow

### Dependency rules

- `Estimator + Follow-Up` is a strong recommended bundle
- `Estimator + Scheduling` is required where accepted quotes must move directly into booking
- `Estimator + Website` is required when website-led quote capture is central
- `Estimator + Call Handling` is strongly recommended for call-heavy businesses

---

## 13. A / B / C Definition

### Level A

Positioning:

- practical quote-control entry level

Includes:

- estimate intake
- source tracking
- visible estimate states
- standard estimate flow
- accepted / lost / pending visibility
- President visibility into open estimate opportunities

Best for:

- owner-led teams
- simpler quote workflows
- companies needing structure first

### Level B

Positioning:

- connected quote operating level

Includes:

- everything in A
- stronger qualification structure
- options estimate support
- better follow-up routing
- stronger connection to Sales and Scheduling
- better accountability and workflow control

Best for:

- growing service teams
- multi-step quote handling
- businesses with meaningful quote backlog

### Level C

Positioning:

- advanced estimate orchestration level

Includes:

- everything in B
- package estimate logic
- advanced quick-estimate paths
- stronger conversion intelligence
- richer source-aware automation
- highest President and executive visibility

Best for:

- higher-volume estimate businesses
- upsell-heavy companies
- companies using estimates as a major revenue engine

---

## 14. Pricing Direction

Estimator Director should be priced as a director, not as abstract software access.

### Pricing principles

- no hidden costs
- transparent director pricing
- clear level upgrades
- stronger system recommendations can increase outcome, not just add software

### Pricing behavior

- standalone `A / B / C` monthly pricing
- bundle behavior with Follow-Up / Scheduling / Call Handling / Website
- full-system pricing path
- user-count effects later where necessary

Specific public dollar pricing should stay in pricing architecture and launch pricing docs, not hard-coded here.

---

## 15. Diagnostic Recommendation Logic

Estimator Director should be recommended when any of the following are true:

- business depends on quoting to win work
- quote response is slow
- owner cannot see open quotes clearly
- quote requests come from multiple sources
- business wants more structured follow-up
- business wants to turn calls or web leads into visible estimate workflow

Estimator Director recommendation strength should increase when:

- average ticket is meaningful
- quote backlog exists
- repeat estimate revisions are common
- business wants more upsell structure
- booking depends on quote approval

Estimator Director recommendation strength should decrease when:

- business does not operate through quoting
- work is mostly fixed-price, fixed-menu, instant-book style
- no meaningful estimate workflow exists

---

## 16. Recommended Diagnostic Questions

Estimator Director should be informed by questions such as:

- Do customers usually ask for a quote before they buy?
- How do quote requests usually come in today?
- What happens after someone asks for a quote?
- How fast do you usually respond with an estimate?
- Do quotes ever get lost or forgotten?
- Do customers often ask for revisions or options?
- Do you want estimates to lead directly into scheduling?
- Do different services need different quote styles?

These should be human-readable and multi-select where appropriate.

---

## 17. Dashboard Requirements

President Dashboard must be able to show:

- total open estimates
- estimate acceptance rate
- stuck estimate count
- revision-request count
- source performance
- quote-to-booking conversion where applicable

CRO lane must be able to show:

- estimate pipeline health
- conversion by source
- open revenue opportunity count
- quote aging
- follow-up-needed estimate count

---

## 18. Launch Test Scenarios

Minimum required test scenarios:

### Scenario 1. Website estimate request

- request enters from form
- source tagged correctly
- request visible in estimator intake
- quote prepared and sent

### Scenario 2. Call-origin estimate request

- AI call agent captures quote request
- request enters estimate workflow
- President can see new opportunity

### Scenario 3. Manual internal estimate

- owner or staff creates request manually
- estimate moves through normal state model

### Scenario 4. Revision requested

- customer requests change
- record moves into revision state
- follow-up / action visibility preserved

### Scenario 5. Accepted estimate

- accepted estimate creates next-stage routing
- scheduling-ready state appears where allowed

### Scenario 6. Unanswered estimate

- estimate ages into follow-up-needed state
- Follow-Up Director can act if active

### Scenario 7. Lost estimate

- estimate is marked lost
- reason preserved where possible
- source reporting still updates

---

## 19. Launch Exit Condition

Estimator Director is launch-ready only when:

1. estimate requests can enter from multiple sources
2. source is tracked
3. state model is working
4. customer-facing quote output exists
5. President can see open quote truth
6. accepted / unresolved estimates route correctly
7. A / B / C logic is documented and visible
8. recommendation engine can recommend it credibly

If any of those are missing, Estimator Director is not complete.

---

## 20. Build Priority Inside Wave 1

Estimator Director should be built first inside Wave 1 because it gives AI-ABCX:

- a strong competitive comparison point
- a visible revenue lane
- a simple commercial story
- a bridge into Follow-Up, Scheduling, Website, and Call Handling

Recommended implementation order:

1. intake model and state model
2. estimate record structure
3. customer-facing quote views
4. source-aware routing
5. dashboard visibility
6. A / B / C logic
7. cross-director handoff rules
8. integrated testing

---

## 21. Final Product Statement

Estimator Director is not just a quoting tool.

It is the `AI-ABCX` corporate estimate lane:

- demand comes in visibly
- quoting moves through controlled stages
- the President can see what is open
- follow-up does not disappear
- acceptance triggers the next operational path

That is the standard this director should be built to meet.
