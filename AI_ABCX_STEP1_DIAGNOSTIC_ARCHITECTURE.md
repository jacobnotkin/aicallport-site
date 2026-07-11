# AI-ABCX Step 1 Diagnostic Architecture

## Purpose

This document defines how Step 1 of guided activation should work.

Step 1 is not just a form.

It is the business diagnostic engine that collects enough human-readable information to:

- understand the company’s current state
- understand the owner’s goals
- detect current limitations
- determine which directors are needed
- determine which combinations are valid
- determine which levels A, B, and C make sense
- generate three recommended configurations
- generate a short business summary and feasibility-style recommendation

---

## Core Principle

Step 1 should feel easy for the owner, even though it is doing deep qualification underneath.

The user experience should feel:

- clear
- human
- non-technical
- guided
- respectful

The system should feel like:

- a business doctor
- not a software questionnaire

---

## What Step 1 Must Produce

By the end of Step 1, the system should know enough to generate:

## 1. Current Business State Summary

A short article-like explanation of how the business operates today.

## 2. Main Pain Points

What is slowing the business down now.

## 3. Growth Intent

Whether the owner wants:

- stability
- better organization
- more leads
- more automation
- more sales
- more control
- expansion

## 4. Operational Readiness

How advanced the business is today.

## 5. Recommended Configuration Set

- Intent Fit
- Improved
- Advanced

## 6. Price Logic Inputs

- active directors
- levels
- bundle opportunities
- usage assumptions
- user quantity assumptions

---

## Step 1 Experience Rule

Every question should be understandable without technical knowledge.

Do not ask:

- “Do you need CRM orchestration?”

Ask:

- “How do you keep track of customers, jobs, and follow-ups today?”

This rule should apply everywhere.

---

## Answer Style Rules

Step 1 should use mostly:

- multiple choice
- multi-select
- conditional follow-up questions
- small text fields only when necessary

Avoid:

- large open-ended text areas too early
- technical wording
- complicated business jargon

---

## Multi-Select Rule

Many business realities cannot be captured with one answer only.

So Step 1 must allow multi-select where it makes sense, especially for:

- goals
- lead sources
- services
- pain points
- current tools
- customer communication methods
- business problems

---

## Branching Rule

Some answers should unlock more questions.

Some answers should skip irrelevant questions.

This is critical because Step 1 should feel custom, not generic.

Examples:

- if they do not take appointments, reduce scheduling depth
- if they already have a website, ask website evaluation questions
- if they do not use marketing, ask different readiness questions
- if they have field technicians, open service and dispatch questions
- if they want expansion, open automation and scale questions

---

## Diagnostic Sections

Step 1 should be organized into clear sections.

Recommended structure:

1. Company Identity
2. Business Goals
3. Current Business Structure
4. Lead And Demand Sources
5. Sales / Quote Workflow
6. Call Handling
7. Scheduling / Dispatch / Service Flow
8. Website / Marketing / Advertising
9. Customer Follow-Up / Retention
10. Financial / Operational Scale
11. Team / Users / Roles
12. Growth Intent And Readiness

---

## Section 1. Company Identity

Purpose:

- understand who they are
- establish business category
- support industry-specific logic

Questions should include:

- business name
- business type / category
- primary industry
- country
- state / region
- city / service area
- how long the business has been operating
- one-person business / small team / larger team

Possible multi-select:

- service categories if they do more than one type of work

---

## Section 2. Business Goals

Purpose:

- understand what they actually want to improve
- detect owner intent

This section is very important.

Questions should include:

- What do you most want to improve right now?
- What feels hardest to manage today?
- What result would make this system feel successful for you?

Suggested answer options:

- get more leads
- answer calls better
- book more jobs
- send quotes faster
- close more sales
- organize operations
- reduce missed follow-up
- improve customer communication
- improve online presence
- increase repeat business
- expand the team
- automate more of the business
- gain more control and visibility

Multi-select:

- yes, strongly required

Branching:

- expansion goals unlock deeper automation and scale questions

---

## Section 3. Current Business Structure

Purpose:

- understand how the business really operates today
- understand current management reality

Questions should include:

- How many people work in the business?
- What do they actually do?
- Who answers phones?
- Who schedules appointments?
- Who sends estimates?
- Who follows up?
- Who manages marketing?
- Who tracks completed work and payments?

Important:

This section should be role-based, not title-based.

