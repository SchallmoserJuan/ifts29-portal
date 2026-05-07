# Documentación de Schemas — PayloadCMS

## 1. Descripción general del sistema

### 1.1. Propósito y alcance

Este documento describe los tipos de contenido definidos en el CMS del portal institucional del IFTS 29, incluyendo **8 collections** y **2 globals**. Se detallan configuración administrativa, campos, tipos, validaciones, relaciones y reglas de acceso para cada entidad.

| Componente | Cantidad | Slugs |
|-----------|----------|-------|
| Collections | 8 | `users`, `media`, `careers`, `news`, `documents`, `events`, `projects`, `companies` |
| Globals | 2 | `site-settings`, `institutional-content` |

### 1.2. Metodología de documentación

- Los valores documentados se extraen directamente del código fuente (`src/collections/`, `src/globals/`, `src/access.ts`).
- Las opciones de select se listan como `valor → etiqueta`, donde **valor** es lo que se almacena y **etiqueta** es lo que se muestra en el admin panel.
- Los campos autogenerados por Payload (ej. `id`, `createdAt`, `updatedAt`) no se documentan salvo que tengan configuración especial.

### 1.3. Convenciones

**Roles de usuario:**

| Valor | Etiqueta | Permisos generales |
|-------|----------|-------------------|
| `admin` | Administrador | Acceso total |
| `teacher` | Profesor | Gestión de contenido, acceso al admin panel |
| `student` | Alumno | Lectura de contenido publicado, actualización de su propio perfil |

**Estados de publicación:**

| Valor | Etiqueta | Uso |
|-------|----------|-----|
| `draft` | Borrador | Solo visible para staff |
| `published` | Publicado | Visible públicamente (según reglas de acceso de cada collection) |

**Editor de texto enriquecido:** Todos los campos `richText` utilizan **Lexical** (`@payloadcms/richtext-lexical`).

**Almacenamiento:** Las collections con upload (`media`, `documents`) utilizan **Vercel Blob Storage** cuando la variable `BLOB_READ_WRITE_TOKEN` está configurada.

**Base de datos:** SQLite (`@payloadcms/db-sqlite`) en `file:./ifts29.db`.

---

# 2. Collections

## 2.1. Users

Colección de usuarios autenticados del sistema con control de acceso basado en roles.

### 2.1.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `users` |
| Autenticación | Habilitada (`auth`) |
| Expiración de token | 8 horas (28800 s) |
| Intentos de login | 5 |
| Tiempo de bloqueo | 10 minutos (600000 ms) |
| Campo principal en admin | `email` |
| Columnas por defecto | `firstName`, `lastName`, `email`, `role` |

### 2.1.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| admin | `canAccessAdmin` | Solo administradores y profesores |
| create | `allowFirstUserOrAdmin` | Primer usuario (bootstrap) o administradores |
| read | `selfOrAdminRead` | Registro propio o administradores |
| update | `selfOrAdminUpdate` | Registro propio o administradores |
| delete | `canManageUsers` | Solo administradores |
| unlock | `canManageUsers` | Solo administradores |

### 2.1.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| firstName | — | text | Sí | — | |
| lastName | — | text | Sí | — | |
| email | — | email | Sí | — | Gestionado por el sistema de autenticación |
| role | — | select | Sí | `student` | Ver opciones abajo |
| career | Carrera | relationship | No | — | Relación muchos-a-uno con `careers`. Condicional: visible solo cuando `role === 'student'` |

**Opciones de `role`:**

- `admin` → Administrador
- `teacher` → Profesor
- `student` → Alumno

### 2.1.4. Configuración especial

**Campo condicional `career`:**

```ts
admin: {
  condition: (_, siblingData) => siblingData?.role === 'student'
}
```

El campo `career` solo se muestra en el panel administrativo cuando el rol del usuario es `student`.

### 2.1.5. Notas técnicas

- El campo `email` es gestionado automáticamente por el sistema de autenticación de Payload.
- Se implementa control de acceso granular mediante funciones externas definidas en `src/access.ts`.
- Se aplica seguridad adicional con limitación de intentos de login y bloqueo temporal.

---

## 2.2. Careers

Colección de carreras académicas con información institucional, requisitos y plan de estudios.

### 2.2.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `careers` |
| Campo principal en admin | `name` |
| Columnas por defecto | `name`, `status`, `duration`, `modality` |

