#  Documentación de Schemas - PayloadCMS

##  Descripción

Este documento describe los tipos de contenido definidos en PayloadCMS, incluyendo collections y globals.  
Se detallan los campos, tipos, validaciones, relaciones y reglas de acceso.

---

# Collections

## Users

Colección de usuarios autenticados del sistema con control de acceso basado en roles.

###  Configuración general

- **Slug:** `users`
- **Autenticación:** habilitada (`auth`)
- **Campo principal en admin:** `email`
- **Columnas por defecto:** firstName, lastName, email, role

---

###  Autenticación

| Configuración        | Valor |
|---------------------|------|
| Expiración de token | 8 horas |
| Intentos de login   | 5 |
| Tiempo de bloqueo   | 10 minutos |

---

###  Control de acceso

| Acción   | Regla |
|----------|------|
| admin    | Solo administradores (`canAccessAdmin`) |
| create   | Primer usuario o admin (`allowFirstUserOrAdmin`) |
| read     | Usuario propio o admin (`selfOrAdminRead`) |
| update   | Usuario propio o admin (`selfOrAdminUpdate`) |
| delete   | Solo admin (`canManageUsers`) |
| unlock   | Solo admin (`canManageUsers`) |

---

###  Campos

| Campo      | Tipo          | Requerido | Descripción |
|------------|--------------|----------|-------------|
| firstName  | text         | Sí       | Nombre |
| lastName   | text         | Sí       | Apellido |
| email      | email        | Sí       | Email único (provisto por auth) |
| role       | select       | Sí       | Rol del usuario |
| career     | relationship | No       | Carrera asociada |

---

###  Opciones de `role`

- `admin` → Administrador  
- `teacher` → Profesor  
- `student` → Alumno (valor por defecto)

---

###  Lógica de interfaz (Admin UI)

El campo `career` solo se muestra cuando el rol es `student`:

```ts
condition: (_, siblingData) => siblingData?.role === 'student'

 Relaciones
career → Careers (muchos a uno)
 Validaciones
firstName obligatorio
lastName obligatorio
role obligatorio
email único (gestionado por Payload)
  Notas técnicas
El campo email es gestionado automáticamente por el sistema de autenticación de Payload.
Se implementa control de acceso granular mediante funciones externas.
Se aplica seguridad adicional con limitación de intentos de login.
##  Careers

Colección de carreras académicas con información institucional, requisitos y plan de estudios.

###  Configuración general

- **Slug:** `careers`
- **Campo principal en admin:** `name`
- **Columnas por defecto:** name, status, duration, modality

---

###  Control de acceso

| Acción | Regla |
|--------|------|
| read   | Solo contenido publicado o staff (`publishedOnlyOrStaff`) |
| create | Usuarios autorizados (`canManageContent`) |
| update | Usuarios autorizados (`canManageContent`) |
| delete | Usuarios autorizados (`canDeleteContent`) |

---

###  Campos

| Campo            | Tipo      | Requerido | Descripción |
|-----------------|----------|----------|-------------|
| name            | text     | Sí       | Nombre de la carrera |
| slug            | text     | Sí       | URL amigable autogenerada |
| status          | select   | Sí       | Estado de publicación |
| summary         | textarea | Sí       | Resumen de la carrera |
| duration        | text     | Sí       | Duración de la carrera |
| modality        | text     | Sí       | Modalidad de cursado |
| requirements    | array    | No       | Lista de requisitos |
| studyPlan       | array    | No       | Lista de materias |
| graduateProfile | richText | No       | Perfil del egresado |

---

###  Opciones de `status`

- `draft` → Borrador  
- `published` → Publicado

---

###  Slug automático

El campo `slug` se genera automáticamente a partir del campo `name` mediante:

```ts
slugField('name')
##  News

Colección de noticias institucionales y académicas publicadas en el sistema.

###  Configuración general

- **Slug:** `news`
- **Campo principal en admin:** `title`
- **Columnas por defecto:** title, category, status, publishedAt

---

###  Control de acceso

| Acción | Regla |
|--------|------|
| read   | Solo contenido publicado o staff (`publishedOnlyOrStaff`) |
| create | Usuarios autorizados (`canManageContent`) |
| update | Usuarios autorizados (`canManageContent`) |
| delete | Usuarios autorizados (`canDeleteContent`) |

---

###  Campos

| Campo        | Tipo          | Requerido | Descripción |
|-------------|--------------|----------|-------------|
| title       | text         | Sí       | Título de la noticia |
| slug        | text         | Sí       | URL amigable autogenerada |
| status      | select       | Sí       | Estado de publicación |
| category    | select       | Sí       | Categoría de la noticia |
| summary     | textarea     | Sí       | Resumen |
| publishedAt | date         | No       | Fecha de publicación |
| featured    | checkbox     | No       | Marca si la noticia es destacada |
| tags        | text         | No       | Etiquetas separadas por `;` |
| heroImage   | relationship | No       | Imagen principal |
| author      | relationship | No       | Autor de la noticia |
| content     | richText     | No       | Contenido enriquecido |

---

###  Opciones de `status`

- `draft` → Borrador  
- `published` → Publicado

---

###  Opciones de `category`

- `general` → General
- `academic` → Académica
- `institutional` → Institucional
- `events` → Eventos

---

###  Slug automático

El campo `slug` se genera automáticamente a partir del campo `title` mediante:

```ts
slugField('title')
 Configuración de publishedAt
Se asigna automáticamente la fecha actual:
defaultValue: () => new Date().toISOString()
El selector de fecha utiliza formato diario (dayOnly)
 Configuración de tags

Las etiquetas se almacenan en un campo de texto y deben separarse mediante punto y coma (;).

Ejemplo:

evento;inscripciones;academico
 Validaciones
title obligatorio
slug obligatorio
status obligatorio
category obligatorio
summary obligatorio
Relaciones
| Campo     | Relación |
| --------- | -------- |
| heroImage | Media    |
| author    | Users    |
Notas técnicas
La colección utiliza control de acceso basado en funciones externas.
El contenido publicado puede visualizarse públicamente.
Los borradores solo son accesibles para usuarios autorizados.
content utiliza richText para soportar contenido enriquecido.
heroImage permite asociar archivos multimedia desde la colección Media.
##  Documents

Colección de documentos descargables con control de visibilidad y soporte para archivos PDF y Word.

###  Configuración general

- **Slug:** `documents`
- **Campo principal en admin:** `title`
- **Columnas por defecto:** title, category, visibility, updatedAt

###  Descripción administrativa

```text
Para crear un documento tenes que completar titulo, descripcion y adjuntar un archivo.
Control de acceso
| Acción | Regla                                           |
| ------ | ----------------------------------------------- |
| read   | Acceso según visibilidad (`documentReadAccess`) |
| create | Usuarios autorizados (`canManageContent`)       |
| update | Usuarios autorizados (`canManageContent`)       |
| delete | Usuarios autorizados (`canDeleteContent`)       |
Campos
| Campo       | Tipo         | Requerido | Descripción             |
| ----------- | ------------ | --------- | ----------------------- |
| title       | text         | Sí        | Título del documento    |
| description | textarea     | Sí        | Descripción             |
| category    | select       | Sí        | Categoría del documento |
| visibility  | select       | Sí        | Nivel de acceso         |
| career      | relationship | No        | Carrera relacionada     |
Opciones de category
biblioteca → Biblioteca
guias → Guías
normativas → Normativas
empleo → Bolsa de empleo
Opciones de visibility
public → Público
students → Solo alumnos
staff → Solo staff
Configuración de archivos

La colección utiliza upload integrado de PayloadCMS.

 Tipos de archivo permitidos
 | Tipo | MIME Type                                                                 |
| ---- | ------------------------------------------------------------------------- |
| PDF  | `application/pdf`                                                         |
| DOC  | `application/msword`                                                      |
| DOCX | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
Validaciones
title obligatorio
description obligatorio
category obligatorio
visibility obligatorio
Relaciones
| Campo  | Relación |
| ------ | -------- |
| career | Careers  |
Notas técnicas
La colección implementa control de acceso personalizado mediante funciones externas.
El acceso de lectura depende del valor de visibility.
Los archivos se almacenan mediante el sistema de uploads nativo de PayloadCMS.
La colección admite documentos PDF y archivos Microsoft Word
##  Media

Colección encargada de la gestión de imágenes y archivos multimedia del sistema.

###  Configuración general

- **Slug:** `media`
- **Campo principal en admin:** `alt`

---

###  Control de acceso

| Acción | Regla |
|--------|------|
| read   | Público (`publicRead`) |
| create | Usuarios autorizados (`canManageContent`) |
| update | Usuarios autorizados (`canManageContent`) |
| delete | Usuarios autorizados (`canDeleteContent`) |

---

###  Campos

| Campo | Tipo | Requerido | Descripción |
|------|------|----------|-------------|
| alt  | text | Sí | Texto alternativo de la imagen |

---

###  Configuración de uploads

La colección utiliza el sistema de uploads integrado de PayloadCMS para almacenamiento de imágenes.

---

###  Tamaños de imagen

| Nombre | Resolución |
|--------|------------|
| card   | 960x640 |

Configuración:

```ts
{
  name: 'card',
  width: 960,
  height: 640,
  position: 'centre',
}

Tipos de archivo permitidos
mimeTypes: ['image/*']
Se permiten únicamente archivos de imagen.
Validaciones
alt obligatorio
Solo se aceptan imágenes
 Notas técnicas
La colección centraliza la gestión multimedia del sistema.
Las imágenes pueden reutilizarse desde otras collections mediante relaciones.
El tamaño card permite generar versiones optimizadas para tarjetas y vistas previas.
El acceso de lectura es público.