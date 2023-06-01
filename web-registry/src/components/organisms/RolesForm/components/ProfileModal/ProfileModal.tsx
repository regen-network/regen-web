import { useFormState, useWatch } from 'react-hook-form';
import { Box } from '@mui/material';

import RadioCard from 'web-components/lib/components/atoms/RadioCard';
import { ImageField } from 'web-components/lib/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/lib/components/inputs/new/ImageField/ImageField.Avatar';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import Modal from 'web-components/lib/components/modal';
import { CancelButtonFooter } from 'web-components/lib/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/lib/components/typography';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import {
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_TYPE,
  radioCardItems,
  UPLOAD_IMAGE,
} from 'components/organisms/EditProfileForm/EditProfileForm.constants';
import { useUpdateDefaultAvatar } from 'components/organisms/EditProfileForm/hooks/useUpdateDefaultAvatar';

import {
  profileModalSchema,
  ProfileModalSchemaType,
} from './ProfileModal.schema';
import { useStyles } from './ProfileModal.styles';

interface ProfileModalProps {
  initialValues?: ProfileModalSchemaType;
  onClose: () => void;
  onSubmit: (profile: ProfileModalSchemaType) => void;
  onUpload?: (imageFile: File) => Promise<string>;
}

function ProfileModal({
  initialValues,
  onClose,
  onSubmit,
  onUpload,
}: ProfileModalProps): JSX.Element {
  const { classes: styles } = useStyles();

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
    <Modal open={!!initialValues} onClose={onClose} className={styles.root}>
      <Title variant="h4" align="center" sx={{ pb: [6, 12.5] }}>
        {`${initialValues?.id ? 'Edit' : 'Add'} Profile`}
      </Title>
      <Form form={form}>
        <Box
          sx={{
            border: theme => `1px solid ${theme.palette.info.light}`,
            backgroundColor: 'primary.main',
            borderRadius: '5px',
            py: 10,
            px: { xs: 2.5, sm: 10 },
            mb: 12.5,
          }}
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
        </Box>
        <CancelButtonFooter
          onClick={form.handleSubmit(onSubmit)}
          onCancel={onClose}
          label="save"
          sx={{ px: [10.75] }}
          disabled={!isValid || isSubmitting}
          type="submit"
        />
      </Form>
    </Modal>
  );
}

export { ProfileModal };
