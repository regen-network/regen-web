import { forwardRef, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import FieldFormControl from 'web-components/lib/components/inputs/new/FieldFormControl/FieldFormControl';
import { UseStateSetter } from 'web-components/lib/types/react/useState';

import { useWallet } from 'lib/wallet/wallet';

import { PartiesByAccountIdQuery } from '../../../../../generated/graphql';
import { DEFAULT_PROFILE_TYPE } from '../../../../../pages/ProfileEdit/ProfileEdit.constants';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { useDebounce } from './hooks/useDebounce';
import { useSaveProfile } from './hooks/useSaveProfile';
import { PLACEHOLDER } from './RoleField.constants';
import { RoleFieldGroup } from './RoleField.Group';
import { RoleFieldOption } from './RoleField.Option';
import { useStyles } from './RoleField.styles';
import {
  getIsOptionEqualToValue,
  getOptionLabel,
  getOptions,
  getParties,
  getValue,
  isProfile,
} from './RoleField.utils';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  description?: string;
  label?: string;
  optional?: boolean | string;
  setDebouncedValue: UseStateSetter<string>;
  setValue: (value: ProfileModalSchemaType | null) => void;
  value?: ProfileModalSchemaType | null;
  partiesByAccountId?: PartiesByAccountIdQuery | null;
  parties?: any;
}

export const RoleField = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      classes,
      label,
      optional,
      description,
      setValue,
      value,
      setDebouncedValue,
      partiesByAccountId,
      parties,
    }: Props,
    ref,
  ) => {
    const { classes: styles, cx } = useStyles();
    const { accountId } = useWallet();
    const [options, setOptions] = useState<readonly ProfileModalSchemaType[]>(
      [],
    );
    const [profileAdd, setProfileAdd] = useState<ProfileModalSchemaType | null>(
      null,
    );
    const [inputValue, setInputValue] = useState<string>('');
    const debouncedValue = useDebounce(inputValue);

    useEffect(() => setDebouncedValue(debouncedValue));

    useEffect(() => {
      if (inputValue === '') {
        const yourProfiles = getParties(
          partiesByAccountId?.accountById?.partiesByAccountId?.nodes,
        );
        setOptions([
          {
            id: '',
            profileType: DEFAULT_PROFILE_TYPE,
            profileImage: '',
            name: PLACEHOLDER,
          },
          ...yourProfiles,
        ]);
        return;
      }

      const searchProfiles = getParties(parties?.getPartiesByNameOrAddr?.nodes);
      setOptions(searchProfiles);
    }, [
      inputValue,
      parties,
      partiesByAccountId?.accountById?.partiesByAccountId?.nodes,
      value,
    ]);

    const closeProfileModal = (): void => {
      setProfileAdd(null);
    };
    const saveProfile = useSaveProfile({ setValue, closeProfileModal });

    return (
      <div className={cx(styles.root, classes && classes.root)}>
        <FieldFormControl
          className={className}
          label={label}
          optional={optional}
          description={description}
        >
          <Autocomplete
            id="role-field"
            ref={ref}
            classes={{
              inputRoot: styles.input,
              paper: styles.paper,
              popupIndicator: styles.popupIndicator,
            }}
            onChange={(event, newValue, reason) => {
              if (newValue && isProfile(newValue)) {
                setValue(newValue);
                setInputValue('');
              }
              if (reason === 'clear') {
                setValue(null);
              }
            }}
            onInputChange={(event, newInputValue) => {
              if (event) setInputValue(newInputValue);
            }}
            renderInput={params => (
              <TextField
                {...params}
                placeholder={PLACEHOLDER}
                variant="outlined"
              />
            )}
            value={getValue(value, accountId)}
            isOptionEqualToValue={getIsOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            renderOption={(props, option) => (
              <RoleFieldOption props={props} option={option} />
            )}
            filterOptions={x => x}
            options={getOptions(options, setProfileAdd, accountId)}
            groupBy={option => (isProfile(option) ? option.group : '')}
            renderGroup={params => <RoleFieldGroup params={params} />}
            autoComplete
          />
        </FieldFormControl>
        {profileAdd && (
          <ProfileModal
            initialValues={profileAdd}
            onClose={closeProfileModal}
            onSubmit={saveProfile}
          />
        )}
      </div>
    );
  },
);
