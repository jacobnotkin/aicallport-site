# AI-ABCX Estimator Workflow Helpers Remove/Rename Map

This document is the strict Phase 1 audit map for:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

Its job is not to redesign estimator behavior yet.

Its job is:

`identify exactly what must be removed, what can stay, what should be renamed, and what should be rebuilt first inside the shared workflow helper file`

No code should be edited from this file blindly.

This is the pre-edit map.

---

## 1. Main Finding

`ai-abcx-workflow-helpers.js` is still heavily structured around the old rollout-stage model.

The old model appears in three ways:

1. `A` and `B` are treated as workflow branches
2. Stage A has its own hardcoded action system
3. status meaning is mixed between:
   - real business workflow states
   - old rollout-phase behavior

That means this file cannot be safely extended for the new Estimator Director model until the stage assumptions are removed.

---

## 2. What Is Still Good

These parts are still useful and should probably stay conceptually:

- `APPOINTMENT_TYPES`
- `OUTCOMES`
- label helpers
- queue priority helpers
- follow-up reason labeling
- navigation target logic idea

These do not need to be deleted just because the stage model is wrong.

They only need to be normalized around the new estimator workflow vocabulary.

---

## 3. Hard Remove List

These items are direct blockers and should be removed or replaced, not preserved as-is.

## 3.1 `stageAActionMap`

### Why it must go

This object is pure old-rollout logic.

It hardcodes a President-driven Stage A manual branch and makes estimator behavior depend on a launch-phase model we no longer use.

### Current actions inside it

- `move_to_manual_confirmation`
- `confirm_appointment`
- `record_completed`
- `record_follow_up`
- `mark_rescheduled`
- `mark_no_show`
- `mark_canceled`

### Replace with

A neutral estimator action map later, built around real operating actions such as:

- prepare quote
- send quote
- request revision
- approve revision
- mark accepted
- mark lost
- open follow-up
- close follow-up

### Rule

Do not rename `stageAActionMap`.

Delete or replace it with a new neutral action model.

---

## 3.2 `isStageAPostAppointmentStatus`

### Why it must go

The name itself encodes the wrong product architecture.

It assumes estimator logic is organized around Stage A appointment progression.

### Replace with

A neutral status helper only if still needed, for example:

- `isClosedWorkflowStatus`
- `isPostDecisionStatus`
- `isOutcomeRecordedStatus`

### Rule

Do not preserve any `StageA` prefix helper.

---

## 3.3 `deriveStageAStatusFromOutcome`

### Why it must go

This is another direct old-rollout helper.

It maps outcomes into Stage A state instead of into a neutral estimator workflow.

### Replace with

If needed later:

- `deriveWorkflowStatusFromOutcome`
- `deriveEstimatorStateFromOutcome`

### Rule

The replacement must not assume old stage-phase handling.

---

## 3.4 `isStageAReadyToConfirm`

### Why it must go

This function encodes one very specific manual-confirm branch from the old estimator logic.

That branch may still conceptually matter in some estimator levels, but not as Stage A rollout logic.

### Replace with

If needed later:

- `isReadyForManualConfirmation`
- `isReadyForCustomerSend`
- `isReadyForOutcomeCloseout`

depending on actual workflow purpose

### Rule

The replacement must be tied to workflow action readiness, not stage identity.

---

## 3.5 `buildStageATimeLabel`

### Why it should be removed or absorbed

The helper itself is harmless, but the name continues the wrong stage framing.

### Replace with

Only if still needed:

- `buildConfirmationTimeLabel`
- `buildWorkflowTimeLabel`

### Rule

If its only purpose is simple date formatting, consider folding it into a neutral formatting helper rather than keeping a separate estimator-specific function.

---

## 3.6 `getStageAWorkflowConfig`

### Why it must go

This is the single strongest stage-based blocker in the file.

It hardcodes Stage A as a manual President-driven track and defines the old staged estimator narrative directly in helper logic.

### Why this is dangerous

Even if the estimator dashboard is visually rebuilt, this function will keep forcing the product back into:

- provisional
- awaiting manual confirmation
- confirmed
- rescheduled
- follow-up-needed
- no-show

as a staged release branch instead of a level-based director workflow

### Replace with

A new neutral workflow config function later, likely something like:

- `getEstimatorWorkflowConfig`
- `getWorkflowConfigByStatus`

### Rule

This should not be renamed in place.

It should be fully re-authored around the new model.

---

## 4. Rename and Reframe List

These items should likely stay in some form, but their internal meaning must change.

## 4.1 `STATUS_OPTIONS`

### Current problem

It is organized as:

- `A`
- `B`

where those keys behave like workflow branches inherited from the old staged rollout model.

### Why that is wrong now

Under the new product direction:

- `A / B / C` are estimator capability levels
- they are not rollout tracks

This means `STATUS_OPTIONS` cannot keep meaning “stage-specific workflow status list.”

### Recommended replacement direction

Split this into two layers:

1. neutral workflow status catalog
2. level capability exposure rules

Example conceptual structure:

- `WORKFLOW_STATUS_OPTIONS`
- `ESTIMATOR_LEVEL_STATUS_ACCESS`

### Rule

Do not keep `STATUS_OPTIONS = { A: ..., B: ... }` in its current meaning.

That shape is misleading now.

---

## 4.2 `getStatusLabel`

### Current problem

It currently accepts `stage` plus `value`, which keeps status labels tied to stage buckets.

### Recommended change

Convert to a neutral lookup:

- `getStatusLabel(value)`

or, only if truly needed later:

