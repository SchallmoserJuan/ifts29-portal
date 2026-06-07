import {cleanup, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      takeRecords = vi.fn(() => [])
      root = null
      rootMargin = ''
      thresholds: number[] = []
    },
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

// ---------------------------------------------------------------------------
// ContactForm
// ---------------------------------------------------------------------------

describe('ContactForm', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders the form with all inputs and submit button', async () => {
    const {ContactForm} = await import(
      '@/src/components/contacto/contact-form'
    )
    render(<ContactForm />)

    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Asunto')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensaje / Consulta')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: 'Enviar consulta'}),
    ).toBeInTheDocument()
  })

  it('shows success message when the API responds OK', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({success: true}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    const {ContactForm} = await import(
      '@/src/components/contacto/contact-form'
    )
    render(<ContactForm />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Nombre completo'), 'Juan Perez')
    await user.type(screen.getByLabelText('Correo Electrónico'), 'juan@test.com')
    await user.type(screen.getByLabelText('Asunto'), 'Consulta')
    await user.type(screen.getByLabelText('Mensaje / Consulta'), 'Mensaje de prueba')
    await user.click(screen.getByRole('button', {name: 'Enviar consulta'}))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('enviado con éxito')
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: expect.any(String),
    })
  })

  it('shows error message when the API returns a non-OK response', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({error: 'Server error'}), {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    const {ContactForm} = await import(
      '@/src/components/contacto/contact-form'
    )
    render(<ContactForm />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Nombre completo'), 'Juan Perez')
    await user.type(screen.getByLabelText('Correo Electrónico'), 'juan@test.com')
    await user.type(screen.getByLabelText('Asunto'), 'Consulta')
    await user.type(screen.getByLabelText('Mensaje / Consulta'), 'Mensaje')
    await user.click(screen.getByRole('button', {name: 'Enviar consulta'}))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'No se pudo enviar el mensaje',
      )
    })
  })

  it('shows error message when the fetch throws', async () => {
    fetchMock.mockRejectedValue(new Error('Network error'))

    const {ContactForm} = await import(
      '@/src/components/contacto/contact-form'
    )
    render(<ContactForm />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Nombre completo'), 'Juan Perez')
    await user.type(screen.getByLabelText('Correo Electrónico'), 'juan@test.com')
    await user.type(screen.getByLabelText('Asunto'), 'Consulta')
    await user.type(screen.getByLabelText('Mensaje / Consulta'), 'Mensaje')
    await user.click(screen.getByRole('button', {name: 'Enviar consulta'}))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'No se pudo enviar el mensaje',
      )
    })
  })

  it('disables the button while loading', async () => {
    fetchMock.mockImplementation(
      () =>
        new Promise(() => {}), // never resolves
    )

    const {ContactForm} = await import(
      '@/src/components/contacto/contact-form'
    )
    render(<ContactForm />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Nombre completo'), 'Juan Perez')
    await user.type(screen.getByLabelText('Correo Electrónico'), 'juan@test.com')
    await user.type(screen.getByLabelText('Asunto'), 'Consulta')
    await user.type(screen.getByLabelText('Mensaje / Consulta'), 'Mensaje')
    await user.click(screen.getByRole('button', {name: 'Enviar consulta'}))

    expect(
      screen.getByRole('button', {name: 'Procesando envío...'}),
    ).toBeDisabled()
  })
})
