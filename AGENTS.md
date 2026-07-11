# AI-ABCX Repository Guidance

## Purpose

This repository contains the AI-ABCX product, its browser-based application files, and a large set of product and implementation specifications. Work narrowly: complete the requested outcome without reopening unrelated product decisions or surveying the entire repository.

## Start Every Task This Way

1. Restate the requested deliverable in one sentence.
2. Name the exact implementation file or small file set expected to change.
3. Identify no more than three directly relevant specification files.
4. Inspect those files and their direct dependencies only.
5. If the request is ambiguous, prefer the smallest reversible implementation and state the assumption.

Do not begin by reading every `AI_ABCX_*.md` or `AI_ABC_*.md` file. Use `rg` to locate the narrowest relevant specification and implementation references.

## Source-of-Truth Order

When instructions conflict, use this order:

1. The user's current task instructions.
2. The explicitly named product specification or build checklist.
3. The implementation currently used by the target HTML page.
4. Broader architecture and roadmap documents.
5. Archive, preview, concept, and old-design material.

Treat files under `Ai Call Port Archive/` and `old design/`, files named `*-preview.*`, `*-concept.*`, and dated snapshot archives as reference-only unless the user explicitly targets them.

Do not infer that similarly named dashboards are interchangeable. Confirm which HTML page is the requested entry point and follow only the scripts it actually loads.

## Scope Control

- Make the smallest coherent change that satisfies the task.
- Do not redesign adjacent modules, rename broad concepts, or generate new planning documents unless requested.
- Do not rewrite an approved specification merely because another design is possible.
- Do not repeatedly re-analyze a decision already established in the current task. Record the decision once and proceed.
- If implementation reveals a genuine blocker, report the exact file, dependency, or missing decision. Do not replace implementation work with another roadmap.
- Preserve existing user changes and unrelated files.
- Never delete or move archive, design, or specification files without explicit permission.

## Implementation Map

- HTML entry points live at the repository root and in `public/`.
- Shared browser logic is primarily in root-level `.js` files and `lib/`.
- Server/API logic is in `api/`.
- Product specifications and execution checklists are root-level Markdown files.
- Supabase schema changes are root-level `.sql` files.

Before changing a page, inspect its `<script>` and stylesheet references. Before changing shared JavaScript, use `rg` to identify all consumers and avoid unintended dashboard regressions.

## Secrets and Generated Files

- Never expose or commit credentials from `.env` or local configuration.
- `.env.example` may contain placeholders only.
- Ignore compiler caches, dependency folders, build output, logs, archives, and OS metadata as defined in `.gitignore`.
- Do not inspect `.swift-cache/` or snapshot archives during normal application work.

## Verification

This repository currently has no package test scripts. Verification must therefore be proportional and explicit:

- For HTML/CSS changes, load the exact target page and check the affected viewport and interaction when browser tooling is available.
- For JavaScript changes, run a syntax check when supported and exercise the affected page flow.
- For API changes, inspect the caller and validate success and failure paths without using production credentials.
- For specification-only changes, check terminology and cross-references with targeted `rg` searches.

At completion, report:

1. The outcome delivered.
2. Files changed.
3. Verification performed and its result.
4. Any remaining blocker or intentionally excluded follow-up.

Do not claim completion based only on writing a plan or checklist when the task asked for implementation.

## Git Discipline

- Keep each task focused enough to review as one logical change.
- Check `git status --short` before and after editing.
- Do not stage, commit, discard, or overwrite user work unless explicitly requested.
- Once a baseline commit exists, use the diff as the primary boundary for reviewing task changes.
