# Higgsfield connector workflows — what to use for what

Pulled from the Higgsfield MCP connector's bundled workflows (`get_workflow_instructions`), captured 2026-10-15.
Workflows change; re-check with `get_workflow_instructions` (no argument) before a production run.

## Workflows that matter for this agency

| Workflow | What it makes | Use it for |
|---|---|---|
| `ads-studio` | Static ad creatives (copy + picture) for Meta/IG/FB. Researches a brand from its website into a brand kit, or works from a product page/photo/prompt. Aspect ratios 1:1, 9:16, 16:9, 3:4 (no 4:5). | Cheap static ads for local clients; free-sample banner ads (lesson 6 transcript: "reply interested and get a free banner ad"). |
| `ugc-video` | Finished creator-style video: review, product-only voiceover, unboxing, try-on, tutorial, website tour. Pipeline: GPT Image 2 board → Seedream 5 Pro cleanup → Seedance 2.5 (omni_reference, native audio) → video-montage assembly. | Problem-led and fictional-scenario spots with an on-camera "creator". **Forbids testimonials and impersonation**, which matches the course rule. |
| `product-photoshoot` | Packshots, lifestyle stills, hero banners, carousels, static ad packs. | Service businesses with a visual "product" (finished roof, detailed car, plated dish). |
| `ad-multiplier` | Takes one approved 4–30s ad and makes variants (swap people/product/setting/text) or re-shoots it for another market/audience/language. | Lesson 8 weekly refresh: "3 fresh variations per client" from an approved winner. |
| `video-montage` | Assemble clips, add soundtrack, burn captions. | Final assembly, captions for sound-off feeds. |
| `video-editing` | Higgsedit motion graphics, title cards, overlays, trims. | Adding phone number / CTA end cards and logo overlays. |
| `brand-asset-creation` | Logos, brand kits, mockups, social graphics. | The agency's own brand; client logo recolor/export (only with client-supplied official logo). |
| `website-builder-flow` | Higgsfield-hosted sites. | **Not used** — our site lives in this repo (`website/`). |

Direct tools also available: `generate_video` / `generate_image` (+ batch versions), `models_explore` (pick a model), `virality_predictor` (hook strength / retention risk check before shipping).

## Portfolio role → workflow (lesson 4)

| Creative role (lesson 4) | Primary route | Notes |
|---|---|---|
| Cinematic before/after | `generate_video` (Seedance 2.5 / Kling class) with image references; or `product-photoshoot` stills → video | Must show a *visible transformation*. |
| Funny | `generate_video` or `ugc-video` (review format, productless story) | Memorable hook that still fits the brand. |
| Fictional customer scenario | `ugc-video` | On-screen label "Dramatization — fictional scenario". No invented dollar losses presented as real. |
| Problem-focused | `ugc-video` (product/voiceover format) or `generate_video` | A specific cost or inconvenience. |
| Premium brand | `generate_video` cinematic + `video-editing` end card | Visual and verbal choices for a higher-end position. |
| Free sample (outreach) | `ads-studio` static, 1:1 or 9:16 | Cheapest unit; generated only after intake profile is confirmed. |

## Spending rules (from the workflows and this repo's gates)

- **Credits are spent only by** `generate_*`, `ads_studio_generate`, workflow generation steps, upscales and assembly. Reading workflows, `balance`, `transactions`, `models_explore`, and `ads_studio_quote` are free.
- Always quote first (`ads_studio_quote`, or the model's listed cost via `models_explore get`), show the number, and wait for an explicit yes.
- Ads Studio: never generate while a brand/product is still researching; never retry with a new idempotency key (double charge).
- Batch tools: never resubmit a whole batch because one index failed.
- `use_unlim` only when the owner explicitly asks to spend unlimited/free-trial generations.
