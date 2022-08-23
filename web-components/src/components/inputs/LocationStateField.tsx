import React, { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import iso3166 from 'iso-3166-2';

import SelectTextField, { Option } from './SelectTextField';

interface FieldProps {
  country: string;
  name?: string;
  className?: string;
  optional?: boolean;
  initialSelection?: string;
}

const LocationStateField: React.FC<FieldProps> = ({
  country,
  name = 'stateProvince',
  className,
  optional = false,
  initialSelection,
}) => {
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (country === '') {
      // reset options when country no longer has a selected element
      setStateOptions([]);
      return;
    }

    const countrySubdivisions = iso3166.country(country);

    const options: Option[] = Object.keys(countrySubdivisions?.sub || {})
      .map(isoCode => ({
        value: isoCode,
        label: `${countrySubdivisions?.sub[isoCode].name} (${countrySubdivisions?.sub[isoCode].type})`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    if (!options || !Array.isArray(options)) return;

    // first, check initial selection (selected/persisted) or default empty value
    if (
      initialSelection &&
      options.some(opt => opt.value === initialSelection)
    ) {
      setFieldValue(name, initialSelection);
    } else {
      setFieldValue(name, '');
    }

    options.unshift({
      value: '',
      label: 'Please choose a state',
    });

    // finaly, set options
    setStateOptions(options);
  }, [country, setFieldValue, name, initialSelection]);

  return (
    <Field
      name={name}
      label="State / Region"
      options={stateOptions}
      component={SelectTextField}
      className={className}
      optional={optional}
      required={!optional}
    />
  );
};

export default LocationStateField;
