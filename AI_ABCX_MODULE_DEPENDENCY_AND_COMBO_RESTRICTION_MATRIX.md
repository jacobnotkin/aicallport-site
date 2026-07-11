# AI-ABCX Module Dependency And Combo Restriction Matrix

This document defines:

- module dependencies
- level dependencies
- valid combinations
- restricted combinations
- upgrade prerequisites

Its purpose is to keep the modular AI-ABCX system flexible without allowing invalid or incoherent module combinations.

---

## 1. Core Rule

AI-ABCX modules are modular, but not free-form.

That means:

- clients can buy modules separately
- clients can buy bundles
- clients can upgrade modules over time

But they must do so within a valid corporate architecture.

This matrix is the rulebook for that architecture.

---

## 2. Permanent Anchor Rule

The following must always be included:

- `President Core`
- `CRM`

These are not optional in the core structure.

They are the permanent anchors that allow all other modules to remain part of the same corporate system.

---

## 3. Stage Availability Rule

Combination validity is limited by release stage.

That means:

- during `Stage A`, only `A`-level module combinations are available
- after `Stage B` release, `B`-level upgrades and valid `B` combinations become available
- after `Stage C` release, `C`-level upgrades and valid `C` combinations become available

This matrix must always be read through that rule.

---

## 4. Dependency Principles

### Principle 1

Every active module must connect back to:

- President Core
- CRM

### Principle 2

Higher automation levels may require other modules to be at matching or minimum levels.

### Principle 3

Some modules can stand alone better than others.

### Principle 4

When a module relies on shared truth or workflow movement, weak backbone combinations should be restricted.

---

## 5. Module Dependency Table

| Module | Always Requires | Likely Higher-Level Requirements | Notes |
|---|---|---|---|
| President Core | CRM | None beyond CRM alignment | Permanent anchor. |
| CRM | President Core | None beyond own level path | Permanent anchor. |
| Call Handling | President Core, CRM | CRM B/C for Call Handling B/C | Writes intake truth into CRM. |
| Dispatcher | President Core, CRM | CRM B/C for Dispatcher B/C; Call Handling B/C if directly connected to that active call-driven workflow | Can still be used by companies with outside intake. |
| Closeout | President Core, CRM | CRM B/C for Closeout B/C | Outcome truth depends on CRM continuity. |
| President Follow-Up | President Core, CRM | CRM B/C for higher levels | Unresolved-business continuity depends on CRM truth. |
| Marketing | President Core, CRM | CRM B/C for Marketing B/C; Closeout and Follow-Up strengthen value but may not always be hard requirements | Growth truth depends on CRM backbone. |
| Accounting | President Core, CRM | Closeout and stronger CRM likely required at higher levels | Future module. |
| HR | President Core, CRM | CRM C+ and deeper management context likely required at higher levels | Future module. |

---

## 6. Standalone Validity Table

This shows what can be sold as a meaningful A-level entry path.

| Offer | Valid As Standalone Entry? | Reason |
|---|---|---|
| President Core A + CRM A | Yes | Minimum valid corporate structure entry. |
| Call Handling A + President Core A + CRM A | Yes | Clean foundational intake entry. |
| Dispatcher A + President Core A + CRM A | Yes | Clean scheduling/control entry for companies with other intake sources. |
| Closeout A + President Core A + CRM A | Yes | Clean outcome and revenue-truth entry. |
| Follow-Up A + President Core A + CRM A | Yes | Clean unresolved-business continuity entry. |
| Marketing A + President Core A + CRM A | Yes | Clean foundational growth-control entry. |

---

## 7. Valid A-Level Combinations

These are combinations that should be considered valid during Stage A.

| Combination | Status | Notes |
|---|---|---|
| President Core A + CRM A | Valid | Minimum system anchor path. |
| Call Handling A + CRM A + President Core A | Valid | Strong foundational intake package. |
| Dispatcher A + CRM A + President Core A | Valid | Strong scheduling/control package. |
| Closeout A + CRM A + President Core A | Valid | Strong outcome-truth package. |
| Follow-Up A + CRM A + President Core A | Valid | Strong continuity package. |
| Marketing A + CRM A + President Core A | Valid | Strong growth-entry package. |
| Dispatcher A + Closeout A + CRM A + President Core A | Valid | Strong operations control package. |
| Marketing A + Follow-Up A + CRM A + President Core A | Valid | Strong growth + unresolved-opportunity package. |
| Call Handling A + Dispatcher A + Closeout A + Follow-Up A + CRM A + President Core A | Valid | Strong field-service core operations package. |
| Call Handling A + Dispatcher A + Closeout A + Follow-Up A + Marketing A + CRM A + President Core A | Valid | Strong full A-level launch package. |

