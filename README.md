# Portal IFTS 29

Portal institucional del IFTS 29 construido con `Next.js` y `Payload CMS`.

## Stack

- `Next.js 16`
- `Payload CMS 3`
- `SQLite` para desarrollo local
- `Tailwind CSS 4`

## Variables de entorno

Crear `.env.local` a partir de este ejemplo:

```env
PAYLOAD_SECRET=desarrollo-super-seguro-cambiar-en-produccion
DATABASE_URL=file:./ifts29.db
```

## Scripts

- `npm run dev`: levanta la app y el panel de Payload
- `npm run build`: build de producción
- `npm run lint`: chequeo estático
- `npm run generate:types`: genera tipos de Payload

## Rutas principales

- `/`: home pública
- `/institucional`: contenido institucional
- `/carreras`: oferta académica
- `/noticias`: novedades
- `/login`: login del portal
- `/portal`: dashboard por rol
- `/portal/biblioteca`: biblioteca privada
- `/admin`: panel de Payload

## Roles

- `student`: alumno con acceso a biblioteca
- `teacher`: edición de contenido académico y noticias
- `admin`: acceso total, usuarios y configuración

## Primer uso

1. Configurar `.env.local`
2. Ejecutar `npm install`
3. Ejecutar `npm run dev`
4. Entrar a `/admin`
5. Crear el primer usuario administrador
