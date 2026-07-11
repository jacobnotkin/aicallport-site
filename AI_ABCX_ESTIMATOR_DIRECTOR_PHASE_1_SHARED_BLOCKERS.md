# AI-ABCX Estimator Director Phase 1 Shared Blockers

This document isolates only the first implementation phase for `Estimator Director`.

Its purpose is:

`remove the old stage-based estimator logic from shared files before any estimator UI rebuild begins`

This is a narrow execution sheet.

It does not cover:

- estimator visual redesign
- estimator quote-builder polish
- A/B/C surface differentiation
- customer-facing estimate presentation improvements

Those come later.

This file is only for `Phase 1`.

---

## 1. Locked Rules

These rules are fixed before touching code:

- `A / B / C` are `director capability levels`
- `A / B / C` are `not rollout phases`
- `X` is `out of current scope`
- Estimator Director is a launch director, not a locked future release
- shared estimator logic must no longer depend on old Stage A / Stage B / Stage C rollout assumptions

Because of that:

- any estimator logic built around release-stage progression is now a blocker
- any shared helper that still encodes rollout semantics must be cleaned first

---

## 2. Phase 1 Goal

At the end of Phase 1:

- shared estimator workflow logic is neutral
- shared estimator record state is neutral
- shared config and registry no longer push estimator into rollout-stage language
- estimator can later be rebuilt cleanly by capability level

If Phase 1 is done correctly, later estimator work becomes much easier.

If Phase 1 is skipped, later estimator work will keep fighting the wrong system model.

---

## 3. Files In Scope

Only these files are in scope for Phase 1:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`
- `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`

Not in scope yet:

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

That file should stay untouched until shared blockers are removed.

---

## 4. Strict Work Order

Phase 1 should be done in this exact order:

1. `ai-abcx-workflow-helpers.js`
2. `ai-abcx-job-records.js`
3. `ai-abcx-job-records-config.js`
4. `ai-abc-role-registry.js`
5. `ai-abcx-job-records-app.js`

This order matters because each later file depends on the earlier shared model.

---

## 5. File 1: Workflow Helpers

## `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

### Why it is first

This file contains the deepest old rollout assumptions and drives status behavior across the estimator path.

### Blockers to remove or replace

- `stageAActionMap`
- `isStageAPostAppointmentStatus`
- `deriveStageAStatusFromOutcome`
- `isStageAReadyToConfirm`
- `getStageAWorkflowConfig`
- any helper that uses old stage-specific estimator progression

### Status vocabulary to review carefully

These may still be usable conceptually, but they must no longer be tied to rollout-stage meaning:

- `awaiting_manual_confirmation`
- `awaiting_worker_confirmation`
- `awaiting_customer_confirmation`
- `rerouted`
- `confirmed`
- `completed`
- `follow_up_needed`
- `rescheduled`
- `provisional`

### Required action

- replace stage-release logic with neutral estimator workflow logic
- rename helpers where needed so they describe operations, not old launch phases
- separate real business states from old rollout placeholders

### Required output state

Shared helpers should support estimator business flow such as:

- new request
- quote preparing
- quote ready
- quote sent
- waiting on customer
- revision requested
- accepted
- follow-up needed
- lost

### Definition of done

- no estimator helper is named around Stage A logic
- no estimator helper requires release-stage context to work
- helper outputs can later support A/B/C capability levels cleanly

### Test gate

Do not move to the next file until:

- the shared helper layer can describe estimator flow without any rollout-stage language

---

## 6. File 2: Shared Job Records

## `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

### Why it is second

Once shared workflow logic is neutral, records must stop storing estimator state through the old stage structure.

### Blockers to review

- `stages` record structures
- `ensureStageRecord`
- estimator-specific sample records
- shared write functions tied to stage

### Required action

- stop treating estimator state as a stage rollout timeline
- reshape estimator-related records around operating workflow state
- keep shared job architecture only where it still supports the new model

### Required sample cases

At minimum, estimator records should support these examples:

- standard estimate draft
- estimate sent
- waiting on customer
- revision requested
- accepted
- follow-up needed
- lost

### Definition of done

- estimator records no longer require stage release framing
- estimator sample data looks like real quoting data
- record structure is ready for A/B/C behavior later

### Test gate

Do not move to the next file until:

- you can point to record examples that represent real quote lifecycle states, not rollout scenarios

---

## 7. File 3: Shared Records Config

## `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`

### Why it is third

After workflow helpers and records are corrected, the config layer must stop reintroducing the old narrative.

### Blockers to review

- any intro copy or help copy that says records survive across Stage A / B
- estimator-related explanatory copy built around staged rollout

### Required action

- rewrite estimator-related config language in neutral operational terms
- describe workflow behavior without rollout framing

### Definition of done

- config text no longer teaches an outdated rollout model
- estimator configuration text sounds launch-ready

### Test gate

Do not move to the next file until:

- no estimator-facing config copy mentions old staged release behavior

---

## 8. File 4: Role Registry

## `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`

### Why it is fourth

After workflow and records are clean, role metadata must stop using the wrong dependency semantics.

### Blockers to review

- estimator role entry
- `stageDependencies`
- any estimator lane metadata that implies rollout-phase dependency

### Required action

- remove rollout-style estimator dependency meaning
- keep only structural lane visibility and role identity that still make sense
- prepare registry for capability-level interpretation later

### Definition of done

- estimator role is registered as a launch director
- estimator metadata does not imply “not really active yet”

### Test gate

Do not move to the next file until:

- role registry can support estimator without rollout-stage semantics

---

## 9. File 5: Shared Job Records App

## `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`

### Why it is fifth

This file is the shared app surface that can still leak old stage-based behavior even after the deeper layers are cleaned.

### Blockers to review

- `stageConfig`
- `queryStage`
- stage buttons
- stage chips
- stage save messages
- `stageAWorkflow`
- `stageARequirements`
- `stageAActionButtons`

### Required action

- replace stage-specific estimator UI state with neutral workflow display logic
- preserve shared app usefulness without rollout language

### Definition of done

- shared records app no longer renders estimator through old staged release semantics
- shared controls describe workflow state, not release stage

### Test gate

Do not consider Phase 1 finished until:

- this shared app can display estimator record state without stage buttons or stage-based save language

---

## 10. Phase 1 Deliverable

Phase 1 is complete only when all five files satisfy these conditions:

- no estimator logic depends on rollout-stage naming
- no estimator record depends on rollout-stage state storage
- no estimator config explains the system through old stage release logic
- no estimator role metadata implies future activation
- no shared app surface renders estimator as a staged release lane

---

## 11. What Must Not Be Touched Yet

Until Phase 1 is complete, do not start:

- top estimator layout redesign
- estimator button simplification
- quote-builder polish
- customer quote preview redesign
- A/B/C capability differentiation inside UI
- benchmark visual comparisons

Those tasks should begin only after the shared blockers are removed.

---

## 12. Immediate Next Coding Target

When implementation starts, the first coding target should be:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

And the first mission inside that file should be:

- identify every estimator path still derived from `Stage A` behavior
- replace it with neutral estimator workflow naming and logic

That is the correct first move.