- `getStatusLabelForLevel(level, value)`

### Rule

Status labeling should default to workflow state, not stage branch.

---

## 4.3 `statusClass`

### Current problem

The function itself is still useful, but the classifications are built around the old status list.

### Recommended change

Keep the function, but recalculate meaning based on the new workflow vocabulary.

Examples that still likely make sense:

- green for accepted/completed
- orange for waiting/revision/follow-up
- red for lost/canceled/no-show
- blue for active confirmed commitments

### Rule

Keep, but refactor.

---

## 4.4 `getJobFocusWorkflowConfig`

### Current problem

This function branches on `stage === "A"` and then falls back to a different automated branch.

That is exactly the old release logic problem.

### Why it matters

This function currently drives:

- next action
- workflow step display
- active/blocked/complete state display

So if it stays stage-branch based, the estimator UI will stay structurally wrong.

### Recommended change

Rebuild as a neutral workflow config function based on:

- workflow status
- estimate type
- capability level
- maybe source / follow-up reason when needed

### Rule

Do not preserve:

- `if (stage === "A")`

as the architectural split.

That split must be removed.

---

## 4.5 `getQueuePriority`

### Current problem

The function itself is useful, but current labels still reflect old statuses such as:

- manual confirm
- worker confirm
- rerouted
- provisional

### Recommended change

Keep the function, but realign it to the new estimator workflow.

Examples:

- draft
- ready to send
- waiting on customer
- revision
- follow-up
- accepted
- lost

### Rule

Keep, but rewrite label logic after status model cleanup.

---

## 4.6 `getFocusNavigationTarget`

### Current problem

This one is structurally useful, but it is currently keyed to old status progression.

### Recommended change

Keep the idea, but rewire it later around:

- accepted quote
- follow-up needed
- revision requested
- customer pending
- scheduled after acceptance

### Rule

Do not delete unless downstream systems no longer need it.

This is likely a keep-and-refactor helper.

---

## 5. Neutral Keep List

These are safe to keep conceptually, with only minor refactor likely needed:

- `APPOINTMENT_TYPES`
- `OUTCOMES`
- `getOutcomeLabel`
- `getClosedReviewDescriptor`
- `getClosedQueuePriority`
- `getFollowUpReasonLabel`

They may need terminology cleanup, but they are not the primary blocker.

---

## 6. Status Vocabulary Audit

These status values appear in the file and must be sorted into three buckets:

## 6.1 Likely keep as real business states

- `completed`
- `canceled`
- `no_show`
- `follow_up_needed`
- `in_progress`

## 6.2 Likely keep but rename or reframe

- `confirmed`
- `rerouted`
- `rescheduled`
- `provisional`

These may still represent real workflow moments, but right now they are loaded with old stage semantics.

## 6.3 Likely remove as primary estimator states

- `awaiting_manual_confirmation`
- `awaiting_worker_confirmation`
- `awaiting_customer_confirmation`
- `awaiting_worker_assignment`

These may still matter in some internal automation layers, but they should probably not remain as the core estimator workflow vocabulary for the new build.

They are too tightly tied to the old route-and-confirm release model.

---

## 7. Recommended Replacement Vocabulary

This is not the final estimator matrix.

This is only a safer shared-helper direction.

Likely neutral estimator workflow states should be closer to:

- `new_request`
- `quote_preparing`
- `quote_ready`
- `quote_sent`
- `waiting_on_customer`
- `revision_requested`
- `accepted`
- `follow_up_needed`
- `scheduled_after_acceptance`
- `lost`
- `completed`
- `canceled`

This vocabulary is:

- easier to understand
- easier to map to A/B/C later
- more aligned with estimator product logic
- less tied to one old manual scheduling model

---

## 8. Strict First Refactor Pass

The first code pass inside `ai-abcx-workflow-helpers.js` should do only this:

1. remove all `StageA`-named helpers
2. remove `stageAActionMap`
3. stop organizing `STATUS_OPTIONS` by old rollout branch
4. remove `stage === "A"` workflow branching in `getJobFocusWorkflowConfig`
5. leave non-blocking label and follow-up helpers in place unless they break compilation

This first pass should not yet try to perfect estimator behavior.

It should only make the shared helper architecture neutral enough for the next build phase.

---

## 9. Do Not Attempt In The First Pass

Do not try to solve everything at once.

In the first refactor pass, do not also try to:

- redesign estimator dashboard UI
- finalize A/B/C customer behavior
- rebuild quote-builder line items
- rewrite President-side estimator visibility
- redesign scheduling dependency logic

That would make the first pass too risky.

---

## 10. Exact Remove / Rename Summary

## Remove / replace entirely

- `stageAActionMap`
- `isStageAPostAppointmentStatus`
- `deriveStageAStatusFromOutcome`
- `isStageAReadyToConfirm`
- `buildStageATimeLabel`
- `getStageAWorkflowConfig`

## Keep but refactor

- `STATUS_OPTIONS`
- `getStatusLabel`
- `statusClass`
- `getJobFocusWorkflowConfig`
- `getQueuePriority`
- `getFocusNavigationTarget`

## Keep with light cleanup

- `APPOINTMENT_TYPES`
- `OUTCOMES`
- `getOutcomeLabel`
- `getClosedReviewDescriptor`
- `getClosedQueuePriority`
- `getFollowUpReasonLabel`

---

## 11. Best First Coding Target

When we begin implementation, the very first edit inside:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

should be:

- deleting the Stage A helper block and replacing it with neutral workflow naming stubs

That is the cleanest first move because it removes the most misleading architecture first.
