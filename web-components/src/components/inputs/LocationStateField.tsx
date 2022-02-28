import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Field } from 'formik';

import SelectTextField, { Option } from './SelectTextField';

interface FieldProps {
  country: string;
  name?: string;
  className?: string;
  optional?: boolean;
}

const LocationStateField: React.FC<FieldProps> = ({
  country,
  name = 'stateProvince',
  className,
  optional = false,
}) => {
  const [stateOptions, setStateOptions] = useState<Option[]>([]);

  const searchState = async (countryId: string): Promise<void> => {
    const resp = await axios({
      url:
        'https://geodata.solutions/api/api.php?type=getStates&countryId=' +
        countryId,
      method: 'POST',
    });
    const respOK = resp && resp.status === 200;
    if (respOK) {
      const data = await resp.data;
      const options = Object.keys(data.result).map(key => ({
        value: data.result[key],
        label: data.result[key],
      }));
      options.unshift({ value: '', label: 'Please choose a state' });
      setStateOptions(options);
    }
  };

  useEffect(() => {
    if (country === '') {
      // reset options when country no longer has a selected element
      setStateOptions([]);
      return;
    }
    searchState(country);
  }, [country]);

  return (
    <Field
      name={name}
      label="State / Region"
      options={stateOptions}
      component={SelectTextField}
      className={className}
      optional={optional}
    />
  );
};

export default LocationStateField;
