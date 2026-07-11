# AI-ABCX Phase 1 Execution Checklist

This document converts the Phase 1 roadmap into a practical execution checklist.

Its purpose is to answer one operational question:

`What exactly must be completed before Tier 1 can be considered real, testable, and ready to feed the rest of the launch build?`

Phase 1 covers only the three commercial-entry directors:

- Estimator Director
- Call Handling Director
- Website Director

These three are the first launch gate because they create the strongest entry paths into AI-ABCX:

- quote-led entry
- phone-led entry
- website-led entry

---

## 1. Phase 1 Success Rule

Phase 1 is complete only when all three Tier 1 directors have:

1. locked names
2. defined A / B / C levels
3. working screens or control surfaces
4. dashboard visibility
5. guided activation hooks
6. dependency rules
7. pricing decisions
8. internal test scenarios

If even one of those is missing, the director is not complete.

If even one of the three directors is incomplete, Phase 1 is not complete.

---

## 2. Phase 1 Build Order

Recommended execution order:

1. Estimator Director
2. Call Handling Director
3. Website Director

Why:

- Estimator Director is the clearest commercial benchmark gap.
- Call Handling Director is one of the strongest AI-ABCX differentiators.
- Website Director becomes the strongest long-term infrastructure lock-in layer.

---

## 3. Shared Tier 1 Lock Checklist

These items must be true for all three directors.

### Naming lock

- [ ] Public-facing name is finalized
- [ ] Internal config name is finalized
- [ ] Dashboard label is finalized
- [ ] Any legacy names are mapped and marked for cleanup

### A / B / C architecture lock

- [ ] Level A is defined
- [ ] Level B is defined
- [ ] Level C is defined
- [ ] Upgrade triggers are defined
- [ ] Downgrade rules are defined if needed

### Dependency lock

- [ ] Standalone behavior is defined
- [ ] Required companion directors are defined
- [ ] Optional companion directors are defined
- [ ] Upstream inputs are defined
- [ ] Downstream handoffs are defined

### President visibility lock

- [ ] Director appears as a real lane in President logic
- [ ] Outcomes are visible to the President
- [ ] unresolved states are visible to the President
- [ ] next actions are visible to the President

### Guided activation lock

- [ ] Step 1 can qualify whether the customer needs the director
- [ ] Step 1 can recommend the right level
- [ ] Step 2 can explain why the recommendation was made
- [ ] Step 2 can show pricing impact

### Testing lock

- [ ] Standalone test scenario exists
- [ ] Bundle test scenario exists
- [ ] Upgrade test scenario exists
- [ ] Dashboard visibility test exists

---

## 4. Estimator Director Execution Checklist

## Objective

Build the first strong estimating director that captures quote demand, tracks estimate states, and feeds follow-up, sales, and scheduling.

## Build checklist

### Product definition

- [ ] Lock Estimator Director public definition
- [ ] Lock Estimator Director internal definition
- [ ] Write final A / B / C level definition
- [ ] Define estimate workflow states
- [ ] Define accepted / pending / lost / follow-up-needed states

### Product surfaces

- [ ] Create or finalize standalone Estimator Director screen
- [ ] Create estimate intake surface
- [ ] Create quote workflow surface
- [ ] Create estimate history / status surface
- [ ] Create President-facing estimate summary output

### Inputs and sources

- [ ] Website-origin quote request is supported
- [ ] Ad-origin quote request is supported
- [ ] Call-origin quote request is supported
- [ ] Manual-entry quote request is supported
- [ ] Source tagging is visible

### Director handoffs

- [ ] Handoff to Follow-Up Director is defined
- [ ] Handoff to Sales Director is defined
- [ ] Handoff to Scheduling Director is defined
- [ ] Handoff rules by level A / B / C are defined

### Guided activation

- [ ] Questions that qualify estimator need are identified
- [ ] Questions that qualify estimator level are identified
- [ ] Recommendation language is drafted
- [ ] Customer-facing explanation text is drafted

### Pricing

- [ ] Level A price is decided
- [ ] Level B price is decided
- [ ] Level C price is decided
- [ ] Bundle pricing implications are noted

### Tests

- [ ] Standalone estimator flow test
- [ ] Estimate-to-follow-up test
- [ ] Estimate-to-sales test
- [ ] Estimate-to-scheduling test
- [ ] President dashboard estimate visibility test

## Completion gate

Estimator Director is complete only when:

- it can intake quote demand
- it can track estimate outcome
- it can hand off correctly
- the President can see its status
- Step 1 and Step 2 can recommend it credibly

---

## 5. Call Handling Director Execution Checklist

## Objective

Build the universal AI call-handling layer that can answer, qualify, route, escalate, and feed the rest of the operating system.

## Build checklist

### Product definition

- [ ] Lock Call Handling Director public definition
- [ ] Lock Call Handling Director internal definition
- [ ] Write final A / B / C level definition
- [ ] Define minute usage model
- [ ] Define outcome and escalation states

### Product surfaces

- [ ] Create or finalize standalone Call Handling Director screen
- [ ] Create call state / transcript visibility surface
- [ ] Create lead qualification summary surface
- [ ] Create escalation / after-hours / urgency visibility surface
- [ ] Create President-facing call-handling summary output

### Core operating behavior

