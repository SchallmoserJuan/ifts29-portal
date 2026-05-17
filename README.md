# Portal IFTS 29

![CI](https://github.com/SchallmoserJuan/ifts29-portal/actions/workflows/ci.yml/badge.svg)
![Coverage](https://codecov.io/gh/SchallmoserJuan/ifts29-portal/branch/main/graph/badge.svg)

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

## Testing & Cobertura

### Tests unitarios e integración (Vitest)

```bash
npm run test:run        # corre todos los tests una vez
npm test                # modo watch
npm run test:coverage   # genera reporte de cobertura
```

El reporte HTML queda en `coverage/index.html`. El resumen JSON en `coverage/coverage-summary.json`.

### Tests E2E (Playwright)

Requiere el servidor corriendo (`npm run dev`) y un archivo `.env.test.local` con credenciales de prueba.

```bash
npm run test:e2e        # corre todos los tests E2E
npm run test:e2e:ui     # abre el UI de Playwright
npm run test:e2e:report # abre el último reporte HTML
```

El reporte HTML queda en `playwright-report/index.html`.

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

---

## Diagramas

La documentación visual del sistema se encuentra en [`documents/Diagramas.pdf`](documents/Diagramas.pdf).

| Diagrama | Descripción |
|---------|------------|
| 🎯 Casos de uso | Interacciones entre actores y el sistema |
| 📦 Clases | Estructura de objetos y relaciones |
| ↻ Secuencia | Flujo de mensajes entre componentes |
| 🔄 Actividades | Procesos y flujos de trabajo |
| 📊 Estados | Transiciones de estado de entidades |
| 🧩 Componentes | Arquitectura modular del sistema |
| ☁️ Despliegue | Infrastructura y distribución |
| 🔗 Entidad-Relación | Modelo de datos y relaciones |

Para visualizar los diagramas, abrir el archivo PDF con cualquier visor de documentos.
