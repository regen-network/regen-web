import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Field, useFormikContext } from 'formik';

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

  const searchState = async (
    countryId: string,
  ): Promise<Option[] | [] | void> => {
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
        value: key.replace(/\"/g, ''),
        label: data.result[key],
      }));
      return options;
    }
  };

  useEffect(() => {
    if (country === '') {
      // reset options when country no longer has a selected element
      setStateOptions([]);
      return;
    }

    searchState(country).then(options => {
      if (!options || !Array.isArray(options)) return;

      // first, check initial selection (selected/persisted) or default empty value
      if (
        initialSelection &&
        options.some(opt => opt.value === initialSelection)
      ) {
        setFieldValue(name, initialSelection);
      } else {
        (options as Option[]).unshift({
          value: '',
          label: 'Please choose a state',
        });
        setFieldValue(name, '');
      }

      // finaly, set options
      setStateOptions(options);
    });
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
