import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Field } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';

import SelectTextField, { Option } from './SelectTextField';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiInputBase-formControl': {
      marginTop: theme.spacing(2.25),
    },
  },
}));

interface FieldProps {
  country: string;
  triggerOnChange: (stateCountry: string) => void;
}

const LocationStateField: React.FC<FieldProps> = ({
  country,
  triggerOnChange,
}) => {
  const styles = useStyles();

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
    searchState(country);
  }, [country]);

  return (
    <Field
      options={stateOptions}
      component={SelectTextField}
      className={styles.textField}
      triggerOnChange={triggerOnChange}
      label="State / Region"
      name="stateProvince"
      optional
    />
  );
};

export default LocationStateField;
