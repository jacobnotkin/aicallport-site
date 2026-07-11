# AI-ABCX Estimator Director Execution Sequence

This document turns the estimator planning set into one strict execution path.

Its purpose is simple:

`define the exact build order for Estimator Director so we can move from planning into implementation without rebuilding the same logic twice`

Use this document together with:

- [AI_ABCX_ESTIMATOR_DIRECTOR_CAPABILITY_MATRIX.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_CAPABILITY_MATRIX.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_FILE_FUNCTION_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_FILE_FUNCTION_BUILD_CHECKLIST.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_IMPLEMENTATION_MAP.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_IMPLEMENTATION_MAP.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_REFACTOR_SEQUENCE.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_REFACTOR_SEQUENCE.md)

---

## 1. Locked Product Rules

These rules are not optional.

- `A / B / C` are `director capability levels`
- `A / B / C` are `not rollout phases`
- `X` is `out of current scope`
- Estimator Director is part of the launch system, not a future preview
- Estimator must be built as a working commercial director, not a restricted demo

Because of that:

- old `Stage A / Stage B / Stage C / Stage X` rollout language must be removed from estimator logic
- estimator behavior must be controlled by `director level`, not by `release phase`

---

## 2. Main Build Principle

We should not start by polishing the estimator screen.

We should start by removing the shared blockers that would otherwise keep forcing the old rollout model back into the estimator.

That means the safest build order is:

1. shared workflow blockers
2. shared record blockers
3. shared registry/config blockers
4. estimator screen shell cleanup
5. estimator core workflow
6. estimator A launch floor
7. estimator B workflow expansion
8. estimator C conversion orchestration
9. connected-system validation

---

## 3. Phase 1: Shared Workflow Blockers First

### Files

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

### Why first

This file still carries the strongest old rollout-stage assumptions.

If we start UI work before fixing this file, estimator status, confirmation flow, and downstream queue behavior will keep reflecting the wrong product model.

### Functions / surfaces that must be handled first

- `STATUS_OPTIONS`
- `stageAActionMap`
- `isStageAPostAppointmentStatus`
- `deriveStageAStatusFromOutcome`
- `isStageAReadyToConfirm`
- `getStageAWorkflowConfig`
- any status helpers still tied to:
  - `awaiting_manual_confirmation`
  - `awaiting_worker_confirmation`
  - `awaiting_customer_confirmation`
  - `rerouted`
  - `confirmed`
  - `completed`
  - `follow_up_needed`
  - `rescheduled`
  - `provisional`

### Required outcome

Replace rollout-stage estimator logic with one neutral estimator workflow model.

Estimator workflow should revolve around operating states such as:

- `new_request`
- `estimate_preparing`
- `estimate_ready_to_send`
- `estimate_sent`
- `waiting_on_customer`
- `revision_requested`
- `accepted`
- `follow_up_needed`
- `scheduled_after_acceptance`
- `lost`

### Do not move on until

- estimator shared workflow no longer depends on old stage release semantics
- helper output can support A, B, and C as capability depth
- no helper name suggests rollout phase ownership

---

## 4. Phase 2: Shared Record Model Cleanup

### Files

- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

### Why second

Even if workflow helpers are cleaned up, estimator will still stay structurally wrong if job records keep encoding the old stage model.

### Functions / surfaces to touch

- record schema and default state shape
- any `stages` object design that treats estimator as a release phase
- `ensureStageRecord`
- shared quote confirmation / customer approval / reroute / outcome writers
- sample estimator records and their copy

### Required outcome

- job records store estimator workflow in a neutral operating model
- A/B/C should describe capability, not historical release stage
- record samples should represent real quote cases:
  - simple standard estimate
  - options estimate
  - package estimate
  - revision requested
  - accepted
  - lost
  - follow-up needed

### Do not move on until

- estimator records can support all benchmark quote examples without fake stage scaffolding
- sample records feel like live product data, not rollout test data

---

## 5. Phase 3: Shared Config and Registry Cleanup

### Files

- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`
- `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`

### Why third

After helpers and records are corrected, the surrounding config layer has to stop reintroducing stage-based language or dependencies.

### Functions / surfaces to touch

#### In `ai-abcx-job-records-config.js`

- old record-intro copy that refers to Stage A / B continuity

#### In `ai-abc-role-registry.js`

- estimator role definition
- `stageDependencies`
- visibility and lane metadata for estimator

#### In `ai-abcx-job-records-app.js`

- `stageConfig`
- `queryStage`
- stage chips, stage buttons, stage save messages
- any `stageAWorkflow`, `stageARequirements`, or `stageAActionButtons`

### Required outcome

- estimator role is expressed in capability terms
- shared app/config surfaces do not imply rollout-stage ownership
- role registry supports estimator as a real launch director

### Do not move on until

- no estimator-related config says “Stage A manual” as a product rule
- registry can support estimator levels without rollout vocabulary

---

## 6. Phase 4: Estimator Screen Shell Cleanup

### Files

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

### Why fourth

Only after the shared model is clean should we simplify the estimator screen.

Otherwise we risk polishing the wrong logic.

### What to touch first in this file

#### First block

- top hero / top control cluster
- oversized status tiles
- restriction-heavy opening copy

#### Second block

- left rail summary copy
- profile card
- queue cards

#### Third block

- work-first page hierarchy
- active quote area
- outcome area

### Required outcome

- top section takes less space
- page opens on work, not explanation
- estimator reads as a live director workspace
- old “locked/manual/inactive until later” framing is removed

### Do not move on until

- first screen clearly answers:
  - what job is active
  - what quote state is active
  - what the estimator must do next
  - what the customer is waiting on

---

## 7. Phase 5: Estimator Core Workflow Build

### Files

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

### Why fifth

This is where estimator stops being a cleaned-up screen and becomes a product.

### Functions to build or rebuild in `estimator-dashboard.html`

- `estimatorCapabilityMap`
- `applyEstimatorBusinessCopy`
- `inferEstimateSource`
- `inferUrgency`
- `inferComplexity`
- `inferEstimateType`
- `getEstimateTypeMeta`
- `buildEstimateLineItems`
- `summarizeEstimateBuilder`
- `renderEstimatorCustomerQuote`
- `renderEstimatorHandoffState`
- `buildEstimatorStatusCounts`
- `summarizeEstimatorRecords`
- `applyEstimatorSummary`
- `renderRouteBoard`
- `renderEstimatorSupplementalLists`
- `buildEstimatorFlowState`
- `writeSharedEstimatorOutcome`
- `writeSharedEstimatorConfirmation`
- `writeSharedEstimatorCustomerApproval`
- `writeSharedEstimatorReroute`
- `buildEstimatorJobContext`
- `applyJobContext`
- `renderResultSelection`

### Core operating lanes that must exist

- intake source visibility
- estimate builder
- customer quote preview
- quote state tracking
- revision path
- acceptance path
- follow-up path
- downstream handoff visibility

### Do not move on until

- one standard estimate works end to end
- one options estimate works end to end
- one package estimate works end to end
- one revision-request example works end to end

---

## 8. Phase 6: Level A Launch Floor

### Why now

Level A should be the first complete launch-capable layer, even if B and C add stronger automation.

### Minimum A standard

- clear quote intake visibility
- standard estimate creation
- customer quote send state
- manual quote decision handling
- visible follow-up need
- visible downstream President oversight
- believable assigned quote board

### A must match at launch

- clean standard quoting lane
- credible customer-facing estimate preview
- professional status tracking

### A does not need yet

- strongest automation depth
- advanced package orchestration
- advanced conversion optimization

### Do not move on until

- A feels sellable on its own
- A can be demonstrated without apology

---

## 9. Phase 7: Level B Expansion

### Minimum B standard

- connected options-estimate flow
- better customer choice handling
- cleaner scheduling/follow-up continuity
- stronger quote revision path
- stronger routed workload visibility

### What B must add beyond A

- real multi-option quoting
- stronger workflow connection to next steps
- clearer estimator-to-scheduling handoff visibility
- better record quality and reusable quote logic

### Do not move on until

- B feels materially better than A, not cosmetically different
- a customer can see why B is worth upgrading to

---

## 10. Phase 8: Level C Conversion Orchestration

### Minimum C standard

- package estimate logic
- fast quote path where appropriate
- stronger revision intelligence
- strongest follow-up and conversion lane
- stronger downstream connection to scheduling and revenue truth

### What C must add beyond B

- benchmark-grade package quoting
- premium customer decision experience
- strongest unresolved quote recovery logic
- strongest visibility for accepted vs stalled vs lost quotes

### Do not move on until

- C clearly feels like the most commercially powerful estimator version
- C is strong enough to stand next to the best estimator products in the market discussion

---

## 11. Phase 9: Connected-System Validation

### Files to verify

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/new-president-dashboard.html`
- `/Users/yakovnotkin/Documents/New project/president-follow-up.html`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-follow-up-app.js`
- shared workflow / record files

### Required validation

- estimator updates appear correctly in President context
- follow-up lane reflects estimator outcomes correctly
- customer decision state is preserved
- accepted quote can be seen as a downstream operational trigger
- revision and lost states remain visible for business visibility

### Do not move on until

- estimator is not operating like an isolated module
- estimator feels structurally connected to the larger AI-ABCX system

---

## 12. First Code Touch Recommendation

If we start implementation now, the first files should be touched in this exact order:

1. `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
2. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`
3. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`
4. `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`
5. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`
6. `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

That is the safest order because it removes the shared blockers before we rewrite the estimator surface itself.

---

## 13. Exact Start Point Inside Code

When actual coding begins, the first practical implementation move should be:

### Step 1

Normalize estimator workflow naming in:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

### Step 2

Then reshape estimator record state in:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

### Step 3

Only after that should we rewrite the estimator-level behavior map in:

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

This prevents us from rebuilding the UI on top of obsolete state logic.

---

## 14. Hard Stop Rules

Stop and re-evaluate if any of the following happens:

- estimator still depends on rollout-stage labels after shared cleanup
- A / B / C differences are only copy changes
- quote workflow examples cannot be demonstrated end to end
- President / follow-up integration breaks after estimator state refactor
- the dashboard becomes prettier but less operational

---

## 15. End State

Estimator Director is ready to leave planning and enter production build only when:

- shared model is no longer rollout-based
- estimator dashboard is work-first
- A is independently sellable
- B adds real connected workflow value
- C adds real conversion power
- the estimator path is connected to the rest of AI-ABCX

That is the build line.
