import { z } from 'zod';

export const emailFormSchema = z.object({
  email: z.string().email(),
});

export type EmailFormSchemaType = z.infer<typeof emailFormSchema>;
