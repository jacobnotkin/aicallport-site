# AI-ABCX Reactivation Director Build Checklist

This document turns Reactivation Director from a partially implemented launch role into a normalized AI-ABCX launch director with a clear mission, clear dependencies, and a practical build sequence.

Its purpose is to answer one direct execution question:

`What exactly has to be built, normalized, and tested for Reactivation Director to become a real AI-ABCX launch director?`

This is a build-level document.

It sits below:

- `/Users/yakovnotkin/Documents/New project/AI_ABCX_MASTER_LAUNCH_ROADMAP.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_TIER_1_BUILD_PLAN.md`
- `/Users/yakovnotkin/Documents/New project/AI_ABCX_PHASE_1_EXECUTION_CHECKLIST.md`

---

## 1. Reactivation Director Mission

Reactivation Director is the controlled-return lane of AI-ABCX.

Its job is to:

- identify prior leads and prior customers worth re-engaging
- preserve segment quality between warm, dormant, and low-fit records
- queue callbacks and outreach in a structured way
- show which historical records are most likely to recover revenue
- coordinate reactivation with Follow-Up, Sales, Marketing, and Call Handling
- keep reactivation from becoming random bulk outreach
- report recoverable revenue and callback pressure directly to the President

Reactivation Director should not feel like a generic blast campaign tool.

It should feel like a structured recovery lane under President control.

---

## 2. Reactivation Director Launch Standard

Reactivation Director is launch-ready only when it can do all of the following:

1. show historical lead and customer segments clearly
2. distinguish warm records from dormant records and low-fit records
3. support queued outreach and callback ownership
4. preserve reason-for-return and prior-history context
5. support structured reactivation outcomes consistently
6. coordinate cleanly with Follow-Up Director, Sales Director, Marketing Director, and Call Handling Director
7. surface recoverable revenue pressure visibly to the President
8. support A / B / C levels clearly

If one of these is missing, the director is not complete.

---

## 3. Canonical Role Definition

### Public-facing name

`Reactivation Director`

### Internal role meaning

The AI-ABCX director responsible for structured re-engagement of prior leads and prior customers, including historical segmentation, callback sequencing, outreach readiness, recovered-revenue visibility, and next-step control after a legacy record is reopened.

### Executive owner

`CRO`

Reactivation Director belongs to the revenue lane because it converts historical trust and prior demand into fresh revenue opportunities.

---

## 4. Commercial Promise

Reactivation Director should promise:

- more value from leads and customers the business already paid to get
- fewer forgotten historical opportunities
- cleaner return outreach timing
- more repeat and recovered revenue
- clearer callback ownership
- better President visibility into legacy opportunity value

The commercial promise is not merely:

- "You get a reactivation list."

It is:

- "Your old leads and customers become a structured growth lane instead of dead records."

---

## 5. What AI-ABCX Must Match

Reactivation Director must match the practical expectations customers already have from strong re-engagement systems:

- segmentation of historical records
- callback and outreach queue control
- next-step ownership
- reply / no-reply visibility
- basic recovered-revenue reporting
- coordination with active sales and follow-up work

At minimum, it must not feel weaker than a solid CRM reactivation workflow.

---

## 6. Where AI-ABCX Can Beat the Market

Reactivation Director can beat typical outside tools because:

- it lives inside one President-led corporate structure
- it shares one job and customer truth with Sales, Follow-Up, Call Handling, Website, and Marketing
- it can re-open prior opportunities using actual company history instead of disconnected campaign tags
- it can classify return records based on real service, estimate, contact, and outcome history
- it can show recoverable revenue in the same executive system used by the President

This is stronger than a typical CRM campaign feature because it keeps reactivation connected to the company’s actual operating record.

---

## 7. A / B / C Definition Draft

### Level A

Level A Reactivation Director is structured historical outreach control.

Includes:

- legacy record visibility
- warm vs dormant segmentation
- queued callback visibility
- basic outreach tracking
- simple outcome states
- President visibility into recoverable revenue

Best fit:

- smaller businesses
- companies with unused prior leads
- companies that need basic recovery discipline first

### Level B

Level B Reactivation Director adds stronger prioritization and sequencing.

Includes everything in A, plus:

- better segment scoring
- stronger callback prioritization
- better coordination with sales and follow-up
- stronger reply-rate visibility
- more structured reactivation path control

Best fit:

- companies with meaningful historical databases
- teams doing repeat outreach regularly
- service businesses with multiple prior customer categories

### Level C

Level C Reactivation Director adds high-automation re-engagement orchestration.

Includes everything in B, plus:

- deeper recommendation logic
- stronger automation around record readiness and next-best action
- tighter coordination with Marketing, Call Handling, and Sales
- richer recovered-revenue forecasting
- more autonomous lane maintenance under President oversight

Best fit:

- companies trying to scale repeat revenue aggressively
- teams with larger dormant databases
- businesses where historical records are a major growth lever

---

## 8. Required Reactivation Categories

