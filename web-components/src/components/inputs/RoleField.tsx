import React, { useState, useEffect } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FieldProps } from 'formik';

import FieldFormControl from './FieldFormControl';
import { Label } from '../label';
import OrganizationIcon from '../icons/OrganizationIcon';
import UserIcon from '../icons/UserIcon';
import OutlinedButton from '../buttons/OutlinedButton';
import { OrganizationModal } from '../modal/OrganizationModal';
import { IndividualModal } from '../modal/IndividualModal';
const filter = createFilterOptions<RoleOptionType>();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
  edit: {
    alignSelf: 'flex-end',
    border: 'none',
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
}));

interface Props extends FieldProps {
  className?: string;
  description?: string;
  label?: string;
  optional?: boolean;
  placeholder?: string;
  options?: any[];
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
  optional,
  placeholder,
  mapboxToken,
  onSaveOrganization,
  onSaveIndividual,
  ...fieldProps
}) => {
  const styles = useStyles();
  const [organizationEdit, setOrganizationEdit] = useState<any | null>(null);
  const [individualEdit, setIndividualEdit] = useState<any | null>(null);
  const [value, setValue] = useState({});
  const { form, field } = fieldProps;

  const selectedValue = options && field.value && options.find(o => o.id === field.value);

  useEffect(() => {
    const selectedValue = options && field.value && options.find(o => o.id === field.value);
    setValue(selectedValue);
  }, [field.value, options]);

  const saveOrganization = async (org: any): Promise<void> => {
    var savedOrg = await onSaveOrganization(org);
    closeOrganizationModal();
    form.setFieldValue(field.name, savedOrg.id);
  };

  const saveIndividual = async (person: any): Promise<void> => {
    var savedPerson = await onSaveIndividual(person);
    closeIndividualModal();
    form.setFieldValue(field.name, savedPerson.id);
  };

  const closeOrganizationModal = (): void => {
    setOrganizationEdit(null);
  };

  const closeIndividualModal = (): void => {
    setIndividualEdit(null);
  };

  const editEntity = (entity: any): void => {
    if (entity.type === 'organization') {
      setOrganizationEdit(entity);
    } else {
      setIndividualEdit(entity);
    }
  };

  return (
    <div className={styles.root}>
      <FieldFormControl
        className={className}
        label={label}
        disabled={form.isSubmitting}
        optional={optional}
        {...fieldProps}
      >
        {({ handleChange, handleBlur }) => (
          <Autocomplete
            id="role-combo-box"
            classes={{
              inputRoot: styles.input,
              paper: styles.paper,
              popupIndicator: styles.popupIndicator,
            }}
            options={options || []}
            forcePopupIcon
            value={value}
            getOptionLabel={o => o.label || ''}
            getOptionSelected={o => o.id === field.value}
            renderOption={o => o.label || o}
            onChange={(event, newValue, reason) => {
              if (reason === 'select-option') {
                handleChange(newValue.id);
              } else if (typeof newValue === 'string') {
                setValue({
                  label: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  label: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            onBlur={handleBlur}
            renderInput={props => (
              <TextField {...props} placeholder="Start typing or choose entity" variant="outlined" />
            )}
            filterOptions={(options, state) => {
              const filtered = filter(options, state) as RoleOptionType[];

              // Suggest the creation of a new value
              filtered.push(
                ((
                  <div
                    className={styles.add}
                    onClick={e => {
                      e.stopPropagation();
                      setOrganizationEdit({ legalName: state.inputValue });
                    }}
                  >
                    <OrganizationIcon />
                    <Label className={styles.label}>+ Add New Organization</Label>
                  </div>
                ) as unknown) as RoleOptionType,
              );
              filtered.push(
                ((
                  <div
                    className={styles.add}
                    onClick={e => {
                      e.stopPropagation();
                      setIndividualEdit({ name: state.inputValue });
                    }}
                  >
                    <UserIcon />
                    <Label className={styles.label}>+ Add New Individual</Label>
                  </div>
                ) as unknown) as RoleOptionType,
              );
              return filtered;
            }}
          />
        )}
      </FieldFormControl>
      {selectedValue && selectedValue.id && (
        <OutlinedButton className={styles.edit} onClick={() => editEntity(selectedValue)}>
          edit entity
        </OutlinedButton>
      )}
      {organizationEdit && (
        <OrganizationModal
          organization={organizationEdit}
          onClose={closeOrganizationModal}
          onSubmit={saveOrganization}
          mapboxToken={mapboxToken}
        />
      )}
      {individualEdit && (
        <IndividualModal
          individual={individualEdit}
          onClose={closeIndividualModal}
          onSubmit={saveIndividual}
        />
      )}
    </div>
  );
};

export { RoleField };
