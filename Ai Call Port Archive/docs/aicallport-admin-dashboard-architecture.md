# AI Call Port Admin Dashboard Architecture

## Purpose

The AI Call Port Admin Dashboard is the internal company control center for running AI Call Port itself.

It is separate from the client-facing dashboards.

Client dashboards exist to help businesses operate their own companies through AI Call Port.

The Admin Dashboard exists to help AI Call Port operate and scale its own company.

This dashboard should function as the company's internal operating system.

---

## Strategic Role

The Admin Dashboard must manage more than publishing or growth alone.

It should provide centralized control over:

- company performance
- client growth
- activations
- support
- feedback
- product evolution
- publishing and campaigns
- media partners
- finance
- team operations
- global expansion
- release management

This makes it the management layer for AI Call Port as a business.

---

## Separation From Client Dashboards

There are now two system categories:

### 1. Client Dashboard System

Used by businesses that subscribe to AI Call Port.

Manages:

- calls
- appointments
- staff
- CRM
- notifications
- billing
- requests
- reports
- business operations

### 2. AI Call Port Admin Dashboard

Used internally by AI Call Port leadership and team members.

Manages:

- the company itself
- product growth
- clients
- module rollout
- publishing
- media
- campaigns
- feedback
- updates
- operations

These two systems should remain clearly separated.

---

## Core Dashboard Philosophy

The Admin Dashboard should help answer these questions:

- What is happening inside the company right now?
- What is growing?
- What is underperforming?
- Which clients are healthy or at risk?
- What updates are needed next?
- Which channels are producing real activations?
- What complaints and feature requests are shaping the next version?
- Which future modules should be prioritized?

This dashboard should support:

- management
- transparency
- scaling
- continuous improvement

---

## Top-Level Modules

The Admin Dashboard should include the following top-level management modules.

### 1. Executive Overview

This is the top-level company health view.

It should show:

- active clients
- monthly recurring revenue
- activations this month
- churn risk
- pending urgent support issues
- live campaigns
- top traffic or activation source
- highest-priority internal alerts

Purpose:

Provide the founder or leadership team with a fast operational snapshot.

---

### 2. Client Management

This module should manage all client accounts.

It should show:

- client name
- market
- package and upgrades
- activation status
- verification status
- billing status
- account health
- support risk
- notes

Purpose:

Track every client as an account in the AI Call Port system.

---

### 3. Sales Pipeline

This module should manage AI Call Port's own lead-to-client funnel.

It should track:

- inbound leads
- outbound leads
- discovery calls
- Step 1 starts
- Step 2 reviews
- Step 3 completions
- activations
- lost opportunities

Purpose:

Make the company’s own acquisition pipeline measurable and operational.

---

### 4. Publishing

This module should control content operations.

It should manage:

- content library
- publishing calendar
- approvals
- multilingual variants
- publishing schedules
- manual posting queue
- platform account registry
- performance attribution

Purpose:

Centralize content creation, approval, scheduling, and distribution.

This module already has supporting planning in:

- [publishing-module-architecture.md](/Users/yakovnotkin/Documents/New%20project/publishing-module-architecture.md:1)

---

### 5. Campaigns

This module should manage all growth campaigns.

It should include:

- paid campaigns
- organic campaigns
- media partner campaigns
- article campaigns
- newsletter campaigns
- local-language campaigns
- performance tracking

Purpose:

Turn company growth into a trackable and improvable system.

---

### 6. Media Partners

This module should manage external media and article placement partners.

It should track:

- partner directory
- tracking links
- article placements
- referred leads
- partner-sourced activations
- commission terms
- payout status

Purpose:

Operationalize article and media-based acquisition.

---

### 7. News and Media

This module should manage AI Call Port’s public presence.

It should track:

- company announcements
- published articles
- release notes
- media mentions
- thought-leadership content
- social highlights

Purpose:

Make public communications visible and structured inside the company system.

---

### 8. Feedback and Updates

This module should manage activated-customer feedback.

It should include:

- complaints
- suggestions
- feature requests
- workflow issues
- status tracking
- review notes
- released fixes

Purpose:

Support the company's structured transparency model and customer-shaped evolution.

---

### 9. Product Roadmap and Modules

This module should manage product evolution.

It should track:

- live modules
- in-development modules
- upcoming modules
- requested modules
- roadmap themes
- release priorities

Examples:

- Accounting Assistant
- Advertising Campaign Assistant
- Lead Recovery Assistant
- Staff Performance Assistant
- Customer Retention Assistant

Purpose:

Give the company a visible map of present and future system capability.

---

### 10. Support and Requests

