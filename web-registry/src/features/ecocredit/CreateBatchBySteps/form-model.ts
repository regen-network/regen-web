import {
  creditBasicsValidationSchema,
  creditBasicsInitialValues,
} from './CreateBatchMultiStepForm';
import {
  validationSchema as recipientsValidationSchema,
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
      percentage: 30,
    },
    {
      id: 'recipients', // type: fields
      name: 'Recipient(s)',
      title: 'Recipients',
      percentage: 55,
    },
    {
      id: 'review', // type: submit
      name: 'Review',
      title: 'Review',
      percentage: 85,
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
  initialValues: {
    ...creditBasicsInitialValues,
    ...recipientsInitialValues,
  },
};

export default formModel;
