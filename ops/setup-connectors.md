# Connector setup (lessons 3 and 7)

## 1. Higgsfield (lesson 3)
1. Open the official Higgsfield MCP setup page at https://higgsfield.ai/mcp and copy the connector URL **currently shown there**. Don't copy a URL from an old screenshot; endpoints change.
2. In Claude, go to **Customize → Connectors → Add custom connector**. Name it `Higgsfield`, paste the URL, and connect.
3. **Read the permission screens.** Enable only the tools this workflow needs. Keep generation and publishing behind approval. Don't use "always allow" while you're still testing.
4. **Prove the round trip.** Use disposable content, no client data. Ask for one short test generation, the cheapest option. It only counts as connected when Claude returns media you can open and play.
5. Record the result in the log below.

| Date | Test request | Model | Result ID / URL | Plays? | Credits | Notes |
|---|---|---|---|---|---|---|
| | | | | | | |

**Free to call (no credits):** `balance`, `transactions`, `get_workflow_instructions`, `models_explore`, `ads_studio_quote`.
**Costs credits:** `generate_*`, `ads_studio_generate`, workflow generation steps, upscales, assembly.

## 2. Gmail (lesson 7)
1. In the Claude Project, go to **Settings → Connectors → Gmail**. Connect the inbox you send outreach from, ideally a dedicated `hello@creative-element.net` mailbox, not your personal one.
2. Permissions:
   - **Allow:** read and search mail, create drafts.
   - **Require approval for:** send. Better still, don't enable sending at all, and send drafts by hand.
3. Test it with the fake-reply case in [reply-trigger.md](reply-trigger.md) before any real prospect replies.

## 3. Optional, later
- **Google Drive:** a delivery folder per client.
- **PayPal invoices:** create drafts only; a human sends them.

Keep every connector narrow. Automation should remove copying and routing work, not responsibility.
