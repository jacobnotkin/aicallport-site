# Bring Corporate Structure to Service Businesses

# AI-ABC Implementation Layer Map

## Purpose

This document maps the current codebase into:

- shared core
- Stage A implementation layer
- Stage B implementation layer
- Stage C implementation layer

It is the bridge between architecture and actual code.

It exists so future work can answer:

- which files are permanent core infrastructure
- which files already express Stage A behavior
- which behaviors are reserved for Stage B
- which behaviors are reserved for Stage C
- where the current implementation still diverges from the intended architecture

---

## Core Principle

The codebase should evolve as:

- one shared implementation foundation
- additive stage layers
- milestone backups for safety

It should not evolve as three or four competing full product branches.

This means every implementation decision should first answer:

- is this shared core
- is this Stage A
- is this Stage B
- is this Stage C

---

# 1. Current Shared Core Files

These files are already functioning as shared core infrastructure.

## [ai-abc-config.js](/Users/yakovnotkin/Documents/New project/ai-abc-config.js)

### Shared-core responsibility

- normalizes company configuration
- builds module configuration
- builds access profile
- builds workflow configuration
- builds role configuration
- enriches company view-model labels

### Why it is core

Every stage depends on normalized company identity, workflow flags, module flags, and labels.

This file should remain a permanent core contract.

### Core expansion needed

It should later include:

- customer origin model
- referral port configuration
- legacy import defaults
- stage interface flags

---

## [ai-abc-modules.js](/Users/yakovnotkin/Documents/New project/ai-abc-modules.js)

### Shared-core responsibility

- defines module registry
- builds module context
- controls module visibility
- decorates owner modules by state

### Why it is core

This is one of the main gating layers between architecture and visible product behavior.

Every stage depends on stable module gating.

### Core expansion needed

It should later support:

- explicit stage-interface boundaries
- limited Stage A visibility for future Stage B roles
- finer-grained dashboard capability states such as:
  - active
  - limited
  - locked
  - future

---

## [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js)

### Shared-core responsibility

- creates normalized role objects
- builds the role registry
- defines reporting relationships
- defines stage dependencies
- defines module dependencies

### Why it is core

The corporate structure depends on one role system.

The reporting hierarchy, dashboards, scorecards, and routing logic all depend on it.

### Current limitation

The current implementation still makes many operational roles appear only when scheduling is enabled.

That means it is still biased toward:

- Stage A = communication only
- Stage B = service/sales/operations structure begins

But the newer architecture direction is:

- Stage A already includes limited manual sales and service workflows
- Stage A can already include a limited operations and financial structure

### Core correction needed

The role registry should be refactored so it supports:

- Stage A active roles
- Stage B expanded roles
- Stage C advanced governance roles

instead of treating most downstream roles as scheduling-only.

---

## [ai-abc-data.js](/Users/yakovnotkin/Documents/New project/ai-abc-data.js)

### Shared-core responsibility

- generates CRM clients
- generates owner action stores
- generates overview bundle data
- creates synthetic state for the owner dashboard

### Why it is core

This file is already acting like the shared system-data generator behind the dashboards.

### Core expansion needed

It should later generate:

- true customer-origin-coded records
- referral records
- legacy import records
- owner-entered sales leads
- owner-entered service records
- Stage A limited sales/service activity
- Stage B scheduling execution activity
- Stage C governance activity

---

## [ai-abc-reporting.js](/Users/yakovnotkin/Documents/New project/ai-abc-reporting.js)

### Shared-core responsibility

- translates role relationships into reporting structure

### Why it is core

The President dashboard, CEO summaries, and company structure all depend on one reporting hierarchy.

---

## [ai-abc-accountability.js](/Users/yakovnotkin/Documents/New project/ai-abc-accountability.js)

### Shared-core responsibility

- builds seed accountability events
- builds President activity summary
- builds role scorecards

### Why it is core

Accountability is not a late-stage add-on.

It is a permanent layer of the operating structure.

### Core expansion needed

It should later separate:

- Stage A accountability events
- Stage B execution events
- Stage C governance events

without changing the base event shape.

---

# 2. Current Shared Owner Surface

## [owner-dashboard-live.html](/Users/yakovnotkin/Documents/New project/owner-dashboard-live.html)

### Current role

This is now the real live owner/president dashboard surface.

It is no longer only a demo shell.

### Why it is shared core plus stage expression

The file contains:

- shared president shell structure
- shared executive sections
- shared reporting zones
- stage-gated cards and metrics

It should remain the one live President dashboard, while its contents change by:

- module gating
- role registry
- stage interface
- company configuration

### Rule

This file should not split into separate Stage A, Stage B, and Stage C dashboard files.

It should remain one dashboard shell with additive stage behaviors.

---

# 3. Current Stage A Implementation Layer

Stage A in the current codebase mostly lives in:

- `ai-abc-config.js`
- `ai-abc-modules.js`
- `ai-abc-data.js`
- `owner-dashboard-live.html`
- `step1.html`
- `step2.html`
- `step3.html`
- `prelaunch-page.html`

## Stage A currently expresses

- company intake and activation setup
- call-handling-first module gating
- CRM/client generation
- inbound opportunity framing
- legacy CRM import references
- outbound follow-up references
- owner dashboard communication-oriented metrics
- referral module visibility in the owner surface

