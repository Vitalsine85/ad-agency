# Prompt: draft one outreach email

## Course prompt (lesson 6, verbatim)

> Draft a short B2B outreach email to [company] in [city] under the compliance rules approved for [recipient jurisdiction]. Subject: their company name and city, never my agency. Open with one truthful, verifiable observation about their current advertising. Add exactly one relevant portfolio link as proof. Offer one free sample ad, and close with the permitted low-friction reply — reply interested for one free sample. Use accurate sender identity and routing, include the approved ad disclosure, postal address, and opt-out. Do not invent familiarity, results, urgency, consent, or company facts; leave any field I have not verified blank for me to fill.

## Creative Element fill-in (use with the prompt above)

```
company: [from launch/launch-log.csv]
city: [from launch-log]
recipient jurisdiction: United States — CAN-SPAM (sender in MA; recipient state [MA/NH/VT])
evidence: [evidence_url] observed [observation_date]: [creative_gap]
portfolio link: [single URL on creative-element.net matching the gap]
sender: [Name], Creative Element, creative-element.net
postal address: [POSTAL_ADDRESS]
disclosure: "This is a commercial message from Creative Element."
opt-out: reply "stop" (honor within 10 business days; we honor same day)
template: outreach/email-template.md
```

## Approval
For every message in the first batch, a named human approves all four of these before sending, and records the approval in [`launch/launch-log.csv`](../launch/launch-log.csv):
- the recipient
- the evidence
- the copy
- the compliance record
