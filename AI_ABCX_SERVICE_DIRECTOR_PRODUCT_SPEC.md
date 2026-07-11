# AI-ABCX Service Director Product Spec

This document defines the implementation-grade product specification for `Service Director`.

It takes the benchmark research, launch checklist, pricing logic, and wave planning and turns them into one practical build target.

Service Director is one of the first Wave 2 launch directors because it protects job execution continuity after work is assigned, keeps completion truth visible, and turns service delivery into a President-visible operating lane instead of a hidden back-office workflow.

---

## 1. Product Identity

### Public name

`Service Director`

### Executive owner

`COO`

### Mission

Service Director keeps active service work visible from assignment through completion, preserves field notes and outcome truth, surfaces service issues early, and protects operating throughput under President oversight.

### Core promise

Service Director should not feel like generic “job tracking.”

It should promise:

- clearer visibility into what work is actually happening
- fewer jobs falling into silent operational gaps
- stronger backlog and completion control
- better issue visibility before customer damage happens
- stronger continuity between operations and customer experience
- President-level visibility into real service reality

---

## 2. Strategic Role Inside AI-ABCX

Service Director is the job-execution and completion-continuity lane of the system.

It manages the operating span between:

`assigned work -> in-field execution -> issue handling -> completion truth -> downstream follow-through`

It is strategically important because:

- captured demand does not create results unless work is actually completed well
- many service businesses lose control after the appointment is booked
- field execution needs its own discipline beyond scheduling and dispatch
- service issues often become follow-up, review, revenue, and retention problems if not made visible early
- the President should see execution health without micromanaging every job

Service Director can be:

- a standalone execution-visibility director
- part of an operations bundle
- part of a full-system recommendation

---

## 3. Benchmark Position

### Strongest outside benchmarks

- `ServiceTitan`
- `Housecall Pro`
- `Jobber`
- `FieldPulse`
- `Workiz`

### What they do well

- active job visibility
- completion tracking
- issue awareness
- field note continuity
- backlog visibility
- service status clarity

### What AI-ABCX must match

- visible active jobs
- visible completed and delayed jobs
- issue visibility
- backlog awareness
- field-note continuity
- operational status clarity

### Where AI-ABCX should beat them

- service truth reports directly into President control
- the same shared record survives from intake through completion and follow-up
- service pressure connects to Scheduling, Dispatch, Support, Retention, Revenue Truth, and Follow-Up in one operating model
- execution becomes an executive-visible corporate lane instead of only field software

---

## 4. Ideal Customer Fit

Service Director is a strong fit for:

- companies delivering recurring or appointment-based services
- businesses with multiple open jobs moving through active execution
- teams where backlog, delays, and service issues can pile up
- companies where field notes and completion truth matter to billing or follow-up
- service businesses where customer experience depends on operational follow-through

It is especially strong for:

- home services
- route-based field teams
- mixed sales-and-service companies
- recurring service businesses
- companies trying to improve throughput, visibility, and completion discipline

---

## 5. Required User Outcomes

Service Director must let a business owner say:

- “I can see what work is actively happening.”
- “I can see what was completed and what is stuck.”
- “I know where the service bottlenecks are.”
- “I know which jobs have issues before customers escalate them.”
- “Field notes and outcomes do not disappear.”
- “The President Dashboard shows service pressure clearly.”
- “Operations truth stays connected to customer truth.”

---

## 6. Functional Scope

Service Director must cover eight major functions:

1. active job visibility
2. completion tracking
3. delayed-job visibility
4. service issue visibility
5. backlog awareness
6. field-note and completion-note continuity
7. follow-through visibility
8. President-visible service pressure

---

## 7. Service Categories

Service Director must support category-aware execution logic.

Launch-required categories:

- active jobs
- completed jobs
- delayed jobs
- issue-flagged jobs
- backlog items
- completion-risk items
- field-note-dependent items
- service-follow-through items

Each category should remain distinct inside the system and inside reporting surfaces.

---

## 8. Required Service States

Service Director needs its own execution states while still staying tied to the same shared job record.

Launch-required states:

- `job_active`
- `job_completed`
- `job_delayed`
- `service_issue_open`
- `backlog_visible`
- `completion_risk`
- `field_notes_pending`
- `follow_through_needed`
- `customer_impact_risk`
- `president_attention_needed`

Each state must preserve:

- current owner
- job identity
- service status
- issue notes
- field notes
- next expected action
- customer impact
- President-visible summary

---

## 9. Shared Job Record Requirement

Service Director must operate on the same record used by the rest of AI-ABCX.

Required launch fields:

- customer identity
- job identity
- scheduled window
- assigned worker or crew
- service status
- field notes
- completion notes
- issue status
- follow-up status
- revenue or business-impact context
- President-visible summary state

Service must never become a detached subsystem with its own separate business truth.

---

## 10. Product Surfaces

Service Director must not launch as hidden logic only.

It needs visible product surfaces.

### Surface 1. Executive Summary

Purpose:

- show the current service operating picture
- summarize completion, backlog, and issue pressure

Required visibility:

- active jobs
- completed jobs
- delayed jobs
- open service issues
- backlog pressure
- completion risk

### Surface 2. Priorities

Purpose:

- show which jobs or service problems need immediate attention

Required visibility:

- issue-flagged jobs
- delayed jobs
- high-risk backlog items
- customer-impact-risk items

### Surface 3. Active Service Board

Purpose:

- show what is happening now across the service lane

Required visibility:

- job
- status
- assigned owner
- scheduled or active window
- note state
- issue state

