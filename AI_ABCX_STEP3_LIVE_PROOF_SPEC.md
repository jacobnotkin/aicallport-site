# AI-ABCX Step 3 Live Proof Specification

This document defines the new `Step 3` activation experience for AI-ABCX.

It replaces the weaker idea of:

- generic dashboard preview
- generic demo call
- abstract final review

with a stronger closing flow:

- real call to the client company's own prepared AI call agent
- live call result written into the client company's own prepared President dashboard
- immediate product proof before activation

---

## 1. Step 3 Purpose

`Step 3` is the deal-closing proof experience.

Its purpose is to let the future President:

- talk to their own prepared AI call agent
- hear how the system sounds for their own company
- see the real call create real operating data
- land in their own prepared dashboard, not a fake demo dashboard
- understand exactly how AI-ABCX turns a call into business action

This step should be impressive enough to help close the deal.

---

## 2. Core Principle

Step 3 must not feel like a presentation.

It must feel like:

- `this is my company`
- `this is my AI agent`
- `this is my dashboard`
- `this is what happens after a real call`

The system should prove value in one continuous motion.

---

## 3. Required Experience Flow

### Step 3 flow

1. The future President arrives at Step 3 after Step 1 and Step 2 are complete.
2. The system shows the company's prepared identity and explains that the next action is a real live proof call.
3. The system provisions or loads the company's prepared VAPI-based demo agent.
4. The future President places a real call to the prepared company demo number or launches the call from the activation experience.
5. The future President speaks to their own AI call agent using a realistic business scenario.
6. The call is processed as a real call, not a fake scripted animation.
7. The system stores the call result as a real structured record.
8. Immediately after the call, the future President is routed into their own prepared President dashboard.
9. The dashboard opens already focused on the live Step 3 call record.
10. The future President sees the exact business truth created by the call.
11. The activation CTA appears only after this proof moment.

---

## 4. Step 3 Should Show

Before the call:

- company name
- chosen path
- prepared voice/agent identity
- short explanation of what the future President should test
- clear call button or demo number

During the call:

- live call in progress state
- clear indicator that this is the company's own AI call agent
- optional note that the call will be written into the dashboard

After the call:

- success state that confirms the call was captured
- redirect into the prepared President dashboard
- highlighted job or lead record created from that call

---

## 5. Dashboard State After Step 3

After the call, the user must not land in a fake preview dashboard.

They must land in their own prepared dashboard with the live demo-call information already present.

The dashboard should show:

- company-branded President dashboard
- live record created from the Step 3 call
- call transcript
- recording reference or playback link
- call intent classification
- urgency classification
- caller qualification
- lead qualification
- requested appointment or next-step request
- recommended next action
- routing result into the correct workflow path

The dashboard should open already focused on that record.

The future President should not need to search for what happened.

---

## 6. VAPI Role

`VAPI` should power the Step 3 live proof call.

VAPI is not only a technical integration here.

It is the engine behind the product-proof moment.

VAPI should be used to:

- run the prepared company-specific AI call agent
- support a real live inbound or guided proof call
- return the call result data needed for dashboard display
- make the Step 3 experience feel real and immediate

The Step 3 experience should be designed around the real VAPI call, not around a fake UI simulation.

---

## 7. What The Call Must Prove

The Step 3 proof call should demonstrate that AI-ABCX can:

- answer naturally
- represent the business well
- understand the caller's purpose
- detect urgency
- qualify the caller
- qualify the lead when relevant
- capture structured business details
- generate a real operational record
- move the record into the correct next workflow state

The system should prove:

`AI-ABCX turns calls into managed business action.`

---

## 8. Recommended Call Scenarios

For launch, Step 3 should focus on field service businesses.

The call scenario should be selected from a controlled field-service scenario set, such as:

- new service request
- estimate request
- urgent same-day issue
- after-hours service request
- reschedule request
- follow-up or existing-customer callback

The scenario should match the company's intake profile from Step 1 whenever possible.

---

## 9. Step 3 Inputs

Step 3 depends on data prepared in earlier steps.

Required inputs:

- company identity
- field service category
- service area
- scheduling style
- staffing assumptions
- selected path and price
- prepared voice/agent setup
- activation readiness from Step 2

These inputs should shape the prepared VAPI demo agent and the prepared dashboard state.

---

## 10. Step 3 Outputs

Step 3 should generate:

- live proof call completion state
- transcript
- recording reference
- structured lead/job record
- classification data
- routing data
- dashboard focus target
- activation readiness state

This output should persist into the prepared dashboard experience.

---

## 11. Product Rule

Step 3 is not:

- a marketing preview
- a generic dashboard demo
- a fake simulation
- a disconnected call sample

Step 3 is:

- a real company-specific proof experience
- a live call to the company's own AI agent
- a live dashboard proof showing what the system did with the call
- the main deal-closing tool before activation

---

## 12. UX Rule

The user should feel:

- low friction entering the call
- strong confidence during the call
- immediate clarity after the call
- emotional impact when their own dashboard opens with their own call data

The transition from call to dashboard should feel fast, direct, and intentional.

---

## 13. Activation Rule

The activation CTA should appear after the user has:

- completed the live proof call
- seen the resulting record in their own dashboard
- understood how the system behaved

Payment and activation should follow proof, not come before it.

---

## 14. Launch Recommendation

For launch, build Step 3 only for:

- small and medium field service businesses

Do not generalize the Step 3 logic yet for every business type.

The first Step 3 implementation should be strong, specific, and reliable for the initial field-service market.

---

## 15. Immediate Design Consequences

This Step 3 model means:

- the activation flow should be redesigned around live proof, not abstract preview
- the VAPI integration must be treated as core launch functionality
- the prepared dashboard must accept and display Step 3 call data cleanly
- the President dashboard should support opening directly on the Step 3 proof record
- fake placeholder demo states should not compete with the live Step 3 record

---

## 16. Next Build Items

The next design and implementation work should define:

1. exact Step 3 screen sequence
2. VAPI provisioning and demo-call trigger behavior
3. controlled field-service proof scenarios
4. structured call result schema for dashboard handoff
5. President dashboard focus state for Step 3 proof records
6. activation CTA and checkout handoff after proof