- [ ] Basic receptionist path is defined
- [ ] Multi-lingual behavior is defined
- [ ] Lead qualification behavior is defined
- [ ] After-hours behavior is defined
- [ ] Urgency handling behavior is defined
- [ ] Appointment-booking behavior is defined where allowed

### Director handoffs

- [ ] Handoff to Estimator Director is defined
- [ ] Handoff to Scheduling Director is defined
- [ ] Handoff to Follow-Up Director is defined
- [ ] Handoff to Sales Director is defined
- [ ] Handoff to Website Director is defined where website forms or lead capture interact

### Guided activation

- [ ] Questions that qualify call volume are identified
- [ ] Questions that qualify booking complexity are identified
- [ ] Questions that qualify language / urgency / after-hours needs are identified
- [ ] Recommendation language is drafted
- [ ] Customer-facing explanation text is drafted

### Pricing

- [ ] Director base charge is decided
- [ ] Minute usage structure is decided
- [ ] Trial policy is decided
- [ ] Partner-program exception policy is noted

### Tests

- [ ] Basic answering test
- [ ] Qualified lead capture test
- [ ] Escalation test
- [ ] Appointment-booking test
- [ ] Minute accounting test
- [ ] President dashboard call visibility test

## Completion gate

Call Handling Director is complete only when:

- it can answer and classify calls
- it can route or escalate correctly
- its outcomes are visible to the President
- its pricing is understandable in dollars
- it connects credibly to the rest of the system

---

## 6. Website Director Execution Checklist

## Objective

Build the website-control layer that can either monitor an existing site or support AI-ABCX-hosted websites that are structurally ready for marketing, lead capture, and system integration.

## Build checklist

### Product definition

- [ ] Lock Website Director public definition
- [ ] Lock Website Director internal definition
- [ ] Write final A / B / C level definition
- [ ] Define existing-site path vs AI-ABCX-hosted path
- [ ] Define what each level includes

### Product surfaces

- [ ] Create or finalize standalone Website Director screen
- [ ] Create website status surface
- [ ] Create website recommendation surface
- [ ] Create website performance and monitoring summary
- [ ] Create President-facing website status output

### Website intake

- [ ] Website URL input is defined
- [ ] No-website path is defined
- [ ] Logo input path is defined
- [ ] brand color / style preference path is defined
- [ ] content / image intake path is defined

### Website logic

- [ ] Existing website analysis rules are defined
- [ ] Required website upgrade rules are defined
- [ ] AI-generated new website path is defined
- [ ] Generic content fallback path is defined
- [ ] Generic image fallback path is defined

### Director handoffs

- [ ] Relationship to Marketing Director is defined
- [ ] Relationship to Advertising Director is defined
- [ ] Relationship to Lead Generation Director is defined
- [ ] Relationship to Call Handling Director is defined
- [ ] Relationship to Estimator Director is defined

### Guided activation

- [ ] Questions that qualify current website condition are identified
- [ ] Questions that qualify desired website role are identified
- [ ] Questions that qualify required integrations are identified
- [ ] Recommendation language is drafted
- [ ] Customer-facing explanation text is drafted

### Pricing

- [ ] Hosted website A price is decided
- [ ] Hosted website B price is decided
- [ ] Hosted website C price is decided
- [ ] Existing-site connector A price is decided
- [ ] Existing-site connector B price is decided
- [ ] Existing-site connector C price is decided

### Tests

- [ ] Existing-site analysis test
- [ ] No-website intake test
- [ ] Hosted-site recommendation test
- [ ] Existing-site connector test
- [ ] President dashboard website visibility test

## Completion gate

Website Director is complete only when:

- it can evaluate whether a current site is enough
- it can explain when a new site is required
- it can feed the marketing and lead system correctly
- it is priced clearly for both hosted and existing-site paths

---

## 7. Phase 1 Bundle Tests

After all three directors are individually complete, the system still needs bundle testing.

### Required bundle test group 1

- [ ] Website + Estimator
- [ ] Call Handling + Estimator
- [ ] Call Handling + Scheduling

### Required bundle test group 2

- [ ] Website + Call Handling + Estimator
- [ ] Website + Call Handling + Scheduling
- [ ] Website + Estimator + Follow-Up

### Required bundle test group 3

- [ ] Quote-led small business scenario
- [ ] Phone-led small business scenario
- [ ] Website-led small business scenario

---

## 8. Phase 1 Exit Questions

Phase 1 should not be closed until all of these questions can be answered with `yes`.

- [ ] Can a business enter AI-ABCX through estimating?
- [ ] Can a business enter AI-ABCX through phone handling?
- [ ] Can a business enter AI-ABCX through website need?
- [ ] Can the President see all three lanes clearly?
- [ ] Can guided activation recommend all three credibly?
- [ ] Can pricing for all three be explained simply?
- [ ] Can internal testing prove the workflows?

If any answer is `no`, Phase 1 should stay open.

---

## 9. Practical Conclusion

Phase 1 is not just the first build wave.

It is the first proof that AI-ABCX can become commercially real.

If Tier 1 is completed properly:

- AI-ABCX has real entry modules
- AI-ABCX has real recommendation logic
- AI-ABCX has real President visibility
- AI-ABCX has a strong base for Tier 2

That is why Phase 1 should be treated as the first true launch gate.
