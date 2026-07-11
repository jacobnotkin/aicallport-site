# AI-ABCX Strategy Director Product Spec

This document defines the implementation-grade product specification for `Strategy Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Strategy Director is one of the first Wave 4 launch directors because it gives the CEO lane a real operating anchor, protects business focus, prevents premature expansion, and keeps growth timing tied to actual company truth instead of opinion.

---

## 1. Product Identity

### Public name

`Strategy Director`

### Executive owner

`CEO`

### Mission

Strategy Director keeps the business focused on the right operating path, frames direction in simple President language, identifies the next valid expansion gate, and protects the company from scaling into unnecessary complexity too early.

### Core promise

Strategy Director should not feel like generic planning software or vague executive consulting.

It should promise:

- clearer business direction
- less distraction
- smarter timing
- fewer premature upgrades
- stronger alignment between goals and operating reality
- better growth sequencing
- more confidence in what to do next

---

## 2. Strategic Role Inside AI-ABCX

Strategy Director is the business-path and timing-discipline lane of the system.

It manages the operating span between:

`current business reality -> strategic focus -> next valid expansion gate -> controlled growth timing`

It is strategically important because:

- companies often expand into tools, hires, automation, or channels before they are operationally ready
- business owners frequently need clearer direction more than broader complexity
- strategy must stay tied to what the company can actually support now
- focus drift creates hidden inefficiency across multiple departments
- the President should see what stays fixed, what expands next, and why

Strategy Director can be:

- part of a full-system recommendation
- part of an executive-control bundle
- a strategic-discipline layer for growing businesses activating multiple directors

It should not be positioned as a standalone abstract planning product detached from the rest of the system.

---

## 3. Benchmark Position

### Strongest outside benchmarks

- executive planning systems
- operating cadence systems
- growth-planning consultants
- business scorecard systems
- strategy and execution platforms

### What they do well

- clarify priorities
- frame planning horizons
- show risks and dependencies
- keep leadership aligned
- reduce strategic confusion

### What AI-ABCX must match

- clear priorities
- visible next gate
- meaningful risk framing
- focus discipline
- usable decision horizon
- strategy tied to operating signals
- strategic clarity without consultant vagueness

### Where AI-ABCX should beat them

- strategy reads from live operating truth instead of static planning documents
- strategy connects directly to Scheduling, Service, Revenue, Finance, Reporting, and Accountability
- expansion timing becomes measurable
- strategic recommendations are tied to real business readiness
- the President sees one connected company model, not separate planning and execution tools

---

## 4. Ideal Customer Fit

Strategy Director is a strong fit for:

- owner-led service businesses trying to grow without chaos
- companies activating more than one director and needing expansion discipline
- businesses with many improvement ideas but unclear sequencing
- companies at risk of tool overload or operational overreach
- teams that need better focus before broader automation

It is especially strong for:

- growing service businesses
- companies moving from reactive to structured operations
- businesses choosing between partial and full-system paths
- companies with competing internal priorities

---

## 5. Required User Outcomes

Strategy Director must let a business owner say:

- “I know what the company should stay focused on right now.”
- “I know what should not be expanded yet.”
- “I can see the next valid growth step clearly.”
- “I can see where timing risk exists.”
- “The system is helping me grow in the right order.”
- “Strategy is tied to what the company is actually doing today.”
- “I am not guessing which improvement should happen next.”

---

## 6. Functional Scope

Strategy Director must cover eight major functions:

1. current strategic focus definition
2. next expansion gate visibility
3. active priority framing
4. focus drift detection
5. strategy risk visibility
6. dependency readiness review
7. decision horizon framing
8. President-visible timing discipline

---

## 7. Strategy Categories

Strategy Director must support category-aware business-path logic.

Launch-required categories:

- primary focus
- next expansion gate
- strategic priorities
- focus drift
- strategy risk
- dependency review
- decision horizon

Each category should remain distinct inside the system and inside reporting surfaces.

---

## 8. Required Strategy States

Strategy Director needs its own business-path states while still staying tied to the same shared company record.

Launch-required states:

- `focus_locked`
- `expansion_gate_pending`
- `board_aligned`
- `focus_drift_detected`
- `priority_conflict_visible`
- `signal_gap_visible`
- `timing_risk_active`
- `dependency_ready`
- `strategic_refresh_needed`
- `president_attention_needed`

Each state must preserve:

- current strategic focus
- current priority set
- next expansion gate
- timing condition
- dependency condition
- operating signals
- CEO note
- President-facing summary

---

## 9. Shared Company Record Requirement

Strategy Director must operate on the same company truth used by the rest of AI-ABCX.

Required launch fields:

- current strategic focus
- next expansion gate
- active priorities
- decision horizon
- focus drift flag
- timing risk level
- dependency readiness
- supporting operating signals
- board alignment state
- President-facing note

Strategy must never become a detached planning subsystem with its own separate truth.

---

## 10. Product Surfaces

Strategy Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Executive Summary

Purpose:

- show the current strategic direction of the company
- summarize what stays fixed and what may expand next

Required visibility:

- current strategic focus
- next expansion gate
- decision horizon
- timing risk
- alignment status

### Surface 2. Priorities

Purpose:

- show the narrow set of business priorities that should drive current action

Required visibility:

- top priorities
- conflicting priorities
- over-breadth warnings
- fixed-vs-expand distinction

### Surface 3. Risks

Purpose:

- make strategic drift and premature expansion visible

Required visibility:

- focus drift
- timing risk
- unsupported expansion attempts
- signal gaps

### Surface 4. Dependencies

Purpose:

- show whether the company is actually ready for the next level of complexity

Required visibility:

- dependency readiness by lane
- blocked expansions
- lanes requiring stabilization first

### Surface 5. Decision Horizon Summary

Purpose:

- frame what should happen now, later, and not yet

Required visibility:

- current month focus
- next 30-day gate
- next 90-day growth path

---

## 11. Business Logic

Strategy Director should behave like an operating governor, not a passive dashboard.

Core rules:

1. if core lanes are unstable, broader expansion should be slowed
2. if focus drift increases, priority narrowing should be recommended
3. if dependencies for the next gate are not ready, expansion should be blocked or delayed
4. if operating truth supports expansion, next-step activation should become visible
5. if leadership intent conflicts with readiness, the conflict should be surfaced clearly
6. if multiple growth paths compete, the system should recommend sequencing
7. strategy should continuously translate operating truth into President-facing direction

Strategy outputs should stay concise, decision-oriented, and human-readable.

---

## 12. Dependencies

Strategy Director depends on strong shared truth from multiple lanes.

Hard dependencies:

- `Executive Reporting Director`
- `Accountability Director`
- `Service Director`
- `Scheduling Director`
- `Revenue Control Director`
- `Reconciliation Director`

Strong optional dependencies:

- `Sales Director`
- `Lead Generation Director`
- `Marketing Director`
- `Advertising Director`
- `Website Director`

Strategy Director should synthesize across these directors, but should not duplicate their detailed workflows.

---

## 13. A / B / C Definition

### Level A

Level A Strategy Director is focused direction and gate discipline.

Includes:

- current strategic focus
- visible next expansion gate
- narrow priority set
- basic strategy risk visibility
- simple timing discipline

Best fit:

- smaller service businesses
- owner-led companies
- businesses needing disciplined direction more than complex planning

### Level B

Level B Strategy Director adds stronger prioritization and planning intelligence.

Includes everything in A, plus:

- stronger expansion timing logic
- priority conflict detection
- stronger department alignment framing
- clearer 30-day decision horizon
- stronger dependency mapping

Best fit:

- growing businesses
- companies activating more directors
- owners trying to scale without losing focus

### Level C

Level C Strategy Director adds advanced growth-orchestration logic.

Includes everything in B, plus:

- richer strategic scenario framing
- stronger cross-lane synthesis
- staged expansion management
- more autonomous recommendation logic
- stronger sequencing of broader system activation

Best fit:

- larger or scaling service businesses
- companies with multiple simultaneous growth pressures
- businesses seeking broader automation without strategic drift

---

## 14. Pricing Direction

Strategy Director is not a commodity director.

Its pricing should reflect:

- cross-lane synthesis value
- growth-timing value
- risk reduction value
- expansion-sequencing value

Commercially it fits best:

- as part of larger executive bundles
- inside full-system recommendations
- inside higher-maturity company configurations

It should not be the first low-cost standalone upsell.

---

## 15. Diagnostic Recommendation Logic

Strategy Director should be recommended when:

- the business has multiple simultaneous priorities
- the owner expresses growth intent but unclear sequencing
- departments are likely to pull in different directions
- the company is activating several directors at once
- the business needs help deciding what comes first
- there is visible risk of premature scaling

It should become strongly recommended when:

- the customer wants broader automation
- the customer wants full-system configuration
- the customer expects meaningful growth in staff, leads, or service volume

---

## 16. Recommended Diagnostic Questions

Step 1 and later diagnostic stages should capture strategic fit through simple business-language questions.

Recommended inputs:

- “What do you want to improve first?”
- “What feels most disorganized in the business today?”
- “Are you trying to grow, stabilize, or both?”
- “What do you want the business to look like in 6 to 12 months?”
- “Do you plan to add more people, more leads, or more automation soon?”
- “What usually causes confusion in decision-making today?”
- “Do you feel your company is ready for more complexity right now?”

These questions help Strategy Director frame intent against readiness.

---

## 17. Dashboard Requirements

Strategy Director must surface on the President Dashboard as a true executive lane.

Required dashboard outputs:

- current strategic focus
- next expansion gate
- active priorities
- timing risk
- dependency readiness
- focus drift alerts
- CEO strategic note

The President should be able to understand the company path in seconds.

---

## 18. Launch Test Scenarios

Strategy Director is not launch-ready until it passes at least these scenarios:

1. narrow-focus owner-led company needing stabilization first
2. growth-minded company trying to activate too many directors at once
3. partial-system customer with clear near-term priorities
4. larger company ready for broader staged activation
5. company with conflicting priorities across operations, revenue, and marketing
6. company where operating truth shows expansion is not yet safe
7. company where dependencies are satisfied and next expansion is valid

Each scenario should produce a clear focus recommendation, clear next gate, and readable President-facing rationale.

---

## 19. Launch Exit Condition

Strategy Director is launch-ready only when:

- strategic focus is visible and understandable
- next expansion gate is clearly defined
- timing risk is surfaced correctly
- focus drift and priority conflict are detectable
- dependencies are connected to real operating truth
- President-facing strategy outputs are concise and useful
- A / B / C differentiation works cleanly

If these are missing, the director remains conceptually strong but operationally incomplete.

---

## 20. Build Priority

Strategy Director is a `Wave 4` build priority.

It should be implemented after the main operational and growth lanes exist, because it depends on live truth from those lanes.

However, it should be one of the first Wave 4 executive directors built because:

- it anchors the CEO lane
- it governs expansion logic
- it improves full-system recommendation quality
- it helps unify pricing, qualification, and activation logic

---

## 21. Final Product Statement

Strategy Director is the AI-ABCX business-path and timing-discipline director.

It keeps the company focused on the right priorities, shows what should stay fixed, identifies the next valid expansion gate, and helps the President grow the business in the right order.

It is not generic strategy advice.

It is a President-visible operating director that turns company truth into direction, timing discipline, and safer expansion.
