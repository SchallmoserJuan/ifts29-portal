# Cómo contribuir

## Requisitos

- Node.js 18+
- Git

## Setup inicial

```bash
git clone https://github.com/SchallmoserJuan/ifts29-portal.git
cd ifts29-portal
git checkout develop
npm install
cp .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000` para ver el sitio y `http://localhost:3000/admin` para el panel de Payload (crear primer usuario admin la primera vez).

## Ramas

- `main` → solo versiones entregables (no tocar)
- `develop` → rama de integración del equipo
- Cada issue se trabaja en su propia rama creada desde `develop`

### Prefijos de ramas

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feat/` | Feature nueva | `feat/contacto` |
| `fix/` | Corrección de bug | `fix/footer-links` |
| `design/` | Cambios visuales | `design/home-ui` |
| `docs/` | Documentación | `docs/manual-usuario` |
| `qa/` | Testing | `qa/responsive` |

## Flujo de trabajo

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Crear rama
git checkout -b feat/nombre-del-issue

# 3. Trabajar y commitear
git add .
git commit -m "feat: descripción del cambio"

# 4. Push
git push -u origin feat/nombre-del-issue

# 5. Crear Pull Request en GitHub → develop
```

## Reglas

- **No pushear directo a `develop` ni a `main`**. Siempre por Pull Request.
- Asignar el PR al issue correspondiente con `Closes #N` en la descripción.
- Pedir review antes de mergear.
