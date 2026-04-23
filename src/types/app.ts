export type UserRole = 'admin' | 'teacher' | 'student'

export type AppUser = {
  id: number | string
  email: string
  role: UserRole
  firstName?: string | null
  lastName?: string | null
}
