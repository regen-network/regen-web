import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg, plural } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';
import { FormStateSetter } from 'legacy-pages/CreateOrganization/CreateOrganization.types';
import { useSetFormState } from 'legacy-pages/CreateOrganization/hooks/useSetFormState';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

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

import { AccountType } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import {
  APPLY,
  REQUIRED_MESSAGE,
  TITLE_CROP,
  TITLE_IGNORE_CROP,
  UPDATE,
} from 'lib/constants/shared.constants';

import Form, { FormRef } from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  getRadioCardItems,
  LINKS_LABEL,
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_BG_ASPECT_RATIO,
  PROFILE_BG_FILE_NAME,
  PROFILE_TYPE,
  TWITTER_PLACEHOLDER,
  UPLOAD_IMAGE,
  WEBSITE_PLACEHOLDER,
} from './EditProfileForm.constants';
import {
  createEditProfileFormSchema,
  EditProfileFormSchemaType,
} from './EditProfileForm.schema';
import { validateEditProfileForm } from './EditProfileForm.utils';
import { useUpdateDefaultAvatar } from './hooks/useUpdateDefaultAvatar';

export interface EditProfileFormProps extends Partial<FormStateSetter> {
  initialValues?: EditProfileFormSchemaType;
  children?: React.ReactNode;
  isDirtyRef?: MutableRefObject<boolean>;
  onSubmit: (values: EditProfileFormSchemaType) => Promise<void>;
  onSuccess?: () => void;
  onUpload?: (imageFile: File) => Promise<{ url: string }>;
  // Optional enhancements for reuse in Create Organization flow
  formId?: string;
  formRef?: FormRef;
  hideProfileType?: boolean;
  nameLabel?: string;
  // Allows parent steps (e.g. Create Organization) to inject partial values
  // after the form has mounted (e.g. from a transfer profile modal)
  onPrefill?: (values: Partial<EditProfileFormSchemaType>) => void; // not used internally, documented for symmetry
  prefillValues?: Partial<EditProfileFormSchemaType>;
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}
const EditProfileForm = ({
  children,
  initialValues,
  isDirtyRef,
  onSubmit,
  onSuccess,
  onUpload,
  formId,
  formRef,
  hideProfileType,
  nameLabel,
  prefillValues,
  validationMode = 'onBlur',
  setIsSubmitting,
  setIsValid,
}: EditProfileFormProps) => {
  const { _ } = useLingui();
  const formSchema = useMemo(
    () =>
      hideProfileType
        ? createEditProfileFormSchema({ requireProfileType: false, _ })
        : createEditProfileFormSchema({ requireProfileType: true, _ }),
    [hideProfileType, _],
  );
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      ...initialValues,
      profileType:
        initialValues?.profileType ??
        (hideProfileType ? AccountType.Organization : undefined),
    },
    mode: validationMode,
  });

  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const { isSubmitting, errors, isDirty, isValid, touchedFields, isSubmitted } =
    useFormState({
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
  const backgroundImage = useWatch({
    control: form.control,
    name: 'backgroundImage',
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

  const setProfileImage = useCallback(
    ({ value }: { value: string }): void => {
      form.setValue('profileImage', value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form],
  );
  const setBackgroundImage = useCallback(
    ({ value }: { value: string }): void => {
      form.setValue('backgroundImage', value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form],
  );
  const handleDefaultAvatarUpdate = useCallback(
    (value: string): void => {
      form.setValue('profileImage', value, {
        shouldDirty: false,
        shouldValidate: true,
      });
    },
    [form],
  );

  /* Effect */

  useUpdateDefaultAvatar({
    setProfileImage: handleDefaultAvatarUpdate,
    profileType,
    profileImage,
  });

  useEffect(() => {
    if (isDirtyRef) {
      isDirtyRef.current = isDirty;
    }
  }, [isDirtyRef, isDirty]);

  useSetFormState({ isSubmitting, isValid, setIsSubmitting, setIsValid });

  // When parent supplies new prefillValues, merge them into the form without
  // wiping user edits for untouched fields. Only set provided keys.
  useEffect(() => {
    if (prefillValues && Object.keys(prefillValues).length) {
      for (const [key, value] of Object.entries(prefillValues)) {
        if (value !== undefined) {
          // @ts-expect-error: dynamic key assignment aligned with schema
          form.setValue(key, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }
      }
      void form.trigger();
    }
  }, [prefillValues, form]);

  return (
    <Form
      className="px-10 py-40 md:p-40 bg-bc-neutral-0 border border-solid border-bc-neutral-300 mb-[120px] rounded-[10px]"
      form={form}
      id={formId}
      formRef={formRef}
      onSubmit={async data => {
        const hasError = validateEditProfileForm({
          setError: form.setError,
          values: data,
          requiredMessage: _(REQUIRED_MESSAGE),
        });
        if (!hasError) {
          try {
            await onSubmit(data);
            onSuccess && onSuccess();
          } catch (e) {
            setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
          }
        }
      }}
    >
      {!hideProfileType && (
        <RadioCard
          label={_(PROFILE_TYPE)}
          items={radioCardItems}
          selectedValue={profileType ?? ''}
          {...form.register('profileType')}
        />
      )}
      <TextField
        type="text"
        label={nameLabel ?? _(msg`Name`)}
        {...form.register('name')}
        helperText={
          errors.name && (isSubmitted || touchedFields?.name)
            ? errors.name.message
            : undefined
        }
        error={Boolean(errors.name && (isSubmitted || touchedFields?.name))}
      />
      <ImageField
        label={_(msg`Profile image`)}
        buttonText={_(UPLOAD_IMAGE)}
        setValue={setProfileImage}
        {...form.register('profileImage')}
        name="profile-image"
        initialFileName={PROFILE_AVATAR_FILE_NAME}
        uploadText={_(UPLOAD_IMAGE)}
        updateText={_(UPDATE)}
        applyText={_(APPLY)}
        title={_(TITLE_CROP)}
        titleIgnoreCrop={_(TITLE_IGNORE_CROP)}
        circularCrop
        onUpload={onUpload}
        value={profileImage}
      >
        <ImageFieldAvatar value={profileImage} />
      </ImageField>
      <ImageField
        label={_(msg`Background image`)}
        setValue={setBackgroundImage}
        initialFileName={PROFILE_BG_FILE_NAME}
        uploadText={_(UPLOAD_IMAGE)}
        updateText={_(UPDATE)}
        applyText={_(APPLY)}
        title={_(TITLE_CROP)}
        titleIgnoreCrop={_(TITLE_IGNORE_CROP)}
        sx={{
          label: { width: '100%' },
          button: { width: '100%' },
        }}
        aspect={PROFILE_BG_ASPECT_RATIO}
        {...form.register('backgroundImage')}
        name="bg-image"
        onUpload={onUpload}
        value={backgroundImage}
      >
        <ImageFieldBackground value={backgroundImage} />
      </ImageField>
      <TextAreaField
        type="text"
        label={_(msg`Description`)}
        minRows={3}
        disabled={isSubmitting}
        multiline
        optional
        helperText={errors?.description?.message}
        error={!!errors?.description}
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
      <Box sx={{ mt: 6 }}>
        <ControlledFormLabel optional>{_(LINKS_LABEL)}</ControlledFormLabel>
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
            <TwitterIcon className="ml-[9px] mr-[8px] text-grey-300" />
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
