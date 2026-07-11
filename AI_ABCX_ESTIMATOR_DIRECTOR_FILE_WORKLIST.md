# AI-ABCX Estimator Director File Worklist

This document is the strict execution worklist for `Estimator Director`.

It sits below:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_IMPLEMENTATION_MAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_PRODUCT_SPEC.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md`

Its job is simple:

`show which files must change, what must change inside them, what stays, what gets removed, and what blocks estimator completion`

This is not a feature spec.

This is not a pricing file.

This is not a benchmark file.

This is the estimator execution map.

---

## 1. Current Estimator Position

Estimator Director is already built as a meaningful partial surface.

It should **not** be rebuilt from zero.

The correct direction is:

- keep the current estimator foundation
- remove old rollout-stage framing
- remove restriction-heavy language
- simplify the visual control area
- finish benchmark-grade estimator functions
- connect estimator cleanly into the larger AI-ABCX operating system

Important current product rule:

- `A / B / C` are **director capability levels**
- `A / B / C` are **not launch phases**
- `X` is **not being designed now**

That means any remaining old `Stage A / Stage B` release logic must be cleaned out of estimator-related shared logic.

---

## 2. Work Types

Each file below is tagged as one of these:

### Estimator Core

Directly shapes the Estimator Director product surface.

### Shared Workflow

Used by estimator and also by other parts of the system.

### Shared Config

Contains global model/config assumptions that still carry old stage logic.

### Shared President Surface

Connected downstream screen that estimator handoff depends on.

---

## 3. File-by-File Worklist

### 3.1 `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

**Type**

- `Estimator Core`

**Current role**

- main estimator dashboard
- personal queue
- personal calendar
- active quote workspace
- quote outcome lane
- availability editing
- open quote queue
- President handoff access

**What stays**

- estimator-specific shell
- personal-role idea
- assigned quotes model
- active quote workspace pattern
- calendar / availability concepts
- outcome entry concepts
- queue concepts
- President connection

**What gets removed**

- any remaining rollout-stage framing in product copy
- old “locked because stage” posture
- oversized top control cluster if it crowds the main work surface
- restriction-first text that tells the user what the system cannot do

**What gets renamed**

- any visible `stage` release language that implies phased rollout
- any copy that describes estimator as still waiting for activation rather than already being a real director

**What gets added**

- cleaner top structure with fewer, more meaningful actions
- benchmark-grade estimator workflow positioning
- clearer quote creation / quote editing / quote delivery hierarchy
- capability-level framing for A / B / C without rollout language
- stronger customer-facing estimate path
- stronger source-aware quote handling
- clearer acceptance / revision / follow-up branches

**What blocks estimator completion**

- if this screen still behaves like a partially disabled rollout surface
- if the top action area stays visually overloaded
- if quote-building logic is not strong enough to compare with QuoteIQ-class tools

**Priority**

- `highest`

---

### 3.2 `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

**Type**

- `Shared Workflow`

**Current role**

- shared status options
- workflow state logic
- next-action logic
- state color logic
- stage-specific explanations

**What stays**

- shared workflow helper structure
- state engine foundation
- color/status utility logic
- next-action utility pattern

**What gets removed**

- `STATUS_OPTIONS` split around old release stage assumptions
- old Stage A / Stage B explanatory text
- rollout-phase workflow assumptions
- any requirement that estimator behavior depends on old rollout activation stages

**What gets renamed**

- old stage-model terminology into neutral operating-state terminology
- any helper names that imply rollout-phase ownership instead of capability-level ownership

**What gets added**

- estimator-ready workflow states that work regardless of old release staging
- capability-aware logic where needed for A / B / C
- cleaner outcome logic for:
  - new request
  - preparing
  - sent
  - revision requested
  - waiting
  - accepted
  - lost
  - follow-up needed

**What blocks estimator completion**

- this file is one of the largest blockers
- estimator cannot be considered clean while shared workflow helpers still encode the obsolete rollout-stage model

**Priority**

- `highest`

---

### 3.3 `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

**Type**

- `Shared Workflow`

**Current role**

- source job data
- stage/status records
- shared record transitions
- state labels
- activity and visibility logic

**What stays**

- shared job-record model
- record mutation utilities
- record labeling helpers
- activity history pattern

**What gets removed**

- embedded release-stage branching where the same job behaves differently because of old rollout stage
- obsolete assumptions that estimator actions are locked until later rollout phases

**What gets renamed**

- old stage-based status framing into stable shared workflow terms
- any record structure that treats A and B as rollout environments instead of a now-obsolete system state

**What gets added**

- one estimator-ready workflow model
- source-aware estimate records
- cleaner quote outcome pathways
- more direct connection between estimator events and follow-up / scheduling / President visibility

**What blocks estimator completion**

- very high blocker
- estimator can look modern in the UI, but if the shared records are still built on old stage rollout assumptions, the underlying logic will remain inconsistent

**Priority**

- `highest`

---

### 3.4 `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`

**Type**

- `Shared Config`

**Current role**

- stage metadata and shared descriptive copy

**What stays**

- config-file role
- central metadata pattern

**What gets removed**

- `STAGE_META`
- all release-stage chips / notes / intros / flow explanations tied to Stage A / Stage B rollout

**What gets renamed**

- if needed, convert this file from stage metadata into neutral workflow metadata or level metadata

**What gets added**

- only if truly needed:
  - workflow-state metadata
  - capability-level metadata
  - neutral shared descriptors

**What blocks estimator completion**

- medium blocker by itself
- high blocker if other files still depend on this old stage metadata

**Priority**

- `high`

---

### 3.5 `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`

**Type**

- `Shared President Surface`

**Current role**

- President-facing visibility
- summaries
- decision logic
- follow-up visibility
- stage-driven operational messaging

