# AI-ABCX Marketing Director Product Spec

This document defines the implementation-grade product specification for `Marketing Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Marketing Director is one of the central Wave 3 launch directors because it coordinates growth activity across channels and turns scattered marketing effort into a President-visible operating lane.

---

## 1. Product Identity

### Public name

`Marketing Director`

### Executive owner

`CMO`

### Mission

Marketing Director coordinates message, offer, campaign, and channel performance across the AI-ABCX growth system so the business can see where demand comes from, which efforts create qualified opportunity, and what growth action should happen next.

### Core promise

Marketing Director should not feel like a vanity dashboard, a generic agency report, or a weak copy of Advertising Director.

It should promise:

- clearer visibility into where growth is coming from
- better understanding of which channels produce qualified opportunities
- less wasted effort on weak channels or weak offers
- more disciplined coordination across campaigns
- stronger connection between marketing and actual revenue outcomes
- President-level visibility into growth pressure and next priorities

---

## 2. Strategic Role Inside AI-ABCX

Marketing Director is the coordinated growth-governance lane of the system.

It manages the operating span between:

`message / offer / channel activity -> campaign visibility -> lead quality -> booked outcomes -> paid outcomes -> growth recommendation`

It is strategically important because:

- many small and medium businesses do marketing without real structure
- channels, campaigns, offers, referrals, website activity, and reactivation efforts often exist without shared visibility
- businesses frequently see traffic or lead volume but not real business-quality outcomes
- growth problems are often caused by poor coordination, not only low spending
- the President should understand where growth is healthy, where it is weak, and what should be improved first

Marketing Director can be:

- a standalone growth-coordination director
- part of a growth bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `HighLevel`
- `HubSpot`
- `ActiveCampaign`
- `Klaviyo`
- `ServiceTitan Marketing Pro`
- `Housecall Pro Marketing tools`

### What they do well

- campaign coordination
- source and channel visibility
- nurture and sequence visibility
- offer and messaging organization
- source-to-lead reporting
- marketing ops structure

### What AI-ABCX must match

- visible channels and campaigns
- source-to-lead visibility
- lead-quality visibility by source
- campaign status organization
- offer and message coordination
- performance comparison logic

### Where AI-ABCX should beat them

- marketing lives inside one President-led corporate structure
- Website, Advertising, Lead Generation, Reactivation, Call Handling, Sales, and Follow-Up share one operating truth
- the system can evaluate marketing based on business outcomes instead of isolated channel metrics
- marketing recommendations can reflect operational constraints and readiness, not just campaign dashboards
- the President gets growth guidance inside the same corporate system used to run the company

---

## 4. Ideal Customer Fit

Marketing Director is a strong fit for:

- businesses using more than one growth channel
- companies unsure which marketing activity is actually helping
- businesses where referrals, website traffic, ads, and reactivation all exist but are not managed together
- owner-led companies that want marketing visibility without hiring a full marketing manager
- service companies trying to increase demand quality and conversion quality

It is especially strong for:

- local service businesses
- estimate-driven businesses
- call-heavy companies
- businesses with seasonal marketing patterns
- companies planning to scale with more directors over time

---

## 5. Required User Outcomes

Marketing Director must let a business owner say:

- “I can see which growth channels are active.”
- “I know which channels create good opportunities, not just more clicks.”
- “I can tell where conversion friction is happening.”
- “I can see which offers or campaigns are weak.”
- “Marketing is coordinated instead of scattered.”
- “The President Dashboard shows clear growth priorities.”
- “I know what the next marketing improvement should be.”

---

## 6. Functional Scope

Marketing Director must cover eight major functions:

1. channel and campaign visibility
2. source and offer coordination
3. lead-quality visibility by source
4. growth-pressure reporting
5. campaign health and status logic
6. outcome comparison by channel
7. cross-director growth recommendations
8. President-visible marketing governance

---

## 7. Marketing Categories

Marketing Director must support category-aware growth logic.

Launch-required categories:

- paid campaigns
- organic / SEO demand
- website conversion activity
- social distribution
- referral and partner sources
- seasonal campaigns
- reactivation campaigns
- review / trust-building campaigns
- offer-based campaigns

Each category should remain distinct so the system can recommend different improvement paths.

---

## 8. Required Marketing States

Launch-required states:

- `active_channel`
- `inactive_channel`
- `campaign_live`
- `under_review`
- `message_fit_issue`
- `conversion_friction`
- `weak_lead_quality`
- `roi_watch`
- `reactivation_opportunity`
- `growth_priority`
- `paused`
- `president_attention_needed`

Each state must preserve:

- channel
- campaign or initiative
- offer or message
- current owner
- current issue or opportunity
- outcome visibility
- President-visible summary

---

## 9. Shared Growth Record Requirement

Marketing Director must operate on a shared growth record that connects channel activity to business results.

Required launch fields:

- source
- campaign
- offer
- landing path
- lead count
- qualified lead count
- booked count
- sold count
- amount paid
- reactivation contribution
- notes or warnings

Marketing Director should not depend on fragmented reporting truth across disconnected tools.

---

## 10. Product Surfaces

Marketing Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Marketing Executive Summary

Purpose:

- show the health of the overall marketing lane
- expose main growth priorities quickly

Required visibility:

- active channels
- strongest channels
- weakest channels
- lead-quality pressure
- growth priorities

### Surface 2. Channel and Campaign Overview

Purpose:

- show what channels and campaigns are currently active
- give structured visibility into message and offer coordination

Required visibility:

- channel
- campaign
- offer
- state
- owner
- performance class

### Surface 3. Source-to-Outcome View

Purpose:

- connect marketing effort to real business outcomes

Required visibility:

- source
- lead volume
- qualified volume
- booked volume
- sold volume
- paid outcome visibility

### Surface 4. Growth Friction View

Purpose:

- show where growth is breaking down

Required visibility:

- weak channel quality
- weak website conversion path
- weak message fit
- poor routing quality
- weak follow-up continuity

### Surface 5. President Dashboard Summary

Purpose:

- show marketing health and next actions directly to the President

Required visibility:

- strongest channel
- weakest channel
- high-priority friction
- next best marketing improvement

---

## 11. Business Logic

Marketing Director must follow practical operating rules.

### Rule 1. Marketing must be outcome-connected

The system should not stop at traffic or campaign activity.

It must connect marketing to:

- lead quality
- bookings
- sales outcomes
- paid outcomes

### Rule 2. Marketing should coordinate channels, not duplicate them

Marketing Director should sit above:

- Advertising
- SEO
- Website
- Reactivation
- Lead Generation

and coordinate them without replacing their specialist logic.

### Rule 3. Weak channels must stay visible

The system must preserve visibility into:

- channels that create weak-fit leads
- channels that create volume without outcomes
- offers that create friction

### Rule 4. Campaign health should be structured

Marketing should support clear states like:

- active
- weak
- under review
- paused
- growth priority

### Rule 5. President must get marketing governance, not raw metrics

The President should see:

- what is helping
- what is weak
- what should change next

instead of disconnected reports.

### Rule 6. Marketing recommendations must respect system reality

Recommendations should account for:

- Website readiness
- Advertising readiness
- Lead quality problems
- Sales capacity
- Follow-Up continuity

so growth guidance stays practical.

---

## 12. Dependencies

Marketing Director is commercially strongest with:

- `Website Director`
- `Advertising Director`
- `SEO Director`
- `Lead Generation Director`
- `Reactivation Director`
- `Sales Director`

### Strongest paired combinations

- `Marketing + Website`
  - connects message and offer to actual conversion infrastructure

- `Marketing + Advertising`
  - connects campaign governance to paid demand execution

- `Marketing + Lead Generation`
  - connects growth effort to real demand-quality truth

- `Marketing + Reactivation`
  - supports structured return-growth campaigns

- `Marketing + Sales`
  - helps judge which channels create real revenue outcomes

### Strongest growth bundle

The strongest launch growth bundle is:

- `Website`
- `Lead Generation`
- `Marketing`
- `Advertising`
- `SEO`
- `Reactivation`

This creates the clearest full-funnel growth layer inside AI-ABCX.

---

## 13. A / B / C Definition

### Level A

Level A Marketing Director is foundational growth coordination.

Includes:

- source tracking
- campaign list and ownership
- channel classification
- referral visibility
- website form visibility
- reactivation visibility
- qualified vs unqualified lead visibility
- President growth summary

Best fit:

- small and medium service businesses
- owners needing basic growth structure first
- teams using more than one growth channel without clear coordination

### Level B

Level B Marketing Director adds connected growth outcome visibility.

Includes everything in A, plus:

- source-to-lead attribution
- lead-quality tracking by source
- booked outcomes by source
- sold outcomes by source
- amount-paid visibility by source
- stronger campaign comparison
- stronger reactivation performance visibility

Best fit:

- businesses actively running campaigns
- companies with meaningful lead flow
- teams trying to improve channel quality, not just increase volume

### Level C

Level C Marketing Director adds advanced growth management logic.

Includes everything in B, plus:

- recommendation engine
- budget-direction guidance
- growth-risk warnings
- service-line comparison
- market comparison logic
- President-facing next-action recommendations

Best fit:

- growth-focused companies
- businesses scaling multiple channels
- owners wanting high-level marketing intelligence without building a full department

---

## 14. Pricing Direction

Marketing Director should price as a growth-governance and demand-quality lane, not as a simple posting tool.

It earns value when it:

- improves growth coordination
- reduces weak lead waste
- improves source quality visibility
- increases qualified outcomes
- turns scattered activity into managed growth

Pricing should reflect:

- channel complexity
- reporting depth
- recommendation depth
- coordination with Website, Advertising, SEO, Lead Generation, and Reactivation

It should usually price above a simple communication tool and below a combined high-intensity acquisition stack unless bundled.

---

## 15. Diagnostic Recommendation Logic

Marketing Director should be recommended when the diagnostic shows:

- multiple growth channels already exist
- the owner does marketing but does not trust results
- lead quality varies heavily by source
- website, ads, referrals, and return activity are not coordinated
- the owner wants more structured business growth
- the company wants visibility into what to improve first

It should be strongly recommended when:

- the company is growth-focused
- the owner wants more than one customer-acquisition path
- the business wants clearer visibility between traffic and real revenue
- the company intends to scale intentionally instead of reactively

---

## 16. Recommended Diagnostic Questions

Step 1 should help determine Marketing Director need with questions like:

- `How do new customers currently find you most often?`
- `Do you use more than one growth channel today?`
- `Do you know which channels bring your best customers?`
- `Do you feel your current marketing is organized or scattered?`
- `Do you want help understanding which offers or channels are weak?`
- `Are you trying to grow steadily, aggressively, or mainly recover lost opportunities?`
- `Would it help to have one system show what growth action should happen next?`

---

## 17. Dashboard Requirements

Marketing Director must contribute executive-grade visibility.

### President Dashboard

Must show:

- strongest channel
- weakest channel
- growth friction pressure
- next best improvement

### CMO / Growth Views

Must show:

- channel health
- campaign states
- lead-quality by source
- booked and sold outcome visibility

### Shared Coordination Views

Must preserve alignment with:

- Website
- Advertising
- SEO
- Lead Generation
- Reactivation
- Sales

---

## 18. Launch Test Scenarios

Marketing Director is not launch-ready unless these scenarios work:

1. multiple channels can be shown separately inside one coordinated marketing view
2. the system can distinguish a stronger source from a weaker one
3. a weak-fit lead channel can be flagged as a quality issue
4. a reactivation-driven campaign can appear inside marketing visibility without losing category distinction
5. website conversion friction can appear as a marketing problem without replacing Website Director logic
6. booked and sold outcome visibility can be associated with source-level marketing truth
7. President summary can show a clear growth priority
8. the system can recommend a stronger growth configuration when marketing complexity increases

---

## 19. Launch Exit Condition

Marketing Director is launch-ready only when:

- channels and campaigns are visible clearly
- source-to-outcome logic exists
- weak channel quality can be identified
- Website, Advertising, Lead Generation, and Reactivation coordination is coherent
- President-facing growth governance exists
- A / B / C logic is commercially and operationally clear

---

## 20. Build Priority

`Wave 3`

Marketing Director should follow Lead Generation and Reactivation in planning maturity, and it should be locked before Advertising and SEO are finalized because it provides the broader growth-governance frame those specialist directors sit under.

---

## 21. Final Product Statement

Marketing Director turns scattered marketing activity into one visible, coordinated growth lane inside AI-ABCX, so the business can see which channels, campaigns, and offers create qualified opportunity, where growth friction exists, and what should be improved next under President control.
