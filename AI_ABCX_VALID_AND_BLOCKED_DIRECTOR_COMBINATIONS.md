# AI-ABCX Valid And Blocked Director Combinations

## Purpose

This document turns the dependency matrix into practical commercial rules.

It defines:

- what can be sold alone
- what can be sold together
- what should be discouraged
- what must be blocked
- what should trigger an automatic recommendation for a stronger setup

This is the document that Step 1 diagnostic logic, pricing logic, guided activation, and upsell logic should all follow.

---

## Core Principle

AI-ABCX should never approve a configuration that looks sellable on paper but cannot operate correctly in real business workflow.

That means every offered configuration must be one of these:

1. A true standalone operating function
2. A valid partial system with enough inputs and outputs to work
3. A full connected system

If a requested configuration is technically possible but commercially weak, the system should still allow it only when it does not break workflow and should clearly recommend the stronger version.

If a requested configuration would break workflow, create blind spots, or produce false expectations, it must be blocked.

---

## Combination Classes

### 1. Strong Standalone Combinations

These can be sold as true entry products.

- Estimator Director
- Call Handling Director
- Website Director
- Follow-Up Director
- Scheduling Director
- Marketing Director

### 2. Conditional Standalone Combinations

These can be sold alone only when the customer already has enough outside infrastructure.

- Sales Director
- Reactivation Director
- SEO Director
- Advertising Director
- Customer Success Director
- Support Director
- Reviews & Referrals Director

### 3. Dependent Combinations

These should not be sold as isolated products because they rely on upstream inputs or downstream workflow context.

- Dispatch Director
- Lead Generation Director
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

## Valid Standalone Offers

## Estimator Director

Valid alone:

- Estimator A
- Estimator B
- Estimator C

Why valid:

- quote demand can come from website, ads, phone, office staff, or manual entry
- the estimator function can still produce visible value without the rest of the system

Recommended upgrades:

- Follow-Up
- Sales
- Website
- Call Handling

---

## Call Handling Director

Valid alone:

- Call Handling A
- Call Handling B
- Call Handling C

Why valid:

- inbound phone volume can be handled without requiring other modules
- the function can answer, qualify, capture intent, and route information independently

Recommended upgrades:

- Scheduling
- Follow-Up
- Estimator
- Website

---

## Website Director

Valid alone:

- Website A with current website
- Website A with AI-ABCX site
- Website B with AI-ABCX site
- Website C with AI-ABCX site
- Website B or C with external site only if the existing site passes infrastructure requirements

Why valid:

- website creation, optimization, monitoring, forms, and routing can be sold as a clear standalone offer

Recommended upgrades:

- Marketing
- Lead Generation
- Follow-Up
- Estimator
- Call Handling

---

## Follow-Up Director

Valid alone:

- Follow-Up A
- Follow-Up B
- Follow-Up C

Why valid:

- many companies already have leads and jobs but fail on follow-up discipline
- follow-up can operate on manually imported or externally created records

Recommended upgrades:

- Estimator
- Sales
- Call Handling
- Customer Success

---

## Scheduling Director

Valid alone:

- Scheduling A
- Scheduling B
- Scheduling C

Why valid:

- some businesses only want booking control
- manual or semi-automated booking can be valuable even without full AI-ABCX adoption

Important condition:

- standalone scheduling assumes appointments still come from outside sources or manual entry

Recommended upgrades:

- Call Handling
- Dispatch
- Service
- Follow-Up

---

## Marketing Director

Valid alone:

- Marketing A
- Marketing B
- Marketing C

Why valid:

- customers may only want visibility, campaigns, and growth coordination at first

Important condition:

- higher marketing levels become stronger when website, lead generation, follow-up, and call handling are connected

Recommended upgrades:

- Website
- Lead Generation
- Follow-Up
- Reviews & Referrals

---

## Conditionally Valid Standalone Offers

These can be approved only after qualification confirms enough outside structure.

## Sales Director

Valid alone only if:

- the company already receives qualified opportunities
- someone already creates leads or quote opportunities
- there is a real selling motion to manage

Weak alone if:

- no lead flow exists
- no quoting process exists

Recommended upgrades:

