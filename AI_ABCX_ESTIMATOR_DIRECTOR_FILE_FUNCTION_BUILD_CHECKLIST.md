# AI-ABCX Estimator Director File/Function Build Checklist

This document turns the `Estimator Director` capability matrix into a strict implementation checklist tied to the current codebase.

It is meant to answer one execution question:

`Which exact files and functions must be kept, changed, removed, or added for Estimator Director to become launch-ready at Levels A / B / C?`

This document should be used together with:

- [AI_ABCX_ESTIMATOR_DIRECTOR_CAPABILITY_MATRIX.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_CAPABILITY_MATRIX.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_BUILD_CHECKLIST.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_FILE_WORKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_FILE_WORKLIST.md)
- [AI_ABCX_ESTIMATOR_DIRECTOR_IMPLEMENTATION_MAP.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_IMPLEMENTATION_MAP.md)

---

## 1. Locked Rules Before Build

- `A / B / C` are `director capability levels`
- `A / B / C` are `not rollout phases`
- `X` is `not in current scope`
- Estimator Director launches as a real director, not as a disabled preview
- Old `Stage A / Stage B` release behavior must be removed from estimator logic

If any estimator surface still behaves like a rollout-phase demo, estimator is not complete.

---

## 2. Completion Standard

Estimator Director is only complete when all of the following are true:

1. estimate demand can enter from all required launch sources
2. the request moves through one clean quote workflow model
3. customer-facing estimate states are visible and real
4. A / B / C materially differ in capability, not in label only
5. follow-up, scheduling, President view, and revenue visibility connect cleanly
6. old rollout-stage restrictions are removed from shared logic
7. the estimator dashboard feels like a working product, not a blocked workstation

---

## 3. Checklist Format

Each item below is locked in this format:

- `File`
- `Function / Surface`
- `Current state`
- `Required action`
- `Level impact`
- `Definition of done`
- `Test gate before moving on`

---

## 4. Estimator Core Surface

## 4.1 `/Users/yakovnotkin/Documents/New project/estimator-dashboard.html`

### Item E1

- `Function / Surface`: overall estimator shell, layout, top workspace
- `Current state`: strong branded shell exists, but top control area is too large and still carries old locked/manual language
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - top area is reduced and work-first
  - dashboard opens with live estimator value, not restriction-first copy
  - no rollout-phase wording remains
  - estimator reads as a real director across all levels
- `Test gate before moving on`:
  - open estimator dashboard and confirm the first screen communicates:
    - who owns the quote
    - current job context
    - next action
    - customer quote state
  - no visible copy says the director is waiting for future activation

### Item E2

- `Function / Surface`: `estimatorCapabilityMap`
- `Current state`: simple boolean map for `A`, `B`, `C` exists but is too shallow to represent real capability depth
- `Required action`: replace
- `Level impact`: A, B, C
- `Definition of done`:
  - capability map reflects real differences from the locked matrix
  - A = visible estimate control
  - B = connected estimate workflow
  - C = advanced estimate-conversion orchestration
  - no fake level separation
- `Test gate before moving on`:
  - switching levels changes actual behavior and UI surfaces, not only wording

### Item E3

- `Function / Surface`: `applyEstimatorBusinessCopy`
- `Current state`: estimator copy exists, but some wording still reflects old workstation / restricted access framing
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - copy reflects commercial product language
  - copy explains real estimator outcomes
  - copy matches current product rule: level depth, not rollout phase
- `Test gate before moving on`:
  - sidebar, profile, and top-area text all align with the capability matrix and benchmark position

### Item E4

- `Function / Surface`: `getEstimatorRecords`, `getSelectedRecord`, `getSelectedJobId`, `getSelectedRouteDate`
- `Current state`: selection utilities exist and are usable
- `Required action`: keep and harden
- `Level impact`: A, B, C
- `Definition of done`:
  - record selection stays stable
  - dashboard can switch between assigned quote records without URL-edit hacks
  - selection works for different estimate states
- `Test gate before moving on`:
  - select multiple routed records and confirm all child panels update correctly

### Item E5

