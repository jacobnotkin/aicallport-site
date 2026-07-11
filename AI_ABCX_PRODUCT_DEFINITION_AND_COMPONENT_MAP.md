# AI-ABCX Product Definition And Component Map

This document defines the working product shape of `AI-ABCX` as it stands now.

It is intended to keep:

- product messaging stable
- stage logic consistent
- screen-building decisions aligned
- component decisions separate from upgrade decisions

---

## 1. Product Definition

`AI-ABCX` is the executive operating system for small and medium sized service businesses.

Core product line:

`AI-ABCX brings corporate structure to service businesses.`

`You lead as President.`

The product is not just a dashboard.

It is a staged management system that:

- shows full company structure early
- gives the owner a President-level control position
- converts calls, appointments, jobs, outcomes, and follow-up into structured business truth
- adds management depth in stages
- moves toward advanced management automation over time

---

## 2. Core Product Promise

AI-ABCX should help a service business move from:

- owner memory
- informal scheduling
- scattered follow-up
- unclear accountability
- weak management visibility

to:

- structured company roles
- President-led management oversight
- connected job truth
- visible executive responsibility
- staged operating control

---

## 3. Stage Model

## Stage A

`Stage A` is the foundational operating structure.

It is the first public release stage.

Its purpose is to provide:

- the President dashboard as the top control surface
- visible full company structure
- lean but real operating truth
- manual scheduling with structured reporting
- revenue and follow-up visibility

Stage A is not full automation.

It is assisted management structure.

## Stage B

`Stage B` is the scheduling and operational depth expansion stage.

Its purpose is to add:

- automated scheduling
- worker assignment flow
- worker confirmation
- customer confirmation
- worker result entry
- deeper operational control on the same shared record model

Stage B should not be treated as a generic unlock of every future department.

## Stage C

`Stage C` is the advanced management automation layer.

Its purpose is to add:

- deeper executive control
- system-wide accountability pressure
- people-management base
- ratings and scoring across the company
- recommendations and improvement guidance
- stronger management automation

Stage C is where the system becomes a much deeper management engine.

---

## 4. Component Model

The product should be understood in components, not only screens.

Each component belongs to one of three groups:

- `Core Foundation`
- `Core Operational Depth`
- `Optional Upgrade System`

---

## 5. Core Foundation Components

These components define the base AI-ABCX system.

| Component | Purpose | Stage A | Stage B | Stage C | Classification |
|---|---|---|---|---|---|
| President Dashboard | Top-level command center for the owner | Active | Active | Active / deeper | Core Foundation |
| Company Structure Map | Shows executives, directors, and department structure | Active | Active | Active | Core Foundation |
| Stage Activation Logic | Controls what is visible, active, limited, or future | Active | Active | Active | Core Foundation |
| Executive / Director Activation Model | Governs role-based surface behavior | Active | Active | Advanced | Core Foundation |
| Shared Job Record | Unified truth record for appointment and business outcome | Active | Active | Active | Core Foundation |
| AI Call Intake Linkage | Connects call output to structured record creation | Active | Active | Active | Core Foundation |
| President Follow-Up Logic | Keeps unresolved business outcomes alive | Active | Active | Advanced | Core Foundation |
| Outcome / Revenue Truth Model | Stores result truth and amount paid truth | Active | Active | Advanced | Core Foundation |
| Status / Workflow State Model | Defines job state transitions | Active | Active | Advanced | Core Foundation |
| Cross-Screen Context Routing | Keeps job, stage, and follow-up context aligned | Active | Active | Active | Core Foundation |

---

## 6. Core Operational Depth Components

These are part of core AI-ABCX, but they deepen as stages open.

| Component | Purpose | Stage A | Stage B | Stage C | Classification |
|---|---|---|---|---|---|
| Scheduling Engine | Controls appointment movement | Manual | Automated | Advanced | Core Operational Depth |
| Job Records Surface | President-facing job truth editor and review screen | Active | Active | Advanced | Core Operational Depth |
| Notifications Board | Tracks confirmation messages and gate pressure | Lean Active | Active | Advanced | Core Operational Depth |
| Dispatcher Dashboard | President-side scheduling control workspace for assignment pressure, routing decisions, and exceptions | Visible / limited | Active | Advanced | Core Operational Depth |
| Closeout Board | Handles structured outcome truth and payment truth | Active | Active | Advanced | Core Operational Depth |
| Sales Worker Dashboard | Personal worker view for sales path | Not active | Active | Advanced | Core Operational Depth |
| Service Worker Dashboard | Personal worker view for field/service path | Not active | Active | Advanced | Core Operational Depth |
| Executive Recommendations | Synthesizes next-step management pressure | Lean Active | Active | Advanced | Core Operational Depth |
| Accountability Layer | Keeps visible who owns what next step | Active | Active | Advanced | Core Operational Depth |
| Performance Intelligence Module | Continuous feedback, investment study, optimization, and system-improvement intelligence | Visible / activation study | Active / deeper | Advanced | Core Operational Depth |
| Ratings / Performance Layer | Scores executives, directors, systems, people | Visible / future | Visible / future | Active | Core Operational Depth |
| People Management Base | Workforce oversight and people accountability | Visible / future | Visible / future | Active | Core Operational Depth |

---

## 7. Optional Upgrade Systems

These should stay separate from the core AI-ABCX definition.

They may integrate into the system, but they should not distort the meaning of Stage A or Stage B.

