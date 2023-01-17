import { initialValues as initialValuesRetire } from 'web-components/lib/components/form/CreditRetireForm';

export const creditSendFormInitialValues = {
  recipient: '',
  totalAmount: 0,
  withRetire: false,
  ...initialValuesRetire,
  agreeErpa: false,
};
