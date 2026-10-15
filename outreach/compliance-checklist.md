# Outreach compliance checklist

**This checklist is not legal advice.** If you're unsure, check the FTC guide or ask a lawyer.

## US commercial email: CAN-SPAM
Source: FTC, [CAN-SPAM Act: A Compliance Guide for Business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)

- [ ] **Accurate header info.** The From name and reply-to identify you as Creative Element. Send from a creative-element.net mailbox.
- [ ] **Subject line isn't deceptive.** It names their company and city, and the email actually is about their ads.
- [ ] **The email says it's an ad.** Include the line "This is a commercial message from Creative Element."
- [ ] **Valid physical postal address.** A street address, a registered USPS PO box, or a registered private mailbox.
- [ ] **Clear opt-out that works.** Reply "stop". It has to work for at least 30 days after sending. Honor opt-outs within 10 business days; our standard is the same day.
- [ ] **Suppression list checked** before every send. Prior opt-outs stay suppressed permanently.
- [ ] **No sending through vendors you don't monitor.** You're legally responsible for anyone who emails on your behalf.

## Before each send, record these in `launch/launch-log.csv`
- the rule set that applies (`US-CAN-SPAM`)
- sender identity
- disclosure included (y/n)
- postal address included (y/n)
- opt-out method
- suppression list checked (y/n)
- the evidence URL and the date you observed it
- who approved the email, and when

## Channels not cleared yet
- **SMS and texting, cold calls with autodialers or prerecorded messages:** these fall under the TCPA and state telemarketing laws. Don't use them until they've been reviewed.
- **LinkedIn and Facebook DMs:** follow the platform's terms of service, and apply the same honesty rules as email.

## Email deliverability (practical, not legal)
- Set up SPF, DKIM and DMARC on creative-element.net before sending anything.
- Send by hand from a real inbox. Start at 10–15 emails total (lesson 11) rather than in bulk.
- Don't use link shorteners. Use exactly one link: the proof link.

## Suppression list
Keep it in [`suppression-list.csv`](suppression-list.csv) and never delete anyone from it.
