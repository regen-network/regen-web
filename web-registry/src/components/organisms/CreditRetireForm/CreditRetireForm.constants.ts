import {
  CreditRetireFormSchemaType,
  RetireFormSchemaType,
} from './CreditRetireForm.schema';

export const initialValuesRetire: RetireFormSchemaType = {
  note: '',
  country: 'US',
  stateProvince: '',
  postalCode: '',
  retirementJurisdiction: '',
};

export const creditSendFormInitialValues: CreditRetireFormSchemaType = {
  recipient: '',
  amount: 0,
  withRetire: false,
  agreeErpa: false,
  sender: '',
  retireFields: [],
};
