import 'dotenv/config'
import {getPayload} from 'payload'
import config from '@payload-config'

const TEST_USERS = [
  {
    email: 'admin@ifts29.edu.ar',
    password: 'Usertest123',
    role: 'admin' as const,
    firstName: 'Admin',
    lastName: 'Test',
  },
  {
    email: 'docente@ifts29.edu.ar',
    password: 'Usertest123',
    role: 'teacher' as const,
    firstName: 'Docente',
    lastName: 'Test',
  },
  {
    email: 'alumno@ifts29.edu.ar',
    password: 'Usertest123',
    role: 'student' as const,
    firstName: 'Alumno',
    lastName: 'Test',
  },
]

async function seedUsers() {
  console.log('======================================')
  console.log('  SEED USUARIOS DE PRUEBA — IFTS 29')
  console.log('======================================')

  const payload = await getPayload({config})

  for (const user of TEST_USERS) {
    try {
      await payload.create({
        collection: 'users',
        data: user,
      })
      console.log(`   Creado: ${user.email} (${user.role})`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      if (message.includes('duplicate') || message.includes('unique')) {
        console.log(`   Ya existe: ${user.email} — omitido`)
      } else {
        console.error(`   Error al crear ${user.email}:`, message)
      }
    }
  }

  console.log('\n======================================')
  console.log('  SEED COMPLETADO')
  console.log('======================================')
}

seedUsers()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\nError fatal:', err)
    process.exit(1)
  })