### 2.2.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publishedOnlyOrStaff` | Publicado para todos; staff ve borradores |
| create | `canManageContent` | Solo staff (admin y profesor) |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.2.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| name | Nombre | text | Sí | — | |
| slug | — | text | No | Autogenerado | Generado desde `name` mediante `slugField('name')`. Único, indexado, posición sidebar |
| status | Estado | select | Sí | `draft` | Ver opciones abajo |
| summary | Resumen | textarea | Sí | — | |
| duration | Duracion | text | Sí | — | |
| modality | Modalidad | text | Sí | — | |
| requirements | Requisitos | array | No | — | Sub-campo: `item` (text, requerido) |
| studyPlan | Plan de estudio | array | No | — | Sub-campo: `subject` (text, requerido) |
| graduateProfile | Perfil del egresado | richText | No | — | Editor Lexical |

**Opciones de `status`:**

- `draft` → Borrador
- `published` → Publicado

### 2.2.4. Configuración especial

**Slug automático:**

```ts
slugField('name')
```

Se genera automáticamente desde el campo `name`. Ubicado en el sidebar del admin panel. Descripción: *"Se genera automaticamente desde el titulo o nombre. Solo editar si hace falta."*

**Campos tipo array:**

- `requirements`: lista dinámica de requisitos de ingreso. Cada item contiene un campo `item` (text, requerido).
- `studyPlan`: lista dinámica de materias. Cada item contiene un campo `subject` (text, requerido).

### 2.2.5. Notas técnicas

- El slug se normaliza: convierte caracteres Unicode/diacríticos, pasa a minúsculas, reemplaza caracteres no alfanuméricos con `-`.
- El campo `graduateProfile` soporta contenido enriquecido mediante el editor Lexical.

---

## 2.3. News

Colección de noticias institucionales y académicas publicadas en el sistema.

### 2.3.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `news` |
| Campo principal en admin | `title` |
| Columnas por defecto | `title`, `category`, `status`, `publishedAt` |

### 2.3.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publishedOnlyOrStaff` | Publicado para todos; staff ve borradores |
| create | `canManageContent` | Solo staff |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.3.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| title | Titulo | text | Sí | — | |
| slug | — | text | No | Autogenerado | `slugField('title')`, sidebar |
| status | Estado | select | Sí | `draft` | Ver opciones abajo |
| category | Categoria | select | Sí | `general` | Ver opciones abajo |
| summary | Resumen | textarea | Sí | — | |
| publishedAt | Fecha de publicacion | date | No | `() => new Date().toISOString()` | Selector: `dayOnly` |
| featured | Destacada | checkbox | No | `false` | |
| tags | Tags | text | No | — | Separados por punto y coma (`;`) |
| heroImage | Imagen principal | relationship | No | — | Relación con `media` |
| author | Autor | relationship | No | — | Relación con `users` |
| content | Contenido | richText | No | — | Editor Lexical |

**Opciones de `status`:**

- `draft` → Borrador
- `published` → Publicado

**Opciones de `category`:**

- `general` → General
- `academic` → Academica
- `institutional` → Institucional
- `events` → Eventos

### 2.3.4. Configuración especial

**Slug automático:**

```ts
slugField('title')
```

**Campo `publishedAt`:**

```ts
defaultValue: () => new Date().toISOString()
```

El selector de fecha utiliza formato diario (`pickerAppearance: 'dayOnly'`).

**Campo `tags`:**

Las etiquetas se almacenan en un campo de texto y deben separarse mediante punto y coma (`;`). Ejemplo: `evento;inscripciones;academico`.

**Relaciones:**

| Campo | Collection referenciada |
|-------|------------------------|
| heroImage | `media` |
| author | `users` |

### 2.3.5. Notas técnicas

- El contenido publicado puede visualizarse públicamente; los borradores solo son accesibles para staff.
- El campo `category` utiliza los valores `academic` e `institutional` sin tildes en el valor almacenado (las etiquetas visibles son "Academica" e "Institucional" respectivamente).
- `content` soporta contenido enriquecido mediante el editor Lexical.
- `heroImage` permite asociar archivos multimedia desde la colección `media`.

---

## 2.4. Documents

Colección de documentos descargables con control de visibilidad y soporte para archivos PDF y Word.

### 2.4.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `documents` |
| Campo principal en admin | `title` |
| Columnas por defecto | `title`, `category`, `visibility`, `updatedAt` |
| Descripción admin | *"Para crear un documento tenes que completar titulo, descripcion y adjuntar un archivo."* |

### 2.4.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `documentReadAccess` | Acceso según visibilidad: staff ve todo; alumnos ven `public` y `students`; anónimos solo `public` |
| create | `canManageContent` | Solo staff |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.4.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| title | Titulo | text | Sí | — | |
| description | Descripcion | textarea | Sí | — | |
| category | Categoria | select | Sí | `biblioteca` | Ver opciones abajo |
| visibility | Visibilidad | select | Sí | `students` | Ver opciones abajo |
| career | Carrera relacionada | relationship | No | — | Relación con `careers` |

