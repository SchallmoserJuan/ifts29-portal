# Plan de Aseguramiento de Calidad — Portal IFTS 29

> **Versión:** 1.1  
> **Proyecto:** Portal IFTS 29 — Práctica Profesionalizante IV  
> **Equipo:** Grupo 11  
> **Fecha:** Junio 2026

---

## 1. Resumen del Sistema

Portal institucional del IFTS 29 construido con Next.js 16 + Payload CMS 3. Permite la gestión y visualización de contenido institucional con control de acceso por roles.

| Aspecto | Detalle |
|---------|---------|
| Frontend | Next.js 16 (App Router), Tailwind CSS 4 |
| CMS | Payload CMS 3 con editor Lexical |
| BD | SQLite (local) / Turso (producción) |
| Storage | Vercel Blob (producción) / local (dev) |
| Auth | Payload Auth con cookies, expiración 8h |
| Testing | Vitest (unitario/integración) + Playwright (E2E) |

---

## 2. Módulos del Sistema

### 2.1 Mapa de rutas

| Módulo | Ruta | Tipo | Autenticación | Estado |
|--------|------|------|---------------|--------|
| Home | `/` | Pública | No | Implementado |
| Oferta Académica | `/carreras` | Pública | No | Implementado |
| Detalle de Carrera | `/carreras/[slug]` | Pública | No | Implementado |
| Noticias | `/noticias` | Pública | No | Implementado |
| Artículo | `/noticias/[slug]` | Pública | No | Implementado |
| Institucional | `/institucional` | Pública | No | Implementado |
| Contacto | `/contacto` | Pública | No | Implementado |
| Eventos | `/eventos` | Pública | No | Implementado |
| Investigación | `/investigacion` | Pública | No | Implementado |
| Login | `/login` | Pública | No | Implementado |
| Portal Dashboard | `/portal` | Privada | Sí | Implementado |
| Biblioteca | `/portal/biblioteca` | Privada | Sí | Implementado |
| Admin Payload | `/admin` | Privada | Sí (staff) | Implementado |

### 2.2 API Routes

| Método | Ruta | Función | Acceso |
|--------|------|---------|--------|
| POST | `/api/contact` | Enviar formulario de contacto | Público |
| GET | `/api/contacts/[id]` | Obtener detalle de contacto | Staff |
| POST | `/api/contacts/[id]/reply` | Responder consulta | Staff |
| GET | `/api/notifications` | Listar notificaciones | Staff |
| GET | `/api/notifications/[id]` | Ver notificación | Staff |
| PATCH | `/api/notifications/[id]` | Marcar como leída | Staff |
| POST | `/api/notifications/[id]/respond` | Tomar consulta | Staff |
| GET | `/api/users/me` | Sesión actual | Autenticado |
| POST | `/api/users/logout` | Cerrar sesión | Autenticado |

---

## 3. Modelo de Datos (Collections Payload)

### 3.1 Colecciones

| Colección | Slug | Autenticación | Upload |
|-----------|------|---------------|--------|
| Users | `users` | Sí (8h exp, 5 intentos) | No |
| Media | `media` | No | Imágenes (`image/*`) |
| Careers | `careers` | No | No |
| News | `news` | No | No |
| Documents | `documents` | No | PDF, DOC, DOCX |
| Events | `events` | No | No |
| Projects | `projects` | No | No |
| Companies | `companies` | No | No |
| Contacts | `contacts` | No | No |
| Notifications | `notifications` | No | No |

### 3.2 Globals

| Global | Slug | Descripción |
|--------|------|-------------|
| SiteSettings | `site-settings` | Configuración del sitio |
| InstitutionalContent | `institutional-content` | Contenido institucional |

---

## 4. Matriz de Permisos por Rol

