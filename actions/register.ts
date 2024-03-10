'use server';
import * as z from 'zod';
import { RegisterScheme } from '../schemas/index';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (value: z.infer<typeof RegisterScheme>) => {
  const validatedFields = RegisterScheme.safeParse(value);
  if (!validatedFields.success) return { error: 'Invalid fields!' };
  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'The email already is taken' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: 'Confirm email sent!' };
};
