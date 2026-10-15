# Quality-control gate (lesson 9)

At 50 clients × 5 ads a month, nobody catches every wrong phone number by eye. This check compares each ad with the **approved** client profile and prepares a review packet. **It never approves, repairs, or sends anything.**

## Course prompt (verbatim)

> Audit this final ad against the attached approved client profile. Return READY_FOR_HUMAN_REVIEW only if company identity, service area, contact details, offer, claims, disclaimers, brand rules, technical format, and call to action all match. For every failure, quote the exact frame or line, name the conflicting source field, and route it for correction. Never repair, approve, or send an ad silently. Every external delivery requires the named human approver.

## Creative Element addendum (HVAC)

> **Inputs**
> - the ad's script or transcript
> - every piece of on-screen text, with its timestamp
> - the ad copy fields (headline, primary text, CTA, destination URL)
> - the format (ratio, duration, captions yes/no)
> - the client profile
>
> **Which profile facts count.** Only facts marked `client-confirmed` or `approver-approved`. A fact that is `unconfirmed` or a `flagged-assumption` counts as **not approved**. If the ad uses one, that's a failure.
>
> **HVAC claims you must flag unless they appear word for word in the approved profile:**
> - rebate or incentive amounts or eligibility (Mass Save, NHSaves, Efficiency Vermont, federal credits)
> - financing terms
> - prices
> - energy-savings percentages
> - "24/7", "same-day" and response-time claims
> - guarantees and warranties
> - license numbers
> - certifications and awards
> - years in business
> - "#1", "best" and other superlatives
>
> **Also flag:**
> - any person presented as a real customer or employee without a consent record
> - a missing "Dramatization" label on a fictional scenario
> - logos or phone numbers drawn by the AI instead of added in post
> - a CTA that doesn't match the approved CTA
> - a ratio or duration that doesn't match the brief
> - videos without captions
>
> **Output format**
> ```
> RESULT: READY_FOR_HUMAN_REVIEW | NEEDS_CORRECTION
> CLIENT: <client_id>   AD: <ad_id>   CHECKED: <ISO datetime>
> CHECKS:
>  - company identity: PASS|FAIL — <evidence>
>  - service area: …
>  - contact details: …
>  - offer: …
>  - claims: …
>  - disclaimers: …
>  - brand rules: …
>  - technical format: …
>  - call to action: …
> FAILURES:
>  - <timestamp or copy field>: "<exact quote>" conflicts with profile.<field> = "<approved value or 'not approved'>" → route to <producer>
> REVIEW PACKET: <ad link> + this report + the cited profile fields
> ```
>
> **Never change the ad. Never write a "fixed" version. Never mark anything approved or delivered.**

## Test both outcomes before you use this on real client work
Test cases: [test-cases/](test-cases/)
- The pass case must return `READY_FOR_HUMAN_REVIEW`, with all nine checks passing.
- The fail case must return `NEEDS_CORRECTION` and quote every conflict.
- If the checker silently fixes a field or "sends" the matching version, **the test failed**. Fix the workflow before adding real client work.
