# Bring Corporate Structure to Service Businesses

# AI-ABC Company Configuration Specification

## Purpose

This document defines the company configuration object that feeds:

- Step 1 intake
- Step 2 review and policies
- Step 3 live dashboard and demo experience
- module gating
- owner dashboard behavior
- future service and sales dashboards
- future upgrade logic

This is the data contract that turns a business into a configured AI-ABC company.

Without this specification, the system cannot stay consistent across:

- onboarding
- activation
- dashboard generation
- workflow generation
- reporting
- module visibility

It should also align directly with:

- [AI_ABC_CUSTOMER_ORIGIN_AND_ROUTING_SPECIFICATION.md](/Users/yakovnotkin/Documents/New project/AI_ABC_CUSTOMER_ORIGIN_AND_ROUTING_SPECIFICATION.md)

---

## Core Principle

Every activated company should have one normalized configuration object.

That object should be the single source of truth for:

- who the company is
- what kind of business it is
- which modules are active
- which workflows are active
- which roles exist
- which dashboards are visible
- which executive signals should be generated

---

# 1. Configuration Layers

The company configuration should be built in layers.

## Layer 1: Identity

Defines who the company is.

## Layer 2: Business Structure

Defines what kind of business it is and how it operates.

## Layer 3: Access Path

Defines how the company entered AI-ABC.

## Layer 4: Module Configuration

Defines which operating modules are active.

## Layer 5: Role Configuration

Defines which user roles and dashboards exist.

## Layer 6: Workflow Configuration

Defines what the system should actually do.

## Layer 7: Reporting And Executive Configuration

Defines which executive signals and reporting views should be active.

---

# 2. Required Top-Level Object

Each company should eventually have a normalized object shaped like this:

```json
{
  "companyProfile": {},
  "businessProfile": {},
  "accessProfile": {},
  "moduleConfiguration": {},
  "roleConfiguration": {},
  "workflowConfiguration": {},
  "reportingConfiguration": {},
  "systemState": {}
}
```

Each section is defined below.

---

# 3. Company Profile

## Purpose

The company profile defines identity and contact basics.

## Required fields

- `companyId`
- `companyName`
- `ownerName`
- `businessEmail`
- `businessPhone`
- `businessWebsite`
- `country`
- `stateOrRegion`
- `city`
- `timeZone`

## Optional fields

- `logoUrl`
- `brandLabel`
- `billingContactName`
- `billingContactEmail`

## Notes

This section should power:

- company identity in dashboards
- contact display
- owner-facing headers
- system setup records

---

# 4. Business Profile

## Purpose

The business profile defines what kind of company AI-ABC is configuring.

## Required fields

- `industry`
- `industryCategory`
- `serviceCategories`
- `businessModel`
- `serviceAreaType`
- `languages`
- `staffCount`
- `hasSalesFunction`
- `hasFieldServiceFunction`

## Example values

### industry

- plumbing
- HVAC
- electrical
- roofing
- home services
- legal intake
- medical intake

### businessModel

- service-only
- sales-only
- service-and-sales

### serviceAreaType

- local-area
- multi-city
- regional
- remote

## Notes

This section should power:

- tailored demo-call logic
- tailored workflow examples
- dashboard copy
- opportunity categories
- scheduling assumptions

---

# 5. Access Profile

## Purpose

The access profile defines how the company entered the system and what commercial path was selected.

## Required fields

- `selectedPath`
- `selectedPathLabel`
- `stageALaunchPrice`
- `reservationDate`
- `launchDate`
- `promoEligible`
- `promoDeadline`

## Example values

### selectedPath

- `regular`
- `partner-promo`

## Notes

This section should power:

- Step 2 pricing review
- Step 3 pricing display
- Stripe reservation logic
- dashboard labels during activation

---

# 6. Module Configuration

## Purpose

This section defines which major AI-ABC modules are active for the company.

It should align directly with:

- [AI_ABC_MODULE_GATING_SPECIFICATION.md](/Users/yakovnotkin/Documents/New project/AI_ABC_MODULE_GATING_SPECIFICATION.md)

## Required fields

- `liveStage`
- `callHandling`
- `schedulingAndCoordination`
- `advancedManagement`

## Suggested shape

```json
{
  "liveStage": "A",
  "callHandling": {
    "enabled": true
  },
  "schedulingAndCoordination": {
    "enabled": false
  },
  "advancedManagement": {
    "enabled": false
  }
}
```

## Extended fields per module

- `enabled`
- `released`
- `visibleToOwner`
- `visibleToServiceStaff`
- `visibleToSalesStaff`
- `workflowActive`
- `reportingActive`
- `upgradeAvailable`

## Notes

This section should control:

- dashboard sections
- workflow generation
- reports
- upgrade prompts

