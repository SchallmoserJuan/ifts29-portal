# Test Coverage Reports — Specification

**Change**: test-coverage-reports
**Date**: 2026-05-17
**Status**: approved
**Author**: af-coronel

---

## Resolved Open Questions

| Question | Resolution |
|----------|------------|
| Codecov vs artifact HTML | Codecov — repo is PUBLIC (SchallmoserJuan/ifts29-portal), free tier covers it |
| Threshold strategy | Single global 60% floor (lines, statements, functions, branches) |
| `typecheck` script | Does NOT exist in `package.json`; MUST be added as `tsc --noEmit` |
| Node version in CI | No `.nvmrc` found; CI MUST pin Node 22 LTS |

---

## Phase A — Reports + Unit Tests

### Requirement: REQ-A1 — Coverage HTML Report

The system MUST produce a navigable HTML coverage report at `coverage/index.html` when `npm run test:coverage` completes.

#### Scenario: Happy path — HTML report generated

- GIVEN vitest.config.ts includes `html` in `coverage.reporter`
- WHEN the developer runs `npm run test:coverage`
- THEN `coverage/index.html` MUST exist and be openable in a browser
- AND the file MUST reference at least one source file entry

#### Scenario: No manual intervention required

- GIVEN the reporter is configured
- WHEN tests pass
- THEN `coverage/index.html` MUST be generated without any additional command

---

### Requirement: REQ-A2 — Coverage JSON Summary

The system MUST produce `coverage/coverage-summary.json` containing `lines`, `statements`, `functions`, and `branches` metrics.

#### Scenario: JSON summary structure

- GIVEN vitest.config.ts includes `json-summary` in `coverage.reporter`
- WHEN `npm run test:coverage` completes
- THEN `coverage/coverage-summary.json` MUST exist
- AND MUST contain a `total` key with `lines.pct`, `statements.pct`, `functions.pct`, `branches.pct` numeric values

---

### Requirement: REQ-A3 — Playwright HTML Report

The system MUST produce a navigable HTML Playwright report at `playwright-report/index.html` when `npm run test:e2e` completes.

#### Scenario: HTML report generated after E2E run

- GIVEN `playwright.config.ts` configures `reporter: [['list'], ['html']]`
- WHEN `npm run test:e2e` completes (pass or fail)
- THEN `playwright-report/index.html` MUST exist
- AND MUST be navigable in a browser

---

### Requirement: REQ-A10 — IntersectionObserver Mock

The test setup file MUST globally mock `IntersectionObserver` to prevent framer-motion failures in jsdom.

#### Scenario: Mock present prevents jsdom crash

- GIVEN `src/test/setup.ts` defines a global `IntersectionObserver` mock
- WHEN a test imports any component using `useInView` or framer-motion
- THEN no `ReferenceError: IntersectionObserver is not defined` MUST be thrown
- AND the test MUST reach its assertions

---

### Requirement: REQ-A4 — email.ts Unit Tests

The system MUST have unit tests for all four exported functions in `src/lib/email.ts`.

#### Scenario: sendReplyEmail — success

- GIVEN Resend client is mocked to resolve successfully
- WHEN `sendReplyEmail` is called with valid recipient and message data
- THEN the function MUST resolve without throwing
- AND the Resend send method MUST have been called with the expected arguments

#### Scenario: sendReplyEmail — Resend error

- GIVEN Resend client is mocked to reject with an error
- WHEN `sendReplyEmail` is called
- THEN the function MUST throw or reject with an error
- AND the error MUST be observable by the caller

#### Scenario: sendNewContactNotification — success

- GIVEN Resend client is mocked to resolve successfully
- WHEN `sendNewContactNotification` is called with valid contact data
- THEN the function MUST resolve without throwing
- AND the Resend send method MUST have been called once

#### Scenario: sendNewContactNotification — error

- GIVEN Resend client is mocked to reject
- WHEN `sendNewContactNotification` is called
- THEN the function MUST propagate the error

#### Scenario: sendEmailJS — success

- GIVEN `fetch` is mocked to return a 200 response
- WHEN `sendEmailJS` is called with valid template parameters
- THEN the function MUST resolve without throwing
- AND `fetch` MUST have been called with the EmailJS endpoint

#### Scenario: sendEmailJS — fetch failure

- GIVEN `fetch` is mocked to return a non-2xx response or throw a network error
- WHEN `sendEmailJS` is called
- THEN the function MUST throw or reject

---

### Requirement: REQ-A5 — slug.ts Unit Tests

The system MUST have unit tests for `formatSlug` in `src/lib/slug.ts` covering normal, edge-case, and idempotent inputs.

