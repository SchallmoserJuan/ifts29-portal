#  Documentación de Schemas - PayloadCMS

##  Descripción

Este documento describe los tipos de contenido definidos en PayloadCMS, incluyendo collections y globals.  
Se detallan los campos, tipos, validaciones, relaciones y reglas de acceso.

---

#  Collections

##  Users

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
