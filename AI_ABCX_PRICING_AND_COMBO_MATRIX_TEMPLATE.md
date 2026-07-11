# AI-ABCX Pricing And Combo Matrix Template

This document is a working template for AI-ABCX pricing and combination design.

It is not the final pricing sheet yet.

Its purpose is to define:

- standalone module offers
- valid bundle offers
- level-based upgrade paths
- prerequisite restrictions
- where combo pricing can reduce the effective module cost

---

## 1. Core Pricing Rule

AI-ABCX pricing should be based on:

1. module
2. automation level
3. bundle size
4. dependency rules

That means price is not only about one feature.

It is about:

- what corporate function is active
- how advanced that function is
- whether the customer is buying one module or a connected package

---

## 2. Pricing Philosophy

The pricing model should support:

- low-friction A-level entry
- stronger value through connected bundles
- natural paid upgrades into B and C
- clear path toward full ABCX

Combo pricing should not be random.

It should reward:

- connected system adoption
- valid architectural combinations
- deeper buy-in to the corporate management model

---

## 3. Standalone Module Pricing Table

Use this table to define standalone module pricing.

| Module | Level | Standalone Monthly Price | Annual Price | Notes |
|---|---|---:|---:|---|
| President Core | A | TBD | TBD | Recommended always included; may not be sold alone publicly if it is treated as the mandatory system anchor. |
| CRM | A | TBD | TBD | Recommended always included for shared truth continuity. |
| Call Handling | A | TBD | TBD | Foundational AI intake layer. |
| Dispatcher | A | TBD | TBD | Foundational scheduling / routing control. |
| Closeout | A | TBD | TBD | Outcome and payment truth. |
| President Follow-Up | A | TBD | TBD | Continuity and unresolved business control. |
| Marketing | A | TBD | TBD | Foundational growth-control layer if included at launch. |

---

## 4. Launch Bundle Pricing Table

Use this table to define valid launch bundles and discounts.

| Bundle Name | Included Modules | Regular Combined Price | Bundle Price | Effective Discount | Notes |
|---|---|---:|---:|---:|---|
| President Core A | President Core A + CRM A | TBD | TBD | TBD | Minimum corporate structure entry. |
| Call Handling Core A | President Core A + CRM A + Call Handling A | TBD | TBD | TBD | Strong flagship entry path. |
| Operations Control A | President Core A + CRM A + Dispatcher A + Closeout A + Follow-Up A | TBD | TBD | TBD | Strong for companies with existing intake elsewhere. |
| Field Service Core A | President Core A + CRM A + Call Handling A + Dispatcher A + Closeout A + Follow-Up A | TBD | TBD | TBD | Strongest operations-first launch bundle. |
| Growth Core A | President Core A + CRM A + Marketing A + Follow-Up A | TBD | TBD | TBD | Strong growth-entry bundle if Marketing launches. |
| Full Launch ABCX Foundation | President Core A + CRM A + Call Handling A + Dispatcher A + Closeout A + Follow-Up A + Marketing A | TBD | TBD | TBD | Largest A-level bundle if Marketing launches. |

---

## 5. Upgrade Pricing Table

Use this table to define paid upgrades by level after new stages release.

### 5.1 B-Level Upgrade Pricing

| Module | Upgrade Path | Upgrade Monthly Price | Upgrade Annual Price | Prerequisites | Notes |
|---|---|---:|---:|---|---|
| President Core | A -> B | TBD | TBD | CRM B recommended | Stronger automation visibility and next-step pressure. |
| CRM | A -> B | TBD | TBD | None beyond existing CRM A | Stronger workflow-connected backbone. |
| Call Handling | A -> B | TBD | TBD | CRM B | Stronger routing and workflow connection. |
| Dispatcher | A -> B | TBD | TBD | CRM B; Call Handling B if Call Handling is part of the same workflow path | Stronger scheduling automation. |
| Closeout | A -> B | TBD | TBD | CRM B | Stronger outcome automation. |
| Follow-Up | A -> B | TBD | TBD | CRM B | Stronger continuity automation. |
| Marketing | A -> B | TBD | TBD | CRM B | Connected attribution and lead-quality layer. |

### 5.2 C-Level Upgrade Pricing