#### Scenario: Normal string with spaces

- GIVEN `formatSlug` receives `"Mi Nuevo Artículo"`
- WHEN the function executes
- THEN the result MUST be `"mi-nuevo-articulo"` (lowercase, spaces → dashes, accents stripped)

#### Scenario: Already-slug string (idempotent)

- GIVEN `formatSlug` receives `"mi-nuevo-articulo"`
- WHEN the function executes
- THEN the result MUST equal `"mi-nuevo-articulo"` unchanged

#### Scenario: Empty string

- GIVEN `formatSlug` receives `""`
- WHEN the function executes
- THEN the result MUST be `""` without throwing

#### Scenario: String with special characters

- GIVEN `formatSlug` receives a string with symbols like `"Hello & World!"`
- WHEN the function executes
- THEN the result MUST contain only lowercase letters, digits, and hyphens

---

### Requirement: REQ-A6 — slugField Hook Tests

The system MUST have unit tests for the `beforeChange` hook in `src/fields/slug.ts`.

#### Scenario: Hook generates slug from title field

- GIVEN a Payload `beforeChange` hook context where `data.title` is `"Mi Título"`
- WHEN the hook executes
- THEN `data.slug` MUST be set to `"mi-titulo"`

#### Scenario: Hook is no-op if slug already set

- GIVEN a Payload `beforeChange` hook context where `data.slug` is already `"existing-slug"`
- WHEN the hook executes
- THEN `data.slug` MUST remain `"existing-slug"` unchanged

---

### Requirement: REQ-A7 — AuthProvider / useAuth RTL Tests

The system MUST have React Testing Library tests for `AuthProvider` and `useAuth` in `src/context/auth-context.tsx`.

#### Scenario: Initial loading state

- GIVEN `AuthProvider` is rendered wrapping a consumer component
- WHEN the component first mounts before `fetch` resolves
- THEN `useAuth().loading` MUST be `true`

#### Scenario: Authenticated state

- GIVEN `fetch` to `/api/users/me` is mocked to return a valid user object
- WHEN `AuthProvider` mounts and the fetch resolves
- THEN `useAuth().user` MUST equal the mocked user
- AND `useAuth().loading` MUST be `false`

#### Scenario: Unauthenticated state (401)

- GIVEN `fetch` to `/api/users/me` is mocked to return a 401 response
- WHEN `AuthProvider` mounts and the fetch resolves
- THEN `useAuth().user` MUST be `null`
- AND `useAuth().loading` MUST be `false`

#### Scenario: Logout clears state

- GIVEN `AuthProvider` is in authenticated state and `fetch` to `/api/users/logout` is mocked to return 200
- WHEN `useAuth().logout()` is called
- THEN `useAuth().user` MUST be `null` after the logout resolves

---

### Requirement: REQ-A8 — /api/users/me Route Tests

The system MUST have integration tests for the GET handler in `app/api/users/me/route.ts`.

#### Scenario: Authenticated request returns 200 + user data

- GIVEN a valid session exists (Payload auth mocked)
- WHEN a GET request is made to the route handler
- THEN the response status MUST be 200
- AND the response body MUST contain the authenticated user object

#### Scenario: Unauthenticated request returns 401

- GIVEN no valid session exists
- WHEN a GET request is made to the route handler
- THEN the response status MUST be 401

---

### Requirement: REQ-A9 — /api/users/logout Route Tests

The system MUST have integration tests for the POST handler in `app/api/users/logout/route.ts`.

#### Scenario: Successful logout returns 200

- GIVEN a valid session exists
- WHEN a POST request is made to the route handler
- THEN the response status MUST be 200
- AND the session MUST be invalidated

#### Scenario: Already logged out returns appropriate response

- GIVEN no valid session exists
- WHEN a POST request is made to the route handler
- THEN the response status MUST NOT cause an unhandled server error (5xx)

---

### Requirement: REQ-A11 — Coverage Floor (Phase A)

After Phase A tests are written, line coverage for `src/lib/**`, `src/context/**`, and `src/fields/**` combined MUST be ≥ 60%.

#### Scenario: Coverage threshold met

- GIVEN all Phase A tests are implemented and passing
- WHEN `npm run test:coverage` runs
- THEN the text-summary report MUST show ≥ 60% on lines for the targeted directories
- AND the `npm run test:coverage` command MUST exit with code 0

---

## Phase B — CI with GitHub Actions

### Requirement: REQ-B1 — CI Workflow Triggers

The CI workflow MUST trigger on:
- Push to `main`
- Push to branches matching `feat/**`, `fix/**`, `test/**`, `chore/**`
- Pull request targeting `main`

