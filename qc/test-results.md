# QC gate test results

| Date | Checker | Case | Expected | Got | Notes |
|---|---|---|---|---|---|
| 2026-10-15 | Claude (prompt-qc-audit.md) | ad-pass.md | READY_FOR_HUMAN_REVIEW | READY_FOR_HUMAN_REVIEW: 9/9 checks passed | Raised a non-blocking question about whether the end-card phone and URL were added in post. The test case now states this explicitly. |
| 2026-10-15 | Claude (prompt-qc-audit.md) | ad-fail.md | NEEDS_CORRECTION, all planted conflicts quoted | NEEDS_CORRECTION: 9/9 checks failed | Quoted all 18 planted conflicts and found 3 more: approved offer missing, approved logo missing, and claims made with no disclaimers. Nothing was repaired, approved or sent. |

**Verdict:** the gate works as lesson 9 requires.

Re-run both cases whenever you change the prompt, the Project instructions or the model.