| Module | Upgrade Path | Upgrade Monthly Price | Upgrade Annual Price | Prerequisites | Notes |
|---|---|---:|---:|---|---|
| President Core | B -> C | TBD | TBD | CRM C recommended | Advanced management control. |
| CRM | B -> C | TBD | TBD | Existing CRM B | Advanced backbone intelligence. |
| Call Handling | B -> C | TBD | TBD | CRM C | Advanced call-management intelligence. |
| Dispatcher | B -> C | TBD | TBD | CRM C; Call Handling C if connected to the same advanced workflow | Advanced routing intelligence. |
| Closeout | B -> C | TBD | TBD | CRM C | Advanced outcome intelligence. |
| Follow-Up | B -> C | TBD | TBD | CRM C | Advanced unresolved-business intelligence. |
| Marketing | B -> C | TBD | TBD | CRM C | Recommendation-driven growth control. |

---

## 6. Valid Combo Restriction Table

Use this table to define what is valid, restricted, or unsupported.

| Combination | Status | Reason |
|---|---|---|
| President Core A + CRM A | Valid | Minimum corporate structure path. |
| Call Handling A + CRM A | Valid | Clean intake + record truth path. |
| Dispatcher A + CRM A | Valid | Scheduling control path for companies with outside intake. |
| Closeout A + CRM A | Valid | Outcome-truth path. |
| Marketing A + CRM A | Valid | Foundational growth-control path. |
| Dispatcher B + CRM A | Restricted | Dispatcher B should require CRM B. |
| Marketing B + CRM A | Restricted | Marketing B should require CRM B. |
| Closeout B + CRM A | Restricted | Closeout B should require CRM B. |
| Dispatcher B + Call Handling A | Restricted | If connected, the workflow may require matched B-level intake support. |
| Marketing C + CRM B | Restricted | Marketing C should require CRM C. |
| Any A-level module without President Core or CRM in the actual delivered architecture | Usually avoid | Risks breaking the unified corporate story unless explicitly designed as an exception. |

---

## 7. Effective Module Discount Table

Use this table to understand how bundles lower the effective cost per module.

| Bundle Name | Number Of Modules | Bundle Price | Effective Price Per Module | Discount Logic Notes |
|---|---:|---:|---:|---|
| President Core A | 2 | TBD | TBD | Entry point discount should be light; preserves system value. |
| Call Handling Core A | 3 | TBD | TBD | Good candidate for a stronger first-step discount. |
| Operations Control A | 5 | TBD | TBD | Good bundle to attract companies with existing phone handling. |
| Field Service Core A | 6 | TBD | TBD | Major connected-automation discount opportunity. |
| Growth Core A | 4 | TBD | TBD | Good lower-cost growth entry if Marketing launches. |
| Full Launch ABCX Foundation | 7 | TBD | TBD | Strongest system-adoption discount path. |

---

## 8. Price Strategy Questions

Before filling in actual numbers, answer:

1. Is President Core always included in every sale?
2. Is CRM always included in every sale?
3. Do we want low-price A-level modules as lead generators?
4. Which bundle should be the strongest commercial wedge?
5. Which bundle should feel like the best value?
6. How much cheaper should a bundle be than separate standalone module pricing?
7. Should annual plans receive an additional discount beyond bundle pricing?

---

## 9. Suggested Pricing Logic Direction

Not final numbers, just structural logic:

- standalone A-level module price = low-friction entry
- bundle price = lower effective module cost
- B-level upgrade = premium for stronger automation
- C-level upgrade = premium for advanced management automation
- full-system path = best aggregate value per module

This preserves:

- accessibility
- upsell power
- system-value perception

---

## 10. Sales Use Rule

This matrix should help sales explain:

- what can be bought alone
- what combinations are valid
- why some combinations require prerequisite upgrades
- how buying more connected modules reduces effective cost
- how clients grow toward full ABCX over time

This should make the pricing model feel logical, not arbitrary.

---

## 11. Main Definition

AI-ABCX pricing should be defined as:

`module price + automation level price + valid bundle discount + dependency-aware upgrade logic`

That is the pricing framework this matrix is meant to support.

---

## 12. Next Fill-In Steps

To make this usable as a real commercial sheet, the next steps are:

1. confirm which launch bundles are real
2. confirm whether President Core and CRM are mandatory anchors
3. set actual standalone A-level prices
4. set actual bundle discounts
5. set actual B-level and C-level upgrade pricing
