import React from 'react';
import { Field } from 'formik';
import SelectTextField from './SelectTextField';
import { countries } from './countries';

interface FieldProps {
  triggerOnChange: (countryCode: string) => void;
  // triggerOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationCountryField: React.FC<FieldProps> = ({ triggerOnChange }) => {
  return (
    <Field
      component={SelectTextField}
      options={Object.keys(countries).map(key => ({
        value: key,
        label: countries[key],
      }))}
      name="country"
      label="Country"
      triggerOnChange={triggerOnChange}
    />
  );
};

export default LocationCountryField;
