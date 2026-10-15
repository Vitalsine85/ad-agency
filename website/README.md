# Creative Element website

The website for Creative Element (lesson 10). It's a small Node 22 server with **no dependencies**. You can deploy it anywhere that runs Node.

| Route | What it is |
|---|---|
| `/` | Studio home. Creative Element is back; services are listed as live or coming. |
| `/hvac` | The HVAC offer page. It uses the course's five sections (Hero, Work, How it works, Benefits, FAQ), with the **same "Get a free sample ad" button after every section**. |
| `/free-sample` | A standalone version of the form, used when JavaScript or `<dialog>` isn't available. |
| `POST /api/lead` | The form endpoint. It validates input on the server, has a honeypot field to catch bots, and limits each IP to 5 requests per 10 minutes. Leads are saved to `data/leads.json`. |
| `/admin` | Free-sample requests, protected by a username and password (HTTP Basic Auth). It is turned off unless `ADMIN_PASSWORD` is set. |

## Run it locally
```bash
cd website
ADMIN_PASSWORD='choose-a-long-one' npm start   # http://localhost:3000
npm test                                        # funnel test (Playwright + Chromium)
```
The test needs Playwright. Install it with `npm i -D playwright` or use a global install. It saves screenshots to `test/screenshots/`, which git ignores.

## What to fill in before going live
- **Pilot price:** set it in `public/site.json`. The pilot line on the page only shows once price, quantity, days *and* an honest reason are all filled in. Check the price in `finance/economics-model.xlsx` first.
- **Portfolio:** put the MP4s and poster images in `public/portfolio/`, then fill in `src` and `poster` in `public/portfolio/manifest.json`. Run `npm test` again to confirm every video plays to the end.
- **Privacy:** review `public/privacy.html`. It's a draft, not legal advice.
- **Email:** make sure the mailbox `hello@creative-element.net` exists.

## Before you share the link (lesson 10 checklist; `npm test` covers each item)
- [x] every button opens the same form
- [x] a test request appears exactly once in `/admin`
- [x] a visitor who isn't logged in can't open `/admin` (they get a 401 error)
- [x] invalid data is rejected, and nothing private appears in the page or the URL
- [x] the pages work at phone width (390px) and desktop width (1280px)
- [ ] every portfolio video plays to the end (once the portfolio has been generated)

## Hosting notes
- Put the site behind HTTPS. Basic Auth sends the password with every request, so it must be encrypted.
- `data/leads.json` stays on the server's disk. On hosts that wipe their storage (some serverless platforms), point `DATA_DIR` at a persistent volume, or swap in a small database.
- The site loads fonts from Google Fonts. The security policy (CSP) is set to allow only that.
