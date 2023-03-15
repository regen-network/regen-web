import React from 'react';
import { useFormState, useWatch } from 'react-hook-form';

import RadioCard from 'web-components/lib/components/atoms/RadioCard';
import { ImageField } from 'web-components/lib/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/lib/components/inputs/new/ImageField/ImageField.Avatar';
import { ImageFieldBackground } from 'web-components/lib/components/inputs/new/ImageField/ImageField.Background';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  editProfileFormInitialValues,
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

export interface EditProfileFormProps {
  defaultAvatar?: string;
  defaultBg?: string;
  children?: React.ReactNode;
  onSubmit: (values: EditProfileFormSchemaType) => Promise<void>;
  onSuccess?: () => void;
  onUpload?: (imageFile: File) => Promise<string>;
}

const EditProfileForm: React.FC<React.PropsWithChildren<EditProfileFormProps>> =
  ({ defaultAvatar, defaultBg, children, onSubmit, onSuccess, onUpload }) => {
    const form = useZodForm({
      schema: editProfileFormSchema,
      defaultValues: {
        ...editProfileFormInitialValues,
        profileImage: defaultAvatar,
        backgroundImage: defaultBg,
      },
      mode: 'onBlur',
    });

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

    return (
      <>
        <Form
          form={form}
          onSubmit={async data => {
            const hasError = validateEditProfileForm({
              setError: form.setError,
              values: data,
            });
            if (!hasError) {
              await onSubmit(data);
              onSuccess && onSuccess();
            }
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

          {children}
        </Form>
      </>
    );
  };

export { EditProfileForm };
