# Agent Instructions — Portal IFTS 29

## Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start Next.js + Payload admin |
| `bun run build` | Production build **(uses `--webpack`)** |
| `bun run lint` | ESLint only |
| `bun run generate:types` | Regenerate `src/payload-types.ts` from Payload schema |
| `bun run seed:all` | Seed careers, news, events, projects, companies, globals |
| `bun run seed:career` | Seed only the single career |

**No test suite exists.** Do not look for `jest`, `vitest`, `playwright`, or test scripts.

## Architecture

- **Next.js 16** App Router. Public routes live in `app/(site)/`; Payload admin lives in `app/(payload)/`.
- **Payload CMS 3** config is at repo root: `payload.config.ts`.
- **Collections**: `src/collections/` (Users, Media, Careers, News, Documents, Events, Projects, Companies, Contacts, Notifications).
- **Globals**: `src/globals/` (SiteSettings, InstitutionalContent).
- **Access control**: centralized in `src/access.ts`.
- **Database**: SQLite (`@payloadcms/db-sqlite`). Local dev uses `file:./ifts29.db`. Prod uses Turso (`libsql://...` + `DATABASE_AUTH_TOKEN`).
- **Schema migrations**: `push: true` in the SQLite adapter means schema auto-pushes on dev startup. No `migrate:dev` step needed locally.
- **File storage**: Vercel Blob Storage for `media` and `documents` **only when** `BLOB_READ_WRITE_TOKEN` is set; otherwise falls back to local disk.
- **Payload client**: use `getPayloadClient()` from `src/lib/payload.ts` (cached singleton). Do not instantiate `getPayload` directly in route handlers unless you have a reason.

## Environment

Copy `.env.example` → `.env.local`. Minimum required vars:

```env
PAYLOAD_SECRET=...
DATABASE_URL=file:./ifts29.db
```

- `ADMIN_EMAIL` is used by seed scripts to create the first admin.
- EmailJS keys in `.env.example` are optional; contact form falls back to no-op if missing.

## TypeScript / Paths

- `tsconfig.json` maps `@/*` to `./*` and `@payload-config` to `./payload.config.ts`.
- `src/scripts` is **excluded** from `tsconfig.json`. Seed scripts run via `tsx --tsconfig tsconfig.json ...`.
- `src/payload-types.ts` is **auto-generated** — never edit by hand. Run `bun run generate:types` after collection/global changes.

## Code Style

Prettier config lives in `package.json`:
- `semi: false`
- `singleQuote: true`
- `bracketSpacing: false`
- `printWidth: 100`

## Git / Branching

- `main` → production (do not push directly).
- `develop` → integration branch; open PRs against this.
- Branch prefixes: `feat/`, `fix/`, `design/`, `docs/`, `qa/`.

## Package Manager

- **Instalar dependencias:** usar `pnpm install` (Vercel lee `pnpm-lock.yaml`).
- **No usar `bun install`:** genera `bun.lock` / `bun.lockb` que entra en conflicto con Vercel.
- **Correr scripts:** `bun run dev`, `bun run build`, etc. siguen funcionando perfecto (Bun como runtime es compatible con node_modules de pnpm).

## Gotchas

- `bun run build` explicitly passes `--webpack`. Omitting it may not match production behavior.
- The SQLite db file and WAL files are `.gitignore`d (`*.db`, `*.db-shm`, `*.db-wal`). Each dev creates their own local db on first `npm run dev`.
- Payload admin import map is auto-generated in `app/(payload)/admin/importMap/`.
- Seed scripts auto-load `.env.local` via `dotenv/config`; they do not need env vars injected manually.
