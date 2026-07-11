# AI-ABCX Website Director Product Spec

This document defines the implementation-grade product specification for `Website Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Website Director is one of the first three launch-critical directors because it gives `AI-ABCX` a strong infrastructure-led entry path and controls one of the most important public surfaces through which demand enters the business.

---

## 1. Product Identity

### Public name

`Website Director`

### Executive owner

`CMO`

### Mission

Website Director analyzes whether a business already has a usable website path, decides whether AI-ABCX should connect to the current site or replace it with AI-ABCX infrastructure, and keeps website behavior compatible with lead capture, marketing, advertising, call handling, estimating, and future automation growth.

### Core promise

Website Director should not feel like a generic website builder.

It should promise:

- a website path that matches the real business
- infrastructure that supports growth instead of blocking it
- better lead capture readiness
- clearer marketing and advertising compatibility
- cleaner intake support
- stronger future automation compatibility
- President visibility into whether the website is helping or limiting the system

---

## 2. Strategic Role Inside AI-ABCX

Website Director is the public web infrastructure lane of the system.

It decides whether:

- the existing site is good enough
- the existing site can support only lower AI-ABCX levels
- a stronger AI-ABCX-hosted website is required for deeper integration

It is commercially important because:

- many businesses either have no website or a weak one
- some customers come only because they need a better website
- website quality directly affects leads, quotes, calls, scheduling, and advertising performance
- every website-based configuration needs Website Director in some form

Website Director can be:

- a standalone website-led entry director
- a required companion to marketing / advertising / call-handling / estimator paths
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `Wix`
- `Squarespace`
- `Webflow`
- `WordPress`
- `GoHighLevel Website Builder`
- `QuoteIQ AI Website Builder`

### What they do well

- business website creation
- mobile-friendly layouts
- service pages
- forms and contact capture
- publish-ready website output
- simple business-owner onboarding

### What AI-ABCX must match

- business-specific site creation
- mobile-ready output
- service and contact pages
- working lead / intake forms
- preview before activation
- owner-friendly setup flow

### Where AI-ABCX should beat them

- analyze an existing website before forcing a rebuild
- support both connector mode and hosted mode
- decide whether a customer can stay on current website at A level
- require stronger AI-ABCX website infrastructure when B/C logic needs it
- connect website directly to marketing, advertising, call handling, estimating, and lead capture
- generate site from guided activation answers
- offer logo generation, style direction selection, content generation, and fallback image generation
- if hosted by AI-ABCX, make website part of the operating system rather than a disconnected asset

---

## 4. Ideal Customer Fit

Website Director is a strong fit for:

- businesses with no website
- businesses with outdated or weak websites
- companies that want a new growth-ready website
- businesses that need lead capture compatible with AI-ABCX
- customers who want marketing or advertising but current site is too limited
- companies that want their website monitored and kept operationally compatible

It is especially strong for:

- small and medium service businesses
- owner-led companies
- local service providers
- call-heavy businesses
- quote-driven businesses
- businesses planning growth and automation

---

## 5. Required User Outcomes

Website Director must let a business owner say:

- “I understand whether my current website is good enough.”
- “I know why AI-ABCX recommends keeping my site or replacing it.”
- “If I need a new website, I can see it before I activate.”
- “If I keep my site, I know what AI-ABCX can and cannot support on it.”
- “My website is compatible with the directors I want to activate.”
- “I can upgrade later without confusion.”

---

## 6. Functional Scope

Website Director must cover seven major functions:

1. website existence and quality analysis
2. connector vs hosted decision logic
3. website generation or connection path
4. lead / intake infrastructure readiness
5. website monitoring and status visibility
6. level-based capability gating
7. cross-director compatibility control

---

## 7. Operating Modes

Website Director must support two operating modes.

### Mode 1. Connector Mode

Purpose:

- keep the customer’s existing website
- connect AI-ABCX functionality where possible
- monitor whether the site is sufficient for the selected AI-ABCX configuration

Required visibility:

- current website URL
- current website classification
- allowed AI-ABCX level on current site
- blockers and limitations
- recommendation for upgrade if needed

### Mode 2. Hosted Mode

Purpose:

- create and run an AI-ABCX-controlled website
- support lead capture, intake, marketing, and stronger automation compatibility
- preserve tighter control over structure and future upgrades

Required visibility:

- chosen style direction
- site structure
- preview state
- approval state
- activation / publish state
- hosted monitoring status

---

## 8. Website States and Classifications

Minimum required states:

- `no_website`
- `website_url_submitted`
- `analysis_pending`
- `missing`
- `weak`
- `acceptable`
- `strong`
- `connector_mode_recommended`
- `hosted_mode_recommended`
- `hosted_mode_required_for_upgrade`
- `preview_ready`
- `awaiting_approval`
- `active_connector`
- `active_hosted_site`
- `monitoring_only`
- `upgrade_blocked_by_current_site`

Each state must have:

- timestamp
- reasoning summary
- current recommendation
- next action
- President-visible summary where relevant

---

## 9. Website Quality Analysis

If a website URL is provided, Website Director should evaluate:

- mobile friendliness
- load quality / basic performance
- clear call to action
- visible phone number
- lead capture form presence
- booking or intake capability
- AI-ABCX connection readiness
- SEO basics
- trust / clarity / professionalism

### Classification outputs

- `missing`
- `weak`
- `acceptable`
- `strong`

### Recommendation outputs

- keep current site at current level
- keep current site with limitations
- hosted mode recommended
- hosted mode required for B/C path

---

## 10. Product Surfaces

Website Director needs visible product surfaces, not backend logic only.

### Surface 1. Website Analysis Result View

Purpose:

- show whether the business has no site, a weak site, or a usable site
- explain the recommendation clearly

Required sections:

- current URL
- website classification
- main strengths
- blockers / weaknesses
- recommended mode
- allowed AI-ABCX level path

### Surface 2. Connector vs Hosted Decision View

Purpose:

- show why AI-ABCX recommends connector mode or hosted mode

Required sections:

- mode name
- reason for recommendation
- what the business keeps
- what the business gains
- what limitations exist if current site stays

### Surface 3. Website Intake Form

Purpose:

- collect the information needed to create or configure the website path

Required inputs:

- business name
- website URL if present
- primary services
- service areas
- business phone
- business email
- logo upload
- style direction
- color preference
- content availability
- image availability

### Surface 4. Style Preview Surface

Purpose:

- let customer see visual direction before activation

Required style directions:

- `dark / premium`
- `light / clean`
- `blue / corporate`
- `warm / local service`
- `modern / minimal`
- `bold / high-contrast`

### Surface 5. Website Preview Surface

Purpose:

- show a generated or recommended website before activation

Required pages or sections:

- homepage
- services
- about
- contact
- intake / lead form

### Surface 6. Website Director Monitoring View

Purpose:

- show website readiness and operational status over time

Required visibility:

- mode
- current status
- classification
- lead / intake readiness
- upgrade limitations
- key website notes

### Surface 7. President Dashboard Visibility

Purpose:

- surface website readiness and blocking conditions

Required summary:

- website mode
- website health classification
- whether current website is limiting other directors
- whether hosted upgrade is recommended

---

## 11. Business Logic

Website Director must include the following logic at launch:

### Analysis logic

- detect presence or absence of website
- store submitted URL
- classify site quality
- produce recommendation summary

### Mode decision logic

- determine whether connector mode is allowed
- determine whether hosted mode is recommended
- determine whether hosted mode is required for certain levels

### Generation logic

- generate site structure from guided inputs
- use uploaded assets when available
- generate logo if missing
- generate generic copy if missing
- generate generic imagery if missing

### Compatibility logic

- determine whether Marketing Director can run on current site
- determine whether Advertising Director can run effectively
- determine whether Call Handling and Estimator intake can be supported
- determine whether B/C website path requires hosted mode

### Monitoring logic

- preserve website state visibly
- show if current website is blocking system growth
- preserve path for later upgrade

---

## 12. Dependencies

Website Director is special because every website-involving configuration should include it in some form.

### Can work standalone

Yes, as a website-led entry offer.

### Strong required or recommended connections

#### With Marketing Director

- website must support campaigns, traffic, messaging, and conversion

#### With Advertising Director

- ad traffic needs proper landing and capture infrastructure

#### With Call Handling Director

- phone and website should act as one intake layer

#### With Estimator Director

- web-based quote requests need proper intake infrastructure

#### With Lead Generation Director

- lead capture quality depends on website path quality

### Dependency rules

- every website-based configuration includes Website Director
- `A` may work on a strong existing website
- `B / C` may require hosted mode depending on infrastructure quality
- if current site cannot support required intake or conversion surfaces, hosted mode becomes required

---

## 13. A / B / C Definition

### Level A

Positioning:

- website connection and monitoring layer

Includes:

- website analysis
- connector or hosted recommendation
- basic compatibility visibility
- monitoring and status awareness
- simpler intake compatibility

Can work with:

- an acceptable or strong outside website

Best for:

- businesses that already have a usable site
- customers starting with lighter AI-ABCX configurations

### Level B

Positioning:

- connected professional website operating level

Includes:

- everything in A
- stronger lead and intake support
- stronger page structure control
- stronger compatibility with marketing / advertising / estimator workflows
- hosted mode where current site is insufficient

Best for:

- businesses wanting better conversion infrastructure
- customers activating multiple growth directors

### Level C

Positioning:

- highest readiness for deep AI-ABCX integration

Includes:

- everything in B
- strongest hosted path
- strongest compatibility with full lead, marketing, advertising, call, and estimator workflows
- richest future expansion path

Best for:

- businesses wanting a deeper connected system
- customers planning serious automation growth

---

## 14. Pricing Direction

Website Director pricing must distinguish between connector mode and hosted mode.

### Connector mode pricing logic

If customer keeps their own website, Website Director acts as:

- connection layer
- monitoring layer
- compatibility layer
- operational website control layer

This should be priced lower than hosted mode.

### Hosted mode pricing logic

If AI-ABCX creates and controls the website, Website Director should be priced higher because it includes:

- management function
- website infrastructure value
- ongoing compatibility control

### Working direction already discussed

Hosted mode concept:

- `A` = $29/mo
- `B` = $39/mo
- `C` = $49/mo

Connector mode concept:

- `A` = $10/mo
- `B` = $15/mo
- `C` = $20/mo

These numbers remain internal working logic until final public pricing is locked.

---

## 15. Diagnostic Recommendation Logic

Website Director should be recommended when any of the following are true:

- no website exists
- current website is weak
- lead capture is poor
- customer wants marketing or advertising support
- customer wants stronger quote or call integration
- current site blocks higher automation path
- company wants a more controlled future-ready web infrastructure

Recommendation strength should increase when:

- customer wants marketing / advertising
- customer wants website-led leads
- website quality is weak
- no working forms or clear CTAs exist
- owner wants a more professional digital surface

Recommendation strength should decrease when:

- customer has a genuinely strong website
- current infrastructure already supports the selected lower-level path
- website is not a significant operational bottleneck

---

## 16. Recommended Diagnostic Questions

Website Director should be informed by questions such as:

- Do you already have a website?
- What is your website address?
- Do you believe your current website helps your business grow?
- Do customers contact you through your website today?
- Do you want to run ads or stronger marketing through your site?
- Do you want your website connected tightly to the rest of your system?
- Do you want a new website created for you if your current one is not strong enough?
- Do you already have logo, content, and images?

These should be human-readable and multi-select where appropriate.

---

## 17. Dashboard Requirements

President Dashboard must be able to show:

- website mode
- website readiness class
- whether site is blocking recommended growth path
- whether hosted upgrade is recommended or required

CMO lane must be able to show:

- website readiness for campaigns
- lead capture readiness
- hosted vs connector distribution
- infrastructure blockers to growth

---

## 18. Launch Test Scenarios

Minimum required test scenarios:

### Scenario 1. No website business

- system recognizes no site
- hosted mode is recommended
- intake can proceed to site generation

### Scenario 2. Weak website business

- URL analyzed
- site marked weak
- hosted recommendation shown with reason

### Scenario 3. Acceptable website business

- URL analyzed
- site marked acceptable
- connector mode allowed for A path

### Scenario 4. Strong website business

- URL analyzed
- site marked strong
- connector mode allowed
- limitations clearly shown if trying to activate higher path

### Scenario 5. Hosted website intake

- business completes website form
- style chosen
- logo / content / image fallback logic works
- preview becomes available

### Scenario 6. Upgrade blocked by current website

- customer wants B or C path
- current site is insufficient
- hosted mode required message appears clearly

### Scenario 7. Hosted activation path

- preview approved
- hosted mode moves toward active hosted site state

---

## 19. Launch Exit Condition

Website Director is launch-ready only when:

1. site presence and quality can be classified
2. connector mode and hosted mode both exist
3. recommendation reasoning is clear
4. website intake is complete
5. preview-before-activation works
6. cross-director compatibility logic is real
7. A / B / C logic is documented and visible
8. recommendation engine can recommend it credibly

If any of those are missing, Website Director is not complete.

---

## 20. Build Priority Inside Wave 1

Website Director should be built third inside Wave 1 because it gives AI-ABCX:

- a strong infrastructure-led entry offer
- better support for Marketing, Advertising, Call Handling, and Estimator lanes
- a clear website-upgrade path
- a strong long-term system lock-in advantage when hosted mode is used

Recommended implementation order:

1. analysis model and classification logic
2. connector vs hosted decision logic
3. website intake surface
4. preview and style selection system
5. compatibility rules with other directors
6. monitoring and dashboard visibility
7. A / B / C logic
8. integrated testing

---

## 21. Final Product Statement

Website Director is not just a website builder.

It is the `AI-ABCX` website operating lane:

- current website quality is analyzed
- the right path is recommended
- the system knows when existing infrastructure is enough
- stronger upgrades require stronger web control when necessary
- website, marketing, calls, and lead capture stay connected
- the President can see whether the site supports or blocks growth

That is the standard this director should be built to meet.
