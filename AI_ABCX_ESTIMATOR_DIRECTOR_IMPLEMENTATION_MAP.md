# AI-ABCX Estimator Director Implementation Map

This document is the strict implementation map for `Estimator Director`.

It is not the market benchmark file.

It is not the pricing file.

It is not the A/B/C capability definition file.

Its job is simpler:

`show exactly what already exists in code, what should stay, what should be removed, what should be renamed, and what must be built next before Estimator Director is launch-ready`

---

## 1. Current Reality

Estimator Director is **not missing**.

The repo already contains a real estimator surface:

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

It already includes:

- branded Estimator Director shell
- left navigation
- active quote workspace
- assigned work board
- personal calendar
- open quote queue
- outcome entry
- workflow state logic
- shared record integration

The correct status for Estimator Director remains:

- `Partial`

This matches:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_DIRECTOR_EXECUTION_MATRIX.md`

---

## 2. Source Files That Matter

### Core UI

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

### Shared job / workflow logic

- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

### Shared product structure

- `/Users/yakovnotkin/Documents/New project/ai-abc-data.js`
- `/Users/yakovnotkin/Documents/New project/ai-abc-config.js`
- `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`

### President-side connected visibility

- `/Users/yakovnotkin/Documents/New project/new-president-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/president-follow-up.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-follow-up-app.js`

### Existing estimator planning docs

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_PRODUCT_SPEC.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_BENCHMARK_AND_SCOPE.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_COMPETITIVE_GAP_PLAN.md`

---

## 3. What Already Exists In Code

The current estimator dashboard already has meaningful implementation value.

### In the current screen

From `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`:

- title and product identity exist
- estimator-specific sidebar exists
- personal queue model exists
- active quote workspace exists
- open quote queue exists
- quote outcome entry exists
- availability editor exists
- President-view link exists
- follow-up queue action exists
- workflow panel exists
- summary cards exist

### Existing visible sections

- `Active Quote Workspace`
- `Assigned Work Board`
- `Personal Calendar`
- `Open Quote Queue`
- `Quote Outcome Entry`
- `Live Estimate Workflow`

### Existing workflow logic

The page already contains estimator-specific workflow functions:

- `buildEstimatorFlowState`
- `buildEstimatorJobContext`
- `applyJobContext`

And already recognizes meaningful state values such as:

- `awaiting_worker_assignment`
- `awaiting_worker_confirmation`
- `awaiting_customer_confirmation`
- `follow_up_needed`
- `rerouted`
- `completed`
- `canceled`
- `no_show`

This means the dashboard is not a mockup anymore.

It is a real partial estimator system.

---

## 4. What Must Stay

These parts should stay and be improved, not thrown away.

### Keep the personal-role shell

The idea that the estimator sees:

- their own queue
- their own assignments
- their own availability
- their own quote outcomes

is correct.

That is good director logic.

### Keep the active quote workspace pattern

The central workspace idea is strong because it can become the main estimator operating surface for:

- request intake
- builder state
- delivery state
- customer decision
- next action

### Keep the workflow state engine

The current workflow-state logic should be refactored, not deleted.

It already gives us:

- state transitions
- queue classification
- visibility triggers
- connected outcome behavior

### Keep the President connection

Estimator Director should absolutely remain connected to:

- President visibility
- follow-up handoff
- shared job records

That is one of the main places where AI-ABCX can beat isolated estimator products.

---

## 5. What Must Be Removed

These parts conflict with the current product direction and should be removed from estimator surfaces.

### Remove rollout-stage framing

The old rollout logic is no longer valid.

Estimator Director should not frame itself around:

- Stage A
- Stage B
- Stage C
- Stage X

as release phases.

### Remove restriction-first messaging

The current estimator screen spends too much effort telling the user:

- what is locked
- what is manual
- what is not active

That is the wrong product posture now.

Estimator Director should show what it does, not what it cannot do.

### Remove top-area chrome overload

The top portion currently takes too much vertical and mental space with:

- too many chips
- too many small action links
- too many state labels before the work starts

That space should be reduced and refocused.

---

## 6. What Must Be Renamed

These naming changes should happen before deeper estimator polishing.

### Rename rollout-stage labels into director-level labels

Keep:

- `Level A`
- `Level B`
- `Level C`

Only as estimator capability levels.

Do not use them as release sequencing language.

### Rename workstation language where needed

Current wording such as:

- `workstation`
- `manual quote handling stays outside this dashboard`
- `stage locked`

should be rewritten into product language that matches the launch direction.

Preferred framing:

- quote intake
- quote building
- quote delivery
- customer approval
- revision handling
- estimate history
- follow-up handoff

### Rename queue terminology where needed

The screen should read as a professional quote operating lane, not as a transitional internal tool.

---

## 7. What The Screen Should Become

The estimator dashboard should evolve into a full-capacity Estimator Director control surface.

The top-level structure should become:

### 1. Intake

Show:

- where the request came from
- customer
- service type
- urgency
- location
- complexity

### 2. Quote Builder

Show:

- selected estimate type
- line items
- price logic
- revision state
- attachments

### 3. Quote Delivery

