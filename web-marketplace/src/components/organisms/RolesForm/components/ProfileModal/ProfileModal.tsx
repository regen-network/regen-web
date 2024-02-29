import { useFormState, useWatch } from 'react-hook-form';

import RadioCard from 'web-components/src/components/atoms/RadioCard';
import { ImageField } from 'web-components/src/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/src/components/inputs/new/ImageField/ImageField.Avatar';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import {
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_TYPE,
  radioCardItems,
  UPLOAD_IMAGE,
} from 'components/organisms/EditProfileForm/EditProfileForm.constants';
import { useUpdateDefaultAvatar } from 'components/organisms/EditProfileForm/hooks/useUpdateDefaultAvatar';

import { ModalTemplate } from '../ModalTemplate/ModalTemplate';
import {
  profileModalSchema,
  ProfileModalSchemaType,
} from './ProfileModal.schema';

interface ProfileModalProps {
  initialValues?: ProfileModalSchemaType;
  onClose: () => void;
  onSubmit: (profile: ProfileModalSchemaType) => void;
  onUpload?: (imageFile: File) => Promise<string | undefined>;
}

function ProfileModal({
  initialValues,
  onClose,
  onSubmit,
  onUpload,
}: ProfileModalProps): JSX.Element {
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

  /* Setter */

  const setProfileImage = (value: string): void => {
    form.setValue('profileImage', value);
  };

  /* Effect */

  useUpdateDefaultAvatar({
    setProfileImage: value => form.setValue('profileImage', value),
    profileType,
    profileImage,
  });

  return (
    <ModalTemplate
      title={`${initialValues?.id ? 'Edit' : 'Add'} Profile`}
      open={!!initialValues}
      onClose={onClose}
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      submitDisabled={!isValid || isSubmitting}
    >
      <RadioCard
        label={PROFILE_TYPE}
        items={radioCardItems}
        selectedValue={profileType ?? ''}
        {...form.register('profileType')}
      />
      <TextField
        type="text"
        label="Name"
        {...form.register('name')}
        helperText={errors.name?.message}
        error={!!errors.name}
      />
      <ImageField
        label="Profile image"
        buttonText={UPLOAD_IMAGE}
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
        label="Description"
        rows={3}
        minRows={3}
        disabled={isSubmitting}
        multiline
        optional
        helperText={errors.description?.message}
        error={!!errors.description}
        {...form.register('description')}
      >
        <TextAreaFieldChartCounter value={description} />
      </TextAreaField>
      <TextField
        type="text"
        label="REGEN wallet address"
        description="Enter the wallet address here if this entity has a wallet address but has not yet signed up on Regen Marketplace. Make sure this is a valid wallet address."
        {...form.register('address')}
        helperText={errors.address?.message}
        error={!!errors.address}
        optional
      />
    </ModalTemplate>
  );
}

export { ProfileModal };
