# AI-ABCX Director Codebase Baseline

This document answers one practical repo question:

`Which directors are actually built in code right now, which are only structurally wired, and which still exist mostly as docs/specs?`

This is the code-truth baseline.

It is intentionally stricter than planning documents.

If a director has a strong spec but no real product surface, it should not be treated as fully built.

---

## 1. Status Rules

### Code Surface Present

There is a real `html` and/or `js` product surface that directly represents the director or its workflow.

### Structurally Wired

The director is present in config, role registry, President structure, or shared workflow logic, but does not yet have a dedicated standalone screen/app.

### Docs / Spec Only

The director has normalization files, product specs, or build checklists, but no meaningful product-facing code surface was found yet.

---

## 2. Core Reality

The repo already has:

- a real President-centered shell
- real dashboard/config structure
- real CRM/shared-record thinking
- a few real directors with visible product screens
- many normalized launch-definition files
- many product specs and build checklists

The repo does **not** yet have all launch directors fully built as product code.

So the honest answer is:

- `the director system is broadly designed`
- `the corporate map is wired`
- `only part of the launch director catalog is actually implemented as working product surfaces`

---

## 3. Strongest Real Product Surfaces

These are the clearest code-backed surfaces already in the repo:

- [new-president-dashboard.html](/Users/yakovnotkin/Documents/New%20project/new-president-dashboard.html)
- [ai-abcx-president-dashboard-app.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-app.js)
- [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js)
- [crm.html](/Users/yakovnotkin/Documents/New%20project/crm.html)
- [president-follow-up.html](/Users/yakovnotkin/Documents/New%20project/president-follow-up.html)
- [ai-abcx-president-follow-up-app.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-follow-up-app.js)
- [dispatcher-dashboard.html](/Users/yakovnotkin/Documents/New%20project/dispatcher-dashboard.html)
- [ai-abcx-dispatcher-dashboard-app.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-dispatcher-dashboard-app.js)
- [sales-dashboard.html](/Users/yakovnotkin/Documents/New%20project/sales-dashboard.html)
- [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js)

These are enough to say the system has a real operating shell, but not enough to say the full launch director catalog is already complete.

---

## 4. Director-by-Director Baseline

