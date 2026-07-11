# AI-ABCX Estimator Workflow Helpers Edit Sequence

This document is the literal first-pass edit plan for:

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

Its purpose is:

`define the exact section-by-section edit order for the first shared-helper refactor pass before any estimator UI file is touched`

This is not the final estimator workflow spec.

This is not the final A/B/C behavior design.

This is the first refactor sequence only.

---

## 1. First-Pass Goal

The goal of the first pass is not to perfect estimator behavior.

The goal is to make the helper architecture neutral enough that later estimator work can happen on the right foundation.

At the end of the first pass:

- there should be no `StageA` estimator helper architecture left
- status logic should no longer branch by rollout phase
- this file should be safe for later level-based estimator behavior

---

## 2. Hard Rules For This Pass

- do not redesign estimator UI here
- do not finalize customer quote logic here
- do not implement full A/B/C behavior here
- do not solve every downstream dependency here
- do remove the old rollout-stage architecture
- do leave the file compilable and internally consistent

This pass is structural, not cosmetic.

---

## 3. Exact Edit Order

Work through the file in this exact order.

---

## Step 1. Freeze the keep list first

### Keep in place for now

- `APPOINTMENT_TYPES`
- `OUTCOMES`
- `getOutcomeLabel`
- `getClosedReviewDescriptor`
- `getClosedQueuePriority`
- `getFollowUpReasonLabel`

### Why

These are not the main blockers.

Do not waste the first pass rewriting stable helper pieces unless the refactor forces it.

---

## Step 2. Replace `STATUS_OPTIONS` first

### Current block

- `const STATUS_OPTIONS = { A: [...], B: [...] }`

### Problem

This block is the top-level architecture error.

It encodes:

- `A`
- `B`

as workflow branches instead of capability levels.

### First-pass action

Replace this block with a neutral workflow status catalog.

### Safe first-pass target

Introduce a neutral structure such as:

- `const WORKFLOW_STATUS_OPTIONS = [...]`

and, if needed later:

- `const LEVEL_STATUS_ACCESS = { ... }`

### Important

For the first pass, `LEVEL_STATUS_ACCESS` can stay incomplete.

The critical job is to stop defining status options through the old `A` / `B` rollout split.

### Do not move on until

- the file no longer treats `A` and `B` as status buckets

---

## Step 3. Delete the entire Stage A helper block

### Remove these functions and objects together

- `stageAActionMap`
- `isStageAPostAppointmentStatus`
- `deriveStageAStatusFromOutcome`
- `isStageAReadyToConfirm`
- `buildStageATimeLabel`
- `getStageAWorkflowConfig`

### Why these must be removed together

These pieces form one old architecture cluster.

If only some are removed, the file will still think estimator is partially governed by the old manual Stage A release model.

### First-pass replacement

Do not fully rebuild the estimator logic here yet.

Replace the removed block with minimal neutral placeholders only where the rest of the file requires them.

Examples:

- `getEstimatorWorkflowConfig`
- `deriveWorkflowStatusFromOutcome`
- `isReadyForWorkflowAction`

These replacements can be light in the first pass.

They do not need final business sophistication yet.

### Do not move on until

- no `StageA`-named helper remains in the file

---

## Step 4. Rebuild `getStatusLabel`

### Current problem

It depends on:

- `getStatusLabel(stage, value)`

which reflects the old stage-bucket model.

### First-pass action

Rewrite it to label by workflow status alone.

### Safe target

- `getStatusLabel(value)`

### Why now

Once `STATUS_OPTIONS` is no longer split by old rollout branches, this helper must stop expecting a stage key.

### Do not move on until

- status label lookup no longer needs stage identity

---

## Step 5. Rebuild `getJobFocusWorkflowConfig`

### Current problem

This function still branches on:

- `if (stage === "A")`

and otherwise falls into a second automation branch.

That is the core old-rollout split still driving visible workflow behavior.

### First-pass action

Remove stage branching and convert the function into a neutral workflow-state resolver.

### Safe first-pass target

