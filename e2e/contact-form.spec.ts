import {expect, test} from '@playwright/test'

const VALID_FORM = {
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  asunto: 'Consulta sobre la carrera',
  mensaje: 'Quisiera saber más sobre los requisitos de inscripción.',
}

async function fillForm(page: import('@playwright/test').Page, data = VALID_FORM) {
  await page.fill('input[name="nombre"]', data.nombre)
  await page.fill('input[name="email"]', data.email)
  await page.fill('input[name="asunto"]', data.asunto)
  await page.fill('textarea[name="mensaje"]', data.mensaje)
}

// ---------------------------------------------------------------------------
// Formulario de contacto — estructura
// ---------------------------------------------------------------------------

test.describe('Formulario de contacto — estructura', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/contacto')
  })

  test('renderiza todos los campos requeridos', async ({page}) => {
    await expect(page.locator('input[name="nombre"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="asunto"]')).toBeVisible()
    await expect(page.locator('textarea[name="mensaje"]')).toBeVisible()
    await expect(page.getByRole('button', {name: 'Enviar consulta'})).toBeVisible()
  })

  test('todos los campos tienen el atributo required', async ({page}) => {
    await expect(page.locator('input[name="nombre"]')).toHaveAttribute('required', '')
    await expect(page.locator('input[name="email"]')).toHaveAttribute('required', '')
    await expect(page.locator('input[name="asunto"]')).toHaveAttribute('required', '')
    await expect(page.locator('textarea[name="mensaje"]')).toHaveAttribute('required', '')
  })

  test('el campo email tiene type="email"', async ({page}) => {
    await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email')
  })

  test('es accesible sin autenticación', async ({page}) => {
    await expect(page).toHaveURL(/\/contacto/)
    await expect(page).not.toHaveURL(/\/login/)
  })
})

// ---------------------------------------------------------------------------
// Formulario de contacto — envío exitoso
// ---------------------------------------------------------------------------

test.describe('Formulario de contacto — envío exitoso', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/contacto')
  })

  test('muestra mensaje de éxito al enviar datos válidos', async ({page}) => {
    await fillForm(page)
    await page.getByRole('button', {name: 'Enviar consulta'}).click()

    await expect(page.locator('div.bg-green-50')).toBeVisible({timeout: 8000})
    await expect(page.locator('div.bg-green-50')).toContainText('Mensaje enviado')
  })

  test('el formulario se resetea después del envío exitoso', async ({page}) => {
    await fillForm(page)
    await page.getByRole('button', {name: 'Enviar consulta'}).click()

    await expect(page.locator('div.bg-green-50')).toBeVisible({timeout: 8000})

    await expect(page.locator('input[name="nombre"]')).toHaveValue('')
    await expect(page.locator('input[name="email"]')).toHaveValue('')
    await expect(page.locator('input[name="asunto"]')).toHaveValue('')
    await expect(page.locator('textarea[name="mensaje"]')).toHaveValue('')
  })

  test('el botón muestra texto de carga durante el envío', async ({page}) => {
    await fillForm(page)

    await Promise.all([
      expect(page.getByRole('button', {name: 'Procesando envío...'})).toBeVisible(),
      page.getByRole('button', {name: 'Enviar consulta'}).click(),
    ])
  })
})

// ---------------------------------------------------------------------------
// Formulario de contacto — error en el servidor
// ---------------------------------------------------------------------------

test.describe('Formulario de contacto — error en el servidor', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/contacto')
  })

  test('muestra mensaje de error cuando la API falla', async ({page}) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({status: 500, body: JSON.stringify({error: 'Error interno'})}),
    )

    await fillForm(page)
    await page.getByRole('button', {name: 'Enviar consulta'}).click()

    await expect(page.locator('div.bg-red-50')).toBeVisible({timeout: 5000})
    await expect(page.locator('div.bg-red-50')).toContainText('No se pudo enviar')
  })

  test('el botón vuelve a estar habilitado después de un error', async ({page}) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({status: 500, body: JSON.stringify({error: 'Error interno'})}),
    )

    await fillForm(page)
    await page.getByRole('button', {name: 'Enviar consulta'}).click()

    await expect(page.locator('div.bg-red-50')).toBeVisible({timeout: 5000})
    await expect(page.getByRole('button', {name: 'Enviar consulta'})).toBeEnabled()
  })
})
