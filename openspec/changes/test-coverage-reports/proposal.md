# Proposal: Test Coverage Total + Reportes Automatizados

**Change**: test-coverage-reports
**Date**: 2026-05-17
**Status**: proposed
**Author**: af-coronel

---

## 1. Intent

### Problema

El proyecto `ifts29-portal` tiene una base de testing razonable (Vitest 4 para unit/integration, Playwright 1.60 para E2E, v8 coverage provider), pero presenta tres deficiencias críticas:

1. **Cobertura parcial (~30-35%)**: módulos de alto riesgo no tienen ningún test
   - `src/lib/email.ts` — 4 funciones de envío de email sin tests (fallas silenciosas posibles)
   - `src/context/auth-context.tsx` — provider de autenticación usado en TODA la app sin RTL tests
   - `src/lib/slug.ts`, `src/lib/content.ts`, `app/api/users/me`, `app/api/users/logout` — sin cobertura

2. **Reportes ciegos**: la configuración actual emite solo `text` + `lcov`. No hay HTML navegable, no hay `json-summary` para badges/thresholds, no hay HTML report de Playwright. Las regresiones de cobertura pasan desapercibidas.

3. **Sin CI**: no existe `.github/workflows/`. Cada PR depende de que el autor recuerde correr tests localmente. No hay enforcement automático.

### Por qué importa AHORA

- La rama actual (`test/e2e-contact-form-2`) demuestra que el equipo está invirtiendo en E2E, pero sin un piso de calidad mínimo (CI + thresholds) la inversión se diluye con cada merge.
- El stack (Payload CMS 3 + Next.js 16 + React 19) tiene superficies de fallo no triviales — `useTransition`, server actions, hooks de Payload — que requieren observabilidad de cobertura para evolucionar con confianza.
- Es el momento adecuado: hay tests existentes que muestran un patrón claro a replicar, y el alcance es acotado (no requiere reescribir nada).

### Qué significa "éxito"

- Cobertura efectiva **≥ 60%** en `src/lib/**`, `src/context/**`, `src/fields/**` y rutas API custom
- Reporte HTML de cobertura accesible en `coverage/index.html` tras `npm run test:coverage`
- Reporte HTML de Playwright accesible en `playwright-report/index.html` tras `npm run test:e2e`
- Pipeline CI corriendo en cada push/PR con threshold enforcement automático
- Badge de cobertura visible en el README (vía Codecov o artifact upload)

---

## 2. Scope

### IN SCOPE

**Fase A — Reportes + Tests unitarios faltantes** (Low effort, alto impacto)
- Configurar reporters `html` + `json-summary` en `vitest.config.ts`
- Configurar reporter `['list', 'html']` en `playwright.config.ts`
- Escribir tests para módulos sin cobertura:
  - `src/lib/email.ts` — 4 funciones (mock de Resend/nodemailer)
  - `src/lib/slug.ts` — función pura
  - `src/fields/slug.ts` — hooks `beforeChange`/`beforeValidate`
  - `app/api/users/me/route.ts` — GET handler
  - `app/api/users/logout/route.ts` — POST handler
  - `src/context/auth-context.tsx` — `AuthProvider` + `useAuth` con React Testing Library
- Agregar mock de `IntersectionObserver` en `tests/setup.ts` (para framer-motion)
- Documentar comandos en `README.md` (sección "Testing & Coverage")

**Fase B — CI con GitHub Actions** (Medium effort)
- `.github/workflows/ci.yml` con jobs:
  - `lint` — `npm run lint`
  - `typecheck` — `npm run typecheck` (si no existe, agregar script)
  - `test` — `npm run test:coverage` con upload de artifacts
  - `e2e` — bloqueado a Fase C, NO incluido en este paso
- Upload de `coverage/lcov.info` a Codecov (o artifact HTML como fallback)
- Threshold mínimo de **60%** en `vitest.config.ts` (lines, statements, functions, branches)
- Badge de Codecov + CI status en `README.md`

**Fase C — E2E en CI** (High effort, fase explícitamente diferida pero planificada)
- Extender `ci.yml` con job `e2e`:
  - `npm run build` con SQLite seeded
  - `npm run start` en background
  - `npm run test:e2e` contra el server local
  - Upload de `playwright-report/` como artifact
- GitHub Secrets: credenciales de test (mirror del patrón `.env.test.local`)
- Caching de `~/.cache/ms-playwright` para acelerar runs

### OUT OF SCOPE (explícito)