| Director | Current Code Status | Real Repo Evidence | What This Means Right Now |
|---|---|---|---|
| Estimator Director | `Docs / Spec Only` | [AI_ABCX_ESTIMATOR_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_PRODUCT_SPEC.md), [AI_ABCX_ESTIMATOR_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ESTIMATOR_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Well-defined on paper, not yet built as a real product surface. |
| Call Handling Director | `Docs / Spec Only` | [AI_ABCX_CALL_HANDLING_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_CALL_HANDLING_DIRECTOR_PRODUCT_SPEC.md), [AI_ABCX_CALL_HANDLING_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_CALL_HANDLING_DIRECTOR_ABC_LAUNCH_DEFINITION.md), [AI_ABCX_CALL_AGENT_AND_VOICE_STRUCTURE.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_CALL_AGENT_AND_VOICE_STRUCTURE.md) | Strong concept and package logic, but no dedicated product UI/app yet. |
| Website Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_WEBSITE_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_WEBSITE_DIRECTOR_PRODUCT_SPEC.md) | Present in system structure and launch thinking, but not yet a standalone coded director module. |
| Follow-Up Director | `Code Surface Present` | [president-follow-up.html](/Users/yakovnotkin/Documents/New%20project/president-follow-up.html), [ai-abcx-president-follow-up-app.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-follow-up-app.js) | One of the clearest real directors already built. |
| Scheduling Director | `Structurally Wired` | [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js), [AI_ABCX_SCHEDULING_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_SCHEDULING_DIRECTOR_PRODUCT_SPEC.md), [AI_ABCX_SCHEDULING_STATE_MACHINE.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_SCHEDULING_STATE_MACHINE.md) | Heavily defined and wired into logic, but no dedicated Scheduling Director screen/app yet. |
| Dispatch Director | `Code Surface Present` | [dispatcher-dashboard.html](/Users/yakovnotkin/Documents/New%20project/dispatcher-dashboard.html), [ai-abcx-dispatcher-dashboard-app.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-dispatcher-dashboard-app.js) | Real product surface exists, but still needs normalization into final launch director shape. |
| Service Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js), [AI_ABCX_SERVICE_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_SERVICE_DIRECTOR_PRODUCT_SPEC.md) | Service logic is present in the company model, but no dedicated Service Director app was found. |
| Support Director | `Docs / Spec Only` | [AI_ABCX_SUPPORT_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_SUPPORT_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Defined for launch architecture, not yet coded as a real module. |
| Sales Director | `Code Surface Present` | [sales-dashboard.html](/Users/yakovnotkin/Documents/New%20project/sales-dashboard.html), [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js) | Real sales surface exists, though still not fully normalized into final launch packaging. |
| Lead Generation Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_LEAD_GENERATION_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_LEAD_GENERATION_DIRECTOR_PRODUCT_SPEC.md) | Mapped in structure and specs, but not yet built as its own screen/app. |
| Reactivation Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_REACTIVATION_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_REACTIVATION_DIRECTOR_PRODUCT_SPEC.md) | Present in structure, not yet a fully coded launch module. |
| Marketing Director | `Docs / Spec Only` | [AI_ABCX_MARKETING_MODULE_MASTER_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_MARKETING_MODULE_MASTER_SPEC.md), [AI_ABCX_MARKETING_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_MARKETING_DIRECTOR_PRODUCT_SPEC.md) | Strong planning base, but no coded director surface found. |
| Advertising Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_ADVERTISING_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ADVERTISING_DIRECTOR_PRODUCT_SPEC.md) | Present in system structure, not yet a dedicated coded module. |
| SEO Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_SEO_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_SEO_DIRECTOR_PRODUCT_SPEC.md) | Structurally recognized, but not yet a standalone director surface. |
| Strategy Director | `Docs / Spec Only` | [AI_ABCX_STRATEGY_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_STRATEGY_DIRECTOR_PRODUCT_SPEC.md) | Defined conceptually, not yet coded as a separate director module. |
| Executive Reporting Director | `Structurally Wired` | [ai-abc-reporting.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-reporting.js), [new-president-dashboard.html](/Users/yakovnotkin/Documents/New%20project/new-president-dashboard.html) | Reporting logic exists, but not yet packaged as a dedicated director surface. |
| Accountability Director | `Structurally Wired` | [ai-abc-accountability.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-accountability.js), [AI_ABC_MONTHLY_ACCOUNTABILITY_SYSTEM.md](/Users/yakovnotkin/Documents/New%20project/AI_ABC_MONTHLY_ACCOUNTABILITY_SYSTEM.md) | Accountability logic exists, but not yet surfaced as a full product-facing director module. |
| Revenue Control Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_REVENUE_CONTROL_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_REVENUE_CONTROL_DIRECTOR_PRODUCT_SPEC.md) | Revenue truth is present in the shell, but no dedicated Revenue Control screen/app was found. |
| Reconciliation Director | `Docs / Spec Only` | [AI_ABCX_RECONCILIATION_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_RECONCILIATION_DIRECTOR_PRODUCT_SPEC.md) | Defined, not yet coded. |
| Accounting Director | `Docs / Spec Only` | [AI_ABCX_ACCOUNTING_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_ACCOUNTING_DIRECTOR_PRODUCT_SPEC.md) | Defined, not yet coded. |
| Payroll Director | `Docs / Spec Only` | [AI_ABCX_PAYROLL_DIRECTOR_PRODUCT_SPEC.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_PAYROLL_DIRECTOR_PRODUCT_SPEC.md) | Defined, not yet coded. |
| Customer Success Director | `Docs / Spec Only` | [AI_ABCX_CUSTOMER_SUCCESS_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_CUSTOMER_SUCCESS_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Defined, not yet coded. |
| Retention Director | `Docs / Spec Only` | [AI_ABCX_RETENTION_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_RETENTION_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Defined, not yet coded. |
| Reviews / Referrals Director | `Docs / Spec Only` | [AI_ABCX_REVIEWS_REFERRALS_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_REVIEWS_REFERRALS_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Commercially important, but no dedicated real module found yet. |
| Director of Feedback | `Structurally Wired` | [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js), [AI_ABCX_DIRECTOR_OF_FEEDBACK_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_OF_FEEDBACK_BUILD_CHECKLIST.md) | Role exists in system structure, but not yet as a coded product surface. |
| Director of Analysis | `Structurally Wired` | [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js), [AI_ABCX_DIRECTOR_OF_ANALYSIS_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_OF_ANALYSIS_BUILD_CHECKLIST.md) | Role exists in structure, not yet as a product module. |
| Director of Optimization | `Structurally Wired` | [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js), [AI_ABCX_DIRECTOR_OF_OPTIMIZATION_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_OF_OPTIMIZATION_BUILD_CHECKLIST.md) | Role exists in structure, not yet as a product module. |
| Director of System Improvement | `Structurally Wired` | [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New%20project/ai-abc-role-registry.js), [AI_ABCX_DIRECTOR_OF_SYSTEM_IMPROVEMENT_BUILD_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_OF_SYSTEM_IMPROVEMENT_BUILD_CHECKLIST.md) | Structurally present, not yet a standalone coded module. |
| Compliance Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_COMPLIANCE_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_COMPLIANCE_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Present in corporate structure, not yet a coded director module. |
| Approval Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_APPROVAL_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_APPROVAL_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Present in corporate structure, not yet a coded director module. |
| Risk Director | `Structurally Wired` | [ai-abcx-president-dashboard-config.js](/Users/yakovnotkin/Documents/New%20project/ai-abcx-president-dashboard-config.js), [AI_ABCX_RISK_DIRECTOR_ABC_LAUNCH_DEFINITION.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_RISK_DIRECTOR_ABC_LAUNCH_DEFINITION.md) | Present in corporate structure, not yet a coded director module. |

---

## 5. What This Means

### Directors that are most real today

These are the clearest code-backed directors:

- Follow-Up Director
- Dispatch Director
- Sales Director

### Directors that are real in the shell, but not yet standalone

These are already wired into config, role registry, or President logic:

- Website Director
- Scheduling Director
- Service Director
- Lead Generation Director
- Reactivation Director
- Advertising Director
- SEO Director
- Executive Reporting Director
- Accountability Director
- Revenue Control Director
- Feedback / Analysis / Optimization / System Improvement
- Compliance / Approval / Risk

### Directors that are still mostly product-definition work

These remain primarily spec-driven:

- Estimator Director
- Call Handling Director
- Marketing Director
- Support Director
- Strategy Director
- Reconciliation Director
- Accounting Director
- Payroll Director
- Customer Success Director
- Retention Director
- Reviews / Referrals Director

---

## 6. Launch Reality

If we judge only by the codebase as it exists today:

- the corporate operating system shell is real
- the President experience is real
- several supporting operational screens are real
- the full director catalog is **not** yet fully implemented

So before pricing every director as if it already exists in product form, we should treat the launch work as:

1. `real built modules`
2. `wired but incomplete modules`
3. `spec-defined modules still needing real UI / logic / tests`

That gives us a much cleaner implementation sequence and prevents us from assuming the launch catalog is already finished.

---

## 7. Recommended Next Step

Use this baseline together with:

- [AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_IMPLEMENTATION_INVENTORY.md)
- [AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md)

Then create one final launch board with four columns:

- `Built`
- `Partial`
- `Spec Ready`
- `Not Started`

That should become the execution map for the rest of the project.
