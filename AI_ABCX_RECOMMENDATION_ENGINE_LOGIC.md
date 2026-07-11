# AI-ABCX Recommendation Engine Logic

## Purpose

This document defines how AI-ABCX should convert Step 1 answers into:

- director need scores
- level recommendations
- valid combinations
- pricing-ready configurations
- business summary logic
- three final recommended setups

This is the logic layer between:

- the Step 1 question bank

and

- the customer-facing configuration output

---

## Core Principle

The recommendation engine should not just reflect what the customer clicked.

It should interpret:

- current business state
- pain points
- workflow reality
- growth intent
- infrastructure readiness
- valid dependency rules

Then it should produce the strongest valid recommendation set.

---

## Engine Outputs

The engine must always generate:

## 1. Intent Fit Configuration

The closest valid setup to what the owner says they want now.

## 2. Improved Configuration

A stronger setup that fixes obvious weaknesses or missing companions.

## 3. Advanced Configuration

A higher-performance setup designed for stronger automation, visibility, and growth.

---

## Engine Layers

The recommendation engine should work in six layers.

## Layer 1. Business Profile Interpretation

Translate raw answers into company profile signals.

## Layer 2. Director Need Scoring

Score which directors are relevant and how strongly.

## Layer 3. Level Scoring

Estimate whether each relevant director fits A, B, or C.

## Layer 4. Dependency Validation

Remove invalid combinations and add required companions.

## Layer 5. Configuration Building

Assemble intent-fit, improved, and advanced setups.

## Layer 6. Summary And Projection Logic

Generate the explanation and forward-looking outcome note.

---

## Layer 1. Business Profile Interpretation

Step 1 answers should first be normalized into core business profile signals.

Examples:

- estimate-driven business
- booking-heavy business
- field-service business
- office-coordinated business
- marketing-dependent business
- repeat-business business
- scale-intent business
- visibility-starved business
- low-maturity business
- high-maturity business

These profile signals should shape recommendation weighting before any final configuration is built.

---

## Core Business Signals

The engine should derive at least these signals:

- business_size_signal
- growth_intent_signal
- automation_readiness_signal
- website_readiness_signal
- lead_generation_need_signal
- estimator_need_signal
- call_handling_need_signal
- scheduling_need_signal
- dispatch_need_signal
- service_visibility_signal
- follow_up_need_signal
- sales_need_signal
- retention_need_signal
- governance_need_signal
- finance_visibility_signal

---

## Layer 2. Director Need Scoring

Each director should receive a recommendation score.

Recommended internal scale:

- 0 = not relevant
- 1 = low relevance
- 2 = useful
- 3 = strong fit
- 4 = high-priority
- 5 = critical

This score should come from answer patterns, not from a single answer only.

---

## Launch Directors To Score

The engine should score at least these launch directors:

- Estimator Director
- Call Handling Director
- Website Director
- Follow-Up Director
- Scheduling Director
- Dispatch Director
- Sales Director
- Reactivation Director
- Lead Generation Director
- Advertising Director
- SEO Director
- Marketing Director
- Customer Success Director
- Support Director
- Reviews & Referrals Director
- Retention Director
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

---

## Example Director Scoring Logic

## Estimator Director

Increase score when:

- quotes are common
- quotes are slow
- quotes are manual
- customer chooses between options
- business is estimate-driven
- owner wants more sales

Lower score when:

- quoting is rare
- service is mostly simple booking only

---

## Call Handling Director

Increase score when:

- calls are a main lead source
- missed calls are a problem
- after-hours matters
- call qualification matters
- multilingual need exists
- urgency routing matters

Lower score when:

- calls are not an important business channel

---

## Website Director

Increase score when:

- no website exists
- current website is weak
- owner wants more leads
- marketing or advertising is desired
- website analysis shows limitations

Lower score when:

- current website is strong
- online demand is not important

---

## Follow-Up Director

Increase score when:

- follow-up is inconsistent
- quotes are not closed quickly
- owner wants more conversion
- repeat contact is weak

---

## Scheduling Director

Increase score when:

- customers book appointments
- scheduling is manual
- reschedules happen often
- booking control is important

