# Launch Review Base List

This is the base review list for AI Call Port before launch. It is not a from-scratch build plan. It is the list of systems, pages, and flows that already exist and need to be reviewed, updated, and confirmed for launch readiness.

## Items To Review

1. Main landing page
   Review `index.html` for positioning, CTA clarity, pricing accuracy, trust, demo flow, and whether the page matches what the product really does now.

2. Prelaunch / founder beta page
   Review `prelaunch-page.html` for live form submission, duplicate protection, copy accuracy, founder-beta rules, and mobile behavior.

3. Request intake pipeline
   Review the full path from form submit to `beta_applications` to `leads`, including validation, field mapping, duplicates, and success/error handling.

4. Leads workflow
   Review `internal-dashboard.html` leads logic and `api/stripe/billing-state.js` lead filtering, statuses, next actions, converted-company handling, and test-data cleanup.

5. Requests page
   Review `requests.html` for founder review workflow, status updates, notes, activation-stage handling, and whether it still reflects the real intake process.

6. 3-step activation flow
   Review `step1.html`, `step2.html`, and `step3.html` for real operational readiness, not just UI completeness.

7. Demo / live test flow
   Review `step3.html` for whether the demo call is real enough, what the customer actually experiences, how results are captured, and what happens after the test.

8. Owner dashboard
   Review `owner-dashboard.html` for whether it is a true production owner view or still partly demo/static.

9. Internal dashboard
   Review `internal-dashboard.html` for live operational usefulness, default landing logic, alerts, approvals, calls, leads, clients, and stale placeholder content.

10. Clients / company conversion
    Review lead-to-company conversion, client record creation, contact creation, onboarding handoff, and what data is required before activation.

11. Vapi configuration
    Review all production assistants, numbers, routing, overflow behavior, emergency logic, multilingual setup, prompt versions, fallback handling, and monitoring.

12. Voice scripts / prompts
    Review scripts for booking, quote requests, emergencies, after-hours, missed calls, support, multilingual calls, and escalation rules.

13. Conversation logic categories
    Review whether scripts and prompt logic are categorized not only by business type like plumbing or HVAC, but also by actual conversation category such as sales, service, reservations, bookings, support, emergency, dispatch, qualification, and follow-up.

14. AI response quality
    Review whether the AI agent sounds natural, clear, and trustworthy across real conversations, and whether the system avoids generic, robotic, repetitive, or awkward answers.

15. Uncertainty and fallback rules
    Review what the AI should say when it is unsure, missing context, cannot complete an action, needs clarification, or must avoid making something up. These rules should make the AI sound natural while still being safe.

16. Analysis and configuration layer
    Review how the system determines which modules a business actually needs, how it analyzes the business, and how it configures the correct structure instead of forcing the customer to guess. This includes treating the analytics/configuration layer as a real product capability, not just informal consulting.

17. Automatic customer configuration
    Review how a new customer gets configured automatically: intake fields, assistant setup, workflow setup, CRM defaults, dashboard visibility, and business-type templates.

18. CRM and workflow automation
    Review CRM sync, stage movement, follow-up automation, retry handling, failed workflows, and whether the system can recover cleanly from errors.

19. Calls / transcript review
    Review `calls.html` and live call-review logic for flagged calls, transcript usefulness, route correctness, and operational visibility.

20. Approvals / alerts / issues
    Review whether urgent issues, approvals, client-impacting failures, and system mistakes are surfaced fast enough for founder/operator action.

21. Pricing and offer logic
    Review whether the public site, beta pages, activation pages, and internal logic all agree on pricing, founder-beta rules, included modules, and upgrade behavior.

22. Activation guide and support docs
    Review `activation-guide.html`, `guides.html`, and related docs so they match the actual product and launch process.

23. Partner-plan activation agreement
    Review whether the activation pipeline clearly requires partner companies to agree to the partner plan policy before partner pricing and benefits are activated.

24. Data quality
    Review incomplete fields, duplicate test records, naming consistency, country/location handling, fit scoring, and next-action hygiene.

25. Mobile and browser behavior
    Review the main public pages and key flows on mobile, Safari, and Chrome, especially modal-heavy pages and dashboard previews.

26. Deployment source of truth
    Review which files are canonical, which folder is the only real workspace, and whether GitHub, live, and local all point to the same source.

27. Launch operations
    Review the real daily workflow for founder review, demo calls, onboarding, issue handling, and client activation capacity.