| Recurso | Admin | Teacher | Student | Anónimo |
|---------|-------|---------|---------|---------|
| **Users** | CRUD completo | Solo lectura propia | Solo lectura/edición propia | — |
| **Media** | CRUD completo | CRUD completo | Solo lectura | Solo lectura |
| **Careers** | CRUD completo | CRUD + borradores | Solo publicado | Solo publicado |
| **News** | CRUD completo | CRUD + borradores | Solo publicado | Solo publicado |
| **Documents** | CRUD completo | CRUD + todo | `public` + `students` | Solo `public` |
| **Events** | CRUD completo | CRUD + borradores | Solo publicado | Solo publicado |
| **Projects** | CRUD completo | CRUD + borradores | Solo publicado | Solo publicado |
| **Companies** | CRUD completo | CRUD + borradores | Solo publicado | Solo publicado |
| **Contacts** | CRUD completo | Lectura/actualización | — | Solo crear |
| **Notifications** | Lectura/actualización | Lectura/actualización | — | — |
| **SiteSettings** | Lectura/actualización | Solo lectura | Solo lectura | Solo lectura |
| **InstitutionalContent** | Lectura/actualización | Solo lectura | Solo lectura | Solo lectura |

---

## 5. Cobertura de Tests Actual

### 5.1 Tests Unitarios / Integración (Vitest)

**19 suites — Ejecutan en jsdom con globals**

| Archivo | Tests | Cobertura |
|---------|-------|-----------|
| `src/test/access.test.ts` | 26 tests | 100% `access.ts` |
| `src/test/analytics.test.ts` | 4 tests | 100% `analytics.ts` |
| `src/test/auth.test.ts` | 8 tests | 100% `auth.ts` |
| `src/test/auth-context.test.tsx` | 8 tests | 100% `auth-context.tsx` |
| `src/test/auth-lib.test.ts` | 14 tests | 100% `auth-lib.ts` |
| `src/test/contact-api-routes.test.ts` | 20 tests | — |
| `src/test/contact-form.test.tsx` | 5 tests | 100% `contact-form.tsx` |
| `src/test/content.test.ts` | 48 tests | 97.7% `content.ts` |
| `src/test/email.test.ts` | 6 tests | 100% `email.ts` |
| `src/test/error-boundary.test.tsx` | 4 tests | 100% `error-boundary.tsx` |
| `src/test/login-form.test.tsx` | 7 tests | 100% `login-form.tsx` |
| `src/test/news-utils.test.ts` | 9 tests | 100% `news-utils.ts` |
| `src/test/notification-api-routes.test.ts` | 17 tests | — |
| `src/test/rate-limit.test.ts` | 13 tests | 85.7% `rate-limit.ts` |
| `src/test/slug.test.ts` | 7 tests | 100% `slug.ts` |
| `src/test/slug-field.test.ts` | 7 tests | 100% `slugField` |
| `src/test/users-me.test.ts` | 3 tests | — |
| `src/test/users-logout.test.ts` | 2 tests | — |
| `src/test/smoke.test.ts` | 2 tests | — |

**Total: 266 tests unitarios/de integración**

### 5.2 Tests E2E (Playwright)

**4 specs — Requieren servidor corriendo + `.env.test.local`**

| Archivo | Tests | Dependencias |
|---------|-------|-------------|
| `e2e/login.spec.ts` | 7 tests | Credenciales de prueba |
| `e2e/portal-roles.spec.ts` | 12 tests | Auth setup previo |
| `e2e/contact-form.spec.ts` | 9 tests | Ninguna |
| `e2e/auth.setup.ts` | 3 setups | Credenciales admin/teacher/student |

**Total: 28 tests E2E + 3 setups**

### 5.3 Cobertura General

| Métrica | Antes (v1.0) | Actual (v1.1) |
|---------|-------------|----------------|
| Lines | 20.23% | **28.5%** |
| Statements | 20.5% | **28.19%** |
| Functions | 16.75% | **19.06%** |
| Branches | 15.36% | **17.05%** |

### 5.4 Thresholds configurados (en `vitest.config.ts`)