Lower score when:

- business does not use appointments

---

## Dispatch Director

Increase score when:

- multiple technicians or crews exist
- field assignment matters
- route planning matters
- service coordination is complex

Block from standalone recommendation when:

- scheduling context is missing

---

## Sales Director

Increase score when:

- quote volume exists
- close rate is weak
- upsell opportunity exists
- owner wants better conversion

Lower score when:

- there is no real sales motion

---

## Lead Generation Director

Increase score when:

- owner wants more leads
- website / marketing path exists
- advertising or demand generation is needed

Lower score when:

- business already has enough demand

---

## Marketing Director

Increase score when:

- owner wants stronger growth
- online presence matters
- repeat business growth matters
- campaign coordination is needed

---

## Customer Success / Retention / Reviews & Referrals

Increase when:

- repeat business matters
- service follow-through matters
- reviews are weak
- customer retention matters
- existing customer base is meaningful

---

## Governance And Finance Directors

Increase when:

- business has bigger team size
- owner wants more control
- visibility is weak
- operations feel chaotic
- financial truth is unclear

These directors should rarely dominate small simple businesses unless visibility pain is strong.

---

## Layer 3. Level Scoring

After a director is marked relevant, the engine should decide whether A, B, or C is the best fit.

Level should not be chosen only by business size.

It should be shaped by:

- workflow complexity
- automation readiness
- current infrastructure
- owner intent
- team structure
- volume

---

## Level A Indicators

Recommend A when:

- business is early-stage
- owner wants one focused improvement
- workflow is still manual
- infrastructure is basic
- lower complexity exists

Meaning:

- functional foundation
- limited integration pressure

---

## Level B Indicators

Recommend B when:

- business has clear workflow complexity
- owner wants stronger coordination
- there are enough recurring records to justify automation
- business already uses some tools or organized process

Meaning:

- professional connected operating level

---

## Level C Indicators

Recommend C when:

- owner wants scale or deep automation
- business has real operational complexity
- volume and team justify stronger system depth
- stronger infrastructure exists or can be created
- advanced visibility and workflow control are needed

Meaning:

- advanced operating system behavior

---

## Intent Override Logic

Intent should meaningfully affect level recommendation.

Example:

- a larger business that does not want deep automation may still receive partial or mixed-level recommendation
- a smaller but ambitious business may receive improved or advanced paths faster

So:

- current business size matters
- but growth intent and readiness also matter

---

## Layer 4. Dependency Validation

Once director and level candidates are identified, the engine must validate them against the dependency rules.

This means:

- add missing hard dependencies
- warn on weak standalone choices
- block invalid combinations
- normalize levels where needed

---

## Dependency Actions

The engine should use four actions:

## 1. Allow

Combination is valid as selected.

## 2. Allow With Warning

Combination is valid but weak.

## 3. Auto-Recommend Companion

Combination works better with a related director and the engine should suggest it.

## 4. Block And Replace

Combination is not valid and must be replaced by the smallest valid version.

---

## Example Dependency Logic

If Scheduling is selected:

- allow standalone in some cases
- if field complexity is high, recommend Dispatch

If Dispatch is selected:

- require Scheduling

If Advertising is selected:

- require a valid intake destination
- if website is weak, recommend Website
- if follow-up is weak, recommend Follow-Up

If Marketing C is selected:

- strongly prefer Website C or equivalent readiness

If Sales is selected:

- recommend Estimator and Follow-Up if quote-driven workflow exists

---

## Layer 5. Configuration Building

After scoring and validation, the engine should construct three configurations.

These should not be random variations.

Each one should have a clear purpose.

---

## Intent Fit Configuration Rules

Intent Fit should:

- stay close to what the owner clearly asked for
- respect dependency rules
- avoid overbuilding too early

Use cases:

- owner wants one weak area fixed
- owner wants one entry point

Example:

- owner wants better quotes
- output: Estimator + Follow-Up

---

## Improved Configuration Rules

Improved should:

- fix missing companion functions
- close obvious operational gaps
- create a stronger business result

Example:

- owner wants better quotes
- improved adds Sales or Website or Call Handling depending on source flow

---

