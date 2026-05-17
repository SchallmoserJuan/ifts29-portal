/**
 * Seed de admin de ejemplo
 *
 * Uso:
 *   npm run seed:admin
 *   o
 *   npx tsx --tsconfig tsconfig.json src/scripts/seed-admin.ts
 *
 * IMPORTANTE: Este script carga automaticamente .env.local via dotenv.
 * Asegurate de que DATABASE_URL apunte a la base de datos correcta.
 *
 * Credenciales por defecto (si no se setean env vars):
 *   Email: admin@ifts29.edu.ar
 *   Password: admin1234
 *
 * IMPORTANTE: Cambia esta contrasena en produccion.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ifts29.edu.ar'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234'

const adminData = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  dni: '12345678',
  firstName: 'Administrador',
  lastName: 'IFTS 29',
  role: 'admin' as const,
  status: 'approved' as const,
}

async function seed() {
  console.log('======================================')
  console.log('  SEED ADMIN — IFTS 29 Portal')
  console.log('======================================')
  console.log('Conectando a:', process.env.DATABASE_URL || '(fallback local)')

  const payload = await getPayload({ config })

  console.log('\nVerificando si existe admin...')

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: adminData.email } },
  })

  if (existing.docs.length > 0) {
    console.log('   Admin ya existe. Email:', adminData.email)
  } else {
    const created = await payload.create({
      collection: 'users',
      data: adminData,
    })
    console.log('   Admin creado. ID:', created.id)
  }

  console.log('\n--------------------------------------')
  console.log('  CREDENCIALES DE ACCESO')
  console.log('--------------------------------------')
  console.log('  URL: /admin')
  console.log('  Email:', adminData.email)
  console.log('  Password:', ADMIN_PASSWORD)
  console.log('--------------------------------------')
  console.log('  IMPORTANTE: Cambia esta contrasena')
  console.log('  en produccion inmediatamente.')
  console.log('======================================')
}

seed()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error('\nError fatal en seed:', err)
    process.exit(1)
  })
