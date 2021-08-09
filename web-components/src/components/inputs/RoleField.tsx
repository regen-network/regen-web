import React, { useState } from 'react';
import { makeStyles, Theme, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';
import { Label } from '../label';
import OrganizationIcon from '../icons/OrganizationIcon';
import UserIcon from '../icons/UserIcon';
import { AddOrganizationModal } from '../modal/AddOrganizationModal';
const filter = createFilterOptions<RoleOptionType>();

const useStyles = makeStyles((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
  add: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(2),
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
  onAddOrganization: (v: any) => Promise<any>;
  mapboxToken: string;
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
  mapboxToken,
  onAddOrganization,
  ...fieldProps
}) => {
  const styles = useStyles();
  const [newOrganizationName, setNewOrganizationName] = useState('');
  const { form, field } = fieldProps;

  const addOrganization = async (org: any): Promise<void> => {
    var mintedOrg = await onAddOrganization(org);
    console.log('addOrganization mintedOrg', mintedOrg.id);
    form.setFieldValue(field.name, mintedOrg.id);
    closeOrganizationModal();
  };

  const closeOrganizationModal = (): void => {
    setNewOrganizationName('');
  };

  return (
    <>
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
            getOptionLabel={o => (o.legalName && getOptionLabel ? getOptionLabel(o) : '')} //
            renderOption={o => o.legalName || o}
            onChange={(event, value, reason) => {
              if (value && value.id) handleChange(value.id);
              handleChange(value);
            }}
            onBlur={handleBlur}
            renderInput={props => (
              <TextField {...props} placeholder="Start typing or choose entity" variant="outlined" />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push(
                  ((
                    <div className={styles.add} onClick={() => setNewOrganizationName(params.inputValue)}>
                      <OrganizationIcon />
                      <Label className={styles.label}>+ Add New Organization</Label>
                    </div>
                  ) as unknown) as RoleOptionType,
                );
                filtered.push(
                  ((
                    <div className={styles.add} onClick={() => console.log('add indiv', params.inputValue)}>
                      <UserIcon />
                      <Label className={styles.label}>+ Add New Individual</Label>
                    </div>
                  ) as unknown) as RoleOptionType,
                );
              }

              return filtered;
            }}
          />
        )}
      </FieldFormControl>
      {newOrganizationName && (
        <AddOrganizationModal
          organizationName={newOrganizationName}
          onClose={closeOrganizationModal}
          onSubmit={addOrganization}
          mapboxToken={mapboxToken}
        />
      )}
    </>
  );
};

export { RoleField };