- `Function / Surface`: `inferEstimateSource`, `inferUrgency`, `inferComplexity`, `inferEstimateType`, `getEstimateTypeMeta`
- `Current state`: source and estimate metadata helpers already exist
- `Required action`: expand
- `Level impact`: A, B, C
- `Definition of done`:
  - launch intake sources are classified correctly:
    - website
    - AI call handoff
    - ad / campaign
    - manual internal
    - referral / social
    - existing customer
  - estimate type logic supports:
    - standard
    - options
    - package
    - quick estimate path where allowed
- `Test gate before moving on`:
  - at least one example record from each source displays correct source and estimate-type metadata

### Item E6

- `Function / Surface`: `buildEstimateLineItems`, `summarizeEstimateBuilder`
- `Current state`: quote structure exists, but benchmark-grade estimate logic is not yet confirmed
- `Required action`: expand
- `Level impact`: A, B, C
- `Definition of done`:
  - A supports standard estimate
  - B adds real options estimate logic
  - C adds package estimate logic and stronger quick-estimate support
  - line items produce believable customer-facing quote structure
- `Test gate before moving on`:
  - create one working example for each estimate structure:
    - standard
    - options
    - package
    - quick estimate
  - each one must show a credible customer decision path

### Item E7

- `Function / Surface`: `renderEstimatorCustomerQuote`
- `Current state`: customer quote preview exists
- `Required action`: upgrade
- `Level impact`: A, B, C
- `Definition of done`:
  - preview matches benchmark expectation for a clean customer quote experience
  - quote state is visible:
    - sent
    - revision requested
    - waiting
    - accepted
    - lost
  - A / B / C difference appears in quote structure, not only header text
- `Test gate before moving on`:
  - for each level, preview one quote that shows the correct customer experience and decision state

### Item E8

- `Function / Surface`: `renderEstimatorHandoffState`
- `Current state`: handoff visibility exists
- `Required action`: expand
- `Level impact`: B, C primarily, with A baseline
- `Definition of done`:
  - A shows visible downstream path
  - B shows cleaner follow-up and scheduling continuity
  - C shows strongest follow-up, sales, scheduling, and revenue orchestration
- `Test gate before moving on`:
  - accepted quote, revision quote, and follow-up-needed quote each show correct downstream lane connections

### Item E9

- `Function / Surface`: `buildEstimatorStatusCounts`, `summarizeEstimatorRecords`, `applyEstimatorSummary`
- `Current state`: summary logic exists, but still tied to old status vocabulary
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - summaries use the new estimator workflow model
  - open / sent / revision / waiting / accepted / lost / follow-up are counted clearly
  - summary cards support President-level visibility later
- `Test gate before moving on`:
  - counts remain correct when sample records change status across all supported estimator states

### Item E10

- `Function / Surface`: `renderRouteBoard`, `renderEstimatorSupplementalLists`
- `Current state`: assigned board and history views exist
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - assigned work board shows only relevant estimator work
  - history uses new stable workflow terms
  - unresolved quote backlog is obvious
  - accepted, lost, and revision history are distinct enough to matter
- `Test gate before moving on`:
  - estimator can identify:
    - what is active
    - what is waiting
    - what needs follow-up
    - what is closed
  in one pass without reading raw record text

### Item E11

- `Function / Surface`: `buildEstimatorFlowState`
- `Current state`: flow model exists but still reflects assignment / claim / confirm sequence built around old stage behavior
- `Required action`: replace
- `Level impact`: A, B, C
- `Definition of done`:
  - flow expresses one quote-conversion lane:
    - request
    - preparing
    - sent
    - revision / waiting
    - accepted / lost / follow-up
    - next operating action
  - no rollout-stage concept remains
- `Test gate before moving on`:
  - flow panel stays accurate for all core estimator statuses

### Item E12

- `Function / Surface`: `writeSharedEstimatorOutcome`, `writeSharedEstimatorConfirmation`, `writeSharedEstimatorCustomerApproval`, `writeSharedEstimatorReroute`
- `Current state`: mutation utilities already exist
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - all write actions use the new shared status model
  - outcome write paths are aligned with estimator capability levels
  - reroute logic exists only where estimator routing truly applies
- `Test gate before moving on`:
  - every write action changes shared records without creating impossible state combinations

### Item E13

- `Function / Surface`: `buildEstimatorJobContext`, `applyJobContext`
- `Current state`: core binding layer exists and is one of the strongest reusable parts
- `Required action`: keep and expand
- `Level impact`: A, B, C
- `Definition of done`:
  - one record drives all estimator panels
  - context updates for source, quote type, customer state, handoff, and next action
  - level-sensitive behavior is applied centrally here where possible