## Stage A should formally own

- AI call handling
- qualification
- transcripts and recordings
- customer ID creation
- customer origin routing
- referral intake
- legacy import activation
- owner-entered next-step routing
- manual sales follow-up support
- manual service follow-up support
- estimate placeholder logic
- completion placeholder logic
- owner financial confirmation placeholders

## Key implementation gap

The current code still under-represents Stage A operational roles.

It has the communication layer, but it does not yet fully express:

- sales-dashboard logic in limited Stage A mode
- service-dashboard logic in limited Stage A mode
- manual pre-scheduling appointment handling
- origin-based customer routing records

That gap should be the next implementation target.

---

# 4. Current Stage B Implementation Layer

Stage B is only partially represented in the current code.

## Stage B is currently expressed through

- scheduling module flags in `ai-abc-config.js`
- scheduling module visibility in `ai-abc-modules.js`
- scheduling-dependent roles in `ai-abc-role-registry.js`
- scheduling-aware dashboard text in `ai-abc-data.js`

## What exists now

- scheduling as a gated concept
- service and sales dashboards as gated concepts
- COO and CFO as gated concepts
- execution-oriented copy in architecture and specs

## What does not yet fully exist

- true automatic scheduling logic
- availability matching
- confirmation workflow engine
- automatic reminder workflow
- automatic rerouting logic
- real service dashboard behavior
- real sales dashboard behavior
- structured appointment lifecycle records

## Stage B rule

When implemented, Stage B must consume Stage A outputs instead of replacing them.

---

# 5. Current Stage C Implementation Layer

Stage C is represented mostly as a structural placeholder today.

## Stage C is currently expressed through

- advanced-management flags in `ai-abc-config.js`
- advanced-management module visibility in `ai-abc-modules.js`
- CAO and governance roles in `ai-abc-role-registry.js`
- governance-oriented action generation in `ai-abc-data.js`

## What exists now

- governance as a recognized stage
- advanced-management as a gated layer
- CAO and governance director roles
- some owner-facing escalation language

## What does not yet fully exist

- real approvals engine
- real escalation routing
- real workflow enforcement
- real outcome checking
- real governance summary generation

Stage C should remain additive and optional until those behaviors are fully built.

---

# 6. Immediate Code Classification

## Shared core now

- [ai-abc-config.js](/Users/yakovnotkin/Documents/New project/ai-abc-config.js)
- [ai-abc-modules.js](/Users/yakovnotkin/Documents/New project/ai-abc-modules.js)
- [ai-abc-role-registry.js](/Users/yakovnotkin/Documents/New project/ai-abc-role-registry.js)
- [ai-abc-reporting.js](/Users/yakovnotkin/Documents/New project/ai-abc-reporting.js)
- [ai-abc-accountability.js](/Users/yakovnotkin/Documents/New project/ai-abc-accountability.js)
- [ai-abc-data.js](/Users/yakovnotkin/Documents/New project/ai-abc-data.js)
- [owner-dashboard-live.html](/Users/yakovnotkin/Documents/New project/owner-dashboard-live.html)

## Stage A-heavy surfaces now

- [prelaunch-page.html](/Users/yakovnotkin/Documents/New project/prelaunch-page.html)
- [step1.html](/Users/yakovnotkin/Documents/New project/step1.html)
- [step2.html](/Users/yakovnotkin/Documents/New project/step2.html)
- [step3.html](/Users/yakovnotkin/Documents/New project/step3.html)

## Stage B not yet fully implemented

- future scheduling engine
- future sales dashboard live behavior
- future service dashboard live behavior

## Stage C not yet fully implemented

- future governance engine
- future approvals engine
- future escalations engine

---

# 7. Recommended Next Implementation Changes

The next practical implementation pass should focus on Stage A correctness.

## Recommended next changes

### 1. Extend `ai-abc-config.js`

Add:

- customer origin model
- origin routing defaults
- referral port flags
- Stage A limited sales/service behavior flags

### 2. Refactor `ai-abc-role-registry.js`

Allow limited Stage A activation for:

- Sales Director
- Sales Staff
- Service Director
- Service Staff
- limited COO visibility
- limited CFO visibility

without requiring scheduling automation to exist yet.

### 3. Extend `ai-abc-data.js`

Generate real Stage A records for:

- new inbound customers
- legacy uploaded customers
- referral customers
- owner-entered sales leads
- owner-entered service jobs

### 4. Preserve Stage B boundaries

Do not implement:

- automatic availability matching
- automated confirmations
- automated rerouting

inside Stage A data behavior.

Those should stay reserved for Stage B.

---

# 8. Decision Rule For Future Coding

Before editing a file, the team should ask:

## Is this core?

If yes:

do not tie it to one stage only.

## Is this Stage A?

If yes:

make sure it still works without B or C.

## Is this Stage B?

If yes:

consume A outputs; do not replace A ownership.

## Is this Stage C?

If yes:

consume A and B outputs; do not replace their contracts.

---

# 9. Core Principle

The implementation should grow the same way the company structure grows:

- one foundation
- new departments added over time
- earlier departments remain functional

The code rule should be:

`Shared files stay shared.`

`Stage layers stay additive.`

`Later work must not break earlier operating truth.`
