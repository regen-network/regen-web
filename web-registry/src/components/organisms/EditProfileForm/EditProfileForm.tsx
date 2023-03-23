import React from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import RadioCard from 'web-components/lib/components/atoms/RadioCard';
import { ImageField } from 'web-components/lib/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/lib/components/inputs/new/ImageField/ImageField.Avatar';
import { ImageFieldBackground } from 'web-components/lib/components/inputs/new/ImageField/ImageField.Background';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { Label } from 'web-components/lib/components/typography';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  editProfileFormInitialValues,
  LINKS_LABEL,
  PROFILE_BG_ASPECT_RATIO,
  PROFILE_TYPE,
  radioCardItems,
  UPLOAD_IMAGE,
} from './EditProfileForm.constants';
import {
  editProfileFormSchema,
  EditProfileFormSchemaType,
} from './EditProfileForm.schema';
import { validateEditProfileForm } from './EditProfileForm.utils';
import { useUpdateDefaultAvatar } from './hooks/useUpdateDefaultAvatar';

export interface EditProfileFormProps {
  initialValues?: EditProfileFormSchemaType;
  children?: React.ReactNode;
  onSubmit: (values: EditProfileFormSchemaType) => Promise<void>;
  onSuccess?: () => void;
  onUpload?: (imageFile: File) => Promise<string>;
}

const EditProfileForm: React.FC<React.PropsWithChildren<EditProfileFormProps>> =
  ({
    children,
    initialValues = editProfileFormInitialValues,
    onSubmit,
    onSuccess,
    onUpload,
  }) => {
    const form = useZodForm({
      schema: editProfileFormSchema,
      defaultValues: {
        ...initialValues,
      },
      mode: 'onBlur',
    });
    const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

    const { isSubmitting, errors } = useFormState({
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
    const backgroundImage = useWatch({
      control: form.control,
      name: 'backgroundImage',
    });
    const description = useWatch({
      control: form.control,
      name: 'description',
    });

    /* Setter */

    const setProfileImage = (value: string): void => {
      form.setValue('profileImage', value);
    };
    const setBackgroundImage = (value: string): void => {
      form.setValue('backgroundImage', value);
    };

    /* Effect */

    useUpdateDefaultAvatar({ form, profileType, profileImage });

    return (
      <Form
        form={form}
        onSubmit={async data => {
          const hasError = validateEditProfileForm({
            setError: form.setError,
            values: data,
          });
          if (!hasError) {
            try {
              await onSubmit(data);
              onSuccess && onSuccess();
            } catch (e) {
              setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
            }
          }
        }}
        sx={{
          border: theme => `1px solid ${theme.palette.info.light}`,
          borderRadius: '5px',
          py: 10,
          px: { xs: 2.5, sm: 10 },
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
          circularCrop
          onUpload={onUpload}
        >
          <ImageFieldAvatar value={profileImage} />
        </ImageField>
        <ImageField
          label="Background image"
          setValue={setBackgroundImage}
          sx={{
            label: { width: '100%' },
            button: { width: '100%' },
          }}
          fixedCrop={{
            aspect: PROFILE_BG_ASPECT_RATIO,
          }}
          {...form.register('profileImage')}
          name="bg-image"
          onUpload={onUpload}
        >
          <ImageFieldBackground value={backgroundImage} />
        </ImageField>
        <TextAreaField
          type="text"
          label="Description"
          description="Describe any relevant background and experience. This info may be shown on the project page."
          rows={3}
          minRows={3}
          disabled={isSubmitting}
          multiline
          optional
          {...form.register('description')}
        >
          <TextAreaFieldChartCounter value={description} />
        </TextAreaField>
        <Box sx={{ mt: 6 }}>
          <Label size="md" sx={{ textTransform: 'none', mb: 2.5 }}>
            {LINKS_LABEL}
          </Label>
          <Box>
            <TextField
              type="text"
              label=""
              placeholder="yourwebsite.com"
              {...form.register('websiteLink')}
              helperText={errors?.websiteLink?.message}
              error={!!errors?.websiteLink}
              sx={{ mb: 5 }}
            />
          </Box>
          <Box>
            <TextField
              type="text"
              label=""
              placeholder="yourtwitterhandle"
              {...form.register('twitterLink')}
              helperText={errors?.twitterLink?.message}
              error={!!errors?.twitterLink}
            />
          </Box>
        </Box>

        {children}
      </Form>
    );
  };

export { EditProfileForm };
