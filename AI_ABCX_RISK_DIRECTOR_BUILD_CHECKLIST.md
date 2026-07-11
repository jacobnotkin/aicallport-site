# AI-ABCX Risk Director Build Checklist

## Purpose
This document defines what must be true for `Risk Director` to count as launch-ready inside AI-ABCX.

It is written as a normalized build checklist so the role can be reviewed across:
- product logic
- dashboard behavior
- activation logic
- escalation handling
- testing
- pricing readiness

---

## Mission
Risk Director exists to keep operating risk visible, practical, current, and attached to real executive decisions.

This director is not just a warning surface.

It is the control lane that ensures:
- risk signals are not hidden
- risk notes stay attached to explicit records
- risk ownership does not become abstract
- escalation remains controlled
- the President can see where caution is required before problems compound

---

## Launch Standard
Risk Director is launch-ready only if it can:
- surface open risks visibly
- distinguish visible watch items from critical issues
- keep risk notes current
- connect risk to real decision records
- prevent abstract or ownerless risk tracking
- support governance visibility before full Stage C governance activation

---

## Canonical Role Definition
Current canonical repo evidence already establishes:

- `id: "risk"`
- `label: "Risk"`
- `role: "Risk Director"`
- ask prompt:
  - `Risk Director, what should I watch most closely now?`
- current response:
  - `Watch the visible governance notes and the places where executive truth could become informal before Stage C governance activates.`
- current action:
  - `Keep risk notes current and attached to explicit executive decisions until Stage C.`

Current dashboard framing already confirms:
- risk should guide caution without overreaction
- practicality matters more than abstract policy language
- risk notes need explicit owners
- risk management can fail when it becomes too abstract
- risk depends on reporting clarity, finance truth, decision logs, and policy visibility

This is enough evidence to treat Risk Director as canonical and product-intended, even if deeper governance automation is still reserved for Stage C.

---

## Commercial Promise
Externally, Risk Director should mean:

`AI-ABCX helps your business see operating risk before it becomes a hidden problem. Risk stays visible, assigned, and tied to real business decisions instead of getting lost in memory or informal communication.`

That promise must feel true to:
- solo owners carrying too much in their head
- small teams that need clearer caution signals
- growing businesses where problems can hide between departments
- operators who need practical risk visibility without enterprise complexity

---

## What AI-ABCX Must Match
At launch, Risk Director must at minimum match the practical business expectation of:
- visible open risks
- clear watch-level items
- explicit risk notes
- explicit ownership
- visible escalation
- risk tied to reporting and real business truth

If the business cannot tell:
- what the current risks are
- whether they are real or just abstract concern
- who owns them
- whether they escalated
- what record they belong to

then Risk Director is not launch-ready.

---

## Where AI-ABCX Can Beat the Market
AI-ABCX can beat standard risk tooling by making risk part of the executive operating system rather than a standalone governance artifact.

It can be better by:
- tying risk visibility directly to the President surface
- showing risk in executive context, not in a separate compliance silo
- keeping risk practical and operational
- linking risk to finance truth, reporting clarity, and decision logs
- helping small business owners use governance language without needing enterprise overhead

---

## A / B / C Definition Draft

### Level A
Visible risk notes.

Core expectations:
- open risks visible
- watch items visible
- risk notes attached to explicit records
- owner visible
- manual but structured risk tracking

### Level B
Structured risk control.

Core expectations:
- better categorization
- stronger escalation handling
- stronger review timing visibility
- clearer operational risk grouping
- more structured dependency tracking

### Level C
Advanced governance-grade risk system.

Core expectations:
- deeper automation
- more complete escalation discipline
- stronger governance integration
- more complete record history
- higher audit and policy coordination

---

## Required Categories
Risk Director must visibly support these categories:

- open risks
- critical risk count
- muted or weak signals
- trace notes
- priority risks
- owner gaps
- escalation notes
- review timing
- abstract risk notes
- unowned risks
- visibility gaps
- escalation drift
- reporting clarity dependency
- finance truth dependency
- decision-log dependency
- policy visibility dependency

---

## Required States
Risk Director should be able to express at least these states:

- `risk_open`
- `risk_watch`
- `risk_critical`
- `risk_owner_assigned`
- `risk_owner_missing`
- `risk_note_current`
- `risk_note_abstract`
- `risk_visibility_gap`
- `risk_escalated`
- `risk_escalation_drift`
- `risk_reporting_synced`
- `risk_finance_truth_synced`
- `risk_decision_log_attached`
- `president_attention_needed`