- `Test gate before moving on`:
  - switch records repeatedly and confirm all estimator panels remain synchronized

### Item E14

- `Function / Surface`: result selection and outcome entry:
  - `renderResultSelection`
  - result button state
  - `formatResultLabel`
- `Current state`: structured outcome selection exists
- `Required action`: refine
- `Level impact`: A, B, C
- `Definition of done`:
  - outcome choices map cleanly to real estimator outcomes
  - outcomes are business-meaningful, not generic
  - multiple-choice result path is cleaner than freeform note-first behavior
- `Test gate before moving on`:
  - estimator can complete one quote as:
    - accepted
    - lost
    - revision requested
    - follow-up needed
  with no ambiguity in downstream state

### Item E15

- `Function / Surface`: availability editor and calendar:
  - `renderEditor`
  - `renderCalendar`
  - `collectValidation`
  - `evaluateAssignmentFit`
  - `getRouteReadiness`
  - `bindWindowEvents`
- `Current state`: strong personal availability foundation already exists
- `Required action`: keep, then realign
- `Level impact`: B, C primarily
- `Definition of done`:
  - availability editing remains useful where estimator routing matters
  - wording is estimator-level, not rollout-stage
  - route fit and reroute readiness support B and C behavior
  - A does not pretend to automate what it does not actually automate
- `Test gate before moving on`:
  - blocked route, tight capacity route, and valid route each display correct behavior

---

## 5. Shared Workflow Logic

## 5.1 `/Users/yakovnotkin/Documents/New project/ai-abcx-workflow-helpers.js`

### Item W1

- `Function / Surface`: `STATUS_OPTIONS`
- `Current state`: split by old stage model
- `Required action`: replace
- `Level impact`: A, B, C
- `Definition of done`:
  - a single estimator-ready status vocabulary exists
  - no release-stage split remains
  - statuses support the capability matrix
- `Test gate before moving on`:
  - all estimator UI surfaces can render without referencing old stage-specific labels

### Item W2

- `Function / Surface`: `stageAActionMap`
- `Current state`: old rollout-phase action map
- `Required action`: remove and replace
- `Level impact`: A, B, C
- `Definition of done`:
  - action logic reflects estimator outcomes, not rollout-phase permissions
- `Test gate before moving on`:
  - no estimator interaction depends on `stageAActionMap`

### Item W3

- `Function / Surface`:
  - `isStageAPostAppointmentStatus`
  - `deriveStageAStatusFromOutcome`
  - `isStageAReadyToConfirm`
  - `getStageAWorkflowConfig`
- `Current state`: explicit old stage rollout helpers
- `Required action`: remove and replace
- `Level impact`: A, B, C
- `Definition of done`:
  - neutral helpers exist for estimator workflow transitions
  - helper names reflect shared operating logic, not stage rollout
- `Test gate before moving on`:
  - grep for `StageA` references in estimator-related workflow paths returns zero required runtime dependencies

### Item W4

- `Function / Surface`: status-tone and next-action helpers
- `Current state`: usable foundation but tied to old statuses
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - new statuses produce correct tones and next actions
  - next action language matches the estimator operating lane
- `Test gate before moving on`:
  - every estimator status has one unambiguous next-action output

---

## 6. Shared Record Model

## 6.1 `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records.js`

### Item R1

- `Function / Surface`: sample record schema and state records
- `Current state`: records still store old `stages` structure and old stage-specific statuses
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - records use one stable estimator workflow model
  - launch sample records cover all important estimator cases
  - source tagging is preserved on records
- `Test gate before moving on`:
  - sample data includes at least:
    - new request
    - sent quote
    - revision requested
    - accepted quote
    - lost quote
    - follow-up-needed quote

### Item R2

- `Function / Surface`: `ensureStageRecord`
- `Current state`: explicitly builds old stage-based record objects
- `Required action`: replace
- `Level impact`: A, B, C
- `Definition of done`:
  - new record initializer uses stable workflow data, not stage rollout containers
- `Test gate before moving on`:
  - new records can initialize without `stage === "A"` or `stage === "B"` branching

### Item R3

- `Function / Surface`: estimator-related state helpers:
  - `buildJobFocus`
  - `deriveWorkerStageStatus`
  - worker confirm / customer confirm / reroute mutators