#### Scenario: Push to feature branch triggers CI

- GIVEN `.github/workflows/ci.yml` exists with the defined triggers
- WHEN a developer pushes a commit to `feat/my-feature`
- THEN the CI workflow MUST start automatically in GitHub Actions

#### Scenario: Pull request to main triggers CI

- GIVEN the workflow is configured with `pull_request` targeting `main`
- WHEN a PR is opened or updated against `main`
- THEN the CI workflow MUST run and its status MUST be reported on the PR

---

### Requirement: REQ-B2 — CI Jobs

The CI workflow MUST define three jobs: `lint`, `typecheck`, and `test`.

| Job | Command | Fail Behaviour |
|-----|---------|----------------|
| `lint` | `npm run lint` | fail-fast — blocks subsequent jobs |
| `typecheck` | `npm run typecheck` (`tsc --noEmit`) | fail-fast |
| `test` | `npm run test:coverage` | uploads lcov to Codecov; uploads `coverage/index.html` as artifact |

The `typecheck` job MUST use the `typecheck` npm script; if it does not exist in `package.json`, it MUST be added as `tsc --noEmit`.

The CI MUST pin Node.js to **22 LTS** (no `.nvmrc` exists at project root).

#### Scenario: lint job blocks on ESLint error

- GIVEN a file has a lint error
- WHEN CI runs the `lint` job
- THEN the job MUST exit with non-zero code
- AND subsequent jobs MUST NOT run

#### Scenario: typecheck job blocks on TypeScript error

- GIVEN a file has a type error
- WHEN CI runs the `typecheck` job
- THEN the job MUST exit with non-zero code

#### Scenario: test job uploads coverage artifact

- GIVEN all tests pass
- WHEN CI runs the `test` job
- THEN `coverage/index.html` MUST be uploaded as a downloadable GitHub Actions artifact
- AND `coverage/lcov.info` MUST be uploaded to Codecov

---

### Requirement: REQ-B3 — Coverage Threshold Enforcement

`vitest.config.ts` MUST define `coverage.thresholds` with a 60% floor on `lines`, `statements`, `functions`, and `branches`.

When any metric falls below 60%, `npm run test:coverage` MUST exit with a non-zero code, blocking CI.

#### Scenario: Coverage below threshold blocks CI

- GIVEN `coverage.thresholds` is configured in `vitest.config.ts`
- WHEN `npm run test:coverage` runs and any metric is below 60%
- THEN the command MUST exit with a non-zero code
- AND the CI `test` job MUST be marked as failed

#### Scenario: Coverage at or above threshold passes

- GIVEN all metrics are ≥ 60%
- WHEN `npm run test:coverage` runs
- THEN the command MUST exit with code 0

---

### Requirement: REQ-B4 — Codecov Integration

Coverage data MUST be uploaded to Codecov so that PR comments show a coverage diff.

#### Scenario: Codecov comment appears on PR

- GIVEN `lcov.info` is uploaded to Codecov via the CI workflow
- WHEN a PR is opened against `main`
- THEN Codecov MUST post a comment showing coverage delta for the PR

#### Scenario: Public repo — no token required for upload

- GIVEN the repository is public on GitHub
- WHEN the Codecov upload action runs
- THEN the upload MUST succeed without a `CODECOV_TOKEN` secret being required (Codecov free tier for public repos)

---

### Requirement: REQ-B5 — README Badges

`README.md` MUST include a CI status badge and a Codecov coverage badge.

#### Scenario: Badges are visible and accurate

- GIVEN the CI workflow and Codecov integration are active
- WHEN a developer opens the README on GitHub
- THEN the CI badge MUST reflect the current `main` branch build status
- AND the Codecov badge MUST reflect the current coverage percentage

---

### Requirement: REQ-B6 — CI Performance

Total CI time for `lint` + `typecheck` + `test` jobs (excluding E2E) MUST be under 5 minutes.

#### Scenario: CI completes within budget

- GIVEN `node_modules` and `.next/cache` are cached in the workflow
- WHEN the full CI workflow runs on a clean push to `main`
- THEN wall-clock time from workflow start to all jobs completing MUST be ≤ 5 minutes

---

## Phase C — E2E in CI (Planned, Out of This Change)

Phase C is documented for traceability only. It SHALL NOT be implemented as part of this change. A separate change (`test-e2e-ci`) will cover:

- CI job `e2e` running `npm run build` + `npm run start` + `npm run test:e2e`
- Uploading `playwright-report/` as artifact
- Caching `~/.cache/ms-playwright`
- GitHub Secrets for test credentials

**Acceptance criteria for Phase C are deferred to that change.**
