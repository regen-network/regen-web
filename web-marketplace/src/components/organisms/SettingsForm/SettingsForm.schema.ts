import { msg } from '@lingui/macro';
import { z } from 'zod';

import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  getIsOnChainId,
  getIsUuid,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

export const getSettingsFormSchema = (_: TranslatorType) =>
  z.object({
    slug: z
      .string()
      .refine(value => !getIsOnChainId(value), {
        message: _(msg`Slug can't be set to an on-chain project ID`),
      })
      .refine(value => !getIsUuid(value), {
        message: _(msg`Slug can't be set to a UUID`),
      }),
  });

export type SettingsFormSchemaType = z.infer<
  ReturnType<typeof getSettingsFormSchema>
>;