**Opciones de `category`:**

- `biblioteca` → Biblioteca
- `guias` → Guias
- `normativas` → Normativas
- `empleo` → Bolsa de empleo

**Opciones de `visibility`:**

- `public` → Publico
- `students` → Solo alumnos
- `staff` → Solo staff

### 2.4.4. Configuración especial

**Upload:**

La colección utiliza el sistema de uploads integrado de PayloadCMS.

| Tipo | MIME Type |
|------|-----------|
| PDF | `application/pdf` |
| DOC | `application/msword` |
| DOCX | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |

**Relaciones:**

| Campo | Collection referenciada |
|-------|------------------------|
| career | `careers` |

### 2.4.5. Notas técnicas

- La colección implementa control de acceso personalizado mediante la función `documentReadAccess`, que filtra según el valor del campo `visibility`.
- Los archivos se almacenan mediante el sistema de uploads nativo de PayloadCMS con respaldo en Vercel Blob Storage.
- Se admiten documentos PDF y archivos Microsoft Word (DOC/DOCX).

---

## 2.5. Media

Colección encargada de la gestión de imágenes y archivos multimedia del sistema.

### 2.5.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `media` |
| Campo principal en admin | `alt` |

### 2.5.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publicRead` | Acceso público sin restricciones |
| create | `canManageContent` | Solo staff |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.5.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| alt | — | text | Sí | — | Texto alternativo de la imagen |

Nota: Los campos de archivo (`filename`, `url`, `thumbnailURL`, etc.) son gestionados automáticamente por PayloadCMS mediante el sistema de uploads.

### 2.5.4. Configuración especial

**Upload de imágenes:**

| Propiedad | Valor |
|-----------|-------|
| MIME types | `['image/*']` |
| Almacenamiento | Vercel Blob Storage (si `BLOB_READ_WRITE_TOKEN` está configurado) |

**Tamaños de imagen:**

| Nombre | Ancho | Alto | Posición |
|--------|-------|------|----------|
| card | 960 | 640 | centre |

```ts
{
  name: 'card',
  width: 960,
  height: 640,
  position: 'centre',
}
```

### 2.5.5. Notas técnicas

- La colección centraliza la gestión multimedia del sistema.
- Las imágenes pueden reutilizarse desde otras collections mediante relaciones (`news.heroImage`, `events.image`, `projects.image`, `companies.logo`).
- El tamaño `card` permite generar versiones optimizadas para tarjetas y vistas previas.
- El acceso de lectura es público sin restricciones.
- Solo se aceptan archivos de imagen (`image/*`).

---

## 2.6. Events

Colección de eventos institucionales con fecha, ubicación y soporte para modalidades presenciales e híbridas.

### 2.6.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `events` |
| Campo principal en admin | `title` |
| Columnas por defecto | `title`, `date`, `location`, `status` |

### 2.6.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publishedOnlyOrStaff` | Publicado para todos; staff ve borradores |
| create | `canManageContent` | Solo staff |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.6.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| title | Titulo | text | Sí | — | |
| slug | — | text | No | Autogenerado | `slugField('title')`, sidebar |
| status | Estado | select | Sí | `draft` | Ver opciones abajo |
| date | Fecha y hora | date | Sí | — | Selector: `dayAndTime` |
| description | Descripcion | textarea | Sí | — | |
| location | Ubicacion | select | No | `presencial` | Ver opciones abajo |
| address | Direccion | text | No | — | |
| link | Link de registro/info | text | No | — | |
| image | Imagen | relationship | No | — | Relación con `media` |

**Opciones de `status`:**

- `draft` → Borrador
- `published` → Publicado

**Opciones de `location`:**

- `presencial` → Presencial
- `virtual` → Virtual
- `hibrido` → Hibrido

### 2.6.4. Configuración especial

**Slug automático:**

```ts
slugField('title')
```

**Relaciones:**

| Campo | Collection referenciada |
|-------|------------------------|
| image | `media` |

### 2.6.5. Notas técnicas

- El campo `date` utiliza selector de fecha y hora (`dayAndTime`), a diferencia de `publishedAt` en News/Projects que solo muestra día.
- El campo `location` permite especificar modalidad del evento (presencial, virtual o híbrido).
- `address` es relevante para eventos presenciales; `link` para eventos virtuales o con registro online.

---

## 2.7. Projects

Colección de proyectos académicos y técnicos desarrollados en la institución.

