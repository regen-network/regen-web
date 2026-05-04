import { msg } from '@lingui/core/macro';

import {
  getValidationSchema,
  getValidationSchemaFields,
  initialValues as recipientsInitialValues,
} from 'web-components/src/components/form/RecipientsForm';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import {
  CREATE_BATCH_FORM_MINIMUM_ERROR,
  CREATE_BATCH_FORM_REQUIRED_ERROR,
} from './CreateBatchMultiStepForm/CreateBatchMultiStepForm.constants';
import {
  creditBasicsInitialValues,
  getCreditBasicsValidationSchema,
  getCreditBasicsValidationSchemaFields,
  getJSONSchema,
  getVcsMetadataSchema,
} from './CreateBatchMultiStepForm/CreditBasics';

// address prefix `regen` used to narrow address validation for recipients
const addressPrefix = chainInfo.bech32Config.bech32PrefixAccAddr;

type GetFormModelParams = {
  requiredMessage: string;
  invalidRegenAddress: string;
  invalidAmount: string;
  invalidDate: string;
  invalidVCSRetirement: string;
  invalidJSON: string;
  vcsMetadataSchema: ReturnType<typeof getVcsMetadataSchema>;
  JSONSchema: ReturnType<typeof getJSONSchema>;
  _: TranslatorType;
};

export const getFormModel = ({
  requiredMessage,
  invalidRegenAddress,
  invalidAmount,
  invalidDate,
  invalidVCSRetirement,
  invalidJSON,
  vcsMetadataSchema,
  JSONSchema,
  _,
}: GetFormModelParams) => ({
  formId: 'create-batch-form',
  steps: [
    {
      id: 'credit-basics', // type: fields
      name: _(msg`Credit Basics`),
      title: _(msg`Create Credit Batch`),
    },
    {
      id: 'recipients', // type: fields
      name: _(msg`Recipient(s)`),
      title: _(msg`Recipients`),
    },
    {
      id: 'review', // type: submit
      name: _(msg`Review`),
      title: _(msg`Review`),
    },
    {
      id: 'finished', // type: result
      name: _(msg`Finished`),
      resultTitle: {
        success: _(msg`Credits have been issued!`),
        error: _(msg`Sorry, your transaction was not successful.`),
      },
    },
  ],
  validationSchema: [
    getCreditBasicsValidationSchema({
      requiredMessage,
      invalidDate,
      invalidVCSRetirement,
      invalidJSON,
    }),
    getValidationSchema({
      requiredMessage,
      invalidRegenAddress,
      invalidAmount,
      addressPrefix,
      requiredError: _(CREATE_BATCH_FORM_REQUIRED_ERROR),
      minimumError: _(CREATE_BATCH_FORM_MINIMUM_ERROR),
    }),
  ],
  validationSchemaFields: {
    ...getCreditBasicsValidationSchemaFields({
      invalidDate,
      vcsMetadataSchema,
      JSONSchema,
      requiredMessage,
    }),
    ...getValidationSchemaFields({
      requiredMessage,
      invalidRegenAddress,
      invalidAmount,
      addressPrefix,
      requiredError: _(CREATE_BATCH_FORM_REQUIRED_ERROR),
      minimumError: _(CREATE_BATCH_FORM_MINIMUM_ERROR),
    }),
  },
  initialValues: {
    ...creditBasicsInitialValues,
    ...recipientsInitialValues,
  },
});

export default getFormModel;
