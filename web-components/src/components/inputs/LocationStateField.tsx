import React, { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';

import { getCountrySubdivisionOptions } from '../../utils/locationStandard';
import SelectTextField, { Option } from './SelectTextField';

interface FieldProps {
  country: string;
  name?: string;
  className?: string;
  optional?: boolean;
  initialSelection?: string;
  label: string;
}

const LocationStateField: React.FC<React.PropsWithChildren<FieldProps>> = ({
  country,
  name = 'stateProvince',
  className,
  label,
  optional = false,
  initialSelection,
}) => {
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const options = getCountrySubdivisionOptions(country);
    const isValidSelection: boolean =
      !!initialSelection &&
      options.some((opt: Option) => opt.value === initialSelection);

    setFieldValue(name, isValidSelection ? initialSelection : '');
    setStateOptions(options);
  }, [country, setFieldValue, name, initialSelection]);

  return (
    <Field
      name={name}
      label={label}
      options={stateOptions}
      component={SelectTextField}
      className={className}
      optional={optional}
      required={!optional}
    />
  );
};

export default LocationStateField;
