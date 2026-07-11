# AI-ABCX Director Test Matrix

This document defines the practical internal testing matrix for AI-ABCX.

It answers one question:

`How do we prove that each director, each bundle, and the President-centered system actually works before launch?`

This matrix should guide:

- implementation QA
- prelaunch manual testing
- regression checks after changes
- bundle validation
- upgrade validation

Read this together with:

- [AI_ABCX_DIRECTOR_EXECUTION_MATRIX.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_EXECUTION_MATRIX.md)
- [AI_ABCX_DIRECTOR_BUILD_SCHEDULE.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_BUILD_SCHEDULE.md)
- [AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md](/Users/yakovnotkin/Documents/New%20project/AI_ABCX_DIRECTOR_LAUNCH_COMPLETION_CHECKLIST.md)

---

## 1. Test Rule

A director is not launch-ready just because:

- the screen exists
- the copy looks good
- the A/B/C definition is written

A director is only trustworthy when:

1. its own isolated workflow works
2. it writes correctly into shared system truth
3. the President can see its state correctly
4. it behaves correctly inside valid bundles
5. it upgrades correctly from `A -> B -> C`

---

## 2. Test Categories

### Isolated Director Test

Tests the director by itself with the smallest valid workflow.

### Bundle Test

Tests the director inside a realistic multi-director configuration.

### Upgrade Test

Tests the change from lower to higher level.

### Invalid Combination Test

Tests that unsupported or blocked combinations are prevented or clearly flagged.

### President Visibility Test

Tests that the President dashboard correctly reflects the director state and recommended next action.

---

## 3. Shared Global Tests

These tests must pass for the whole system.

| Test ID | Test Name | What It Verifies | Pass Condition |
|---|---|---|---|
| G-01 | President shell loads | President shell remains stable with active directors | dashboard loads with no broken states |
| G-02 | Shared CRM truth writes correctly | all active workflows write into shared truth consistently | no missing or conflicting core records |
| G-03 | A/B/C labeling consistency | level labels are presented consistently across all active directors | level labels match written architecture |
| G-04 | Recommendation summary consistency | activation summary matches actual configured system | summary and enabled modules agree |
| G-05 | Pricing consistency | visible pricing matches director selection and level | no hidden or contradictory prices |
| G-06 | Upgrade recalculation | changing one director level updates dependent logic and pricing | summary, rules, and price recalculate correctly |
| G-07 | President next-action visibility | President always sees current condition and next recommendation | visible next action appears and matches workflow state |

---

## 4. Tier 1 Director Tests

## Estimator Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| E-01 | Isolated | customer submits estimate request from website | request appears in CRM with source and estimate state |
| E-02 | Isolated | estimate request comes from call handling flow | estimate request is linked to caller record and routed correctly |
| E-03 | Isolated | quote is created and sent | quote status becomes visible to Sales and Follow-Up |
| E-04 | Isolated | customer accepts quote | accepted state is recorded and next workflow is triggered |
| E-05 | Isolated | customer does not accept quote | Follow-Up Director receives actionable state |
| E-06 | Bundle | Estimator + Sales + Follow-Up | lead moves through quote, visibility, and next action correctly |
| E-07 | Upgrade | Estimator A -> B | added functionality appears without losing prior estimate records |
| E-08 | Upgrade | Estimator B -> C | advanced workflow activates and President summary updates |
| E-09 | Invalid Combination | estimate requested without valid shared record | request is blocked or correctly forces CRM creation |
| E-10 | President Visibility | estimate is pending decision | President sees estimate state and recommended next action |

## Call Handling Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| C-01 | Isolated | standard inbound call | call is answered and recorded correctly |
| C-02 | Isolated | after-hours inbound call | after-hours behavior runs correctly |
| C-03 | Isolated | urgent caller path | urgent call is escalated or routed correctly |
| C-04 | Isolated | multilingual caller | language handling works and state is recorded |
| C-05 | Isolated | lead qualification call | qualification state is captured and routed properly |
| C-06 | Isolated | appointment-capable call | call creates correct scheduling-intent state |
| C-07 | Bundle | Call Handling + Scheduling | booked appointment path writes valid scheduling truth |
| C-08 | Bundle | Call Handling + Estimator | estimate request path is correctly created |
| C-09 | Upgrade | Call Handling A -> B | richer automation activates without breaking call record truth |
| C-10 | Upgrade | Call Handling B -> C | advanced behavior package activates and remains visible |
| C-11 | Invalid Combination | scheduling behavior requested without valid scheduling support | system blocks or clearly downgrades behavior |
| C-12 | President Visibility | unresolved or escalated call event | President sees issue and next recommended action |

