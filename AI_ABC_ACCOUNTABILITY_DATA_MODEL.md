# Bring Corporate Structure to Service Businesses

# AI-ABC Accountability Data Model

## Purpose

This document defines the core data model behind AI-ABC accountability, reporting, and governance.

It exists to answer one practical question:

What data structures must exist so the reporting hierarchy, dashboards, accountability system, and executive modules can actually work?

This is the implementation bridge between architecture and code.

## Core Principle

AI-ABC should not invent reports manually page by page.

The system should generate dashboards, scorecards, summaries, escalations, and recommendations from a shared accountability data model.

If the data model is correct:

- dashboards stay consistent
- reports stay consistent
- role logic stays consistent
- stage gating stays consistent
- future modules can plug in without redesigning the whole system

## Model Layers

The AI-ABC accountability data model should be organized into six layers:

1. Company configuration layer
2. Role and hierarchy layer
3. Operational event layer
4. Outcome and financial layer
5. Accountability and reporting layer
6. Recommendation and governance layer

## 1. Company Configuration Layer

This layer defines the company being operated.

It should come primarily from:

- Step 1 intake
- later manual edits
- system onboarding updates

### Core Company Fields

At minimum, the company configuration should include:

- company_id
- company_name
- industry
- region
- service_area
- path_type
- active_stages
- enabled_modules
- staff_structure
- revenue_targets
- workflow_preferences

This layer determines what kind of dashboards, modules, and reporting views the company receives.

## 2. Role and Hierarchy Layer

This layer defines who exists in the company structure and how reporting works.

### Role Record

Each role record should include fields such as:

- role_id
- role_name
- role_type
- hierarchy_level
- reports_to_role_id
- managed_domain
- visibility_scope
- accountability_mode
- stage_dependencies
- active_status

### Role Type Examples

- President
- CEO
- COO
- CRO
- CFO
- CAO
- Sales Director
- Scheduling Director
- Service Director
- Sales Staff
- Service Staff
- Scheduling Staff
- AI Officer
- AI Operational Module

### Accountability Mode

Each role should define how accountability is handled.

Examples:

- scored
- summarized
- impact_only

This is where the President distinction becomes explicit in the data model.

The President should use:

- accountability_mode: summarized

The CEO and managed operating roles should use:

- accountability_mode: scored

## 3. Operational Event Layer

This layer stores the raw events that describe what actually happened in the company.

Operational events are the foundation of AI-ABC truth.

### Event Categories

The model should support at least these event categories:

- communication events
- lead events
- scheduling events
- staff response events
- completion events
- financial events
- complaint events
- approval events
- escalation events
- goal events

### Example Event Fields

Each event should generally include:

- event_id
- company_id
- event_type
- event_domain
- related_role_ids
- related_customer_id
- related_job_id
- related_estimate_id
- timestamp
- status
- priority
- source
- metadata

### Communication Events

Examples:

- call answered
- missed call recovered
- lead qualified
- transcript created
- call recording stored
- outbound follow-up sent

### Scheduling Events

Examples:

- appointment requested
- appointment offered
- appointment confirmed
- appointment rescheduled
- appointment rerouted
- reminder sent

### Staff Response Events

Examples:

- staff confirmed
- staff did not confirm
- timeout triggered
- reassignment triggered
- report submitted

### Completion Events

Examples:

- job completed
- estimate entered
- follow-up required
- follow-up completed

### Financial Events

Examples:

- estimate created
- payment confirmed
- partial payment confirmed
- revenue marked lost
- reconciliation pending

### Complaint Events

Examples:

- complaint opened
- complaint assigned
- complaint resolved
- complaint reopened

### Approval and Escalation Events

Examples:

- approval requested
- approval approved
- approval rejected
- escalation opened
- escalation reviewed
- escalation unresolved

## 4. Outcome and Financial Layer

This layer converts raw events into business outcomes.

It answers:

- what opportunity existed
- what happened to it
- what money was expected
- what money was actually received

### Customer Record

The customer object should include:

- customer_id
- company_id
- name
- contact_info
- source
- source_detail
- origin_prefix
- pipeline_key
- routing_owner_role
- lifecycle_stage
- priority_level
- current_status
- tags
- history_summary

This structure should align directly with:

- [AI_ABC_CUSTOMER_ORIGIN_AND_ROUTING_SPECIFICATION.md](/Users/yakovnotkin/Documents/New project/AI_ABC_CUSTOMER_ORIGIN_AND_ROUTING_SPECIFICATION.md)

At minimum, `source` should support:

- `new_call`
- `legacy_import`
- `referral`
- `reactivation`
- `owner_sales_entry`
- `owner_service_entry`

### Job Record

The job object should include:

- job_id
- customer_id
- company_id
- assigned_roles
- appointment_status
- execution_status
- completion_status
- complaint_status
- next_required_action

### Estimate Record

The estimate object should include:

- estimate_id
- job_id
- amount_expected
- amount_confirmed
- financial_outcome_status
- entered_by_role_id
- confirmed_by_role_id
- revenue_risk_level

### Payment Outcome States

At minimum:

- paid
- partially_paid
- open
- lost
- missing_confirmation

This layer is critical to the CRO and CFO modules.