---

## Required Shared Record
Each risk-relevant record should be able to preserve:
- originating workflow or executive lane
- risk category
- risk severity
- current owner
- current note
- escalation state
- linked decision or record
- timestamp trail
- review status
- President visibility state

---

## Required Product Surfaces
Risk Director should exist across these surfaces:

- President Dashboard
- CAO / governance lane surfaces
- executive summaries where risk affects action
- escalation and control views
- guided activation logic where governance depth is configured

---

## Required Dashboard Visibility
The dashboard implementation should visibly support:
- open risk count
- critical risk count
- muted signal count
- trace-note quality
- owner visibility
- escalation visibility
- dependency on finance truth, reporting, and decision logs

Current canonical metrics already imply:
- `Open Risks`
- `Critical`
- `Muted Signals`
- `Trace Notes`
- `Priority Risks`
- `Owner Gaps`
- `Escalation Notes`
- `Review Timing`
- `Abstract Notes`
- `Unowned Risks`
- `Visibility Gaps`
- `Escalation Drift`
- `Reporting Clarity`
- `Finance Truth`
- `Decision Logs`
- `Policy Visibility`

These should remain the base visual language unless a stronger launch version replaces them.

---

## Required Handoffs
Risk Director must hand off correctly to:

### Compliance Director
For:
- policy-linked risks
- record traceability
- governance visibility

### Approval Director
For:
- risky decision routing
- approvals that need caution tracking
- escalation before authorization

### Executive Reporting Director
For:
- visible risk summaries
- narrative risk framing
- President-ready caution signals

### Finance / Revenue Control / Accounting
For:
- finance truth dependency
- monetary exposure
- ambiguity tied to close, cost, or revenue reality

### President
For:
- risks that need direct attention
- unclear ownership
- muted signals that could become business problems

---

## Guided Activation Requirements
Activation must be able to determine:
- whether the business currently tracks risk explicitly or informally
- whether risks usually live in the owner’s head
- whether the business needs simple visibility or deeper governance
- whether finance, approvals, or compliance already create operating risk
- whether the team can support only A-level visibility or should move to B/C discipline

This matters because some businesses need only practical visibility, while others need structured risk control tied to larger operations.

---

## Pricing Decisions Still Required
Before launch, we still need to decide:
- whether Risk Director can be sold independently
- whether it only appears inside broader governance configurations
- whether it is automatically included when governance depth is recommended
- what dependency rules exist between Risk, Approval, and Compliance

Current logic suggests Risk Director is strongest when connected to the CAO governance lane, but final commercial rules still need to be defined.

---

## Build Sequence

### 1. Confirm canonical risk data model
- normalize risk states
- define risk severity language
- define required note and owner fields

### 2. Build risk visibility views
- open
- watch
- escalated
- owner assigned
- dependency health

### 3. Build risk event logic
- create risk note
- attach record
- assign owner
- escalate
- preserve history

### 4. Connect handoffs
- compliance
- approval
- executive reporting
- finance truth
- President

### 5. Add activation logic
- qualify governance maturity
- recommend A/B/C depth

### 6. Test against real business scenarios
- solo owner carrying informal risks
- visible but unowned risk
- muted signal that should be surfaced
- risk tied to finance ambiguity

---

## Internal Tests Required
Risk Director should not be considered done until we can verify:

- a new risk becomes visible immediately
- risk severity displays correctly
- risk owner appears correctly
- risk note remains attached to the record
- escalation changes state correctly
- visibility gaps produce a warning state
- finance / reporting dependencies update correctly
- President can see when risk needs direct attention

---

## File / Surface Planning
Likely implementation surfaces include:
- dashboard config and per-director tabs
- shared workflow / governance state
- risk record model
- escalation logic
- executive summary generation
- activation recommendation logic

Exact file map can be added once implementation begins.

---

## Completion Gate
Risk Director is launch-ready only when:
- open risks are visible
- owner and note quality are visible
- escalation is functional
- abstract / invisible risk is flagged
- President visibility works
- dependencies with reporting, finance truth, and decision logs are real
- A/B/C behavior is defined
- internal tests pass

---

## Practical Conclusion
Risk Director is the part of the system that keeps caution real instead of vague.

It makes risk:
- visible
- owned
- attached
- reviewable

Without it, governance becomes optimistic storytelling.
With it, the business can see where instability begins before it spreads.
