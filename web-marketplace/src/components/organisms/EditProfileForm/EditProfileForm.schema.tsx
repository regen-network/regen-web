import { z } from 'zod';

import { AccountType } from 'generated/graphql';

const baseSchema = z.object({
  profileType: z.nativeEnum(AccountType).optional(),
  name: z.string(),
  profileImage: z.string(),
  backgroundImage: z.string(),
  description: z.string().max(160).optional(),
  websiteLink: z.union([z.literal(''), z.string().trim().url()]),
  twitterLink: z.union([z.literal(''), z.string().trim().url()]),
});

type CreateSchemaParams = {
  requireProfileType?: boolean;
  requiredMessage?: string;
};

export const createEditProfileFormSchema = ({
  requireProfileType = true,
  requiredMessage = 'Required',
}: CreateSchemaParams = {}) =>
  baseSchema.superRefine((data, ctx) => {
    if (!data.name || data.name.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['name'],
        message: requiredMessage,
      });
    }

    if (requireProfileType && !data.profileType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['profileType'],
        message: requiredMessage,
      });
    }
  });

export const editProfileFormSchema = createEditProfileFormSchema();

export type EditProfileFormSchemaType = z.infer<typeof baseSchema>;