This module should track operational and customer support load.

It should include:

- client support issues
- internal escalations
- account change requests
- permission requests
- configuration requests
- resolution status

Purpose:

Keep service quality and product support visible and manageable.

---

### 11. Billing and Finance

This module should manage company financial visibility.

It should track:

- monthly recurring revenue
- activation revenue
- upgrades sold
- failed payments
- refunds
- commissions due
- partner payouts
- payment status

Purpose:

Provide financial operating visibility without leaving the system.

---

### 12. Team Management

This module should manage AI Call Port’s internal team.

It should include:

- internal team users
- roles and permissions
- approval rights
- task ownership
- support assignments
- sales assignments

Purpose:

Make internal team operations and control structure clear.

---

### 13. Tasks and Internal Operations

This module should track execution work across the company.

It should include:

- publishing tasks
- support follow-ups
- release tasks
- partnership actions
- product implementation actions
- internal deadlines

Purpose:

Make operational follow-through visible and assignable.

---

### 14. Analytics and Consulting Intelligence

This module should eventually become the company’s internal AI performance advisor.

It should analyze:

- weak funnel stages
- client churn risks
- campaign underperformance
- publishing performance
- recurring complaints
- high-value module opportunities
- staff bottlenecks

Purpose:

Turn data into strategic recommendations for the company itself.

---

### 15. Global Expansion Control

This module should manage worldwide account and platform expansion.

It should track:

- platforms by region
- account creation status
- language readiness
- localization status
- regional traction
- country-specific rollout

Supporting files:

- [global-social-platform-map.csv](/Users/yakovnotkin/Documents/New%20project/global-social-platform-map.csv:1)
- [global-social-platform-map-notes.md](/Users/yakovnotkin/Documents/New%20project/global-social-platform-map-notes.md:1)

Purpose:

Make global growth scalable and organized.

---

### 16. Audit and Release Management

This module should track structured company changes.

It should include:

- release history
- update notes
- approval records
- payout logs
- publishing approval history
- major client-impacting changes
- configuration decisions

Purpose:

Support transparency, accountability, and internal control.

---

## Recommended Navigation Structure

The Admin Dashboard top navigation should eventually include:

1. Executive Overview
2. Clients
3. Sales
4. Publishing
5. Campaigns
6. Media Partners
7. News and Media
8. Feedback and Updates
9. Roadmap
10. Support
11. Billing
12. Team
13. Tasks
14. Analytics
15. Global Expansion
16. Audit and Releases

This can be phased rather than launched all at once.

---

## Supporting Data Objects

The internal dashboard should eventually connect to these core data sets:

- clients
- leads
- campaigns
- content assets
- publishing schedules
- media partners
- feedback records
- roadmap modules
- support issues
- finance records
- team users
- tasks
- global platform registry
- audit history

This ensures the admin system is structurally scalable.

---

## AI Assistant Role

The AI assistant inside the Admin Dashboard should eventually function as:

- setup advisor
- operations advisor
- publishing advisor
- campaign advisor
- client health advisor
- roadmap advisor
- analytics consultant

It should surface:

- risks
- opportunities
- underperforming channels
- high-value requests
- module recommendations
- expansion recommendations

Purpose:

Make the internal dashboard not only informative, but actively consultative.

---

## User Roles

### Founder or Executive

Should be able to:

- view all modules
- make strategic decisions
- approve releases
- review finance
- review campaigns
- review roadmap priorities

### Operations Manager

Should be able to:

- manage support
- manage tasks
- manage client operations
- coordinate execution

### Publishing or Growth Manager

Should be able to:

- manage content
- manage publishing
- manage campaigns
- manage media partners
- review performance

### Product or Support Manager

Should be able to:

- manage requests
- manage feedback
- manage complaints
- monitor roadmap input

---

## Rollout Recommendation

The Admin Dashboard should be built in phases.

### Phase 1

Build the management foundation:

- Executive Overview
- Client Management
- Sales Pipeline
- Publishing
- Media Partners
- Support and Requests
- Billing visibility

### Phase 2

Expand growth and product control:

- Campaigns
- News and Media
- Feedback and Updates
- Roadmap and Modules
- Internal Tasks

### Phase 3

Add intelligence and scale systems:

- Analytics and Consulting Intelligence
- Global Expansion Control
- Audit and Release Management

---

## Final Standard

The AI Call Port Admin Dashboard should not feel like a collection of unrelated company pages.

It should feel like:

`the operating system for AI Call Port as a company`

It should make the company able to:

- run
- grow
- improve
- expand
- publish
- support
- learn
- and evolve transparently

from one structured internal control environment.
