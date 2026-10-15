# Free sample (static) — outreach CTA fulfillment

**Job:** the "one free sample ad" promised in outreach. Cheapest unit; made only after the 5-question intake is answered and the facts used are client-confirmed.

**Route:** `ads-studio`.
1. If the prospect has a website: `ads_studio_create_brand` (homepage) — or with their approval, a product row via `ads_studio_add_product` with `text` = the confirmed service + offer and `images` = their logo/photos.
2. Wait until research/product is ready (no polling loops).
3. `ads_studio_quote` with `total: 1`, `aspect_ratio: "1:1"` (or `9:16`), `objective: "leads"`.
4. Show the credit cost → human OK → `ads_studio_generate` with a fresh `idempotency_key`.
5. Check copy fields (`headline`, `primary_text`, `cta`, `destination_url`) against the profile — replace anything not client-confirmed **before** QC.

**Prompt text (if prompt-only):**
> Lead-generation ad for [Company], a residential HVAC company serving [service area]. Promote: [service]. Offer: [client-confirmed offer or "no offer"]. Call to action: [CTA] — [phone/URL]. Tone: friendly, local, trustworthy. Do not add prices, rebates, guarantees, ratings, awards, response times or years in business.