Let it build output from:

- `status`
- optional `focus`

and not from:

- `stage`

### First-pass requirement

You do not need the final commercial-grade workflow copy yet.

But you must:

- remove stage splitting
- remove rollout-stage story logic
- keep next action + step output stable enough for later UI use

### Do not move on until

- the function no longer branches estimator workflow by stage

---

## Step 6. Refactor `statusClass`

### Current problem

The function itself is useful, but it is still built around the old status set.

### First-pass action

Keep the function, but normalize it around the new workflow vocabulary.

### Safe target

Make sure it handles:

- draft / preparing
- sent / waiting
- revision
- accepted / completed
- lost / canceled / no-show
- follow-up

### Why in this pass

Once status names start changing, UI tone mapping must stay coherent or the next screens will become misleading.

---

## Step 7. Refactor `getQueuePriority`

### Current problem

This helper still prioritizes old statuses like:

- manual confirm
- worker confirm
- rerouted
- provisional

### First-pass action

Keep the helper, but rewrite it around neutral estimator queue states.

### Safe target labels

- draft
- ready to send
- waiting on customer
- revision
- follow-up
- accepted
- lost

### Why now

Queue prioritization is one of the most visible downstream behaviors that will break if left on old state names.

---

## Step 8. Refactor `getFocusNavigationTarget`

### Current problem

This helper is useful, but its decision logic still depends on old confirmation/reroute flow states.

### First-pass action

Do not delete it.

Simplify it enough so that it can still route based on neutral quote-business conditions.

### Safe first-pass target

Route by business meaning such as:

- quote pending
- revision path
- accepted quote
- follow-up need
- service continuation

### Why not delay this

If left untouched, later UI testing will point to the wrong executive/director destinations and make the estimator flow seem broken.

---

## Step 9. Leave closed-review helpers mostly alone

### Functions

- `getClosedReviewDescriptor`
- `getClosedQueuePriority`

### Action

Only lightly adjust them if renamed statuses require it.

### Why

These are not the first-pass architecture blockers.

Touch them only enough to keep the file coherent.

---

## Step 10. Export cleanup

### Current export problem

The return object still exports:

- `STATUS_OPTIONS`
- `stageAActionMap`
- `isStageAPostAppointmentStatus`
- `deriveStageAStatusFromOutcome`
- `isStageAReadyToConfirm`
- `buildStageATimeLabel`
- `getStageAWorkflowConfig`

### First-pass action

Remove all deleted Stage A exports.

Replace exports with only the neutral replacements that now exist.

### Do not move on until

- the public helper surface matches the new file structure
- no deleted Stage A function remains exported

---

## 4. Best First Stub Strategy

To keep this pass controlled, the safest replacement approach is:

1. remove old Stage A helpers
2. add temporary neutral replacements with minimal logic
3. keep the file valid
4. deepen business behavior in later passes

That means the first pass should prefer:

- correct architecture
- consistent naming
- stable helper output

over:

- maximum feature richness

---

## 5. Exact First Edit Inside The File

If we open the file and begin editing, the first literal code action should be:

### First edit

Replace:

- `const STATUS_OPTIONS = { A: ..., B: ... }`

with:

- a neutral workflow status catalog

### Second edit

Delete the entire Stage A helper cluster immediately after.

That gives the refactor its structural turning point as early as possible.

---

## 6. What Not To Do In The First Pass

Do not:

- rework appointment types
- redesign outcomes
- optimize copy wording deeply
- create final A/B/C estimator behavior
- rebuild President-side estimator displays
- rewrite unrelated helper utilities just because they are nearby

Those would slow down the first pass and increase risk.

---

## 7. First-Pass Done Condition

The first pass on `ai-abcx-workflow-helpers.js` is complete only when:

- no `StageA` estimator helper remains
- no workflow function uses stage branching as estimator architecture
- status lookup is neutral
- queue priority is neutral
- navigation target logic is compatible with neutral workflow states
- exports reflect the new architecture cleanly

That is the right stopping point before moving into the next shared file.
