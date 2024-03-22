import * as z from 'zod';
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
});
export const RegisterScheme = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password too short' }),
  name: z.string().min(3, { message: 'Name is required' }),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
});
export const NewPasswordScheme = z.object({
  newPassword: z.string().min(6, { message: 'Password too short' }),
});