---

# 7. Role Configuration

## Purpose

This section defines which human roles exist in the company and which dashboards they should use.

## Required fields

- `ownerRole`
- `serviceRoles`
- `salesRoles`
- `adminRoles`

## Suggested shape

```json
{
  "ownerRole": {
    "enabled": true,
    "dashboardType": "owner"
  },
  "serviceRoles": {
    "enabled": true,
    "count": 6,
    "dashboardType": "service"
  },
  "salesRoles": {
    "enabled": true,
    "count": 4,
    "dashboardType": "sales"
  },
  "adminRoles": {
    "enabled": false,
    "count": 0
  }
}
```

## Notes

This section should determine:

- whether service dashboards exist
- whether sales dashboards exist
- how many staff examples to generate in Step 3
- what role-specific data to produce

---

# 8. Workflow Configuration

## Purpose

This section defines what the system actually does for the company.

This is where AI-ABC stops being identity setup and becomes operating logic.

## Required fields

- `callCategories`
- `urgencyRules`
- `afterHoursRules`
- `customerOriginModel`
- `leadQualificationEnabled`
- `crmImportEnabled`
- `outboundCallingEnabled`
- `outboundSmsEnabled`
- `schedulingNeeded`
- `appointmentConfirmationRequired`
- `staffConfirmationRequired`
- `automaticReroutingEnabled`
- `completionReportingRequired`

## Optional fields

- `preferredSchedulingWindows`
- `serviceAreaRules`
- `roleAssignmentRules`
- `ownerApprovalRules`
- `exceptionHandlingRules`
- `referralPortEnabled`
- `legacyImportDefaults`
- `originRoutingRules`

## Notes

This section should power:

- demo-call generation
- synthetic client generation
- synthetic appointment generation
- dashboard queue generation
- role dashboard behavior
- customer number generation
- origin-based pipeline routing
- referral intake routing
- legacy import routing

## Customer origin model

The workflow configuration must explicitly define how the company uses customer origins and routing types.

At minimum, it should support:

- `new_call`
- `legacy_import`
- `referral`
- `reactivation`
- `owner_sales_entry`
- `owner_service_entry`

The normalized configuration should define:

- which origins are enabled
- which visible prefixes are used
- which pipeline each origin enters
- which role owns the next action

This is how the system keeps customer creation, routing, dashboards, and reporting aligned.

---

# 9. Reporting Configuration

## Purpose

This section defines which executive signals and reporting layers should be active.

## Required fields

- `ceoSignalsEnabled`
- `croSignalsEnabled`
- `cooSignalsEnabled`
- `cfoSignalsEnabled`
- `caoSignalsEnabled`
- `companyMemoryEnabled`
- `revenueIntelligenceEnabled`

## Notes

This section should align with active modules.

### Example

For a Stage A company:

- CEO signals = true
- CRO signals = true
- COO signals = false
- CFO signals = false
- CAO signals = false

For a Stage B company:

- CEO signals = true
- CRO signals = true
- COO signals = true
- CFO signals = true

For a Stage C company:

- all of the above = true

---

# 10. System State

## Purpose

This section defines where the company currently is in the activation lifecycle.

## Required fields

- `activationStep`
- `activationCompleted`
- `dashboardPreviewCompleted`
- `demoCallCompleted`
- `stripeReservationCompleted`
- `firstChargeScheduled`

## Example values

- `activationStep = 1`
- `activationStep = 2`
- `activationStep = 3`

## Notes

This section should power:

- Step flow gating
- next-action routing
- progress display
- Stripe reservation availability

---

# 11. Derived Labels

The normalized object should also include derived user-facing labels so pages do not each invent their own phrasing.

## Examples

- `pathLabel`
- `liveStageLabel`
- `serviceDescriptor`
- `staffDescriptor`
- `roleSummaryLabel`
- `moduleSummaryLabel`

These labels should keep:

- prelaunch page
- Step 2
- Step 3
- owner dashboard

consistent in tone and terminology.

---

# 12. Required Behavior Across Current Surfaces

## Step 1

[step1.html](/Users/yakovnotkin/Documents/New project/step1.html)

Should collect raw input and map it into the normalized company configuration object.

## Step 2

[step2.html](/Users/yakovnotkin/Documents/New project/step2.html)

Should review the normalized configuration object and confirm that the selected path, setup, and policies match it.

## Step 3

[step3.html](/Users/yakovnotkin/Documents/New project/step3.html)

Should use the normalized configuration object to:

- open the right dashboard state
- generate the right demo-call logic
- display the right pricing and path

## Owner Dashboard Live

[owner-dashboard-live.html](/Users/yakovnotkin/Documents/New project/owner-dashboard-live.html)

Should use the normalized configuration object to:

- show company identity
- show enabled modules
- show the correct executive views
- generate company-tailored synthetic data

---

# 13. Company-Tailored Synthetic Data Requirements

The configuration object must be rich enough to generate:

- realistic clients
- realistic call examples
- realistic transcripts
- realistic appointments
- realistic action queues
- realistic staff assignments
- realistic customer origins
- realistic referral records
- realistic legacy import records
- realistic opportunity flow

This is especially important for Step 3, because the dashboard should feel like the real configured system, not a generic demo.

---

# 14. Relationship To Module Gating

This company configuration object is what feeds module gating.

The configuration decides:

- which modules are needed
- which modules are enabled
- which dashboards should exist
- which workflows should activate
- which executive signals should appear

So the relationship is:

`Company Configuration` -> `Module Gating` -> `Dashboard / Workflow / Reporting Behavior`

---

# 15. Suggested Validation Rules

## Rule 1

Every company must have Call Handling enabled.

## Rule 2

If Scheduling & Coordination is disabled:

- no service dashboard
- no sales dashboard
- no appointment workflow generation

## Rule 3

If Advanced Management is disabled:

- no approvals queue
- no advanced escalation views
- no advanced management reports

## Rule 4

If the business model is service-only:

- sales dashboard should be optional or absent

## Rule 5

If the business model is sales-only:

- service dashboard should be optional or absent

## Rule 6

If the company has no staff beyond owner:

- staff dashboards may be suppressed
- owner-centric workflow should still function

---

# 16. Suggested Implementation Direction

The current codebase should eventually use:

- one shared configuration builder
- one shared normalization function
- one shared query-param serializer for activation flow
- one shared parser for dashboard and step pages

This should replace page-by-page custom interpretation over time.

---

# 17. Example Normalized Company Configuration

```json
{
  "companyProfile": {
    "companyId": "cmp_001",
    "companyName": "AAA Electrical",
    "ownerName": "Jordan Lee",
    "businessEmail": "owner@aaaelectrical.com",
    "businessPhone": "(555) 123-4567",
    "businessWebsite": "aaaelectrical.com",
    "country": "Canada",
    "stateOrRegion": "Ontario",
    "city": "Toronto",
    "timeZone": "America/Toronto"
  },
  "businessProfile": {
    "industry": "Electrical",
    "industryCategory": "Home Services",
    "serviceCategories": ["Repairs", "Installations", "Emergency Calls"],
    "businessModel": "service-and-sales",
    "serviceAreaType": "local-area",
    "languages": ["English"],
    "staffCount": 10,
    "hasSalesFunction": true,
    "hasFieldServiceFunction": true
  },
  "accessProfile": {
    "selectedPath": "regular",
    "selectedPathLabel": "Regular Access",
    "stageALaunchPrice": "$499/mo",
    "reservationDate": "2026-06-09",
    "launchDate": "2026-06-01",
    "promoEligible": false,
    "promoDeadline": null
  },
  "moduleConfiguration": {
    "liveStage": "A",
    "callHandling": { "enabled": true },
    "schedulingAndCoordination": { "enabled": false },
    "advancedManagement": { "enabled": false }
  },
  "roleConfiguration": {
    "ownerRole": { "enabled": true, "dashboardType": "owner" },
    "serviceRoles": { "enabled": false, "count": 0, "dashboardType": "service" },
    "salesRoles": { "enabled": false, "count": 0, "dashboardType": "sales" },
    "adminRoles": { "enabled": false, "count": 0 }
  },
  "workflowConfiguration": {
    "callCategories": ["Emergency", "Repair", "Quote Request"],
    "urgencyRules": true,
    "afterHoursRules": true,
    "leadQualificationEnabled": true,
    "crmImportEnabled": true,
    "outboundCallingEnabled": true,
    "outboundSmsEnabled": true,
    "schedulingNeeded": false,
    "appointmentConfirmationRequired": false,
    "staffConfirmationRequired": false,
    "automaticReroutingEnabled": false,
    "completionReportingRequired": false
  },
  "reportingConfiguration": {
    "ceoSignalsEnabled": true,
    "croSignalsEnabled": true,
    "cooSignalsEnabled": false,
    "cfoSignalsEnabled": false,
    "caoSignalsEnabled": false,
    "companyMemoryEnabled": false,
    "revenueIntelligenceEnabled": false
  },
  "systemState": {
    "activationStep": 3,
    "activationCompleted": false,
    "dashboardPreviewCompleted": true,
    "demoCallCompleted": false,
    "stripeReservationCompleted": false,
    "firstChargeScheduled": false
  }
}
```

---

# 18. Core Principle

The company configuration object is the base record that lets AI-ABC behave like one coherent system instead of a collection of pages and assumptions.
