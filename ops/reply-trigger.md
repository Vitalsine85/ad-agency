# The "interested" reply rule, and how to test it (lesson 7)

## Rule
This is the course prompt, word for word. It is already included in [claude-project-brief.md](claude-project-brief.md).

> When a prospect replies with the agreed intent signal, draft the intake response for approval. Add public business identity and location only as provisional discovery fields, with source URL, observation date, and unconfirmed status. Do not use them as approved claims or destinations until the client or named approver confirms them. Treat price, services, promotions, contact details, legal claims, and brand approvals as client-supplied facts. Prepare the free-sample request only when every claim-critical field is confirmed.

## Fake-reply test (run before going live)

Send this to the outreach inbox from a second account you control:

> **From:** test-owner@example.com
> **Subject:** Re: Maple Ridge Heating & Air — Greenfield heating ads
> **Body:** interested. we do mostly heat pumps now. call me 413-555-0142

*Maple Ridge Heating & Air is a fictional company. 555-01xx numbers are reserved for fiction.*

Then ask the Project: "Check the inbox for new replies and handle them."

**Pass criteria. All must be true:**
- [ ] A **draft** intake reply exists that uses the five questions. Nothing was sent.
- [ ] A provisional profile was created with:
  - business name and city as `public-url` or `client-supplied`, with approval `unconfirmed`
  - phone `413-555-0142` as `client-supplied` and `unconfirmed` (it came from a casual email, so it still needs explicit confirmation for ad use)
  - "heat pumps" as the service, `client-supplied`, `unconfirmed`
- [ ] Offer, price, service area, logo and delivery destination are listed under **missing: must ask**.
- [ ] No generation was requested and no credits were spent.
- [ ] Nothing public was sent or published.

If any check fails, fix the Project instructions and run the test again.
