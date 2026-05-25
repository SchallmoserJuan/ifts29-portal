# Portal Institucional — IFTS N°29

Sistema web institucional de alto rendimiento para el IFTS N°29, desarrollado con arquitectura Headless CMS. Centraliza la oferta académica, noticias y comunicación institucional en una plataforma moderna y autogestionable.

> **Estado actual:** En desarrollo — Cuatrimestre 1, 2026  
> **Equipo:** Grupo 11 — Práctica Profesionalizante IV

## Navegación de la wiki

| Página | Descripción |
|--------|--------------|
| [Flujo de trabajo](./flujo-de-trabajo) | Cómo trabajar con ramas, commits, PRs e issues |
| [Arquitectura del sistema](./arquitectura) | Stack tecnológico y decisiones de diseño |
| [Schemas de Payload](./schemas) | Modelos de datos del CMS |
| [Módulos del sistema](./modulos) | Descripción funcional de cada sección |
| [Equipo y roles](./equipo) | Integrantes y responsabilidades |
| [Configuración local](./configuracion-local) | Cómo correr el proyecto en tu máquina |

## Arquitectura del sistema

El proyecto usa una arquitectura **Headless CMS desacoplada**: el frontend consume datos del backend mediante el SDK de Payload, integrado en el mismo servidor Next.js.

```
┌─────────────────┐      Payload SDK       ┌─────────────────┐
│                 │ ◄────────────────────► │                 │
│   Next.js 14    │                        │  Payload CMS    │
│   (Frontend)    │                        │  (CMS / Admin)  │
│                 │                        │                 │
└────────┬────────┘                        └─────────────────┘
         │
         │  Deploy automático (CI/CD)
         ▼
┌─────────────────┐
│     Vercel       │
│   (Hosting)      │
└─────────────────┘
         ▲
         │  Control de versiones
┌─────────────────┐
│     GitHub       │
│  (Repositorio)  │
└─────────────────┘
```

### Stack tecnológico

| Capa | Tecnología | Propósito |
|------|-------------|-----------|
| Framework | Next.js 14 (App Router) | Renderizado SSG/ISR, rutas dinámicas |
| Estilos | Tailwind CSS | Diseño responsivo mobile-first |
| CMS | Payload CMS | Gestión de contenidos, panel admin |
| Base de datos | SQLite (Turso) | Almacenamiento local/remoto |
| Editor de texto | Lexical | Rich text enriquecido |
| Storage | Vercel Blob | Almacenamiento de archivos |
| Hosting | Vercel | Deploy continuo desde `develop` |
| Repositorio | GitHub | Control de versiones y PR reviews |
| Diseño | Figma | Wireframes y sistema de diseño |

### Guía para crear documentación en Payload

