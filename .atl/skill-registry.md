# Skill Registry — ifts29-portal

Generated: 2026-05-17

## Project Conventions

- **Stack**: Next.js 16 + Payload CMS 3 + TypeScript 5
- **Testing**: Vitest (unit/integration) + Playwright (E2E)
- **Style**: Prettier (single quotes, no semi) + ESLint

## User Skills

| Skill | Trigger |
|-------|---------|
| `branch-pr` | Creating a PR, preparing changes for review |
| `issue-creation` | Creating a GitHub issue, bug report, feature request |
| `judgment-day` | Adversarial review, dual review, "que lo juzguen" |
| `work-unit-commits` | Atomic commits per work unit |
| `simplify` | Review changed code for quality/reuse |
| `comment-writer` | Drafting PR comments, issue replies, async feedback |
| `cognitive-doc-design` | Writing guides, READMEs, onboarding docs |
| `skill-creator` | Creating new agent skills |
| `update-config` | Configuring hooks, settings.json, permissions |
| `chained-pr` | PRs exceeding 400 changed lines, stacked PRs |

## SDD Skills

| Skill | Phase |
|-------|-------|
| `sdd-init` | Initialize SDD context |
| `sdd-explore` | Investigate ideas, compare approaches |
| `sdd-propose` | Create change proposal |
| `sdd-spec` | Write specifications |
| `sdd-design` | Technical design document |
| `sdd-tasks` | Break change into tasks |
| `sdd-apply` | Implement tasks |
| `sdd-verify` | Validate implementation |
| `sdd-archive` | Close and archive change |

## Compact Rules

### Testing (Vitest + Playwright)
- Unit/integration tests live in `src/test/` with `.test.ts` extension
- E2E tests live in `e2e/` with `.spec.ts` extension
- Coverage: `npm run test:coverage` (v8, lcov output)
- E2E: `npm run test:e2e` (Playwright, Chromium only, 1 worker)
- Strict TDD: write test first, then implementation

### Commits
- Conventional commits only: `type(scope): description`
- No `Co-Authored-By` trailers
- Never `--no-verify`

### Code Style
- No comments unless WHY is non-obvious
- No multi-line comment blocks
- Prettier: single quotes, no semi, printWidth 100
- Tailwind 4 utility classes (no arbitrary values when standard tokens exist)

### PR Workflow
- Every PR needs an approved issue (`status:approved`)
- Exactly one `type:*` label per PR
- Use `branch-pr` skill when creating PRs
