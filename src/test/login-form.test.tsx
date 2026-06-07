import {cleanup, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

const mockRouterPush = vi.fn()
const mockSetUser = vi.fn()
const fetchMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({push: mockRouterPush}),
}))

vi.mock('@/src/context/auth-context', () => ({
  useAuth: () => ({setUser: mockSetUser}),
}))

import {LoginForm} from '@/src/components/login/login-form'

beforeEach(() => {
  fetchMock.mockReset()
  mockRouterPush.mockReset()
  mockSetUser.mockReset()
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

describe('LoginForm', () => {
  it('renders the form with email/dni and password inputs', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('DNI o Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contrasena')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Ingresar'})).toBeInTheDocument()
  })

  it('shows an error message when the API returns a non-OK response', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({errors: [{message: 'Credenciales inválidas'}]}), {
        status: 401,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    render(<LoginForm />)

    const identifierInput = screen.getByLabelText('DNI o Email')
    const passwordInput = screen.getByLabelText('Contrasena')

    await userEvent.type(identifierInput, 'test@ifts29.edu.ar')
    await userEvent.type(passwordInput, 'wrongpass')
    await userEvent.click(screen.getByRole('button', {name: 'Ingresar'}))

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
    })
  })

  it('shows a generic error when error response has no message', async () => {
    fetchMock.mockResolvedValue(
      new Response('Not Found', {
        status: 404,
      }),
    )

    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText('DNI o Email'), 'test@ifts29.edu.ar')
    await userEvent.type(screen.getByLabelText('Contrasena'), 'pass')
    await userEvent.click(screen.getByRole('button', {name: 'Ingresar'}))

    await waitFor(() => {
      expect(screen.getByText('No se pudo iniciar sesion.')).toBeInTheDocument()
    })
  })

  it('calls setUser with the user data on successful login', async () => {
    const userData = {id: 1, email: 'admin@ifts29.edu.ar', role: 'admin'}
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({user: userData}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText('DNI o Email'), 'admin@ifts29.edu.ar')
    await userEvent.type(screen.getByLabelText('Contrasena'), 'password')
    await userEvent.click(screen.getByRole('button', {name: 'Ingresar'}))

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith(userData)
    })
  })

  it('redirects student users to /portal/biblioteca', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({user: {id: 1, email: 'student@ifts29.edu.ar', role: 'student'}}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText('DNI o Email'), 'student@ifts29.edu.ar')
    await userEvent.type(screen.getByLabelText('Contrasena'), 'password')
    await userEvent.click(screen.getByRole('button', {name: 'Ingresar'}))

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/portal/biblioteca')
    })
  })

  it('redirects non-student users to /portal', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({user: {id: 1, email: 'admin@ifts29.edu.ar', role: 'admin'}}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText('DNI o Email'), 'admin@ifts29.edu.ar')
    await userEvent.type(screen.getByLabelText('Contrasena'), 'password')
    await userEvent.click(screen.getByRole('button', {name: 'Ingresar'}))

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/portal')
    })
  })

  it('redirects to /portal when response has no user data', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText('DNI o Email'), 'user@ifts29.edu.ar')
    await userEvent.type(screen.getByLabelText('Contrasena'), 'password')
    await userEvent.click(screen.getByRole('button', {name: 'Ingresar'}))

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/portal')
    })
    expect(mockSetUser).not.toHaveBeenCalled()
  })
})
