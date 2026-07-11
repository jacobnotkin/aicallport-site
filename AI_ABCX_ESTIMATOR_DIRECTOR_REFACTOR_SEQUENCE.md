# AI-ABCX Estimator Director Refactor Sequence

This document converts the estimator planning work into one strict refactor order.

It is intentionally practical.

Its purpose is:

`define the exact estimator cleanup sequence we should follow before adding benchmark-grade estimator features`

This is not the benchmark file.

This is not the pricing file.

This is not the final capability definition for A / B / C.

This is the estimator cleanup and rebuild order.

---

## 1. Goal

Estimator Director should become:

- a full-capacity launch director
- visually clean
- commercially credible against the strongest estimator tools
- structurally connected to President visibility, follow-up, scheduling, and revenue truth

Before we add more features, we must remove the old rollout-stage model from the estimator path.

That is the first requirement.

---

## 2. Non-Negotiable Product Rules

These rules are locked for this refactor:

- `A / B / C` are director capability levels
- `A / B / C` are not rollout phases
- `X` is not designed now
- launch direction is full-system availability, not phased release
- Estimator Director must be built as a real revenue lane, not as a limited placeholder screen

Because of that:

- all estimator-facing old Stage A / Stage B rollout framing must be removed
- shared files that still enforce the old release model must be normalized

---

## 3. What This Refactor Is Solving

The current estimator foundation is useful, but it still has three major problems:

### Problem 1. Old rollout-stage model is still embedded

Estimator logic still depends on legacy stage-based behavior in shared workflow files.

### Problem 2. Estimator screen still feels partially restricted

The screen explains too many limits and not enough operating power.

### Problem 3. Estimator still has not reached benchmark-grade product depth

Even after cleanup, it still needs strong estimate-building, delivery, acceptance, revision, and follow-up behavior to compete with specialized estimator companies.

---

## 4. Strict Refactor Phases

The safest order is:

1. shared model cleanup
2. estimator surface cleanup
3. estimator workflow rebuild
4. President / follow-up realignment
5. benchmark feature expansion
6. end-to-end testing

This order matters.

If we start by polishing the estimator UI first, we will still be sitting on the wrong shared logic.

---

## 5. Phase 1: Shared Model Cleanup

### Objective

Remove the obsolete rollout-stage assumptions from the shared estimator path.

### Files

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`

### Required outcome

- no estimator path depends on old Stage A / Stage B rollout framing
- shared status logic becomes neutral and workflow-based
- job records stop expressing estimator progress through obsolete release-phase assumptions

### What must happen here

- remove old stage-specific workflow copy
- replace old release-phase assumptions with one shared estimator workflow model
- preserve useful shared state logic where possible
- keep all naming aligned with real estimator operating states

### Refactor target

Estimator records should revolve around states such as:

- `new_request`
- `intake_in_progress`
- `estimate_preparing`
- `estimate_sent`
- `waiting_on_customer`
- `revision_requested`
- `accepted`
- `follow_up_needed`
- `scheduled_after_acceptance`
- `lost`

### Phase 1 done when

- estimator no longer depends on rollout-stage state logic in shared helpers
- old stage metadata is removed or replaced with neutral workflow metadata

---

## 6. Phase 2: Estimator Surface Cleanup

### Objective

Make the estimator screen feel like a real director, not a restricted preview.

### File

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

### Required outcome

- top section is simplified
- visual hierarchy becomes cleaner
- quote work area becomes primary
- restriction-first messaging is removed
- screen communicates working power, not delayed activation

### What must happen here

- reduce top chrome
- reduce oversized action clusters
- keep only the highest-value actions visible at first glance
- strengthen the quote workspace hierarchy
- clean the left rail copy so it feels operational, not explanatory
- remove any lingering rollout-stage visual identity

### Visual result we want

The estimator should immediately understand:

- what quote is active
- what needs action
- what is waiting on the customer
- what was accepted
- what needs follow-up
- what requires revision

### Phase 2 done when

- the dashboard feels leaner
- the main work surface is easier to scan
- the estimator role reads as fully live

---

## 7. Phase 3: Estimator Workflow Rebuild

### Objective

Turn estimator from a nice shell into a benchmark-grade quoting lane.

### Core file

- `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

