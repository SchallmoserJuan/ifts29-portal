import sharp from 'sharp'

const W = 1200
const H = 630

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}">
      <stop offset="0%" style="stop-color:#072c57"/>
      <stop offset="100%" style="stop-color:#0a3d73"/>
    </linearGradient>
  </defs>

  <!-- Fondo -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Patron decorativo de fondo -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  <circle cx="300" cy="150" r="300" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
  <circle cx="900" cy="480" r="300" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
  <circle cx="1050" cy="100" r="200" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>

  <!-- Logo IFTS -->
  <g transform="translate(530, 130)">
    <!-- I -->
    <rect x="0" y="0" width="70" height="70" fill="#1772b7" rx="4"/>
    <text x="35" y="35" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="36">I</text>

    <!-- F -->
    <rect x="72" y="0" width="70" height="70" fill="#108b63" rx="4"/>
    <text x="107" y="35" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="36">F</text>

    <!-- T -->
    <rect x="0" y="72" width="70" height="70" fill="#24a34a" rx="4"/>
    <text x="35" y="107" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="36">T</text>

    <!-- S -->
    <rect x="72" y="72" width="70" height="70" fill="#0b5f44" rx="4"/>
    <text x="107" y="107" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="36">S</text>

    <!-- 29 -->
    <circle cx="71" cy="71" r="24" fill="#f3c624"/>
    <text x="71" y="71" dominant-baseline="central" text-anchor="middle" fill="#0f172a" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="22">29</text>
  </g>

  <!-- Texto institucional -->
  <text x="600" y="460" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="32" letter-spacing="1">Instituto de Formación Técnica Superior N° 29</text>
  <text x="600" y="510" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, Helvetica, sans-serif" font-size="20">Tecnicatura Superior en Desarrollo de Software</text>

  <!-- URL -->
  <text x="600" y="580" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="2">ifts29.edu.ar</text>

  <!-- Borde inferior -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#f3c624"/>
</svg>`

async function main() {
  await sharp(Buffer.from(svg))
    .resize(W, H)
    .png()
    .toFile('public/og-default.png')
  console.log('og-default.png generated')
}

main()
