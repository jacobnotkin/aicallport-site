# Bring Corporate Structure to Service Businesses

# AI-ABC Module Gating Specification

## Purpose

This document defines how AI-ABC modules turn on, stay off, become visible, or remain hidden across:

- internal development
- public rollout
- company activation
- dashboard visibility
- future upgrades

This is the control layer that connects the architecture to the real product.

Without module gating, AI-ABC cannot safely support:

- Stage A public launch with Stage B and Stage C already built
- customers who only want call handling
- customers who want Stage A + B but not C
- future company-specific module upgrades

---

## Core Principle

All three stages may exist in the system at the same time.

But they do not all have to be:

- publicly released
- sold
- activated for a company
- visible in dashboards
- active in workflows

That distinction is the purpose of module gating.

---

# 1. Gating Philosophy

## Internal Stage Model

The stage model describes product rollout:

- `Stage A`
- `Stage B`
- `Stage C`
- future `Stage X`

## Customer Module Model

The customer module model describes operating capability:

- `Call Handling`
- `Scheduling & Coordination`
- `Advanced Management`

Customers should not be forced into the full internal stage stack.

Instead, they should receive only the modules that are:

- released
- sold to them
- activated for them

---

# 2. Required Gating States

Every module must have four core statuses.

## 1. Built

Meaning:

The module exists in the codebase or system design and can be developed or tested internally.

Example:

`Advanced Management` may be built before public release.

## 2. Released

Meaning:

The module is officially available for public activation or upgrade.

Example:

At launch:

- `Call Handling` = released
- `Scheduling & Coordination` = not yet released
- `Advanced Management` = not yet released

## 3. Enabled For Company

Meaning:

The company has this module as part of its active product configuration.

This may happen through:

- initial activation
- manual upgrade
- internal beta enablement
- founder / partner program inclusion

## 4. Visible In Dashboard

Meaning:

The module’s dashboard surfaces, controls, reports, and related actions appear to the company’s users.

This can be different by role:

- owner
- service staff
- sales staff

---

# 3. Recommended Gating Object

Each company should have a normalized gating object for every major module.

## Required fields

- `moduleKey`
- `built`
- `released`
- `enabledForCompany`
- `visibleToOwner`
- `visibleToServiceStaff`
- `visibleToSalesStaff`
- `workflowActive`
- `reportingActive`
- `upgradeAvailable`

## Example

```json
{
  "moduleKey": "scheduling",
  "built": true,
  "released": false,
  "enabledForCompany": false,
  "visibleToOwner": false,
  "visibleToServiceStaff": false,
  "visibleToSalesStaff": false,
  "workflowActive": false,
  "reportingActive": false,
  "upgradeAvailable": false
}
```

This prevents one dangerous mistake:

showing future modules in the dashboard before they are truly live for that customer.

---

# 4. Core Module Set

The first official AI-ABC module set should be:

## Module 1: Call Handling

Includes:

- AI inbound handling
- transcripts
- recordings
- CRM creation
- outbound follow-up on existing data
- opportunity capture
- customer history tracking

## Module 2: Scheduling & Coordination

Includes:

- appointment scheduling
- service dashboard
- sales dashboard
- confirmations
- reminders
- rerouting
- completion reporting
- customer confirmations
- execution coordination

## Module 3: Advanced Management

Includes:

- approvals
- exception handling
- escalation logic
- workflow enforcement
- outcome checking
- accountability visibility
- advanced owner control

---

# 5. Stage-To-Module Mapping

## Stage A

Primary module:

- `Call Handling`

Executive visibility:

- basic CEO
- basic CRO

## Stage B

Adds:

- `Scheduling & Coordination`

Executive visibility expands:

- CEO
- COO
- CRO
- early CFO

## Stage C

Adds:

- `Advanced Management`

Executive visibility expands:

- CEO
- COO
- CRO
- CFO
- CAO
- later HR / CMO support

---

# 6. Public Launch Rules

## Launch Rule 1

Stage A can be publicly live while Stage B and Stage C remain built but unreleased.

## Launch Rule 2

Unreleased modules must not appear as active customer capabilities.

## Launch Rule 3

The system may internally test unreleased modules without presenting them as customer-ready.

## Launch Rule 4

If a module is not released, it should not behave as if it were part of the customer’s active operating system unless the company is explicitly part of a controlled internal or founder beta path.

---

# 7. Customer Configuration Rules

## Mandatory Rule

`Call Handling` is mandatory for every customer.

## Optional Rules

`Scheduling & Coordination` is optional.

`Advanced Management` is optional.

## Meaning

Possible valid company states include:

### A-only company

- Call Handling = enabled
- Scheduling & Coordination = off
- Advanced Management = off

### A + B company

- Call Handling = enabled
- Scheduling & Coordination = enabled
- Advanced Management = off

### Full A + B + C company

- Call Handling = enabled
- Scheduling & Coordination = enabled
- Advanced Management = enabled

---

