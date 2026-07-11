# AI-ABCX Performance Intelligence Activation Study Specification

This document defines how the `Performance Intelligence Module` should appear during activation.

It covers:

- the exact Step 1 study questions
- the A-level study formula
- the Step 2 study summary output
- the commercial and UX rules for presenting the result

---

## 1. Activation Role

During activation, the Performance Intelligence Module should generate the first:

`Corporate Growth Investment Study`

Its job is to help the future President understand:

- where the business may be losing opportunity
- what likely investment is needed to improve results
- what outcome range may justify that investment
- why the recommended AI-ABCX system makes business sense

This study should support conversion, but it must remain credible.

---

## 2. Main Rule

The activation study must:

- feel company-specific
- feel corporate and structured
- use conservative assumptions
- use ranges, not guarantees
- justify the recommended system

It must not:

- look like a hype calculator
- promise exact future revenue
- imply guaranteed profit
- overwhelm the user with too many questions

---

## 3. Recommended Step 1 Placement

The study questions should appear late in Step 1, after:

- business identity
- operating structure
- staffing and dashboard roles

Recommended sequence:

1. structure discovery
2. staffing and dashboard-role discovery
3. performance-intelligence study inputs
4. Step 1 summary

This order matters because the study should use the business structure already discovered.

---

## 4. Exact Step 1 Study Questions

These questions should be short, practical, and easy to answer approximately.

The user does not need exact audited numbers.

### 4.1 Weekly inbound demand

Question:

`About how many inbound calls or leads does your business get in a typical week?`

Input type:

- numeric

Used for:

- demand baseline
- opportunity volume calculation

### 4.2 Missed or delayed opportunity share

Question:

`About what share of calls or leads are missed, delayed, or not followed up properly?`

Input type:

- range choice

Recommended choices:

- `Very low (0-5%)`
- `Low (6-10%)`
- `Moderate (11-20%)`
- `High (21-35%)`
- `Very high (36%+)`

Used for:

- missed-opportunity estimate

### 4.3 After-hours demand impact

Question:

`Do you believe you lose meaningful opportunities after business hours?`

Input type:

- choice

Recommended choices:

- `No or almost none`
- `Some`
- `A lot`

Used for:

- after-hours opportunity adjustment

### 4.4 Follow-up speed

Question:

`How quickly are new leads usually followed up?`

Input type:

- choice

Recommended choices:

- `Within 15 minutes`
- `Same hour`
- `Same day`
- `Next day or later`
- `Inconsistent`

Used for:

- follow-up leakage adjustment

### 4.5 Old lead or customer backlog

Question:

`Do you have old leads, old estimates, or old customers that are not being consistently reactivated?`

Input type:

- choice

Recommended choices:

- `No meaningful backlog`
- `Small backlog`
- `Moderate backlog`
- `Large backlog`

Used for:

- reactivation opportunity estimate

### 4.6 Average job or client value

Question:

`What is the average value of a sold job, booked service, or new client for your business?`

Input type:

- numeric

Used for:

- revenue-per-win estimate

### 4.7 Approximate conversion confidence

Question:

`If a real opportunity is handled correctly, how often does it usually turn into booked work or a paying client?`

Input type:

- range choice

Recommended choices:

- `Low (10-20%)`
- `Moderate (21-35%)`
- `Strong (36-50%)`
- `Very strong (51%+)`

Used for:

- recoverable opportunity conversion estimate

### 4.8 Capacity consistency

Question:

`Is your team usually fully booked, underbooked, or inconsistent?`

Input type:

- choice

Recommended choices:

- `Usually fully booked`
- `Sometimes underbooked`
- `Often underbooked`
- `Inconsistent / hard to predict`

Used for:

- underused-capacity signal
- optimization recommendation

### 4.9 Source-to-sale visibility

Question:

`Do you clearly track where leads come from and which sources actually produce revenue?`

Input type:

- choice

Recommended choices:

- `Yes, clearly`
- `Partially`
- `No, not really`

Used for:

- marketing and CRM visibility signal

### 4.10 Optional current monthly marketing spend

Question:

`If you actively market the business, about how much do you spend per month?`

Input type:

- numeric optional

Used for:

- marketing waste visibility
- investment framing

---

## 5. A-Level Study Output

Performance Intelligence A should produce:

- monthly opportunity-loss estimate range
- monthly recoverable-opportunity range
- likely required AI-ABCX system investment
- top 3 business-performance leaks
- suggested starting modules
- conservative profit-impact range

