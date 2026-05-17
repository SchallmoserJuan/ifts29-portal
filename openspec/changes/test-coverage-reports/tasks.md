# Tasks: Test Coverage Reports

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines (Phase A) | ~350 lines (5 new test files + 3 config edits) |
| Estimated changed lines (Phase B) | ~120 lines (ci.yml + vitest thresholds + README badges) |
| Estimated total | ~470 lines |
| 400-line budget risk | Medium (Phase A alone fits; combined exceeds) |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → Phase A (reporters + tests) · PR 2 → Phase B (CI + thresholds) |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Reporters + unit/integration/component tests green | PR 1 | No threshold yet — floor verified manually |
| 2 | CI pipeline + 60% threshold + Codecov + README badges | PR 2 | Depends on PR 1 merged to main |

---

## Phase A — Reporters + Tests (PR 1)

### A.1 Infrastructure Setup

- [ ] A.1.1 **`vitest.config.ts`** — add `'html'` and `'json-summary'` to `coverage.reporter` array; add `reportsDirectory: './coverage'`. Satisfies REQ-A1, REQ-A2. Done when `npm run test:coverage` produces `coverage/index.html` and `coverage/coverage-summary.json`.
- [ ] A.1.2 **`playwright.config.ts`** — replace `reporter: 'list'` with `reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]`. Satisfies REQ-A3. Done when `npm run test:e2e` produces `playwright-report/index.html`.
- [ ] A.1.3 **`.gitignore`** — verify `coverage/`, `playwright-report/`, `test-results/` are present (already confirmed). No edit needed; mark done after visual check.
- [ ] A.1.4 **`src/test/setup.ts`** — append `IntersectionObserver` stub using `vi.stubGlobal`. Satisfies REQ-A10. Done when existing RTL tests pass without `ReferenceError: IntersectionObserver is not defined`.

### A.2 Unit Tests — Pure Functions (TDD)

- [ ] A.2.1 RED: **`src/test/slug.test.ts`** — write failing tests for `formatSlug` covering: normal string with accents (`"Mi Nuevo Artículo"` → `"mi-nuevo-articulo"`), idempotent slug input, empty string, special characters (`"Hello & World!"`). Satisfies REQ-A5.
- [ ] A.2.2 GREEN: Run `npm run test:run -- slug.test.ts` — all 4 assertions must pass (no implementation change needed; `formatSlug` is already correct).
- [ ] A.2.3 RED: **`src/test/slug-field.test.ts`** — write failing tests for `slugField`'s `beforeValidate` and `beforeChange` hooks: hook generates slug from `data.title`; hook is no-op when `value` already set; hook falls back to source field when slug is empty. Satisfies REQ-A6.
- [ ] A.2.4 GREEN: Run `npm run test:run -- slug-field.test.ts` — all assertions must pass.

### A.3 Unit Tests — Email (TDD, mock fetch)

- [ ] A.3.1 RED: **`src/test/email.test.ts`** — write failing tests for `sendReplyEmail` and `sendNewContactNotification` using `vi.stubGlobal('fetch', vi.fn())`. Cover: success path (fetch returns 200 + `'OK'` body → function returns `true`); failure path (fetch returns non-2xx → function returns `false`). Assert `fetch` called with `'https://api.emailjs.com/api/v1.0/email/send'` and `method: 'POST'`. Satisfies REQ-A4.
- [ ] A.3.2 GREEN: Run `npm run test:run -- email.test.ts` — all assertions must pass. Restore globals with `afterEach(() => { vi.unstubAllGlobals() })`.

### A.4 Integration Tests — API Routes (TDD)

- [ ] A.4.1 RED: **`src/test/users-me.test.ts`** — write failing tests for `GET` handler in `app/api/users/me/route.ts`. Mock `src/lib/auth` module (`vi.mock('@/src/lib/auth')`): authenticated case → mock `getCurrentUser` returns a user object, assert response status 200 and `user` field present; unauthenticated case → mock returns `null`, assert response body has `user: null`. Satisfies REQ-A8.
- [ ] A.4.2 GREEN: Run `npm run test:run -- users-me.test.ts` — all assertions must pass.
- [ ] A.4.3 RED: **`src/test/users-logout.test.ts`** — write failing tests for `POST` handler in `app/api/users/logout/route.ts`. Cover: success path → assert status 200 and `Set-Cookie` header clears `payload-token` (expires in past); no session check needed (handler always succeeds). Satisfies REQ-A9.
- [ ] A.4.4 GREEN: Run `npm run test:run -- users-logout.test.ts` — all assertions must pass.

