<img width="1983" height="793" alt="image" src="https://github.com/user-attachments/assets/e1918f2d-4910-4b95-b524-65545e085d9f" />


# Portal IFTS 29

Portal institucional del Instituto de Formacion Tecnica Superior N 29, desarrollado como proyecto integrador de la carrera de Desarrollo de Software. Implementa una arquitectura Headless CMS que permite al personal de la institucion gestionar contenidos, carreras, noticias y eventos sin intervencion del equipo de desarrollo.

> **Proyecto:** Practica Profesionalizante IV — Grupo 11 — Cuatrimestre 1, 2026  
> **Deploy:** [portal-ifts29.vercel.app](https://portal-ifts29.vercel.app)  
> **Admin:** [portal-ifts29.vercel.app/admin](https://portal-ifts29.vercel.app/admin)

---

## Índice

- [Portal IFTS 29](#portal-ifts-29)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas principales](#rutas-principales)
  * [Rutas públicas](#rutas-públicas)
  * [Rutas privadas (requieren autenticación)](#rutas-privadas-requieren-autenticación)
  * [Panel de administración](#panel-de-administración)
- [Roles de usuario](#roles-de-usuario)
- [Modelo de datos](#modelo-de-datos)
  * [Colecciones (11)](#colecciones-11)
  * [Globales (3)](#globales-3)
- [Configuración inicial](#configuración-inicial)
  * [Requisitos previos](#requisitos-previos)
  * [Pasos](#pasos)
- [Documentación](#documentación)
- [Flujo de trabajo](#flujo-de-trabajo)
  * [Ramas](#ramas)
  * [Commits](#commits)
  * [Pull Requests](#pull-requests)
- [Equipo](#equipo)
- [Mantenimiento](#mantenimiento)
- [Licencia](#licencia)


---

## Stack tecnológico

| Capa | Tecnologia | Version | Proposito |
|------|------------|---------|-----------|
| Framework | Next.js | 16 | App Router, renderizado SSG/ISR |
| CMS | Payload CMS | 3 | Gestion de contenidos, panel admin |
| Base de datos | SQLite / Turso | — | Desarrollo local / produccion |
| ORM | Drizzle (via Payload) | — | Acceso tipado a base de datos |
| Editor | Lexical | — | Rich text enriquecido |
| Estilos | Tailwind CSS | 4 | Diseño responsivo mobile-first |
| Animaciones | Framer Motion | 12 | Transiciones y micro-interacciones |
| Iconos | Lucide React | 1 | Iconografia del sistema |
| Storage | Vercel Blob | — | Almacenamiento de archivos en produccion |
| Email | EmailJS | 4 | Formulario de contacto sin backend |
| Hosting | Vercel | — | Deploy continuo con previews automaticos |
| Repositorio | GitHub | — | Control de versiones y PR reviews |

---

## Arquitectura

El sistema sigue una arquitectura **Headless CMS desacoplada**:

El frontend publico y el panel de administracion comparten el mismo servidor Next.js. 

Payload CMS expone una API REST y GraphQL que el frontend consume mediante su SDK nativo. 

Las paginas publicas se pre-renderizan en tiempo de compilacion (SSG) y se revalidan bajo demanda (ISR), garantizando tiempos de carga inferiores a 2 segundos y una indexacion optima en buscadores.

```
Cliente (Navegador)
    |
    v
Next.js 16 (App Router)
    |-- /               Paginas publicas (SSG/ISR)
    |-- /admin          Panel Payload CMS (SPA)
    |-- /api            REST + GraphQL endpoints
    |
    v
Payload CMS 3
    |-- SQLite (desarrollo)
    |-- Turso (produccion)
    |-- Vercel Blob (archivos)
```

La separacion entre contenido y presentacion permite que el personal del IFTS actualice noticias, carreras, documentos y configuracion del sitio desde el panel `/admin` sin requerir conocimientos tecnicos ni asistencia del equipo de desarrollo.

---

## Estructura del proyecto

```
ifts29-portal/
├── app/                          # App Router de Next.js
│   ├── (payload)/               # Panel de administracion de Payload
│   ├── (site)/                  # Rutas publicas del portal
│   ├── (portal)/                # Rutas privadas (alumnos, docentes)
│   └── api/                     # Route handlers
├── src/
│   ├── collections/             # Colecciones de Payload (11)
│   ├── globals/                 # Globales de Payload (3)
│   ├── fields/                  # Campos personalizados
│   ├── components/              # Componentes React del frontend
│   ├── lib/                     # Utilidades, SDK de Payload, helpers
│   ├── scripts/                 # Scripts de seed y utilidades
│   └── payload-types.ts         # Tipos TypeScript autogenerados
├── docs/                        # Documentacion tecnica y de usuario
├── backup/                      # Backups de base de datos (local)
├── payload.config.ts            # Configuracion central de Payload
├── next.config.ts               # Configuracion de Next.js
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuracion de TypeScript
└── .env.example                 # Plantilla de variables de entorno
```

---

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar los valores requeridos.

```env
# Secreto de Payload — requerido, minimo 32 caracteres en produccion
PAYLOAD_SECRET=desarrollo-super-seguro-cambiar-en-produccion

# Base de datos — SQLite para desarrollo local
DATABASE_URL=file:./ifts29.db

# Base de datos — Turso para produccion
# DATABASE_URL=libsql://tu-database.turso.io
# DATABASE_AUTH_TOKEN=tu-token-aqui

# Storage — Vercel Blob (se genera al vincular Blob en el dashboard de Vercel)
# BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Admin — credenciales usadas por los scripts de seed
ADMIN_EMAIL=admin@ifts29.edu.ar
ADMIN_PASSWORD=

# Analytics — Google Analytics 4 (Measurement ID)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Email — EmailJS para formulario de contacto
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID_REPLY=
EMAILJS_TEMPLATE_ID_NOTIFICATION=
```

> **Importante:** `.env.local` esta en `.gitignore`. Nunca commitear variables de entorno
> reales al repositorio. En produccion, las variables se configuran en Vercel Dashboard.

---

## Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `bun run dev` | Iniciar servidor de desarrollo (Next.js + Payload) |
| `bun run build` | Build de produccion (usa `--webpack`) |
| `bun run start` | Iniciar servidor en modo produccion |
| `bun run lint` | Ejecutar ESLint en todo el proyecto |
| `bun run generate:types` | Regenerar `src/payload-types.ts` desde los schemas |
| `bun run seed:career` | Sembrar la carrera de ejemplo |
| `bun run seed:all` | Sembrar todos los datos de prueba |
| `bun run seed:users` | Sembrar usuarios de prueba |
| `bun run seed:becas` | Sembrar datos de becas |

> **Nota sobre el gestor de paquetes:** Para instalar dependencias se utiliza `pnpm install`
> (Vercel lee `pnpm-lock.yaml`). `bun` se emplea exclusivamente como runtime para ejecutar
> scripts. No usar `bun install`.

---

## Rutas principales

## Rutas públicas

| Ruta | Contenido |
|------|-----------|
| `/` | Pagina de inicio |
| `/institucional` | Historia, mision, vision y autoridades |
| `/carreras` | Oferta academica |
| `/carreras/[slug]` | Detalle de una carrera |
| `/noticias` | Listado de noticias |
| `/noticias/[slug]` | Articulo completo |
| `/contacto` | Formulario de contacto |
| `/login` | Inicio de sesion |

### Rutas privadas (requieren autenticación)

| Ruta | Acceso |
|------|--------|
| `/portal` | Dashboard segun rol |
| `/portal/biblioteca` | Biblioteca virtual — estudiantes y docentes |

### Panel de administración

| Ruta | Acceso |
|------|--------|
| `/admin` | Panel de Payload CMS — solo administradores |

---

## Roles de usuario

| Rol | Permisos |
|-----|----------|
| `admin` | Acceso total al CMS. Gestion de usuarios, contenidos, colecciones, configuracion del sitio. |
| `teacher` | Edicion de contenido academico y noticias. Acceso a documentos y biblioteca. |
| `student` | Acceso a biblioteca virtual y contenidos privados. Sin acceso al CMS. |

La administracion de usuarios se realiza desde `/admin` (coleccion Users).

---

## Modelo de datos

### Colecciones (11)

| Coleccion | Descripcion |
|-----------|-------------|
| Users | Usuarios del sistema con roles (admin, teacher, student) |
| Media | Imagenes y archivos multimedia |
| Careers | Tecnicaturas con plan de estudios y perfil de egreso |
| News | Noticias y articulos con contenido enriquecido |
| Documents | Archivos PDF (reglamentos, resoluciones, formularios) |
| Events | Eventos institucionales con fecha y ubicacion |
| Projects | Proyectos de practica profesionalizante |
| Companies | Empresas vinculadas a los proyectos |
| Contacts | Mensajes recibidos desde el formulario de contacto |
| Notifications | Notificaciones del sistema |
| Scholarships | Becas disponibles para estudiantes |

### Globales (3)

| Global | Descripcion |
|--------|-------------|
| SiteSettings | Configuracion del sitio: titulo, logo, favicon, tema, redes sociales |
| InstitutionalContent | Contenido institucional: historia, mision, vision, valores, autoridades |
| BecasPage | Contenido editable de la pagina de becas |

La documentacion detallada de cada coleccion y sus campos se encuentra en
[docs/wiki.md](docs/wiki.md) y [docs/schemas.md](docs/schemas.md).

---

## Configuración inicial

### Requisitos previos

- Node.js 18 o superior
- pnpm 9 o superior (para instalar dependencias)
- Git

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/SchallmoserJuan/ifts29-portal.git
cd ifts29-portal
```

**2. Instalar dependencias**

```bash
pnpm install
```

**3. Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Editar `.env.local` y completar al menos `PAYLOAD_SECRET` y `DATABASE_URL`.

**4. Iniciar el servidor de desarrollo**

```bash
bun run dev
```

El sitio estara disponible en `http://localhost:3000` y el panel de administracion en `http://localhost:3000/admin`.

**5. Crear el primer usuario administrador**

Acceder a `/admin` y completar el formulario de registro inicial. 
Luego, opcionalmente, ejecutar los scripts de seed para poblar la base de datos con contenido de ejemplo:

```bash
bun run seed:all
```

---

## Documentación

| Documento | Descripcion |
|-----------|-------------|
| [Wiki del proyecto](docs/wiki.md) | Arquitectura, modulos, flujo de trabajo, equipo y configuracion |
| [Schemas de Payload](docs/schemas.md) | Diccionario de datos completo de colecciones y globales |
| [Plan de mantenimiento](docs/maintenance.md) | Actualizaciones, backups, monitoreo, seguridad y evolutivos |
| [Manual de usuario del CMS](docs/manual-usuario-cms.pdf) | Guia paso a paso para gestion de contenidos |
| [Diagramas del sistema](docs/Diagramas.pdf) | Casos de uso, clases, secuencia, actividades, estados, componentes, despliegue, entidad-relacion |
| [Informe tecnico final](docs/InformeTecnicoFinal_IFTS29.pdf) | Documentacion academica completa del proyecto |

---

## Flujo de trabajo

### Ramas

| Rama | Proposito |
|------|-----------|
| `main` | Produccion. Solo recibe merges desde `develop`. |
| `develop` | Integracion. Vercel genera deploy preview automatico. |
| `feat/nombre` | Nueva funcionalidad. Sale y vuelve a `develop`. |
| `fix/nombre` | Correccion de errores. Sale y vuelve a `develop`. |
| `chore/nombre` | Mantenimiento y actualizaciones. |
| `docs/nombre` | Cambios en documentacion. |

### Commits

Se sigue el formato `tipo: descripcion en minusculas`:

```
feat: agregar listado de noticias con paginacion
fix: corregir desbordamiento del nav en mobile
chore: actualizar payload a v3.88.0
docs: agregar procedimiento de backup a maintenance.md
```

### Pull Requests

Todo cambio ingresa mediante Pull Request. El flujo es:

1. Crear branch desde `develop` (`feat/nombre` o `fix/nombre`)
2. Desarrollar y commitear siguiendo las convenciones
3. Ejecutar `bun run build` y `bun run lint` en local
4. Push y crear PR contra `develop`
5. El PR debe referenciar el issue con `closes #N`
6. Requiere al menos una aprobacion antes del merge
7. Una vez mergeado a `develop`, Vercel genera deploy preview automatico
8. Verificado el preview, mergear `develop` a `main` para deploy a produccion

---

## Equipo

| Integrante | Rol | Responsabilidad |
|------------|-----|----------------|
| Juan Jose Barrios Schallmoser | Arquitecto de Software / Tech Lead | Arquitectura Next.js, schemas de Payload, CI/CD, merge final de PRs |
| Nahir Icare | Frontend Developer | Maquetacion con Tailwind, diseño responsivo, sistema visual |
| Rodrigo Chico | Frontend Developer | Componentes dinamicos, logica de navegacion, integracion con CMS |
| Alvaro Coronel | QA / Backend | Pruebas funcionales, auditoria de seguridad, validacion de datos |
| Fabio Mora | Frontend / Documentacion | Secciones institucionales, manual de usuario, informe tecnico |

---

## Mantenimiento

El plan de mantenimiento del portal se encuentra documentado en
[docs/maintenance.md](docs/maintenance.md). Cubre los siguientes aspectos:

- Actualizacion de dependencias (frecuencia trimestral)
- Backup de base de datos (mensual y pre-deploy)
- Monitoreo de errores (Vercel Runtime Logs y alertas)
- Seguridad (rotacion de secrets, auditoria de credenciales)
- Checklist pre-deploy
- Procedimiento para requerimientos evolutivos

---

## Licencia

Este proyecto es propiedad del Instituto de Formacion Tecnica Superior N 29.
Desarrollado como proyecto academico de la carrera de Desarrollo de Software.

---

*IFTS N 29 — Practica Profesionalizante IV — Grupo 11 — 2026*
