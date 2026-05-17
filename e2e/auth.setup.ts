import {test as setup} from '@playwright/test'
import path from 'path'

export const AUTH_STATE_DIR = path.join(process.cwd(), 'e2e', '.auth')

export const AUTH_FILES = {
  admin: path.join(AUTH_STATE_DIR, 'admin.json'),
  teacher: path.join(AUTH_STATE_DIR, 'teacher.json'),
  student: path.join(AUTH_STATE_DIR, 'student.json'),
}

setup('autenticar admin', async ({request, context}) => {
  const email = process.env.TEST_ADMIN_EMAIL
  const password = process.env.TEST_ADMIN_PASSWORD

  if (!email || !password) {
    console.warn('[auth.setup] TEST_ADMIN_EMAIL/PASSWORD no configuradas — tests de admin saltados')
    return
  }

  const res = await request.post('/api/users/login', {data: {email, password}})

  if (!res.ok()) throw new Error(`Login admin fallido (${res.status()}): ${await res.text()}`)

  const {token} = await res.json()

  await context.addCookies([
    {name: 'payload-token', value: token, domain: 'localhost', path: '/', sameSite: 'Lax'},
  ])

  await context.storageState({path: AUTH_FILES.admin})
})

setup('autenticar teacher', async ({request, context}) => {
  const email = process.env.TEST_TEACHER_EMAIL
  const password = process.env.TEST_TEACHER_PASSWORD

  if (!email || !password) {
    console.warn(
      '[auth.setup] TEST_TEACHER_EMAIL/PASSWORD no configuradas — tests de teacher saltados'
    )
    return
  }

  const res = await request.post('/api/users/login', {data: {email, password}})

  if (!res.ok()) throw new Error(`Login teacher fallido (${res.status()}): ${await res.text()}`)

  const {token} = await res.json()

  await context.addCookies([
    {name: 'payload-token', value: token, domain: 'localhost', path: '/', sameSite: 'Lax'},
  ])

  await context.storageState({path: AUTH_FILES.teacher})
})

setup('autenticar student', async ({request, context}) => {
  const email = process.env.TEST_STUDENT_EMAIL
  const password = process.env.TEST_STUDENT_PASSWORD

  if (!email || !password) {
    console.warn(
      '[auth.setup] TEST_STUDENT_EMAIL/PASSWORD no configuradas — tests de student saltados'
    )
    return
  }

  const res = await request.post('/api/users/login', {data: {email, password}})

  if (!res.ok()) throw new Error(`Login student fallido (${res.status()}): ${await res.text()}`)

  const {token} = await res.json()

  await context.addCookies([
    {name: 'payload-token', value: token, domain: 'localhost', path: '/', sameSite: 'Lax'},
  ])

  await context.storageState({path: AUTH_FILES.student})
})