### Shared support files

- `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

### Required outcome

Estimator can actually manage:

- request intake
- quote creation
- quote revision
- quote send
- customer response
- unresolved quote follow-up
- quote outcome capture

### Minimum operating lanes

#### Intake lane

- request source
- customer details
- service type
- urgency
- request notes

#### Builder lane

- draft estimate
- estimate format
- line items or package structure
- internal notes
- delivery readiness

#### Delivery lane

- sent timestamp
- delivery method
- open / viewed / not viewed

#### Response lane

- accepted
- revision requested
- no response
- lost

#### Handoff lane

- follow-up
- scheduling
- President visibility

### Phase 3 done when

- estimator has a coherent full workflow
- quote movement is no longer vague
- next action is always visible

---

## 8. Phase 4: President and Follow-Up Realignment

### Objective

Make estimator outcomes read correctly inside the rest of AI-ABCX.

### Files

- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
- `/Users/yakovnotkin/Documents/New project/ai-abcx-president-follow-up-app.js`

### Required outcome

President and follow-up surfaces understand estimator truth in the new model.

### What must happen here

- replace old rollout-stage estimator summaries
- replace old follow-up language tied to obsolete Stage A / Stage B behavior
- add estimator outcome visibility such as:
  - quotes awaiting customer response
  - quotes needing revision
  - quotes accepted but not yet handed off
  - quotes lost
  - quotes requiring follow-up

### Phase 4 done when

- estimator outcomes appear naturally in President oversight
- follow-up can govern unresolved estimate opportunities cleanly

---

## 9. Phase 5: Benchmark Feature Expansion

### Objective

After cleanup, bring Estimator Director up to competitive standard.

### Key outside benchmark themes

- QuoteIQ
- Jobber
- Housecall Pro
- ServiceTitan

### AI-ABCX must at minimum match

- fast estimate creation
- multiple estimate formats
- professional delivery
- mobile-friendly acceptance
- revision handling
- visible next actions

### AI-ABCX should beat them by

- connected President visibility
- built-in follow-up continuity
- estimate source awareness
- better system integration
- structured corporate oversight

### Launch-standard feature targets

- standard estimate
- options estimate
- package estimate
- quick estimate
- quote source tracking
- quote outcome tracking
- follow-up pathway
- President visibility

### Phase 5 done when

- estimator is commercially credible on its own
- estimator feels like a serious launch director

---

## 10. Phase 6: Testing Gate

### Objective

Do not move estimator to “launch-ready” until the full workflow has been tested.

### Required test scenarios

1. website estimate request
2. call-origin estimate request
3. manual internal estimate creation
4. estimate sent and accepted
5. estimate sent and revision requested
6. estimate sent and no response
7. estimate marked lost
8. estimate escalated to follow-up
9. estimate accepted and passed into scheduling
10. President sees open estimate pressure correctly

### What must be tested

- data integrity
- UI clarity
- state transitions
- cross-screen consistency
- follow-up linkage
- President summary correctness

### Phase 6 done when

- estimator can be trusted as a real launch module

---

## 11. Strict File Order

This is the recommended build order by file:

1. `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`
2. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`
3. `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`
4. `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`
5. `/Users/yakovnotkin/Documents/New project/ai-abcx-president-dashboard-app.js`
6. `/Users/yakovnotkin/Documents/New project/ai-abcx-president-follow-up-app.js`
7. normalization files only where needed:
   - `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`
   - `/Users/yakovnotkin/Documents/New project/ai-abc-config.js`
   - `/Users/yakovnotkin/Documents/New project/ai-abc-data.js`

---

## 12. What Not To Do

Do not:

- rebuild estimator from zero
- redesign around the old stage rollout model
- over-focus on copy polish before workflow cleanup
- add benchmark features before removing obsolete shared logic
- treat visual cleanup as enough by itself

---

## 13. Practical Conclusion

The correct estimator path is:

`clean the shared model -> clean the estimator screen -> rebuild the estimator workflow -> realign President/follow-up -> add benchmark-grade estimator depth -> test end-to-end`

That is the safest path because it preserves what is already built, removes what is now wrong, and upgrades estimator in the right order.
