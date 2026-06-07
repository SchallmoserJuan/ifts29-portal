import {readFileSync, writeFileSync, mkdirSync} from 'fs'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// --------------- data ---------------

const testRaw = JSON.parse(readFileSync(resolve(root, 'test-results.json'), 'utf8'))
const covRaw = JSON.parse(readFileSync(resolve(root, 'coverage', 'coverage-summary.json'), 'utf8'))

const suites = testRaw.testResults.map((file) => {
  const name = (file.name ?? file.testFilePath ?? '')
    .replace(/.*[\\/]src[\\/]test[\\/]/, '')
    .replace(/\.test\.(ts|tsx)$/, '')
  const passed = file.assertionResults.filter((t) => t.status === 'passed').length
  const failed = file.assertionResults.filter((t) => t.status === 'failed').length
  const skipped = file.assertionResults.filter((t) => t.status === 'pending').length
  const duration = ((file.endTime ?? 0) - (file.startTime ?? 0)) / 1000
  return {name, passed, failed, skipped, duration}
})

const total = {
  passed: suites.reduce((s, r) => s + r.passed, 0),
  failed: suites.reduce((s, r) => s + r.failed, 0),
  skipped: suites.reduce((s, r) => s + r.skipped, 0),
  duration: suites.reduce((s, r) => s + r.duration, 0),
}
total.all = total.passed + total.failed + total.skipped
const passRate = total.all > 0 ? ((total.passed / total.all) * 100).toFixed(1) : '0.0'

// --------------- coverage aggregation ---------------

const norm = (p) => p.replace(/\\/g, '/')

const modules = {
  'src/lib/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'src/context/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'src/fields/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'src/collections/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'src/components/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'src/globals/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'src/data/**': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
  'Otros': {files: [], statements: 0, lines: 0, functions: 0, branches: 0, fileCount: 0},
}

const thresholds = {
  'src/lib/**': {lines: 37, statements: 37},
  'src/context/**': {lines: 60, statements: 60},
  'src/fields/**': {lines: 60, statements: 60},
}

for (const [filePath, data] of Object.entries(covRaw)) {
  if (filePath === 'total') continue
  const p = norm(filePath)
  let target = 'Otros'
  if (p.includes('/src/lib/')) target = 'src/lib/**'
  else if (p.includes('/src/context/')) target = 'src/context/**'
  else if (p.includes('/src/fields/')) target = 'src/fields/**'
  else if (p.includes('/src/collections/')) target = 'src/collections/**'
  else if (p.includes('/src/components/')) target = 'src/components/**'
  else if (p.includes('/src/globals/')) target = 'src/globals/**'
  else if (p.includes('/src/data/')) target = 'src/data/**'
  modules[target].files.push({
    name: p.split('/').pop(),
    lines: data.lines.pct,
    statements: data.statements.pct,
    functions: data.functions.pct,
    branches: data.branches.pct,
  })
  modules[target].statements += data.statements.total
  modules[target].lines += data.lines.total
  modules[target].functions += data.functions.total
  modules[target].branches += data.branches.total
  modules[target].fileCount++
}

const moduleCoverage = Object.entries(modules)
  .filter(([, m]) => m.fileCount > 0)
  .map(([key, m]) => {
    const linesTotal = covRaw.total.lines.total
    const statementsTotal = covRaw.total.statements.total
    const totalInModule = Object.entries(covRaw)
      .filter(([fp]) => fp !== 'total' && norm(fp).includes(key.replace('/**', '').replace('src/', '/src/')))
      .reduce((sum, [, d]) => sum + d.lines.total, 0)
    const coveredInModule = Object.entries(covRaw)
      .filter(([fp]) => fp !== 'total' && norm(fp).includes(key.replace('/**', '').replace('src/', '/src/')))
      .reduce((sum, [, d]) => sum + d.lines.covered, 0)
    const pct = totalInModule > 0 ? ((coveredInModule / totalInModule) * 100).toFixed(1) : '0.0'
    const covStatementsTotal = Object.entries(covRaw)
      .filter(([fp]) => fp !== 'total' && norm(fp).includes(key.replace('/**', '').replace('src/', '/src/')))
      .reduce((sum, [, d]) => sum + d.statements.total, 0)
    const covStatementsCovered = Object.entries(covRaw)
      .filter(([fp]) => fp !== 'total' && norm(fp).includes(key.replace('/**', '').replace('src/', '/src/')))
      .reduce((sum, [, d]) => sum + d.statements.covered, 0)
    const stPct = covStatementsTotal > 0 ? ((covStatementsCovered / covStatementsTotal) * 100).toFixed(1) : '0.0'
    const th = thresholds[key]
    return {key, lines: pct, statements: stPct, files: m.files, threshold: th, fileCount: m.fileCount}
  })

