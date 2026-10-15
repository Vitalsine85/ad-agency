# Client profile — [CLIENT NAME]

Save as `clients/<client-id>/profile.md` (or `.json` against [client-profile.schema.json](client-profile.schema.json)). Keep `clients/` out of git if it holds real client data. See [.gitignore](../.gitignore).

- **client_id:** `[kebab-case-id]`
- **status:** prospect / provisional / sample-ready / active / paused / churned
- **Named approver at Creative Element:** [name]
- **Client approver:** [name, role, email]
- **Last updated:** [YYYY-MM-DD]

| Fact | Value | Source | Source detail (URL + date / basis / supplied via) | Approval | Claim-critical |
|---|---|---|---|---|---|
| Business name | | | | | Yes |
| City and state | | | | | Yes |
| Service area | | | | | Yes |
| Services to feature | | | | | Yes |
| Phone | | | | | Yes |
| Email | | | | | Yes |
| Website or booking link | | | | | Yes |
| Offer or promotion | | | | | Yes |
| Price or financing terms | | | | | Yes |
| Deadline | | | | | Yes |
| Rebates or incentives | | | | | Yes |
| Licenses and registrations | | | | | Yes |
| Warranties and guarantees | | | | | Yes |
| Hours and emergency service | | | | | Yes |
| Required disclaimers | | | | | Yes |
| Logo and brand assets | | | | | Yes |
| Brand colors and fonts | | | | | No |
| Real photos or footage | | | | | No |
| Target audience | | | | | No |
| Creative angle | | | | | No |
| Things to avoid | | | | | No |
| Delivery destination | | | | | Yes |
| Ad platforms | | | | | No |

**Allowed values**
- **Source:** `client-supplied` · `public-url` · `inference` · `missing`
- **Approval:** `unconfirmed` · `client-confirmed` · `approver-approved` · `flagged-assumption`

## Gate status
- [ ] Every claim-critical fact used in the next deliverable is `client-confirmed` or `approver-approved`
- [ ] Assumptions are marked `flagged-assumption` and the client has seen them
- [ ] Profile reviewed with the client on [date]
