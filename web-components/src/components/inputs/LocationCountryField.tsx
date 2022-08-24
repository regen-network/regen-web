import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import iso3166 from 'iso-3166-2';

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
    const countriesWithEmpty = Object.keys(iso3166.data)
      .map(key => ({
        value: key,
        label: iso3166.data[key].name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
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
