# AI-ABCX Approval Director Build Checklist

## Purpose
This document defines what must be true for `Approval Director` to count as launch-ready inside AI-ABCX.

It is written as a normalized build checklist so the role can be reviewed across:
- product logic
- dashboard behavior
- activation logic
- rule enforcement
- testing
- pricing readiness

---

## Mission
Approval Director exists to keep business decisions routed clearly, visibly, and with explicit ownership until deeper governance automation is needed.

This director is not just an approval button layer.

It is the control lane that ensures:
- decisions do not disappear into informal communication
- ownership stays visible
- escalations are routed correctly
- governance control remains structured as the company grows

---

## Launch Standard
Approval Director is launch-ready only if it can:
- surface pending approvals clearly
- show who owns each approval decision
- track escalated approvals
- prevent scattered or silent decision routing
- connect approval state to reporting, accountability, and governance visibility
- preserve a visible approval trail before full Stage C governance automation

---

## Canonical Role Definition
Current canonical repo evidence already establishes:

- `id: "approval"`
- `label: "Approval"`
- `role: "Approval Director"`
- ask prompt:
  - `Approval Director, what is the state of decision routing?`
- current response:
  - `Decision routing is visible and usable, but it remains a mapped governance lane until Stage C.`
- current action:
  - `Keep approval routing explicit until deeper governance control unlocks in Stage C.`

Current dashboard framing already confirms:
- approvals are visible
- approvals are current
- approvals are not yet heavily automated
- routing clarity is the priority
- scattered decisions are the main risk
- approval quality depends on reporting, accountability, policy visibility, and risk notes

This is enough evidence to treat Approval Director as canonical and product-intended, even if the governance lane is not yet fully implemented.

---

## Commercial Promise
Externally, Approval Director should mean:

`Your company does not lose decisions in text threads, memory, or unclear handoffs. AI-ABCX keeps business approvals visible, routed, owned, and reviewable.`

That promise must feel true to:
- owner-operators
- small teams adding structure
- growing teams with multiple decision makers
- businesses moving from informal coordination to controlled execution

---

## What AI-ABCX Must Match
At launch, Approval Director must at minimum match the practical business expectation of:
- visible pending approvals
- explicit ownership
- escalation visibility
- routing discipline
- approval history attached to real business records

If the business cannot tell:
- what needs approval
- who owns it
- whether it escalated
- what is blocked

then Approval Director is not launch-ready.

---

## Where AI-ABCX Can Beat the Market
AI-ABCX can beat standard approval tooling if Approval Director is positioned not as a generic workflow gate, but as part of a President-led operating structure.

It can be better by:
- tying approval decisions to executive lanes
- keeping approval state visible in the President layer
- connecting approvals directly to risk and compliance
- showing approval routing as part of business control, not just admin workflow
- making approval discipline understandable for non-technical owners

---

## A / B / C Definition Draft

### Level A
Visible approval routing.

Core expectations:
- pending approvals visible
- decision owner visible
- escalation visible
- approval state attached to record
- manual but explicit routing

### Level B
Structured approval control.

Core expectations:
- approval categories
- approval aging visibility
- stronger escalation tracking
- clearer ownership enforcement
- approval routing rules become more structured

### Level C
Advanced governance-grade approval system.

Core expectations:
- deeper automation
- stronger exception handling
- more complete approval history
- higher audit readiness
- tighter connection to compliance, risk, and executive reporting

---

## Required Categories
Approval Director must visibly support these categories:

- pending approvals
- escalated approvals
- routing clarity
- automation state
- priority decisions
- owner gaps
- routing drift
- scattered decisions
- silent delay risk
- routing noise
- policy drift
- reporting dependency
- accountability dependency
- policy visibility dependency
- risk-note dependency

---

## Required States
Approval Director should be able to express at least these states:

- `approval_pending`
- `approval_owner_assigned`
- `approval_escalated`
- `approval_routing_clear`
- `approval_routing_drift`
- `approval_scattered_decision_risk`
- `approval_silent_delay_risk`
- `approval_policy_visibility_healthy`
- `approval_reporting_synced`
- `approval_accountability_synced`
- `approval_record_attached`
- `president_attention_needed`

