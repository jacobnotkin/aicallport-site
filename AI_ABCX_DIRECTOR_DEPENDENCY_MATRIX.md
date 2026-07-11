# AI-ABCX Director Dependency Matrix

## Purpose
This document defines how launch directors relate to each other commercially and operationally.

It is meant to answer five practical questions:
- which directors can be sold by themselves
- which directors only make sense with upstream data
- which combinations are valid at `A / B / C`
- which combinations should be recommended together
- which dependency rules the diagnostic and pricing system must enforce

This is a launch-planning document, not a final pricing sheet.

---

## Core Rule
Every launch director may exist at `A / B / C`.

But:
- not every director is a valid standalone entry point
- not every level is valid in isolation
- some directors can be bought alone but become much stronger when connected
- some directors should only unlock when supporting directors or supporting infrastructure exist

---

## Dependency Types

### `Independent`
Can be sold as the main reason a client enters AI-ABCX.

### `Soft Dependency`
Can function alone, but becomes substantially stronger with connected directors.

### `Hard Dependency`
Should not be activated unless another director, data source, or operating condition exists.

### `Level Dependency`
A director may be valid at `A`, but `B` or `C` requires other connected directors or infrastructure.

---

## Commercial Independence Summary

### Strong Independent Entry Directors
- Estimator Director
- Call Handling Director
- Website Director
- Follow-Up Director
- Scheduling Director
- Marketing Director

### Conditional Independent Entry Directors
- Sales Director
- Reactivation Director
- SEO Director
- Advertising Director
- Customer Success Director
- Support Director
- Reviews & Referrals Director

These can be sold independently in the right business context, but usually need either data, traffic, customer volume, or an existing workflow to be valuable.

### Primarily Dependent Directors
- Dispatch Director
- Lead Generation Director
- Service Director
- Executive Reporting Director
- Accountability Director
- Strategy Director
- Revenue Control Director
- Reconciliation Director
- Accounting Director
- Payroll Director
- Compliance Director
- Approval Director
- Risk Director

These usually need the rest of the operating system to exist before they become commercially meaningful.

---

## Director-by-Director Matrix

