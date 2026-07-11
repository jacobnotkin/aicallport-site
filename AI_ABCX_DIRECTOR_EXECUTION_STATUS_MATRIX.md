# AI-ABCX Director Execution Status Matrix

This document is the compressed execution board that sits on top of:

- `AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md`
- `AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md`
- per-director build checklists

Its purpose is simple:

`Show, in one place, what state each launch director is in right now and what must happen next.`

This is not the long-form inventory.

This is not the full checklist.

This is the working launch command board.

---

## 1. Status Key

### Build State

- `Implemented`
- `Partial`
- `Spec Only`
- `Missing`

### Readiness Meaning

- `Strong`
  There is enough visible product evidence to continue refinement and testing.

- `Medium`
  The direction is clear, but a meaningful product surface is still incomplete.

- `Low`
  Mostly concept, planning, or architecture. Product work still needs to begin.

---

## 2. Matrix Columns

- `Director`
- `Executive`
- `Commercial Role`
- `Build State`
- `Current Readiness`
- `A/B/C Logic`
- `Dependency Logic`
- `Pricing State`
- `Testing State`
- `Launch Priority`
- `Immediate Next Action`

---

## 3. Tier 1 Revenue / Entry Directors

| Director | Executive | Commercial Role | Build State | Current Readiness | A/B/C Logic | Dependency Logic | Pricing State | Testing State | Launch Priority | Immediate Next Action |
|---|---|---|---|---|---|---|---|---|---|---|
| Estimator Director | `CRO` | Quote capture, estimate generation, quote-to-close workflow | `Spec Only` | `Low` | `Needs product definition` | `Needs full mapping` | `Architecture discussed, not finalized` | `Not testable yet` | `Tier 1` | Build the first real Estimator Director surface and define exact A/B/C behavior. |
| Call Handling Director | `COO` | AI receptionist, intake, qualification, appointment initiation | `Spec Only` | `Medium` | `Conceptually strong, needs implementation lock` | `Needs full mapping` | `Architecture discussed, not finalized` | `Not testable yet` | `Tier 1` | Productize the call agent into a real director UI with reporting, usage, and escalation. |
| Website Director | `CMO` | Website creation, website monitoring, website connection layer | `Partial` | `Medium` | `Conceptually strong, needs formal lock` | `Needs connector/hosted path rules finalized` | `Architecture discussed, not finalized` | `Not testable yet` | `Tier 1` | Build the Website Director operating surface and separate hosted-site vs external-site connector logic. |
| Follow-Up Director | `CRO` | Quote follow-up, open loop closure, next-step control | `Partial` | `Strong` | `Needs final packaging` | `Needs final lock` | `Needs final launch sheet` | `Partial` | `Tier 1` | Normalize the current follow-up screens into the canonical director model and test full workflows. |
| Scheduling Director | `COO` | Appointment scheduling logic and booking control | `Partial` | `Medium` | `Spec base exists, needs product lock` | `Needs final lock` | `Needs final launch sheet` | `Partial` | `Tier 1` | Convert specs and dashboard logic into a customer-facing Scheduling Director module with A/B/C rules. |

---

## 4. Tier 2 Revenue / Operations Directors