## Advanced Configuration Rules

Advanced should:

- show the stronger future path
- reflect scale, automation, and visibility
- support broader business transformation

This configuration should often be the upsell path.

Example:

- quote-driven business with growth intent
- advanced adds Estimator C + Follow-Up + Sales + Website + Call Handling

---

## Mixed-Level Configurations

The engine should allow mixed-level systems.

Not every director must be at the same level.

Example:

- Website C
- Marketing B
- Scheduling A
- Call Handling B

This is important because custom fit is one of the strongest advantages of AI-ABCX.

---

## Full-System Recommendation Logic

The engine should also detect when a business is a legitimate full-system candidate.

Strong full-system indicators:

- owner wants broad business improvement
- multiple weak areas exist
- bigger team or bigger growth plan exists
- visibility is poor across several lanes
- automation readiness is high

When triggered:

- advanced configuration may become a full or near-full system recommendation

---

## Layer 6. Summary And Projection Logic

After building the configurations, the engine should generate explanation content.

This content should not be generic.

It should be driven by the actual answer pattern.

---

## Business Summary Components

The engine should write:

## 1. Current-State Summary

How the business appears to operate today.

## 2. Key Pressure Points

What seems to be limiting growth or control.

## 3. Configuration Reasoning

Why this set of directors was selected.

## 4. Expected Improvement Direction

What this setup is intended to improve first.

---

## Projection Components

The engine should generate a professional projection note for:

- 1 month
- 6 months
- 1 year

This should be directional, not guaranteed.

Examples of projected areas:

- faster lead response
- cleaner quote flow
- better appointment control
- stronger visibility
- higher conversion opportunity
- improved repeat-business system

---

## Recommendation Strength Labels

Each director or configuration can carry one of these labels internally:

- optional
- useful
- recommended
- strongly recommended
- required

These labels help explain the setup to the customer.

---

## Recommendation Priority Rules

When too many directors score strongly, the engine should still prioritize clarity.

Priority order should generally be:

1. Fix broken front-door workflow
2. Fix conversion leaks
3. Fix operational coordination
4. Fix retention and repeat growth
5. Add visibility and control depth

This prevents the system from overwhelming the customer too early.

---

## Director Groupings For Recommendation

The engine should think in grouped lanes, not just isolated directors.

Recommended grouping model:

- Demand lane
  - Website
  - SEO
  - Advertising
  - Lead Generation
  - Marketing

- Intake lane
  - Call Handling
  - Estimator
  - Scheduling

- Conversion lane
  - Sales
  - Follow-Up

- Operations lane
  - Dispatch
  - Service

- Retention lane
  - Customer Success
  - Reviews & Referrals
  - Reactivation
  - Retention

- Governance lane
  - Executive Reporting
  - Accountability
  - Strategy

- Finance lane
  - Revenue Control
  - Reconciliation
  - Accounting
  - Payroll

- Control lane
  - Compliance
  - Approval
  - Risk

This grouping model will help the engine explain configurations more clearly.

---

## Weak Setup Detection

The engine should detect when the owner asks for something that is technically allowed but commercially weak.

Examples:

- Scheduling without meaningful intake source
- Sales without quote flow
- Advertising without conversion destination
- Reviews without enough completed jobs

Action:

- still allow when valid
- explain limitation
- show improved configuration

---

## Blocked Setup Detection

If the owner asks for something invalid, the engine must:

- explain why
- show the missing requirement
- propose the smallest valid path

This should feel like expert guidance, not software rejection.

---

## Scoring Transparency Rule

The raw scoring system should stay internal.

Customers should see:

- why a director is included
- what business problem it solves

They should not see:

- abstract score math

---

## Recommendation Consistency Rule

The same answer pattern should produce the same recommendation logic every time unless pricing or dependency rules change.

This is important for:

- trust
- testing
- future automation

---

## Practical Conclusion

The recommendation engine is what turns AI-ABCX from a set of modules into a true guided business system.

If this logic is strong, then:

- Step 1 feels intelligent
- pricing feels justified
- configurations feel custom
- upsells feel logical
- the whole system feels trustworthy

That makes this engine one of the most important planning layers in the entire project.
