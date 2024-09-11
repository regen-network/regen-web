import { useMemo } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg, plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

import RadioCard from 'web-components/src/components/atoms/RadioCard';
import { ImageField } from 'web-components/src/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/src/components/inputs/new/ImageField/ImageField.Avatar';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import {
  APPLY,
  INVALID_REGEN_ADDRESS,
  TITLE_CROP,
  TITLE_IGNORE_CROP,
  UPDATE,
} from 'lib/constants/shared.constants';

import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import {
  getRadioCardItems,
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_TYPE,
  UPLOAD_IMAGE,
} from 'components/organisms/EditProfileForm/EditProfileForm.constants';
import { useUpdateDefaultAvatar } from 'components/organisms/EditProfileForm/hooks/useUpdateDefaultAvatar';

import { getOptionalAddressSchema } from '../AdminModal/AdminModal.schema';
import { ModalTemplate } from '../ModalTemplate/ModalTemplate';
import {
  getProfileModalSchema,
  ProfileModalSchemaType,
} from './ProfileModal.schema';

interface ProfileModalProps {
  initialValues?: ProfileModalSchemaType;
  onClose: () => void;
  onSubmit: (profile: ProfileModalSchemaType) => void;
  onUpload?: (imageFile: File) => Promise<{ url: string } | undefined>;
}

function ProfileModal({
  initialValues,
  onClose,
  onSubmit,
  onUpload,
}: ProfileModalProps): JSX.Element {
  const { _ } = useLingui();
  const optionalAddressSchema = useMemo(
    () =>
      getOptionalAddressSchema({
        invalidRegenAddress: _(INVALID_REGEN_ADDRESS),
      }),
    [_],
  );
  const profileModalSchema = useMemo(
    () => getProfileModalSchema({ optionalAddressSchema }),
    [optionalAddressSchema],
  );

  const form = useZodForm({
    schema: profileModalSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });

  const { isSubmitting, errors, isValid } = useFormState({
    control: form.control,
  });

  const radioCardItems = useMemo(() => getRadioCardItems(_), [_]);

  /* Fields watch */

  const profileType = useWatch({
    control: form.control,
    name: 'profileType',
  });
  const profileImage = useWatch({
    control: form.control,
    name: 'profileImage',
  });
  const description = useWatch({
    control: form.control,
    name: 'description',
  });

  const remainingDescriptionCharacters = useMemo(
    () => getRemainingCharacters({ value: description }),
    [description],
  );

  /* Setter */

  const setProfileImage = ({ value }: { value: string }): void => {
    form.setValue('profileImage', value, { shouldDirty: true });
  };

  /* Effect */

  useUpdateDefaultAvatar({
    setProfileImage: value => form.setValue('profileImage', value),
    profileType,
    profileImage,
  });

  return (
    <ModalTemplate
      title={`${
        initialValues?.id ? _(msg`Edit profile`) : _(msg`Add Profile`)
      }`}
      open={!!initialValues}
      onClose={onClose}
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      submitDisabled={!isValid || isSubmitting}
    >
      <RadioCard
        label={_(PROFILE_TYPE)}
        items={radioCardItems}
        selectedValue={profileType ?? ''}
        {...form.register('profileType')}
      />
      <TextField
        type="text"
        label={_(msg`Name`)}
        {...form.register('name')}
        helperText={errors.name?.message}
        error={!!errors.name}
      />
      <ImageField
        label={_(msg`Profile image`)}
        buttonText={_(UPLOAD_IMAGE)}
        uploadText={_(UPLOAD_IMAGE)}
        updateText={_(UPDATE)}
        applyText={_(APPLY)}
        title={_(TITLE_CROP)}
        titleIgnoreCrop={_(TITLE_IGNORE_CROP)}
        setValue={setProfileImage}
        {...form.register('profileImage')}
        name="profile-image"
        initialFileName={PROFILE_AVATAR_FILE_NAME}
        circularCrop
        onUpload={onUpload}
      >
        <ImageFieldAvatar value={profileImage} />
      </ImageField>
      <TextAreaField
        type="text"
        label={_(msg`Description`)}
        rows={3}
        minRows={3}
        disabled={isSubmitting}
        multiline
        optional
        helperText={errors.description?.message}
        error={!!errors.description}
        {...form.register('description')}
      >
        <TextAreaFieldChartCounter
          value={description}
          charsLeft={remainingDescriptionCharacters}
          remainingCharactersText={plural(remainingDescriptionCharacters, {
            one: `${remainingDescriptionCharacters} character remaining`,
            other: `${remainingDescriptionCharacters} characters remaining`,
          })}
        />
      </TextAreaField>
      <TextField
        type="text"
        label={_(msg`REGEN wallet address`)}
        description={_(
          msg`Enter the wallet address here if this entity has a wallet address but has not yet signed up on Regen Marketplace. Make sure this is a valid wallet address.`,
        )}
        {...form.register('address')}
        helperText={errors.address?.message}
        error={!!errors.address}
        optional
      />
    </ModalTemplate>
  );
}

export { ProfileModal };
