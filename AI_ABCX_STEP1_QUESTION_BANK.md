# AI-ABCX Step 1 Question Bank

## Purpose

This document defines the actual Step 1 questions for guided activation.

It translates the Step 1 diagnostic architecture into:

- exact question wording
- answer options
- multi-select rules
- branching logic
- recommendation impact

This is the working source for building the real Step 1 flow.

---

## Core Rule

Every question must be understandable to a normal service business owner without technical knowledge.

Questions should sound:

- human
- direct
- respectful
- easy to answer

---

## Question Format Rules

Each question should define:

- question ID
- question text
- answer type
- answer options
- multi-select allowed or not
- follow-up logic
- recommendation effect

---

## Section 1. Company Identity

## Q1. Business Name

Question:

What is your business name?

Answer type:

- short text

Multi-select:

- no

Recommendation effect:

- identity only

---

## Q2. Primary Business Category

Question:

Which type of service business best describes you?

Answer type:

- single select

Answer options:

- home services
- appointment-based service
- estimate-driven service
- professional services
- reservation / booking service
- information-driven service
- multi-service company

Multi-select:

- no

Follow-up logic:

- opens industry-specific category selection

Recommendation effect:

- shapes industry recommendations
- shapes director relevance

---

## Q3. Industry / Service Type

Question:

Which services best describe what your business actually does?

Answer type:

- multi-select

Example answer options:

- plumbing
- electrical
- HVAC
- roofing
- remodeling
- solar
- windows and doors
- flooring
- lawn care
- pest control
- cleaning
- restoration
- painting
- pressure washing
- towing
- med spa
- dental office
- chiropractic clinic
- salon
- legal office
- real estate office
- accounting firm
- consulting business

Multi-select:

- yes

Follow-up logic:

- opens trade-specific logic

Recommendation effect:

- shapes estimate, scheduling, service, and website recommendations

---

## Q4. Service Area

Question:

Where do you mainly serve customers?

Answer type:

- location input

Fields:

- country
- state / region
- city
- local service area

Multi-select:

- no

Recommendation effect:

- geography
- website localization
- marketing direction

---

## Q5. Business Age

Question:

How long have you been operating?

Answer type:

- single select

Answer options:

- just getting started
- under 1 year
- 1 to 3 years
- 3 to 7 years
- 7+ years

Multi-select:

- no

Recommendation effect:

- maturity scoring

---

## Section 2. Goals And Intent

## Q6. Main Improvement Goals

Question:

What do you most want to improve right now?

Answer type:

- multi-select

Answer options:

- get more leads
- answer calls better
- send quotes faster
- close more sales
- book more appointments
- organize jobs better
- improve follow-up
- improve customer communication
- improve online presence
- get more repeat business
- automate the business
- gain better control and visibility
- prepare for growth

Multi-select:

- yes

Follow-up logic:

- major driver of configuration output

Recommendation effect:

- director priority
- growth intent scoring

---

## Q7. Biggest Current Problems

Question:

What feels hardest to manage in the business today?

Answer type:

- multi-select

Answer options:

- missed calls
- inconsistent lead follow-up
- slow quotes
- low close rate
- messy scheduling
- weak marketing
- weak website
- poor team visibility
- not enough repeat business
- too much manual work
- hard to track what is really going on
- no clear structure

Multi-select:

- yes

Recommendation effect:

- pain-point scoring

---

## Q8. Growth Intent

Question:

Which of these sounds most like what you want next?

Answer type:

- single select

Answer options:

- I just want to fix one weak area
- I want the business to feel more organized
- I want moderate growth with better control
- I want strong automation and growth
- I want to scale the business aggressively

Multi-select:

- no

Recommendation effect:

- partial vs improved vs advanced configuration logic

---

## Section 3. Current Business Structure

## Q9. Team Size

Question:

How many people are actively working in the business right now?

Answer type:

- single select

Answer options:

- just me
- 2 to 3 people
- 4 to 6 people
- 7 to 10 people
- 11 to 20 people
- 20+ people

