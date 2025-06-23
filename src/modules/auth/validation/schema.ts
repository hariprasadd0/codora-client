import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});
export const newPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type SignUpForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type PasswordReset = z.infer<typeof passwordResetSchema>;
export type PasswordCreation = z.infer<typeof newPasswordSchema>;
