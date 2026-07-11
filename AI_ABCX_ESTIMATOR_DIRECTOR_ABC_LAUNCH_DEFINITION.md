# AI-ABCX Estimator Director A B C Launch Definition

This document locks the practical launch definition for `Estimator Director`
levels `A`, `B`, and `C`.

Its purpose is to give one consistent reference for:

- implementation scope
- pricing decisions
- recommendation logic
- diagnostic explanations
- upgrade path explanation
- public-facing business language

This document is intentionally concrete.
It defines what each level actually means in business terms, not abstract
feature language.

---

## 1. Core Rule

`Estimator Director` is not just a quote generator.

It is the controlled quote lane of `AI-ABCX`:

`quote request -> estimate workflow -> customer decision -> next action`

The level definitions must therefore reflect:

- how structured the estimate workflow is
- how much estimate behavior is visible
- how connected the estimator is to the rest of the system
- how much automation and control exists around the quote path

The levels should not feel like arbitrary software tiers.

They should feel like deeper operating discipline.

---

## 2. Public Meaning Of Each Level

### Level A

`Visible quote control`

Level `A` means:

- the business can capture quote requests
- the business can send structured estimates
- the owner can see open quote opportunities
- the system keeps basic quote truth visible

This is the entry level for businesses that need order and visibility first.

### Level B

`Connected quote workflow`

Level `B` means:

- the business has structured estimate handling
- the quote lane supports more decision paths
- quote requests move with better routing and accountability
- estimate work begins to connect more strongly with follow-up, sales, and
  scheduling

This is the level for businesses that need more than visibility.
They need stronger workflow control.

### Level C

`Advanced quote-conversion orchestration`

Level `C` means:

- estimating becomes a major controlled revenue engine
- quote paths support deeper structure and stronger conversion behavior
- the system gives the President and connected directors the highest estimate
  visibility and action clarity
- quoting becomes tightly integrated with broader revenue operations

This is the level for businesses where estimates are a major growth and
conversion lane, not just an occasional task.

---

## 3. Level A Definition

## What Level A must do

Level `A` must include:

- estimate intake from core sources
- visible source tagging
- standard estimate format
- estimate state tracking
- accepted / pending / lost visibility
- President visibility into open estimate requests
- clear next-action status for unresolved quotes
- customer-facing estimate delivery
- customer acceptance path

### Launch-required source support

- website request
- AI call handoff
- manual internal entry
- ad or campaign sourced request
- repeat customer request
- referral or social request

### Launch-required states

- `new_request`
- `intake_in_progress`
- `estimate_preparing`
- `estimate_sent`
- `waiting_on_customer`
- `accepted`
- `rejected`
- `revision_requested`
- `follow_up_needed`
- `lost`

### Customer-facing expectation

At `A`, the customer should be able to:

- receive the estimate clearly
- understand what is being quoted
- accept it simply
- request revision where needed

### President expectation

At `A`, the President should be able to say:

- “I can see every estimate request.”
- “I know where it came from.”
- “I know whether it is waiting, accepted, or lost.”

## What Level A does not need yet

Level `A` does not need to include:

- package estimate logic
- deeper upsell structure
- strong conversion automation
- advanced estimate intelligence
- heavy routing rules into multiple downstream lanes

## Best fit for Level A

- owner-led companies
- smaller service teams
- businesses doing simpler quoting
- companies where quote requests are getting lost or handled too loosely
- businesses that need structure before deeper automation

## Best business story for Level A

`We need to stop losing track of quote requests and send clean estimates with visible follow-up status.`

---

## 4. Level B Definition

## What Level B must do

Level `B` includes everything in `A`, plus:

- stronger estimate qualification structure
- options estimate support
- better revision handling
- stronger follow-up routing
- stronger handoff logic into sales and scheduling
- clearer ownership and accountability in the quote path
- improved state clarity around next action
- better source-aware workflow decisions

### Required commercial difference from A

`B` should feel like:

- quote workflow is more controlled
- estimate outcomes are less likely to stall
- businesses can manage more quote complexity
- the estimator is more connected to the business operating system

### Key structural expectation

At `B`, unresolved estimates should not simply remain visible.
They should begin to move through better-defined control paths.

### Example differences from A

Compared with `A`, `B` should support:

- customer chooses among options where relevant
- revision-needed quotes are tracked more intentionally
- follow-up logic becomes stronger
- accepted quotes can move more cleanly toward next-step action

## What Level B does not need yet

Level `B` does not yet require:

- deepest package ladder logic
- strongest conversion intelligence
- most advanced quick-estimate orchestration
- richest executive visibility layer

## Best fit for Level B

- growing service businesses
- teams with multiple quote paths
- companies with meaningful quote backlog
- businesses where follow-up discipline matters
- businesses where accepted quotes should move toward scheduling or sales

## Best business story for Level B

`We already quote regularly, but we need better structure, better follow-up, and cleaner movement from estimate to next action.`