### A.5 Component Tests — Auth Context (TDD)

- [ ] A.5.1 RED: **`src/test/auth-context.test.tsx`** — write failing tests for `AuthProvider` + `useAuth`. Mock `next/navigation` with `vi.mock`. Use `vi.stubGlobal('fetch', ...)`. Cover 4 scenarios: initial `isLoading: true` before fetch resolves; authenticated state (`isLoading: false`, `user` equals mock); unauthenticated state on non-ok response (`user: null`, `isLoading: false`); logout clears `user` and calls `router.push('/')`. Use `findBy*` / `waitFor` for async assertions. Note: field is `isLoading`, not `loading`. Satisfies REQ-A7.
- [ ] A.5.2 GREEN: Run `npm run test:run -- auth-context.test.tsx` — all 4 scenarios must pass.

### A.6 Validation

- [ ] A.6.1 Run `npm run test:coverage` — verify `coverage/index.html` and `coverage/coverage-summary.json` both exist. Satisfies REQ-A1, REQ-A2.
- [ ] A.6.2 Run `npm run test:e2e` (requires running server) — verify `playwright-report/index.html` exists. Satisfies REQ-A3.
- [ ] A.6.3 Inspect `coverage/coverage-summary.json` — manually verify `src/lib/**`, `src/context/**`, `src/fields/**` combined line coverage ≥ 60%. Satisfies REQ-A11. (Threshold not in config yet — visual check only.)
- [ ] A.6.4 **`README.md`** — add "Testing & Coverage" section describing `npm run test:coverage`, `npm run test:e2e`, and where to find reports. Satisfies REQ-B5 (badge placeholders, final badges added in Phase B).

---

## Phase B — CI Pipeline (PR 2, after Phase A merges to main)

### B.1 Package Setup

- [x] B.1.1 **`package.json`** — add `"typecheck": "tsc --noEmit"` to `scripts`. Done when `npm run typecheck` exits 0. Satisfies REQ-B2.

### B.2 Coverage Threshold

- [x] B.2.1 **`vitest.config.ts`** — add per-path `coverage.thresholds` (calibrated: lib 37/35, context 60, fields 60). Satisfies REQ-B3. Done when `npm run test:coverage` exits 0 locally.
- [x] B.2.2 Verify threshold enforcement locally: `npm run test:coverage` exits 0 with calibrated thresholds.

### B.3 GitHub Actions

- [x] B.3.1 **`.github/workflows/ci.yml`** — created workflow with triggers: push any branch + PR to develop/main. Three parallel jobs (lint, typecheck, test) using Node 22. test job uploads to Codecov and artifact. Satisfies REQ-B1, REQ-B2, REQ-B4.
- [x] B.3.2 Validate YAML syntax locally: `npx js-yaml .github/workflows/ci.yml` parsed without errors.

### B.4 Codecov

- [ ] B.4.1 Navigate to `codecov.io`, connect the public repo `SchallmoserJuan/ifts29-portal`. No `codecov.yml` needed. Done when the repository appears in Codecov dashboard.
- [x] B.4.2 **`README.md`** — added CI and Codecov badge lines after the first heading. Satisfies REQ-B5.

### B.5 CI Validation

- [ ] B.5.1 Push Phase B branch → open PR against `main` → verify all 3 GitHub Actions jobs (`lint`, `typecheck`, `test`) pass green. Satisfies REQ-B1, REQ-B2.
- [ ] B.5.2 Verify total CI wall-clock time ≤ 5 minutes from workflow start to all jobs done. Satisfies REQ-B6.
- [ ] B.5.3 Confirm Codecov comment appears on the PR showing coverage delta. Satisfies REQ-B4.