Recommendation effect:

- business scale
- user count logic
- full-system fit logic

---

## Q10. Current Human Roles

Question:

Who is actually doing these jobs in the business today?

Answer type:

- multi-select matrix

Role lines:

- answering phones
- booking appointments
- sending estimates
- following up
- running marketing
- coordinating field work
- customer support
- tracking payments and business results

Answer options per line:

- owner
- office staff
- salesperson
- technician / service worker
- family member
- outside agency / outside helper
- nobody consistently

Multi-select:

- yes where appropriate

Recommendation effect:

- current structure mapping

---

## Section 4. Lead And Demand Sources

## Q11. Main Lead Sources

Question:

Where do most of your new customers come from today?

Answer type:

- multi-select

Answer options:

- phone calls
- website
- Google search
- Google Maps
- referrals
- repeat customers
- Facebook / Instagram
- paid ads
- text messages
- email inquiries
- third-party platforms
- walk-ins

Recommendation effect:

- lead generation
- website
- call handling
- follow-up

---

## Q12. Best Lead Source

Question:

Which source brings your best customers right now?

Answer type:

- single select

Answer options:

- same list as Q11

Follow-up logic:

- only show after Q11

Recommendation effect:

- growth strategy direction

---

## Q13. Source You Want To Improve Most

Question:

Which source would you most like to improve?

Answer type:

- single select

Answer options:

- same list as Q11

Recommendation effect:

- improved and advanced configuration logic

---

## Section 5. Sales / Quote Workflow

## Q14. Do You Send Estimates Or Quotes?

Question:

Do you send estimates or quotes before customers decide?

Answer type:

- single select

Answer options:

- almost always
- sometimes
- rarely
- almost never

Recommendation effect:

- estimator relevance
- sales relevance

---

## Q15. How Quotes Are Created Today

Question:

How do you usually create quotes today?

Answer type:

- multi-select

Answer options:

- manually by text
- manually by email
- handwritten / paper
- spreadsheet
- estimating software
- verbally over the phone
- in person only
- depends on the job

Recommendation effect:

- estimator maturity scoring

---

## Q16. Current Quote Types

Question:

What kind of quote structure do you usually need?

Answer type:

- multi-select

Answer options:

- one simple price
- customer chooses options
- package / tier pricing
- recurring service pricing
- photo-based estimating
- on-site custom quoting

Recommendation effect:

- Estimator A/B/C logic

---

## Q17. Quote Speed

Question:

How fast do customers usually receive a quote from you?

Answer type:

- single select

Answer options:

- during the call or same conversation
- within a few hours
- same day
- next day
- 2 to 3 days
- longer than 3 days

Recommendation effect:

- estimator priority
- follow-up priority

---

## Q18. Quote Follow-Up

Question:

What usually happens after you send a quote?

Answer type:

- multi-select

Answer options:

- we follow up the same day
- we follow up later manually
- follow-up is inconsistent
- we usually wait for the customer
- we lose track of open quotes
- we do not really follow up

Recommendation effect:

- Follow-Up Director priority

---

## Section 6. Call Handling

## Q19. Current Call Handling

Question:

How are incoming calls handled today?

Answer type:

- single select

Answer options:

- I answer them myself
- office staff answers
- whoever is free answers
- voicemail catches many calls
- calls are often missed
- outside answering service

Recommendation effect:

- Call Handling priority

---

## Q20. What Calls Need Most Often

Question:

What do callers usually need from you?

Answer type:

- multi-select

Answer options:

- ask basic questions
- request an estimate
- book an appointment
- reschedule
- request urgent help
- ask about an existing job
- support after service
- payment / billing help

Recommendation effect:

- call handling level
- scheduling relevance

---

## Q21. After-Hours Need

Question:

How important is after-hours call coverage for your business?

Answer type:

- single select

Answer options:

- not important
- helpful but not critical
- important
- very important

Recommendation effect:

- Call Handling level

---

## Q22. Special Call Needs

Question:

Do your calls need any of these special functions?

