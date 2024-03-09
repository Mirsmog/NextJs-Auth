import * as z from 'zod'
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' })
})
export const RegisterScheme = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password too short' }),
  name: z.string().min(3, { message: 'Name is required' })
})