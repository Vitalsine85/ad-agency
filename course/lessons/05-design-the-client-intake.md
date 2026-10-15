# Lesson 5: Design the client intake

- Source: https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency/design-the-client-intake
- Lesson video: https://d2245ubjcvacnx.cloudfront.net/assets/claude-higgsfield-ai-ad-agency__design-the-client-intake__video__lesson-video.f7c3a836.mp4
- Captured: 2026-10-15

## Lesson review

Build the intake from the finished ad backwards. Which facts could change the copy, visuals, offer, or delivery destination? Those are the facts you need before generation begins.


Claude acting as the agency’s operations manager and collecting business details.

## Do not let the model fill factual gaps

The video tells Claude to “figure it out on its own” when information is missing. That is unsafe for details such as a phone number, price, promotion, eligibility rule, or approved logo. A plausible answer is still fabricated if the client never supplied or approved it.

**[Unsafe instruction]**

**[Safe instruction]**

If something is missing, infer it and continue so the client is not interrupted.

If a missing fact would appear in the ad or change where it is delivered, stop and ask for confirmation.

## Record provenance and approval separately

Two questions apply to every fact:

  1. **Where did it come from?** Client input, a dated public source, a stated inference, or nowhere.
  2. **Who approved its use?** Nobody yet, the client, or the named approver.

A public website may confirm a business name or location, but it does not give you permission to publish an offer on the client’s behalf.

Fact| Acceptable source| What to do if missing  
---|---|---  
Business identity and location| Client or dated public URL| Keep provisional until confirmed  
Phone, email, booking link| Client| Stop and ask  
Price, promotion, deadline| Client| Stop and ask  
Eligibility and disclaimers| Client or approved legal source| Stop and ask  
Logo and brand assets| Client| Stop and ask  
Audience or creative angle| Client or stated inference| Mark as an assumption  
  
## Produce a profile before producing media

**Prompt (copy this asset):**

Act as the operations manager for this ad service. Collect only the client facts needed to personalize and deliver the campaign. For every fact, record two separate fields: source (client-supplied, public URL plus observation date, inference plus its stated basis, or missing) and approval (unconfirmed, client-confirmed, approver-approved, or flagged assumption). If a claim-critical fact is missing — a contact detail, price, promotion, deadline, eligibility rule, disclaimer, or unapproved brand asset — stop and ask the client for it. Never invent a missing fact, and never treat public provenance or inference as client approval. Output the structured profile before any generation runs.

Review the resulting profile with the client. Generation can begin when public-facing facts are confirmed and any creative assumptions are clearly marked.