- **Tests para `src/components/**`** (50+ archivos presentacionales) — 80/20: bajo retorno frente al esfuerzo. Se pueden agregar incrementalmente después.
- **Tests para `src/collections/**`** — config declarativa de Payload, gestionada por el framework. SKIP.
- **Mutation testing** (Stryker, etc.) — fuera de alcance, candidato para futuro.
- **Visual regression testing** (Percy, Chromatic) — fuera de alcance.
- **Performance testing / Lighthouse CI** — fuera de alcance.
- **Migración del test runner** (Vitest → Jest u otro) — Vitest 4 se mantiene.
- **Cobertura 100%** — el objetivo es **≥ 60%** efectivo en módulos críticos, no perseguir el 100% que produce tests de relleno.

---

## 3. Approach

### Estrategia: Incremental en 3 Fases

Cada fase produce valor independiente y puede mergearse por separado. Esto respeta el patrón de PRs chicos y permite rollback granular.

### Fase A — Reportes + Tests (PR 1)

**Orden de ejecución (TDD-friendly)**:
1. Habilitar reporters HTML/json-summary primero — sin tocar tests aún. Permite ver el baseline real de cobertura.
2. Escribir tests faltantes módulo por módulo, en orden de riesgo descendente:
   - `email.ts` → `auth-context.tsx` → `slug.ts` + `slugField` → routes API → `content.ts` (opcional, MEDIUM)
3. Agregar mock global de `IntersectionObserver` en `setup.ts` cuando aparezca el primer fallo de framer-motion.
4. Documentar en README al final, cuando los comandos son estables.

**Racional**: agregar reporters ANTES de tests permite medir mejora real. Escribir tests por orden de riesgo asegura que los primeros commits son los de mayor valor.

### Fase B — CI (PR 2, después de Fase A)

**Orden de ejecución**:
1. `.github/workflows/ci.yml` con jobs `lint` + `typecheck` + `test` (sin threshold)
2. Verificar que CI pasa en verde con la cobertura post-Fase A
3. AHORA agregar threshold de 60% en `vitest.config.ts` — nunca antes
4. Configurar Codecov (o artifact upload) + badge

**Racional**: agregar threshold ANTES de tener CI verde causa falsos rojos. El threshold se ajusta a la realidad, no al revés.

### Fase C — E2E en CI (PR 3, futuro, NO incluido en este change)

Esta fase queda **planificada pero no implementada** en este change. Se documenta en el spec para tener trazabilidad, pero se entregará como un change separado (`test-e2e-ci`) cuando Fase A y B estén estables en `main`.

**Racional**: E2E en CI tiene un perfil de complejidad distinto (servidor running, secrets, caching de browsers). Mezclarlo aquí inflaría el PR y aumentaría el riesgo de rollback en cascada.

---

## 4. Affected Files

### Fase A

**Creados**:
- `tests/unit/lib/email.test.ts`
- `tests/unit/lib/slug.test.ts`
- `tests/unit/fields/slug.test.ts`
- `tests/unit/lib/content.test.ts` (opcional, prioridad MEDIUM)
- `tests/integration/api/users-me.test.ts`
- `tests/integration/api/users-logout.test.ts`
- `tests/unit/context/auth-context.test.tsx`

**Modificados**:
- `vitest.config.ts` — agregar reporters `html` + `json-summary`
- `playwright.config.ts` — cambiar reporter a `[['list'], ['html']]`
- `tests/setup.ts` — agregar mock de `IntersectionObserver`
- `package.json` — agregar script `test:coverage:report` (opcional, alias para abrir HTML)
- `README.md` — sección "Testing & Coverage"
- `.gitignore` — agregar `coverage/`, `playwright-report/`, `test-results/` (si faltan)

### Fase B

**Creados**:
- `.github/workflows/ci.yml`
- `codecov.yml` (config opcional para flags/paths)

**Modificados**:
- `vitest.config.ts` — agregar `coverage.thresholds` con 60% en lines/statements/functions/branches
- `package.json` — agregar script `typecheck` si no existe (`tsc --noEmit`)
- `README.md` — badges de CI + Codecov

### Fase C (planificada, fuera de este change)

- `.github/workflows/ci.yml` — agregar job `e2e`
- `.env.test.ci` (template, sin secretos)
- Documentación en `README.md` sobre GitHub Secrets requeridos

---

## 5. Rollback Plan

### Principio

Cada fase es un commit/PR independiente. Rollback = `git revert <merge-commit>` sin tocar otras fases.

### Fase A rollback

- **Síntoma**: tests nuevos fallan en local de manera intermitente, o aumentan tiempo de CI más de 2x.
- **Acción**: `git revert` del PR. Los reporters HTML no rompen nada (son aditivos); los tests nuevos se pueden eliminar archivo por archivo si se quiere conservar parcialmente la mejora de reporters.
- **Granularidad**: cada archivo de test es independiente. Se puede borrar un test sin afectar otros.

### Fase B rollback

- **Síntoma**: CI bloquea PRs por falsos rojos (flakiness en Codecov, threshold inalcanzable).
- **Acción inmediata (no destructiva)**: comentar el threshold en `vitest.config.ts` y commitear. CI sigue corriendo pero no bloquea.
- **Acción completa**: `git revert` del PR de CI. El proyecto vuelve a no tener pipeline, pero los tests de Fase A se preservan.

