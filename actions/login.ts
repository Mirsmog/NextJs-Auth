"use server"
import * as z from 'zod'
import { LoginSchema } from '../schemas/index';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(value)
  if (!validatedFields.success) return { error: 'Invalid fields!' }
  const { email, password } = validatedFields.data
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': return { error: 'Invalid credentials!' }
        default: return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}