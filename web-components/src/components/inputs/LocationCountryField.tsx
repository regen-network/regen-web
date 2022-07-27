import React, { useEffect, useState } from 'react';
import { Field } from 'formik';

import { countries } from '../../utils/countries';
import SelectTextField, { Option } from './SelectTextField';

interface FieldProps {
  className?: string;
  optional?: boolean;
  name?: string;
}

const LocationCountryField: React.FC<FieldProps> = ({
  className,
  optional = false,
  name = 'country',
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const countriesWithEmpty = Object.keys(countries).map(key => ({
      value: key,
      label: countries[key],
    }));
    countriesWithEmpty.unshift({ value: '', label: 'Please choose a country' });
    setOptions(countriesWithEmpty);
  }, []);

  return (
    <Field
      name={name}
      label="Country"
      component={SelectTextField}
      className={className}
      options={options}
      optional={optional}
    />
  );
};

export default LocationCountryField;
