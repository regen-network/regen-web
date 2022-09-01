import React, { useEffect, useState } from 'react';
import { Field } from 'formik';

import { getCountryOptions } from '../../utils/locationStandard';
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
    setOptions(getCountryOptions());
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