We need to see the business as the owner sees it.

---

## Section 4. Lead And Demand Sources

Purpose:

- understand where opportunities come from
- shape marketing, website, lead generation, follow-up, and call handling recommendations

Questions should include:

- Where do most of your new customers come from today?

Multi-select answers:

- phone calls
- website forms
- Google search
- Google Maps
- social media
- referrals
- repeat customers
- paid ads
- walk-ins
- third-party platforms
- email inquiries
- text messages

Follow-up questions:

- Which source brings the best customers?
- Which source brings the most volume?
- Which source needs improvement?

---

## Section 5. Sales / Quote Workflow

Purpose:

- determine need for Estimator, Sales, Follow-Up, and related directors

Questions should include:

- Do you send quotes or estimates?
- How do you create them today?
- How quickly do you usually send them?
- What happens after a quote is sent?
- Do customers choose between options or packages?
- Do you follow up on unaccepted quotes?
- What gets in the way of closing more jobs?

Possible answers:

- no formal quote process
- simple manual quotes
- standard estimates
- package estimates
- option-based estimates
- mostly phone pricing
- slow turnaround
- inconsistent follow-up

Branching:

- businesses that do not quote much may need lighter estimator logic
- heavy estimate-driven companies open advanced estimator questions

---

## Section 6. Call Handling

Purpose:

- determine need and level for Call Handling Director

Questions should include:

- How are incoming calls handled today?
- What happens after hours?
- Are missed calls a problem?
- Do callers usually need information, estimates, booking, or support?
- Do calls need multilingual handling?
- Do calls need urgency handling?

Multi-select answers:

- answer questions
- qualify leads
- book appointments
- route urgent calls
- take messages
- filter spam
- support existing customers
- after-hours coverage
- multilingual support

Branching:

- booking-heavy companies should open scheduling dependency logic

---

## Section 7. Scheduling / Dispatch / Service Flow

Purpose:

- determine the operational coordination layer

Questions should include:

- Do you book appointments?
- Do you assign field workers or technicians?
- Do you route jobs?
- Do you reschedule often?
- Do you need service workflow visibility after the appointment is booked?

Questions about current state:

- manual calendar only
- office-managed scheduling
- field-team coordination
- route planning
- multiple technicians
- recurring jobs
- emergency jobs

Branching:

- no field team means dispatch/service questions stay lighter
- multi-tech companies unlock stronger dispatch/service logic

---

## Section 8. Website / Marketing / Advertising

Purpose:

- determine Website, Marketing, Advertising, SEO, and Lead Generation needs

Questions should include:

- Do you currently have a website?
- What is your website URL?
- Do you think your website is helping your business enough?
- Do you want more leads from online traffic?
- Are you running ads now?
- Do you want stronger marketing or advertising?

If website exists, ask:

- is it mobile-friendly?
- does it clearly explain services?
- does it collect leads well?
- does it support the type of growth you want?

If website does not exist:

- do you want AI-ABCX to create one?

Also ask:

- logo available?
- brand color preference?
- preferred website visual style?

---

## Section 9. Customer Follow-Up / Retention

Purpose:

- determine Follow-Up, Customer Success, Reviews & Referrals, Reactivation, Retention

Questions should include:

- Do you follow up on unclosed leads?
- Do you ask for reviews?
- Do you stay in touch with past customers?
- Do you want more repeat business?
- Do you want better post-job visibility?

Possible answers:

- we rarely follow up
- follow-up is manual
- we ask for reviews inconsistently
- we have old customers we never reactivate
- we want better repeat business

---

## Section 10. Financial / Operational Scale

Purpose:

- understand size, seriousness, volume, and business economics

Questions should include:

- How many jobs did you complete last month?
- What is your average job value?
- Do you offer more than one service type?
- Which services are most in demand?
- Are you trying to increase volume, increase average ticket, or improve margins?

Important:

This section helps determine whether a business is a partial-system fit or a full-system fit.

---

## Section 11. Team / Users / Roles

Purpose:

- understand user quantity
- shape dashboard needs
- support pricing logic

Questions should include:

- How many people would need access to parts of the system?
- Who should see what?
- Do sales people need visibility?
- Do service people need visibility?
- Does office staff need visibility?
- Do you need owner-only control over some parts?

This section should later support:

- dashboard count logic
- permissions logic
- pricing by business scale

---

