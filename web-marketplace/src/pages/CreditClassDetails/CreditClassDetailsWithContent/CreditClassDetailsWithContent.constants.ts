import { msg } from '@lingui/macro';

export const CREDIT_CLASS_TITLE = msg`Yes, I'm interested in buying credits for myself or my organization!`;
export const CREDIT_CLASS_NAME_LABEL = msg`Your full name`;
export const CREDIT_CLASS_EMAIL_LABEL = msg`Your email address`;
export const CREDIT_CLASS_ORG_NAME_LABEL = msg`Organization Name`;
export const CREDIT_CLASS_BUDGET_LABEL = msg`Budget`;
export const CREDIT_CLASS_PROJECT_TYPES_LABEL = msg`Which types of carbon credits projects are you interested in?`;
export const CREDIT_CLASS_ON_BEHALF_OF_LABEL = msg`I am interested in buying carbon credits on behalf of:`;
export const CREDIT_CLASS_USD_TEXT = msg`USD`;
export const CREDIT_CLASS_PROTEC_TYPES_OPTIONS = [
  {
    label: msg`All nature based carbon credits`,
    value: 'All nature based carbon credits',
  },
  {
    label: msg`Forestry-based credits`,
    value: 'Forestry-based credits',
  },
  {
    label: msg`Grasslands-based credits`,
    value: 'Grasslands-based credits',
  },
  {
    label: msg`Cropland-based credits`,
    value: 'Cropland-based credits',
  },
];
export const CREDIT_CLASS_ON_BEHALF_OF_OPTIONS = [
  {
    label: msg``,
    value: '',
  },
  {
    label: msg`Consumer/Individual/myself`,
    value: 'Consumer/Individual/myself',
  },
  {
    label: msg`Small or Medium Sized Business`,
    value: 'Small or Medium Sized Business',
  },
  {
    label: msg`Nonprofit`,
    value: 'Nonprofit',
  },
  {
    label: msg`Large Corporation`,
    value: 'Large Corporation',
  },
  {
    label: msg`Crypto Organization`,
    value: 'Crypto Organization',
  },
];
export const CREDIT_CLASS_SUBMIT_LABEL = msg`Submit`;
export const CREDIT_CLASS_SUBMIT_ERROR_TEXT = msg`Please correct the errors above`;
