import { z } from 'zod';

export const settingsFormSchema = z.object({
  slug: z.string(),
});

export type SettingsFormSchemaType = z.infer<typeof settingsFormSchema>;