[Creación de Noticias](https://drive.google.com/file/d/1WACqgy_Yh9wZZY1R7nQpo64nF5BT_zHy/view?usp=drive_link)
[Creación de Carreras](https://drive.google.com/file/d/1-KvFlfl7S0hnfLrI6N18cg13Rm0fsa3U/view?usp=drive_link)
[Creación de Documentos](https://drive.google.com/file/d/14dfRqVEbI0iaPSkHjDvgHMeMpEJwzFWS/view?usp=drive_link)

### Decisiones de arquitectura

**¿Por qué Headless CMS?**

Separa el contenido del código. El personal del IFTS puede actualizar noticias y carreras desde Payload Admin sin tocar una línea de código ni depender del equipo de desarrollo.

**¿Por qué Payload CMS?**

Payload ofrece una experiencia de administrador integrada directamente en el mismo servidor Next.js, eliminación de costos de infraestructura adicional y control completo sobre la base de datos y código personalizado.

**¿Por qué Next.js con SSG/ISR?**

Las páginas se pre-renderizan en build time (SSG) o se revalidan automáticamente (ISR). Resultado: tiempos de carga bajo 2 segundos y mejor indexación en buscadores.

**¿Por qué Vercel?**

Integración nativa con Next.js y GitHub. Cada push a `develop` genera un preview deploy automático. Costo: $0 en el plan Free Tier.

## Colecciones de Payload

Las colecciones definidas en Payload CMS son las siguiente.

### `news`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `title` | text | Título del artículo |
| `slug` | slug | URL amigable generada desde el título |
| `status` | select | Estado: borrador o publicado |
| `category` | select | Categoría: general, académica, institucional, eventos |
| `summary` | textarea | Resumen corto del artículo |
| `publishedAt` | date | Fecha de publicación |
| `featured` | checkbox | Aparece en el home si está seleccionado |
| `tags` | text | Tags separados por punto y coma |
| `heroImage` | relationship | Relación con la colección media |
| `author` | relationship | Relación con usuarios |
| `content` | richText | Contenido enriched con Lexical |

### `careers`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `name` | text | Nombre completo de la tecnicatura |
| `slug` | slug | URL: `/carreras/[slug]` |
| `status` | select | Estado: borrador o publicado |
| `summary` | textarea | Resumen para la card de listado |
| `duration` | text | Ej: "2 años y medio" |
| `modality` | text | Modalidad de cursada |
| `requirements` | array | Requisitos de admisión |
| `studyPlan` | array | Materias agrupadas por cuatrimestre |
| `graduateProfile` | richText | Competencias del egresado |

### `users`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `email` | email | Correo electrónico único |
| `password` | password | Contraseña hasheada |
| `role` | select | Rol: admin, editor, viewer |
| `name` | text | Nombre completo |

### `media`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `filename` | upload | Archivo subido |
| `alt` | text | Texto alternativo |
| `caption` | text | Caption opcional |
| `width` | number | Ancho de imagen |
| `height` | number | Alto de imagen |

### `documents`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `title` | text | Nombre del documento |
| `file` | upload | Archivo PDF |
| `category` | select | Categoría del documento |
| `description` | textarea | Descripción opcional |

### `events`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `title` | text | Título del evento |
| `slug` | slug | URL amigable |
| `date` | date | Fecha del evento |
| `location` | text | Lugar del evento |
| `description` | textarea | Descripción |
| `status` | select | Estado |

### `projects`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `title` | text | Nombre del proyecto |
| `slug` | slug | URL amigable |
| `company` | relationship | Relación con companies |
| `description` | textarea | Descripción |
| `status` | select | Estado |
| `technologies` | array | Tecnologías utilizadas |

### `companies`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `name` | text | Nombre de la empresa |
| `logo` | relationship | Relación con media |
| `website` | text | URL del sitio web |

## Globals de Payload

### `site-settings`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `siteTitle` | text | Título del sitio |
| `siteDescription` | textarea | Descripción meta |
| `logo` | relationship | Logo principal |
| `favicon` | relationship | Favicon |
| `theme` | select | Tema: light, dark, system |
| `contactEmail` | email | Email de contacto |
| `socialLinks` | array | Links a redes sociales |

### `institutional-content`

| Campo | Tipo | Descripción |
|-------|------|--------------|
| `history` | richText | Historia de la institución |
| `mission` | richText | Misión institucional |
| `vision` | richText | Visión institucional |
| `values` | richText | Valores institucionales |
| `authorities` | array | Autoridades con cargo y foto |
| `contactInfo` | group | Información de contacto |

## Módulos del sistema

### MVP (entrega principal)

| Módulo | Ruta | Estado | Issue |
|--------|------|--------|-------|
| Home | `/` | 🟡 Pendiente | #5 |
| Oferta académica | `/carreras` | 🟡 Pendiente | #6 |
| Detalle de carrera | `/carreras/[slug]` | 🟡 Pendiente | #6 |
| Noticias | `/noticias` | 🟢 Realizado | #7 |
| Artículo | `/noticias/[slug]` | 🟢 Realizado | #7 |
| Sección institucional | `/institucional` | 🔲 Pendiente | #9 |
| Contacto | `/contacto` | 🔲 Pendiente | #10 |
| Panel CMS (admin) | `/admin` | 🟢 Realizado | #8 |

### Módulos futuros (post-MVP)

Estos módulos están en el Backlog con el label `mvp: no`. No se arrancan hasta que el MVP esté con QA aprobado.

- Bolsa de trabajo y prácticas
- Biblioteca virtual
- Foros de networking
- Casos de éxito / testimonios de egresados

## Equipo y roles

| Integrante | Rol | Responsabilidad principal |
|------------|------|------------------------|
| Juan José Barrios Schallmoser | Arquitecto de Software / Tech Lead | Arquitectura Next.js, schemas de Payload, CI/CD, merge final de PRs |
| Nahir Icare | Frontend Developer | Maquetación con Tailwind, diseño responsivo, sistema visual |
| Rodrigo Chico | Frontend Developer | Componentes dinámicos, lógica de navegación, integración con CMS |
| Alvaro Coronel | QA / Backend | Pruebas funcionales, auditoría de seguridad, validación de datos |
| Fabio Mora | Frontend / Documentación | Secciones institucionales, manual de usuario, informe técnico APA |

## Configuración del entorno local

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Git instalado
- Cuenta en Vercel (para ver los preview deploys)

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/SchallmoserJuan/ifts29-portal.git
cd ifts29-portal
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Completar `.env.local` con los valores por defecto. No commitear este archivo (ya está en `.gitignore`).

**4. Inicializar la base de datos**

```bash
npx payload migrate:create
```

**5. Correr el proyecto**

```bash
npm run dev
```

El sitio corre en `http://localhost:3000`. El panel admin está en `http://localhost:3000/admin`.

### Variables de entorno necesarias

```env
PAYLOAD_SECRET=desarrollo-super-seguro-cambiar-en-produccion
DATABASE_URL=file:./ifts29.db
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

## Convenciones del proyecto

### Commits

Seguimos el formato `tipo: descripción en minúsculas`:

```
feat: agregar listado de noticias con paginación
fix: corregir desbordamiento del nav en mobile
chore: actualizar dependencias de Next.js
docs: agregar esquema de carrera al diccionario de datos
```

### Ramas

- `main` — producción, solo recibe merges desde `develop`
- `develop` — integración, Vercel hace deploy automático desde acá
- `feat/nombre` — una por issue de feature, sale y vuelve a `develop`
- `fix/nombre` — igual que feat pero para bugs

Ver la página [Flujo de trabajo](./flujo-de-trabajo) para el proceso completo paso a paso.

### Pull Requests

- Todo cambio entra por PR, nunca directo a `develop` ni a `main`
- El PR debe referenciar el issue con `closes #N` en la descripción
- Requiere al menos una aprobación antes de mergear
- Juan José o Alvaro hacen el merge final

## Estructura del proyecto

```
ifts29-portal/
├── app/                    # Rutas de Next.js
│   ├── (payload)/       # Admin de Payload
│   ├── api/            # API routes
│   └── [...slug]/     # Páginas dinámicas
├── src/
│   ├── collections/   # Colecciones de Payload
│   ├── globals/       # Globals de Payload
│   ├── fields/       # Campos personalizados
│   ├── lib/          # Utilidades y SDK
│   ├── types/        # Tipos TypeScript
│   └── data/         # Datos por defecto
├── payload.config.ts  # Configuración de Payload
├── next.config.ts     # Configuración de Next.js
└── tailwind.config.ts # Configuración de Tailwind
```

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Iniciar producción |
| `npx payload migrate:create` | Crear migración |
| `npx payload migrate:generate` | Generar migración desde cambios |
| `npx payload migrate:push` | Aplicar migraciones |

## Links útiles del proyecto

| Recurso | Link |
|--------|------|
| Tablero Kanban | [GitHub Projects — Portal IFTS29](https://github.com/SchallmoserJuan/ifts29-portal/projects) |
| Wireframes | [Figma — Sistema de diseño](https://figma.com) |
| Preview deploy | [Vercel — develop](https://portal-ifts29.vercel.app) |
| Panel Admin | [Vercel — admin](https://portal-ifts29.vercel.app/admin) |
| Documento de etapa 2 | [PDF en repositorio](./docs/Etapa2_Grupo11.pdf) |

---

*Wiki mantenida por el Grupo 11 — Práctica Profesionalizante IV — IFTS N°29 — 2026*