| Director | Commercial Status | Can Work Alone? | Hard Dependencies | Soft Dependencies | Level Rules |
| --- | --- | --- | --- | --- | --- |
| Estimator Director | Strong Independent | Yes | None | Follow-Up, Sales, Call Handling, Website | `A` can stand alone. `B/C` become much stronger with Follow-Up and Sales. |
| Call Handling Director | Strong Independent | Yes | None | Scheduling, Estimator, Follow-Up, Website | `A` can stand alone. `B` should prefer Follow-Up. `C` strongly prefers Scheduling and Estimator. |
| Website Director | Strong Independent | Yes | None | Marketing, SEO, Advertising, Lead Generation, Call Handling | `A` can stand alone. `B/C` may require AI-ABCX website path or connector readiness. |
| Follow-Up Director | Strong Independent | Yes, if real lead/job events exist | Real lead/job/customer records | Sales, Estimator, Call Handling, Customer Success, Reactivation | `A` can work with simple records. `B/C` need cleaner event and pipeline visibility. |
| Scheduling Director | Strong Independent | Yes, but only if appointments enter the system somehow | Real appointment demand | Call Handling, Website, Dispatch, Service | `A` can work alone with manual intake. `B/C` should prefer connected intake and Service/Dispatch depth. |
| Dispatch Director | Dependent | Not meaningfully | Scheduling or real appointment queue | Service, Call Handling, Website, Executive Reporting | `A` requires scheduled work. `B/C` require stronger service-flow and technician logic. |
| Sales Director | Conditional Independent | Yes, in quote-heavy businesses | Lead / estimate / opportunity records | Estimator, Follow-Up, Call Handling, Reactivation | `A` can work with quote visibility alone. `B/C` should prefer Follow-Up and Estimator together. |
| Reactivation Director | Conditional Independent | Yes, if CRM truth exists | Stored past customer / lead records | Follow-Up, Customer Success, Marketing, Sales | `A` can work with clean dormant records. `B/C` need better segmentation and campaign logic. |
| Lead Generation Director | Dependent | Rarely by itself | Source capture mechanism | Website, Advertising, SEO, Marketing, Call Handling | `A` can exist only if inbound source capture exists. `B/C` should not stand alone. |
| Advertising Director | Conditional Independent | Yes, if landing and conversion path exist | Real destination for paid traffic | Website, Lead Generation, Marketing, Follow-Up | `A` usually needs Website. `B/C` should require Website + lead capture + follow-up path. |
| SEO Director | Conditional Independent | Yes, if site exists | Website | Lead Generation, Marketing, Follow-Up | `A` requires some site presence. `B/C` strongly prefer AI-ABCX Website Director and lead capture. |
| Marketing Director | Strong/Conditional Independent | Yes | None, but needs message/output path to matter | Website, Advertising, SEO, Lead Generation, Follow-Up, Call Handling | `A` can stand alone for simple campaigns. `B/C` should prefer connected website and traffic system. |
| Customer Success Director | Conditional Independent | Yes, if active customer base exists | Existing customer records | Support, Reviews & Referrals, Retention, Follow-Up | `A` can work with a live customer base. `B/C` need stronger continuity and support loops. |
| Support Director | Conditional Independent | Yes, if support events exist | Customer questions/issues | Customer Success, Reviews & Referrals, Retention | `A` can work with visible ticket/question flow. `B/C` need customer-history depth. |
| Reviews & Referrals Director | Conditional Independent | Yes, if customer completion events exist | Real completed jobs / customers | Customer Success, Support, Follow-Up, Marketing | `A` can work with completed-job triggers. `B/C` need better segmentation and reputation logic. |
| Retention Director | Dependent/Conditional | Only where customer base is meaningful | Active customer continuity data | Customer Success, Support, Reviews & Referrals, Reactivation | `A` requires existing customer continuity signals. `B/C` need stronger health and follow-up loops. |
| Service Director | Dependent | Not meaningfully | Scheduling + service workflow | Dispatch, Follow-Up, Call Handling, Executive Reporting | `A` requires real service operations. `B/C` require stronger dispatch and service truth. |
| Executive Reporting Director | Dependent | Not meaningfully | Real system data | Accountability, Strategy, President layer, all operating directors | `A` can summarize limited data. `B/C` need broad connected director data. |
| Accountability Director | Dependent | Rarely | Named owners + measurable events | Executive Reporting, Strategy, Sales, Service, CAO lane | `A` needs owner + task visibility. `B/C` need stronger reporting and measurable events. |
| Strategy Director | Dependent | Rarely | Reporting and business intent | Executive Reporting, Accountability, President layer | `A` can work with limited summaries. `B/C` need strong reporting depth. |
| Revenue Control Director | Dependent | Rarely | Revenue truth data | Sales, Estimator, Accounting, Reconciliation | `A` needs basic revenue records. `B/C` need stronger finance discipline. |
| Reconciliation Director | Dependent | No practical standalone value | Payments / transaction truth | Revenue Control, Accounting | `A` needs clean payment sources. `B/C` require stronger finance depth. |
| Accounting Director | Dependent | Rarely | Source records and finance truth | Revenue Control, Reconciliation, Payroll | `A` can work with simple books visibility. `B/C` need stronger source integrity. |
| Payroll Director | Dependent | Rarely | HR / people timing + pay records | Accounting, People lane | `A` needs payroll inputs. `B/C` need stronger approval, forecast, and people sync. |
| Compliance Director | Dependent | Not as a meaningful entry product | Decision records | Approval, Risk, Executive Reporting | `A` means visible compliance discipline. `B/C` need stronger governance structure. |
| Approval Director | Dependent | Rarely | Approval-required decisions | Compliance, Risk, Accountability, Executive Reporting | `A` can work as visible routing. `B/C` need stronger governance depth. |
| Risk Director | Dependent | Rarely | Real risk notes and decision records | Compliance, Approval, Executive Reporting, Finance truth | `A` can work as visible risk notes. `B/C` need structured governance and escalation. |

---

## Launch Dependency Rules by Director

## Estimator Director
- May be sold alone.
- Should unlock faster upsell into Follow-Up and Sales.
- Should strongly recommend Call Handling if the business gets many quote requests by phone.

## Call Handling Director
- May be sold alone.
- If appointment booking is promised, Scheduling logic must exist.
- If quote qualification is promised, Estimator or Sales path should exist.

## Website Director
- May be sold alone.
- If higher marketing automation is promised, Website Director must connect to lead capture and follow-up.
- `B/C` may require AI-ABCX-managed website or verified compatible client website.

## Follow-Up Director
- Should not be recommended where there are no visible lead/job/customer events.
- Should upgrade with Sales, Estimator, Call Handling, or Customer Success depending on use case.

## Scheduling Director
- May be sold alone only if the business already has demand coming in.
- If no call handling, no website, and no manual intake path exist, Scheduling Director cannot meaningfully create value by itself.

