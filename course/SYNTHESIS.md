# Course synthesis — Build an AI Ad Agency with Claude + Higgsfield

Source: https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency (12 lessons, ~22 min, beginner).
Per-lesson notes: [`lessons/`](lessons/). Video transcripts: [`transcripts/`](transcripts/). Higgsfield tool map: [`higgsfield-workflows.md`](higgsfield-workflows.md).

The course has **no downloadable files** (no zips/templates). Its assets are the copyable prompts on each lesson page — all captured verbatim in `lessons/`.

## The business in one paragraph

Pick a boring service niche that already pays for ads but runs weak creative. Sell an *outcome* (booked jobs), not "five videos". Prove you can deliver with a five-role spec portfolio generated through Claude + the Higgsfield connector. Reach a small, evidence-qualified list (10–15 companies) with a prospect-first email whose only ask is "reply interested for one free sample". The sample request doubles as the intake — anyone willing to hand over real business details is a real lead. Deliver through a provenance-tracked client profile, an automated-but-human-approved QC gate, then convert to a weekly creative-refresh subscription. Validate the economics with real logged numbers before scaling.

## Non-negotiable operating rules (repeated across lessons)

1. **No fabrication.** Never invent proof, testimonials, client results, guarantees, scarcity, urgency, familiarity, consent, or company facts. Synthetic people are never labeled "customer testimonial"; fictional scenarios are labeled as fiction. (L2, L4, L6, L10)
2. **Measurable, honest promises.** "Designed to bring inquiries" — not "will bring". Introductory discounts need a truthful reason (e.g. launch price for first clients). (L2, L10)
3. **Provenance + approval on every fact.** Source ∈ {client-supplied, public URL + observation date, inference + basis, missing}; approval ∈ {unconfirmed, client-confirmed, approver-approved, flagged assumption}. Public info is never client approval. (L5, L7)
4. **Stop and ask** when a claim-critical fact is missing: contact details, price, promotion, deadline, eligibility, disclaimer, logo/brand asset. Never let the model "figure it out". (L5)
5. **Human approval gates.** A named person approves: each outreach recipient + message (first batch), each intake reply, the client facts, the sample request, and every external delivery. Automation removes copying and routing, not responsibility. (L6, L7, L8, L9, L11)
6. **QC never repairs, approves, or sends silently.** It returns `READY_FOR_HUMAN_REVIEW` or quoted conflicts routed back. (L9)
7. **Compliance before sending.** Record jurisdiction rule set, sender identity, ad disclosure, postal address, opt-out, suppression list, and the public source behind each opening observation (US: CAN-SPAM). (L6, L11)
8. **Narrow permissions.** Connectors (Higgsfield, Gmail) get only the tools needed; no "always allow" while testing; sending stays behind approval; test with disposable data first. (L3, L7)
9. **Observed vs assumed.** Example figures from the videos ($1,000/video, $500 test, $2,000/mo, 6% growth) are not market facts. Label every number as assumption or observation. (L1, L2, L8, L12)
10. **Small tests, one variable at a time.** 10–15 prospects, not 5,000. Go / revise / stop rules written before launch. (L11, L12)

## Lesson → what it produces in this repo

| # | Lesson | Core framework | Repo deliverable |
|---|---|---|---|
| 1 | Find an underserved niche | Spend + creative gap + urgency; cite everything; thesis sentence | `business/01-niche-research.md` |
| 2 | Shape the offer | 5 decisions: result, problem, first-step risk, delivery (+bonus), next action | `business/offer.md` |
| 3 | Connect Claude and Higgsfield | Custom connector; prove round trip with playable media | `ops/setup-connectors.md` |
| 4 | Generate a varied portfolio | 5 creative roles; 3-sec hook + CTA; label fiction | `production/`, `portfolio/manifest.md` |
| 5 | Design the client intake | Work back from finished ad; source + approval per fact | `intake/` |
| 6 | Rewrite cold outreach | Company+city subject; one verified observation; one proof link; "reply interested" | `outreach/` |
| 7 | Build the back office | Claude Project operating brief; Gmail reply trigger; fake-reply test | `ops/claude-project-brief.md`, `ops/reply-trigger.md` |
| 8 | Turn delivery into a subscription | Cadence, volume, creative memory, approval, learning signal | `business/subscription.md`, `production/monday-refresh.md` |
| 9 | Add a quality-control gate | Audit vs approved profile → READY_FOR_HUMAN_REVIEW / conflicts; pass+fail tests | `qc/` |
| 10 | Build the sales website | 5 blocks (Hero, Work, Process, Benefits, FAQ) + same CTA after each; protected admin; funnel test | `website/` |
| 11 | Launch to a qualified list | Evidence URL + date + gap per prospect; four rate metrics; launch log | `launch/` |
| 12 | Pressure-test the economics | Assumptions vs observations; 3 scenarios; go/revise/stop | `finance/economics-model.xlsx` |

## Things the videos say that the written lessons correct

