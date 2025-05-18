import { z } from 'zod';

export const userProfilePreferenceSchema = z.enum([
  'MORNING',
  'AFTERNOON',
  'NIGHT',
]);

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  preference: userProfilePreferenceSchema,
});

export type UserProfileForm = z.infer<typeof userProfileSchema>;