// --------------- architecture layers ---------------

const layers = [
  {
    name: 'Librerías (lib/)',
    desc: 'Lógica pura: auth, content, email, rate-limit, analytics, slug, news-utils',
    files: 7,
    tests: suites.filter((s) => ['analytics', 'auth', 'auth-lib', 'content', 'email', 'rate-limit', 'news-utils', 'slug'].includes(s.name)).reduce((s, r) => s + r.passed + r.failed, 0),
    pct: moduleCoverage.find((m) => m.key === 'src/lib/**')?.lines ?? '0.0',
  },
  {
    name: 'API Routes (app/api/)',
    desc: 'Endpoints: contacto, notificaciones, auth, logout, users/me',
    files: 5,
    tests: suites.filter((s) => ['contact-api-routes', 'notification-api-routes', 'users-me', 'users-logout'].includes(s.name)).reduce((s, r) => s + r.passed + r.failed, 0),
    pct: '—',
  },
  {
    name: 'Componentes (components/)',
    desc: 'UI con estado: login-form, contact-form, error-boundary',
    files: 3,
    tests: suites.filter((s) => ['login-form', 'contact-form', 'error-boundary'].includes(s.name)).reduce((s, r) => s + r.passed + r.failed, 0),
    pct: moduleCoverage.find((m) => m.key === 'src/components/**')?.lines ?? '0.0',
  },
  {
    name: 'Context (context/)',
    desc: 'Estado global: AuthProvider',
    files: 1,
    tests: suites.filter((s) => ['auth-context'].includes(s.name)).reduce((s, r) => s + r.passed + r.failed, 0),
    pct: moduleCoverage.find((m) => m.key === 'src/context/**')?.lines ?? '0.0',
  },
  {
    name: 'Fields (fields/)',
    desc: 'Campos personalizados: slug',
    files: 1,
    tests: suites.filter((s) => ['slug-field'].includes(s.name)).reduce((s, r) => s + r.passed + r.failed, 0),
    pct: moduleCoverage.find((m) => m.key === 'src/fields/**')?.lines ?? '0.0',
  },
  {
    name: 'Acceso (access.ts)',
    desc: 'Control de permisos por rol (4 roles, 14 funciones)',
    files: 1,
    tests: suites.filter((s) => ['access'].includes(s.name)).reduce((s, r) => s + r.passed + r.failed, 0),
    pct: '100',
  },
  {
    name: 'E2E (Playwright)',
    desc: 'Tests end-to-end: login, roles, contacto',
    files: 4,
    tests: 28,
    pct: '—',
  },
]

// --------------- suite categories ---------------

const categoryMap = {
  access: 'Acceso y Permisos',
  analytics: 'Analítica',
  auth: 'Autenticación (auth.ts)',
  'auth-lib': 'Autenticación (auth-lib.ts)',
  'auth-context': 'Autenticación (contexto)',
  'contact-api-routes': 'API Contacto',
  'contact-form': 'Componente Contacto',
  content: 'Contenido (content.ts)',
  email: 'Email',
  'error-boundary': 'Componente ErrorBoundary',
  'login-form': 'Componente Login',
  'news-utils': 'Utilidades Noticias',
  'notification-api-routes': 'API Notificaciones',
  'rate-limit': 'Rate Limiting',
  slug: 'Slug',
  'slug-field': 'Campo Slug',
  'users-me': 'API Users/Me',
  'users-logout': 'API Logout',
  smoke: 'Smoke Test',
}

// --------------- colors ---------------

const pctColor = (v) => {
  const n = parseFloat(v)
  if (isNaN(n)) return '#94a3b8'
  if (n >= 90) return '#22c55e'
  if (n >= 60) return '#f59e0b'
  return '#ef4444'
}

