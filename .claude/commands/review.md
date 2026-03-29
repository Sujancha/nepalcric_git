# /review — QA Gate (Standalone)

Run the QA Gate on a specific pending draft. Argument: draft_id from DRAFTS.md (e.g., `rohit-paudel-2026-03-29`).

If no argument is given, list all `PENDING_QA` and `REVISION_REQUIRED` drafts from DRAFTS.md and ask which to review.

---

## STEP 1 — Locate the draft

Read `DRAFTS.md`. Find the entry with `draft_id: $ARGUMENTS`.

If not found: report the exact draft IDs currently in DRAFTS.md so Sujan can correct the argument.

Extract the full draft content from the DRAFTS.md entry.

---

## STEP 2 — Read the checklist

Read `agents/qa_gate/checklist.md` in full.

---

## STEP 3 — Grade every question

For each of the 10 questions, provide:
- ✅ PASS or ❌ FAIL
- One specific sentence of evidence from the draft that justifies your grade
- If FAIL: the exact line or section that fails, and why

```
Q1 — Knowledge deficit hook: ✅/❌
Evidence: "[quote from draft or explanation]"

Q2 — No emotion-naming: ✅/❌
Evidence: ...

Q3 — Nepali sensory grounding: ✅/❌
Evidence: ...

Q4 — Zeigarnik loop: ✅/❌
Evidence: ...

Q5 — Visual breathing room: ✅/❌
Evidence: ...

Q6 — Human not institution: ✅/❌
Evidence: ...

Q7 — Two emotional threads: ✅/❌
Evidence: ...

Q8 — Climax works standalone: ✅/❌
Evidence: ...

Q9 — Nepali emotional frequency: ✅/❌
Evidence: ...

Q10 — Final "तपाईं" + unresolved: ✅/❌
Evidence: ...
```

Also check the Additional QA Items and Hard No List from checklist.md. Report any violations.

---

## STEP 4 — Count the failures

- 0 failures → APPROVED
- 1–2 failures → REVISION_REQUIRED
- 3+ failures → REDRAFT

---

## STEP 5 — Update DRAFTS.md

Find the existing entry for `$ARGUMENTS` in DRAFTS.md and update:
- Change `status:` to the new status
- Append the full QA results table under the entry
- If REVISION_REQUIRED: add a `### Revision Notes` section with numbered, specific instructions
- If REDRAFT: add a `### Structural Failure Summary` with the root causes (not line-by-line — structural)

---

## STEP 6 — Update run log

Append to `agents/run_log.json`:

```json
{
  "run_id": "[timestamp]-review-$ARGUMENTS",
  "trigger": "/review $ARGUMENTS",
  "date": "[ISO date]",
  "phases": ["qa_gate"],
  "draft_id": "$ARGUMENTS",
  "qa_result": "[APPROVED | REVISION_REQUIRED | REDRAFT]",
  "failures": []
}
```

---

## STEP 7 — If APPROVED: publishing instructions

Report to Sujan exactly what to do next:

1. The `lore_ne` content is ready to paste into `content/players/[player-id].md` under the `lore_ne:` field
2. The `hero_quote` is ready for the `hero_quote:` field
3. The `excerpt_ne` is ready for the `excerpt_ne:` field
4. Update `research_status: FINAL` in the .md frontmatter
5. Update `last_updated:` to today's date
6. Run `/update-stats [player-id]` to verify all stats are current before publishing

**Hard constraint:** Do not automatically write to `content/players/` — present all changes for Sujan's final approval.
