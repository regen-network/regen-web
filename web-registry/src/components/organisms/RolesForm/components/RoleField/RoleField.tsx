import { forwardRef, useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import FieldFormControl from 'web-components/lib/components/inputs/new/FieldFormControl/FieldFormControl';
import { Label } from 'web-components/lib/components/typography';
import { truncate } from 'web-components/lib/utils/truncate';

import { PartyType } from 'generated/graphql';
import { getPartiesByNameOrAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartiesByNameOrAddr/getPartiesByNameOrAddrQuery';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { ProfileModal } from '../ProfileModal/ProfileModal';
import { profileModalInitialValues } from '../ProfileModal/ProfileModal.constants';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { useDebounce } from './hook/useDebounce';
import { useStyles } from './RoleField.styles';
import { isProfile } from './RoleField.utils';

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
      let newOptions: readonly ProfileModalSchemaType[] = [];

      // if (value) {
      //   newOptions = [value];
      // }

      if (parties) {
        console.log('parties', parties);

        newOptions = [
          ...newOptions,
          ...(parties.getPartiesByNameOrAddr?.nodes.map(party => ({
            id: party?.id as string,
            name: party?.name || DEFAULT_NAME,
            profileType: party?.type as PartyType,
            profileImage: party?.image || getDefaultAvatar(party),
            description: party?.description || undefined,
            address: party?.walletByWalletId?.addr || undefined,
          })) || []),
        ];
      }
      console.log('newOptions', newOptions);

      setOptions(newOptions);
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
            value={value}
            isOptionEqualToValue={(option, value) =>
              isProfile(option) && isProfile(value) && option.id === value.id
            }
            getOptionLabel={option => (isProfile(option) ? option.name : '')}
            renderOption={(props, option) => (
              <li {...props}>
                {isProfile(option)
                  ? `${option.name} (${truncate(option.address)})`
                  : option}
              </li>
            )}
            filterOptions={x => x}
            options={[
              ...(options || []),
              <div
                key="add-new-profile"
                className={styles.add}
                onClick={e => {
                  e.stopPropagation();
                  setProfileAdd(profileModalInitialValues);
                }}
              >
                <Label size="xs" color="secondary.main">
                  + Add New Profile
                </Label>
              </div>,
            ]}
            autoComplete
            // includeInputInList
            // filterSelectedOptions
            noOptionsText="No profile found with this name or wallet address"
            onChange={(event, newValue) => {
              if (newValue && isProfile(newValue)) {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }
            }}
            onInputChange={(event, newInputValue) => {
              console.log(newInputValue);
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
