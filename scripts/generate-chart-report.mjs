import {readFileSync, writeFileSync, mkdirSync} from 'fs'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const raw = JSON.parse(readFileSync(resolve(root, 'test-results.json'), 'utf8'))

const suites = raw.testResults.map((file) => {
  const name = (file.name ?? file.testFilePath ?? '').replace(/.*[\\/]src[\\/]test[\\/]/, '').replace(/\.test\.(ts|tsx)$/, '')
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
const statusColor = total.failed > 0 ? '#ef4444' : '#22c55e'
const statusLabel = total.failed > 0 ? 'FALLANDO' : 'VERDE'

const suiteLabels = JSON.stringify(suites.map((s) => s.name))
const suitePassed = JSON.stringify(suites.map((s) => s.passed))
const suiteFailed = JSON.stringify(suites.map((s) => s.failed))
const suiteSkipped = JSON.stringify(suites.map((s) => s.skipped))
const suiteDurations = JSON.stringify(suites.map((s) => parseFloat(s.duration.toFixed(2))))

const now = new Date().toLocaleString('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Test Report — Portal IFTS 29</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; padding: 2rem; }
    h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
    .subtitle { color: #94a3b8; font-size: 0.875rem; margin-bottom: 2rem; }

    .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 2.5rem; }
    .kpi { background: #1e293b; border-radius: 0.75rem; padding: 1.25rem 1.5rem; border: 1px solid #334155; }
    .kpi-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .kpi-value { font-size: 2rem; font-weight: 700; line-height: 1; }
    .kpi-value.green { color: #22c55e; }
    .kpi-value.red { color: #ef4444; }
    .kpi-value.yellow { color: #f59e0b; }
    .kpi-value.blue { color: #60a5fa; }
    .kpi-value.white { color: #f1f5f9; }

    .badge { display: inline-block; padding: 0.2rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: ${statusColor}22; color: ${statusColor}; border: 1px solid ${statusColor}44; margin-left: 0.75rem; vertical-align: middle; }

    .charts { display: grid; grid-template-columns: 340px 1fr; gap: 1.5rem; margin-bottom: 2rem; }
    .charts-bottom { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2rem; }
    .card { background: #1e293b; border-radius: 0.75rem; padding: 1.5rem; border: 1px solid #334155; }
    .card h2 { font-size: 0.875rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.25rem; }
    .chart-wrap { position: relative; }
    .chart-wrap.pie { height: 260px; display: flex; align-items: center; justify-content: center; }
    .chart-wrap.bar { height: 260px; }
    .chart-wrap.duration { height: 200px; }

    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    thead th { text-align: left; color: #64748b; font-weight: 500; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.5rem 0.75rem; border-bottom: 1px solid #334155; }
    tbody tr:hover { background: #334155; }
    tbody td { padding: 0.625rem 0.75rem; border-bottom: 1px solid #1e293b; }
    .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
    .dot.green { background: #22c55e; }
    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }
    .pill { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
    .pill.pass { background: #22c55e22; color: #22c55e; }
    .pill.fail { background: #ef444422; color: #ef4444; }
    .t-right { text-align: right; }
    .text-muted { color: #64748b; }
    footer { color: #475569; font-size: 0.75rem; margin-top: 2rem; text-align: center; }
  </style>
</head>
<body>
  <h1>Test Report — Portal IFTS 29 <span class="badge">${statusLabel}</span></h1>
  <p class="subtitle">Generado el ${now} &nbsp;·&nbsp; ${total.all} tests en ${suites.length} suites &nbsp;·&nbsp; ${total.duration.toFixed(2)}s</p>

  <div class="kpis">
    <div class="kpi"><div class="kpi-label">Pass rate</div><div class="kpi-value white">${passRate}%</div></div>
    <div class="kpi"><div class="kpi-label">Pasaron</div><div class="kpi-value green">${total.passed}</div></div>
    <div class="kpi"><div class="kpi-label">Fallaron</div><div class="kpi-value red">${total.failed}</div></div>
    <div class="kpi"><div class="kpi-label">Salteados</div><div class="kpi-value yellow">${total.skipped}</div></div>
    <div class="kpi"><div class="kpi-label">Total tests</div><div class="kpi-value blue">${total.all}</div></div>
    <div class="kpi"><div class="kpi-label">Duración</div><div class="kpi-value white">${total.duration.toFixed(1)}s</div></div>
  </div>

  <div class="charts">
    <div class="card">
      <h2>Estado general</h2>
      <div class="chart-wrap pie"><canvas id="pie"></canvas></div>
    </div>
    <div class="card">
      <h2>Resultados por suite</h2>
      <div class="chart-wrap bar"><canvas id="bar"></canvas></div>
    </div>
  </div>

  <div class="charts-bottom">
    <div class="card">
      <h2>Duración por suite (segundos)</h2>
      <div class="chart-wrap duration"><canvas id="duration"></canvas></div>
    </div>
  </div>

  <div class="card">
    <h2>Detalle por suite</h2>
    <table>
      <thead>
        <tr>
          <th>Suite</th>
          <th class="t-right">Pasaron</th>
          <th class="t-right">Fallaron</th>
          <th class="t-right">Salteados</th>
          <th class="t-right">Duración</th>
          <th class="t-right">Estado</th>
        </tr>
      </thead>
      <tbody>
        ${suites
          .map(
            (s) => `
        <tr>
          <td>${s.name}</td>
          <td class="t-right"><span class="dot green"></span>${s.passed}</td>
          <td class="t-right">${s.failed > 0 ? `<span class="dot red"></span>${s.failed}` : `<span class="text-muted">—</span>`}</td>
          <td class="t-right">${s.skipped > 0 ? `<span class="dot yellow"></span>${s.skipped}` : `<span class="text-muted">—</span>`}</td>
          <td class="t-right text-muted">${s.duration.toFixed(2)}s</td>
          <td class="t-right"><span class="pill ${s.failed > 0 ? 'fail' : 'pass'}">${s.failed > 0 ? 'FALLO' : 'PASS'}</span></td>
        </tr>`,
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <footer>Portal IFTS 29 &nbsp;·&nbsp; Vitest ${raw.version ?? ''} &nbsp;·&nbsp; Chart.js</footer>

  <script>
    Chart.defaults.color = '#94a3b8'
    Chart.defaults.borderColor = '#1e293b'

    new Chart(document.getElementById('pie'), {
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
        cutout: '68%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16, boxWidth: 12 } },
        },
      },
    })

    new Chart(document.getElementById('bar'), {
      type: 'bar',
      data: {
        labels: ${suiteLabels},
        datasets: [
          { label: 'Pasaron', data: ${suitePassed}, backgroundColor: '#22c55e', borderRadius: 4, borderSkipped: false },
          { label: 'Fallaron', data: ${suiteFailed}, backgroundColor: '#ef4444', borderRadius: 4, borderSkipped: false },
          { label: 'Salteados', data: ${suiteSkipped}, backgroundColor: '#f59e0b', borderRadius: 4, borderSkipped: false },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 } } },
          y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 } },
        },
        plugins: { legend: { position: 'bottom', labels: { padding: 16, boxWidth: 12 } } },
      },
    })

    new Chart(document.getElementById('duration'), {
      type: 'bar',
      data: {
        labels: ${suiteLabels},
        datasets: [{
          label: 'Duración (s)',
          data: ${suiteDurations},
          backgroundColor: '#60a5fa',
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: { beginAtZero: true },
        },
        plugins: { legend: { display: false } },
      },
    })
  </script>
</body>
</html>`

mkdirSync(resolve(root, 'test-report'), {recursive: true})
writeFileSync(resolve(root, 'test-report', 'charts.html'), html)
console.log('✓ test-report/charts.html generado')