Answer type:

- multi-select

Answer options:

- multilingual handling
- urgent call routing
- spam filtering
- lead qualification
- appointment booking
- service booking
- after-hours capture

Recommendation effect:

- Call Handling B/C logic

---

## Section 7. Scheduling / Dispatch / Service Flow

## Q23. Appointment Booking

Question:

Do customers book appointments with your business?

Answer type:

- single select

Answer options:

- yes, almost always
- yes, sometimes
- rarely
- no

Recommendation effect:

- Scheduling Director priority

---

## Q24. Current Scheduling Method

Question:

How do you manage scheduling today?

Answer type:

- multi-select

Answer options:

- paper calendar
- phone only
- office calendar
- shared digital calendar
- scheduling software
- mostly manual coordination
- depends on who is available

Recommendation effect:

- Scheduling A/B/C logic

---

## Q25. Field Coordination Need

Question:

Do you need to assign jobs to technicians or service staff in the field?

Answer type:

- single select

Answer options:

- no
- occasionally
- yes, regularly
- yes, with multiple people every day

Recommendation effect:

- Dispatch relevance
- Service relevance

---

## Q26. Service Complexity

Question:

Which of these best describes your day-to-day service workflow?

Answer type:

- multi-select

Answer options:

- simple appointments
- multiple techs or crews
- route planning matters
- recurring jobs
- emergency jobs
- reschedules happen often
- job status is hard to track

Recommendation effect:

- Scheduling / Dispatch / Service depth

---

## Section 8. Website / Marketing / Advertising

## Q27. Current Website

Question:

Do you currently have a business website?

Answer type:

- single select

Answer options:

- yes
- no
- not sure if current site is good enough

Branching:

- yes opens Q28
- no opens website creation questions

Recommendation effect:

- Website Director priority

---

## Q28. Website URL

Question:

What is your website address?

Answer type:

- URL input

Condition:

- only if Q27 = yes

Recommendation effect:

- website analysis input

---

## Q29. Website Satisfaction

Question:

How well is your current website helping your business?

Answer type:

- single select

Answer options:

- working well
- acceptable but could improve
- weak
- not helping enough

Recommendation effect:

- Website A/B/C logic

---

## Q30. Marketing / Advertising Interest

Question:

Which of these do you want to improve?

Answer type:

- multi-select

Answer options:

- website performance
- Google visibility
- paid advertising
- lead generation
- local marketing
- online reputation
- customer reactivation
- none right now

Recommendation effect:

- Website / Marketing / SEO / Advertising / Lead Gen

---

## Q31. Logo Availability

Question:

Do you already have a business logo?

Answer type:

- single select

Answer options:

- yes
- no
- yes but I may want a better one

Recommendation effect:

- website creation workflow

---

## Q32. Website Style Preference

Question:

If AI-ABCX builds or rebuilds your site, which look feels closest to your brand?

Answer type:

- single select

Answer options:

- dark / premium
- light / clean
- blue / corporate
- warm / local service
- modern / minimal
- bold / high-contrast

Recommendation effect:

- website build inputs

---

## Section 9. Follow-Up / Retention / Reviews

## Q33. Lead Follow-Up Discipline

Question:

How consistently do you follow up when a customer does not decide right away?

Answer type:

- single select

Answer options:

- very consistently
- somewhat consistently
- inconsistently
- rarely
- almost never

Recommendation effect:

- Follow-Up Director priority

---

## Q34. Repeat Customer Interest

Question:

How important is it for you to generate more repeat business?

Answer type:

- single select

Answer options:

- not important
- somewhat important
- important
- very important

Recommendation effect:

- Reactivation / Retention / Customer Success

---

## Q35. Reviews And Referrals

Question:

How do you currently ask for reviews or referrals?

Answer type:

- single select

Answer options:

- consistently
- sometimes
- rarely
- never

Recommendation effect:

- Reviews & Referrals priority

---

## Section 10. Financial / Operational Scale

## Q36. Jobs Last Month

Question:

