import { z } from 'zod';

export const signModalSchema = z.object({
  verified: z.boolean().refine(value => !!value),
});

export type SignModalSchemaType = z.infer<typeof signModalSchema>;
