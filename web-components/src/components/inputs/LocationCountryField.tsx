import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';

import SelectTextField, { Option } from './SelectTextField';
import { countries } from './countries';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiInputBase-formControl': {
      marginTop: theme.spacing(2.25),
    },
  },
}));

const LocationCountryField: React.FC = () => {
  const styles = useStyles();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const countriesWithEmpty = Object.keys(countries).map(key => ({
      value: key,
      label: countries[key],
    }));
    countriesWithEmpty.unshift({ value: '', label: 'Please choose a country' });
    setOptions(countriesWithEmpty);
  }, []);

  return (
    <Field
      name="country"
      label="Country"
      component={SelectTextField}
      className={styles.textField}
      options={options}
    />
  );
};

export default LocationCountryField;