- `Current state`: behavior tied to worker confirmation and shared Stage A / B model
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - quote state transitions are estimator-native
  - accepted, lost, revision, follow-up, and reroute are handled intentionally
  - mixed quote-to-service conversion remains possible where needed
- `Test gate before moving on`:
  - no impossible transitions remain in the sample estimator records

### Item R4

- `Function / Surface`: outcome labels and follow-up reasons
- `Current state`: useful partial structure already exists
- `Required action`: keep and refine
- `Level impact`: A, B, C
- `Definition of done`:
  - outcome labels support the new matrix
  - follow-up reasons are meaningful for estimate operations
- `Test gate before moving on`:
  - follow-up reason outputs are commercially readable, not internal-only jargon

---

## 7. Shared Record App Layer

## 7.1 `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-app.js`

### Item A1

- `Function / Surface`: stage query / stage buttons / stage chip behavior
- `Current state`: old stage-based app mode still active
- `Required action`: remove and replace
- `Level impact`: A, B, C
- `Definition of done`:
  - estimator-related record app no longer depends on rollout-stage switching
  - if level switching exists, it is capability-level switching only
- `Test gate before moving on`:
  - query string and UI no longer expose old rollout-phase toggles for estimator behavior

### Item A2

- `Function / Surface`: app workflow panels and requirements blocks
- `Current state`: `stageAWorkflow`, `stageARequirements`, `stageAActionButtons` still drive logic
- `Required action`: replace
- `Level impact`: A, B, C
- `Definition of done`:
  - workflow explainer shows estimator-ready operating path
  - no runtime dependency remains on Stage A manual flow helpers
- `Test gate before moving on`:
  - estimator-related record detail view can load and explain the workflow without stage-based branching

### Item A3

- `Function / Surface`: status summaries, chips, and save messages
- `Current state`: status rendering exists but still references stage-specific logic and wording
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - summaries use the new shared status model
  - save messages reflect capability-level product behavior
- `Test gate before moving on`:
  - no user-facing message says “selected stage view” or similar rollout phrasing

---

## 8. Shared Config

## 8.1 `/Users/yakovnotkin/Documents/New project/ai-abcx-job-records-config.js`

### Item C1

- `Function / Surface`: stage metadata and intro copy
- `Current state`: copy still explains records as surviving across Stage A and Stage B
- `Required action`: replace
- `Level impact`: A, B, C
- `Definition of done`:
  - shared config copy aligns with the current launch model
  - no estimator explanation references rollout phases
- `Test gate before moving on`:
  - grep for `Stage A` and `Stage B` in estimator-related config returns no active estimator messaging

---

## 9. Role Registry

## 9.1 `/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js`

### Item G1

- `Function / Surface`: estimator role definition and dependencies
- `Current state`: role registry still uses `stageDependencies`
- `Required action`: refactor
- `Level impact`: A, B, C
- `Definition of done`:
  - estimator role is defined through capability-level availability, not rollout-stage dependency
  - `visibilityScope: "estimate-lane"` stays if still correct
- `Test gate before moving on`:
  - estimator role can be declared launch-ready without stage dependency rules

---

## 10. Launch Capability Checks By Level

## 10.1 Level A must pass

- standard estimate works
- source tagging works
- quote states are visible
- customer quote can be sent and accepted
- unresolved estimate remains visible to President
- no old rollout-stage logic blocks the lane

## 10.2 Level B must pass

- all Level A tests
- options estimate works
- revisions behave intentionally
- follow-up connection is real
- accepted estimate moves more cleanly toward scheduling / next action
- route / availability logic is commercially useful

## 10.3 Level C must pass

- all Level B tests
- package estimate works
- quick-estimate support is commercially real
- source-aware handling is strongest
- executive / President visibility is strongest
- estimator behaves like a conversion system, not just a quoting screen

---

## 11. Final Stop Rule

Do not move Estimator Director to “done” if any of these remain true:

- old `Stage A / Stage B` logic still drives estimator behavior
- A / B / C differ mainly by copy instead of workflow depth
- quote delivery looks polished but downstream state logic is inconsistent
- the dashboard still feels like a blocked or half-activated surface
- benchmark comparison cannot honestly say AI-ABCX matches the market minimum on quote workflow

If any one of those is still true, estimator is not complete.