| Video says | Course correction we follow |
|---|---|
| "Roofing grows 6% YoY" (from Claude, unsourced) | Verify independently before using. |
| Offer should make them "feel like an idiot for saying no"; "try to take payment on the call" | Keep the five-part structure but no manufactured pressure; one clear next action. |
| "$500 instead of $5,000 in 24 hours" | Price from real costs; discount needs a truthful reason. |
| Testimonial-style ad with a synthetic speaker's "$12,000 loss" | Label as fictional scenario; drop unsupported specifics (FTC endorsement guides). |
| "If info is missing, Claude should figure it out on its own" | Stop and ask for claim-critical facts. |
| Generated site CTA "GET A FREE ROOF CHECK" + synthetic clip labeled "CUSTOMER TESTIMONIAL" | One consistent free-sample CTA; never label synthetic media as testimonial. |
| QC agent: "If it passes, it sends. I only ever look at the broken ones." | Passing ads go to `READY_FOR_HUMAN_REVIEW`; a named human still releases every delivery. |
| Intake auto-reply: "Claude sends the intake questions… generates their free sample. I touch nothing." | Claude *drafts*; a human approves the reply, the facts, and the sample request. |
| Website benefits: "No filming days, no extra costs" | Only verified benefits; don't claim "no extra costs" unless true. |
| "Launch price just for our first 50 clients" | Fine only if it's true; any scarcity must be real. |
| Email blast to 5,000 roofers | 10–15 evidence-qualified prospects first. |
| $2k/mo × 10 clients = $20k | Arithmetic fine, assumptions unproven; first batch tests them. |

## The experts' frameworks (from the transcripts)

- **Liam Ottley — offer formula (L2):** sell the end result; hit the biggest problem; remove the risk; add speed + easy entry price + a gift; one explicit call to action.
- **Brock — outreach fixes (L6):** subject = their company + city; show the work (one link); CTA "reply interested for one free sample". *The CTA is the filter:* anyone who sends real business info to get the sample is a real lead.
- **Nate Herk — five scale upgrades (L7–L9):** (1) run from a Claude Project with the ops-manager brief as instructions; (2) connect the outreach inbox via Gmail connector; (3) "interested" reply → intake questions + verification (does the company exist in that city, does the phone look real) → saved client profile → free sample; (4) weekly subscription with a hook/angle log; (5) QC agent checks every video against the profile (name, city, services, phone, risky claims) before delivery. End state: the owner types one sentence ("make 5 ads") per new client.
- **Semen Yassar — selling website (L10):** not an art project, a conversation; five blocks (Hero: what/who/what-I-get + offer + honest reason for low price; Work: playable videos; How it works: ~5 quick questions; Benefits; FAQ: ~4 real objections); the same strongest CTA button after every block → simple form → admin dashboard.
- **Jack Roberts — launch (L11):** no blasting; 10–15 companies with a crystal-clear reason to buy *right now* (already spending on ads, outdated video, heavy spend on weak premium ads); personalize to each.

## Adapting the course to local & regional businesses

- **Evidence sources for qualification (L1, L11):** Meta Ad Library (search by advertiser/location; note ad start dates and creative), Google Ads Transparency Center, Google Local Services Ads presence ("Google Guaranteed/Screened" badges), Google Business Profile photos/videos, Yelp/Angi/Nextdoor sponsored placements, local TV/radio/billboard/direct-mail presence, the business's own website/YouTube.
- **Offers framed around local outcomes:** booked estimates/appointments in a named service area, filling slow-season or crew capacity, storm/seasonal readiness — never guaranteed lead counts.
- **Local facts are claim-critical:** service area, license numbers (contractors), financing terms, warranty language, seasonal promos, phone tracking numbers — all client-supplied and approved.
- **Regulated-niche caution:** health (med spa, dental, chiro), legal, and financial ads carry extra claim rules (state boards, bar advertising rules, FTC). Default to plain service ads and require client-approved disclaimers.
- **Jurisdiction:** US CAN-SPAM for email; check state rules for telemarketing/SMS (TCPA) before adding calls or texts — email first.

## Coverage checklist

- [x] L1–L12 written review captured (`lessons/`)
- [x] Course prompts captured verbatim (in each lesson file under "Prompt (copy this asset)")
- [x] L1–L12 video transcripts (`transcripts/`, auto-generated; may contain name/term errors)
- [x] Higgsfield workflow mapping (`higgsfield-workflows.md`)
- [x] L1 `business/01-niche-research.md` · L2 `business/offer.md` · L3 `ops/setup-connectors.md` · L5 `intake/` · L6 `outreach/` · L7 `ops/` · L8 `business/subscription.md`, `production/monday-refresh.md` · L9 `qc/` (tested) · L10 `website/` (23 automated checks) · L11 `launch/` · L12 `finance/economics-model.xlsx`
- [ ] L4 portfolio media: prompts ready in `production/prompts/`; generation waits for a credit quote and owner approval
