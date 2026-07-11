# AI-ABCX Director Build Schedule

This document converts the launch board into a practical execution schedule.

It answers one question:

`In what order should we finish AI-ABCX so the system becomes launch-ready without building the wrong things too early?`

This schedule assumes:

- the President-centered operating shell stays in place
- all launch directors are intended to exist
- we should prioritize strongest commercial entry points first
- dependencies must be respected

It should be read together with:

- [AI_ABCX_DIRECTOR_CODEBASE_BASELINE.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_CODEBASE_BASELINE.md)
- [AI_ABCX_DIRECTOR_LAUNCH_BOARD.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_LAUNCH_BOARD.md)
- [AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md)

---

## 1. Planning Rule

This is not a pure engineering sequence.

It is a launch sequence.

That means the order is based on:

1. commercial importance
2. dependency strength
3. what already exists in code
4. what unlocks the largest number of valid bundles
5. what can be tested together as real workflows

---

## 2. Final Launch Director Set

This is the cleanest working launch set based on current planning.

### Revenue / front-door directors

- Estimator Director
- Call Handling Director
- Website Director
- Sales Director
- Follow-Up Director

### Operations directors

- Scheduling Director
- Dispatch Director
- Service Director

### Growth directors

- Lead Generation Director
- Reactivation Director
- Marketing Director
- Advertising Director
- SEO Director

### Executive / finance / control directors

- Strategy Director
- Executive Reporting Director
- Accountability Director
- Revenue Control Director
- Reconciliation Director

### Customer / trust directors

- Support Director
- Customer Success Director
- Retention Director
- Reviews / Referrals Director

### Improvement directors

- Director of Feedback
- Director of Analysis
- Director of Optimization
- Director of System Improvement

### Governance directors

- Compliance Director
- Approval Director
- Risk Director

### Later-depth but not first launch-critical

- Accounting Director
- Payroll Director

---

## 3. Build Phases

## Phase 0: Normalize What Already Exists

Goal:

Turn the current shell and built surfaces into a stable base before adding major new modules.

### Scope

- President Dashboard
- Follow-Up Director
- Dispatch Director
- Sales Director
- shared role/config/registry naming
- CRM/shared-record assumptions

### Required outcomes

- lock canonical naming for all launch directors
- align config, docs, previews, and visible screens
- document exact source-of-truth data flow
- define shared UI patterns for director dashboards
- define shared A/B/C labeling rules

### Why this phase comes first

Because otherwise every new director will be built against a moving shell.

### Exit gate

- built directors are normalized
- shared structures are stable
- no major naming ambiguity remains

---

## Phase 1: Build the Strongest Entry Bundle

Goal:

Finish the three directors most likely to win customers first.

### Directors

- Estimator Director
- Call Handling Director
- Website Director

### Why these three come first

They create the strongest front-door commercial offer:

- website presence
- call capture
- quote capture

Together they can generate and convert demand.

### Required outcomes

#### Estimator Director

- request intake from website
- request intake from call flow
- quote workflow
- accepted / not accepted states
- Follow-Up visibility
- Sales visibility
- President visibility
- A/B/C definitions
- pricing logic

#### Call Handling Director

- AI receptionist behaviors
- qualification
- urgency / after-hours paths
- multilingual behavior
- booking handoff behavior
- quote / estimate request routing
- usage reporting
- A/B/C definitions
- pricing logic

#### Website Director

- hosted website path
- existing-website connector path
- website analyzer
- generated website preview logic
- mandatory-website logic for higher levels
- intake form / lead capture compatibility
- A/B/C definitions
- pricing logic

### Required integrated tests

- customer lands on website, submits request, reaches estimator
- customer calls in, request is captured, routed, and followed up
- website analysis recommends connector vs hosted site
- President can see status from the dashboard shell

### Exit gate

- the system has a credible commercial front door
- the first strong bundle is real and testable

---

## Phase 2: Finish the Core Operations Chain

Goal:

Make sure work can move from intake into real operational control.

### Directors

- Scheduling Director
- Dispatch Director
- Service Director
- Revenue Control Director

### Why this phase comes second

A strong front end without operational execution becomes a demo, not a product.

### Required outcomes

#### Scheduling Director

- manual and automated scheduling paths
- A/B/C rules
- dependency rules with Call Handling and Website
- President-truth scheduling states

#### Dispatch Director

- canonical normalization from current dispatcher surface
- appointment routing / job movement
- dependency rules with Scheduling and Service

#### Service Director

- service workflow oversight
- job state visibility
- outcomes / completion / bottleneck visibility

#### Revenue Control Director

- amount-paid truth
- final-business-reality visibility
- dependency with completed jobs and follow-up outcomes

### Required integrated tests

- lead becomes appointment
- appointment becomes dispatched work
- work becomes service outcome
- revenue truth updates correctly
- President sees operating lane clearly

### Exit gate

