import React, { useEffect, useState } from 'react';
import { Field } from 'formik';

import { getCountryOptions } from '../../utils/locationStandard';
import SelectTextField, { Option } from './SelectTextField';

interface FieldProps {
  className?: string;
  optional?: boolean;
  name?: string;
  exclude?: boolean;
  label: string;
  countryLabelPlaceholder: string;
}

const LocationCountryField: React.FC<React.PropsWithChildren<FieldProps>> = ({
  name = 'country',
  label,
  className,
  optional = false,
  exclude = false,
  countryLabelPlaceholder,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    setOptions(getCountryOptions({ exclude, countryLabelPlaceholder }));
  }, [exclude, countryLabelPlaceholder]);

  return (
    <Field
      name={name}
      label={label}
      component={SelectTextField}
      className={className}
      options={options}
      optional={optional}
    />
  );
};

export default LocationCountryField;
