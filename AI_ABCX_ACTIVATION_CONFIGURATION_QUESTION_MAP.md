# AI-ABCX Activation Configuration Question Map

This document defines the structured question map for the AI-ABCX activation flow.

Its purpose is to ensure that activation does not behave like a generic signup form.

Instead, activation should:

- discover the company structure need
- determine which modules are needed
- determine which call-agent behavior packages are needed
- determine likely pricing and bundle recommendations
- prepare the company-specific system

This is the logic that turns activation into configuration.

---

## 1. Core Rule

The activation flow should collect enough structured information to determine:

1. company identity
2. field-service fit
3. module need
4. call-handling behavior need
5. likely dashboard/user-access need
6. pricing structure
7. performance-intelligence study input
8. recommended package or bundle

This question map is the basis for that logic.

---

## 2. Section Order

Recommended activation question sequence:

1. company identity
2. business contact and verification details
3. market and field-service fit
4. intake and call-handling needs
5. scheduling and dispatch needs
6. follow-up and closeout needs
7. marketing and growth needs
8. user dashboard and team-access needs
9. performance-intelligence study
10. package recommendation and pricing output

---

## 3. Section 1: Company Identity

### Purpose

Create the company identity context for the prepared system.

### Questions

- business name
- owner / future President name
- business phone
- business email
- website

### Used to configure

- company profile
- President Dashboard identity
- activation record
- contact verification

---

## 4. Section 2: Market And Field-Service Fit

### Purpose

Confirm that the business fits the launch market and determine relevant operational assumptions.

### Questions

- country / market
- service category
- service area
- residential / commercial / both
- emergency service or not
- estimate-driven or direct-service driven

### Used to configure

- field-service routing assumptions
- launch eligibility
- service terminology
- emergency behavior relevance

---

## 5. Section 3: Intake And Call-Handling Needs

### Purpose

Determine whether Call Handling is needed and which behavior packages are relevant.

### Questions

- do you want AI to answer inbound calls?
- do you already have a person/team handling inbound calls?
- do you need after-hours call coverage?
- do you handle emergency or high-urgency calls?
- do you want callers qualified before someone follows up?
- do you want the system to begin appointment booking intake?
- do you need callers to be able to reschedule or cancel by phone?
- do you want missed-call or follow-up callback intake handled by the agent?
- which languages do you need?
- how important is premium voice quality to your brand?

### Used to configure

- whether Call Handling is included
- which Call Agent behavior packages are included
- likely Call Agent level
- likely voice tier
- language packs

---

## 6. Section 4: Scheduling And Dispatch Needs

### Purpose

Determine whether the company needs Dispatcher and how central scheduling control is.

### Questions

- who currently handles scheduling?
- do you want the President to manage scheduling directly at first?
- do you already have a dispatcher or coordinator?
- do you need appointment confirmation tracking?
- do you need reschedule / reroute visibility?
- do you want assignment pressure visible in a dedicated dashboard?
- do you need field-worker dashboards later?
- do you need sales/estimate dashboards later?

### Used to configure

- whether Dispatcher is included
- whether Dispatcher is President-only at first
- future role dashboard recommendations
- likely operations bundle fit

---

## 7. Section 5: Follow-Up And Closeout Needs

### Purpose

Determine how much unresolved work and outcome discipline the company needs.

### Questions

- do you lose track of callbacks, estimates, or unresolved customer decisions?
- do you want a structured follow-up workspace?
- do you want all job outcomes captured in one system?
- do you want amount paid tracked in the same record?
- do you want unresolved work clearly separated from closed work?

### Used to configure

- whether President Follow-Up is included
- whether Closeout is included
- continuity and outcome-control recommendations

---

## 8. Section 6: Marketing And Growth Needs

### Purpose

Determine whether Marketing should be included at launch and what kind of growth control is needed.

### Questions

- do you want visibility into where leads come from?
- do you run paid advertising now?
- do you want to track campaign performance?
- do you want to compare lead quality by source?
- do you want to reactivate old customers or old estimates?
- do you want referral source visibility?
- do you want a growth dashboard for the President?

### Used to configure

- whether Marketing is included
- whether a growth-oriented bundle should be recommended
- whether reactivation and referral visibility matter

---

## 9. Section 7: Team Access And Dashboard Seats

### Purpose

Determine whether the President alone will use the system at first or whether separate user dashboards are needed.

### Questions

- will only the President use the system at first?
- do you want a separate dispatcher/coordinator dashboard?
- do you want separate sales dashboards?
- do you want separate field dashboards?
- do you want a separate marketing dashboard?
- how many users would likely need separate access in the future?

### Used to configure

- extra user dashboard recommendations
- seat-pricing recommendations
- role-dashboard recommendations

---

## 10. Section 8: Performance Intelligence Study Inputs

### Purpose

Collect the minimum business-performance inputs needed to generate the activation version of the:

`Corporate Growth Investment Study`

### Questions

- about how many inbound calls or leads do you get in a typical week?
- about what share of opportunities are missed, delayed, or not followed up properly?
- do you lose meaningful opportunities after business hours?
- how quickly are new leads usually followed up?
- do you have old leads, old estimates, or old customers that are not being consistently reactivated?
- what is the average value of a sold job, booked service, or new client?
- if an opportunity is handled correctly, how often does it usually convert?
- is your team usually fully booked, underbooked, or inconsistent?
- do you clearly track where leads come from and which sources produce revenue?
- optional: how much do you spend on marketing in a typical month?

### Used to configure

- activation version of the Corporate Growth Investment Study
- opportunity-loss estimate
- recoverable revenue range
- investment-to-outcome estimate
- top leakage categories
- recommended starting AI-ABCX system

---

## 10. Section 8: Pricing And Package Recommendation Output

### Purpose

Translate answers into a configured system.

### Output should include

- President Core included
- CRM included
- selected modules
- selected call-agent behaviors
- voice tier recommendation
- language pack recommendation
- extra seat recommendations
- itemized configured pricing
- recommended discounted package if applicable
- total configured monthly price

This output is one of the most important results of activation.

---

## 11. Recommended Logic Mapping

### If they want AI answering calls

- include Call Handling

### If they want appointment intake or scheduling control

- include Dispatcher

### If they want structured outcome and payment truth

- include Closeout

### If they lose track of follow-up

- include President Follow-Up

### If they want source/campaign/growth visibility

- include Marketing

### If they want only President access initially

- no extra dashboard seats

### If they want module-specific operators

- recommend extra paid dashboards/seats

---

## 12. Product Rule

The activation flow should not ask questions only for data collection.

It should ask questions to build:

- the right corporate structure
- the right module set
- the right automation path
- the right pricing recommendation

This is the key difference between configuration and ordinary signup.

---

## 13. Main Definition

The AI-ABCX activation question map should be defined as:

`a structured discovery and configuration system that turns business answers into a prepared corporate management system, itemized pricing, and recommended package path`