| Director | Executive | Commercial Role | Build State | Current Readiness | A/B/C Logic | Dependency Logic | Pricing State | Testing State | Launch Priority | Immediate Next Action |
|---|---|---|---|---|---|---|---|---|---|---|
| Dispatch Director | `COO` | Route / job coordination and field flow control | `Partial` | `Strong` | `Needs final packaging` | `Needs final lock` | `Needs final launch sheet` | `Partial` | `Tier 2` | Normalize dispatcher surfaces into Dispatch Director and lock its relationship to Scheduling and Service. |
| Sales Director | `CRO` | Lead-to-sale conversion visibility and salesperson control | `Partial` | `Strong` | `Needs final packaging` | `Needs final lock` | `Needs final launch sheet` | `Partial` | `Tier 2` | Finish Sales Director as a full director with scenario-based testing and role-normalized naming. |
| Reactivation Director | `CRO` | Dormant lead/customer recovery | `Partial` | `Medium` | `Needs full definition` | `Needs final lock` | `Needs final launch sheet` | `Not testable yet` | `Tier 2` | Turn config-level concept into a real workflow module with audience, timing, and outcome tracking. |
| Lead Generation Director | `CRO` | Inquiry creation across web, ads, calls, and external sources | `Partial` | `Medium` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 2` | Build the lead-source surface and define how captured demand enters the system record. |
| Service Director | `COO` | In-job execution visibility and service operations control | `Partial` | `Medium` | `Needs full definition` | `Needs final lock` | `Needs final launch sheet` | `Not testable yet` | `Tier 2` | Isolate Service Director from general operations visibility and define its operational A/B/C levels. |
| Marketing Director | `CMO` | Customer-facing marketing system orchestration | `Spec Only` | `Medium` | `Spec exists, implementation missing` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 2` | Convert the existing marketing specs into a real module with controls, metrics, and launch flows. |
| Advertising Director | `CMO` | Paid demand generation and campaign control | `Partial` | `Medium` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 2` | Build a dedicated advertising surface and connect it to Website, Lead Generation, and Call Handling. |
| SEO Director | `CMO` | Organic discoverability and search visibility improvement | `Partial` | `Medium` | `Needs full definition` | `Needs website dependency lock` | `Needs final launch sheet` | `Not testable yet` | `Tier 2` | Define reporting, actions, and upgrade rules for SEO Director as a real launch module. |

---

## 5. Tier 3 Executive / Financial / Customer / Governance Directors

| Director | Executive | Commercial Role | Build State | Current Readiness | A/B/C Logic | Dependency Logic | Pricing State | Testing State | Launch Priority | Immediate Next Action |
|---|---|---|---|---|---|---|---|---|---|---|
| Strategy Director | `CEO` | Planning direction, operating priorities, executive guidance | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define Strategy Director outputs, decisions, and President-facing planning surfaces. |
| Executive Reporting Director | `CEO` | Executive summaries and management reporting | `Partial` | `Medium` | `Needs final packaging` | `Needs final lock` | `Needs final launch sheet` | `Partial` | `Tier 3` | Formalize what already exists in the President layer into a separate reporting director. |
| Accountability Director | `CEO` | Performance accountability and scorecard control | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define monthly scorecards, approvals, and President correction logic. |
| Revenue Control Director | `CFO` | Revenue truth and money visibility | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Build the revenue truth surface and connect it to Estimator, Sales, Service, and Follow-Up. |
| Reconciliation Director | `CFO` | Payment and recorded-truth reconciliation | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define reconciliation workflows and financial verification checkpoints. |
| Accounting Director | `CFO` | Accounting structure and bookkeeping visibility | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Decide launch depth and define scope clearly so it does not blur into later integrations. |
| Payroll Director | `CFO` | Payroll visibility and labor-cost structure | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Decide whether launch version is internal visibility only or includes deeper payroll workflows. |
| Support Director | `CSO` | Customer support handling and response ownership | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Convert support concepts into a real workflow with queue, escalation, and ownership. |
| Retention Director | `CSO` | Customer retention and churn prevention | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define retention triggers, actions, and outcomes tied to Follow-Up and Customer Success. |
| Reviews / Referrals Director | `CSO` | Review generation and referral growth | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Build visible review/referral workflows and define request timing across the customer lifecycle. |
| Director of Feedback | `CPIO` | Capture of internal and customer system feedback | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define intake structures and how feedback becomes system action. |
| Director of Analysis | `CPIO` | Analysis layer that interprets collected feedback and operations | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define analytical outputs, recommendation rules, and President-facing summaries. |
| Director of Optimization | `CPIO` | Optimization recommendations based on system findings | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define how optimization recommendations are generated, surfaced, and approved. |
| Director of System Improvement | `CPIO` | Structured product and workflow improvement control | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define the visible self-improvement lane and how it reports back to the President. |
| Compliance Director | `CAO` | Compliance oversight and rule adherence | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Decide the launch scope and define the first visible compliance controls. |
| Approval Director | `CAO` | Approval gates and authorization control | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define what requires approval, who sees it, and how President authority is preserved. |
| Risk Director | `CAO` | Risk visibility, exception flagging, and escalation | `Spec Only` | `Low` | `Needs full definition` | `Needs full mapping` | `Needs final launch sheet` | `Not testable yet` | `Tier 3` | Define risk categories, alert logic, and where risk appears in executive control views. |

---

## 6. Launch Readiness Snapshot

### Strongest current launch candidates

- `Follow-Up Director`
- `Dispatch Director`
- `Sales Director`
- `Scheduling Director`
- `Website Director`

### Strongest strategic but underbuilt commercial opportunities

- `Estimator Director`
- `Call Handling Director`
- `Website Director`
- `Marketing Director`

### Directors that mostly need normalization, packaging, and testing

- `Follow-Up Director`
- `Dispatch Director`
- `Sales Director`
- `Scheduling Director`
- `Executive Reporting Director`

### Directors that still need real product surfaces

- `Estimator Director`
- `Call Handling Director`
- `Marketing Director`
- almost all `Tier 3` directors

---

## 7. Recommended Use Of This Matrix

Use this file as the weekly command board.

Use the implementation inventory for full context.

Use the launch completion checklist for detailed acceptance rules.

Use the per-director build checklists when actively building a specific director.

---

## 8. Best Next Execution Order

1. `Finish Estimator Director`
2. `Finish Call Handling Director`
3. `Finish Website Director`
4. `Normalize and finish Follow-Up / Scheduling / Dispatch`
5. `Finish Sales / Reactivation / Lead Generation`
6. `Finish Marketing / Advertising / SEO`
7. `Formalize executive, financial, customer-success, and governance layers`

This order keeps launch work tied to:

- strongest entry offers
- strongest revenue conversion opportunities
- clearest dependency chains
- best path to real end-to-end testing
