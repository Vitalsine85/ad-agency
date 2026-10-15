# Launch to a qualified list (lesson 11)

**Don't blast.** Start with **10–15 HVAC companies** that have a current, visible, publicly evidenced reason to want better video ads. Jack Roberts, in the lesson: *"Focus on just 10 to 15 companies that have a crystal clear reason to buy from you right now."*

## Launch area (from Orange, MA, about 45 minutes out)

| Sub-market | Towns | County / state |
|---|---|---|
| North Quabbin | Orange, Athol, Royalston, Templeton, Petersham | Franklin / Worcester, MA |
| Franklin County | Greenfield, Turners Falls, Montague, Deerfield, Northfield | Franklin, MA |
| North Worcester County | Gardner, Fitchburg, Leominster, Winchendon | Worcester, MA |
| Pioneer Valley | Northampton, Amherst, Easthampton | Hampshire, MA |
| Monadnock | Keene, Swanzey, Jaffrey | Cheshire, NH |
| Southern Vermont | Brattleboro | Windham, VT |

### Sizing the pool (aim for 150+ businesses to pick the best 10–15 from)
- **Google Maps:** search "HVAC contractor", "heating contractor" and "heat pump installer" around each town. Use the business-count list method below.
- **Census County Business Patterns** (NAICS 238220, Plumbing, Heating & Air-Conditioning Contractors): go to data.census.gov, search "CBP 238220", and filter to Franklin, Worcester, Hampshire (MA), Cheshire (NH) and Windham (VT) counties.
  - This counts plumbers and HVAC companies together, so treat it as an upper bound.
  - The Census API needs a free key: api.census.gov/data/key_signup.html.
- **Program contractor lists:** Mass Save Heat Pump Installer Network, NHSaves and Efficiency Vermont list participating contractors. These businesses are in the heat-pump market and many already advertise. Check each program's current list.

## Qualification signals (you need at least one, with evidence)

| Signal | Where to look |
|---|---|
| Running paid social ads right now | Meta Ad Library (facebook.com/ads/library): search the company name, Active ads |
| Running Google or YouTube ads | Google Ads Transparency Center (adstransparency.google.com) |
| On Google Local Services Ads | A "Google Guaranteed" or "Google Screened" badge in local search results |
| Their video is old, or they have no video | Website, YouTube channel, Google Business Profile videos |
| Their current creative is visibly weak | A static stock photo, text-heavy graphic, no hook, no captions, horizontal-only, or one stale ad running for months |
| Spending on premium placements with weak creative | Radio, TV, billboards or sponsorships, but basic digital creative |

**Record for every prospect:**
- the evidence URL
- the date you saw it
- the **exact creative gap**

**Don't infer performance from looks.** You can't know an ad "isn't working".

**Leave a company out** if you can't verify it from a public source.

## The prompt (from the course, verbatim, with fields filled in)

> Find 10 to 15 **residential HVAC** companies in **Franklin County, north Worcester County and Hampshire County MA, Cheshire County NH and Windham County VT** with a clear, current, publicly evidenced reason to test better video ads — for example, actively running ads with outdated or visibly weak video creative. For each company, return the evidence URL, the observation date, the exact creative gap, and one truthful, evidence-specific opening line. Do not infer campaign performance without performance data. Exclude any company you cannot verify from a public source.

**Check every result yourself.** Claude can return stale ads, or write a stronger claim than the evidence supports.

## Metrics: define these before sending

| Metric | Calculation |
|---|---|
| Delivery rate | delivered ÷ sent |
| Qualified reply rate | qualified replies ÷ delivered |
| Sample rate | sample-ready profiles ÷ qualified replies |
| Paid conversion | paid clients ÷ sample-ready profiles |

**Observation window:** 21 days from the first send.

**Decision rule, written now** (see the economics model):
- **Go:** at least 1 paid pilot, with cost per sample and review time inside the limits.
- **Revise:** some qualified demand appeared, but a threshold failed.
- **Stop:** no qualified replies.

Don't use reply rate alone to justify scaling.

## Log
[`launch-log.csv`](launch-log.csv). One row per prospect. A named human approves each recipient and message in the first batch.
