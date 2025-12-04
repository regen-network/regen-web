import { z } from 'zod';

export const personalProfileSchema = z.object({
  name: z.string().min(1),
  profileImage: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  description: z.string().max(160).optional().nullable(),
});
export type PersonalProfileSchemaType = z.infer<typeof personalProfileSchema>;
