# Design: Test Coverage Total + Reportes Automatizados

**Change**: test-coverage-reports
**Date**: 2026-05-17
**Author**: af-coronel

---

## Technical Approach

Two complementary infrastructure layers added on top of the existing Vitest 4 + Playwright 1.60 setup:

1. **Local observability** — enable `html` + `json-summary` reporters in Vitest and `[list, html]` in Playwright. Add tests for previously uncovered modules using the patterns already established under `src/test/`.
2. **CI enforcement** — single `.github/workflows/ci.yml` with `lint` + `typecheck` + `test:coverage` jobs running on Node 22, uploading coverage to Codecov and the HTML report as an artifact. Thresholds in Vitest (60%) enforce the floor after baseline is green.

The design intentionally preserves existing conventions: tests stay flat in `src/test/`, mocks live in `src/test/setup.ts`, no new directories.

> **Correction from proposal**: `src/lib/email.ts` uses **EmailJS via `fetch`**, not Resend (which is installed but unused for contact email). Mock strategy adjusted accordingly — see Decision 3.

---

## Architecture Decisions

### Decision 1: Vitest reporters and thresholds

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `['text', 'lcov']` (current) | No navigable HTML, no machine-readable summary | rejected |
| `['text', 'lcov', 'html', 'json-summary']` | +HTML for humans, +JSON for badges/CI, no perf cost | **chosen** |

~~Thresholds set as a single global block at 60%.~~ **Revised after Phase A validation**: global threshold is unworkable — `src/components/**` (50+ files, deliberately out of scope) pulls the global to ~20%. Per-path thresholds applied only to the modules we own and test.

```ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'lcov', 'html', 'json-summary'],
  reportsDirectory: './coverage',
  thresholds: {
    'src/lib/**': { lines: 60, statements: 60, functions: 60, branches: 60 },
    'src/context/**': { lines: 60, statements: 60, functions: 60, branches: 60 },
    'src/fields/**': { lines: 60, statements: 60, functions: 60, branches: 60 },
  },
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['src/test/**', 'src/scripts/**', 'src/payload-types.ts', 'src/**/*.d.ts'],
}
```

### Decision 2: Playwright reporter

`reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]`. Default output folder, `open: 'never'` prevents CI from blocking on a browser open.

### Decision 3: Mock strategy for `email.ts`

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `vi.mock('resend')` | Module isn't used — wrong target | rejected |
| `vi.stubGlobal('fetch', vi.fn())` | Matches actual implementation (EmailJS via fetch), assert URL/body | **chosen** |

Pattern (reused per test):
```ts
const fetchMock = vi.fn().mockResolvedValue(new Response('OK', { status: 200 }))
beforeEach(() => { vi.stubGlobal('fetch', fetchMock); fetchMock.mockClear() })
afterEach(() => { vi.unstubAllGlobals() })
```
Assert with `expect(fetchMock).toHaveBeenCalledWith('https://api.emailjs.com/api/v1.0/email/send', expect.objectContaining({ method: 'POST' }))`.

### Decision 4: Mock strategy for `auth-context.tsx`

`vi.stubGlobal('fetch', ...)` returning per-URL responses. Inline render with `<AuthProvider>{children}</AuthProvider>` — no helper file (one consumer, premature abstraction). Mock `next/navigation` with `vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }))`.

Use `findBy*` + `waitFor` for async assertions (React 19 + `useTransition` friendly).

### Decision 5: IntersectionObserver global mock

Added to `src/test/setup.ts`:
```ts
class IntersectionObserverMock {
  observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn(); takeRecords = vi.fn(() => [])
  root = null; rootMargin = ''; thresholds = []
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
```

### Decision 6: Test file location

Keep flat `src/test/*.test.ts` (matches existing `access.test.ts`, `auth.test.ts`, `smoke.test.ts`). The proposal's `tests/unit/...` paths are dropped — would diverge from current `vitest.config.ts` `include` glob and existing conventions.

### Decision 7: CI workflow shape

