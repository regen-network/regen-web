import React, { useState } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FieldProps } from 'formik';

import FieldFormControl from './FieldFormControl';
import { Label } from '../label';
import OrganizationIcon from '../icons/OrganizationIcon';
import UserIcon from '../icons/UserIcon';
import { AddOrganizationModal } from '../modal/AddOrganizationModal';
import { AddIndividualModal } from '../modal/AddIndividualModal';
const filter = createFilterOptions<RoleOptionType>();

const useStyles = makeStyles(theme => ({
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
  onSaveOrganization: (v: any) => Promise<any>;
  onSaveIndividual: (v: any) => Promise<any>;
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
  onSaveOrganization,
  onSaveIndividual,
  ...fieldProps
}) => {
  const styles = useStyles();
  const [organizationEdit, setOrganizationEdit] = useState<any | null>(null);
  const [newIndividualName, setNewIndividualName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { form, field } = fieldProps;

  const selectedValue = options && field.value && options.find(o => o.id === field.value);

  const saveOrganization = async (org: any): Promise<void> => {
    var savedOrg = await onSaveOrganization(org);
    closeOrganizationModal();
    form.setFieldValue(field.name, savedOrg.id);
  };

  const saveIndividual = async (person: any): Promise<void> => {
    var mintedPerson = await onSaveIndividual(person);
    closeIndividualModal();
    form.setFieldValue(field.name, mintedPerson.id);
  };

  const closeOrganizationModal = (): void => {
    setOrganizationEdit(null);
  };

  const closeIndividualModal = (): void => {
    setNewIndividualName('');
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
            debug={true}
            id="role-combo-box"
            classes={{
              inputRoot: styles.input,
              paper: styles.paper,
              popupIndicator: styles.popupIndicator,
            }}
            options={options || []}
            freeSolo
            forcePopupIcon
            selectOnFocus
            handleHomeEndKeys
            inputValue={(selectedValue && selectedValue.label) || inputValue}
            getOptionLabel={o => (o.label && getOptionLabel ? getOptionLabel(o) : '')} //todo
            getOptionSelected={o => o.id === field.value}
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
              <TextField {...props} placeholder="Start typing or choose entity" variant="outlined" />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push(
                  ((
                    <div
                      className={styles.add}
                      onClick={() => setOrganizationEdit({ legalName: params.inputValue })}
                    >
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
      {selectedValue && selectedValue.id && (
        <Button onClick={() => setOrganizationEdit(selectedValue)}>Edit</Button>
      )}
      {organizationEdit && (
        <AddOrganizationModal
          // open={organizationModalOpen}
          organization={organizationEdit}
          onClose={closeOrganizationModal}
          onSubmit={saveOrganization}
          mapboxToken={mapboxToken}
        />
      )}
      {newIndividualName && (
        <AddIndividualModal
          individualName={newIndividualName}
          onClose={closeIndividualModal}
          onSubmit={saveIndividual}
        />
      )}
    </>
  );
};

export { RoleField };
