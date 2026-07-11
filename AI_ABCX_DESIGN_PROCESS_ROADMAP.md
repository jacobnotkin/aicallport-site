# AI-ABCX Design Process Roadmap

This document defines the structured design process for AI-ABCX.

Its purpose is to keep the product moving in a disciplined order so design, architecture, pricing, activation, and UI do not drift in too many directions at once.

The core reason for this roadmap is simple:

- AI-ABCX is now a large corporate system idea
- many concepts are already strong
- the main risk is no longer lack of ideas
- the main risk is uncontrolled scope and design drift

This roadmap is meant to prevent that.

---

## 1. Core Process Rule

The correct design order is:

`Architecture -> Release Map -> Module Specs -> Dashboard Map -> Activation Flow -> Commercial Model -> UI Execution`

This order should guide the work from here.

---

## 2. Phase 1: Lock Architecture

### Goal

Define the non-negotiable structural rules of the system.

### What must be locked

- President Core always included
- CRM always included
- CRM as the shared operating backbone
- modules connect around the CRM backbone
- A / B / C / X as automation levels
- future modules must also use the A / B / C / X ladder
- modular sales must still preserve one corporate management story

### Why this comes first

If the architecture is unstable, everything else becomes unstable.

---

## 3. Phase 2: Lock Release Map

### Goal

Define what exists at Stage A, what upgrades at Stage B, and what upgrades at Stage C.

### What must be locked

- which modules are available at Stage A
- what every launch module does at A level
- what B-level upgrades unlock later
- what C-level upgrades unlock later
- what remains future X-level territory

### Important rule

- Stage A launch = A-level module availability
- Stage B release = B-level upgrades available for extra charge
- Stage C release = C-level upgrades available for extra charge

---

## 4. Phase 3: Lock Module Specifications

### Goal

Define each launch module clearly and individually.

### For every module, define

- purpose
- A-level behavior
- B-level behavior
- C-level behavior
- dependencies
- dashboard requirements
- pricing logic type

### Recommended priority order

1. CRM
2. President Core
3. Call Handling
4. Dispatcher
5. Closeout
6. President Follow-Up
7. Marketing

### Why this matters

This phase turns the big product vision into real buildable parts.

---

## 5. Phase 4: Lock Dashboard Architecture

### Goal

Define how module-specific workspaces and President-level oversight fit together.

### What must be locked

- which modules get dedicated dashboards
- who uses each dashboard
- what data each dashboard writes into CRM
- what summary or control flows back to President Dashboard
- which dashboards are President-only by default
- which dashboards can be sold as extra user access

### Core rule

Module dashboards are specialized workspaces.

President Dashboard is the unified executive control layer.

---

## 6. Phase 5: Lock Activation Architecture

### Goal

Define the 3-step activation as a corporate structure implementation experience.

### What must be locked

- Step 1 = Structure Discovery
- Step 2 = Structure Alignment
- Step 3 = Structure In Action
- live proof call behavior
- configured module selection logic
- itemized configured pricing logic
- package recommendation logic

### Why this matters

Activation is both:

- system configuration
- deal-closing experience

So it must be designed intentionally.

---

## 7. Phase 6: Lock Commercial Model

### Goal

Define how the system is sold.

### What must be locked

- standalone module logic
- module + automation-level pricing structure
- bundle logic
- dependency restrictions
- user dashboard seat pricing
- per-minute pricing for call handling
- voice-tier pricing
- language pack pricing
- promotional package logic
- trial / limited-time offer logic

### Core rule

The commercial model must reinforce the corporate-system story, not weaken it.

---

## 8. Phase 7: UI Execution

### Goal

Only after system logic is stable, build or redesign the actual screens.

### UI work should include

- President Dashboard refinement
- CRM module screens
- module dashboards
- activation flow redesign
- pricing/offer presentation
- live proof handoff experience

### Why this is later

If UI work starts too early, it will keep being redesigned because the system logic is still moving underneath it.

---

## 9. Current Recommended Working Order

From where the project stands now, I recommend this immediate sequence:

1. define CRM A / B / C / X
2. define President Core A / B / C / X
3. define module dependency and restriction matrix
4. define dashboard architecture map
5. define call-agent behavior package list
6. define launch bundle and pricing logic
7. redesign activation flow around final module logic
8. redesign UI surfaces around final system structure

---

## 10. Design Discipline Rules

To keep the process structured, use these rules:

### Rule 1

Do not redesign screens before the system meaning is stable.

### Rule 2

Do not add new module ideas into UI work before they are placed in the module architecture.

### Rule 3

Do not set pricing before dependency and module availability rules are clear.

### Rule 4

Do not let modularity weaken the corporate management identity.

### Rule 5

Every new decision should be checked against:

- President Core
- CRM backbone
- module automation ladder
- release stage logic

---

## 11. Main Product Design Principle

AI-ABCX is not being designed as:

- disconnected tools
- random dashboards
- a soft roadmap

It is being designed as:

`a President-led modular corporate management system with a shared operating backbone and staged automation depth`

This principle should guide all design decisions.

---

## 12. What This Roadmap Protects

This roadmap is meant to protect:

- launch clarity
- architecture quality
- module coherence
- pricing logic
- activation consistency
- UI efficiency
- long-term expansion discipline

---

## 13. Immediate Next Step

The next step in this roadmap should be:

`define CRM A / B / C / X clearly`

Because CRM is the backbone that all other launch modules depend on.
