# Launch Review Workboard

This is the execution board for launch review. It converts the broader review lists into a working system so we can move quickly without losing control.

## Status Keys

- `not started`
- `reviewing`
- `needs fixes`
- `ready`
- `post-launch`

## Risk Keys

- `critical`
- `high`
- `medium`
- `low`

## Must Review Now

| Item | Current Status | Risk | Before Launch? | Notes |
|---|---|---:|---|---|
| Request intake -> lead creation | reviewing | critical | yes | Founder beta submissions must reliably create the right records with no fake success states, duplicates, or broken field mapping. |
| Lead review -> approval -> conversion | reviewing | critical | yes | Leads must move cleanly from intake into review, approval, rejection, conversion, and onboarding handoff. |
| Demo / live test flow | reviewing | critical | yes | This is the bridge between interest and activation. It must feel real, controlled, and operationally useful. |
| Vapi production configuration | not started | critical | yes | Production assistants, routing, fallback logic, multilingual behavior, monitoring, and prompt/version control must be reviewed end to end. |
| Voice scripts / prompts | not started | critical | yes | Prompt logic must be checked for real production scenarios, not just demo behavior. |
| Conversation logic categories | not started | critical | yes | Scripts need to be grouped by actual conversation type like sales, service, bookings, reservations, support, emergency, dispatch, qualification, and follow-up. |
| AI response quality | not started | critical | yes | The agent must sound natural, trustworthy, clear, and useful in real conversations. |
| Uncertainty and fallback behavior | not started | critical | yes | We need explicit rules for what the AI says when unsure, missing context, or unable to complete an action. |
| Analysis and configuration layer | not started | critical | yes | The system must determine which modules a business actually needs instead of depending on the customer to choose correctly alone, and this should behave like a real analytics/configuration capability rather than ad hoc consulting. |
| Customer automatic configuration | not started | critical | yes | New customers must be configured through structured logic, not ad hoc manual setup. |
| Client activation / onboarding flow | not started | critical | yes | The handoff from accepted lead to configured client to active customer must be clear and repeatable. |

## Must Fix Before Launch

| Item | Current Status | Risk | Before Launch? | Notes |
|---|---|---:|---|---|
| Internal dashboard operational accuracy | reviewing | high | yes | Dashboard must reflect real system state for leads, clients, issues, approvals, calls, and workflow problems. |
| Requests page | reviewing | high | yes | Founder review workflow, status changes, notes, and activation-stage logic must stay aligned with the live pipeline. |
| Calls / transcript review | not started | high | yes | Flagged calls, route correctness, transcript usefulness, and operator visibility must be reviewed. |
| CRM and workflow automation | not started | high | yes | Stage movement, retries, follow-up logic, and failure recovery need structured review. |
| Failure handling | not started | high | yes | We need clear behavior for form failures, workflow failures, call-route failures, CRM failures, and manual overrides. |
| Pricing and offer logic | not started | high | yes | Public pages, activation pages, and internal systems must agree on offer rules and upgrade logic. |
| Partner referral credit logic | not started | high | yes | Partner referral links, `$15` active-customer credits, billing reduction rules, and dashboard visibility must work consistently before launch. |
| Data quality | reviewing | high | yes | Incomplete records, old test data, fit-score gaps, and next-action hygiene need cleanup rules. |
| Main landing page | not started | high | yes | Positioning, CTA flow, pricing, and trust must match the actual product and activation path. |
| Prelaunch / founder beta page | reviewing | high | yes | Intake works now, but the page still needs final review for accuracy and launch confidence. |
| 3-step activation flow | not started | high | yes | Step 1, Step 2, and Step 3 need end-to-end launch review for real customer use, including partner-plan policy agreement before partner activation. |

## Can Wait Until After Launch

| Item | Current Status | Risk | Before Launch? | Notes |
|---|---|---:|---|---|
| Owner dashboard expansion | not started | medium | no | Review production usefulness, but deeper module expansion can continue after launch if core owner visibility is already enough. |
| Activation guide and support docs | not started | medium | no | Must be accurate before launch, but deeper polish can continue later. |
| Mobile and browser behavior polish | not started | medium | no | Critical pages must work, but exhaustive polish can continue after launch if the core flow is solid. |
| Launch operations refinement | not started | medium | no | Daily workflow must be usable before launch, but more advanced operating rhythms can improve afterward. |
| Deployment source of truth process | reviewing | low | no | The major duplicate-folder issue is under control, but we should keep tightening source-of-truth discipline. |

## Suggested Review Order

1. Request intake -> lead creation -> dashboard visibility
2. Lead review -> approval -> conversion
3. Demo / live test flow
4. Vapi production configuration
5. Voice scripts / prompts
6. Conversation logic categories
7. AI response quality + uncertainty rules
8. Analysis and configuration layer
9. Customer automatic configuration
10. Client activation / onboarding flow
11. CRM and workflow automation

## Current Implementation Block

1. Align public launch language around Stage A: AI Call Agent.
2. Add partner-plan policy agreement into the activation pipeline.
3. Finalize regular-plan and partner-plan pricing presentation.
4. Define and implement partner referral-link and monthly credit logic.
5. Review Vapi production configuration, conversation logic categories, and fallback rules.
