import { forwardRef, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import FieldFormControl from 'web-components/lib/components/inputs/new/FieldFormControl/FieldFormControl';
import { UseStateSetter } from 'web-components/lib/types/react/useState';

import {
  GetPartiesByNameOrAddrQuery,
  PartiesByAccountIdQuery,
} from '../../../../../generated/graphql';
import { DEFAULT_PROFILE_TYPE } from '../../../../../pages/ProfileEdit/ProfileEdit.constants';
import { useDebounce } from '../../hooks/useDebounce';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { ALL_PROFILES, PLACEHOLDER } from './RoleField.constants';
import { RoleFieldGroup } from './RoleField.Group';
import { RoleFieldOption } from './RoleField.Option';
import { useStyles } from './RoleField.styles';
import { Option } from './RoleField.types';
import {
  getIsOptionEqualToValue,
  getOptionLabel,
  getOptions,
  getParties,
  getValue,
  groupOptions,
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
  parties?: GetPartiesByNameOrAddrQuery | null;
  saveProfile: (profile: ProfileModalSchemaType) => Promise<string | undefined>;
  accountId?: string;
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
      saveProfile,
      accountId,
    }: Props,
    ref,
  ) => {
    const { classes: styles, cx } = useStyles();
    const [options, setOptions] = useState<Option[]>([]);
    const [profileAdd, setProfileAdd] = useState<ProfileModalSchemaType | null>(
      null,
    );
    const [inputValue, setInputValue] = useState<string>(value?.name || '');
    const debouncedValue = useDebounce(inputValue);

    useEffect(
      () => setDebouncedValue(debouncedValue),
      [debouncedValue, setDebouncedValue],
    );

    useEffect(() => {
      const yourProfiles = getParties(
        partiesByAccountId?.accountById?.partiesByAccountId?.nodes,
      );
      const valueArr = value
        ? yourProfiles.find(p => p.id === value.id)
          ? []
          : [value]
        : [];
      if (inputValue === '' || (value && value.name === inputValue)) {
        setOptions(
          groupOptions(
            [
              {
                id: '',
                profileType: DEFAULT_PROFILE_TYPE,
                profileImage: '',
                name: PLACEHOLDER,
              },
              ...yourProfiles,
              ...valueArr,
            ],
            accountId,
          ),
        );
        return;
      }

      const searchProfiles = getParties(parties?.getPartiesByNameOrAddr?.nodes);
      setOptions(groupOptions([...searchProfiles, ...valueArr], accountId));
    }, [
      accountId,
      inputValue,
      parties,
      partiesByAccountId?.accountById?.partiesByAccountId?.nodes,
      value,
    ]);
    const closeProfileModal = (): void => {
      setProfileAdd(null);
    };

    const valueWithGroup = getValue(value, accountId);

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
              }
              if (reason === 'clear') {
                setValue(null);
              }
            }}
            onInputChange={(event, newInputValue) => {
              if (event) {
                event.stopPropagation();
                setInputValue(newInputValue);
              }
            }}
            renderInput={params => (
              <TextField
                {...params}
                placeholder={PLACEHOLDER}
                variant="outlined"
              />
            )}
            inputValue={inputValue}
            value={valueWithGroup}
            isOptionEqualToValue={getIsOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            renderOption={(props, option) =>
              valueWithGroup &&
              getIsOptionEqualToValue(option, valueWithGroup) &&
              valueWithGroup.group === ALL_PROFILES ? null : (
                <RoleFieldOption option={option} {...props} key={props.id} />
              )
            }
            filterOptions={x => x}
            options={getOptions(options, setProfileAdd)}
            groupBy={option => (isProfile(option) ? option.group : '')}
            renderGroup={params => (
              <RoleFieldGroup key={params.group} params={params} />
            )}
            autoComplete
          />
        </FieldFormControl>
        {profileAdd && (
          <ProfileModal
            initialValues={profileAdd}
            onClose={closeProfileModal}
            onSubmit={async profile => {
              const id = await saveProfile(profile);
              if (id) {
                closeProfileModal();
                setInputValue(profile.name);
                setValue({ id, ...profile });
              }
            }}
          />
        )}
      </div>
    );
  },
);