---

## 5. Level C Definition

## What Level C must do

Level `C` includes everything in `B`, plus:

- package estimate logic
- stronger quick-estimate workflow support
- deeper estimate orchestration
- strongest source-aware workflow control
- strongest President-level estimator visibility
- stronger executive visibility into estimate performance and conversion posture
- richer control of estimate-to-revenue movement
- the most advanced connected estimate operating lane available at launch

### Required commercial difference from B

`C` should feel like:

- estimating is a major managed conversion system
- quote behavior is highly structured
- upsell and package logic can be used more intentionally
- executive oversight becomes stronger
- estimator activity behaves like a serious revenue lane

### Example differences from B

Compared with `B`, `C` should support:

- package ladders where relevant
- fastest quote path for repetitive demand where relevant
- strongest routing clarity
- strongest President summary of quote truth
- deeper integration into connected revenue operations

## What Level C represents

Level `C` means:

- estimating is not occasional administration
- estimating is part of the business growth machine

## Best fit for Level C

- estimate-heavy businesses
- upsell-heavy service companies
- businesses using quotes as a major conversion threshold
- teams with high quote volume
- companies where quote workflow quality strongly affects growth

## Best business story for Level C

`Estimating is one of the biggest drivers of our growth, and we need the strongest possible quote-control system connected to the rest of the company.`

---

## 6. Exact Launch Difference Between A B and C

To avoid confusion, the launch differences must be explained simply.

### A vs B

`A` gives visibility and control.
`B` adds stronger structure and connected workflow.

In plain language:

- `A` = “I can see and control my quotes.”
- `B` = “My quote lane is more structured and moves better.”

### B vs C

`B` gives stronger workflow.
`C` turns the estimator into a more advanced conversion engine.

In plain language:

- `B` = “My estimates are structured.”
- `C` = “My estimates become a high-performance revenue lane.”

---

## 7. Dependency Guidance By Level

`Estimator Director` can stand alone, but it becomes stronger with connected
directors.

### Level A dependency posture

Level `A` can sell independently.

Recommended but not required:

- `Website Director`
- `Call Handling Director`
- `Follow-Up Director`

### Level B dependency posture

Level `B` can still sell independently, but should more often recommend:

- `Follow-Up Director`
- `Sales Director`
- `Scheduling Director`
- `Website Director` if quote capture starts online

### Level C dependency posture

Level `C` should often be presented as part of a stronger connected system,
especially with:

- `Follow-Up Director`
- `Sales Director`
- `Scheduling Director`
- `Call Handling Director`
- `Website Director`
- `Lead Generation Director`

The point is not to force bundles unnecessarily.
The point is to explain that `C` becomes most powerful when the quote lane is
connected to the rest of the growth and operations stack.

---

## 8. Recommendation Logic Guidance

The diagnostic should recommend `Estimator Director` differently by level.

### Recommend Level A when

- the business loses track of quote requests
- estimates are manual and loosely managed
- the owner needs visibility before anything else
- quote volume exists but workflow is still simple

### Recommend Level B when

- quote workflow has multiple decision points
- revision handling matters
- unresolved estimates require follow-up discipline
- estimate outcomes should connect more clearly to next actions

### Recommend Level C when

- quote volume is high
- estimates are a major revenue threshold
- upsells or package structures matter
- the company wants stronger estimate-driven growth control
- the company intends deeper operational expansion

---

## 9. Business-Friendly Explanation For Customers

When presenting the configuration, the system should describe the levels like
this:

### Level A customer explanation

`Estimator Director Level A gives your business a visible quote lane. Estimate requests are captured, tracked, and kept visible so the President can see what is open, what was sent, and what still needs action.`

### Level B customer explanation

`Estimator Director Level B gives your business a more structured quote workflow. Estimates can move through clearer decision paths, stronger follow-up routing, and better connection to the next business action.`

### Level C customer explanation

`Estimator Director Level C turns estimating into a stronger conversion engine. The system supports deeper estimate structure, stronger workflow control, and the highest level of quote visibility and connected operating discipline.`

---

## 10. What Must Be Avoided

The level definitions should avoid these mistakes:

- making `A`, `B`, and `C` sound like random feature bundles
- using vague AI language
- promising “magic pricing”
- hiding the actual business difference between levels
- making `C` sound technical instead of commercially stronger

The customer should always understand:

- what the level does
- why that level is recommended
- what better level would improve

---

## 11. Implementation Use

This document should be used immediately for:

- estimator pricing definition
- diagnostic recommendation rules
- estimator screen design priorities
- public explanation copy
- bundle logic with follow-up, scheduling, sales, website, and call handling

---

## 12. Final Lock

For launch, `Estimator Director` levels are defined like this:

- `A` = visible quote control
- `B` = connected quote workflow
- `C` = advanced quote-conversion orchestration

That is the official practical launch definition unless a later launch decision
replaces it.