### 2.7.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `projects` |
| Campo principal en admin | `title` |
| Columnas por defecto | `title`, `category`, `status`, `publishedAt` |

### 2.7.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publishedOnlyOrStaff` | Publicado para todos; staff ve borradores |
| create | `canManageContent` | Solo staff |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.7.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| title | Titulo | text | Sí | — | |
| slug | — | text | No | Autogenerado | `slugField('title')`, sidebar |
| status | Estado | select | Sí | `draft` | Ver opciones abajo |
| category | Categoria | select | Sí | `desarrollo` | Ver opciones abajo |
| summary | Resumen | textarea | Sí | — | |
| publishedAt | Fecha de publicacion | date | No | `() => new Date().toISOString()` | |
| tags | Tags | text | No | — | Separados por punto y coma (`;`) |
| image | Imagen | relationship | No | — | Relación con `media` |
| content | Contenido | richText | No | — | Editor Lexical |

**Opciones de `status`:**

- `draft` → Borrador
- `published` → Publicado

**Opciones de `category`:**

- `desarrollo` → Desarrollo de Software
- `analisis` → Analisis de Sistemas
- `infraestructura` → Infraestructura
- `datos` → Datos

### 2.7.4. Configuración especial

**Slug automático:**

```ts
slugField('title')
```

**Campo `publishedAt`:**

```ts
defaultValue: () => new Date().toISOString()
```

**Campo `tags`:**

Las etiquetas se almacenan en un campo de texto y deben separarse mediante punto y coma (`;`). Ejemplo: `proyecto;desarrollo;front-end`.

**Relaciones:**

| Campo | Collection referenciada |
|-------|------------------------|
| image | `media` |

### 2.7.5. Notas técnicas

- La estructura de campos es similar a News, pero con categorías específicas de proyectos académicos.
- El campo `category` clasifica proyectos por área disciplinaria.
- `content` soporta contenido enriquecido mediante el editor Lexical.

---

## 2.8. Companies

Colección de empresas vinculadas a la institución para prácticas profesionales y convenios.

### 2.8.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `companies` |
| Campo principal en admin | `name` |
| Columnas por defecto | `name`, `practicesArea`, `status` |

### 2.8.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publishedOnlyOrStaff` | Publicado para todos; staff ve borradores |
| create | `canManageContent` | Solo staff |
| update | `canManageContent` | Solo staff |
| delete | `canDeleteContent` | Solo staff |

### 2.8.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| name | Nombre de la empresa | text | Sí | — | |
| status | Estado | select | Sí | `active` | Ver opciones abajo |
| logo | Logo | relationship | No | — | Relación con `media` |
| description | Descripcion | textarea | Sí | — | |
| practicesArea | Area de practicas | text | Sí | — | |
| website | Sitio web | text | No | — | |
| contactEmail | Email de contacto | text | No | — | |

**Opciones de `status`:**

- `active` → Activo
- `inactive` → Inactivo

### 2.8.4. Configuración especial

**Relaciones:**

| Campo | Collection referenciada |
|-------|------------------------|
| logo | `media` |

### 2.8.5. Notas técnicas

- A diferencia de las demás collections de contenido, **Companies no tiene campo `slug`** ni utiliza `slugField`.
- El campo `status` funciona como indicador de actividad de la empresa, no como estado de publicación (no usa `draft`/`published`).
- Es la única collection de contenido con un campo `status` basado en `active`/`inactive`.

---

# 3. Globals

## 3.1. SiteSettings

Global de configuración general del sitio con datos institucionales de contacto y presentación.

### 3.1.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `site-settings` |
| Label | Configuracion del sitio |

### 3.1.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publicRead` | Acceso público sin restricciones |
| update | `canManageUsers` | Solo administradores |

### 3.1.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| siteTitle | Titulo del sitio | text | No | `'Portal IFTS 29'` | |
| tagline | Bajada institucional | textarea | No | `'Portal institucional del IFTS 29...'` | |
| contactEmail | Email de contacto | email | No | — | |
| address | Direccion | text | No | — | |
| phone | Telefono | text | No | — | |

### 3.1.4. Notas técnicas

- Los valores por defecto se utilizan como fallback cuando Payload no responde (definidos en `src/data/defaults.ts`).
- Solo los administradores pueden modificar la configuración del sitio.
- La lectura es pública: cualquier visitante puede obtener los datos del sitio.

---

## 3.2. InstitutionalContent

Global de contenido institucional con historia, misión, visión y autoridades de la institución.

### 3.2.1. Configuración general

