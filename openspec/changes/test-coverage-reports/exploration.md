# Exploration: Test Coverage Total + Reportes Automatizados

**Change**: test-coverage-reports
**Date**: 2026-05-17
**Status**: done

## Executive Summary

El proyecto tiene buena cobertura en access control, auth y rutas API custom, pero **cero tests** para `email.ts`, `slug.ts`, `auth-context.tsx` y `content.ts` (~30-35% de cobertura estimada). No hay reportes HTML configurados en Vitest ni Playwright, y no existe ningún pipeline de CI. La recomendación es un plan incremental de 3 fases.

---

## Coverage Gaps

| Módulo | Gap | Esfuerzo | Riesgo | Prioridad |
|--------|-----|----------|--------|-----------|
| `src/lib/email.ts` | 4 funciones sin tests | Bajo | Alto — fallas silenciosas de email | **HIGH** |
| `src/lib/slug.ts` | Función pura sin tests | Muy Bajo | Bajo | MEDIUM |
| `src/fields/slug.ts` | Hook callbacks sin tests | Bajo | Medio | MEDIUM |
| `src/context/auth-context.tsx` | Provider + hooks sin RTL | Medio | Alto — usado en toda la app | **HIGH** |
| `app/api/users/me/route.ts` | GET handler sin tests | Bajo | Medio | MEDIUM |
| `app/api/users/logout/route.ts` | POST handler sin tests | Muy Bajo | Bajo | LOW |
| `src/lib/content.ts` | 10 funciones fetch sin tests | Medio | Medio — lógica de fallback | MEDIUM |
| `src/components/**` (50+ archivos) | RTL tests | Alto | Bajo (presentacional) | LOW (80/20) |
| `src/collections/**` | Config Payload | Alto | Bajo (framework-managed) | SKIP |

---

## Reporting Gaps

1. No hay reporte HTML de cobertura — solo `text` + `lcov`
2. No hay reporter `json-summary` — necesario para badges y thresholds en CI
3. No hay thresholds de cobertura — regresiones pasan desapercibidas
4. No hay HTML report en Playwright — `reporter: 'list'` descarta resultados estructurados
5. No existe CI pipeline — `.github/` no existe
6. No hay integración con Codecov/Coveralls — sin diff de cobertura en PRs
7. No hay reporte combinado (unit + E2E)

---

## Enfoque Recomendado: Incremental (3 Fases)

### Fase A — Reportes + Tests unitarios faltantes (Low effort)
- Agregar `html` + `json-summary` reporters a `vitest.config.ts`
- Agregar `['list', 'html']` a `playwright.config.ts`
- Tests para: `email.ts`, `slug.ts`, `slugField`, `users/me`, `users/logout`
- RTL tests para `AuthProvider` / `useAuth`
- Cobertura estimada post-Fase A: ~60%+

### Fase B — CI con GitHub Actions (Medium effort)
- `.github/workflows/ci.yml` corriendo `npm run test:coverage` en push/PR
- Upload lcov a Codecov (o artifact HTML)
- Threshold mínimo de 60% en `vitest.config.ts`

### Fase C — E2E en CI (High effort, futuro)
- `npm run build && npm run start` con SQLite seeded en CI
- GitHub Secrets para credenciales de test
- Mirrors del patrón `.env.test.local`

---

## Riesgos

- **E2E en CI**: requiere servidor corriendo + SQLite seeded + GitHub Secrets (Fase C)
- **framer-motion en jsdom**: `useInView` requiere mock de `IntersectionObserver` en `setup.ts`
- **React 19 + `useTransition`**: RTL tests de `LoginForm` necesitan `act()` cuidadoso
- **Threshold timing**: agregar threshold DESPUÉS de escribir los tests, no antes
- **GitHub Secrets**: `CODECOV_TOKEN`, credenciales de test — configurar en repo settings

---

## Next Recommended

`sdd-propose` — scope concreto y acotado, listo para formalizar en propuesta.
