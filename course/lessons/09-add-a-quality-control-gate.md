# Lesson 9: Add a quality-control gate

- Source: https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency/add-a-quality-control-gate
- Lesson video: https://d2245ubjcvacnx.cloudfront.net/assets/claude-higgsfield-ai-ad-agency__add-a-quality-control-gate__video__lesson-video.be436ad5.mp4
- Captured: 2026-10-15

## Lesson review

The video imagines 50 clients receiving five videos each month. At that volume, a person can easily miss a wrong phone number or unsupported claim. An automated check can compare each ad with the approved client profile and prepare a review packet; it should not approve or send the ad.

## Compare the ad with approved facts

Check the company identity, service area, contact details, offer, claims, disclaimers, brand rules, format, and call to action. Use the client-approved profile from Lesson 5, not a mixture of confirmed facts and public guesses.

**Prompt (copy this asset):**

Audit this final ad against the attached approved client profile. Return READY_FOR_HUMAN_REVIEW only if company identity, service area, contact details, offer, claims, disclaimers, brand rules, technical format, and call to action all match. For every failure, quote the exact frame or line, name the conflicting source field, and route it for correction. Never repair, approve, or send an ad silently. Every external delivery requires the named human approver.

## Test both outcomes

Use a sample profile — for example, Northstar Roofing in Denver, `northstar.example`, phone `555-0104` — and run two tests.

**[Matches the profile]**

**[Conflicts with the profile]**

The identity, location, URL, phone, and claims match. The result is **READY_FOR_HUMAN_REVIEW** , and the reviewer receives the ad, the check result, and the cited profile fields.

Change the name, city, URL, and add an unsupported “zero leaks forever” promise. The result should quote each conflict and route the ad back for correction.

If the checker silently repairs a field or sends the matching version, the test has failed. Fix the workflow before adding real client work.

Automated checking reduces repetitive comparison work. The named reviewer remains responsible for the claims and the final delivery.
