import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Autocomplete, TextField } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import FieldFormControl from 'web-components/src/components/inputs/new/FieldFormControl/FieldFormControl';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useDebounce } from 'hooks/useDebounce';

import {
  AccountByIdQuery,
  GetAccountsByNameOrAddrQuery,
} from '../../../../../generated/graphql';
import { DEFAULT_PROFILE_TYPE } from '../../../../../legacy-pages/ProfileEdit/ProfileEdit.constants';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { ALL_PROFILES, PLACEHOLDER } from './RoleField.constants';
import { RoleFieldGroup } from './RoleField.Group';
import { RoleFieldOption } from './RoleField.Option';
import { useStyles } from './RoleField.styles';
import { Option } from './RoleField.types';
import {
  getAccounts,
  getIsOptionEqualToValue,
  getOptionLabel,
  getOptions,
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
  activeAccountId?: string;
  authenticatedAccounts?: Array<AccountByIdQuery['accountById']>;
  authenticatedAccountIds?: string[];
  accounts?: GetAccountsByNameOrAddrQuery | null;
  saveProfile: (
    profile: ProfileModalSchemaType,
    initialValue?: ProfileModalSchemaType | null,
  ) => Promise<{ id: string; creatorId: string } | undefined>;
  onUpload?: (imageFile: File) => Promise<{ url: string } | undefined>;
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
      authenticatedAccountIds,
      authenticatedAccounts,
      accounts,
      saveProfile,
      activeAccountId,
      onUpload,
    }: Props,
    ref,
  ) => {
    const { _ } = useLingui();
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
      const yourProfiles = getAccounts(_, authenticatedAccounts);
      const valueArr = value
        ? yourProfiles.find(p => p.id === value.id)
          ? []
          : [value]
        : [];
      if (inputValue === '' || (value && value.name === inputValue)) {
        setOptions(
          groupOptions(
            _,
            [
              {
                id: '',
                profileType: DEFAULT_PROFILE_TYPE,
                profileImage: '',
                name: _(PLACEHOLDER),
              },
              ...yourProfiles,
              ...valueArr,
            ],
            authenticatedAccountIds,
          ),
        );
        return;
      }

      const searchProfiles = getAccounts(
        _,
        accounts?.getAccountsByNameOrAddr?.nodes,
      );
      setOptions(
        groupOptions(
          _,
          [...searchProfiles, ...valueArr],
          authenticatedAccountIds,
        ),
      );
    }, [
      inputValue,
      accounts,
      value,
      authenticatedAccounts,
      authenticatedAccountIds,
      _,
    ]);

    const closeProfileModal = (): void => {
      setProfileAdd(null);
    };

    const valueWithGroup = getValue(_, value, authenticatedAccountIds);
    const getOptionLabelFunction = useMemo(() => getOptionLabel(_), [_]);

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
                placeholder={_(PLACEHOLDER)}
                variant="outlined"
              />
            )}
            inputValue={inputValue}
            value={valueWithGroup}
            isOptionEqualToValue={getIsOptionEqualToValue}
            getOptionLabel={getOptionLabelFunction}
            renderOption={(props, option) =>
              valueWithGroup &&
              getIsOptionEqualToValue(option, valueWithGroup) &&
              valueWithGroup.group === _(ALL_PROFILES) ? null : (
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
        {value && value.id && value.creatorId === activeAccountId && (
          <OutlinedButton
            size="small"
            sx={{
              p: [0],
              border: 'none',
              alignSelf: 'flex-end',
              marginTop: 2.5,
            }}
            onClick={() => setProfileAdd(value)}
          >
            <EditIcon
              sx={{
                width: 18,
                height: 18,
                pr: 1.25,
              }}
            />
            <Trans>edit profile</Trans>
          </OutlinedButton>
        )}
        {profileAdd && (
          <ProfileModal
            initialValues={profileAdd}
            onUpload={onUpload}
            onClose={closeProfileModal}
            onSubmit={async profile => {
              const account = await saveProfile(profile);
              const id = account?.id;
              const creatorId = account?.creatorId;
              if (id && creatorId) {
                closeProfileModal();
                setInputValue(profile.name);
                setValue({ id, creatorId, ...profile });
              }
            }}
          />
        )}
      </div>
    );
  },
);