# 8. Dashboard Visibility Rules

## Owner Dashboard

The owner dashboard should only show modules that are:

- enabled for that company
- released or explicitly allowed for that company
- relevant to the owner role

### Example

If Scheduling is off:

- no scheduling menu
- no appointment queue
- no staff confirmation queue
- no completion tracking views

If Advanced Management is off:

- no approvals / exceptions / governance panels
- no advanced escalation views
- no advanced management scorecards

## Service Dashboard

Service staff should only see:

- assigned execution work
- availability
- confirmations
- client information
- transcripts / recordings if allowed
- completion reporting

They should never see owner-only modules.

## Sales Dashboard

Sales staff should only see:

- assigned sales appointments
- availability
- lead / client context
- transcripts / recordings if allowed
- estimate and next-step reporting

They should never see owner-only management modules.

---

# 9. Workflow Activation Rules

A module can be visible without being fully active if needed for limited preview purposes.

But in normal customer operation:

## If a module is not enabled

Then:

- no workflow actions should be generated from it
- no tasks should route through it
- no reporting should depend on it
- no role dashboards should require it

## If a module is enabled

Then:

- workflows should activate
- reports should activate
- dashboard surfaces should activate
- executive signals should activate

---

# 10. Reporting Activation Rules

Each module should have reporting that follows the same gate.

## Call Handling reports

Visible if Call Handling is enabled.

## Scheduling & Coordination reports

Visible if Scheduling & Coordination is enabled.

## Advanced Management reports

Visible if Advanced Management is enabled.

This prevents false reporting complexity for companies using only a lighter module set.

---

# 11. Upgrade Rules

Each company should also have upgrade availability states.

## Upgrade Available

Meaning:

The module is not currently enabled, but it can be offered to the company.

### Example

A Stage A customer may see:

- Scheduling & Coordination available as an upgrade
- Advanced Management available later

## Upgrade Not Available

Meaning:

The module is either:

- not released publicly
- not suitable for that company
- intentionally withheld

---

# 12. Role Of Analysis And Configuration Layer

AI-ABC should not require the customer to guess which modules they need.

The configuration layer should help determine:

- which modules are necessary
- which modules are optional
- which workflows should be active
- which dashboards should be shown
- which upgrade path makes sense over time

This means module gating is not only manual sales packaging.

It should also be informed by business analysis.

---

# 13. Suggested Implementation Structure

## Company-Level Gating Object

Each company should have:

- `liveStage`
- `enabledModules`
- `releasedModulesSnapshot`
- `roleVisibility`

## Module Registry

The system should also keep a global module registry that defines:

- official module keys
- release status
- dashboard dependencies
- workflow dependencies
- reporting dependencies

## Example Module Registry Fields

- `moduleKey`
- `displayName`
- `stage`
- `released`
- `requires`
- `ownerDashboardAreas`
- `serviceDashboardAreas`
- `salesDashboardAreas`
- `executiveSignals`

---

# 14. Recommended Default Rules

## Call Handling

- built = true
- released = true
- enabledForCompany = always true

## Scheduling & Coordination

- built = may be true before launch
- released = controlled by rollout
- enabledForCompany = optional

## Advanced Management

- built = may be true before launch
- released = later controlled by rollout
- enabledForCompany = optional

---

# 15. Example Company States

## Company A: Public Stage A customer

- Call Handling = on
- Scheduling & Coordination = off
- Advanced Management = off

Owner sees:

- communication summary
- opportunity summary
- CRM and follow-up visibility

Staff dashboards:

- not active

## Company B: Stage A + B customer

- Call Handling = on
- Scheduling & Coordination = on
- Advanced Management = off

Owner sees:

- communication
- opportunities
- scheduling
- confirmations
- completion
- early revenue visibility

Staff dashboards:

- active

## Company C: Full-stack customer

- Call Handling = on
- Scheduling & Coordination = on
- Advanced Management = on

Owner sees:

- all active operating layers
- approvals
- exceptions
- escalations
- management controls

Staff dashboards:

- active within role limits

---

# 16. Connection To Current Codebase

This specification should eventually control:

- [prelaunch-page.html](/Users/yakovnotkin/Documents/New project/prelaunch-page.html)
- [step1.html](/Users/yakovnotkin/Documents/New project/step1.html)
- [step2.html](/Users/yakovnotkin/Documents/New project/step2.html)
- [step3.html](/Users/yakovnotkin/Documents/New project/step3.html)
- [owner-dashboard-live.html](/Users/yakovnotkin/Documents/New project/owner-dashboard-live.html)
- future service and sales live dashboards

It should also shape:

- module upgrade messaging
- dashboard visibility
- role-based experience
- company-specific activation behavior

---

# 17. Core Principle

Module gating is what allows AI-ABC to be:

- one coherent system
- launched in stages
- sold in modules
- configured per company
- safe to evolve without exposing unfinished capability

That is why this specification is one of the most important implementation documents in the system.
