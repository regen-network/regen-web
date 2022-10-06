import React, { useEffect, useState } from 'react';
import { Field } from 'formik';

import { getCountryOptions } from '../../utils/locationStandard';
import SelectTextField, { Option } from './SelectTextField';

interface FieldProps {
  className?: string;
  optional?: boolean;
  name?: string;
  exclude?: boolean;
}

const LocationCountryField: React.FC<FieldProps> = ({
  name = 'country',
  className,
  optional = false,
  exclude = false,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    setOptions(getCountryOptions({ exclude }));
  }, [exclude]);

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
