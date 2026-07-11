# AI-ABCX Dashboard Architecture Map

This document defines how dashboards should be structured across AI-ABCX.

It explains:

- which modules have dedicated dashboards
- who uses each dashboard
- what each dashboard writes into the CRM backbone
- what the President sees from each dashboard
- which dashboards may require extra paid user access

This is meant to keep the system operationally usable without breaking the unified corporate structure.

---

## 1. Core Dashboard Rule

AI-ABCX should not behave like one flat dashboard for everyone.

It should have:

- `President Dashboard` as the unified executive command layer
- module-specific operational dashboards where needed
- all module truth rolling back into President Core and CRM

So the architecture is:

- one executive view
- multiple specialized workspaces
- one shared operating truth layer

---

## 2. Permanent Dashboard Anchors

### President Dashboard

Always included.

This is the main executive command center.

It must show:

- company structure
- active modules
- top-level summaries
- important queues
- recommendations
- cross-module pressure
- accountability visibility

### CRM Backbone

The CRM is not always just one customer-facing dashboard page.

It is the shared truth system behind all dashboards.

It may also have its own focused operating surfaces, but conceptually it remains the system backbone, not just another panel.

---

## 3. Main Dashboard Categories

There should be three dashboard categories.

### 3.1 Executive Dashboard

- President Dashboard

### 3.2 Module Dashboards

- dedicated workspaces for module operators or the President

### 3.3 Role Dashboards

- task-oriented dashboards for role-specific users such as sales or field workers

---

## 4. Dashboard Map By Module

| Module | Dedicated Dashboard? | Primary User | CRM Writes | President Roll-Up |
|---|---|---|---|---|
| President Core | Yes | President | Executive notes, overrides, direction, priorities | N/A, this is the main roll-up layer |
| CRM | Yes / shared surfaces | President, admin, managers | Shared record truth, lifecycle updates, notes, ownership, status, outcome | Full system truth source |
| Call Handling | Yes | President by default, call manager later if sold | intake records, transcripts, recordings, intent, urgency, qualification | call quality, call volume, intake outcomes, source quality |
| Dispatcher | Yes | President by default, dispatcher/coordinator if seat added | assignment state, confirmation state, scheduling state, reroute/hold/reschedule data | scheduling pressure, assignment pressure, exception visibility |
| Closeout | Yes | President by default, operations/admin role if seat added | outcome truth, amount paid, close/follow-up state | unresolved outcomes, payment truth, closeout pressure |
| President Follow-Up | Yes | President by default, support/admin role if seat added | follow-up reason, next-step ownership, unresolved business continuity | unresolved opportunity pressure, follow-up risk, next action pressure |
| Marketing | Yes | President by default, marketing manager if seat added | source truth, campaign context, attribution notes, reactivation activity | growth visibility, source quality, campaign performance, growth recommendations |
| Accounting | Future yes | finance/accounting role | revenue truth, expense truth, collections, reconciliation | financial health, cash and control visibility |
| HR | Future yes | HR / people manager | people records, staffing state, reviews, role accountability | workforce visibility, people risk, personnel accountability |

---

## 5. Role Dashboards

These are operational role-specific dashboards, not core executive module dashboards.

### Sales Dashboard

Primary users:

- sales rep
- estimate/sales owner

Purpose:

- view assigned sales opportunities
- confirm availability if part of the flow
- update estimate and sales result
- push notes back into CRM

### Field Dashboard

Primary users:

- service technician
- field worker

Purpose:

- view assigned service jobs
- confirm availability if part of the flow
- update job progress
- submit completion notes
- push execution truth back into CRM and Closeout

These role dashboards are especially relevant when certain operational modules move into B-level automation and beyond.

---

## 6. President Roll-Up Rule

Every major module dashboard must roll visible truth back into President Dashboard.

That means the President should see:

- what the module is doing
- where it is weak or blocked
- what needs attention
- what revenue or operational consequences exist

No module dashboard should become a disconnected island.

---

## 7. Extra User Access Rule

Dedicated dashboards beyond the President’s own access can be sold as additional paid seats.

That means:

- the module can be active without automatically including unlimited user dashboards
- the President may operate the module alone at first
- additional role-specific or module-specific user access can be added later

Examples:

- add one Dispatcher dashboard seat
- add one Marketing dashboard seat
- add one Sales dashboard seat
- add three Field dashboard seats

This separates:

- system function activation
from
- extra user access

---

## 8. Dashboard Commercial Rule

The commercial model should distinguish between:

1. module activation
2. additional user dashboards

So a customer can buy:

- `Dispatcher A`

without automatically buying:

- an extra dedicated dispatcher user dashboard seat

That seat can be added later if the company wants someone besides the President to manage that function directly.

---

## 9. Launch Dashboard Recommendation

At launch, the most important dashboards are:

- President Dashboard
- CRM / job truth surfaces
- Call Handling Dashboard
- Dispatcher Dashboard
- Closeout Dashboard
- President Follow-Up Dashboard
- optionally Marketing Dashboard if Marketing launches in Stage A

Role dashboards:

- Sales Dashboard
- Field Dashboard

should remain more relevant as Stage B operational automation expands.

---

## 10. Dashboard Dependency Rule

A dedicated dashboard should only exist if:

- the module has enough real function to justify focused work
- the dashboard writes meaningful truth back into CRM
- the President still receives meaningful roll-up visibility

This prevents unnecessary dashboard proliferation.

---

## 11. Dashboard Design Rule

Every dashboard should reflect its place in the corporate system.

That means:

- President Dashboard = executive command
- module dashboards = focused operational workspaces
- role dashboards = task execution workspaces

Each one should feel related, but clearly differentiated in purpose.

---

## 12. Main Definition

AI-ABCX dashboard architecture should be defined as:

`President Dashboard at the top, CRM as the shared truth center, module dashboards as focused workspaces, and role dashboards as paid operational access layers`

This is the governing dashboard structure for the system.
