# AI-ABCX Director Execution Matrix

This is the practical working board for implementation.

It converts the launch board and build schedule into one row-by-row matrix that can guide:

- implementation
- UI work
- dependency enforcement
- pricing decisions
- internal testing

It answers one question:

`What exactly must be finished for each director before AI-ABCX can launch as one connected system?`

Read this together with:

- [AI_ABCX_DIRECTOR_LAUNCH_BOARD.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_LAUNCH_BOARD.md)
- [AI_ABCX_DIRECTOR_BUILD_SCHEDULE.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_BUILD_SCHEDULE.md)
- [AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md)

---

## 1. Column Meaning

### Phase

The recommended implementation phase from the build schedule.

### Current Status

Current reality from the launch board:

- `Built`
- `Partial`
- `Spec Ready`
- `Not Started`

### Required Screens

The main user-facing screens or surfaces still needed.

### Required Logic

The most important workflow, state, or system logic still needed.

### Key Dependencies

The directors or shared layers this director must integrate with.

### Pricing Decision

The pricing question that still has to be settled.

### Test Scenario

The clearest first real workflow test for that director.

---

## 2. Execution Matrix

| Director | Executive | Phase | Current Status | Required Screens | Required Logic | Key Dependencies | Pricing Decision | First Test Scenario |
|---|---|---:|---|---|---|---|---|---|
| Follow-Up Director | `CRO` | 0 | `Built` | Final normalized director dashboard, President visibility cleanup | Follow-up state model, escalation rules, closed-loop visibility | CRM, Sales, Estimator, Call Handling | standalone vs bundled price, A/B/C upgrade rules | missed quote or callback enters follow-up and closes correctly |
| Dispatch Director | `COO` | 0 | `Built` | canonical Dispatch Director dashboard, President visibility cleanup | job routing, lane status normalization, assignment logic | Scheduling, Service, CRM | standalone vs dependent pricing | scheduled job is assigned and moves through dispatch states |
| Sales Director | `CRO` | 0 | `Built` | normalized Sales Director dashboard | sales-state tracking, quote-to-close visibility, conversion logic | Follow-Up, Estimator, Lead Generation | standalone vs bundle price, A/B/C rules | new lead becomes quote, follow-up, then closed sale |
| Estimator Director | `CRO` | 1 | `Spec Ready` | estimate intake screen, quote builder, estimate result/status screen | request capture, quote logic, accepted/not accepted states, source mapping | Website, Call Handling, Sales, Follow-Up, CRM | standalone price, bundle price, A/B/C pricing | website quote request becomes estimate and customer decision |
| Call Handling Director | `COO` | 1 | `Spec Ready` | call control/reporting dashboard, behavior package/settings view | receptionist behavior, qualification, after-hours, urgency, multilingual, booking handoff | Website, Scheduling, Follow-Up, Estimator, Sales, CRM | director fee plus minute usage policy | inbound call is answered, qualified, and routed correctly |
| Website Director | `CMO` | 1 | `Partial` | website analyzer view, website intake form, preview/approval view, website dashboard | hosted vs connector path, analyzer scoring, content generation, lead capture compatibility | Marketing, Advertising, Lead Generation, Call Handling, CRM | hosted A/B/C vs connector A/B/C pricing | analyze current site and recommend hosted or connector path |
| Scheduling Director | `COO` | 2 | `Partial` | Scheduling Director dashboard, scheduling control surface | manual vs automated scheduling states, appointment truth, upgrade path logic | Call Handling, Dispatch, Service, CRM, President shell | standalone vs dependent pricing and A/B/C rules | intake request becomes confirmed appointment with visible truth |
| Service Director | `COO` | 2 | `Partial` | Service Director operating dashboard | job-state oversight, service completion truth, workflow bottleneck visibility | Scheduling, Dispatch, Revenue Control, CRM | dependent vs standalone offer rules | appointment becomes active service job with visible outcome |
| Revenue Control Director | `CFO` | 2 | `Partial` | revenue truth dashboard, payment/outcome view | amount-paid truth, revenue state, job outcome reconciliation | Service, Reconciliation, CRM, President shell | standalone vs required-with-service logic | completed job updates final amount and revenue status |
| Lead Generation Director | `CRO` | 3 | `Partial` | lead source dashboard, lead queue, lead quality view | source classification, attribution, conversion visibility | Website, Advertising, SEO, Sales, Call Handling, CRM | standalone vs bundled growth pricing | ad or website source creates classified lead with attribution |
| Reactivation Director | `CRO` | 3 | `Partial` | reactivation dashboard, dormant-customer queue | old-customer trigger logic, win-back flow, outcome reporting | Follow-Up, Marketing, CRM | standalone vs bundle pricing | dormant customer receives reactivation flow and returns |
| Marketing Director | `CMO` | 3 | `Spec Ready` | Marketing Director dashboard, campaign/asset overview | A/B/C logic, campaign-state visibility, output/reporting model | Website, Advertising, SEO, Lead Generation, CRM | level pricing and bundle discounts | marketing activity generates measurable new lead flow |
| Advertising Director | `CMO` | 3 | `Partial` | ad campaign dashboard, spend/result view | campaign-state tracking, source mapping, spend-to-result visibility | Website, Lead Generation, Marketing, CRM | standalone vs dependent pricing | campaign produces leads with source preserved through sale |
| SEO Director | `CMO` | 3 | `Partial` | SEO dashboard, site-readiness/reporting view | search-readiness scoring, improvement reporting | Website, Marketing, Lead Generation | standalone vs website-dependent pricing | site is analyzed and SEO improvements are reported |
| Strategy Director | `CEO` | 4 | `Spec Ready` | strategy dashboard, goal approval view | monthly goals, President approval/correction flow, next-action framing | Executive Reporting, Accountability, President shell | included core vs priced strategic director | President receives goals and approves or edits them |
| Executive Reporting Director | `CEO` | 4 | `Partial` | explicit reporting dashboard, daily/weekly summary views | cross-director summaries, concise reporting outputs | President shell, all active directors | included core vs priced director decision | daily executive report reflects actual director states |
| Accountability Director | `CEO` | 4 | `Spec Ready` | accountability dashboard, scorecard views | executive/staff rating logic, monthly performance review | Executive Reporting, Service, Sales, Revenue Control | included core vs priced director decision | monthly accountability score is generated from workflow outcomes |
| Support Director | `CSO` | 4 | `Spec Ready` | support dashboard, client issue queue | support handling, escalation, visibility, response ownership | Customer Success, Retention, Feedback, CRM | standalone vs trust bundle pricing | customer issue is logged, routed, and resolved visibly |
| Customer Success Director | `CSO` | 4 | `Spec Ready` | success review dashboard | health monitoring, success review cadence, satisfaction tracking | Support, Retention, Reviews/Referrals, CRM | standalone vs CS bundle pricing | active client receives success review and health status |
| Retention Director | `CSO` | 4 | `Spec Ready` | retention dashboard, churn-risk view | churn detection, rescue actions, return-customer logic | Customer Success, Support, Follow-Up, CRM | standalone vs CS bundle pricing | at-risk customer is flagged and retention action is triggered |
| Reviews / Referrals Director | `CSO` | 4 | `Spec Ready` | reviews/referrals dashboard, request history view | review request timing, referral capture, reputation loop | Customer Success, Support, CRM | standalone vs CS bundle pricing | completed job triggers review request and logs response |
| Director of Feedback | `CPIO` | 5 | `Spec Ready` | feedback intake dashboard | visible feedback capture and routing | Support, Communication Board, CRM | included improvement layer vs priced later | complaint or suggestion enters feedback lane |
| Director of Analysis | `CPIO` | 5 | `Spec Ready` | analysis summary dashboard | pattern analysis and insight generation | Feedback, Reporting, Optimization | included improvement layer vs priced later | feedback and outcomes produce analysis summary |
| Director of Optimization | `CPIO` | 5 | `Spec Ready` | optimization recommendations view | recommendation logic, improvement proposals | Analysis, Strategy, Reporting | included improvement layer vs priced later | analysis generates actionable optimization proposal |
| Director of System Improvement | `CPIO` | 5 | `Spec Ready` | system-improvement tracker | change tracking, improvement-state visibility | Feedback, Analysis, Optimization | included improvement layer vs priced later | approved optimization becomes tracked improvement |
| Compliance Director | `CAO` | 5 | `Spec Ready` | compliance dashboard | compliance checks, compliance state visibility | Approval, Risk, Service, CRM | included governance layer vs later add-on | workflow is blocked or flagged by compliance rule |
| Approval Director | `CAO` | 5 | `Spec Ready` | approval routing dashboard | approval gates, hold/release states | Compliance, Risk, Strategy | included governance layer vs later add-on | item requires approval before next stage proceeds |
| Risk Director | `CAO` | 5 | `Spec Ready` | risk dashboard, escalation view | risk scoring, escalation rules, risk-state visibility | Compliance, Approval, Reporting | included governance layer vs later add-on | risky workflow state is flagged and escalated |
| Reconciliation Director | `CFO` | 5 | `Spec Ready` | reconciliation dashboard | reconcile service outcomes, payments, and revenue truth | Revenue Control, Accounting, CRM | standalone vs CFO bundle pricing | paid job is reconciled against recorded business truth |
| Accounting Director | `CFO` | 6 | `Spec Ready` | accounting dashboard | accounting-state tracking and back-office logic | Revenue Control, Reconciliation | launch vs later scope decision | revenue truth flows into accounting summary |
| Payroll Director | `CFO` | 6 | `Spec Ready` | payroll dashboard | pay-state logic and staff compensation visibility | Service, Accountability, Accounting | launch vs later scope decision | completed work contributes to payroll logic correctly |

---

## 3. Most Important Immediate Work

If we want the single clearest near-term execution focus, it is:

1. normalize `Follow-Up`, `Dispatch`, and `Sales`
2. build `Estimator Director`
3. build `Call Handling Director`
4. finish `Website Director`
5. connect those into `Scheduling`

That is the smallest sequence that starts turning AI-ABCX into a real high-value commercial system instead of a strong concept with partial modules.

---

## 4. Most Important Cross-Director Shared Systems

These shared systems must stay stable while directors are built:

- President shell / command view
- CRM / shared operating record
- director role registry
- A/B/C level architecture
- pricing engine
- guided activation / recommendation engine
- testing scenarios

If these drift, every director build gets slower and less trustworthy.

---

## 5. Recommended Next Step

The next strongest move is to make one more document:

`AI_ABCX_DIRECTOR_TEST_MATRIX.md`

That file should define:

- isolated tests for each director
- cross-director workflow tests
- invalid combination tests
- A -> B -> C upgrade tests
- President dashboard visibility tests

That would turn this planning set into a real launch execution system.

