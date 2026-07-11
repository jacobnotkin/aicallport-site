# AI Call Port Launch Readiness Checklist

Use this file as the single working checklist for build completion, testing, and launch decisions.

Status key:
- `[ ]` not started
- `[-]` in progress
- `[x]` done

## How To Use
- Mark each area only when both build work and testing are complete.
- Keep known risks visible until they are truly closed.
- Treat `Pilot-Critical` items as mandatory before onboarding selected clients.
- Treat `Launch-Critical` items as mandatory before broader launch.
- Keep `Experimental` items out of the core launch promise until proven.

## Master Tracker

| Area | Phase | Build | Tests | Owner | Known Risks |
|---|---|---:|---:|---|---|
| Core Call System | Pilot-Critical | [ ] | [ ] |  |  |
| CRM And Client Records | Pilot-Critical | [ ] | [ ] |  |  |
| Scheduling | Pilot-Critical | [ ] | [ ] |  |  |
| Dashboard Logic | Pilot-Critical | [-] | [x] | Yakov + Codex | UI logic verified locally and on live site; remaining risk is stale or non-live data state behavior |
| Billing And Payments | Pilot-Critical | [-] | [ ] | Yakov + Codex | Stripe-backed checkout and billing-state code now exist, but live env vars and end-to-end production validation still need to be completed |
| Monitoring And Safeguards | Pilot-Critical | [ ] | [ ] |  |  |
| Outbound Follow-Up | Launch-Critical | [ ] | [ ] |  |  |
| Advanced Management | Launch-Critical | [ ] | [ ] |  |  |
| Communication Board | Launch-Critical | [ ] | [ ] |  |  |
| Integrations | Launch-Critical | [ ] | [ ] |  |  |
| Admin / Configuration Layer | Launch-Critical | [ ] | [ ] |  |  |
| Recommended Actions / System Commands | Experimental | [ ] | [ ] |  |  |

---

## 1. Core Call System
Phase: `Pilot-Critical`

### Build
- [ ] Inbound calls answer correctly
- [ ] Intent detection works across core call types
- [ ] Behavior switching works correctly
- [ ] Language detection works correctly
- [ ] Emergency routing works correctly
- [ ] After-hours logic works correctly
- [ ] Fallback logic exists for unclear calls

### Done Criteria
- [ ] Calls reach the correct flow reliably
- [ ] Wrong-intent cases are rare and explainable
- [ ] Urgent calls escalate correctly
- [ ] After-hours calls still create usable workflow outcomes

### Test Cases
- [ ] Sales call
- [ ] Booking call
- [ ] Information call
- [ ] Reservation call
- [ ] Emergency call
- [ ] After-hours call
- [ ] Multilingual call
- [ ] Unclear / interrupted caller
- [ ] Wrong-intent correction path

### Known Risks
- [ ] Wrong intent classification
- [ ] Wrong urgency routing
- [ ] Weak fallback behavior

---

## 2. CRM And Client Records
Phase: `Pilot-Critical`

### Build
- [ ] New client record creation
- [ ] Existing client matching
- [ ] Transcript storage
- [ ] Recording storage
- [ ] Notes and timeline history
- [ ] Next-step ownership visibility

### Done Criteria
- [ ] Every important interaction creates or updates the right record
- [ ] History is visible in one place
- [ ] Duplicate record rate is acceptably low

### Test Cases
- [ ] New caller creates client record
- [ ] Repeat caller updates existing record
- [ ] Missed call creates recovery-ready record
- [ ] Transcript attached correctly
- [ ] Recording attached correctly
- [ ] Owner note appears correctly

### Known Risks
- [ ] Duplicate clients
- [ ] Missing history
- [ ] Wrong owner / next-step assignment

---

## 3. Scheduling
Phase: `Pilot-Critical`

### Build
- [ ] Booking creation
- [ ] Confirmation tracking
- [ ] Reminder sending
- [ ] Reschedule flow
- [ ] Cancellation flow
- [ ] Staff availability logic
- [ ] Assignment logic

### Done Criteria
- [ ] Booking flow is reliable
- [ ] Reminder / confirmation status is accurate
- [ ] Staff conflicts are prevented

### Test Cases
- [ ] New booking
- [ ] Client confirmation
- [ ] No client response
- [ ] Staff acceptance
- [ ] Cancellation
- [ ] Reschedule
- [ ] Double-booking prevention
- [ ] Unavailable staff edge case

### Known Risks
- [ ] Double booking
- [ ] Reminder failures
- [ ] Assignment conflicts

---

## 4. Dashboard Logic
Phase: `Pilot-Critical`

Current focus: `Start here first`

### Build
- [x] Module navigation works
- [-] Data states update correctly
- [x] Priority hierarchy is clear
- [x] Selected states are obvious
- [-] Resolved states move correctly

