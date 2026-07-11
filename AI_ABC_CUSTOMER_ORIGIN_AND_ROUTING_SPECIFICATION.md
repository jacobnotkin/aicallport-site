# Bring Corporate Structure to Service Businesses

# AI-ABC Customer Origin And Routing Specification

## Purpose

This document defines how customer records enter AI-ABC, how they are identified, and how they are routed into the correct operating pipeline.

It exists so the system can treat customer creation as part of one operating structure instead of a loose set of contacts, leads, and uploaded rows.

Without this specification, AI-ABC cannot stay consistent across:

- live inbound call handling
- owner-entered referrals
- legacy customer imports
- reactivation campaigns
- sales follow-up
- service execution
- reporting and executive visibility

---

## Core Principle

Every customer should have:

- one primary system ID
- one clear origin type
- one current pipeline assignment
- one structured routing profile

The system ID identifies the customer.

The routing profile tells AI-ABC what should happen next.

This means AI-ABC should not treat customers as generic CRM rows.

It should treat them as routed operating records.

---

# 1. Two-Layer Customer Identification Model

AI-ABC should separate customer identity into two layers.

## Layer 1: Human-Facing Customer ID

This is the visible ID used by:

- the owner
- sales staff
- service staff
- dashboards
- transcripts
- reports

It should be short, readable, and consistent.

## Layer 2: System Routing Profile

This is the structured logic layer used by AI-ABC to decide:

- where the customer enters
- who should see the customer
- what workflow should run
- what follow-up logic applies
- what executive reporting should be generated

The visible ID should stay simple.

The routing profile can be richer.

---

# 2. Required Customer Origin Types

AI-ABC should support the following customer origin types as first-class system entries.

## 1. New Inbound Customer

Meaning:

The customer entered through live AI call handling.

Example origin key:

- `new_call`

## 2. Legacy Imported Customer

Meaning:

The customer was uploaded from an old customer list, spreadsheet, or historical database.

Example origin key:

- `legacy_import`

## 3. Referral Customer

Meaning:

The customer was intentionally entered by the owner through a dedicated referral intake port.

Example origin key:

- `referral`

## 4. Reactivation Customer

Meaning:

The customer was created through an outbound reactivation workflow tied to dormant or prior customers.

Example origin key:

- `reactivation`

## 5. Owner-Entered Sales Lead

Meaning:

The owner manually created a new opportunity that should enter the sales pipeline.

Example origin key:

- `owner_sales_entry`

## 6. Owner-Entered Service Job

Meaning:

The owner manually created a customer or job that should enter the service workflow directly.

Example origin key:

- `owner_service_entry`

Additional origin types may be added later, but these six should be treated as the first official AI-ABC origin set.

---

# 3. Recommended Visible ID Format

The visible customer ID should include a broad prefix that helps humans understand where the record came from.

## Recommended examples

- `C-10482` = new inbound customer
- `L-10483` = legacy imported customer
- `R-10484` = referral customer
- `X-10485` = reactivation customer
- `S-10486` = owner-entered sales lead
- `V-10487` = owner-entered service record

The exact letters can evolve, but the system should preserve this principle:

- one short prefix
- one unique numeric identifier
- one human-readable origin signal

The system should not overload the visible ID with too many symbols.

Complex routing should live in structured fields, not inside a cluttered number.

---

# 4. Required Customer Routing Fields

Every customer record should include a routing profile.

## Required fields

- `customerId`
- `customerOrigin`
- `originPrefix`
- `pipelineKey`
- `routingOwnerRole`
- `lifecycleStage`
- `priorityLevel`
- `currentStatus`
- `sourceDetail`

## Purpose of each field

### `customerId`

The unique human-facing customer number.

### `customerOrigin`

The broad entry type.

Examples:

- `new_call`
- `legacy_import`
- `referral`
- `reactivation`
- `owner_sales_entry`
- `owner_service_entry`

### `originPrefix`

The visible ID family.

Examples:

- `C`
- `L`
- `R`
- `X`
- `S`
- `V`

### `pipelineKey`

The main operating lane.

Examples:

- `call_handling`
- `sales_followup`
- `service_followup`
- `reactivation`
- `referral_priority`
- `financial_confirmation`
- `complaint_resolution`

### `routingOwnerRole`

The role responsible for the next operational move.

Examples:

- `call_handling`
- `sales_rep`
- `sales_director`
- `service_rep`
- `service_director`
- `owner`

### `lifecycleStage`

The current commercial or workflow stage of the customer.

Examples:

- `new`
- `qualified`
- `appointment_pending_confirmation`
- `estimate_pending`
- `job_completed`
- `payment_pending`
- `closed`

### `priorityLevel`

The urgency or business importance level.

Examples:

- `normal`
- `high`
- `urgent`
- `vip`

### `currentStatus`

The live operational state.

Examples:

- `open`
- `waiting_for_owner`
- `waiting_for_sales`
- `waiting_for_service`
- `waiting_for_customer`
- `resolved`
- `lost`

