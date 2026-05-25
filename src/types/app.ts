export type UserRole = 'admin' | 'teacher' | 'student'
export type UserStatus = 'pending' | 'approved' | 'rejected'

export type AppUser = {
  id: number | string
  email: string
  dni: string
  role: UserRole
  status: UserStatus
  firstName?: string | null
  lastName?: string | null
}
