# Plan de Mantenimiento — Portal IFTS 29

Plan de mantenimiento periódico del portal institucional. Cubre actualización de dependencias, backup de base de datos, monitoreo de errores, seguridad y procedimiento para cambios evolutivos.

> **Stack:** Next.js 16 + Payload CMS 3 + SQLite (local) / Turso (prod)  
> **Deploy:** Vercel (producción desde `main`, preview desde `develop`)  
> **Storage:** Vercel Blob

---

## 1. Actualización de Dependencias

### Frecuencia recomendada

| Tipo | Frecuencia | Cuándo |
|------|-----------|--------|
| Security patches (critical) | **Inmediata** | Al detectar vulnerabilidad |
| Minor / patch | **Trimestral** | Marzo, Junio, Septiembre, Diciembre |
| Major / breaking | **Semestral** | Evaluar impacto antes de aplicar |

### Auditar versiones disponibles

```bash
bun outdated
```

Muestra las dependencias con versión actual, deseada y latest.

### Procedimiento de actualización

```bash
# 1. Crear branch dedicada
git checkout develop
git pull origin develop
git checkout -b chore/update-deps-YYYY-MM

# 2. Actualizar dependencias (una por una para control)
bun update <paquete>

# 3. Regenerar tipos de Payload si se actualizó el CMS
bun run generate:types

# 4. Verificar build
bun run build

# 5. Verificar lint
bun run lint

# 6. Smoke test manual en local
bun run dev
# Navegar: /, /carreras, /noticias, /admin, /login

# 7. Commit y PR
git add package.json pnpm-lock.yaml
git commit -m "chore: actualizar dependencias [paquete] a vX.Y.Z"
git push origin chore/update-deps-YYYY-MM
# Crear PR contra develop
```

### Priorización de security updates

```bash
# Auditar vulnerabilidades conocidas
bun audit

# Si bun audit no está disponible, revisar GitHub Security Advisories:
# https://github.com/SchallmoserJuan/ifts29-portal/security/advisories
```

### Registro en changelog

Mantener un archivo `CHANGELOG.md` en la raíz del proyecto con el formato:

```markdown
## [YYYY-MM-DD] — Mantenimiento trimestral

### Actualizado
- payload: 3.85.0 → 3.88.0
- next: 16.2.6 → 16.3.0

### Verificado
- Build exitoso
- Lint limpio
- Smoke test en local OK
```

---

## 2. Backup de Base de Datos

### Ubicación

| Entorno | Archivo | Nota |
|---------|---------|------|
| Local | `ifts29.db` (raíz del proyecto) | SQLite archivo único |
| Producción | Turso (`libsql://...`) | Usar `turso db shell` para dump |

### Script de backup automático

```bash
bun run scripts/backup-db.sh
```

O directamente:

```bash
bash scripts/backup-db.sh
```

El script:
- Crea el directorio `backup/` si no existe
- Copia `ifts29.db` como `backup/ifts29-YYYY-MM-DD.db`
- Muestra el tamaño del backup generado

### Backup manual mensual

```bash
# Crear backup con fecha
cp ifts29.db backup/ifts29-$(date +%Y-%m-%d).db

# Verificar que se creó correctamente
ls -lh backup/ifts29-$(date +%Y-%m-%d).db
```

### Frecuencia

| Momento | Acción |
|---------|--------|
| **Mensual** | Backup manual del primer día hábil del mes |
| **Pre-deploy** | Backup inmediatamente antes de cada deploy a producción |
| **Post-seed** | Backup después de ejecutar seed scripts en producción |

### Backup en producción (Turso)

```bash
# Instalar Turso CLI si no está disponible
# brew install tursodatabase/tap/turso  # macOS
# curl -sSfL https://get.turso.tech/install.sh | bash  # Linux

# Autenticarse (solo la primera vez)
turso auth login

# Conectarse y hacer dump
turso db shell tu-database-name ".dump" > backup/ifts29-turso-$(date +%Y-%m-%d).sql
```

### Restaurar base de datos

**Entorno local (SQLite):**

```bash
# 1. Detener el servidor de desarrollo
# 2. Reemplazar la base de datos actual
cp backup/ifts29-YYYY-MM-DD.db ifts29.db
# 3. Reiniciar el servidor
bun run dev
```

**Entorno producción (Turso):**

```bash
# Restaurar desde dump SQL
turso db shell tu-database-name < backup/ifts29-turso-YYYY-MM-DD.sql
```

### Testear restore en local