Single workflow, three jobs running in parallel (no `needs:` dependency), all on Node 22 with `actions/setup-node@v4`'s built-in npm cache. E2E job deferred to Phase C per proposal.

| Concern | Decision |
|---------|----------|
| Node version | 22 LTS, declared inline (no `.nvmrc` yet) |
| Cache | `actions/setup-node@v4` with `cache: 'npm'` — no manual `actions/cache` needed |
| Codecov | `codecov/codecov-action@v5` (v4 is deprecated as of 2025). Public repo: no `CODECOV_TOKEN` required, but pass it from secrets if present |
| HTML artifact | `actions/upload-artifact@v4` for `coverage/` (fallback if Codecov is down) |
| Triggers | `push` (any branch) + `pull_request` to `main` |

### Decision 8: codecov.yml

**Skip initially.** Single flag, default config is fine. Add only when we need path-based rules or PR comment customization.

### Decision 9: package.json additions

Add `"typecheck": "tsc --noEmit"`. Skip `test:coverage:open` (Windows-incompatible, marginal value — devs can `start coverage/index.html` directly).

---

## Data Flow

```
Developer push ──→ GitHub Actions ci.yml
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
      lint         typecheck       test:coverage
        │               │                │
        └───────────────┴────────┬───────┘
                                 ▼
                          coverage/lcov.info
                                 │
                 ┌───────────────┴────────────────┐
                 ▼                                ▼
           Codecov upload              upload-artifact (HTML)
```

Local: `npm run test:coverage` → `coverage/index.html` + `coverage/coverage-summary.json`.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `vitest.config.ts` | Modify | Add `html`+`json-summary` reporters, `thresholds` (Phase B), `reportsDirectory` |
| `playwright.config.ts` | Modify | Reporter `[['list'], ['html', { open: 'never' }]]` |
| `src/test/setup.ts` | Modify | Add `IntersectionObserver` mock |
| `src/test/email.test.ts` | Create | EmailJS fetch mocked, 2 exported fns covered |
| `src/test/slug.test.ts` | Create | `formatSlug` pure-fn tests (accents, edges) |
| `src/test/slug-field.test.ts` | Create | `slugField` hooks `beforeValidate`/`beforeChange` |
| `src/test/users-me.test.ts` | Create | GET handler — mock `getPayload`/cookies |
| `src/test/users-logout.test.ts` | Create | POST handler — verify cookie clear |
| `src/test/auth-context.test.tsx` | Create | RTL, fetch stub, `next/navigation` mock |
| `package.json` | Modify | Add `typecheck` script |
| `.github/workflows/ci.yml` | Create | lint + typecheck + test jobs |
| `README.md` | Modify | Testing & Coverage section + CI badge |
| `.gitignore` | None | Already covers `coverage/`, `playwright-report/`, `test-results/` |
| `codecov.yml` | None | Not needed initially |

---

## Interfaces / Contracts

### `ci.yml` skeleton

```yaml
name: CI
on:
  push: { branches: ['**'] }
  pull_request: { branches: [main] }
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npm run typecheck
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v5
        with:
          files: ./coverage/lcov.info
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: false
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: coverage-html, path: coverage/, retention-days: 7 }
```

---

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | `formatSlug`, `slugField` hooks | Pure-fn assertions, no mocks |
| Unit | `email.ts` | `vi.stubGlobal('fetch', ...)` — assert URL + body |
| Integration | `users/me`, `users/logout` routes | Mock `getPayload`, cookies; invoke handler with `Request` |
| Component | `AuthProvider` + `useAuth` | RTL `render` + fetch stub + `next/navigation` mock |
| E2E | (existing) | Unchanged — only reporter format changes |

---

## Migration / Rollout

Phase A (reporters + tests) and Phase B (CI + thresholds) ship as separate PRs per proposal. Threshold added to Vitest **only after** Phase A's tests land green. No data migration. No feature flags.

---

## Open Questions

- [ ] Should `test:coverage` job upload to Codecov on every push or only on `main` + PRs? Default chosen: every push (badges stay live on feature branches).
- [ ] Per-path thresholds: defer until baseline holds at 60% for 2+ weeks, then revisit.