**What stays**

- President oversight role
- quote / follow-up visibility
- executive summary structure
- decision prompts

**What gets removed**

- estimator-related summary language that still depends on old release-stage framing
- Stage A / Stage B operational narrative where estimator and scheduling are described as rollout phases

**What gets renamed**

- estimator references should describe real workflow capability, not rollout timing

**What gets added**

- estimator outcome language aligned with:
  - quote speed
  - open quote value
  - approval pressure
  - revision pressure
  - follow-up pressure

**What blocks estimator completion**

- medium-to-high blocker
- estimator can be built, but if President-facing summaries still speak the old rollout language, the system will feel inconsistent

**Priority**

- `high`

---

### 3.6 `/Users/yakovnotkin/Documents/New project/ai-abcx-president-follow-up-app.js`

**Type**

- `Shared President Surface`

**Current role**

- follow-up actions
- stage-specific save behavior
- recommendation logic
- action gating

**What stays**

- follow-up lane
- President escalation role
- saved business-outcome truth

**What gets removed**

- stage-specific follow-up language for old rollout phases
- old validation copy tied to Stage A / Stage B release model

**What gets renamed**

- follow-up logic should use workflow-state meaning instead of rollout-phase meaning

**What gets added**

- estimator-aligned follow-up behavior after:
  - quote sent
  - revision requested
  - no response
  - accepted but unscheduled
  - lost quote requiring reason capture

**What blocks estimator completion**

- medium blocker
- estimator handoff is not launch-ready until follow-up can read estimator outcomes without old rollout assumptions

**Priority**

- `high`

---

### 3.7 `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`

**Type**

- `Shared Workflow`

**Current role**

- record-facing UI / behavior layer tied to shared job data

**What stays**

- record app shell if estimator depends on it

**What gets removed**

- any rollout-stage exposure inherited from the old model

**What gets renamed**

- only where needed to align with neutral workflow naming

**What gets added**

- only if estimator workflows require richer record rendering or record actions

**What blocks estimator completion**

- currently secondary
- should be reviewed after the higher-priority workflow/config files

**Priority**

- `medium`

---

### 3.8 `/Users/yakovnotkin/Documents/New project/ai-abc-data.js`

**Type**

- `Shared Config`

**Current role**

- broader AI-ABCX shared data structure

**What stays**

- shared data model

**What gets removed**

- only old rollout assumptions if they directly affect estimator or shared workflow

**What gets renamed**

- only if estimator normalization exposes inconsistent role naming

**What gets added**

- estimator-level data only if central data ownership belongs here

**What blocks estimator completion**

- low-to-medium blocker
- review only after core estimator files are stabilized

**Priority**

- `medium`

---

### 3.9 `/Users/yakovnotkin/Documents/New project/ai-abc-config.js`

**Type**

- `Shared Config`

**Current role**

- broader product config

**What stays**

- general shared config patterns

**What gets removed**

- rollout-stage assumptions if present and estimator-relevant

**What gets renamed**

- only where global naming still conflicts with the current director model

**What gets added**

- capability-level metadata only if it belongs centrally

**What blocks estimator completion**

- low-to-medium blocker

**Priority**

- `medium`

---

### 3.10 `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`

**Type**

- `Shared Config`

**Current role**

- role registry / product naming normalization

**What stays**

- registry concept

**What gets removed**

- outdated naming if estimator still appears under older internal labels

**What gets renamed**

- normalize estimator role naming fully to:
  - `Estimator Director`

**What gets added**

- if needed:
  - level descriptors for A / B / C
  - shared ownership rules

**What blocks estimator completion**

- low blocker by itself
- becomes important if naming inconsistency creates cross-screen confusion

**Priority**

- `medium`

---

## 4. Estimator-Specific vs Shared-System Split

### Estimator-specific work

These changes are mostly local to the estimator experience:

- simplify top estimator chrome
- re-balance visual hierarchy
- improve action structure
- improve quote workspace
- improve estimator-facing language
- improve quote queue presentation
- improve outcome-entry posture

### Shared-system work

These changes affect more than estimator:

- remove old Stage A / Stage B rollout model from workflow helpers
- remove old stage metadata config
- normalize shared job-record logic
- normalize President summary language
- normalize follow-up logic

This distinction matters because estimator completion depends on both.

If we only improve the estimator screen visually, but do not remove the old rollout model from shared files, estimator will remain structurally inconsistent.

---

## 5. Strict Execution Order

The safest build order is:

1. clean estimator product direction in planning
2. clean shared workflow model
3. clean shared config model
4. clean estimator screen structure
5. upgrade estimator functions to benchmark standard
6. clean President visibility and follow-up handoff
7. test estimator end-to-end

### Order by file

1. `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
2. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`
3. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`
4. `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`
5. `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
6. `/Users/yakovnotkin/Documents/New project/ai-abcx-president-follow-up-app.js`
7. supporting normalization files as needed

---

## 6. Definition of Done For Estimator Cleanup

Estimator cleanup is done only when:

- no old rollout-stage framing remains in estimator-related workflow logic
- estimator screen no longer feels restriction-led
- top estimator workspace is visually simplified
- shared job records no longer depend on obsolete rollout assumptions
- President-side estimator summaries are aligned with the new model
- follow-up logic reads estimator outcomes cleanly
- estimator can then be upgraded against benchmark functions without legacy model conflicts

---

## 7. Practical Conclusion

The estimator problem is not:

- “we do not have estimator”

The real problem is:

- `we already have estimator, but it still sits on top of an obsolete rollout-stage workflow model and still needs benchmark-grade product completion`

That is actually good news.

It means the build path is:

- `refactor + normalize + upgrade`

not:

- `invent from nothing`