Show:

- text / email / link / PDF path
- sent timestamp
- open status
- customer response state

### 4. Approval / Revision State

Show:

- accepted
- declined
- revision requested
- stuck awaiting customer

### 5. Handoff

Show:

- follow-up required
- sales-required
- scheduling-ready
- President-visible exception

### 6. History / Performance

Show:

- quote history
- win / loss
- revision rate
- response speed
- source performance

---

## 8. Functional Gaps Still Missing

These are the most important missing or weak estimator capabilities right now.

### Estimate intake depth

The system still needs a stronger intake structure for:

- website requests
- call-agent requests
- ad-sourced requests
- manual requests
- repeat-customer requests

### Real quote builder depth

The dashboard currently suggests quote handling, but it still needs stronger real quote-building behavior for:

- standard estimates
- options estimates
- package estimates
- quick estimates

### Customer-facing estimate experience

The customer acceptance surface still needs to become a real product path, not only a status placeholder.

It must support:

- accept
- decline
- request revision
- attachment visibility

### Revision / resend loop

The revision path needs to become a first-class workflow, not only a state label.

### Stronger follow-up connection

Unresolved estimates must move cleanly into follow-up with:

- reason
- owner
- next action
- timestamp

### Source-aware performance

Estimator Director should surface:

- which source produces better quotes
- which source gets stuck
- which source closes faster

### A/B/C behavior separation

The repo still needs clearer estimator-level behavior differences between:

- `A`
- `B`
- `C`

without using old release-stage language.

---

## 9. Benchmark Functions AI-ABCX Must Match

Before Estimator Director is considered complete, it must match specialized competitors on these visible functions:

### Must match

- fast quote intake
- multiple estimate formats
- clean customer quote delivery
- mobile-friendly acceptance path
- revision handling
- estimate history
- clear quote status

### Must beat

- source-aware intake from more channels
- President visibility into open quote truth
- connected follow-up handoff
- connected scheduling handoff
- corporate operating-lane discipline

---

## 10. File-By-File Build Direction

### `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

Current state:

- strongest estimator UI file
- real partial implementation

Keep:

- shell
- sidebar
- active workspace
- route list
- calendar
- queue
- outcome logging
- workflow logic hooks

Change:

- simplify top chrome
- remove old rollout language
- rewrite headings around live estimator work
- strengthen quote builder area
- strengthen customer quote area
- strengthen history/performance signals

Add:

- real estimate type switching
- standard/options/package/quick behavior
- stronger intake/source summary
- revision/resend controls
- stronger customer decision state

### `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

Current state:

- shared record support layer

Role in estimator:

- source of quote/job truth
- source of state labels
- source of connected handoff status

Needs:

- cleaner estimator-specific record helpers
- normalized estimate states
- normalized source tags
- revision-aware status support

### `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

Current state:

- shared workflow support

Needs:

- estimator-oriented workflow helpers for:
  - intake
  - sent
  - waiting
  - accepted
  - revision
  - follow-up-needed
  - lost

### `/Users/yakovnotkin/Documents/New project/new-president-dashboard.html`

Role:

- President quote truth visibility

Needs:

- estimator summary blocks that reflect final estimator model
- no old rollout dependencies

### `/Users/yakovnotkin/Documents/New project/president-follow-up.html`

Role:

- estimator unresolved handoff destination

Needs:

- explicit estimator-origin follow-up flow
- reason tracking from quote state

---

## 11. Build Order

Estimator Director should be finished in this order:

### Step 1. Cleanup and rename

- remove old rollout framing
- simplify top section
- normalize estimator language

### Step 2. Lock estimator state model

- intake
- preparing
- sent
- waiting
- accepted
- declined
- revision requested
- follow-up needed
- scheduled
- lost

### Step 3. Build estimate formats

- standard
- options
- package
- quick

### Step 4. Build customer quote path

- send
- open
- approve
- decline
- request revision

### Step 5. Build handoff rules

- accepted -> scheduling / sales as needed
- unresolved -> follow-up
- high-value -> President visibility

### Step 6. Build A/B/C differentiation

- A
- B
- C

### Step 7. Build performance/testing layer

- source performance
- quote speed
- revision rate
- win/loss

---

## 12. Test Gate Before Moving To The Next Director

Estimator Director should not be considered done until these tests pass.

### Core tests

- website request becomes estimate
- call-agent request becomes estimate
- manual request becomes estimate
- repeat-customer request becomes estimate

### Quote format tests

- standard estimate works
- options estimate works
- package estimate works
- quick estimate works

### Customer decision tests

- customer accepts quote
- customer declines quote
- customer requests revision

### Handoff tests

- accepted estimate can hand off correctly
- unresolved estimate creates follow-up-needed state
- President sees open estimate truth

### Level tests

- A behavior works
- B behavior works
- C behavior works

If these are not all true, we should not move to the next director yet.

---

## 13. Final Conclusion

Estimator Director does **not** need to be rebuilt from zero.

It needs to be:

- cleaned
- renamed
- restructured around full estimator value
- expanded to real benchmark-grade functionality
- tested as a real director

That is the correct next move.
