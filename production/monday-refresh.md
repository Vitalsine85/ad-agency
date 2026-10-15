# Monday refresh: weekly runbook (lesson 8)

## The prompt
This is the course version. It differs from the video's version in two ways: it limits the run to **active** clients, and it checks creative history first.

> It is Monday. Go through every active client profile and generate three fresh ad variations for each. Avoid hooks and angles already used, then prepare a delivery email for every client.

**Creative Element addition** (already in the Project instructions):

> Before generating, show the total credit quote for all clients and wait for approval. After generating, run the QC audit on every variation and queue them for the named reviewer. Delivery emails are drafts only.

## Steps
1. **Monday morning.** Open the Claude Project and paste the prompt above.
2. Claude lists the active clients, filters [creative-memory.csv](creative-memory.csv) for each one, and proposes three new hook/angle combinations per client. Use the seasonal angle calendar in [business/subscription.md](../business/subscription.md).
3. **Approve the credit quote**, or trim it. Nothing is generated before this.
4. **Generate.** Prefer `ad-multiplier` on each client's best-performing approved ad. Use fresh concepts only when there's a reason to change direction.
5. **QC** every variation ([qc/prompt-qc-audit.md](../qc/prompt-qc-audit.md)).
6. **Monday and Tuesday.** The named reviewer approves or rejects each variation.
7. **By Wednesday noon.** Send the approved delivery emails by hand (they start as Gmail drafts). Log every shipped hook in creative-memory.csv.
8. Record the time spent and credits used per client in [finance/economics-model.xlsx](../finance/economics-model.xlsx) (Observed sheet).

## Delivery email template

> **Subject:** [Company] — this week's 3 new ads
>
> Hi [name],
>
> Here are this week's three new ads: [link to folder]
> 1. **[Hook / angle 1]** — 9:16 + 1:1, captions included
> 2. **[Hook / angle 2]** — …
> 3. **[Hook / angle 3]** — …
>
> All three use only the details you've approved: [phone], [offer or "no offer"], [service area]. Reply with any changes; one revision round is included.
>
> If you can share last week's numbers (clicks, cost per lead, calls), I'll use them to steer next week's batch.
>
> [Name] · Creative Element
