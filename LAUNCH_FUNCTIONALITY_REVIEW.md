# Launch Functionality Review

This document covers the highest-priority functionality that must be reviewed before launch. It is focused on whether the system actually works for real customers and real internal operations, not on visuals or design polish.

## Highest-Priority Functionality Review Areas

1. Request intake -> lead creation
   Review whether every real submission creates the correct records, avoids duplicates, preserves key fields, and lands in the internal workflow correctly.

2. Lead review -> approval -> conversion
   Review whether founder beta requests can be reviewed, updated, approved, rejected, or converted into companies without broken states or missing handoff steps.

3. Demo / live test flow
   Review whether the live test is real enough, controlled enough, understandable enough, and properly connected to the next step after the customer finishes the test.

4. Vapi production configuration
   Review the real production assistants, not just the demo setup. This includes routing, fallback behavior, emergency handling, multilingual behavior, overflow logic, prompt versions, and assistant health.

5. Conversation logic categories
   Review whether the AI logic is organized by real conversation type, not just by business vertical. This includes sales, service, reservations, bookings, support, dispatch, emergency, qualification, and follow-up logic.

6. AI response quality
   Review whether the AI agent gives natural, trustworthy, and context-aware responses instead of sounding generic, robotic, repetitive, or uncertain in a bad way.

7. Uncertainty and fallback behavior
   Review what the AI should say when it does not know the answer, lacks enough context, cannot complete an action, or needs clarification. These rules should protect quality without making the assistant sound unnatural.

8. Analysis and configuration layer
   Review whether the system can determine which modules a business actually needs and configure the right structure instead of depending on the customer to choose correctly alone. This needs to work like a defined system function, not just a founder judgment call.

9. Customer automatic configuration
   Review how a new customer gets configured after approval. This includes intake fields, assistant setup, workflow setup, CRM defaults, dashboard visibility, and business-type templates.

10. Call handling logic
   Review whether real calls are handled correctly for booking, quote requests, emergencies, after-hours, missed calls, support/information calls, and multilingual cases.

11. CRM and workflow automation
   Review whether lead stages, notes, next actions, follow-up automations, retries, and workflow execution all work reliably with real data.

12. Dashboard operational accuracy
   Review whether the internal dashboard reflects the true system state for leads, clients, issues, approvals, calls, and workflow problems.

13. Client activation / onboarding flow
   Review whether approved businesses can move cleanly from accepted lead to configured client to active account without manual confusion or broken steps.

14. Partner-plan policy agreement
   Review whether partner companies are required to agree to the partner plan policy during activation before partner pricing and benefits go live.

15. Failure handling
    Review what happens when things go wrong: form failure, call route failure, workflow failure, CRM sync failure, incomplete configuration, paused activation, and live customer override needs.

## Highest-Risk Launch Areas

If we need to focus attention quickly, these are the most important:

- intake pipeline
- Vapi / call behavior
- response quality and uncertainty handling
- analysis and configuration logic
- customer configuration
- demo / live test
- CRM / workflow reliability
- onboarding / activation handoff
