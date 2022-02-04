import React from 'react';
import { Formik, Form, Field } from 'formik';
import { requiredMessage, invalidAmount } from '../inputs/validation';
import AmountField from '../inputs/AmountField';
import LocationCountryField from '../inputs/LocationCountryField';
import LocationStateCountryField from '../inputs/LocationStateCountryField';
import ControlledTextField from '../inputs/ControlledTextField';

// TODO: sender and recipient types,
// with specific restrictions => valid Regen/Cosmos address
// type regenAddress | CosmosAddress = string;
// "regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4"

interface FormProps {
  sender: string;
}

interface FormValues {
  // sender: string;
  amount: number | undefined;
  country: string;
  stateCountry?: string | undefined;
  postalCode?: string | undefined;
}

interface FormErrors {
  // sender?: string;
  amount?: string;
  country?: string;
  stateCountry?: string;
  postalCode?: string;
}

const CreditRetireForm: React.FC<FormProps> = ({ sender }) => {
  const initialValues = {
    // sender,
    amount: undefined,
    country: 'US',
    stateCountry: undefined,
  };

  const validateHandler = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    // if (!values.sender) {
    //   errors.sender = requiredMessage;
    // }

    if (!values.country) {
      errors.country = requiredMessage;
    }

    // amount validation... order matters.
    // something weird with "===" strict comparision
    // TODO only positive number
    if (values.amount == 0) {
      errors.amount = invalidAmount;
    }
    if (!values.amount) {
      errors.amount = requiredMessage;
    }
    return errors;
  };

  const submitHandler = async (values: any): Promise<any> => {
    console.log('*** Submit', values);
  };

  const countryHandler = (countryCode: string): any => {
    console.log('*** country change', countryCode);
  };

  const stateCountryHandler = (stateCountry: string): any => {
    console.log('*** State / region country change', stateCountry);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={submitHandler}
    >
      {({
        values,
        // errors,
        // submitForm,
        // isSubmitting,
        // isValid,
        // submitCount,
        // setFieldValue,
        // status,
      }) => (
        <Form>
          {/* <Field
            disabled
            component={TextField}
            type="text"
            label="Sender"
            name="sender"
          /> */}
          <AmountField
            label={'Amount to retire'}
            available={{ amount: 1000, type: 'C01-20190101-20201010-02' }}
          />
          <LocationCountryField triggerOnChange={countryHandler} />
          <LocationStateCountryField
            country={values.country}
            triggerOnChange={stateCountryHandler}
          />

          <Field
            // className={cx(styles.field, styles.postalCodeField)}
            component={ControlledTextField}
            label="Postal Code"
            name="postalCode"
            optional
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreditRetireForm };
