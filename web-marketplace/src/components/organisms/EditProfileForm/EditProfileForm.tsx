import React, { MutableRefObject, useEffect } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import RadioCard from 'web-components/src/components/atoms/RadioCard';
import ControlledFormLabel from 'web-components/src/components/form/ControlledFormLabel';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import WebsiteLinkIcon from 'web-components/src/components/icons/social/WebsiteLinkIcon';
import { ImageField } from 'web-components/src/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/src/components/inputs/new/ImageField/ImageField.Avatar';
import { ImageFieldBackground } from 'web-components/src/components/inputs/new/ImageField/ImageField.Background';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  editProfileFormInitialValues,
  LINKS_LABEL,
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_BG_ASPECT_RATIO,
  PROFILE_BG_FILE_NAME,
  PROFILE_TYPE,
  radioCardItems,
  TWITTER_PLACEHOLDER,
  UPLOAD_IMAGE,
  WEBSITE_PLACEHOLDER,
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
  isDirtyRef?: MutableRefObject<boolean>;
  onSubmit: (values: EditProfileFormSchemaType) => Promise<void>;
  onSuccess?: () => void;
  onUpload?: (imageFile: File) => Promise<string>;
}

const EditProfileForm: React.FC<React.PropsWithChildren<EditProfileFormProps>> =
  ({
    children,
    initialValues = editProfileFormInitialValues,
    isDirtyRef,
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

    const { isSubmitting, errors, isDirty } = useFormState({
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

    useUpdateDefaultAvatar({
      setProfileImage: value => form.setValue('profileImage', value),
      profileType,
      profileImage,
    });

    useEffect(() => {
      if (isDirtyRef) {
        isDirtyRef.current = isDirty;
      }
    }, [isDirtyRef, isDirty]);

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
        <ImageField
          label="Background image"
          setValue={setBackgroundImage}
          initialFileName={PROFILE_BG_FILE_NAME}
          sx={{
            label: { width: '100%' },
            button: { width: '100%' },
          }}
          fixedCrop={{
            aspect: PROFILE_BG_ASPECT_RATIO,
          }}
          {...form.register('backgroundImage')}
          name="bg-image"
          onUpload={onUpload}
        >
          <ImageFieldBackground value={backgroundImage} />
        </ImageField>
        <TextAreaField
          type="text"
          label="Description"
          rows={3}
          minRows={3}
          disabled={isSubmitting}
          multiline
          optional
          helperText={errors?.description?.message}
          error={!!errors?.description}
          {...form.register('description')}
        >
          <TextAreaFieldChartCounter value={description} />
        </TextAreaField>
        <Box sx={{ mt: 6 }}>
          <ControlledFormLabel optional>{LINKS_LABEL}</ControlledFormLabel>
          <TextField
            type="text"
            label=""
            placeholder={WEBSITE_PLACEHOLDER}
            {...form.register('websiteLink')}
            helperText={errors?.websiteLink?.message}
            error={!!errors?.websiteLink}
            startAdornment={<WebsiteLinkIcon className="text-grey-300" />}
            sx={{
              mt: { xs: 2.5, sm: 2.5 },
              mb: 5,
              '& .MuiInputBase-root': { pl: { sm: '3px' } },
            }}
          />
          <TextField
            type="text"
            label=""
            placeholder={TWITTER_PLACEHOLDER}
            {...form.register('twitterLink')}
            helperText={errors?.twitterLink?.message}
            error={!!errors?.twitterLink}
            startAdornment={
              <TwitterIcon
                color="currentColor"
                className="ml-[9px] mr-[8px] text-grey-300"
              />
            }
            sx={{
              mt: { xs: 0, sm: 0 },
              '& .MuiInputBase-root': { pl: { sm: '3px' } },
            }}
          />
        </Box>

        {children}
      </Form>
    );
  };

export { EditProfileForm };
