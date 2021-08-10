import React, { useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FieldProps } from 'formik';

import FieldFormControl from './FieldFormControl';
import { Label } from '../label';
// import TextField from '../inputs/TextField';
import Input from '../inputs/Input';
import OrganizationIcon from '../icons/OrganizationIcon';
import UserIcon from '../icons/UserIcon';
import { AddOrganizationModal } from '../modal/AddOrganizationModal';
import { AddIndividualModal } from '../modal/AddIndividualModal';
const filter = createFilterOptions<RoleOptionType>();

const useStyles = makeStyles(theme => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
  add: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(2),
  },
  input: {
    borderRadius: 2,
  },
  paper: {
    borderRadius: 2,
  },
  popupIndicator: {
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
  onAddOrganization: (v: any) => Promise<any>;
  onAddIndividual: (v: any) => Promise<any>;
  mapboxToken: string;
}

interface RoleOptionType {
  inputValue?: string;
  label: string;
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
  onAddIndividual,
  ...fieldProps
}) => {
  const styles = useStyles();
  const [newOrganizationName, setNewOrganizationName] = useState('');
  const [newIndividualName, setNewIndividualName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { form, field } = fieldProps;

  const selectedValue = options && field.value && options.find(o => o.id === field.value);

  const addOrganization = async (org: any): Promise<void> => {
    var mintedOrg = await onAddOrganization(org);
    closeOrganizationModal();
    form.setFieldValue(field.name, mintedOrg.id);
  };

  const addIndividual = async (person: any): Promise<void> => {
    var mintedPerson = await onAddIndividual(person);
    closeIndividualModal();
    form.setFieldValue(field.name, mintedPerson.id);
  };

  const closeOrganizationModal = (): void => {
    setNewOrganizationName('');
  };

  const closeIndividualModal = (): void => {
    setNewIndividualName('');
  };

  // const openOrganizationModal = (inputValue: string, event?: any): void => {
  //   console.log('openOrganizationModal', inputValue);
  //   if (event) event.stopPropagation();
  //   setNewOrganizationName(inputValue);
  // };

  // const openIndividualModal = (inputValue: string, event?: any): void => {
  //   console.log('openIndividualModal', inputValue);
  //   if (event) event.stopPropagation();
  //   setNewIndividualName(inputValue);
  // };

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
            debug={true}
            id="role-combo-box"
            classes={{
              inputRoot: styles.input,
              paper: styles.paper,
              popupIndicator: styles.popupIndicator
            }}
            options={options || []}
            freeSolo
            forcePopupIcon
            selectOnFocus
            handleHomeEndKeys
            inputValue={(selectedValue && selectedValue.label) || inputValue}
            getOptionLabel={o => (o.label && getOptionLabel ? getOptionLabel(o) : '')} //
            getOptionSelected={(o, v) => o.id === field.value}
            renderOption={o => o.label || o}
            onChange={(event, value, reason) => {
              if (value && value.id) handleChange(value.id);
              if (reason === 'clear') handleChange(value);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onBlur={handleBlur}
            renderInput={props => (
              <TextField
                {...props}
                placeholder="Start typing or choose entity"
                variant="outlined"
                // InputProps={{endAdornment: }}
              />
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
                    <div className={styles.add} onClick={() => setNewIndividualName(params.inputValue)}>
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
      {newIndividualName && (
        <AddIndividualModal
          individualName={newIndividualName}
          onClose={closeIndividualModal}
          onSubmit={addIndividual}
        />
      )}
    </>
  );
};

export { RoleField };