- Estimator
- Follow-Up
- Lead Generation
- Marketing

---

## Reactivation Director

Valid alone only if:

- the company has a meaningful old customer database
- prior leads or customers are available for reactivation campaigns

Weak alone if:

- there is no database worth reactivating

Recommended upgrades:

- Follow-Up
- Reviews & Referrals
- Marketing

---

## SEO Director

Valid alone only if:

- there is a real website to optimize
- the business wants search visibility without broader campaign management yet

Weak alone if:

- site is poor or missing

Recommended upgrades:

- Website
- Lead Generation
- Marketing

---

## Advertising Director

Valid alone only if:

- there is a conversion destination
- intake path is clear
- website or landing path exists

Weak alone if:

- no website
- no call handling
- no follow-up

Recommended upgrades:

- Website
- Lead Generation
- Call Handling
- Follow-Up

---

## Customer Success Director

Valid alone only if:

- there is enough active customer volume to justify service-quality workflow

Recommended upgrades:

- Support
- Reviews & Referrals
- Retention

---

## Support Director

Valid alone only if:

- the business has enough inbound service or question volume

Recommended upgrades:

- Customer Success
- Call Handling

---

## Reviews & Referrals Director

Valid alone only if:

- enough completed jobs already exist

Recommended upgrades:

- Customer Success
- Follow-Up
- Reactivation

---

## Valid Multi-Director Entry Bundles

These are strong commercial bundles that should be recommended often.

## Quote Growth Entry

- Estimator
- Follow-Up

Best for:

- companies losing quote opportunities after the first contact

---

## Call-To-Appointment Entry

- Call Handling
- Scheduling

Best for:

- office-driven service businesses
- appointment-driven businesses

---

## Website Growth Entry

- Website
- Marketing

Best for:

- businesses with weak online presence

---

## Lead Conversion Entry

- Website
- Lead Generation
- Follow-Up

Best for:

- companies that need more leads and better conversion

---

## Sales Conversion Entry

- Estimator
- Sales
- Follow-Up

Best for:

- businesses with quote flow but poor close rate

---

## Service Operations Entry

- Scheduling
- Dispatch
- Service

Best for:

- field service companies with technician coordination needs

Important note:

- this is valid only when appointments or work orders already exist from outside or from other AI-ABCX modules

---

## Retention Entry

- Customer Success
- Reviews & Referrals
- Reactivation

Best for:

- businesses with enough completed-job history and repeat potential

---

## Governance Entry

- Executive Reporting
- Accountability
- Strategy

Best for:

- larger operators who already have active functional lanes and want stronger executive control

---

## Finance Visibility Entry

- Revenue Control
- Reconciliation
- Accounting

Best for:

- companies that need cleaner revenue truth and financial visibility

---

## Full System Bundles

These should be available whenever business intent, size, or growth ambition justifies them.

## Full System A

Use when:

- business wants structure first
- operations are still basic
- owner needs visibility and process order more than deep automation

Typical mix:

- core active directors across demand, intake, scheduling, service, follow-up, reporting, and control

---

## Full System B

Use when:

- business wants connected automation
- team size is growing
- owner wants stronger cross-lane coordination

Typical mix:

- all major active directors with B-level workflow automation where dependencies allow

---

## Full System C

Use when:

- business is growth-oriented
- owner wants scale, visibility, high automation, and deeper management discipline
- there is enough workflow volume to justify advanced configuration

Typical mix:

- all major directors at C where commercially and operationally justified

Important note:

- full C should not be offered only because the company is large
- it should be offered because the company has both operational complexity and intent to scale or automate more deeply

---

## Weak But Allowed Combinations

These can be approved, but the system should clearly warn that they are partial and recommend a better version.

- Scheduling alone without Call Handling
- Sales alone without Estimator or lead source
- Marketing alone without Website
- SEO alone on weak website
- Advertising alone without destination and follow-up
- Follow-Up alone with poor or inconsistent record creation
- Reviews & Referrals alone with low completed-job volume

System action:

- allow if technically functional
- label as limited setup
- show better recommended bundle

---

## Blocked Combinations

These should not be allowed because they create broken workflow or false promises.