```bash
# 1. Mover la DB actual a un respaldo temporal
mv ifts29.db ifts29.db.tmp

# 2. Restaurar desde backup
cp backup/ifts29-YYYY-MM-DD.db ifts29.db

# 3. Iniciar el servidor y verificar que los datos se ven correctamente
bun run dev

# 4. Si todo funciona, eliminar el temporal
rm ifts29.db.tmp

# 5. Si falla, revertir
mv ifts29.db.tmp ifts29.db
```

### Notas importantes

- Los archivos `*.db` están en `.gitignore`. **Nunca commitear la base de datos.**
- El directorio `backup/` debe estar en `.gitignore` si contiene archivos `.db`.
- Los backups de producción (Turso) son dumps SQL, no archivos binarios.

---

## 3. Monitoreo de Errores

### Vercel Dashboard

#### Acceder a Function Logs

1. Ir a [Vercel Dashboard](https://vercel.com) → seleccionar el proyecto `ifts29-portal`
2. Navegar a **Observability** → **Runtime Logs**
3. Filtrar por:
   - **Status code:** `5xx` (errores de servidor), `4xx` (errores de cliente)
   - **Path:** rutas específicas (ej. `/api/`, `/admin`)
   - **Timeframe:** últimas 24h, 7d, 30d
4. Cada entrada muestra timestamp, ruta, status code y stack trace

#### Configurar alertas

1. Vercel Dashboard → **Settings** → **Notifications**
2. Configurar alertas para:
   - **Deployment Failed** → notificar al canal de equipo
   - **Function Invocation Errors** → umbral: > 5 errores en 5 minutos
   - **Performance** → alerta si el tiempo de respuesta supera 2s (p50)
3. Conectar con Slack, Discord o Email según disponibilidad del equipo

#### Monitoreo de rendimiento

1. Vercel Dashboard → **Observability** → **Web Analytics**
2. Revisar métricas clave:
   - **LCP** (Largest Contentful Paint): objetivo < 2.5s
   - **FCP** (First Contentful Paint): objetivo < 1.8s
   - **TTFB** (Time to First Byte): objetivo < 800ms
3. Si alguna métrica se degrada, revisar cambios recientes en el deploy

### Plan futuro: Sentry

Si se integra Sentry en el futuro:

```bash
# Instalar (requiere planificación de presupuesto)
# pnpm install @sentry/nextjs
```

- Configurar en `next.config.ts` y `sentry.client.config.ts` / `sentry.server.config.ts`
- Vincular el proyecto en [sentry.io](https://sentry.io)
- Agregar `SENTRY_DSN` a las variables de entorno en Vercel

### Cómo leer logs de Payload

Los errores de Payload aparecen en los mismos Runtime Logs de Vercel. Para identificar:

- **Errores de autenticación:** buscar `AuthenticationError` o `Forbidden`
- **Errores de validación:** buscar `ValidationError` — indica un campo requerido faltante o tipo incorrecto
- **Errores de base de datos:** buscar `SQLITE_ERROR` o `LibsqlError`
- **Errores de storage:** buscar `BlobError` o `BlobStorageError`

### Logs en desarrollo local

```bash
# Los logs aparecen en la terminal donde corre bun run dev
# Para guardar logs a archivo:
bun run dev 2>&1 | tee logs/dev-$(date +%Y-%m-%d).log
```

---

## 4. Seguridad

### Verificación de `PAYLOAD_SECRET`

**En producción (Vercel):**

1. Ir a Vercel Dashboard → Proyecto → **Settings** → **Environment Variables**
2. Verificar que `PAYLOAD_SECRET` **no** sea el valor por defecto (`desarrollo-super-seguro-cambiar-en-produccion`)
3. El valor debe ser una cadena aleatoria de al menos 32 caracteres

**Generar un nuevo secret si es necesario:**

```bash
# Generar secret aleatorio seguro
openssl rand -base64 32
```

### Rotación de secrets

| Secret | Frecuencia | Procedimiento |
|--------|-----------|---------------|
| `PAYLOAD_SECRET` | **Semestral** (Enero / Julio) | Generar nuevo valor, actualizar en Vercel, redeploy |
| `DATABASE_AUTH_TOKEN` | **Semestral** | Generar nuevo token en Turso, actualizar en Vercel |
| `BLOB_READ_WRITE_TOKEN` | **Semestral** | Regenerar en Vercel Blob Storage, actualizar variable |

**Procedimiento de rotación:**

```bash
# 1. Generar nuevo secret
openssl rand -base64 32

# 2. Actualizar en Vercel Dashboard → Settings → Environment Variables
#    (reemplazar el valor de PAYLOAD_SECRET)

# 3. Redeploy forzado para que tome la nueva variable
#    Vercel Dashboard → Deployments → últmo deploy → Redeploy

# 4. Verificar que el sitio funciona correctamente
#    Navegar /, /admin, /api/*
```

### Auditoría de credenciales en código

```bash
# Buscar posibles credenciales hardcodeadas
grep -rni "secret" --include="*.ts" --include="*.tsx" --include="*.js" src/ app/
grep -rni "password" --include="*.ts" --include="*.tsx" --include="*.js" src/ app/
grep -rni "token" --include="*.ts" --include="*.tsx" --include="*.js" src/ app/
grep -rni "api_key\|apikey\|api-key" --include="*.ts" --include="*.tsx" --include="*.js" src/ app/

# Verificar que .gitignore cubre los archivos sensibles
cat .gitignore | grep -E "\.env|\.local|\.db"
```

**Frecuencia:** cada 3 meses o antes de cada release mayor.

### Revisión de usuarios inactivos

1. Acceder al panel de Payload: `/admin`
2. Ir a **Users** en la sidebar
3. Revisar la lista y detectar:
   - Usuarios que ya no pertenecen a la institución
   - Cuentas sin actividad en los últimos 6 meses
   - Cuentas con rol incorrecto
4. Acciones:
   - **Deshabilitar** (no eliminar) cuentas inactivas
   - **Reasignar roles** si es necesario
   - **Eliminar** solo si hay confirmación escrita del responsable

**Frecuencia:** cada 6 meses (junto con la rotación de secrets).

---

## 5. Checklist Pre-Deploy

Ejecutar esta checklist **antes de cada deploy a producción** (merge a `main`).

### Build y calidad de código

- [ ] `bun run build` completa sin errores
- [ ] `bun run lint` pasa sin warnings ni errores
- [ ] `bun run generate:types` está actualizado (si hubo cambios en colecciones)

### Base de datos

- [ ] Backup de la base de datos creado (`bash scripts/backup-db.sh`)
- [ ] Si es producción, backup de Turso generado (`turso db shell ... .dump`)
- [ ] Las migraciones están aplicadas (local: automático con `push: true`)

### Variables de entorno

- [ ] `PAYLOAD_SECRET` está configurado y no es el valor por defecto
- [ ] `DATABASE_URL` apunta a la base de datos correcta para el entorno
- [ ] `BLOB_READ_WRITE_TOKEN` está configurado (producción)
- [ ] No hay variables de entorno nuevas sin documentar en `.env.example`

### Testing funcional

- [ ] Home (`/`) carga correctamente con datos reales
- [ ] Listado de carreras (`/carreras`) muestra las carreras publicadas
- [ ] Listado de noticias (`/noticias`) muestra artículos publicados
- [ ] Página institucional (`/institucional`) muestra contenido
- [ ] Login (`/login`) funciona con credenciales válidas
- [ ] Portal privado (`/portal`) carga para usuarios autenticados
- [ ] Panel admin (`/admin`) accesible y funcional
- [ ] Formulario de contacto envía correctamente (si EmailJS está configurado)
- [ ] Imágenes y documentos se cargan desde Vercel Blob (producción)

### Git y deploy

- [ ] PR revisado y aprobado por al menos un miembro del equipo
- [ ] Branch `develop` está actualizada con los últimos cambios
- [ ] PR mergeado a `develop` y preview deploy verificado en Vercel
- [ ] No hay conflictos entre `develop` y `main`

### Post-deploy

- [ ] Deploy en Vercel completado sin errores (verificar en Dashboard)
- [ ] Smoke test rápido en producción (home, admin, ruta crítica)
- [ ] Los webhooks de Vercel Blob funcionan (subir un archivo de prueba en `/admin`)
- [ ] Si hay error, revertir inmediatamente:
  ```bash
  # En Vercel Dashboard → Deployments → seleccionar deploy anterior → Promote to Production
  ```

---

## 6. Procedimiento para Requerimientos Evolutivos

### Evaluación de scope

| Tamaño | Esfuerzo estimado | Rama | Ejemplo |
|--------|-------------------|------|---------|
| **Small** | < 2 horas | `fix/` o `feat/` | Corregir typo, ajustar estilo, agregar campo simple |
| **Medium** | 1 a 3 días | `feat/` | Nueva sección, integración de API, refactor de componente |
| **Large** | > 3 días | `feat/` con issues hijos | Nuevo módulo completo, migración de versión mayor |

### Flujo de trabajo

```
main ──────────────────────────────────────────────────── ● (producción)
  ↑                                                       
  │ merge final (solo de develop)                         
  │                                                       
develop ──────●────●────●────●────────────────────────── (preview)
  ↑            ↑    ↑    ↑    ↑                           
  │            │    │    │    │ PR + review                
  │   feat/x ──┘    │    │    │                           
  │                 │    │    │                           
  │        feat/y ──┘    │    │                           
  │                      │    │                           
  │             feat/z ──┘    │                           
  │                           │                           
  │                  fix/w ───┘                           
```

### Paso a paso

```bash
# 1. Sincronizar develop
git checkout develop
git pull origin develop

# 2. Crear branch de feature
git checkout -b feat/nombre-descriptivo

# 3. Desarrollar y commitear siguiendo convenciones
#    feat: agregar listado de noticias con paginación
#    fix: corregir desbordamiento del nav en mobile
git add .
git commit -m "feat: descripcion del cambio"

# 4. Testear en local
bun run dev
# Verificar build de producción
bun run build

# 5. Push y crear PR
git push origin feat/nombre-descriptivo
# Crear PR en GitHub: feat/nombre-descriptivo → develop
# Incluir "closes #N" en la descripción del PR

# 6. Revisión de PR
# - Al menos 1 aprobación requerida
# - Juan José o Alvaro realizan el merge final
```

### Despliegue a producción

```bash
# 1. Cuando el PR está mergeado a develop, Vercel genera preview automático
#    Verificar en: https://ifts29-portal-git-develop-*.vercel.app

# 2. Si el preview es correcto, mergear develop a main
git checkout main
git pull origin main
git merge develop
git push origin main

# 3. Vercel hace deploy automático a producción desde main
#    Monitorear en: Vercel Dashboard → Deployments

# 4. Verificar en producción
#    https://portal-ifts29.vercel.app
```

### Revertir un cambio en producción

```bash
# Opción A: Revertir desde Vercel Dashboard
# Deployments → seleccionar deploy anterior → "Promote to Production"

# Opción B: Revertir con git
git checkout main
git revert HEAD
git push origin main
```

---

## 7. Comandos Útiles

### Dependencias

| Comando | Descripción |
|---------|-------------|
| `bun outdated` | Listar dependencias con actualizaciones disponibles |
| `bun update <paquete>` | Actualizar un paquete específico |
| `bun audit` | Auditar vulnerabilidades de seguridad |

### Base de datos (local)

| Comando | Descripción |
|---------|-------------|
| `bash scripts/backup-db.sh` | Crear backup de SQLite con fecha |
| `cp ifts29.db backup/ifts29-$(date +%Y-%m-%d).db` | Backup manual con timestamp |
| `cp backup/ifts29-YYYY-MM-DD.db ifts29.db` | Restaurar backup local |

### Base de datos (producción — Turso)

| Comando | Descripción |
|---------|-------------|
| `turso db shell <db> ".dump" > backup.sql` | Exportar dump SQL de Turso |
| `turso db shell <db> < backup.sql` | Restaurar dump SQL en Turso |
| `turso db list` | Listar bases de datos disponibles |
| `turso db tokens create <db>` | Generar nuevo token de acceso |

### Desarrollo

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Iniciar servidor de desarrollo |
| `bun run build` | Build de producción |
| `bun run lint` | Ejecutar ESLint |
| `bun run generate:types` | Regenerar tipos de Payload |
| `bun run seed:all` | Ejecutar todos los seed scripts |

### Seguridad

| Comando | Descripción |
|---------|-------------|
| `openssl rand -base64 32` | Generar secret aleatorio seguro |
| `grep -rni "password\|secret\|token" src/ app/` | Auditar credenciales en código |

### Git

| Comando | Descripción |
|---------|-------------|
| `git checkout -b feat/nombre` | Crear branch de feature desde develop |
| `git checkout -b fix/nombre` | Crear branch de fix desde develop |
| `git merge develop` | Traer últimos cambios de develop |
| `git revert HEAD` | Revertir último commit |

---

## Calendario de mantenimiento

| Frecuencia | Tarea | Responsable |
|------------|-------|-------------|
| **Mensual** | Backup de base de datos (local) | Tech Lead |
| **Mensual** | Revisar Vercel Function Logs | Tech Lead |
| **Trimestral** | Actualizar dependencias (minor/patch) | Tech Lead |
| **Trimestral** | Auditoría de credenciales en código | QA / Backend |
| **Semestral** | Rotación de secrets | Tech Lead |
| **Semestral** | Revisar usuarios inactivos en Payload | Admin CMS |
| **Semestral** | Evaluar actualizaciones major/breaking | Tech Lead |

---

*Documento mantenido por el equipo del Grupo 11 — Práctica Profesionalizante IV — IFTS N°29*
