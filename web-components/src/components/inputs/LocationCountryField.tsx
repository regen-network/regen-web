import React from 'react';
import { Field } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';

import SelectTextField from './SelectTextField';
import { countries } from './countries';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiInputBase-formControl': {
      marginTop: theme.spacing(2.25),
    },
  },
}));

interface FieldProps {
  triggerOnChange: (countryCode: string) => void;
  // triggerOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationCountryField: React.FC<FieldProps> = ({ triggerOnChange }) => {
  const styles = useStyles();

  return (
    <Field
      name="country"
      label="Country"
      component={SelectTextField}
      className={styles.textField}
      options={Object.keys(countries).map(key => ({
        value: key,
        label: countries[key],
      }))}
      triggerOnChange={triggerOnChange}
    />
  );
};

export default LocationCountryField;
