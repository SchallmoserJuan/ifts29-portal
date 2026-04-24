# Portal IFTS N.° 29
<img width="1284" height="657" alt="image" src="https://github.com/user-attachments/assets/df87d917-ba1f-48f5-ba67-49867b7215e2" />

---
Portal institucional del **Instituto de Formación Técnica Superior N.° 29**, desarrollado como proyecto integrador de la materia *Práctica Profesionalizante*.

El sistema expone un sitio público con información institucional, oferta académica y noticias, junto con un **portal privado** con autenticación y control de acceso por roles (alumno, profesor, administrador). La gestión de contenidos se realiza a través de un panel de administración headless integrado.

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16 |
| CMS headless | [Payload CMS](https://payloadcms.com) | 3 |
| Base de datos | SQLite (desarrollo) · [Turso](https://turso.tech) libSQL (producción) | — |
| Estilos | [Tailwind CSS](https://tailwindcss.com) | 4 |
| Procesamiento de imágenes | [sharp](https://sharp.pixelplumbing.com) | 0.34 |
| Storage de archivos | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (producción) | — |
| Deploy | [Vercel](https://vercel.com) | — |

---

## Arquitectura

```
┌───────────────────────────────—──────────────────────┐
│                    Vercel (Edge)                     │
│  ┌───────────────────────────────────────────────┐   │
│  │              Next.js 16 (App Router)          │   │
│  │  ┌────────────┐   ┌────────────────────────┐  │   │
│  │  │ Sitio      │   │ Portal privado         │  │   │
│  │  │ público    │   │ (auth + RBAC)          │  │   │
│  │  │  /         │   │  /portal               │  │   │
│  │  │  /carreras │   │  /portal/biblioteca    │  │   │
│  │  │  /noticias │   │  /login                │  │   │
│  │  │  /instit.  │   │                        │  │   │
│  │  └─────┬──────┘   └──────────┬─────────────┘  │   │
│  │        │                     │                │   │
│  │        └──────────┬──────────┘                │   │
│  │                   ▼                           │   │
│  │          Payload CMS 3 (/admin)               │   │
│  │          API REST auto-generada               │   │
│  └───────────────────┬───────────────────────────┘   │
│                      │                               │
│          ┌───────────┼───────────┐                   │
│          ▼           ▼           ▼                   │
│     Turso DB    Vercel Blob   sharp                  │
│     (libSQL)    (uploads)    (imágenes)              │
└───────────────────────────────────────────—──────────┘
```

---

## Modelo de datos

### Colecciones (Collections)

| Colección | Slug | Descripción |
|-----------|------|-------------|
| **Usuarios** | `users` | Autenticación con email/password. Campos: nombre, apellido, rol, carrera (relación condicional para alumnos). |
| **Carreras** | `careers` | Oferta académica. Campos: nombre, slug, resumen, duración, modalidad, requisitos (array), plan de estudio (array), perfil del egresado (rich text). |
| **Noticias** | `news` | Novedades categorizadas (general, académica, institucional, eventos). Campos: título, slug, resumen, contenido rich text, imagen, autor, fecha, destacada. |
| **Documentos** | `documents` | Biblioteca de archivos (PDF, DOCX). Campos: título, descripción, categoría, visibilidad, carrera relacionada. Upload nativo de Payload. |
| **Media** | `media` | Archivos de imagen utilizados en contenido. |

### Globales (Globals)

| Global | Slug | Descripción |
|--------|------|-------------|
| **Configuración del sitio** | `site-settings` | Título, bajada institucional, email de contacto, dirección, teléfono. |
| **Contenido institucional** | `institutional-content` | Historia (rich text), misión, visión, autoridades (array nombre/cargo). |

---

## Control de acceso (RBAC)

El sistema implementa un esquema de permisos basado en tres roles con granularidad a nivel de colección:

| Permiso | `student` | `teacher` | `admin` |
|---------|:---------:|:---------:|:-------:|
| Leer contenido público | ✅ | ✅ | ✅ |
| Leer documentos públicos + alumnos | ✅ | ✅ | ✅ |
| Leer documentos staff-only | ❌ | ✅ | ✅ |
| Acceder al panel `/admin` | ❌ | ✅ | ✅ |
| Crear / editar contenido | ❌ | ✅ | ✅ |
| Eliminar contenido | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ |
| Editar configuración del sitio | ❌ | ❌ | ✅ |

La lógica de acceso se centraliza en [`src/access.ts`](src/access.ts) mediante funciones reutilizables que Payload evalúa en cada request.

---

## Mapa de rutas

### Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing institucional con hero, accesos rápidos y secciones informativas. |
| `/institucional` | Historia, misión, visión y autoridades del instituto. |
| `/carreras` | Listado de carreras publicadas. |
| `/carreras/[slug]` | Detalle de una carrera (plan de estudio, requisitos, perfil del egresado). |
| `/noticias` | Listado de noticias publicadas ordenadas por fecha. |
| `/noticias/[slug]` | Detalle de una noticia con contenido rich text. |
| `/login` | Formulario de autenticación del portal. |

### Privadas (requieren sesión)

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/portal` | Todos los roles | Dashboard con accesos según rol y datos de sesión. |
| `/portal/biblioteca` | Todos los roles | Documentos filtrados por visibilidad según el rol del usuario. |
| `/admin` | `teacher`, `admin` | Panel de Payload CMS para gestión de contenidos. |

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto a partir de [`.env.example`](.env.example):

```env
# Secreto de Payload (cambiar en producción)
PAYLOAD_SECRET=desarrollo-super-seguro-cambiar-en-produccion

# Base de datos local (desarrollo)
DATABASE_URL=file:./ifts29.db

# Base de datos remota Turso (producción — configurar en Vercel)
# DATABASE_URL=libsql://tu-database.turso.io
# DATABASE_AUTH_TOKEN=tu-token-aqui

# Storage para uploads en Vercel (se genera al vincular Blob en el proyecto)
# BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

---

## Instalación y desarrollo local

### Requisitos previos

- **Node.js** 18 o superior
- **Git**

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/SchallmoserJuan/ifts29-portal.git
cd ifts29-portal

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.  
El panel de administración en `http://localhost:3000/admin`.

> **Primer uso:** al acceder a `/admin` por primera vez se solicitará la creación de un usuario administrador inicial.

### Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Levanta Next.js + Payload en modo desarrollo. |
| Build | `npm run build` | Genera la build de producción. |
| Lint | `npm run lint` | Ejecuta ESLint sobre el proyecto. |
| Tipos | `npm run generate:types` | Regenera los tipos TypeScript de Payload. |

---

## Deploy en producción (Vercel)

El proyecto está preparado para deploy en **Vercel** con la siguiente infraestructura cloud:

1. **Base de datos:** [Turso](https://turso.tech) (libSQL remoto) — configurar `DATABASE_URL` y `DATABASE_AUTH_TOKEN` en las variables de entorno de Vercel.
2. **Storage de uploads:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) — vincular el store desde el dashboard de Vercel y agregar `BLOB_READ_WRITE_TOKEN`.
3. **Secreto de Payload:** configurar `PAYLOAD_SECRET` con un valor seguro y único.

---

## Convenciones del equipo

### Ramas

| Rama | Propósito |
|------|-----------|
| `main` | Versiones entregables. No se pushea directo. |
| `develop` | Integración del equipo. |
| `feat/*` | Features nuevas. |
| `fix/*` | Corrección de bugs. |
| `design/*` | Cambios visuales / UI. |
| `docs/*` | Documentación. |
| `qa/*` | Testing y QA. |

### Flujo de trabajo

1. Actualizar `develop` con `git pull origin develop`.
2. Crear rama desde `develop` con el prefijo correspondiente.
3. Trabajar, commitear y pushear.
4. Crear **Pull Request** hacia `develop` con `Closes #N` para vincular el issue.
5. Solicitar review antes de mergear.

> ⚠️ No pushear directo a `develop` ni a `main`. Siempre por Pull Request.

---

## Estructura del proyecto

```
ifts29-portal/
├── app/                        # Rutas de Next.js (App Router)
│   ├── (payload)/              # Rutas internas de Payload CMS
│   ├── carreras/               # Listado y detalle de carreras
│   ├── institucional/          # Página institucional
│   ├── login/                  # Página de login
│   ├── noticias/               # Listado y detalle de noticias
│   ├── portal/                 # Dashboard y biblioteca privada
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Landing principal
│   └── globals.css             # Estilos globales + Tailwind
├── src/
│   ├── access.ts               # Políticas de acceso RBAC
│   ├── collections/            # Definiciones de colecciones Payload
│   ├── components/             # Componentes React del sitio
│   ├── data/                   # Datos por defecto / fallbacks
│   ├── fields/                 # Campos reutilizables (slug, etc.)
│   ├── globals/                # Definiciones de globals Payload
│   ├── lib/                    # Utilidades (auth, content, payload client)
│   └── types/                  # Tipos TypeScript de la aplicación
├── payload.config.ts           # Configuración central de Payload CMS
├── next.config.ts              # Configuración de Next.js
└── package.json
```

---

## Equipo

Proyecto desarrollado por el equipo de alumnos de **IFTS N.° 29** — Práctica Profesionalizante IV — 2026.

---

## Licencia

MIT
