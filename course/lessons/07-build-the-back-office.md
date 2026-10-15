# Lesson 7: Build the back office

- Source: https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency/build-the-back-office
- Lesson video: https://d2245ubjcvacnx.cloudfront.net/assets/claude-higgsfield-ai-ad-agency__build-the-back-office__video__lesson-video.e3b55414.mp4
- Captured: 2026-10-15

## Lesson review

The agency demo looks automatic because the manual work between steps is easy to miss. Someone still has to read replies, collect client facts, prepare generation requests, review outputs, and deliver the approved files. The goal of the back office is to make those handoffs explicit.

The review identifies the manual work between inbox, client profile, generation, checking, and delivery.

## Put the operating brief in a Claude Project

Create a Project and add the approved niche, offer, client-profile fields, creative rules, and approval gates to its instructions.


Claude’s Create a project dialog before instructions are added.

Open a fresh chat inside the Project and ask Claude to summarize:

  * who the service is for;
  * which client inputs are required;
  * what it may prepare;
  * which actions require human approval.

If the summary is incomplete, fix the Project instructions before connecting the inbox.

## Keep discovered facts provisional

Public sources can help identify a business, but they cannot approve facts for the client. Store a public business name or location with its URL, observation date, and **unconfirmed** status. Keep prices, services, promotions, contact details, claims, and brand approvals blank until the client supplies them.

## Connect the inbox with narrow permissions

The Gmail connector lets Claude read replies and draft responses. Limit its mailbox and tool permissions, and keep sending behind approval.


Claude connector controls with per-tool permission settings.

The first useful rule handles the agreed intent signal — “interested” — without pretending the rest of the workflow is ready:

**Prompt (copy this asset):**

When a prospect replies with the agreed intent signal, draft the intake response for approval. Add public business identity and location only as provisional discovery fields, with source URL, observation date, and unconfirmed status. Do not use them as approved claims or destinations until the client or named approver confirms them. Treat price, services, promotions, contact details, legal claims, and brand approvals as client-supplied facts. Prepare the free-sample request only when every claim-critical field is confirmed.


The reply-trigger workflow shown in the source.

Test the rule with a fake reply. A successful test produces a draft intake response, a provenance-tagged provisional profile, and no public message or generation request without approval.

Automation should remove copying and routing work, not responsibility. A person still approves the reply, the client facts, the sample request, and the final delivery.
