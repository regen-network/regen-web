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
  amount: 0,
  retireFields: [],
};
