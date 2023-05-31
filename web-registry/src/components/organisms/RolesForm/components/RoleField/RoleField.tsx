import { forwardRef, useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import FieldFormControl from 'web-components/lib/components/inputs/new/FieldFormControl/FieldFormControl';
import { truncate } from 'web-components/lib/utils/truncate';

import { PartyType } from 'generated/graphql';
import { getPartiesByNameOrAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartiesByNameOrAddr/getPartiesByNameOrAddrQuery';
import { useWallet } from 'lib/wallet/wallet';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { ProfileModal } from '../ProfileModal/ProfileModal';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { useDebounce } from './hook/useDebounce';
import { AddNewProfile } from './RoleField.AddNewProfile';
import { NoGroup } from './RoleField.NoGroup';
import { ProfileGroup } from './RoleField.ProfileGroup';
import { useStyles } from './RoleField.styles';
import { group, isProfile } from './RoleField.utils';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  description?: string;
  label?: string;
  optional?: boolean | string;
  setValue: (value: ProfileModalSchemaType) => void;
  value?: ProfileModalSchemaType;
  // onSaveProfile: (v: ProfileModalSchemaType) => Promise<void>;
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
    }: Props,
    ref,
  ) => {
    const { classes: styles, cx } = useStyles();
    const { accountId } = useWallet();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<readonly ProfileModalSchemaType[]>(
      [],
    );

    const graphqlClient =
      useApolloClient() as ApolloClient<NormalizedCacheObject>;
    const debouncedInputValue = useDebounce(inputValue);
    const { data: parties } = useQuery(
      getPartiesByNameOrAddrQuery({
        client: graphqlClient,
        enabled: !!graphqlClient && !!debouncedInputValue,
        input: debouncedInputValue,
      }),
    );

    useEffect(() => {
      if (inputValue === '') {
        setOptions(value ? [value] : []);
        return;
      }
      // let newOptions: readonly ProfileModalSchemaType[] = [];

      // newOptions = [
      //   ...newOptions,
      //   ...(parties?.getPartiesByNameOrAddr?.nodes.map(party => ({
      //     id: party?.id as string,
      //     name: party?.name as string,
      //     profileType: party?.type as PartyType,
      //     profileImage: party?.image || getDefaultAvatar(party),
      //     description: party?.description || undefined,
      //     address: party?.walletByWalletId?.addr || undefined,
      //   })) || []),
      // ];
      // console.log('newOptions', newOptions);

      setOptions(
        parties?.getPartiesByNameOrAddr?.nodes.map(party => ({
          accountId: party?.accountId as string,
          id: party?.id as string,
          name: party?.name || DEFAULT_NAME,
          profileType: party?.type as PartyType,
          profileImage: party?.image || getDefaultAvatar(party),
          description: party?.description || undefined,
          address: party?.walletByWalletId?.addr || undefined,
        })) || [],
      );
    }, [value, inputValue, parties]);

    const [profileAdd, setProfileAdd] = useState<ProfileModalSchemaType | null>(
      null,
    );

    const saveProfile = async (
      profile: ProfileModalSchemaType,
    ): Promise<void> => {
      // TODO Save in db and invalidate query
      // var savedProfile = await onSaveProfile(profile);
      setValue(profile);
      closeProfileModal();
      // form.setFieldValue(field.name, savedProfile);
      // form.setFieldTouched(field.name, true);
    };

    const closeProfileModal = (): void => {
      setProfileAdd(null);
    };

    return (
      <div className={cx(styles.root, classes && classes.root)}>
        <FieldFormControl
          className={className}
          label={label}
          // disabled={form.isSubmitting}
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
            value={
              value
                ? {
                    group: group(value, accountId),
                    ...value,
                  }
                : undefined
            }
            isOptionEqualToValue={(option, value) =>
              isProfile(option) && isProfile(value) && option.id === value.id
            }
            getOptionLabel={option => (isProfile(option) ? option.name : '')}
            renderOption={(props, option, state) => (
              <li {...props} key={state.index}>
                {isProfile(option)
                  ? `${option.name} (${truncate(option.address)})`
                  : option}
              </li>
            )}
            filterOptions={x => x}
            options={[
              ...options
                .map(option => ({
                  group: group(option, accountId),
                  ...option,
                }))
                .sort((a, b) => -b.group.localeCompare(a.group)),
              <AddNewProfile setProfileAdd={setProfileAdd} />,
            ]}
            groupBy={option => (isProfile(option) ? option.group : '')}
            renderGroup={params => {
              return params.group ? (
                <ProfileGroup params={params} />
              ) : (
                <NoGroup params={params} />
              );
            }}
            autoComplete
            onChange={(event, newValue) => {
              if (newValue && isProfile(newValue)) {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Start typing or choose entity"
                variant="outlined"
              />
            )}
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
