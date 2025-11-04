import { z } from 'zod';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { emailFormSchema } from 'components/organisms/LoginModal/LoginModal.schema';

import { CREATE_ORG_PERSONAL_INFO_NAME_REQUIRED } from '../CreateOrganization.constants';

export const getPersonalInfoSchema = (_: TranslatorType) =>
  emailFormSchema.extend({
    email: emailFormSchema.shape.email.trim(),
    name: z
      .string()
      .trim()
      .min(1, { message: _(CREATE_ORG_PERSONAL_INFO_NAME_REQUIRED) }),
  });

export type PersonalInfoFormValues = z.infer<ReturnType<typeof getPersonalInfoSchema>>;
