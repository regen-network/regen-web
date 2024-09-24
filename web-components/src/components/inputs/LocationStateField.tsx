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
  placeholderLabel: string;
}

const LocationStateField: React.FC<React.PropsWithChildren<FieldProps>> = ({
  country,
  name = 'stateProvince',
  className,
  label,
  optional = false,
  initialSelection,
  placeholderLabel,
}) => {
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const options = getCountrySubdivisionOptions(country, placeholderLabel);
    const isValidSelection: boolean =
      !!initialSelection &&
      options.some((opt: Option) => opt.value === initialSelection);

    setFieldValue(name, isValidSelection ? initialSelection : '');
    setStateOptions(options);
  }, [country, setFieldValue, name, initialSelection, placeholderLabel]);

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