### Surface 4. Risk View

Purpose:

- surface service problems before they become customer, revenue, or reputation damage

Required visibility:

- issue age
- delayed status
- follow-through gap
- field-note gap
- customer-impact warning

### Surface 5. President Dashboard Summary

Purpose:

- give the President a top-line reading of service health

Required visibility:

- throughput health
- backlog health
- issue count
- completion truth
- next recommended action

---

## 11. Business Logic

Service Director must apply clear operating logic.

Core launch logic:

1. Every active job must remain visible until completion truth exists.
2. A completed job is not fully resolved if outcome notes or downstream follow-through are still missing.
3. Delays must remain visible instead of disappearing into inactive status.
4. Open service issues must escalate service pressure.
5. Missing field notes or completion notes should create visibility gaps, not silent closure.
6. Customer-impact-risk jobs must remain President-visible.
7. Backlog should be measured as an operating-control problem, not just a count.

---

## 12. Dependencies

Service Director has meaningful dependencies, but it can still operate independently once work exists.

### Can operate with:

- existing manual lead sources
- manual scheduling
- manual dispatch
- standalone service execution tracking

### Strongest paired combinations:

- `Scheduling Director + Service Director`
- `Dispatch Director + Service Director`
- `Support Director + Service Director`
- `Retention Director + Service Director`
- `Follow-Up Director + Service Director`

### Strongest full operations bundle:

- `Scheduling Director`
- `Dispatch Director`
- `Service Director`
- `Support Director`
- `Retention Director`

---

## 13. A / B / C Definition

### Level A

- active service throughput visible
- completed and open jobs visible
- delayed jobs visible
- service issues visible
- field reporting usable
- President can see operational health

### Level B

- stronger service coordination
- clearer bottleneck logic
- better backlog and issue control
- stronger handoff to Support, Retention, and Follow-Up
- stronger completion discipline

### Level C

- advanced execution orchestration
- predictive service-pressure awareness
- richer issue and exception handling
- deeper cross-lane coordination
- stronger executive visibility into throughput and service health

### Level X

- future autonomous service governance
- predictive completion management
- self-improving execution logic
- deeper board-level accountability

---

## 14. Pricing Direction

Service Director pricing should not be positioned as “job tracking software.”

It should be positioned as:

- execution control
- completion visibility
- issue detection
- throughput discipline
- President-visible service truth

Commercially, Service Director can be:

- a standalone operational-control director
- part of a bundle
- part of a full-system recommendation

Exact pricing can be finalized later inside the broader pricing architecture.

---

## 15. Diagnostic Recommendation Logic

Service Director should be recommended when Step 1 or later qualification shows:

- work is being completed by multiple people or crews
- open jobs become hard to monitor
- backlog exists
- delays are common
- field notes are inconsistent
- customer experience suffers after scheduling
- the owner wants better visibility into real execution

It should be strongly recommended when the business says:

- “We do not always know what is happening once the job starts.”
- “Some jobs fall through after they are assigned.”
- “We need stronger control over completion and issues.”
- “We want the owner to see operational health clearly.”

---

## 16. Recommended Diagnostic Questions

Service Director qualification should include questions like:

1. How many active jobs do you usually have in motion at one time?
2. Do delays or incomplete jobs sometimes become difficult to track?
3. Do your field teams leave consistent notes and outcome updates today?
4. When a job has an issue, how quickly does the office usually see it?
5. Do customers ever feel the job was “still open” even when your team believed it was done?
6. Is backlog visibility important for your current business goals?
7. Do you want the owner or President view to show real service pressure clearly?

---

## 17. Dashboard Requirements

Service Director must provide clear dashboard behavior.

### Required launch blocks

- Active service count
- Completed service count
- Delayed jobs count
- Open issue count
- Backlog pressure indicator
- Completion-risk indicator

### Required launch drill-ins

- active jobs list
- delayed jobs list
- issue-flagged jobs
- backlog items
- jobs missing notes or follow-through

### President-facing summary language must answer:

- What is actively happening?
- What is delayed?
- What is blocked?
- What is at risk?
- What action is recommended next?

---

## 18. Launch Test Scenarios

Service Director is not launch-ready unless these scenarios work:

1. A job is active and remains visible until completion truth is entered.
2. A job is delayed and appears in service risk view.
3. A service issue is opened and escalates visibility.
4. Field notes are missing and the system preserves the gap visibly.
5. Backlog grows and the Executive Summary reflects pressure accurately.
6. A completed job still needing follow-through remains visible.
7. Service pressure appears inside President Dashboard summary correctly.
8. Service data stays connected to Scheduling, Dispatch, and Follow-Up truth.

---

## 19. Launch Exit Condition

Service Director is launch-complete only when:

- active work is clearly visible
- completed and delayed work stay distinguishable
- service issues are surfaced early
- field notes and completion truth are preserved
- backlog pressure is visible
- President can see service health clearly
- A / B / C positioning is coherent
- standalone and bundled recommendation logic is credible

---

## 20. Build Priority

Service Director is a `Wave 2` priority director.

It belongs immediately after:

- `Scheduling Director`
- `Dispatch Director`

because once appointments and assignment movement are visible, AI-ABCX must show whether work is actually being executed and completed correctly.

---

## 21. Final Product Statement

Service Director is the AI-ABCX director that protects execution reality after work is assigned.

It makes active service, delays, issues, backlog, completion truth, and field continuity visible inside one connected corporate operating system, so the President can see what work is really happening and what needs action next.
