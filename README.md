# Creative Element: operating repo

**Creative Element** (creative-element.net · Orange, MA) is being relaunched as a creative studio for local and regional brands. The first service line is **AI ad creative for HVAC contractors** in Western and Central Massachusetts, southern New Hampshire and southern Vermont.

The system is built from Higgsfield Academy's course [*Build an AI Ad Agency with Claude + Higgsfield*](https://higgsfield.ai/academy/courses/claude-higgsfield-ai-ad-agency). Every lesson maps to a folder in this repo.

## Start here
1. **Read the course synthesis:** [course/SYNTHESIS.md](course/SYNTHESIS.md). It has the 10 operating rules and the lesson-to-folder map.
2. **Decide the business:** [business/README.md](business/README.md) (service lines), then [01-niche-research.md](business/01-niche-research.md), then [offer.md](business/offer.md), then [subscription.md](business/subscription.md).
3. **Set up Claude:** follow [ops/setup-connectors.md](ops/setup-connectors.md) (Higgsfield and Gmail). Then paste [ops/claude-project-brief.md](ops/claude-project-brief.md) into a Claude Project and run the fake-reply test in [ops/reply-trigger.md](ops/reply-trigger.md).
4. **Make the portfolio:** use [production/prompts/portfolio-batch.md](production/prompts/portfolio-batch.md) and track progress in [portfolio/manifest.md](portfolio/manifest.md). This step costs credits, so quote it first.
5. **Run the website locally:** see [website/README.md](website/README.md). Run `npm test` for the funnel checks.
6. **Launch:** pick 10–15 qualified prospects using [launch/prospect-criteria.md](launch/prospect-criteria.md). Write emails with [outreach/email-template.md](outreach/email-template.md) and check them against [outreach/compliance-checklist.md](outreach/compliance-checklist.md). Log everything in [launch/launch-log.csv](launch/launch-log.csv).
7. **Decide:** enter the observed numbers in [finance/economics-model.xlsx](finance/economics-model.xlsx). It tells you go, revise or stop.

## Folder map

| Folder | What's in it | Course lesson |
|---|---|---|
| `course/` | All 12 lessons, video transcripts, synthesis, Higgsfield workflow map | all |
| `business/` | Service lines, niche research, offer, subscription | 1, 2, 8 |
| `ops/` | Claude Project brief, connector setup, "interested" reply rule | 3, 7 |
| `intake/` | Client profile schema and template (every fact carries a source and an approval), fact rules, questionnaire, ops-manager prompt | 5 |
| `outreach/` | Prospect-first email, outreach prompt, CAN-SPAM checklist, follow-ups, suppression list | 6 |
| `production/` | Playbook, prompts for each creative role, Monday refresh, creative memory | 4, 8 |
| `qc/` | QC audit prompt, pass and fail test cases, test results | 9 |
| `portfolio/` | Spec-ad manifest (fictional demo client) | 4 |
| `website/` | Studio site, HVAC five-block sales page, lead API, protected admin, funnel tests | 10 |
| `launch/` | Prospect criteria, prompt, launch log | 11 |
| `finance/` | One-month validation model: assumptions vs observed, go/revise/stop | 12 |

## Weekly rhythm (once you have clients)

| Day | What happens |
|---|---|
| **Mon** | "It is Monday." Run the refresh in the Claude Project ([production/monday-refresh.md](production/monday-refresh.md)). Approve the credit quote, generate, and QC. |
| **Tue** | Review: approve or reject each variation. Handle revisions. |
| **Wed** | Send the approved delivery emails by noon. Log hooks in creative memory. |
| **Thu** | Prospecting: research 3–5 new prospects and draft evidence-specific emails for approval. |
| **Fri** | Update the launch log and the economics model's Observed sheet. Check that time and credits per client still fit the price. |

## Non-negotiables
These come from the course and apply to every Creative Element service:
- Never invent proof, testimonials, results, rebates, guarantees, urgency or company facts.
- Every fact has a source and a separate approval. If a claim-critical fact is missing, stop and ask.
- A named human approves every outreach email, intake reply, sample request and delivery.
- The QC gate never repairs, approves or sends anything.
- Small tests, one variable at a time. Don't scale until observed numbers support both demand and capacity.

## Things only you can fill in
- Postal address for CAN-SPAM. It goes in the outreach signature and on the site.
- Your name as the named approver. Search the repo for `[OWNER NAME]`.
- The `hello@creative-element.net` mailbox, plus SPF, DKIM and DMARC for the domain.
- Pilot and subscription prices, once you've validated them in the economics model. They go in `website/public/site.json`.
- Approval and a credit budget to generate the five portfolio ads.
