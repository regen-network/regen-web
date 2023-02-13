import { CreditSendFormSchemaType } from './CreditSendForm.schema';

export const creditSendFormInitialValues: CreditSendFormSchemaType = {
  recipient: '',
  amount: 0,
  withRetire: false,
  agreeErpa: false,
  sender: '',
  retireFields: [],
};