### Done Criteria
- [ ] Dashboard reflects real operational state
- [ ] Urgent items are obvious
- [ ] Owner can see what matters fast

### Test Cases
- [ ] Booking status change appears correctly from real app data
- [ ] Reminder reply updates dashboard from real app data
- [x] Resolved action updates counts
- [x] Escalation appears correctly
- [x] Refresh keeps state correct in browser QA

### Known Risks
- [x] Wrong priority display
- [ ] Stale UI state
- [ ] Hidden urgent items

### Verification Notes
- [x] Verified module navigation render path in code
- [x] Verified submenu switching render path in code
- [x] Verified `Recommended Actions` resolve flow updates queue and resolved history in code
- [x] Verified embedded landing-page dashboard points to the real owner dashboard
- [x] Verified responsive rules exist for dashboard iframe and owner dashboard layouts in code
- [x] Desktop browser click-through completed
- [x] Mobile browser QA completed
- [x] Live site dashboard embed loads correctly on `aicallport.com`
- [x] Live site module switching works
- [x] Live site CRM record open / close works
- [x] Live site `Recommended Actions` resolve flow works
- [x] Live site `Call Handling` inner-card interactions work

---

## 5. Billing And Payments
Phase: `Pilot-Critical`

Current status: `Stripe-backed implementation added, awaiting live-key validation`

### Build
- [ ] Stripe billing works
- [ ] Base plan logic works
- [ ] Upgrade logic works
- [ ] Beta offer logic works
- [ ] Referral credits work
- [ ] Invoice projection works

### Done Criteria
- [ ] Billing matches real plan state
- [ ] Current and future invoice logic is accurate
- [ ] Credits and discounts apply correctly

### Test Cases
- [ ] Base system only
- [ ] Base + upgrades
- [ ] Beta first month
- [ ] Post-beta invoice
- [ ] Referral credit applied
- [ ] Failed payment case

### Known Risks
- [x] Wrong invoice totals
- [x] Discount logic confusion
- [x] Upgrade carry-over mistakes

### Verification Notes
- [x] Billing UI exists in [billing.html](</Users/yakovnotkin/Documents/New project/billing.html:1>)
- [x] Billing module exists in [owner-dashboard.html](</Users/yakovnotkin/Documents/New project/owner-dashboard.html:2515>)
- [x] Real Stripe checkout API route added in [api/stripe/create-checkout-session.js](</Users/yakovnotkin/Documents/New project/api/stripe/create-checkout-session.js:1>)
- [x] Live Stripe-backed billing state route added in [api/stripe/billing-state.js](</Users/yakovnotkin/Documents/New project/api/stripe/billing-state.js:1>)
- [x] Shared pricing / carry-over / referral logic added in [billing-config.js](</Users/yakovnotkin/Documents/New project/billing-config.js:1>)
- [x] Activation flow in [step3.html](</Users/yakovnotkin/Documents/New project/step3.html:643>) now starts Stripe checkout instead of stopping at an alert
- [x] Billing page and dashboard billing module now attempt to load live billing state via [billing-client.js](</Users/yakovnotkin/Documents/New project/billing-client.js:1>)
- [ ] Add live `STRIPE_SECRET_KEY` and deploy API routes
- [ ] Complete first live checkout and post-checkout billing-state validation
- [ ] Verify live referral-credit calculation with an actual referred activated account
- [ ] Real subscription state mapped into dashboard and billing views
- [ ] Real referral-credit calculation connected to billing state

---

## 6. Monitoring And Safeguards
Phase: `Pilot-Critical`

### Build
- [ ] Error logging
- [ ] Alert visibility
- [ ] Owner override path
- [ ] Audit trail
- [ ] Escalation visibility

### Done Criteria
- [ ] Important failures are visible quickly
- [ ] Human override is always possible
- [ ] Decisions can be reviewed later

### Test Cases
- [ ] Failed reminder
- [ ] Failed sync
- [ ] Wrong assignment correction
- [ ] Override flow
- [ ] Audit trail review

### Known Risks
- [ ] Silent failures
- [ ] No clear override
- [ ] Poor traceability

---

## 7. Outbound Follow-Up
Phase: `Launch-Critical`

### Build
- [ ] Spreadsheet import
- [ ] Segmentation logic
- [ ] SMS follow-up
- [ ] Call follow-up
- [ ] Campaign tracking
- [ ] Outcome tracking

### Done Criteria
- [ ] Records import cleanly
- [ ] Recovery queues make sense
- [ ] Next action changes based on response

### Test Cases
- [ ] CSV import
- [ ] Stale lead follow-up
- [ ] Missed-call recovery
- [ ] Reply received
- [ ] No reply
- [ ] Failed delivery