---

## Required Shared Record
Each approval-relevant record should be able to preserve:
- originating workflow or executive lane
- approval requirement
- current owner
- approval status
- escalation status
- reason for decision
- related compliance or risk note
- timestamp trail
- President visibility state

---

## Required Product Surfaces
Approval Director should exist across these surfaces:

- President Dashboard
- CAO / governance lane surfaces
- executive summaries where approvals affect decisions
- follow-up / escalation context
- guided activation logic where governance depth is configured

---

## Required Dashboard Visibility
The dashboard implementation should visibly support:
- approval overview
- routing clarity
- escalated decision count
- owner assignment clarity
- visible approval dependency on reporting and accountability

Current canonical metrics already imply:
- `Pending`
- `Escalated`
- `Routing Clarity`
- `Automation`
- `Priority Decisions`
- `Owner Gaps`
- `Routing Drift`
- `Scattered Decisions`
- `Silent Delay`
- `Policy Visibility`

These should remain the base visual language unless a stronger launch version replaces them.

---

## Required Handoffs
Approval Director must hand off correctly to:

### Compliance Director
For:
- policy-linked approvals
- controlled authorization visibility
- record-bound governance decisions

### Risk Director
For:
- risky approvals
- delayed approvals
- exception routing
- scattered decision exposure

### Executive Reporting Director
For:
- approval visibility in executive summaries
- unresolved approval load
- routing quality signals

### Accountability Director
For:
- ownership enforcement
- missing owner visibility
- unresolved decision responsibility

### President
For:
- decisions that need direct attention
- unclear routing
- unresolved escalations

---

## Guided Activation Requirements
Activation must be able to determine:
- whether the business currently routes approvals informally
- whether approvals are mostly owner-led or team-led
- whether decision ownership is clear today
- whether approvals require compliance or finance oversight
- whether the business needs only visible routing or deeper governance control

This matters because some small companies may only need Level A visibility, while larger or more regulated workflows may justify B or C.

---

## Pricing Decisions Still Required
Before launch, we still need to decide:
- whether Approval Director can be sold independently
- whether it only appears inside broader governance combinations
- whether it is included automatically when governance depth is recommended
- what level dependencies exist between Approval, Compliance, and Risk

Current logic suggests Approval Director is structurally strongest when connected to the full CAO lane, but final commercial rules still need to be decided.

---

## Build Sequence

### 1. Confirm canonical approval data model
- normalize approval states
- define required approval record fields
- define escalation states

### 2. Build approval routing views
- pending
- escalated
- owner assigned
- routing health

### 3. Build approval event logic
- create approval-required state
- attach owner
- track escalation
- preserve history

### 4. Connect handoffs
- compliance
- risk
- executive reporting
- accountability
- President

### 5. Add activation logic
- qualify governance maturity
- recommend A/B/C depth

### 6. Test against real business scenarios
- single-owner company
- team-led approval flow
- delayed decision flow
- scattered communication flow

---

## Internal Tests Required
Approval Director should not be considered done until we can verify:

- a pending approval becomes visible immediately
- approval owner appears correctly
- escalation changes state correctly
- silent or scattered routing produces a visible risk signal
- approval dependencies update correctly in reporting surfaces
- President can see when direct attention is needed
- approval history remains attached to the business record

---

## File / Surface Planning
Likely implementation surfaces include:
- dashboard config and per-director tabs
- approval record model or shared workflow state
- governance UI surfaces
- executive summary generation
- activation recommendation logic

Exact file map can be added once implementation begins.

---

## Completion Gate
Approval Director is launch-ready only when:
- approval routing is visible
- approval ownership is explicit
- escalation is functional
- routing risk is visible
- President visibility works
- dependencies with compliance, risk, and reporting are real
- A/B/C behavior is defined
- internal tests pass

---

## Practical Conclusion
Approval Director is not optional governance decoration.

It is the mechanism that keeps important business decisions:
- visible
- owned
- routed
- reviewable

Without it, a company may still operate.
But it cannot honestly claim controlled governance.