Reactivation Director should support at least these launch categories:

- prior lead never closed
- prior estimate not sold
- prior customer not rebooked
- dormant repeat customer
- unfinished follow-up legacy record
- old service customer eligible for return outreach
- prior high-value customer

These categories should remain distinguishable so the system can recommend different outreach logic.

---

## 9. Required Reactivation States

At minimum, Reactivation Director should support:

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

These states should be normalized so reactivation stays structured instead of drifting into generic lead notes.

---

## 10. Required Shared Record

Reactivation Director must operate on the same customer and opportunity truth used by the rest of AI-ABCX.

That record should preserve:

- original lead source
- prior service history
- prior estimate history
- prior sales outcome
- last contact date
- reactivation segment
- callback ownership
- reactivation outcome
- recovered revenue amount
- next-step owner

Reactivation Director should never create a detached "campaign-only" truth layer.

---

## 11. Required Product Surfaces

Reactivation Director should launch with visible surfaces, not just background logic.

Required surfaces:

- Legacy Records Board
- Warm Segment
- Dormant Segment
- Callback Queue
- Reactivation Outcome Entry
- Recovered Revenue Summary

These surfaces are already strongly implied by the President config tabs and should be normalized into the canonical director product.

---

## 12. Required Dashboard Visibility

Reactivation Director must be visible in the right places:

- President Dashboard
- CRO lane view
- Reactivation Director surface
- reactivation-related recommendation areas
- launch configuration and activation logic

The President should be able to understand:

- how many records are reactivation-ready
- which segment should be worked first
- what callback load exists now
- how much recoverable revenue is realistically visible

---

## 13. Required Handoffs

Reactivation Director must hand off cleanly to:

- `Follow-Up Director`
  - when next-step continuity is needed after response
- `Sales Director`
  - when the reactivated record becomes a live conversion opportunity
- `Marketing Director`
  - when broader segment nurture is required
- `Call Handling Director`
  - when response enters phone or message intake
- `Estimator Director`
  - when renewed quote-building is required

Weak handoffs would make the entire lane feel fake.

---

## 14. Guided Activation Requirements

The system must be able to determine whether Reactivation Director should be included by asking human questions such as:

- Do you already have old leads or old customers you want to bring back?
- Do you know who has not been contacted again?
- Do you want repeat-customer growth?
- Do you have a list of people who asked before but never bought?
- Do you currently re-contact prior leads manually, inconsistently, or not at all?

Activation should determine:

- whether reactivation is needed
- how large the historical record base is
- whether the lane should start at A, B, or C
- whether Follow-Up, Sales, Marketing, or Call Handling must be bundled with it

---

## 15. Pricing Decisions Still Required

This checklist does not lock pricing.

But pricing architecture must eventually decide:

- whether Reactivation Director can be bought independently
- what minimum bundle it requires, if any
- whether it has different value in repeat-customer businesses vs unsold-lead businesses
- whether recovered-revenue visibility is included at all levels
- how it should be positioned in partial, improved, and advanced recommended configurations

---

## 16. Build Sequence

Recommended implementation order:

1. normalize canonical Reactivation Director identity across launch planning
2. define historical segment model
3. define reactivation state model
4. define callback and outreach queue behavior
5. build Reactivation Director surface
6. connect handoffs into Follow-Up, Sales, Call Handling, Marketing, and Estimator
7. define A / B / C rules
8. connect President-facing reporting
9. test reactivation flows end to end

This sequence keeps the lane operational before trying to over-automate it.

---

## 17. Internal Tests Required

At minimum, Reactivation Director should be tested for:

1. warm historical lead moved into active callback queue
2. dormant low-fit record kept out of the wrong queue
3. reactivated customer turned into a live sales opportunity correctly
4. no-reply and not-interested outcomes preserved correctly
5. recovered-revenue metrics updated correctly
6. Follow-Up and Sales handoffs created without record breakage
7. President visibility reflecting current reactivation pressure accurately

If these tests fail, the director is not ready.

---

## 18. File / Surface Planning

Likely implementation artifacts will eventually include:

- Reactivation Director dashboard / screen
- Reactivation queue components
- Reactivation state model definitions
- President summary integration
- launch configuration rules
- recommendation logic for reactivation inclusion

This file does not prescribe exact filenames yet.

It defines the functional scope that the implementation must satisfy.

---

## 19. Completion Gate

Reactivation Director is complete only when:

- its role is normalized clearly
- its states are real
- its segments are real
- its surface is usable
- its handoffs work
- its A / B / C rules are defined
- its President visibility is real
- its launch tests pass

Until then, it remains partial.

---

## 20. Practical Conclusion

Reactivation Director should become one of AI-ABCX’s strongest revenue multipliers because it lets a company recover value from people it already spent time or money to attract.

That makes it commercially strong.

But it only works if it stays structured:

- clean segments
- clean ownership
- clean outcomes
- clean handoffs
- clean President visibility

That is the launch standard.
