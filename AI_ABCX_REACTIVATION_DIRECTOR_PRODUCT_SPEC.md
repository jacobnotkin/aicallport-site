# AI-ABCX Reactivation Director Product Spec

This document defines the implementation-grade product specification for `Reactivation Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Reactivation Director is one of the key Wave 3 launch directors because it converts dormant leads, prior estimates, and prior customers into a structured recovered-revenue lane under President control.

---

## 1. Product Identity

### Public name

`Reactivation Director`

### Executive owner

`CRO`

### Mission

Reactivation Director identifies historical records worth reopening, separates warm opportunities from dead noise, structures re-engagement timing and ownership, and turns old demand into visible recovered revenue inside the AI-ABCX system.

### Core promise

Reactivation Director should not feel like a generic “blast old contacts” tool.

It should promise:

- more revenue from leads and customers the company already paid to get
- fewer forgotten historical opportunities
- cleaner return outreach timing
- better visibility into who is likely to come back
- clearer callback and next-step ownership
- President-level visibility into recoverable revenue

---

## 2. Strategic Role Inside AI-ABCX

Reactivation Director is the controlled-return lane of the revenue system.

It manages the operating span between:

`historical record -> reactivation segment -> outreach readiness -> callback / reply -> reopened opportunity -> revenue recovery`

It is strategically important because:

- many businesses leak value through old unsold estimates, dormant customers, and unworked legacy leads
- historical records often sit inside CRMs with no structured recovery system
- old demand is usually cheaper to recover than net-new demand
- repeat and reactivation revenue often grows faster than brand-new lead acquisition
- the President should see not only new opportunity flow, but also recoverable opportunity still sitting in the database

Reactivation Director can be:

- a standalone recovery-focused director
- part of a revenue bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `HighLevel`
- `HubSpot`
- `ServiceTitan`
- `Jobber`
- `Housecall Pro`
- `ActiveCampaign`

### What they do well

- historical record segmentation
- callback and outreach queue control
- nurture sequencing
- re-engagement campaign basics
- pipeline reopening
- response tracking

### What AI-ABCX must match

- segmentation of old leads and customers
- callback and outreach queue visibility
- reply / no-reply visibility
- reopened-opportunity tracking
- ownership visibility
- recovered-revenue reporting

### Where AI-ABCX should beat them

- reactivation lives inside one President-led corporate system
- one shared customer and opportunity truth survives across Call Handling, Follow-Up, Sales, Service, Marketing, and Lead Generation
- reactivation can use actual service, estimate, follow-up, and revenue history instead of only campaign tags
- recoverable revenue becomes an executive operating issue, not just a CRM list
- the President can see why a historical record matters before it is re-opened

---

## 4. Ideal Customer Fit

Reactivation Director is a strong fit for:

- businesses with old unsold estimates
- companies with past customers who have not returned
- owner-led service businesses with large dormant databases
- teams that know there is money left in prior records but do not have a disciplined recovery lane
- businesses where callback promises and return opportunities are inconsistent

It is especially strong for:

- service companies with repeat-customer potential
- estimate-driven businesses
- local service businesses with seasonality
- companies with long customer histories
- businesses trying to increase revenue before increasing ad spend

---

## 5. Required User Outcomes

Reactivation Director must let a business owner say:

- “I can see which old records are still worth working.”
- “I know the difference between warm, dormant, and bad-fit historical records.”
- “Old opportunities no longer disappear into the past.”
- “I can see who owns each reactivation next step.”
- “I can see callback and reply pressure clearly.”
- “I can see what old demand is turning back into revenue.”
- “The President Dashboard shows recovered revenue and recovery pressure.”

---

## 6. Functional Scope

Reactivation Director must cover eight major functions:

1. historical record identification
2. reactivation segmentation
3. reactivation readiness classification
4. callback and outreach queue control
5. re-opened opportunity handling
6. recovered-revenue tracking
7. coordination with active revenue lanes
8. President-visible recovery pressure

---

## 7. Reactivation Categories

Reactivation Director must preserve category-aware recovery logic.

Launch-required categories:

- prior lead never closed
- prior estimate not sold
- prior customer not rebooked
- dormant repeat customer
- unfinished follow-up legacy record
- old service customer eligible for return outreach
- prior high-value customer

Each category should stay distinct because the system should recommend different recovery logic for each one.

---

## 8. Required Reactivation States

Launch-required states:

- `legacy_record_identified`
- `segment_assigned`
- `warm_priority`
- `dormant_later`
- `queued_for_outreach`
- `callback_due`
- `outreach_sent`
- `reply_received`
- `reopened_opportunity`
- `converted_to_sales`
- `not_interested`
- `bad_fit`
- `do_not_contact`
- `president_attention_needed`

Each state must preserve:

- original source and history
- reactivation segment
- current owner
- last contact timing
- next action
- revenue recovery potential
- President-visible summary

---

## 9. Shared Record Requirement

Reactivation Director must operate on the same shared customer and opportunity truth used by the rest of AI-ABCX.

Required launch fields:

- original lead source
- prior estimate history
- prior service history
- prior outcome history
- last contact date
- reactivation segment
- callback ownership
- outreach status
- reactivation outcome
- recovered revenue amount
- next-step owner

Reactivation Director should never launch as a detached campaign-only module.

---

## 10. Product Surfaces

Reactivation Director must not launch as hidden automation only.

It needs visible product surfaces.

### Surface 1. Reactivation Segment Summary

Purpose:

- show the size and quality of the historical database
- separate warm recoverable records from dormant or weak records

Required visibility:

- segment counts
- value class
- callback pressure
- reopened-opportunity counts

### Surface 2. Reactivation Queue

Purpose:

- show what needs re-engagement now
- keep ownership and next-step timing clear

Required visibility:

- record
- segment
- last contact date
- priority
- owner
- current state

### Surface 3. Reactivation Record View

Purpose:

- show one historical opportunity in full context
- explain why the record deserves recovery work

Required visibility:

- prior history
- segment
- prior revenue or estimate value
- last outreach
- current owner
- next best action

### Surface 4. Recoverable Revenue Summary

Purpose:

- show what revenue can still be pulled back from the past
- make recovery pressure visible to the President

Required visibility:

- recovery potential
- reopened opportunities
- converted opportunities
- lost recovery attempts

### Surface 5. President Dashboard Summary

Purpose:

- expose return-revenue pressure directly to the President

Required visibility:

- high-value dormant records
- open callback pressure
- reopened-opportunity count
- recovered-revenue summary

---

## 11. Business Logic

Reactivation Director must follow practical operating rules.

### Rule 1. Historical records are not all equal

The system must distinguish:

- warm but unfinished records
- truly dormant records
- low-fit or bad historical records

### Rule 2. Reactivation must preserve history

Each recovery attempt should keep visible:

- original source
- past estimate or service history
- prior outcome
- why the record is now being reopened

### Rule 3. Callback ownership must be explicit

If a record needs human follow-up, the owner must be visible.

### Rule 4. Recovery should create a clean handoff

When a record is revived, it should move cleanly into:

- Sales
- Follow-Up
- Scheduling
- Service

depending on the situation.

### Rule 5. President must see recovery pressure

The President should not only see fresh lead volume.

They should also see:

- how much recoverable revenue is sitting unused
- which categories are most promising
- where old opportunities are stalling

### Rule 6. Do-not-contact and bad-fit discipline must be preserved

Reactivation should not turn into chaotic spam.

The system must preserve clear exclusion states.

---

## 12. Dependencies

Reactivation Director is commercially strongest with:

- `Follow-Up Director`
- `Sales Director`
- `Marketing Director`
- `Call Handling Director`
- `Lead Generation Director`

### Strongest paired combinations

- `Reactivation + Follow-Up`
  - preserves unresolved history and turns it into action

- `Reactivation + Sales`
  - converts reopened demand into active revenue work

- `Reactivation + Marketing`
  - supports return campaigns and customer return paths

- `Reactivation + Call Handling`
  - handles live response when dormant records re-engage

- `Reactivation + Lead Generation`
  - preserves source truth when old records re-enter the revenue lane

### Strongest growth bundle

The strongest recovery bundle is:

- `Lead Generation`
- `Follow-Up`
- `Reactivation`
- `Sales`
- `Call Handling`

This creates a full revenue continuity system from first inquiry to recovered return business.

---

## 13. A / B / C Definition

### Level A

Level A Reactivation Director is structured historical outreach control.

Includes:

- historical record visibility
- warm vs dormant segmentation
- queued callback visibility
- basic outreach tracking
- simple outcome states
- President visibility into recoverable revenue

Best fit:

- smaller businesses
- owner-led teams
- companies with old leads or customers but weak recovery discipline

### Level B

Level B Reactivation Director adds stronger prioritization and recovery sequencing.

Includes everything in A, plus:

- better segment scoring
- stronger callback prioritization
- better coordination with Follow-Up and Sales
- clearer reply-rate visibility
- more structured reactivation path control

Best fit:

- companies with meaningful historical databases
- repeat-customer service businesses
- teams using regular callbacks and re-engagement

### Level C

Level C Reactivation Director adds high-automation recovery orchestration.

Includes everything in B, plus:

- deeper recommendation logic
- stronger next-best-action logic
- tighter coordination with Marketing, Call Handling, and Sales
- richer recovered-revenue forecasting
- more autonomous lane maintenance under President oversight

Best fit:

- companies trying to scale repeat revenue aggressively
- larger historical databases
- businesses where reactivation is a major revenue lever

---

## 14. Pricing Direction

Reactivation Director should price as a recovery and repeat-revenue lane, not as a generic campaign tool.

It earns value when it:

- revives unsold estimates
- increases repeat customer returns
- reduces waste in old records
- turns dormant history into active revenue

Pricing should reflect:

- historical database size
- automation depth
- coordination with other revenue directors
- recovered-revenue leverage

It should usually price above a basic reminder layer and below a full top-of-funnel acquisition stack unless bundled.

---

## 15. Diagnostic Recommendation Logic

Reactivation Director should be recommended when the diagnostic shows:

- large dormant lead history
- many prior estimates not converted
- repeat-customer opportunity not being used
- inconsistent callback discipline
- old records sitting in the CRM without structure
- owner says they want more revenue from past customers before spending more on ads

It should be strongly recommended when:

- repeat revenue matters
- the business has seasonal work
- the company has accumulated years of history
- the owner says too many old leads were never worked properly

---

## 16. Recommended Diagnostic Questions

Step 1 should help determine Reactivation Director need with questions like:

- `Do you already have a list of past customers or old leads you want to re-contact?`
- `Do old estimates often go cold without a structured return process?`
- `How often do past customers come back on their own today?`
- `Do you want help turning old records into new revenue opportunities?`
- `Do callbacks and old lead follow-ups happen consistently today?`
- `Would recovering old opportunities be more valuable right now than buying more new leads?`
- `Do you want the system to show which historical records are most worth reactivating first?`

---

## 17. Dashboard Requirements

Reactivation Director must contribute clear executive visibility.

### President Dashboard

Must show:

- recoverable revenue pressure
- high-priority dormant records
- open callback queue
- reopened-opportunity count

### CRO / Revenue Views

Must show:

- segment breakdown
- queue age
- reply-rate visibility
- reopened vs lost recovery outcomes

### Shared Coordination Views

Must preserve handoff visibility into:

- Follow-Up
- Sales
- Scheduling
- Call Handling

---

## 18. Launch Test Scenarios

Reactivation Director is not launch-ready unless these scenarios work:

1. prior unsold estimate is identified and queued for structured recovery
2. dormant repeat customer is segmented differently from a low-fit old lead
3. callback ownership is visible on a reactivation record
4. outreach status changes are visible from queued to sent to replied
5. revived record can move cleanly into Sales without losing prior context
6. do-not-contact records stay blocked from normal reactivation flow
7. President summary shows recoverable revenue pressure clearly
8. recovered revenue can be attributed to reactivation outcomes

---

## 19. Launch Exit Condition

Reactivation Director is launch-ready only when:

- historical records are segmented clearly
- warm vs dormant vs bad-fit states are reliable
- callback and outreach ownership is visible
- re-opened opportunities hand off cleanly
- recovered-revenue visibility exists
- President can see old-demand recovery pressure directly
- A / B / C logic is implemented coherently

---

## 20. Build Priority

`Wave 3`

Reactivation Director should follow Lead Generation because:

- Lead Generation controls fresh demand entry
- Reactivation controls historical demand recovery
- together they define both new and old opportunity flow into the revenue lane

---

## 21. Final Product Statement

Reactivation Director turns old leads, unsold estimates, and dormant customers into a structured recovered-revenue lane inside AI-ABCX, so historical opportunity becomes visible, owned, prioritized, and convertible under President control instead of sitting idle in the past.
