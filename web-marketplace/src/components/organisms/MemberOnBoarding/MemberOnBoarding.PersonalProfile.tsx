'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { msg, plural } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useSetAtom } from 'jotai';
import { PROFILE_S3_PATH } from 'legacy-pages/Dashboard/Dashboard.constants';
import { useOnUploadCallback } from 'legacy-pages/Dashboard/hooks/useOnUploadCallback';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { ImageField } from 'web-components/src/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/src/components/inputs/new/ImageField/ImageField.Avatar';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Body, Title } from 'web-components/src/components/typography';
import { deleteImage } from 'web-components/src/utils/s3';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  APPLY,
  TITLE_CROP,
  TITLE_IGNORE_CROP,
  UPDATE,
} from 'lib/constants/shared.constants';
import { apiServerUrl } from 'lib/env';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  PROFILE_AVATAR_FILE_NAME,
  UPLOAD_IMAGE,
} from '../EditProfileForm/EditProfileForm.constants';
import {
  personalProfileSchema,
  PersonalProfileSchemaType,
} from '../BaseMembersTable/modals/modals.schema';
import { useSaveProfile } from '../BaseMembersTable/modals/hooks/useSaveProfile';

type PersonalProfileProps = {
  initialValues?: PersonalProfileSchemaType;
  onSuccess: () => void;
};

export const PersonalProfile = ({
  initialValues,
  onSuccess,
}: PersonalProfileProps) => {
  const { _ } = useLingui();
  const { activeAccountId } = useAuth();
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);

  const form = useZodForm({
    schema: personalProfileSchema,
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const { isSubmitting, errors, isValid } = useFormState({
    control: form.control,
  });
  const [updateAccountById] = useUpdateAccountByIdMutation();

  /* Fields watch */

  const avatar = useWatch({
    control: form.control,
    name: 'avatar',
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
      form.setValue('avatar', value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const { saveProfile, onUpload } = useSaveProfile();

  const onSubmit = useCallback(
    async (values: PersonalProfileSchemaType) => {
      try {
        await saveProfile(values);
        onSuccess();
      } catch (error) {
        setErrorBannerText(String(error));
      }
    },
    [activeAccountId, updateAccountById, onSuccess, setErrorBannerText],
  );

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="max-w-[560px] mx-auto px-10 sm:px-0">
        <Title variant="h3" className="text-center">
          <Trans>Personal Profile</Trans>
        </Title>
        <Body className="pt-20 pb-40 text-center text-sc-text-paragraph">
          <Trans>
            This information will appear on any posts that you author.
          </Trans>
        </Body>
        <div className="bg-bc-neutral-0 sm:p-40 py-40 px-10 rounded-[10px] border border-solid border-sc-card-standard-stroke">
          <TextField
            type="text"
            label={_(msg`Name`)}
            {...form.register('name')}
            helperText={errors.name ? errors.name.message : undefined}
            error={Boolean(errors.name)}
          />
          <ImageField
            optional
            label={_(msg`Profile image`)}
            buttonText={_(UPLOAD_IMAGE)}
            setValue={setProfileImage}
            {...form.register('avatar')}
            name="profile-image"
            initialFileName={PROFILE_AVATAR_FILE_NAME}
            uploadText={_(UPLOAD_IMAGE)}
            updateText={_(UPDATE)}
            applyText={_(APPLY)}
            title={_(TITLE_CROP)}
            titleIgnoreCrop={_(TITLE_IGNORE_CROP)}
            circularCrop
            onUpload={onUpload}
            value={avatar ?? undefined}
          >
            <ImageFieldAvatar
              key={avatar || 'profile-image-placeholder'}
              value={avatar ?? ''}
            />
          </ImageField>
          <TextField
            optional
            type="text"
            label={_(msg`Title`)}
            description={_(
              msg`For example: farmer, CTO, CEO, data analyst, ranger, etc.`,
            )}
            {...form.register('title')}
            helperText={errors.title ? errors.title.message : undefined}
            error={Boolean(errors.title)}
          />
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
              charsLeft={remainingDescriptionCharacters}
              remainingCharactersText={plural(remainingDescriptionCharacters, {
                one: `${remainingDescriptionCharacters} character remaining`,
                other: `${remainingDescriptionCharacters} characters remaining`,
              })}
            />
          </TextAreaField>
        </div>
      </div>
      <SaveFooter
        saveText={_(msg`finish`)}
        percentComplete={10}
        saveDisabled={isSubmitting || !isValid}
      />
    </Form>
  );
};
