# Creative Element — subscription (Lesson 8)

Method: [course lesson 8](../course/lessons/08-turn-delivery-into-a-subscription.md). Ads fatigue; local HVAC demand swings with the seasons — so a recurring refresh is the real product. But the promise must be specific enough for both sides to measure.

## The one-sentence promise (fill per tier)

> **[QTY] new ad variations every [CADENCE], informed by [LEARNING SIGNAL], reviewed by [APPROVER], for $[PRICE]/month on a [TERM] term.**

## Tier hypotheses (to validate — not market rates)

| | Tune-Up | Full System | Peak Season |
|---|---|---|---|
| Cadence | Every other Monday | Every Monday | Every Monday + seasonal push |
| Volume | 3 variations | 3 variations | 5 variations |
| Formats | 9:16 + 1:1 video, 1 static | 9:16, 1:1, 16:9, statics | + 6s bumpers, YouTube/PMax cuts |
| Revisions | 1 round per batch | 1 round per batch | 2 rounds per batch |
| Learning signal | Client-reported leads/calls by ad (if shared) | + Meta/Google ad metrics the client shares (CTR, CPL) | + monthly 20-min review call |
| Price hypothesis | $[T1] (test $600–900) | $[T2] (test $1,200–1,800) | $[T3] (test $2,000–2,500) |
| Term | Month-to-month | Month-to-month after 1st month | 3-month season (Sept–Nov or May–July) |

Example filled sentence (Full System): *"Three new ad variations every Monday, informed by the CTR and cost-per-lead numbers you share, reviewed by [owner name] at Creative Element, for $[T2]/month, month-to-month."*

**Not included (say so plainly):** ad spend, campaign management/media buying, landing pages, call tracking, guaranteed lead counts.

## The five parts of a recurring deliverable

| Part | How we run it |
|---|---|
| **Cadence** | Batches generated Monday, QC'd Monday–Tuesday, delivered by Wednesday noon after human approval. |
| **Volume** | Fixed per tier; extra concepts quoted separately. |
| **Creative memory** | Every shipped hook and angle logged in [`production/creative-memory.csv`](../production/creative-memory.csv); the Monday prompt must avoid repeats per client. |
| **Approval** | QC gate ([`qc/`](../qc/)) → named reviewer at Creative Element → client approval before anything runs. |
| **Learning signal** | Whatever performance evidence the client actually shares. If none, say "no performance data — variations based on creative rotation only". Never claim an ad "performed" without numbers. |

## HVAC seasonal angle calendar (New England)

| Months | Demand | Angles to rotate |
|---|---|---|
| Sept–Nov | Heating tune-ups, first cold snap, heat-pump conversions | "Before the first freeze", tune-up checklist, oil/propane-to-heat-pump |
| Dec–Feb | No-heat emergencies, frozen pipes adjacent | Emergency service (only if client actually offers it), comfort, reliability |
| Mar–Apr | Shoulder season — crews slower | Replacement planning, rebates (client-supplied only), indoor air quality |
| May–Jul | AC tune-ups, first heat wave, mini-split installs | "Before the first heat wave", ductless/mini-split, quiet comfort |
| Aug | Shoulder | Maintenance plans, financing (client-approved terms only) |

## Capacity check before selling
One delivery cycle must fit inside the price **and** the reviewer's time. Track per client per month in the economics model: credits used, generation minutes, review minutes, revision minutes, client comms. Don't sell a tier until one real cycle has been timed.

## Weekly run
See [`production/monday-refresh.md`](../production/monday-refresh.md).
