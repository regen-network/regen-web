import { msg } from '@lingui/macro';

import {
  getValidationSchema,
  getValidationSchemaFields,
  initialValues as recipientsInitialValues,
} from 'web-components/src/components/form/RecipientsForm';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import {
  creditBasicsInitialValues,
  creditBasicsValidationSchema,
  creditBasicsValidationSchemaFields,
} from './CreateBatchMultiStepForm/CreditBasics';

// address prefix `regen` used to narrow address validation for recipients
const addressPrefix = chainInfo.bech32Config.bech32PrefixAccAddr;

const getFormModel = (_: TranslatorType) => ({
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
    creditBasicsValidationSchema,
    getValidationSchema(addressPrefix),
  ],
  validationSchemaFields: {
    ...creditBasicsValidationSchemaFields,
    ...getValidationSchemaFields(addressPrefix),
  },
  initialValues: {
    ...creditBasicsInitialValues,
    ...recipientsInitialValues,
  },
});

export default getFormModel;