| Propiedad | Valor |
|-----------|-------|
| Slug | `institutional-content` |
| Label | Contenido institucional |

### 3.2.2. Control de acceso

| Acción | Función | Descripción |
|--------|---------|-------------|
| read | `publicRead` | Acceso público sin restricciones |
| update | `canManageUsers` | Solo administradores |

### 3.2.3. Campos

| Nombre | Label | Tipo | Requerido | Valor por defecto | Notas |
|--------|-------|------|-----------|-------------------|-------|
| history | Historia | richText | No | — | Editor Lexical |
| mission | Mision | textarea | No | — | |
| vision | Vision | textarea | No | — | |
| authorities | Autoridades | array | No | — | Ver sub-campos abajo |

**Sub-campos de `authorities`:**

| Nombre | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| name | text | Sí | Nombre de la autoridad |
| role | text | Sí | Cargo de la autoridad |

### 3.2.4. Notas técnicas

- El campo `history` soporta contenido enriquecido mediante el editor Lexical.
- `authorities` es un array dinámico donde cada item requiere nombre y cargo.
- Los valores por defecto se preservan en `src/data/defaults.ts` y se usan como fallback.
- Solo los administradores pueden modificar el contenido institucional.

---

# 4. Anexo: Funciones de control de acceso

## 4.1. Funciones auxiliares

| Función | Tipo | Lógica |
|---------|------|--------|
| `isAdmin(user)` | Helper | `user.role === 'admin'` |
| `isTeacher(user)` | Helper | `user.role === 'teacher'` |
| `isStudent(user)` | Helper | `user.role === 'student'` |
| `isStaff(user)` | Helper | `isAdmin(user) \|\| isTeacher(user)` |

## 4.2. Funciones de acceso

| Función | Lógica | Descripción |
|---------|--------|-------------|
| `canAccessAdmin` | `isStaff(user)` | Admin y profesor pueden acceder al panel |
| `canManageUsers` | `isAdmin(user)` | Solo admin puede gestionar usuarios |
| `canManageContent` | `isStaff(user)` | Admin y profesor pueden crear/editar contenido |
| `canDeleteContent` | `isStaff(user)` | Admin y profesor pueden eliminar contenido |
| `publicRead` | `true` | Acceso público sin restricciones |
| `publishedOnlyOrStaff` | Staff ve todo; otros solo `{status: {equals: 'published'}}` | Contenido publicado para todos; borradores solo para staff |
| `documentReadAccess` | Staff: todo; Alumno: `{visibility: {in: ['public', 'students']}}`; Otros: `{visibility: {equals: 'public'}}` | Acceso escalonado según visibilidad |
| `selfOrAdminRead` | Admin ve todo; otros solo `{id: {equals: user.id}}` | Lectura del registro propio o admin |
| `selfOrAdminUpdate` | Admin ve todo; otros solo `{id: {equals: user.id}}` | Actualización del registro propio o admin |
| `allowFirstUserOrAdmin` | Admin siempre; si no hay usuarios, cualquiera | Permite crear el primer usuario (bootstrap) o permite a admins crear nuevos |

## 4.3. Matriz de permisos por rol

| Collection / Global | Admin | Profesor | Alumno | Anónimo |
|---------------------|-------|----------|--------|----------|
| **Users** | CRUD completo | Lectura propia | Lectura/edición propia | — |
| **Media** | CRUD completo | CRUD completo | Solo lectura | Solo lectura |
| **Careers** | CRUD completo | CRUD ± lectura drafts | Solo publicados | Solo publicados |
| **News** | CRUD completo | CRUD ± lectura drafts | Solo publicados | Solo publicados |
| **Documents** | CRUD completo | CRUD + todo docs | Solo `public` + `students` | Solo `public` |
| **Events** | CRUD completo | CRUD ± lectura drafts | Solo publicados | Solo publicados |
| **Projects** | CRUD completo | CRUD ± lectura drafts | Solo publicados | Solo publicados |
| **Companies** | CRUD completo | CRUD ± lectura drafts | Solo publicados | Solo publicados |
| **SiteSettings** | Editar + leer | Solo leer | Solo leer | Solo leer |
| **InstitutionalContent** | Editar + leer | Solo leer | Solo leer | Solo leer |

> **Nota:** "CRUD ± lectura drafts" significa Create, Read (incluyendo borradores), Update, Delete.

## 4.4. Mapa de relaciones entre collections

```
users.career      ──→ careers  (condicional: solo si role === 'student')
news.heroImage    ──→ media
news.author       ──→ users
documents.career  ──→ careers
events.image      ──→ media
projects.image   ──→ media
companies.logo   ──→ media
```