## Website Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| W-01 | Isolated | existing website URL is submitted | analyzer produces status and recommendation |
| W-02 | Isolated | weak website is analyzed | weak-state reasons and recommendations are shown |
| W-03 | Isolated | no website path is chosen | hosted website intake flow begins correctly |
| W-04 | Isolated | business fills hosted site inputs | preview is generated successfully |
| W-05 | Isolated | no logo exists | system generates placeholder/generic logo path |
| W-06 | Bundle | Website + Marketing | intake/lead capture compatibility works |
| W-07 | Bundle | Website + Call Handling | website interactions map into call/lead paths correctly |
| W-08 | Upgrade | Website A -> B | connector or hosted feature set updates correctly |
| W-09 | Upgrade | Website B -> C | higher website capability appears with correct dependency rules |
| W-10 | Invalid Combination | client requests Website C with unsupported current site path | system requires hosted path or explains limitation |
| W-11 | President Visibility | website status is weak | President sees issue and recommendation |

---

## 5. Tier 2 Director Tests

## Scheduling Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| S-01 | Isolated | manual scheduling path | appointment state is recorded correctly |
| S-02 | Isolated | automated scheduling path | system creates correct confirmed scheduling state |
| S-03 | Bundle | Scheduling + Dispatch | scheduled appointment appears in dispatch lane correctly |
| S-04 | Bundle | Scheduling + Service | active appointment becomes visible service workflow |
| S-05 | Upgrade | Scheduling A -> B | added automation becomes available without losing record integrity |
| S-06 | Upgrade | Scheduling B -> C | highest automation logic activates correctly |
| S-07 | Invalid Combination | advanced automated scheduling without required supporting directors | system blocks or explains dependency |
| S-08 | President Visibility | appointment is pending confirmation | President sees schedule truth and next step |

## Dispatch Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| D-01 | Isolated | assigned appointment enters dispatch board | job is correctly routed and visible |
| D-02 | Bundle | Dispatch + Scheduling + Service | workflow moves from confirmed appointment to service state |
| D-03 | Upgrade | Dispatch A -> B | richer dispatch controls activate correctly |
| D-04 | Upgrade | Dispatch B -> C | highest dispatch-state logic activates correctly |
| D-05 | President Visibility | dispatch bottleneck occurs | President sees bottleneck and recommended action |

## Service Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| SV-01 | Isolated | job starts service workflow | service state becomes visible |
| SV-02 | Isolated | service outcome is entered | completion state writes back correctly |
| SV-03 | Bundle | Service + Revenue Control | finished service updates revenue truth |
| SV-04 | President Visibility | service lane has unresolved condition | President sees issue and next step |

## Revenue Control Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| R-01 | Isolated | amount paid is entered | revenue truth updates correctly |
| R-02 | Bundle | Revenue Control + Service | completed service outcome is reflected in financial truth |
| R-03 | Bundle | Revenue Control + Reconciliation | data stays aligned after reconciliation pass |
| R-04 | President Visibility | mismatch or pending revenue truth | President sees inconsistency clearly |

---

## 6. Tier 3 Growth Director Tests

## Lead Generation Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| LG-01 | Isolated | lead enters from website | source and category are preserved |
| LG-02 | Isolated | lead enters from advertising | campaign source is preserved |
| LG-03 | Bundle | Lead Generation + Sales | lead enters sales flow with source intact |
| LG-04 | President Visibility | low-quality or stalled lead pool | President sees lead condition and recommendation |

## Reactivation Director

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| RE-01 | Isolated | dormant customer is targeted | reactivation status is created |
| RE-02 | Bundle | Reactivation + Follow-Up | reactivated lead moves into active follow-up flow |
| RE-03 | President Visibility | reactivation campaign produces returns | President sees recovered activity |

## Marketing / Advertising / SEO Directors

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| M-01 | Bundle | Marketing + Website | site-ready content and capture path stay aligned |
| A-01 | Bundle | Advertising + Lead Generation | ad source creates tracked lead correctly |
| SEO-01 | Bundle | SEO + Website | SEO recommendations attach to website state properly |
| M-02 | President Visibility | growth channels underperform | President sees lane weakness and recommendation |

---

## 7. Executive and Trust Layer Tests

