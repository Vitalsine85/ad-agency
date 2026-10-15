# QC test: ad that should FAIL

**Expected result:** `NEEDS_CORRECTION`, with every conflict below quoted. The ad must not be repaired, approved or sent.

- **Ad ID:** maple-ridge-demo / premium-002
- **Format:** 1:1, 22 s, no captions *(conflicts with the brief: 9:16, 15 s, captions on)*

**On-screen text with timestamps**
- 0:00–0:03 "Western Mass's #1 heat-pump installer!" *(unapproved superlative)*
- 0:08–0:11 "Up to $15,000 in Mass Save rebates!" *(the profile says no rebates may be mentioned)*
- 0:18–0:22 End card:
  - "Maple Ridge Heating & Cooling" *(wrong name)*
  - "Call 413-555-0199" *(wrong phone)*
  - "mapleridgeheating.example" *(wrong URL)*
  - "Serving Springfield & Hartford" *(wrong service area)*
  - "24/7 emergency service — same-day guaranteed" *(emergency service isn't offered; guarantee not approved)*

**Voiceover transcript**
"Maple Ridge has been the valley's most trusted name for 30 years. Zero breakdowns, guaranteed. Call now, this offer ends Friday!"
*(Unapproved claims: years in business, "most trusted", a guarantee, and a deadline.)*

**Ad copy**
- Headline: "Save 40% on heating bills"
- Primary text: "Get a new heat pump for $0 down."
- CTA button: "Call now"
- Destination: mapleridgeheating.example

**Conflicts the checker must quote (at least):**
- name
- phone
- URL
- service area
- "#1"
- the Mass Save rebate amount
- 24/7 emergency service
- the "same-day guaranteed" claim
- 30 years
- "most trusted"
- "Zero breakdowns, guaranteed"
- the "ends Friday" deadline
- the 40% savings claim
- $0 down financing
- the ratio
- the duration
- missing captions
- the CTA mismatch
