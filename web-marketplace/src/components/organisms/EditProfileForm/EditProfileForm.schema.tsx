import { z } from 'zod';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { REQUIRED } from './EditProfileForm.constants';

const baseSchema = z.object({
  name: z.string(),
  profileImage: z.union([z.string(), z.null()]),
  backgroundImage: z.union([z.string(), z.null()]),
  description: z.string().max(160).optional(),
  websiteLink: z.union([z.literal(''), z.string().trim().url()]),
  twitterLink: z.union([z.literal(''), z.string().trim().url()]),
});

type CreateSchemaParams = {
  _: TranslatorType;
};

export const createEditProfileFormSchema = ({ _ }: CreateSchemaParams) =>
  baseSchema.superRefine((data, ctx) => {
    if (!data.name || data.name.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['name'],
        message: _(REQUIRED),
      });
    }
  });

export type EditProfileFormSchemaType = z.infer<typeof baseSchema>;