## Strategy / Reporting / Accountability

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| ST-01 | Isolated | monthly goals are generated | President receives goals for approval |
| ER-01 | Isolated | daily executive report is generated | report accurately reflects active directors |
| AC-01 | Isolated | monthly accountability scoring runs | scorecards are visible and traceable to activity |
| EX-01 | President Visibility | performance issue appears in one lane | President sees issue summarized correctly |

## Support / Customer Success / Retention / Reviews

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| SU-01 | Isolated | support issue is submitted | support ticket or issue state is visible |
| CS-01 | Isolated | client health review is generated | client success state appears correctly |
| RT-01 | Isolated | customer becomes at-risk | retention workflow is triggered |
| RR-01 | Isolated | completed job triggers review/referral request | request is recorded correctly |
| TR-01 | Bundle | support + retention + customer success | complaint becomes retention and service-improvement signal |

---

## 8. Improvement and Governance Layer Tests

## Feedback / Analysis / Optimization / System Improvement

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| FB-01 | Isolated | customer recommendation is submitted | feedback is logged visibly |
| AN-01 | Bundle | feedback plus performance data are analyzed | analysis summary is generated |
| OP-01 | Bundle | analysis generates recommendation | optimization action is proposed |
| SI-01 | Bundle | accepted optimization becomes tracked improvement | improvement state is visible |

## Compliance / Approval / Risk

| Test ID | Test Type | Scenario | Expected Result |
|---|---|---|---|
| CO-01 | Isolated | workflow hits compliance rule | compliance state is shown correctly |
| AP-01 | Isolated | workflow requires approval | next step is blocked until approval |
| RK-01 | Isolated | risk condition is triggered | risk state is logged and escalated |
| GV-01 | President Visibility | governance block appears | President sees reason and next required action |

---

## 9. Bundle Validation Matrix

These are the most important cross-director bundles that must be tested as realistic systems.

| Bundle ID | Bundle Name | Directors Included | What Must Work |
|---|---|---|---|
| B-01 | Front Door Bundle | Website + Call Handling + Estimator + Sales + Follow-Up | business can capture demand, create quote path, and preserve visibility |
| B-02 | Operations Bundle | Scheduling + Dispatch + Service + Revenue Control | business can move from appointment to completion to final truth |
| B-03 | Growth Bundle | Website + Marketing + Advertising + SEO + Lead Generation | business can create and classify demand with preserved attribution |
| B-04 | Trust Bundle | Support + Customer Success + Retention + Reviews / Referrals | business can maintain trust, handle issues, and generate reputation loops |
| B-05 | Executive Control Bundle | Strategy + Executive Reporting + Accountability + Revenue Control | President receives usable control and recommendations |
| B-06 | Full Commercial Bundle | Front Door Bundle + Operations Bundle | business can acquire, quote, schedule, dispatch, complete, and record revenue |
| B-07 | Full Growth Bundle | Full Commercial Bundle + Growth Bundle | business can attract demand and convert it inside one connected system |
| B-08 | Full System Bundle | all launch-critical directors except later back-office expansion | President sees one connected company operating model |

---

## 10. Upgrade Tests

These tests are mandatory because the product depends heavily on level flexibility.

| Upgrade ID | Scenario | Expected Result |
|---|---|---|
| U-01 | one director upgrades from A to B | feature set, rules, and pricing update correctly |
| U-02 | one director upgrades from B to C | highest level activates correctly |
| U-03 | dependent director must upgrade because related director upgraded | system enforces dependency clearly |
| U-04 | customer removes optional director | summary, pricing, and allowed workflows update correctly |
| U-05 | customer tries unsupported configuration | system blocks or explains why not allowed |
| U-06 | President dashboard after upgrade | dashboard reflects new structure with no stale states |

---

## 11. Recommended Testing Order

The most efficient test order is:

1. global shared tests
2. built director regression tests
3. Estimator Director tests
4. Call Handling Director tests
5. Website Director tests
6. Scheduling / Dispatch / Service / Revenue Control tests
7. bundle tests
8. upgrade tests
9. executive/trust layer tests
10. improvement/governance layer tests
11. full system bundle test

---

## 12. Launch Test Gate

AI-ABCX should not be treated as launch-ready until:

- all Tier 1 isolated tests pass
- all Tier 2 isolated tests pass
- bundles `B-01`, `B-02`, and `B-06` pass
- all upgrade tests pass
- President visibility remains accurate across all tested bundles

Only after that should we treat the broader launch set as commercially safe.

