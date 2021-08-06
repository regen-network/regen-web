import React, { useState } from 'react';
import { makeStyles, Theme, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';
import { Label } from '../label';
import OrganizationIcon from '../icons/OrganizationIcon';
const filter = createFilterOptions<RoleOptionType>();

const useStyles = makeStyles((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
  addNews: {
    display: 'flex',
    flexDirection: 'column',
    // minHeight: 96.5, //
  },
  add: {
    display: 'flex',
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.secondary.main,
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

interface RoleOptionType {
  inputValue?: string;
  name: string;
  id?: number;
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
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          getOptionLabel={o => (o.name && getOptionLabel ? getOptionLabel(o) : '')} //
          renderOption={o => o.name || o}
          onChange={(event, value, r) => {
            handleChange(value.id);
          }}
          onBlur={handleBlur}
          style={{ width: 300 }}
          renderInput={props => (
            <TextField {...props} placeholder="Start typing or choose entity" variant="outlined" />
          )}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push(
                ((
                  <div className={styles.add} onClick={() => console.log('add org', params.inputValue)}>
                    <OrganizationIcon />
                    <Label className={styles.label}>+ Add New Organization</Label>
                  </div>
                ) as unknown) as RoleOptionType,
              );
              filtered.push(
                ((
                  <div className={styles.add} onClick={() => console.log('add indiv', params.inputValue)}>
                    icon<Label className={styles.label}>+ Add New Individual</Label>
                  </div>
                ) as unknown) as RoleOptionType,
              );
            }

            return filtered;
          }}
        />
      )}
    </FieldFormControl>
  );
};

export { RoleField };
