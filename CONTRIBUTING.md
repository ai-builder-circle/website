# Contributing

## Workflow

1. **Branch from `main`.** One branch per change, named by type:
   `feat/phase-2-hero`, `fix/footer-links`, `chore/deps`.
2. **Commit with [Conventional Commits](https://www.conventionalcommits.org/):**
   `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `ci:`.
3. **Run the checks locally** before pushing: `npm run check`
   (lint → typecheck → build → E2E). Lighthouse: `npm run lighthouse` after a build.
4. **Open a PR into `main`.** Fill in the template. Vercel posts a preview URL on the PR.
5. **CI must pass** and the code owner approves, then **squash-merge**.
6. **Merging to `main` deploys production** to forgecommunity.dev (Vercel).

`main` is protected: no direct pushes, no merging on red CI.

## Pipeline

| Stage | Where | What |
|---|---|---|
| Build | GitHub Actions | `npm ci`, ESLint, `tsc`, `next build` (static export) |
| E2E | GitHub Actions | Playwright against the built `out/`, desktop + Pixel 7 |
| Lighthouse | GitHub Actions | Performance and accessibility must score ≥ 90 (PRD §9) |
| Preview | Vercel | Every PR gets its own URL |
| Production | Vercel | Every merge to `main` |
| Smoke test | GitHub Actions | After each production deploy, the E2E suite runs against forgecommunity.dev |
| Updates | Dependabot | Weekly npm, monthly Actions |

## Tests

E2E tests in `e2e/` encode the PRD's acceptance criteria (contact link, no
out-of-scope features, alt text, phone layout). When a phase adds a section,
add tests for it in the same PR.