| Path | Lines | Statements | Functions | Branches |
|------|-------|------------|-----------|----------|
| `src/lib/**` | 37% | 37% | 35% | 35% |
| `src/context/**` | 60% | 60% | 60% | 60% |
| `src/fields/**` | 60% | 60% | 60% | 60% |

| Path | Lines (actual) | Statements (actual) | Threshold |
|------|---------------|---------------------|-----------|
| `src/lib/**` | **96.62%** | **96.7%** | ≥ 37% ✅ |
| `src/context/**` | **100%** | **100%** | ≥ 60% ✅ |
| `src/fields/**` | **100%** | **100%** | ≥ 60% ✅ |

---

## 6. Gaps de Cobertura Detectados

### 6.1 Sin cobertura (0%)

| Archivo | Prioridad | Riesgo |
|---------|-----------|--------|
| `src/collections/*` (10 archivos) | Alta | Las colecciones definen schemas, relaciones y acceso. Sin tests no se validan reglas de negocio del CMS. |
| `src/globals/*` (2 archivos) | Alta | Igual que collections |
| `src/components/*` (~30 archivos) | Media | Componentes de UI. Validación visual vía E2E, pero sin tests unitarios de lógica. |
| `src/data/*` | Baja | Datos estáticos. Riesgo bajo. |

### 6.2 Con cobertura parcial

| Archivo | Cobertura | Gap |
|---------|-----------|-----|
| `content.ts` | 97.7% lines | Branch coverage en `getProjectsList` (merge de imagen por defecto) |
| `rate-limit.ts` | 85.7% lines | Cleanup interval interno (setInterval, lógica de runtime no testeable unitariamente) |

### 6.3 Funcionalidades sin test E2E

| Funcionalidad | Riesgo |
|---------------|--------|
| CRUD de contenido desde admin | Alto — es la funcionalidad principal del CMS |
| Flujo completo de contacto (crear → notificar → responder → cerrar) | Alto |
| Registro de primer usuario (bootstrap) | Medio |
| Búsqueda en home | Bajo (depende de implementación) |
| Biblioteca virtual (visibilidad por rol) | Alto |
| Páginas públicas estáticas (institucional, investigación, eventos) | Medio |

---

## 7. Estrategia de Testing Recomendada

### 7.1 Prioridad Inmediata (Alta)

1. **Tests de collections** — Validar schemas, campos requeridos, valores por defecto
2. **Tests E2E de flujo de contacto** — Crear contacto como anónimo, notificar staff, responder
3. **Tests E2E de biblioteca** — Verificar visibilidad de documentos por rol

### 7.2 Corto Plazo (Media)

4. **Tests de componentes core** — `NewsCard`, navigation, etc.
5. **Tests de portal dashboard** — Renderizado condicional según rol

### 7.3 Mediano Plazo (Baja)

8. **Tests de páginas (app router)** — Server components con data fetching
9. **Tests de accesibilidad** — a11y con axe-core
10. **Tests de performance** — Lighthouse CI o similar

---

## 8. Reglas de Negocio Documentadas

### 8.1 Usuarios y Autenticación

- RN-001: El primer usuario del sistema se crea sin restricciones (bootstrap).
- RN-002: Solo administradores pueden crear nuevos usuarios después del bootstrap.
- RN-003: Máximo 5 intentos de login antes de bloqueo por 10 minutos.
- RN-004: Token de sesión expira a las 8 horas.
- RN-005: El campo `career` en Users solo se muestra si `role === 'student'`.

### 8.2 Contenido

- RN-006: El contenido con `status: 'draft'` solo es visible para staff (admin/teacher).
- RN-007: El slug se autogenera desde el título/nombre y debe ser único.
- RN-008: Los tags se separan por punto y coma (`;`).
- RN-009: Los documentos tienen 3 niveles de visibilidad: `public`, `students`, `staff`.

### 8.3 Contacto