About how many jobs or customer engagements did you complete last month?

Answer type:

- single select

Answer options:

- under 10
- 10 to 25
- 26 to 50
- 51 to 100
- 100+

Recommendation effect:

- scale scoring
- full-system relevance

---

## Q37. Average Job Value

Question:

What is your typical average job value?

Answer type:

- single select

Answer options:

- under $100
- $100 to $300
- $301 to $700
- $701 to $1,500
- $1,500+

Recommendation effect:

- estimator logic
- sales logic
- value opportunity scoring

---

## Q38. Service Mix

Question:

Do you mainly sell one core service or many different services?

Answer type:

- single select

Answer options:

- mostly one service
- a few services
- many different services

Recommendation effect:

- estimate complexity
- website complexity

---

## Q39. Highest-Demand Services

Question:

Which services are most in demand for you right now?

Answer type:

- multi-select from chosen service list

Recommendation effect:

- recommendation weighting
- business summary language

---

## Section 11. Users / Visibility / Access

## Q40. System Access Need

Question:

Who would need access to parts of the system?

Answer type:

- multi-select

Answer options:

- owner only
- office staff
- sales staff
- service staff
- managers / supervisors
- marketing person

Recommendation effect:

- dashboard / user count logic

---

## Q41. Visibility Need

Question:

What kind of visibility do you want most?

Answer type:

- multi-select

Answer options:

- daily owner overview
- quote visibility
- call visibility
- scheduling visibility
- technician / field visibility
- marketing visibility
- customer follow-up visibility
- financial visibility

Recommendation effect:

- reporting and dashboard relevance

---

## Section 12. Growth Readiness

## Q42. Business Change Readiness

Question:

If a better system clearly improves results, how ready are you to change how the business runs?

Answer type:

- single select

Answer options:

- only small changes
- some changes are fine
- ready for strong improvement
- ready for major automation and scale

Recommendation effect:

- improved vs advanced recommendation strength

---

## Q43. Expansion Intent

Question:

Are you trying to grow the business bigger over the next year?

Answer type:

- single select

Answer options:

- no, mostly stabilize
- maybe a little
- yes, moderate growth
- yes, strong growth

Recommendation effect:

- full-system fit logic

---

## Q44. Automation Interest

Question:

How much automation do you actually want?

Answer type:

- single select

Answer options:

- very little, just basic support
- moderate automation
- strong automation where it helps
- as much automation as makes business sense

Recommendation effect:

- A/B/C recommendation logic

---

## Optional Website Build Intake Questions

Only show if website build / rebuild becomes relevant.

## Q45. Content Availability

Question:

Do you already have business content and photos ready for a website?

Answer type:

- single select

Answer options:

- yes, both
- content only
- photos only
- neither

Recommendation effect:

- website build generation path

---

## Q46. Visual Asset Preference

Question:

If needed, should AI-ABCX generate starter visuals and copy for your website?

Answer type:

- single select

Answer options:

- yes
- yes, but I may replace them later
- no

Recommendation effect:

- website build automation path

---

## Recommendation Mapping Rules

Each answer should feed one or more of these engines:

- director need scoring
- level scoring
- dependency validation
- standalone fit detection
- bundle fit detection
- full-system fit detection
- business summary generation
- projection generation

---

## Output Rules

After Step 1, the system should produce:

## 1. Intent Fit Configuration

Closest match to what the owner asked for.

## 2. Improved Configuration

Fixes the most important missing links.

## 3. Advanced Configuration

Shows the stronger path for growth, visibility, and automation.

Each should include:

- directors
- levels
- pricing
- why this setup fits

---

## Business Summary Rule

The answers should generate a short summary that describes:

- what the business looks like today
- where the main pressure points are
- what growth or control the owner wants
- why the recommended system is appropriate

---

## Practical Conclusion

This question bank should become the human-facing intelligence layer of AI-ABCX activation.

If the questions stay simple, relevant, and adaptive, Step 1 will feel like a free professional business diagnosis rather than a software intake form.