const suiteLabels = JSON.stringify(suites.map((s) => s.name))
const suitePassed = JSON.stringify(suites.map((s) => s.passed))
const suiteFailed = JSON.stringify(suites.map((s) => s.failed))
const suiteSkipped = JSON.stringify(suites.map((s) => s.skipped))
const suiteDurations = JSON.stringify(suites.map((s) => parseFloat(s.duration.toFixed(2))))

const archLabels = JSON.stringify(layers.map((l) => l.name))
const archTests = JSON.stringify(layers.map((l) => l.tests))
const archPcts = JSON.stringify(layers.map((l) => {
  const v = parseFloat(l.pct)
  return isNaN(v) ? 0 : v
}))

const modLabels = JSON.stringify(moduleCoverage.filter((m) => m.fileCount > 0).map((m) => m.key.replace('/**', '')))
const modLines = JSON.stringify(moduleCoverage.filter((m) => m.fileCount > 0).map((m) => parseFloat(m.lines)))

const now = new Date().toLocaleString('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const statusColor = total.failed > 0 ? '#ef4444' : '#22c55e'
const statusLabel = total.failed > 0 ? 'CON FALLOS' : '100% OPERATIVO'

// --------------- helper: mini coverage bar ---------------

const barHTML = (pct, maxW = '100%') => {
  const n = parseFloat(pct)
  if (isNaN(n)) return `<div class="bar-track" style="width:${maxW}"><div class="bar-fill null" style="width:0%"></div></div><span class="bar-label">—</span>`
  const color = n >= 90 ? 'green' : n >= 60 ? 'yellow' : 'red'
  return `<div class="bar-track" style="width:${maxW}"><div class="bar-fill ${color}" style="width:${n}%"></div></div><span class="bar-label ${color}">${pct}%</span>`
}

// --------------- template ---------------

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard de Calidad — Portal IFTS 29</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
    .container { max-width: 1280px; margin: 0 auto; padding: 2rem; }

    /* --------------- header --------------- */
    .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 1.25rem; padding: 2rem 2.5rem; margin-bottom: 2rem; color: #f8fafc; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .header h1 { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; }
    .header .sub { color: #94a3b8; font-size: 0.9rem; margin-top: 0.25rem; }
    .header .badge { display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; background: ${statusColor}22; color: ${statusColor}; border: 1px solid ${statusColor}44; }
    .header-right { text-align: right; }

    /* --------------- KPIs --------------- */
    .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .kpi { background: #fff; border-radius: 1rem; padding: 1.25rem 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .kpi .icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .kpi .label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 0.35rem; }
    .kpi .value { font-size: 2rem; font-weight: 700; line-height: 1.1; }
    .kpi .value.green { color: #16a34a; }
    .kpi .value.red { color: #dc2626; }
    .kpi .value.blue { color: #2563eb; }
    .kpi .value.purple { color: #9333ea; }
    .kpi .value.amber { color: #d97706; }
    .kpi .subnote { font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem; }

    /* --------------- cards --------------- */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
    .grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
    .card { background: #fff; border-radius: 1rem; padding: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .card h2 { font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
    .card h2 .count { background: #e2e8f0; color: #475569; padding: 0.1rem 0.5rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; }
    .chart-wrap { position: relative; }
    .chart-wrap.pie { height: 240px; display: flex; align-items: center; justify-content: center; }
    .chart-wrap.bar { height: 280px; }
    .chart-wrap.hbar { height: 200px; }

    /* --------------- threshold table --------------- */
    .thresh-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .thresh-table th { text-align: left; color: #64748b; font-weight: 600; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.5rem 0.75rem; border-bottom: 2px solid #e2e8f0; }
    .thresh-table td { padding: 0.6rem 0.75rem; border-bottom: 1px solid #f1f5f9; }
    .thresh-table tr:last-child td { border-bottom: none; }
    .thresh-table .thresh-name { font-weight: 500; }
    .check { color: #16a34a; font-weight: 700; }
    .cross { color: #dc2626; font-weight: 700; }

    /* --------------- progress bars --------------- */
    .bar-track { display: inline-block; height: 8px; background: #e2e8f0; border-radius: 9999px; overflow: hidden; vertical-align: middle; }
    .bar-fill { height: 100%; border-radius: 9999px; transition: width 0.6s ease; }
    .bar-fill.green { background: #22c55e; }
    .bar-fill.yellow { background: #f59e0b; }
    .bar-fill.red { background: #ef4444; }
    .bar-fill.blue { background: #3b82f6; }
    .bar-fill.null { background: #94a3b8; }
    .bar-label { font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem; vertical-align: middle; white-space: nowrap; }
    .bar-label.green { color: #16a34a; }
    .bar-label.yellow { color: #d97706; }
    .bar-label.red { color: #dc2626; }

    /* --------------- architecture layer cards --------------- */
    .arch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .arch-card { background: #fff; border-radius: 0.75rem; padding: 1.25rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 0.5rem; }
    .arch-card .name { font-weight: 600; font-size: 0.95rem; }
    .arch-card .desc { font-size: 0.8rem; color: #64748b; }
    .arch-card .stats { display: flex; gap: 1rem; font-size: 0.8rem; margin-top: auto; padding-top: 0.5rem; border-top: 1px solid #f1f5f9; }
    .arch-card .stat { display: flex; align-items: center; gap: 0.35rem; }
    .arch-card .stat-num { font-weight: 600; }

    /* --------------- suite table --------------- */
    .suite-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .suite-table thead th { text-align: left; color: #64748b; font-weight: 600; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.6rem 0.75rem; border-bottom: 2px solid #e2e8f0; white-space: nowrap; }
    .suite-table tbody td { padding: 0.55rem 0.75rem; border-bottom: 1px solid #f1f5f9; }
    .suite-table tbody tr:hover { background: #f8fafc; }
    .suite-table .cat-badge { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.65rem; font-weight: 600; background: #e2e8f0; color: #475569; }
    .t-right { text-align: right; }
    .text-muted { color: #94a3b8; }
    .pill { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
    .pill.pass { background: #dcfce7; color: #16a34a; }
    .pill.fail { background: #fee2e2; color: #dc2626; }

    /* --------------- section titles --------------- */
    .section-title { font-size: 1.15rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .section-title .line { flex: 1; height: 1px; background: #e2e8f0; }

    /* --------------- responsive --------------- */
    @media (max-width: 900px) { .grid-2, .grid-2-1 { grid-template-columns: 1fr; } }
    @media (max-width: 600px) { .container { padding: 1rem; } .header { flex-direction: column; text-align: left; } .header-right { text-align: left; } }

    /* --------------- footer --------------- */
    footer { color: #94a3b8; font-size: 0.75rem; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>

<div class="container">

  <!-- ============================================================ HEADER -->
  <div class="header">
    <div>
      <h1>Dashboard de Calidad</h1>
      <div class="sub">Portal IFTS 29 — Práctica Profesionalizante IV &nbsp;·&nbsp; Grupo 11</div>
    </div>
    <div class="header-right">
      <div class="badge">${statusLabel}</div>
      <div class="sub" style="margin-top:0.5rem">${now}</div>
    </div>
  </div>

  <!-- ============================================================ KPIS -->
  <div class="kpis">
    <div class="kpi">
      <div class="label">Tests Totales</div>
      <div class="value blue">${total.all}</div>
      <div class="subnote">${suites.length} suites de prueba</div>
    </div>
    <div class="kpi">
      <div class="label">Aprobados</div>
      <div class="value green">${total.passed}</div>
      <div class="subnote">${passRate}% de tasa de aprobación</div>
    </div>
    <div class="kpi">
      <div class="label">Fallados</div>
      <div class="value ${total.failed > 0 ? 'red' : 'green'}">${total.failed}</div>
      <div class="subnote">${total.failed === 0 ? 'Sin errores ✅' : 'Requieren revisión'}</div>
    </div>
    <div class="kpi">
      <div class="label">Cobertura Global</div>
      <div class="value" style="color:${pctColor(covRaw.total.lines.pct.toFixed(1))}">${covRaw.total.lines.pct.toFixed(1)}%</div>
      <div class="subnote">${covRaw.total.lines.covered} / ${covRaw.total.lines.total} líneas</div>
    </div>
    <div class="kpi">
      <div class="label">Duración Total</div>
      <div class="value purple">${total.duration.toFixed(1)}s</div>
      <div class="subnote">Aprox. ${(total.duration / 60).toFixed(1)} minutos</div>
    </div>
    <div class="kpi">
      <div class="label">Tests E2E</div>
      <div class="value amber">28</div>
      <div class="subnote">4 specs con Playwright</div>
    </div>
  </div>

  <!-- ============================================================ ARQUITECTURA DE PRUEBAS -->
  <div class="section-title">Arquitectura de Pruebas <span class="line"></span></div>
  <div class="arch-grid">
    ${layers.map((l) => `
    <div class="arch-card">
      <div class="name">${l.name}</div>
      <div class="desc">${l.desc}</div>
      <div class="stats">
        <div class="stat">📁 <span class="stat-num">${l.files}</span> archivos</div>
        <div class="stat">🧪 <span class="stat-num">${l.tests}</span> tests</div>
        <div class="stat">📊 <span class="stat-num" style="color:${pctColor(l.pct)}">${l.pct}${l.pct !== '—' ? '%' : ''}</span> cobertura</div>
      </div>
    </div>`).join('')}
  </div>

  <div class="grid-2-1">
    <!-- tests por capa -->
    <div class="card">
      <h2>🧪 Tests por capa de la arquitectura</h2>
      <div class="chart-wrap bar"><canvas id="archChart"></canvas></div>
    </div>
    <!-- cobertura por capa -->
    <div class="card">
      <h2>📊 Cobertura por capa</h2>
      <div class="chart-wrap bar"><canvas id="archCovChart"></canvas></div>
    </div>
  </div>

  <!-- ============================================================ COBERTURA POR MÓDULO -->
  <div class="section-title">Cobertura por Módulo <span class="line"></span></div>
  <div class="grid-2">
    <div class="card">
      <h2>📈 Líneas cubiertas por módulo</h2>
      <div class="chart-wrap hbar"><canvas id="modChart"></canvas></div>
    </div>
    <div class="card">
      <h2>✅ Thresholds y cumplimiento</h2>
      <table class="thresh-table">
        <thead>
          <tr><th>Módulo</th><th>Cobertura</th><th>Threshold</th><th>Estado</th></tr>
        </thead>
        <tbody>
          ${moduleCoverage.filter((m) => m.threshold).map((m) => {
            const pass = parseFloat(m.lines) >= m.threshold.lines
            return `
          <tr>
            <td class="thresh-name">${m.key.replace('/**', '')}</td>
            <td>${barHTML(m.lines, '120px')}</td>
            <td>≥ ${m.threshold.lines}%</td>
            <td class="${pass ? 'check' : 'cross'}">${pass ? '✓ CUMPLE' : '✗ NO CUMPLE'}</td>
          </tr>`}).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- detalle por archivo -->
  <div class="card" style="margin-bottom:2rem">
    <h2>📁 Cobertura por archivo <span class="count">${moduleCoverage.reduce((s, m) => s + m.fileCount, 0)} archivos</span></h2>
    <div style="max-height:400px;overflow-y:auto">
      <table class="suite-table">
        <thead>
          <tr><th>Archivo</th><th>Módulo</th><th>Líneas</th><th>Statements</th><th>Funciones</th><th>Ramas</th></tr>
        </thead>
        <tbody>
          ${moduleCoverage.filter((m) => m.fileCount > 0).flatMap((m) =>
            m.files.map((f) => `
          <tr>
            <td>${f.name}</td>
            <td><span class="cat-badge">${m.key.replace('/**', '')}</span></td>
            <td>${barHTML(f.lines.toFixed(1), '100px')}</td>
            <td>${barHTML(f.statements.toFixed(1), '100px')}</td>
            <td>${f.functions === 100 ? '100% ✅' : barHTML(f.functions.toFixed(1), '100px')}</td>
            <td>${f.branches === 100 ? '100% ✅' : barHTML(f.branches.toFixed(1), '100px')}</td>
          </tr>`).join('')).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- ============================================================ DETALLE DE SUITES -->
  <div class="section-title">Resultados por Suite de Pruebas <span class="line"></span></div>

  <div class="grid-2">
    <div class="card">
      <h2>🥧 Resultados globales</h2>
      <div class="chart-wrap pie"><canvas id="pieChart"></canvas></div>
    </div>
    <div class="card">
      <h2>⏱️ Duración por suite</h2>
      <div class="chart-wrap bar"><canvas id="durChart"></canvas></div>
    </div>
  </div>

  <div class="card" style="margin-bottom:2rem">
    <h2>📋 Detalle completo de suites <span class="count">${suites.length} suites</span></h2>
    <div style="overflow-x:auto">
      <table class="suite-table">
        <thead>
          <tr><th>Suite</th><th>Categoría</th><th class="t-right">Pasaron</th><th class="t-right">Fallaron</th><th class="t-right">Duración</th><th class="t-right">Estado</th></tr>
        </thead>
        <tbody>
          ${suites.map((s) => {
            const cat = categoryMap[s.name] || 'General'
            return `
          <tr>
            <td><code>${s.name}</code></td>
            <td><span class="cat-badge">${cat}</span></td>
            <td class="t-right">${s.passed}</td>
            <td class="t-right">${s.failed > 0 ? `<span style="color:#dc2626;font-weight:600">${s.failed}</span>` : `<span class="text-muted">—</span>`}</td>
            <td class="t-right text-muted">${s.duration.toFixed(2)}s</td>
            <td class="t-right"><span class="pill ${s.failed > 0 ? 'fail' : 'pass'}">${s.failed > 0 ? 'FALLO' : 'PASS'}</span></td>
          </tr>`}).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- ============================================================ FOOTER -->
  <footer>
    Portal IFTS 29 &nbsp;·&nbsp; Generado el ${now} &nbsp;·&nbsp; Vitest + Playwright + @vitest/coverage-v8 &nbsp;·&nbsp; Chart.js
  </footer>

</div>

<script>
Chart.defaults.color = '#64748b'
Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif"

// ---- pie ----
new Chart(document.getElementById('pieChart'), {
  type: 'doughnut',
  data: {
    labels: ['Pasaron', 'Fallaron', 'Salteados'],
    datasets: [{
      data: [${total.passed}, ${total.failed}, ${total.skipped}],
      backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  },
  options: {
    cutout: '65%',
    plugins: {
      legend: { position: 'bottom', labels: { padding: 16, boxWidth: 12, usePointStyle: true } },
    },
  },
})

// ---- tests por capa ----
new Chart(document.getElementById('archChart'), {
  type: 'bar',
  data: {
    labels: ${archLabels},
    datasets: [{
      label: 'Tests',
      data: ${archTests},
      backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#22c55e', '#06b6d4', '#ec4899', '#6366f1'],
      borderRadius: 4,
      borderSkipped: false,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, ticks: { stepSize: 1 } },
      y: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  },
})

// ---- cobertura por capa ----
new Chart(document.getElementById('archCovChart'), {
  type: 'bar',
  data: {
    labels: ${archLabels},
    datasets: [{
      label: 'Cobertura (%)',
      data: ${archPcts},
      backgroundColor: ${JSON.stringify(layers.map((l) => {
        const v = parseFloat(l.pct)
        if (isNaN(v)) return '#94a3b8'
        return v >= 90 ? '#22c55e' : v >= 60 ? '#f59e0b' : '#ef4444'
      }))},
      borderRadius: 4,
      borderSkipped: false,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } },
      y: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  },
})

// ---- cobertura por módulo ----
new Chart(document.getElementById('modChart'), {
  type: 'bar',
  data: {
    labels: ${modLabels},
    datasets: [{
      label: 'Cobertura (%)',
      data: ${modLines},
      backgroundColor: ${JSON.stringify(moduleCoverage.filter((m) => m.fileCount > 0).map((m) => {
        const v = parseFloat(m.lines)
        return v >= 90 ? '#22c55e' : v >= 60 ? '#f59e0b' : '#ef4444'
      }))},
      borderRadius: 4,
      borderSkipped: false,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } },
      y: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  },
})

// ---- duración ----
new Chart(document.getElementById('durChart'), {
  type: 'bar',
  data: {
    labels: ${suiteLabels},
    datasets: [{
      label: 'Duración (s)',
      data: ${suiteDurations},
      backgroundColor: '#6366f1',
      borderRadius: 4,
      borderSkipped: false,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { beginAtZero: true },
    },
    plugins: { legend: { display: false } },
  },
})
</script>
</body>
</html>`

// --------------- write ---------------
mkdirSync(resolve(root, 'test-report'), {recursive: true})
writeFileSync(resolve(root, 'test-report', 'dashboard.html'), html)
console.log('✓ test-report/dashboard.html generado')