## Dispatch Director
- Should not be sold unless scheduled work exists.
- Strongly tied to field-service businesses with multiple technicians or crews.

## Sales Director
- Makes best sense where quoting, proposal review, or pipeline follow-up already exist.
- Sales without Estimator or Follow-Up is possible, but usually weaker.

## Reactivation Director
- Requires stored records.
- Should not be recommended where there is no usable past customer base.

## Lead Generation Director
- Requires inbound source capture.
- Usually should not be sold without Website, Advertising, SEO, or some conversion path.

## Advertising Director
- Should not be sold if there is no destination page and no lead capture path.
- Advertising without Follow-Up is allowed but should trigger a strong recommendation.

## SEO Director
- Requires a website.
- If the current site is weak, Website Director upgrade should be recommended first.

## Marketing Director
- Can work alone at lower levels.
- Higher levels should strongly prefer Website + lead capture + Follow-Up.

## Customer Success Director
- Requires active customers.
- Works best with Support, Retention, and Reviews & Referrals.

## Support Director
- Requires real support requests or customer communication events.

## Reviews & Referrals Director
- Requires completed customer interactions.
- Works best after follow-up / customer-success visibility exists.

## Retention Director
- Requires active customers plus continuity signals.

## Service Director
- Requires scheduled or active service flow.
- Service without Scheduling is usually invalid.

## Executive Reporting Director
- Requires connected system data.
- Should usually be part of broader configurations, not a solo purchase.

## Accountability Director
- Requires named ownership and measurable events.

## Strategy Director
- Requires reporting depth and owner intent.

## CFO Lane
- Revenue Control, Reconciliation, Accounting, and Payroll should generally not be sold as isolated first-entry products unless the diagnostic shows a clear finance-control use case.

## CAO Lane
- Compliance, Approval, and Risk should usually be activated together or in tightly related governance configurations.

---

## Level Dependency Rules

## Level A Rule
Level A should prioritize:
- visibility
- simple workflow control
- practical standalone utility
- smaller-business readiness

At `A`, more directors may stand alone.

## Level B Rule
Level B should prioritize:
- structured workflow coordination
- stronger shared records
- better handoffs
- wider operational visibility

At `B`, soft dependencies become much more important.

## Level C Rule
Level C should prioritize:
- multi-director coordination
- deeper automation
- stronger executive visibility
- more complete governance and reporting discipline

At `C`, many directors should not be treated as isolated tools.

---

## Recommended Launch Bundles

### Bundle 1: Quote Growth Entry
- Estimator
- Follow-Up
- Sales

### Bundle 2: Call-to-Appointment Entry
- Call Handling
- Scheduling
- Follow-Up

### Bundle 3: Website Growth Entry
- Website
- Marketing
- Lead Generation
- Follow-Up

### Bundle 4: Field Operations Entry
- Scheduling
- Dispatch
- Service

### Bundle 5: Customer Retention Entry
- Customer Success
- Support
- Reviews & Referrals
- Retention

### Bundle 6: Governance / Control Entry
- Executive Reporting
- Accountability
- Strategy
- Compliance
- Approval
- Risk

### Bundle 7: Finance Visibility Entry
- Revenue Control
- Reconciliation
- Accounting
- Payroll

---

## Recommendation Logic Rules
The diagnostic should use this matrix to prevent weak recommendations.

Examples:
- do not recommend Advertising without a destination path
- do not recommend Dispatch without scheduled work
- do not recommend Reactivation without dormant records
- do not recommend Service without scheduling reality
- do not recommend higher Website Director levels if the current site cannot support them
- do not recommend governance depth without enough decision complexity

At the same time, the diagnostic should also suggest smart upgrades:
- Estimator -> Follow-Up -> Sales
- Call Handling -> Scheduling -> Dispatch
- Website -> Marketing -> SEO / Advertising -> Lead Generation
- Customer Success -> Reviews & Referrals -> Retention

---

## Pricing Architecture Implication
This matrix suggests:
- independent entry directors can carry visible standalone pricing
- dependent directors should often be priced inside recommended configurations or as structured add-ons
- higher levels should justify their price through stronger connected value, not by looking like disconnected feature stacking

This is especially important because AI-ABCX should remain easier to understand than credit-based competitor pricing.

---

## Practical Conclusion
The launch logic should not ask:

`Which director exists?`

It should ask:

`Which director can create real value in this company right now, at this level, with this current business state, and with this owner intent?`

That is the purpose of this dependency matrix.