## Section 12. Growth Intent And Readiness

Purpose:

- determine whether to recommend partial, improved, or advanced/full configurations

Questions should include:

- Are you trying to keep the business stable, or grow it?
- Do you want to add more staff in the future?
- Do you want stronger automation?
- Are you ready to change how the business runs if the outcome is better?

Suggested answer ranges:

- just need one specific improvement
- want better organization
- want moderate growth
- want stronger automation
- want to scale aggressively

This section is where intent becomes a major recommendation driver.

---

## Website-Specific Additional Questions

If website creation or website replacement is needed, ask:

- do you have a logo?
- if not, should AI-ABCX generate one?
- do you have photos?
- if not, should AI-ABCX generate starter visuals?
- do you have existing service descriptions?
- if not, should AI-ABCX generate starter content?
- which visual direction do you prefer?

Suggested style options:

- dark / premium
- light / clean
- blue / corporate
- warm / local service
- modern / minimal
- bold / high-contrast

---

## Human Language Rule

The system should ask questions in human business language.

Good examples:

- What is slowing your business down most right now?
- How do jobs usually come into your company?
- What happens after a customer calls?
- Who usually follows up if a customer does not decide right away?

Avoid:

- Which CRM stage orchestration gaps are most painful?

---

## Question Complexity Rule

Questions should move from simple to deeper.

Order:

1. Easy identity questions
2. Goal questions
3. Workflow questions
4. Readiness questions
5. Detail questions only if needed

The owner should feel like they are being understood, not interrogated.

---

## Output Logic

Step 1 should turn answers into three outputs.

## Output 1. Intent Fit Configuration

Reflects what the owner clearly wants now.

## Output 2. Improved Configuration

Fixes missing pieces and obvious business blind spots.

## Output 3. Advanced Configuration

Shows the stronger growth or automation path.

Each output should include:

- included directors
- levels
- brief explanation
- pricing summary
- projected business effect

---

## Business State Summary

After Step 1, AI-ABCX should generate a short business summary written like a professional visibility note.

It should describe:

- how the business operates today
- where it is strong
- where it is leaking opportunity
- what the owner says they want
- what type of AI-ABCX structure fits best

This should feel like:

- a short article
- not a machine report

---

## Feasibility / Outcome Summary

The system should also create a short projection note.

It should explain:

- what the recommended system is meant to improve
- what may improve in 1 month
- what may improve in 6 months
- what may improve in 1 year

This should be presented as a professional forecast, not a guarantee.

---

## Dynamic Recommendation Logic

The user should be able to:

- add more directors
- remove some allowed directors
- switch levels

Every change should update:

- the configuration
- the pricing
- the business explanation
- the projected outcome

This is one of the strongest upsell tools in the entire system.

---

## Blocked Combination Rule

If a chosen combination is invalid, Step 1 should not just reject it silently.

It should explain:

- why it is weak or broken
- what companion director is missing
- what stronger valid version is recommended

This should feel consultative, not restrictive.

---

## Dashboard And User Implication

Step 1 should collect enough information to later determine:

- how many users are needed
- who needs which dashboard views
- whether only the owner needs visibility
- whether staff-facing views are required

This should become part of pricing and activation design later.

---

## Recommended UX Pattern

Best Step 1 style:

- one guided screen flow
- grouped sections
- short explanations under each question
- multi-select chips and cards
- conditional follow-up panels
- progress indicator
- ability to save and continue

This should feel closer to a guided strategy intake than to a generic signup form.

---

## Technical Interpretation Layer

Behind the scenes, every human answer should feed:

- director need scoring
- dependency validation
- level recommendation logic
- business maturity scoring
- growth intent scoring

But none of that should be visible as technical mechanics to the user.

---

## What Step 1 Must Never Feel Like

It must not feel like:

- a SaaS onboarding checklist
- a hard sales funnel
- a technical implementation form
- a CRM setup wizard

It must feel like:

- free company analysis
- custom system diagnosis
- guided business evaluation

---

## Practical Conclusion

Step 1 is where AI-ABCX proves it is not selling random software modules.

It proves:

- the business is being deeply understood
- the configuration is actually custom
- the price is built around real need
- the owner is being guided, not pushed

If Step 1 is done correctly, everything after it becomes easier:

- recommendations
- pricing
- activation
- upgrades
- trust

That makes Step 1 one of the most important systems in the entire launch.
