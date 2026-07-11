# AI-ABCX Advertising Director Product Spec

This document defines the implementation-grade product specification for `Advertising Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Advertising Director is one of the core Wave 3 launch directors because it controls paid-demand quality, protects budget discipline, and converts ad activity into President-visible business pressure instead of disconnected channel reporting.

---

## 1. Product Identity

### Public name

`Advertising Director`

### Executive owner

`CMO`

### Mission

Advertising Director makes paid acquisition visible by channel, protects ROI discipline before budget expands, connects campaign spend to demand quality, and keeps the President informed when ad pressure is healthy, weak, or risky.

### Core promise

Advertising Director should not feel like a generic ads manager, a vanity report, or a platform that only shows clicks and spend.

It should promise:

- clearer visibility into where ad money is going
- better awareness of which channels create business-fit demand
- fewer weak campaigns consuming budget silently
- stronger connection between paid spend and actual downstream outcomes
- earlier visibility into weak landing-page fit or weak demand fit
- stronger President visibility into acquisition efficiency and risk

---

## 2. Strategic Role Inside AI-ABCX

Advertising Director is the paid-demand control lane of the system.

It manages the operating span between:

`campaign spend -> channel activity -> landing target -> lead attribution -> demand quality -> routed revenue opportunity -> budget decision`

It is strategically important because:

- many service companies spend on ads without real source-to-outcome discipline
- ad reports often overvalue clicks, impressions, or raw leads while hiding poor-fit demand
- businesses can scale bad campaigns faster than they can detect them
- website quality and demand quality often break the paid funnel before sales ever sees the issue
- the President should understand whether budget is building healthy growth or just buying noise

Advertising Director can be:

- a standalone paid-growth director
- part of a growth bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `Google Ads`
- `Meta Ads Manager`
- `HighLevel`
- `HubSpot`
- `ServiceTitan Marketing Pro`
- `CallRail`

### What they do well

- campaign visibility
- channel comparison
- spend reporting
- attribution summaries
- call and form source reporting
- landing-page performance awareness

### What AI-ABCX must match

- visible paid channels
- spend tracking clarity
- attribution visibility
- weak-channel identification
- ROI awareness
- campaign health visibility
- budget risk awareness

### Where AI-ABCX should beat them

- paid demand lives inside one President-led corporate structure
- Website Director, Lead Generation Director, Call Handling Director, Sales Director, and Follow-Up Director all share one operating truth
- ad performance can be judged by fit, routing quality, booking quality, and sold outcomes instead of only marketing metrics
- budget decisions become executive operating decisions, not isolated ad decisions
- the President sees where campaign quality is breaking before scale damage gets worse

---

## 4. Ideal Customer Fit

Advertising Director is a strong fit for:

- businesses already running paid ads
- companies planning to start paid acquisition but wanting control from day one
- businesses using search, social, local service ads, or retargeting
- companies unsure which paid channels are actually producing good opportunities
- teams that want budget visibility without hiring a full paid-media manager

It is especially strong for:

- local service businesses
- lead-driven service companies
- estimate-heavy companies
- call-focused companies
- businesses scaling multi-channel demand

---

## 5. Required User Outcomes

Advertising Director must let a business owner say:

- “I can see exactly which paid channels are active.”
- “I know where ad money is being spent.”
- “I can tell which channels create strong opportunities and which ones waste budget.”
- “Landing-page problems are visible before I keep paying for bad traffic.”
- “Paid growth is tied to real business outcomes, not just clicks.”
- “The President Dashboard shows when ad spend needs attention.”
- “I know whether to scale, pause, or fix a campaign.”

---

## 6. Functional Scope

Advertising Director must cover eight major functions:

1. paid-channel visibility
2. spend and budget pressure visibility
3. source-to-lead attribution awareness
4. lead-fit quality visibility by campaign
5. landing-target fit awareness
6. weak-channel and weak-ROI identification
7. channel-to-outcome comparison logic
8. President-visible budget and campaign risk reporting

---

## 7. Advertising Categories

Advertising Director must support category-aware paid-growth logic.

Launch-required categories:

- search ads
- social ads
- local service ads
- retargeting campaigns
- call-focused campaigns
- form-focused campaigns
- awareness / visibility campaigns

Each category should remain distinct so AI-ABCX can recommend different budget and funnel actions.

---

## 8. Required Advertising States

Advertising Director needs its own paid-growth operating states while staying tied to the same shared demand record.

Launch-required states:

- `active_campaign`
- `under_review`
- `weak_roi`
- `high_fit`
- `landing_fit_issue`
- `budget_watch`
- `paused`
- `scaled`
- `president_attention_needed`

Each state must preserve:

- channel
- campaign
- current spend pressure
- landing target
- attributed lead quality
- assigned owner
- next recommended action
- President-visible summary

---

## 9. Shared Demand Record Requirement

Advertising Director must operate on the same shared demand and opportunity record used by the rest of AI-ABCX.

Required launch fields:

- campaign source
- channel type
- spend origin
- landing target
- attributed lead count
- fit quality
- routed owner
- handoff outcome
- next-step status
- budget review status

Advertising Director should not create a disconnected ads-only truth layer.

---

## 10. Product Surfaces

Advertising Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Paid Channel Summary

Purpose:

- show all active paid channels clearly
- make spend pressure visible at a glance

Required visibility:

- active channels
- channel states
- campaign grouping
- budget class
- weak-channel warnings

### Surface 2. ROI / Weak ROI Summary

Purpose:

- distinguish strong channels from weak ones
- make poor budget allocation obvious

Required visibility:

- stronger channels
- weaker channels
- high-fit vs low-fit demand quality
- budget-watch classification

### Surface 3. Attribution View

Purpose:

- connect paid source to lead-entry truth
- expose where demand is actually coming from

Required visibility:

- campaign
- source
- lead count
- qualified lead count
- routed outcomes

### Surface 4. Landing-Page Fit View

Purpose:

- show where the traffic-to-conversion path is breaking
- connect ad performance to website readiness

Required visibility:

- landing target
- campaign pairing
- fit issue flags
- form or call friction signals
- Website Director dependency signals

### Surface 5. Campaign Risk Summary

Purpose:

- show campaigns that should be reviewed before more spend is added

Required visibility:

- weak ROI
- landing-fit issues
- poor source quality
- unresolved review state

### Surface 6. Budget Pressure Summary

Purpose:

- give the President and CMO an operating summary of ad pressure

Required visibility:

- growth pressure
- budget-watch campaigns
- scale candidates
- pause candidates
- President attention cases

---

## 11. Business Logic

Advertising Director must follow these operating rules:

1. paid channels must remain attributable by campaign and category
2. high spend without fit quality should trigger visible pressure
3. weak landing targets must be surfaced before campaigns scale
4. campaigns with weak lead quality must not be treated as healthy just because they generate volume
5. scale recommendations must depend on downstream business fit, not only ad activity
6. pause or review recommendations must be clearly visible to the President and CMO

Advertising Director should behave like a budget-discipline director, not just a reporting surface.

---

## 12. Dependencies

Advertising Director is commercially strong alone, but operationally it becomes much stronger when paired correctly.

### Strong pairings

- `Website Director`
- `Lead Generation Director`
- `Call Handling Director`
- `Sales Director`
- `Follow-Up Director`
- `Marketing Director`

### Why those dependencies matter

- Website Director reveals whether landing targets are helping or hurting conversion
- Lead Generation Director shows whether ad traffic is producing fit demand
- Call Handling Director helps when ads are designed to generate inbound calls
- Sales Director proves whether ad-created opportunities are becoming revenue
- Follow-Up Director exposes whether ad spend is being wasted after the lead arrives
- Marketing Director coordinates message, offer, and growth logic across the wider system

### Standalone viability

Advertising Director can be sold independently if the business is already buying demand and wants paid-channel control.

However, for stronger AI-ABCX performance it should be recommended with:

- Website Director for paid landing visibility
- Lead Generation Director for demand-quality visibility

---

## 13. A / B / C Definition

### Level A

Level A Advertising Director is visible paid-channel oversight.

Includes:

- visible paid channels
- spend visibility
- basic attribution awareness
- weak-channel identification
- President visibility into ad pressure

Best fit:

- small businesses beginning paid acquisition
- companies with limited campaign volume
- teams trying to avoid obvious wasted spend

### Level B

Level B Advertising Director adds stronger efficiency control.

Includes everything in A, plus:

- stronger channel comparison
- better landing-page fit visibility
- better source-quality visibility
- stronger coordination with Lead Generation Director
- stronger pause / continue decision support

Best fit:

- businesses using multiple paid channels
- teams actively buying demand
- companies improving efficiency before scaling

### Level C

Level C Advertising Director adds advanced paid-growth orchestration.

Includes everything in B, plus:

- deeper campaign prioritization
- stronger autonomous spend guidance
- richer fit and ROI logic
- tighter connection to website optimization and sales quality
- more advanced President and CMO control visibility

Best fit:

- scaling companies
- multi-channel advertisers
- businesses trying to expand aggressively with control

---

## 14. Pricing Direction

Advertising Director pricing should reflect business value, not just dashboard access.

It protects spend, reveals weak demand, and can prevent budget from scaling into low-fit traffic.

Directional positioning:

- A should feel accessible for smaller businesses using limited paid traffic
- B should feel like the professional ad-control layer for multi-channel demand
- C should feel like advanced paid-growth orchestration for serious scaling businesses

Advertising Director should price above vanity reporting tools and below what a business would spend replacing this visibility with fragmented ads, attribution, and funnel tools.

---

## 15. Diagnostic Recommendation Logic

Advertising Director should be recommended when any of the following are true:

- the business already runs paid ads
- the owner wants more leads quickly
- the business plans to scale demand through advertising
- the company does not know which channels are producing good opportunities
- the company gets traffic but weak conversions
- the company wants budget discipline before increasing spend

Advertising Director should become a strong recommendation when paid demand exists but:

- website fit is weak
- demand quality is inconsistent
- sales conversion is unclear
- follow-up leaks are reducing ROI

---

## 16. Recommended Diagnostic Questions

Step 1 or later qualification should help determine whether Advertising Director is recommended and at what level.

Recommended questions:

- Are you currently running paid ads?
- Which paid channels are you using today?
- Do you know which ad source creates the best customers?
- Are you getting calls, form leads, or both from advertising?
- Do you feel you are spending efficiently, or are you unsure?
- Do you want to increase demand volume soon?
- Does your current website convert ad traffic well?
- Do you want visibility before scaling your ad budget?

These questions should help classify:

- whether Advertising Director is needed
- whether Website Director should be paired
- whether Lead Generation Director should be paired
- whether A, B, or C is the right level

---

## 17. Dashboard Requirements

Advertising Director must appear in the correct executive and President surfaces.

Required visibility:

- President Dashboard summary state
- CMO lane summary
- paid-channel summary cards
- attribution and lead-quality summaries
- landing-fit issue visibility
- budget pressure visibility
- weak ROI alerts

The President should not need to open raw campaign tools to understand paid acquisition health.

---

## 18. Launch Test Scenarios

Advertising Director is not launch-ready until it passes practical scenario testing.

Required launch scenarios:

1. a search campaign produces strong-fit demand and is visible as healthy
2. a social campaign produces weak-fit demand and is surfaced as weak ROI or weak-fit pressure
3. a campaign sends traffic to a weak landing target and the system flags landing-fit issues
4. a call-focused campaign generates inbound call demand that stays attributable
5. a form-focused campaign generates leads that route cleanly into Lead Generation Director
6. budget-watch state appears clearly when ad pressure is high but outcomes are weak
7. President Dashboard shows whether paid demand should be scaled, reviewed, or paused

---

## 19. Launch Exit Condition

Advertising Director can be considered launch-complete when:

- all required advertising categories are visible
- attribution is preserved through the shared demand record
- weak-channel and weak-ROI logic is visible
- landing-fit issues surface clearly
- budget pressure is visible to the President
- A / B / C behavior is defined clearly
- dependencies with Website and Lead Generation are operationally meaningful
- the director feels like a real paid-demand operating lane, not a shallow marketing widget

---

## 20. Build Priority

Advertising Director is a `Wave 3` launch director.

It should be built after:

- `Lead Generation Director`
- `Marketing Director`

It should be tightly coordinated with:

- `Website Director`
- `Call Handling Director`
- `Sales Director`
- `Follow-Up Director`

It becomes materially stronger when Website and Lead Generation are already cleanly defined.

---

## 21. Final Product Statement

Advertising Director is the AI-ABCX paid-growth control lane.

It gives service businesses structured visibility into where ad money is going, which campaigns create real business-fit demand, where landing or funnel problems are breaking conversion, and when the President should scale, pause, or correct paid acquisition.

It is not just ad reporting.

It is paid-demand discipline under President control.
