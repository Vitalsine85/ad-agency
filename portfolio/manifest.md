# Portfolio manifest (lesson 4)

These are five spec ads for **Maple Ridge Heating & Air**, a *fictional* demo HVAC company in Greenfield, MA. Its website (mapleridgehvac.example) and phone number (413-555-0142, a 555-01xx number reserved for fiction) don't belong to anyone. The prompts are in [production/prompts/](../production/prompts/).

**Status:** not generated yet. Generation spends Higgsfield credits, so it waits for a quote and your approval.

| # | Role | Prompt | Workflow / model | Credits | Job ID / result URL | Plays to end? | QC | Approved by | Site file |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Before & after | [before-after.md](../production/prompts/before-after.md) | | | | | | | |
| 2 | Funny | [funny.md](../production/prompts/funny.md) | | | | | | | |
| 3 | Fictional scenario ("Dramatization" label) | [fictional-scenario.md](../production/prompts/fictional-scenario.md) | | | | | | | |
| 4 | Problem-focused | [problem-focused.md](../production/prompts/problem-focused.md) | | | | | | | |
| 5 | Premium | [premium.md](../production/prompts/premium.md) | | | | | | | |

**When a clip is approved:**
1. Download the MP4 to `website/public/portfolio/0N-<role>.mp4`.
2. Set its `src` in `website/public/portfolio/manifest.json`.
3. Run `npm test` in `website/`.
4. Add a row to `production/creative-memory.csv` with `client_id` = `maple-ridge-demo`.
