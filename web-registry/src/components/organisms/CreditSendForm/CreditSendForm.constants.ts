import {
  CreditSendFormSchemaType,
  RetireFormSchemaType,
} from './CreditSendForm.schema';

export const initialValuesRetire: RetireFormSchemaType = {
  note: '',
  country: 'US',
  stateProvince: '',
  postalCode: '',
  retirementJurisdiction: '',
};

export const creditSendFormInitialValues: CreditSendFormSchemaType = {
  recipient: '',
  amount: 0,
  withRetire: false,
  agreeErpa: false,
  sender: '',
  retireFields: [],
};
