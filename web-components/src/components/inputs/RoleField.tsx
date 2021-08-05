import React, { useState } from 'react';
import { makeStyles, Theme, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';
// import TextField from './TextField';

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
  triggerOnChange?: (v: any) => Promise<void>;
}

const RoleField: React.FC<Props> = ({
  className,
  label,
  options,
  getOptionLabel,
  optional,
  placeholder,
  triggerOnChange,
  ...fieldProps
}) => {
  const { form, field } = fieldProps;

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
          onChange={(event, value, r) => {
            handleChange(value.id);
          }}
          onBlur={handleBlur}
          style={{ width: 300 }}
          renderInput={props => (
            <TextField {...props} placeholder="Start typing or choose entity" variant="outlined" />
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