## Dispatch without Scheduling

Blocked because:

- dispatch needs appointments, work assignments, routes, or scheduled records to manage

---

## Service without Scheduling or Dispatch context

Blocked because:

- service coordination without job flow or scheduling truth creates disconnected execution tracking

---

## Lead Generation without conversion destination

Blocked because:

- lead generation needs somewhere to send demand
- at minimum, website, call path, or follow-up route must exist

---

## Advertising without intake path

Blocked because:

- sending traffic without intake infrastructure wastes spend

Minimum required companion:

- Website or Call Handling

Recommended:

- plus Follow-Up

---

## Payroll without financial control structure

Blocked because:

- payroll should not run as an isolated module disconnected from business truth

Minimum required companion:

- Accounting and Reconciliation

---

## Strategy without reporting visibility

Blocked because:

- strategy without reporting becomes empty advisory language

Minimum required companion:

- Executive Reporting

---

## Accountability without reporting

Blocked because:

- accountability scoring needs measurable inputs

Minimum required companion:

- Executive Reporting

---

## Risk or Compliance without governance context

Blocked because:

- these are control modules, not isolated front-line tools

Minimum required companion:

- Executive Reporting
- Approval
- or broader CAO lane configuration

---

## Level-Based Combination Rules

## A-Level Rule

Allow:

- broad flexibility
- simpler standalone entry paths
- manual truth collection where needed

Do not require:

- full downstream automation

---

## B-Level Rule

Require:

- stronger data continuity
- cleaner upstream inputs
- more structured downstream handling

Examples:

- Marketing B should usually push toward Website B and Follow-Up B
- Scheduling B should usually push toward Dispatch B if field service complexity exists
- Website B should meet stronger integration rules

---

## C-Level Rule

Require:

- deep integration
- dependable data flow
- higher-quality infrastructure
- stronger workflow continuity

Examples:

- Website C may require AI-ABCX-controlled site or externally verified C-ready infrastructure
- Marketing C should usually not exist without strong website and follow-up path
- Call Handling C should usually connect to scheduling, follow-up, or estimator where relevant
- Governance C should not exist without active operating data lanes

---

## Automatic Upgrade Logic

When a customer requests a weak or limited setup, the system should recommend the smallest stronger valid upgrade.

Examples:

- If customer selects Advertising only:
  recommend Website + Follow-Up

- If customer selects Dispatch only:
  require Scheduling, then recommend Service

- If customer selects Sales only:
  recommend Estimator + Follow-Up

- If customer selects Marketing only at C:
  recommend Website C + Follow-Up + Lead Generation

- If customer selects Scheduling only for field service with multiple technicians:
  recommend Dispatch

- If customer selects Website A but wants advanced marketing automation:
  recommend Website B or C

---

## Step 1 Diagnostic Logic Rules

Step 1 should use this combinations document in four ways:

1. Detect valid standalone entry path
2. Detect missing companion functions
3. Block broken requests
4. Generate stronger recommended alternatives

The user should never only see:

- what they asked for

They should also see:

- what works better
- what they are missing
- what becomes possible if they add one more director

---

## Three Recommendation Outputs

The diagnostic should eventually produce:

## 1. Intent Fit Configuration

The closest match to what the owner says they want right now.

## 2. Improved Configuration

A stronger version that fixes the most obvious blind spots.

## 3. Advanced Configuration

A more connected or higher-level setup for scale, automation, and growth.

This recommendation model only works if all three outputs obey the valid and blocked combination rules in this document.

---

## Pricing Architecture Implication

Pricing should be built on valid product shapes, not on isolated abstract directors.

That means:

- strong standalone directors get clean entry pricing
- weak standalone directors get warning language and upgrade logic
- blocked combinations never get priced as valid offers
- bundles should price better than disconnected add-ons
- full system options should always remain available when justified by size, complexity, or growth intent

---

## Practical Conclusion

AI-ABCX should be flexible, but not chaotic.

Customers should feel:

- freedom to start where they are
- confidence that the system knows what combinations really work
- visibility into stronger future configurations

That is the commercial advantage:

not just letting customers pick random tools, but guiding them into valid operating systems that actually function in the real business.
