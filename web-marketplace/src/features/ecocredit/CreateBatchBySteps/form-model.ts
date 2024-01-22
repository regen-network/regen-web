import {
  getValidationSchema,
  getValidationSchemaFields,
  initialValues as recipientsInitialValues,
} from 'web-components/src/components/form/RecipientsForm';

import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import {
  creditBasicsInitialValues,
  creditBasicsValidationSchema,
  creditBasicsValidationSchemaFields,
} from './CreateBatchMultiStepForm/CreditBasics';

// address prefix `regen` used to narrow address validation for recipients
const addressPrefix = chainInfo.bech32Config.bech32PrefixAccAddr;

const formModel = {
  formId: 'create-batch-form',
  steps: [
    {
      id: 'credit-basics', // type: fields
      name: 'Credit Basics',
      title: 'Create Credit Batch',
    },
    {
      id: 'recipients', // type: fields
      name: 'Recipient(s)',
      title: 'Recipients',
    },
    {
      id: 'review', // type: submit
      name: 'Review',
      title: 'Review',
    },
    {
      id: 'finished', // type: result
      name: 'Finished',
      resultTitle: {
        success: 'Credits have been issued!',
        error: 'Sorry, your transaction was not successful.',
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
};

export default formModel;
