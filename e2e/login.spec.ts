import {expect, test} from '@playwright/test'

// ---------------------------------------------------------------------------
// Login page — sin autenticación previa
// ---------------------------------------------------------------------------

test.describe('Página de login', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/login')
  })

  test('renderiza el formulario con los campos requeridos', async ({page}) => {
    await expect(page.locator('input#email')).toBeVisible()
    await expect(page.locator('input#password')).toBeVisible()
    await expect(page.getByRole('button', {name: 'Ingresar'})).toBeVisible()
  })

  test('muestra error con credenciales inválidas', async ({page}) => {
    await page.fill('input#email', 'noexiste@ifts29.edu.ar')
    await page.fill('input#password', 'contrasenaMal')
    await page.getByRole('button', {name: 'Ingresar'}).click()

    await expect(page.locator('p.text-red-600')).toBeVisible({timeout: 5000})
  })

  test('los campos email y password son requeridos', async ({page}) => {
    const emailInput = page.locator('input#email')
    const passwordInput = page.locator('input#password')

    await expect(emailInput).toHaveAttribute('required', '')
    await expect(passwordInput).toHaveAttribute('required', '')
  })
})

// ---------------------------------------------------------------------------
// Redirección sin autenticación
// ---------------------------------------------------------------------------

test.describe('Acceso sin autenticación', () => {
  test('redirige /portal a /login cuando no hay sesión', async ({page}) => {
    await page.goto('/portal')
    await expect(page).toHaveURL(/\/login/)
  })

  test('redirige /portal/biblioteca a /login cuando no hay sesión', async ({page}) => {
    await page.goto('/portal/biblioteca')
    await expect(page).toHaveURL(/\/login/)
  })

  test('usuario ya autenticado en /login es redirigido a /portal', async ({page}) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL
    const adminPassword = process.env.TEST_ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      test.skip()
      return
    }

    const res = await page.request.post('/api/users/login', {
      data: {email: adminEmail, password: adminPassword},
    })

    const {token} = await res.json()
    await page.context().addCookies([
      {name: 'payload-token', value: token, domain: 'localhost', path: '/', sameSite: 'Lax'},
    ])

    await page.goto('/login')
    await expect(page).toHaveURL(/\/portal/)
  })
})

// ---------------------------------------------------------------------------
// Redirección post-login según rol
// ---------------------------------------------------------------------------

test.describe('Redirección post-login', () => {
  test('student es redirigido a /portal/biblioteca al iniciar sesión', async ({page}) => {
    const email = process.env.TEST_STUDENT_EMAIL
    const password = process.env.TEST_STUDENT_PASSWORD

    if (!email || !password) {
      test.skip()
      return
    }

    await page.goto('/login')
    await page.fill('input#email', email)
    await page.fill('input#password', password)
    await page.getByRole('button', {name: 'Ingresar'}).click()

    await expect(page).toHaveURL(/\/portal\/biblioteca/, {timeout: 8000})
  })

  test('teacher es redirigido a /portal al iniciar sesión', async ({page}) => {
    const email = process.env.TEST_TEACHER_EMAIL
    const password = process.env.TEST_TEACHER_PASSWORD

    if (!email || !password) {
      test.skip()
      return
    }

    await page.goto('/login')
    await page.fill('input#email', email)
    await page.fill('input#password', password)
    await page.getByRole('button', {name: 'Ingresar'}).click()

    await expect(page).toHaveURL(/\/portal$/, {timeout: 8000})
  })

  test('admin es redirigido a /portal al iniciar sesión', async ({page}) => {
    const email = process.env.TEST_ADMIN_EMAIL
    const password = process.env.TEST_ADMIN_PASSWORD

    if (!email || !password) {
      test.skip()
      return
    }

    await page.goto('/login')
    await page.fill('input#email', email)
    await page.fill('input#password', password)
    await page.getByRole('button', {name: 'Ingresar'}).click()

    await expect(page).toHaveURL(/\/portal$/, {timeout: 8000})
  })
})