- intake-to-execution path is real
- operational truth is visible to the President

---

## Phase 3: Finish the Revenue Growth Chain

Goal:

Move from “the system works” to “the system grows the business.”

### Directors

- Lead Generation Director
- Reactivation Director
- Marketing Director
- Advertising Director
- SEO Director

### Why this phase comes third

Once the intake and operations chain works, growth directors can produce scalable value instead of noise.

### Required outcomes

#### Lead Generation Director

- source tracking
- inquiry classification
- conversion visibility
- handoff to Sales / Call Handling / Estimator

#### Reactivation Director

- past-customer reactivation paths
- dormant-lead logic
- follow-up and conversion reporting

#### Marketing Director

- A/B/C definitions
- output visibility
- system-wide message / campaign role

#### Advertising Director

- campaign-state visibility
- spend / source / result logic
- handoff to Lead Generation / Website / Call Handling

#### SEO Director

- website-dependent visibility
- search-readiness and improvement reporting

### Required integrated tests

- ad / seo / campaign source enters lead system
- lead source is preserved through sale
- reactivation path produces new activity
- President sees marketing and growth lanes clearly

### Exit gate

- the system can attract, classify, and grow demand

---

## Phase 4: Finish Executive Control and Trust Layers

Goal:

Make AI-ABCX feel like a true corporate operating system, not just a collection of smart tools.

### Directors

- Strategy Director
- Executive Reporting Director
- Accountability Director
- Support Director
- Customer Success Director
- Retention Director
- Reviews / Referrals Director

### Why this phase comes fourth

These directors strengthen control, clarity, retention, and trust after the growth and operations spine is already real.

### Required outcomes

#### Strategy Director

- goals
- monthly direction
- President approval / correction logic

#### Executive Reporting Director

- clear daily / weekly / monthly summaries
- cross-director visibility

#### Accountability Director

- executive and staff accountability scoring
- performance visibility

#### Support / Customer Success / Retention

- visible post-sale care
- complaint / support / success lanes
- retention signals

#### Reviews / Referrals

- reputation requests
- referral opportunities
- commercial feedback loop

### Required integrated tests

- operational outcomes produce reporting
- reporting drives recommendations
- support events route visibly
- retention and review loops function correctly

### Exit gate

- the system feels managed, visible, and trustworthy

---

## Phase 5: Finish Improvement and Governance Layers

Goal:

Add the self-improving and protective layers that make the system mature.

### Directors

- Director of Feedback
- Director of Analysis
- Director of Optimization
- Director of System Improvement
- Compliance Director
- Approval Director
- Risk Director

### Why this phase comes fifth

These directors are powerful, but they work best after the commercial and operational core is already stable.

### Required outcomes

- visible feedback intake
- analysis summaries
- optimization recommendations
- system-improvement tracking
- compliance gates
- approval states
- risk states

### Required integrated tests

- issue enters feedback lane
- feedback becomes analysis
- analysis produces optimization
- governance states affect workflow where appropriate

### Exit gate

- the system can observe itself and improve without losing control

---

## Phase 6: Add Back-Office Expansion

Goal:

Finish the deeper financial/administrative lanes that may be valuable but are not the strongest launch differentiators.

### Directors

- Accounting Director
- Payroll Director

### Why this phase is later

These are useful, but they are less important than:

- lead capture
- calls
- estimates
- scheduling
- operations
- marketing
- President control

### Exit gate

- back-office depth is added without distracting from launch-critical value

---

## 4. Build Order by Individual Director

If we want one exact ordered list, the best current order is:

1. Follow-Up Director normalization
2. Dispatch Director normalization
3. Sales Director normalization
4. Estimator Director
5. Call Handling Director
6. Website Director
7. Scheduling Director
8. Service Director
9. Revenue Control Director
10. Lead Generation Director
11. Reactivation Director
12. Marketing Director
13. Advertising Director
14. SEO Director
15. Strategy Director
16. Executive Reporting Director
17. Accountability Director
18. Support Director
19. Customer Success Director
20. Retention Director
21. Reviews / Referrals Director
22. Director of Feedback
23. Director of Analysis
24. Director of Optimization
25. Director of System Improvement
26. Compliance Director
27. Approval Director
28. Risk Director
29. Accounting Director
30. Payroll Director

---

## 5. What This Means Right Now

The next three most important truths are:

1. the shell is already real, so we are not starting from zero
2. the strongest missing commercial module is `Estimator Director`
3. the strongest system bundle after that is:
   - Call Handling Director
   - Website Director
   - Scheduling Director
   - Follow-Up Director

That bundle is where AI-ABCX starts becoming very hard to compete with.

---

## 6. Recommended Next Document

The next best planning step after this schedule is:

`one execution matrix with one row per director and these columns:`

- owner executive
- launch phase
- current status
- required screens
- required logic
- dependencies
- pricing decision
- test scenario

That would become the working implementation board for the rest of the project.