| System | Purpose | Earliest Availability | Classification |
|---|---|---|---|
| Marketing System | Advertising, SEO, website, marketing execution depth | Stage C | Optional Upgrade System |
| Accounting System | Deeper accounting workflow beyond financial oversight | Stage C | Optional Upgrade System |
| Advanced HR System | Deeper HR process depth beyond base people management | Stage C or later | Optional Upgrade System |
| Outbound Follow-Up System | Database reactivation, callback campaigns, recovery flow | Separate add-on | Optional Upgrade System |
| External CRM Integration | Sync with customer-owned CRM | Add-on | Optional Upgrade System |
| Additional Language Pack | Expanded language operation | Add-on | Optional Upgrade System |

---

## 8. Executive Structure Components

These are structural components inside the President system.

| Executive Lane | Role In Product |
|---|---|
| President | Governing role; the user leads from this position |
| CEO | Synthesis, strategy, accountability, executive alignment |
| COO | Operations, scheduling, service execution, communications |
| CRO | Revenue, sales flow, reactivation, lead generation |
| CFO | Financial truth, reconciliation, revenue control |
| CSO | Customer continuity, retention, support, reviews/referrals |
| CMO | Visible early, functionally later unless upgrade path is activated |
| HR | Visible early, base people layer active in Stage C |
| CAO | Governance, approvals, compliance, risk |
| CPIO | Performance intelligence, investment study, system feedback, optimization, and improvement pressure |

---

## 9. Role-Based Screen Map

This is the current working screen map by role.

| Role / Perspective | Primary Screens |
|---|---|
| President | `new-president-dashboard.html`, `president-follow-up.html`, `job-records.html`, `notifications.html`, `dispatcher-dashboard.html`, `closeout.html` |
| Sales Worker | `sales-dashboard.html` |
| Service Worker | `field-dashboard.html` |
| Legacy / reference only | `old design/` dashboard files |

---

## 10. Screen Responsibilities

| Screen | Main Responsibility |
|---|---|
| `new-president-dashboard.html` | Main top-level operating command center |
| `president-follow-up.html` | Follow-up review, unresolved business truth, next-step pressure |
| `job-records.html` | Shared record review and truth entry |
| `notifications.html` | Manual or automated confirmation messaging pressure |
| `dispatcher-dashboard.html` | Dispatcher Dashboard inside the President system for scheduling control, reroute handling, and routing visibility |
| `closeout.html` | Outcome truth, payment truth, close vs follow-up decision |
| `sales-dashboard.html` | Sales worker assignment/result surface |
| `field-dashboard.html` | Service worker assignment/result surface |

---

## 11. Advanced Call Handling System

The advanced call handling system is a core AI-ABCX operating component.

It should not be understood as a simple answering service.

Its role is to turn inbound calls into structured business action.

### Purpose

The advanced call handling system should:

- answer inbound calls consistently
- identify caller intent
- capture business-critical information
- create or update structured job records
- push each call into the correct operating path
- feed President visibility across scheduling, follow-up, and closeout

### Main Inputs

The system receives:

- inbound customer calls
- caller questions and service needs
- requested timing information
- appointment context
- reschedule and callback requests
- escalation conditions

### Main Outputs

The system produces:

- linked customer information
- structured job number creation or update
- transcript and recording references
- detected call intent
- appointment type classification
- requested time capture
- next-step status on the shared job record
- routing into manual or automated scheduling flow

### Operating Role In AI-ABCX

The advanced call handling system is the front-end operating engine for AI-ABCX.

It feeds:

- `CRM` with customer and relationship truth
- `Dispatcher` with scheduling and routing truth
- `Job Records` with shared operational truth
- `Closeout` with outcome and payment follow-through
- `President Dashboard` with management visibility

### Stage Behavior

| Stage | Call Handling Behavior |
|---|---|
| Stage A | AI handles inbound calls, captures customer need, creates the structured record, discusses appointment timing, and tells the customer the appointment will be confirmed by a representative. Scheduling remains manual after intake. |
| Stage B | AI intake continues, but the structured record now feeds the scheduling engine, worker assignment flow, worker confirmation, customer confirmation, and automated reroute logic. |
| Stage C | Call handling remains part of a broader management engine with deeper scoring, recommendation pressure, and system-wide performance visibility. |

### Product Definition Rule

The advanced call handling system should always be described as:

- AI-led inbound call handling
- structured intake and qualification
- record creation and update logic
- workflow routing into company operations

It should not be described as only:

- phone answering
- voicemail replacement
- a script bot
- a detached call center layer

The correct product meaning is:

`It turns calls into managed business action.`

---

## 12. Base vs Upgrade Rule

The product should be sold with two separate ideas:

### Base AI-ABCX Core

This includes:

- President-centered operating structure
- executive and director structure
- shared job truth
- staged activation
- follow-up logic
- closeout logic
- Stage A / B / C management path

### Upgrade Systems

These include:

- optional integrated systems
- optional operational depth outside the core definition
- customer-specific add-ons

This keeps product clarity intact.

---

## 13. Product Packaging Rule

The system should be understood as:

1. `Stage A` = foundational operating structure
2. `Stage B` = scheduling and operational depth expansion
3. `Stage C` = advanced management automation layer
4. optional systems may attach without redefining the stage meaning

---

## 14. Working Implementation Rule

When future design or coding decisions are made:

- build around the President dashboard workflow
- treat the shared job record as a central truth object
- keep stage meaning stable
- do not describe Stage B as if it activates unrelated later systems
- keep `Closeout`, `Follow-Up`, and `Tasks` semantically distinct
- treat `Dispatcher` as a President-side scheduling control workspace, not a separate standalone core role
- treat legacy owner-dashboard files as historical reference only

---

## 15. Current Active Product Path

The active AI-ABCX workflow now centers on:

- `new-president-dashboard.html`
- `president-follow-up.html`
- `job-records.html`
- `notifications.html`
- `dispatcher-dashboard.html`
- `closeout.html`
- `sales-dashboard.html`
- `field-dashboard.html`

That is the live product path to keep building from here.