- RN-010: El formulario de contacto es público (no requiere auth).
- RN-011: Al crear un contacto se genera automáticamente una notificación para staff.
- RN-012: Un contacto puede pasar por estados: `new → read → responding → replied → closed`.
- RN-013: El campo `respondiendoPor` se asigna cuando un staff toma la consulta.
- RN-014: Si otro usuario ya está respondiendo, se rechaza con 409 Conflict.

### 8.4 Notificaciones

- RN-015: Las notificaciones solo son visibles para staff (admin/teacher).
- RN-016: Una notificación puede estar: `new → read → replied`.

---

## 9. Plan de Pruebas por Módulo

| Módulo | Tipo | Prioridad | Técnica Recomendada |
|--------|------|-----------|---------------------|
| Home | E2E | Media | Verificar renderizado de hero, últimas noticias, cards |
| Carreras | E2E + Unit | Alta | Listado, detalle, slug, filtro por estado |
| Noticias | E2E + Unit | Alta | CRUD, categorías, featured, paginación |
| Institucional | E2E | Media | Renderizado de contenido rich text |
| Contacto | E2E + Unit | **Crítica** | Flujo completo: envío → notificación → respuesta |
| Login | E2E + Unit | Alta | Validación, errores, redirección por rol |
| Portal | E2E + Unit | Alta | Dashboard condicional por rol |
| Biblioteca | E2E + Unit | Alta | Visibilidad de documentos por rol |
| Admin | E2E | Alta | CRUD de collections, manejo de errores |
| API | Unit | **Crítica** | Endpoints ya tienen buena cobertura, completar faltantes |

---

## 10. Configuración de Entornos de Prueba

### 10.1 Variables de entorno requeridas

```env
# Unit tests (Vitest) — no requieren vars especiales
# Corren con mocks, no necesitan servidor ni BD

# E2E tests (Playwright)
PAYLOAD_SECRET=...
DATABASE_URL=file:./ifts29.db
TEST_ADMIN_EMAIL=admin@ifts29.edu.ar
TEST_ADMIN_PASSWORD=...
TEST_TEACHER_EMAIL=teacher@ifts29.edu.ar
TEST_TEACHER_PASSWORD=...
TEST_STUDENT_EMAIL=student@ifts29.edu.ar
TEST_STUDENT_PASSWORD=...
```

### 10.2 Seed data requerida para E2E

- 1 usuario admin
- 1 usuario teacher
- 1 usuario student
- Al menos 1 carrera publicada
- Al menos 1 noticia publicada
- Al menos 1 documento en cada categoría de visibilidad
- Al menos 1 contacto y 1 notificación

---

## 11. Monitoreo de Calidad

### 11.1 Gates de calidad

| Gate | Herramienta | Falla si |
|------|-------------|----------|
| Linter | ESLint | Cualquier error |
| Tipado | `tsc --noEmit` | Cualquier error de tipo |
| Tests unitarios | Vitest | Cualquier test falla |
| Cobertura | Vitest + thresholds | No alcanza thresholds configurados |
| Tests E2E | Playwright | Cualquier test falla |
| Build | `next build` | Build falla |

### 11.2 Thresholds objetivo

| Fase | Cobertura mínima |
|------|------------------|
| Sprint actual | 28% (superado) |
| Próximo sprint | 35% |
| Meta final | 60%+ |

---

## 12. Historial de Cambios de QA

| Fecha | Cambio | Responsable |
|-------|--------|-------------|
| 2026-06-07 | Creación del plan de QA | — |
| 2026-06-07 | v1.1: Actualización post-coverage phase B — 266 tests (19 suites), `src/lib` al 96.7%, `src/context` al 100%, cobertura global 28.5%. Se agregaron tests para `auth-lib`, `contact-form`, `content` (getScholarships/getBecasPage), `login-form`, `error-boundary`, `rate-limit`, `news-utils`, `analytics`, y `auth-context` expandido. Compatibilidad Windows con `cross-env`. | — |