### `sourceDetail`

More specific information about where the customer came from.

Examples:

- `inbound_call`
- `csv_import`
- `owner_referral_portal`
- `reactivation_campaign`
- `manual_sales_entry`
- `manual_service_entry`

---

# 5. Referral Customer Intake Port

Referral customers should not be created through the same flow as generic inbound callers.

They should enter through a dedicated owner-side referral port.

## Why this matters

Referral customers usually carry:

- higher trust
- clearer source attribution
- stronger conversion potential
- a need for owner visibility

AI-ABC should preserve that value instead of flattening referrals into ordinary contacts.

## Referral port purpose

The owner referral port should:

- create a routed AI-ABC customer record
- assign a referral customer ID
- attach referral metadata
- send the customer into the correct follow-up pipeline
- make the referral source visible in reports

## Required referral fields

- customer name
- phone number
- email
- service need
- preferred timing
- referred by
- referral relationship
- notes
- urgency
- assigned department or owner

## Required referral routing outputs

- `customerOrigin = referral`
- `originPrefix = R`
- `sourceDetail = owner_referral_portal`
- `pipelineKey = referral_priority`
- `routingOwnerRole = sales_director` or `owner`

The exact role assignment may depend on company size, but the routing object should be explicit.

---

# 6. Legacy Customer Import Logic

Uploaded historical customers should not remain outside the operating structure.

Every imported customer should receive:

- a real AI-ABC customer ID
- a legacy-coded origin type
- a routing profile
- an initial follow-up status

## Required legacy import outputs

- `customerOrigin = legacy_import`
- `originPrefix = L`
- `sourceDetail = csv_import` or `spreadsheet_import`

## Suggested legacy routing states

- `pipelineKey = reactivation`
- `routingOwnerRole = sales_rep` or `owner`
- `lifecycleStage = dormant`
- `currentStatus = not_contacted`

This allows the system to use old databases for:

- outbound calls
- outbound SMS
- estimate follow-up
- customer reactivation
- revenue recovery

---

# 7. Stage A Routing Logic

Stage A should already support customer-origin routing, even before automatic scheduling exists.

## Stage A principle

Stage A is not only about answering calls.

It is the communication and intake foundation.

That means Stage A should already be able to:

- identify where a customer came from
- assign the customer a system number
- place the customer into the right pipeline
- route the record to the right human role
- preserve customer source for reporting

## Stage A routing examples

### New inbound caller

- origin: `new_call`
- pipeline: `sales_followup` or `service_followup`
- owner role: `call_handling`
- next step: human confirmation of appointment or next action

### Referral customer

- origin: `referral`
- pipeline: `referral_priority`
- owner role: `sales_director` or `owner`
- next step: direct priority outreach

### Legacy customer

- origin: `legacy_import`
- pipeline: `reactivation`
- owner role: `sales_rep`
- next step: outbound contact attempt

### Owner-entered service record

- origin: `owner_service_entry`
- pipeline: `service_followup`
- owner role: `service_director`
- next step: service handoff

This is how Stage A can support more than simple call answering while still keeping automatic scheduling reserved for Stage B.

---

# 8. Stage B Routing Expansion

Stage B should not replace the origin model.

It should expand what the system can do after the customer is already routed.

## Stage B adds

- automatic scheduling
- availability matching
- staff confirmations
- reminders
- rescheduling
- rerouting
- execution tracking

The customer origin model remains the same.

What changes is the depth of execution logic attached to the routed customer.

---

# 9. Required Customer Record Structure

At minimum, the customer record should include:

```json
{
  "customerId": "R-10484",
  "companyId": "COMP-0021",
  "customerOrigin": "referral",
  "originPrefix": "R",
  "sourceDetail": "owner_referral_portal",
  "pipelineKey": "referral_priority",
  "routingOwnerRole": "sales_director",
  "lifecycleStage": "qualified",
  "priorityLevel": "high",
  "currentStatus": "open",
  "name": "Jane Smith",
  "contactInfo": {},
  "tags": [],
  "historySummary": ""
}
```

This structure should feed:

- owner dashboard
- future sales dashboard
- future service dashboard
- accountability events
- reporting hierarchy
- company memory

---

# 10. Reporting Value

The origin and routing model is not just workflow logic.

It also creates management value.

AI-ABC should eventually report:

- total customers by origin type
- referral conversion rate
- legacy reactivation rate
- revenue by customer origin
- unresolved customers by pipeline
- response speed by routed owner role
- dropped opportunities by origin type

This is especially important for:

- CRO reporting
- CFO revenue truth
- CEO prioritization
- President decision-making

---

# 11. Core Principle

AI-ABC should never treat customers as undifferentiated records.

Every customer should enter with:

- a clear identity
- a clear origin
- a clear route
- a clear next owner

That is how the system moves from contact storage to operating structure.

The rule should be:

`Customer ID identifies.`

`Routing profile decides.`
