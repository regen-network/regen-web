import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';
import TextField from './TextField';
import SelectTextField from './SelectTextField';

const useStyles = makeStyles((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
}));

interface Props extends FieldProps {
  className?: string;
  description?: string;
  label?: string;
  optional?: boolean;
  placeholder?: string;
  options?: any[];
  getOptionLabel?: (v: any) => string;
}

const RoleField: React.FC<Props> = ({
  className,
  label,
  options,
  getOptionLabel,
  optional,
  placeholder,
  ...fieldProps
}) => {
  // const [showResults, setShowResults] = useState(true);
  const { form, field } = fieldProps;

  // const entities = options.map((option) => {
  //   const category = option.
  //   return {
  //     category: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });

  const styles = useStyles();
  return (
    <FieldFormControl
      className={className}
      label={label}
      disabled={form.isSubmitting}
      optional={optional}
      {...fieldProps}
    >
      {({ handleChange, handleBlur }) => (
        <Autocomplete
          id="combo-box"
          options={options || []}
          getOptionLabel={getOptionLabel}
          // groupBy={option => option.type}
          style={{ width: 300 }}
          renderInput={props => (
            <SelectTextField
              {...props}
              {...fieldProps}
              placeholder="Start typing or choose entity"
              // onChange={handleChange}
              // onBlur={handleBlur}
              variant="outlined"
            />
          )}
          // renderInput={props => (
          //   <SelectTextField
          //     {...fieldProps}
          //     options={options || []}
          //     onChange={handleChange}
          //     onBlur={handleBlur}
          //   />
          // )}
        />
      )}
    </FieldFormControl>
  );
};

export { RoleField };