It is also critical to customer-origin reporting because it allows the system to answer:

- which origin types create the most revenue
- which pipelines stall most often
- which owner role receives the most unresolved items
- which referral or legacy paths convert best

## 5. Accountability and Reporting Layer

This layer converts events and outcomes into accountability views.

### Accountability Record

Each accountability record should include:

- accountability_id
- company_id
- role_id
- reporting_period
- accountability_mode
- score_value
- score_trend
- strongest_area
- weakest_area
- unresolved_items
- recommended_action
- supporting_metrics

### Support for Scored and Non-Scored Roles

The model must support both scored and non-scored roles.

For scored roles:

- score_value is populated
- trend is populated
- rating explanation is populated

For President reporting:

- no score_value is required
- activity summary is required
- decision summary is required
- impact summary is required

### President Governance Record

The President should use a dedicated governance summary object such as:

- governance_summary_id
- reporting_period
- recommendations_accepted
- recommendations_rejected
- recommendations_unreviewed
- reconciliation_required
- reconciliation_completed
- reconciliation_outstanding
- approvals_submitted
- approvals_approved
- approvals_rejected
- approvals_pending
- critical_issues_escalated
- critical_issues_reviewed
- critical_issues_outstanding
- monthly_goal_status
- weekly_reviews_completed
- impact_notes
- ceo_observation
- recommended_focus

This is how the system supports President accountability without converting the President into a scored role.

### Team Summary Record

Teams should also have summary objects such as:

- team_id
- team_name
- reporting_period
- target_status
- top_performer_ids
- at_risk_role_ids
- unresolved_issues
- complaint_count
- response_quality

### Executive Summary Record

Each executive domain should have a summary object such as:

- executive_summary_id
- executive_role_id
- reporting_period
- domain_health
- key_metrics
- unresolved_risks
- target_progress
- recommendation_list

## 6. Recommendation and Governance Layer

This layer stores what the system recommends and what leadership did with it.

### Recommendation Record

The recommendation model should include:

- recommendation_id
- company_id
- source_role_id
- target_role_id
- recommendation_type
- recommendation_text
- reason
- supporting_evidence
- status
- submitted_at
- reviewed_at
- resolved_at

### Recommendation Status Values

At minimum:

- submitted
- accepted
- rejected
- pending_review
- completed

### Goal Record

The system should support goal objects such as:

- goal_id
- company_id
- goal_type
- proposed_by_role_id
- approved_by_role_id
- target_value
- target_period
- approval_status
- progress_status

### Impact Analysis Record

At later stages, the model should support structured impact analysis such as:

- impact_analysis_id
- reporting_period
- goal_id
- outcome_status
- contributing_factors
- president_impact_notes
- executive_impact_notes
- operational_impact_notes

This is how Stage C and later layers can move from activity reporting into causal management analysis.

## Role-to-Data Mapping

The data model should explicitly map which roles produce which data.

### Sales Staff Produce

- lead updates
- estimate entries
- follow-up status
- conversion movement

### Service Staff Produce

- completion status
- field updates
- customer outcome notes
- complaint-triggering context

### Scheduling Staff Produce

- appointment routing
- confirmation updates
- reschedule updates
- timing records

### Directors Produce

- review summaries
- corrective actions
- local escalation notes

### Executive Officers Produce

- domain summaries
- recommendations
- executive risk notes

### President Produces

- approvals
- goal approval decisions
- financial outcome confirmations

This keeps role responsibility explicit.

## Stage Gating in the Data Model

The data model must support modular stage activation.

Not every company will use every layer.

Call handling is mandatory.

Scheduling and advanced management are optional.

That means all records should be compatible with module gating.

### Gating-Relevant Fields

Useful fields may include:

- active_stages
- enabled_modules
- role_active_status
- dashboard_visibility
- workflow_enabled

Examples:

- a Stage A company may not have scheduling events active
- a Stage B company may activate scheduling but not advanced governance
- a Stage C company may activate executive governance and impact analysis

## Dashboard Generation Implication

If this model is implemented correctly, dashboards should become generated views over structured data rather than hand-built static mockups.

Examples:

- owner dashboard pulls President, CEO, executive, and revenue summary objects
- staff dashboards pull role-specific pending actions and workflow records
- monthly reports pull accountability, goals, complaints, and recommendations

This is one of the most important reasons to define the data model now.

## Minimum Viable Build Order

To make this practical, the data model should be implemented in layers.

### First Implementation Layer

- company configuration
- role hierarchy
- stage gating
- role visibility rules

### Second Implementation Layer

- communication events
- lead records
- estimate records
- basic job records

### Third Implementation Layer

- scheduling events
- staff response records
- completion records
- financial outcome states

### Fourth Implementation Layer

- accountability records
- executive summaries
- President governance summary
- recommendation records

### Fifth Implementation Layer

- impact analysis
- predictive risk logic
- deeper AI officer evaluation

## Final Principle

AI-ABC should not rely on disconnected local page state, isolated dashboard widgets, or one-off report logic.

It should run on a shared accountability data model that knows:

- who exists
- who reports to whom
- what happened
- what outcomes were produced
- who is responsible
- what must be reviewed
- what should happen next

That is the data foundation required to make AI-ABC a real corporate operating structure for service businesses.