---

## 8. Restricted A-Level Combinations

These should be avoided or not sold in weak forms.

| Combination | Status | Reason |
|---|---|---|
| Any module without President Core | Restricted | Breaks the corporate management story. |
| Any module without CRM | Restricted | Breaks shared truth continuity. |
| Marketing A without CRM A | Restricted | Marketing cannot stand without source and lead truth. |
| Closeout A without CRM A | Restricted | Outcome truth becomes isolated. |
| Dispatcher A without CRM A | Restricted | Scheduling control loses shared record continuity. |

---

## 9. Valid B-Level Upgrade Rule

After `Stage B` release, B-level upgrades become possible.

The default rule should be:

- a module can upgrade from `A` to `B`
- but if its workflow depends on another active module, that related module may also need to be at `B`

### Important practical rule

Not every module needs every other module.

But when modules are actively connected in one workflow, level mismatch should be controlled.

---

## 10. Example B-Level Restrictions

| Combination | Status | Reason |
|---|---|---|
| Dispatcher B + CRM B + President Core B | Valid | Clean B-level operations path. |
| Marketing B + CRM B + President Core B | Valid | Clean B-level growth-control path. |
| Closeout B + CRM B + President Core B | Valid | Clean B-level outcome path. |
| Call Handling B + CRM B + President Core B | Valid | Clean B-level intake path. |
| Dispatcher B + CRM A | Restricted | Dispatcher B should rely on CRM B. |
| Marketing B + CRM A | Restricted | Marketing B should rely on CRM B. |
| Closeout B + CRM A | Restricted | Closeout B should rely on CRM B. |
| Follow-Up B + CRM A | Restricted | Follow-Up B should rely on CRM B. |
| Call Handling B + CRM A | Restricted | Call Handling B should rely on CRM B. |
| Dispatcher B + Call Handling A in the same connected workflow | Restricted | Connected workflow depth should stay aligned. |

---

## 11. Example C-Level Restrictions

After `Stage C` release, similar logic should apply at the management layer.

| Combination | Status | Reason |
|---|---|---|
| Marketing C + CRM C + President Core C | Valid | Clean advanced growth-management path. |
| Dispatcher C + CRM C + President Core C | Valid | Clean advanced dispatch-management path. |
| Closeout C + CRM C + President Core C | Valid | Clean advanced outcome-management path. |
| Marketing C + CRM B | Restricted | Marketing C should rely on CRM C. |
| Dispatcher C + CRM B | Restricted | Dispatcher C should rely on CRM C. |
| Closeout C + CRM B | Restricted | Closeout C should rely on CRM C. |
| Call Handling C + CRM B | Restricted | Call Handling C should rely on CRM C. |

---

## 12. Soft Dependency Rule

Some modules may not strictly require another module, but become much stronger with it.

These are soft dependencies.

Examples:

- Marketing is stronger with Closeout and Follow-Up
- Dispatcher is stronger with Call Handling
- Closeout is stronger with Dispatcher
- Marketing is stronger with Call Handling

Soft dependency means:

- valid without it
- better with it
- good target for bundle logic

---

## 13. Bundle Design Rule

Discounted bundles should be designed around:

- valid combinations
- soft dependencies
- strong workflow continuity

They should not be designed around random commercial grouping.

Examples of strong bundle logic:

- `Growth Core` = Marketing + Follow-Up + CRM + President Core
- `Operations Core` = Dispatcher + Closeout + Follow-Up + CRM + President Core
- `Field Service Core` = Call Handling + Dispatcher + Closeout + Follow-Up + CRM + President Core

---

## 14. Upgrade Design Rule

Upgrades should be guided by:

- module level
- release stage
- dependency readiness

The dashboard should eventually be able to show:

- what upgrades are available
- what prerequisites are missing
- what combinations would become valid after upgrade

This makes growth through the system easier and more structured.

---

## 15. Sales Rule

Sales should be able to explain:

- what can be bought now
- what cannot be bought yet
- what needs a prerequisite module or level
- why a bundle is valid
- why a higher-level module upgrade may require another upgrade too

This protects product coherence while still giving customers choices.

---

## 16. Main Definition

AI-ABCX module combinations should be defined as:

`modular but dependency-aware`

That means:

- flexible entry
- controlled upgrade paths
- preserved corporate architecture

This is the governing meaning of the matrix.
