'use server';
import { getPasswordResetTokenByToken } from '@/data/password-reset-data';
import { getUserByEmail } from '@/data/user';
import { NewPasswordScheme } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordScheme>,
  token: string | null
) => {
  if (!token) return { error: 'Missing the token' };
  const validatedFields = NewPasswordScheme.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid fields!' };
  const { newPassword } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: 'Invalid token!' };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: 'Token has expired' };
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: 'Email does not exist!' };
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  return { success: 'Password updated!' };
};
