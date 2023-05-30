import { forwardRef, useState } from 'react';
import { Autocomplete, SxProps, TextField } from '@mui/material';

import FieldFormControl from 'web-components/lib/components/inputs/new/FieldFormControl/FieldFormControl';
import { Label } from 'web-components/lib/components/typography';

import {
  DEFAULT_PROFILE_TYPE,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

import { ProfileModal } from '../ProfileModal/ProfileModal';
import { profileModalInitialValues } from '../ProfileModal/ProfileModal.constants';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
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

const sxs = {
  formLabel: { color: 'primary.contrastText', ml: 1 } as SxProps,
};

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
    const [options, setOptions] = useState<readonly ProfileModalSchemaType[]>([
      {
        id: '123',
        name: 'John',
        profileType: DEFAULT_PROFILE_TYPE,
        profileImage: DEFAULT_PROFILE_USER_AVATAR,
      },
    ]);
    const [profileAdd, setProfileAdd] = useState<ProfileModalSchemaType | null>(
      null,
    );

    const saveProfile = async (
      profile: ProfileModalSchemaType,
    ): Promise<void> => {
      // TODO Save in db
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
              <li {...props}>{isProfile(option) ? option.name : option}</li>
            )}
            // filterOptions={x => x}
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
                <Label size="xs" sx={sxs.formLabel} color="secondary.main">
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
                // setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }
            }}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
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