### Known Risks
- [ ] Bad import mapping
- [ ] Wrong prioritization
- [ ] Reply logic errors

---

## 8. Advanced Management
Phase: `Launch-Critical`

### Build
- [ ] Task creation
- [ ] Assignment logic
- [ ] Staff coordination
- [ ] Pipeline visibility
- [ ] Approvals flow
- [ ] Escalation for non-response

### Done Criteria
- [ ] Every task has owner + status + next step
- [ ] Pipeline stages update correctly
- [ ] Approvals stay visible

### Test Cases
- [ ] New task assignment
- [ ] Reassignment
- [ ] Approval granted
- [ ] Approval denied
- [ ] Stalled task escalation
- [ ] Pipeline progression

### Known Risks
- [ ] Dead tasks
- [ ] No ownership clarity
- [ ] Broken pipeline visibility

---

## 9. Communication Board
Phase: `Launch-Critical`

### Build
- [ ] Calls visible
- [ ] Texts visible
- [ ] Email visible
- [ ] Internal notes visible
- [ ] Escalations visible

### Done Criteria
- [ ] Important communication does not disappear across channels
- [ ] Escalations stay obvious

### Test Cases
- [ ] SMS thread
- [ ] Missed call + note
- [ ] Email failure
- [ ] Escalation to owner
- [ ] Complaint reopened

### Known Risks
- [ ] Missing thread history
- [ ] Hidden escalations
- [ ] Weak priority display

---

## 10. Integrations
Phase: `Launch-Critical`

### Build
- [ ] Vapi integration stable
- [ ] Vercel deployment stable
- [ ] Supabase data flow stable
- [ ] Stripe stable
- [ ] GitHub deployment / version flow stable
- [ ] External CRM sync stable

### Done Criteria
- [ ] Integrations work reliably
- [ ] Failures are visible
- [ ] Retry or fallback behavior exists where needed

### Test Cases
- [ ] Successful connection
- [ ] Bad payload handling
- [ ] Timeout handling
- [ ] Retry behavior
- [ ] Sync validation

### Known Risks
- [ ] Third-party instability
- [ ] Sync mismatch
- [ ] timeout / webhook failure

---

## 11. Admin / Configuration Layer
Phase: `Launch-Critical`

### Build
- [ ] Business onboarding flow
- [ ] Staff setup
- [ ] Hours setup
- [ ] Routing rules
- [ ] Language config
- [ ] Escalation rules

### Done Criteria
- [ ] New business can be configured correctly
- [ ] Settings persist correctly
- [ ] Rule changes affect behavior correctly

### Test Cases
- [ ] New business setup
- [ ] Edit hours
- [ ] Edit staff
- [ ] Edit emergency rules
- [ ] Edit language settings

### Known Risks
- [ ] Bad client configuration
- [ ] Settings not applied
- [ ] Rule mismatch

---

## 12. Recommended Actions / System Commands
Phase: `Experimental`

### Build
- [ ] Action queue logic
- [ ] Resolution flow
- [ ] Confidence logic
- [ ] Reason visibility
- [ ] Assigned-to visibility
- [ ] Escalation visibility
- [ ] Owner override

### Done Criteria
- [ ] Action recommendations are accurate enough for pilot use
- [ ] Explanations are understandable
- [ ] Resolution updates are reliable
- [ ] Bad recommendations are rare and reviewable

### Test Cases
- [ ] Urgent dispatch command
- [ ] Revenue callback command
- [ ] Approval command
- [ ] Escalation command
- [ ] Resolve flow
- [ ] False-positive recommendation

### Known Risks
- [ ] Wrong recommendation
- [ ] Overconfident system behavior
- [ ] User trust loss

---

## Launch Decision Gates

### Pilot Launch Gate
- [ ] All `Pilot-Critical` areas built
- [ ] All `Pilot-Critical` tests passed
- [ ] Known critical risks have mitigation
- [ ] Owner override works everywhere it must
- [ ] Billing is clear enough for real clients

### Broader Launch Gate
- [ ] All `Launch-Critical` areas built
- [ ] All `Launch-Critical` tests passed
- [ ] Support / escalation process exists
- [ ] Monitoring is reliable
- [ ] Onboarding process is repeatable

### Experimental Gate
- [ ] System Commands tested internally
- [ ] System Commands tested with selected clients
- [ ] Confidence and safeguard logic reviewed
- [ ] Complaint risk is acceptably low
- [ ] Owner override and audit trail proven

---

## Notes
- Keep the advanced command concept experimental until real-world results justify broader rollout.
- The stable launch promise should focus on reliable operational control, not full autonomous command.
- Expand future modules fast after launch, but never at the expense of core reliability.