This is enough to be valuable without becoming overly complex.

---

## 6. A-Level Formula Model

The A-level study should use simple conservative logic.

### 6.1 Normalize inputs

Convert inputs into conservative numeric assumptions:

- missed/delayed share
- after-hours loss adjustment
- follow-up-loss adjustment
- backlog multiplier
- conversion-rate midpoint
- capacity adjustment
- source-visibility adjustment

### 6.2 Monthly baseline demand

Formula:

`weekly inbound volume * 4.33`

### 6.3 Base missed-opportunity estimate

Formula:

`monthly baseline demand * missed-or-delayed share`

### 6.4 Adjusted recoverable opportunity count

Start with:

`base missed opportunity`

Then add conservative adjustments for:

- after-hours loss
- follow-up delay
- reactivation backlog
- underused capacity

Each adjustment should be capped to avoid inflated totals.

### 6.5 Recoverable revenue range

Formula foundation:

`recoverable opportunity count * average value * conversion rate`

Then produce:

- conservative case
- moderate case

No aggressive case should be shown in activation unless explicitly needed later.

### 6.6 Required system investment

At A level, the study should use the configured Step 2 system total as the main monthly system investment.

Optional additions may include:

- estimated call usage spend
- optional marketing spend

But the first version should stay centered on:

`configured AI-ABCX monthly system investment`

### 6.7 Profit-impact range

Formula:

`recoverable revenue range - estimated monthly investment`

Output should remain a range.

---

## 7. Conservative Assumption Rules

To stay credible:

- cap reactivation uplift
- cap after-hours uplift
- cap underused-capacity uplift
- never assume 100% recovery
- never assume best-case conversion by default
- prefer underestimating over overestimating

This is critical for trust.

---

## 8. Leak Categories

The study should classify the top revenue or profit leaks into categories such as:

- missed-call loss
- after-hours loss
- slow follow-up loss
- scheduling-friction loss
- unused backlog loss
- underused capacity
- weak source visibility
- poor closeout visibility

Only the top 2 or 3 should be shown prominently in Step 2.

---

## 9. Step 2 Presentation

Step 2 should include a compact:

`Business Opportunity Estimate`

It should appear near the itemized system pricing.

### Step 2 should show

- estimated monthly opportunity-loss range
- estimated recoverable revenue range
- estimated monthly AI-ABCX investment
- estimated profit-impact range
- top 3 leakage areas
- recommended starting modules

### Step 2 should not show

- dense formulas
- too many raw assumptions
- large financial tables

The point is to justify the recommendation clearly, not overwhelm the user.

---

## 10. Step 2 Suggested Structure

Recommended order:

1. prepared company summary
2. business opportunity estimate
3. itemized AI-ABCX system and price
4. path and launch terms
5. policy confirmation

This sequence creates:

`here is where you may be losing money`

then:

`here is the system we prepared to improve it`

---

## 11. Recommended Step 2 Messaging

Preferred tone:

- structured
- executive
- conservative
- consultative

Example language:

- `Estimated opportunity leakage`
- `Recoverable opportunity range`
- `Estimated monthly system investment`
- `Estimated profit-impact range`
- `Highest-impact structural weaknesses`
- `Recommended starting AI-ABCX configuration`

Avoid:

- `guaranteed ROI`
- `guaranteed profit`
- `easy money`
- `instant growth`

---

## 12. Monthly Operating Version

After activation, the monthly version of the study should evolve from assumptions to real business truth.

The monthly version should replace estimated assumptions with:

- real call volume
- real missed-call behavior
- real follow-up timing
- real close rate
- real average ticket value
- real module usage
- real staffing load
- real source performance

This makes the activation study the starting point of an ongoing monthly intelligence system.

---

## 13. Relationship To Step 2 Pricing

The study should not replace pricing.

It should explain pricing.

That means:

- the study justifies the recommended system
- the itemized system shows what the client is buying
- the pricing shows the required monthly investment

Together, they create a stronger business decision.

---

## 14. Build Priority

Recommended build sequence:

1. add the study questions to Step 1
2. implement the conservative A-level study formula
3. add the Step 2 Business Opportunity Estimate panel
4. pass the study result into the monthly Performance Intelligence workflow later

---

## 15. Main Definition

The activation version of the Performance Intelligence Module should be defined as:

`a conservative, company-specific Corporate Growth Investment Study that estimates where the business may be losing opportunity, what investment is needed to improve results, and what AI-ABCX starting system is most justified.`

