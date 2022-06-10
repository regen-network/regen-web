import {
  creditBasicsValidationSchema,
  creditBasicsValidationSchemaFields,
  creditBasicsInitialValues,
} from './CreateBatchMultiStepForm';
import {
  validationSchema as recipientsValidationSchema,
  validationSchemaFields as recipientsValidationSchemaFields,
  initialValues as recipientsInitialValues,
} from 'web-components/lib/components/form/RecipientsForm';

// TODO - typed data structure with multi-step types

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
  validationSchema: [creditBasicsValidationSchema, recipientsValidationSchema],
  validationSchemaFields: {
    ...creditBasicsValidationSchemaFields,
    ...recipientsValidationSchemaFields,
  },
  initialValues: {
    ...creditBasicsInitialValues,
    ...recipientsInitialValues,
  },
};

export default formModel;