### Fase C rollback

- N/A — fuera de este change.

### Riesgo de rollback en cascada

Cero. Las fases están diseñadas para ser independientes: Fase B asume reporters de Fase A pero no romperá si se revierte Fase A (solo perderá el HTML report).

---

## 6. Success Criteria

### Fase A — Done When

- [ ] `npm run test:coverage` produce `coverage/index.html` navegable
- [ ] `npm run test:coverage` produce `coverage/coverage-summary.json` con métricas
- [ ] `npm run test:e2e` produce `playwright-report/index.html` navegable
- [ ] Tests existen para: `email.ts`, `slug.ts`, `slugField`, `users/me`, `users/logout`, `AuthProvider`/`useAuth`
- [ ] `npm run test` pasa en verde (todos los tests, incluidos los nuevos)
- [ ] Cobertura efectiva de `src/lib/**` + `src/context/**` + `src/fields/**` + rutas API custom **≥ 60%** (medida con el reporter `text-summary`)
- [ ] README documenta los nuevos comandos en sección dedicada

### Fase B — Done When

- [ ] Push a cualquier branch dispara workflow `ci.yml`
- [ ] Workflow corre `lint` + `typecheck` + `test:coverage` en verde sobre `main` y rama actual
- [ ] PR con cobertura < 60% en `src/lib/**` queda bloqueado por threshold de Vitest
- [ ] Badge de CI status visible en README
- [ ] Badge de cobertura visible en README (Codecov o equivalente)
- [ ] Tiempo total del workflow < 5 minutos (sin E2E)

### Fase C — Done When (referencia, no en este change)

- [ ] Job `e2e` corre en CI sobre PRs (o nightly, según decisión)
- [ ] `playwright-report/` disponible como artifact descargable
- [ ] Tiempo total del workflow (incluyendo E2E) < 15 minutos

---

## 7. Risks and Mitigations

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| `framer-motion` falla en jsdom por `IntersectionObserver` | Alta | Medio | Mock global en `tests/setup.ts` desde el primer test que toque un componente con `useInView` |
| `React 19 + useTransition` requiere `act()` cuidadoso en RTL | Media | Medio | Usar `await waitFor()` + `findBy*` en lugar de `getBy*` para asserciones async; documentar el patrón en un test de referencia (`auth-context.test.tsx`) |
| Agregar threshold antes de tener tests verdes bloquea el merge | Alta | Alto | **Orden estricto**: threshold se agrega DESPUÉS de Fase A. Documentado en sección Approach |
| Codecov requiere `CODECOV_TOKEN` no disponible | Media | Bajo | Fallback a upload de artifact HTML en GitHub Actions (no requiere secrets para repos públicos) |
| Tests de email mockean mal el cliente (Resend/nodemailer) | Media | Bajo | Usar `vi.mock()` con interfaz mínima; verificar contra el código real de `email.ts` durante spec phase |
| CI lento (> 5 min) por SQLite seed o builds | Baja | Medio | Cachear `node_modules` y `.next/cache` desde el primer workflow. E2E queda fuera de este change |
| Cobertura efectiva no llega a 60% post-Fase A | Baja | Alto | El gap actual es de ~30-35% → ~60% es alcanzable con los tests listados. Si no llega, ajustar threshold a baseline real + 5% en Fase B |
| Tests E2E existentes (`test/e2e-*`) se rompen al cambiar el reporter de Playwright | Baja | Bajo | El cambio de `list` → `[list, html]` es aditivo; HTML reporter no afecta ejecución |
| Conflicto con la rama actual `test/e2e-contact-form-2` sin mergear | Media | Bajo | Rebase al inicio de Fase A; coordinar merge order con maintainer |

---

## 8. Open Questions

1. **Codecov vs artifact HTML**: ¿el repo es público o privado? Si es público, Codecov es gratuito y mejor UX. Si es privado, evaluar costo vs artifact upload directo. **Resolver durante spec phase**.
2. **Threshold por path**: ¿queremos thresholds diferenciados (ej. `src/lib/**` al 80%, `src/components/**` al 30%) o un único threshold global? **Resolver durante design phase**.
3. **Typecheck script**: ¿existe `npm run typecheck` o hay que agregarlo? Verificar en `package.json` durante spec phase.
4. **Node version en CI**: ¿pinear a Node 22 LTS o usar `.nvmrc`? Verificar si existe `.nvmrc` durante spec phase.

---

## 9. Next Steps

- `sdd-spec` — formalizar requirements y acceptance criteria para Fase A y B
- `sdd-design` — decidir thresholds, estructura del workflow YAML, estrategia de mocks
- Estos dos pueden correr en paralelo
