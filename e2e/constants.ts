import path from 'path'

export const AUTH_STATE_DIR = path.join(process.cwd(), 'e2e', '.auth')

export const AUTH_FILES = {
  admin: path.join(AUTH_STATE_DIR, 'admin.json'),
  teacher: path.join(AUTH_STATE_DIR, 'teacher.json'),
  student: path.join(AUTH_STATE_DIR, 'student.json'),
}
