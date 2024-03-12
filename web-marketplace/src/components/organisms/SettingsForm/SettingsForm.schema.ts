import { getIsUuid } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { z } from 'zod';

export const settingsFormSchema = z.object({
  slug: z.string().refine(value => !getIsUuid(value), { message: `Slug can't be set to a UUID` }),
});

export type SettingsFormSchemaType = z.infer<typeof settingsFormSchema>;
