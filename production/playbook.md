# Production playbook: from brief to delivered ad

This covers course lessons 4, 8 and 9. For which Higgsfield tool does what, see [course/higgsfield-workflows.md](../course/higgsfield-workflows.md).

## Pipeline

```
approved client profile ──► creative brief ──► credit quote ──► human OK ──► generate
        ▲                                                                    │
        │                                                                    ▼
 creative-memory.csv ◄── delivered ◄── client approval ◄── named reviewer ◄── QC audit
```

1. **Profile gate.** Check every claim-critical fact the ad will use against [intake/fact-rules.md](../intake/fact-rules.md). If any is missing or unconfirmed, stop and ask the client.
2. **Brief.** Fill in [prompts/brief-template.md](prompts/brief-template.md): the creative role, the hook, which facts to use, the format and the call to action.
3. **Quote.** Get the credit cost before generating anything:
   - static ads: `ads_studio_quote`
   - video: the model's listed cost (`models_explore get`)

   Show the number to a human and wait for their OK.
4. **Generate.** Use the role prompt in [prompts/](prompts/). Save the job ID and result URL straight away.
5. **Inspect.** Watch every clip all the way through. Check:
   - artifacts (hands, faces, warped logos)
   - any text that was rendered into the video itself
   - lip-sync
   - duration
   - aspect ratio
6. **Finish.** End card with the client's logo, phone number and call to action (`video-editing`), plus captions (`video-montage`). Make an export for each format.
7. **QC.** Run [qc/prompt-qc-audit.md](../qc/prompt-qc-audit.md). The result must be `READY_FOR_HUMAN_REVIEW`.
8. **Review.** The named reviewer at Creative Element approves it. Then the client approves it.
9. **Deliver and log.** Send through the agreed channel. Add the hook and angle to [creative-memory.csv](creative-memory.csv).

## Formats for local HVAC

| Placement | Ratio | Length | Notes |
|---|---|---|---|
| Meta Reels / Stories | 9:16 | 10–20 s | Hook in 0–3 s, captions on, call to action in the last 3 s |
| Meta / IG feed | 1:1 (or 3:4) | 10–20 s | Ads Studio has no 4:5. Use 3:4 |
| YouTube / Performance Max | 16:9 + 9:16 + 1:1 | 6 s bumper + 15–30 s | Upload your own video so Google doesn't auto-generate one |
| Static | 1:1, 9:16 | — | Ads Studio |

## Rules for what goes on screen
- **The client's logo, phone and URL** only come from client-supplied files and text. Add them in post (end card or overlay). Never let the AI model draw a logo or phone number.
- **Real people:** never generate a lookalike of a real person, and never imply the person on screen is the client's real employee or customer unless they really are.
- **Branded vehicles and uniforms** in AI footage stay generic unless the client has supplied reference photos and approved their use.
- **Fictional scenario role:** the on-screen label reads "Dramatization". Don't give specific dollar losses unless they come from the client and can be backed up.
- **Rebates, financing and guarantees:** only the exact wording the client approved, plus any disclaimer they supplied.

## Higgsfield routes by creative role

| Role (lesson 4) | Route | Prompt |
|---|---|---|
| Cinematic before/after | `generate_video`, image-to-video with a "before" still and an "after" still | [prompts/before-after.md](prompts/before-after.md) |
| Funny | `generate_video` or `ugc-video` (productless story) | [prompts/funny.md](prompts/funny.md) |
| Fictional customer scenario | `ugc-video` (review format, no testimonial) | [prompts/fictional-scenario.md](prompts/fictional-scenario.md) |
| Problem-focused | `ugc-video` product/voiceover format or `generate_video` | [prompts/problem-focused.md](prompts/problem-focused.md) |
| Premium brand | `generate_video` cinematic + `video-editing` end card | [prompts/premium.md](prompts/premium.md) |
| Free sample (static) | `ads-studio` | [prompts/free-sample-static.md](prompts/free-sample-static.md) |
| Weekly variations | `ad-multiplier` on an approved winning ad | [monday-refresh.md](monday-refresh.md) |

Before every run, check the current models with `models_explore` (action `recommend`). Model line-ups change often.
