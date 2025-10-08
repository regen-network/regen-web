import { useEffect, useMemo } from 'react';
import { useFormState } from 'react-hook-form';
import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import useClickOutside from 'utils/hooks/useClickOutside';

import { ImageField } from 'web-components/src/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/src/components/inputs/new/ImageField/ImageField.Avatar';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title as H, Body } from 'web-components/src/components/typography';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  CANCEL_LABEL,
  CHANGE_LABEL,
  DESCRIPTION_LABEL,
  NAME_LABEL,
  PERSONAL_PROFILE_SUBHEADER,
  PERSONAL_PROFILE_TITLE,
  PROFILE_IMAGE_LABEL,
  SAVE_LABEL,
  TITLE_LABEL,
  TITLE_SUBHEADER,
} from '../OrganizationMembers.constants';
import { personalProfileSchema } from './InviteMembers.schema';
import Modal from 'web-components/src/components/modal';

interface PersonalProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialName: string;
  initialAvatar?: string;
  initialDescription?: string;
  initialTitle?: string | null;
  onUploadAvatar?: (file: File) => Promise<{ url: string }>;
  onSave: (data: {
    name: string;
    avatar?: string;
    title?: string;
    description?: string;
  }) => void;
}

export const PersonalProfileModal = ({
  open,
  onClose,
  initialName,
  initialAvatar,
  initialDescription,
  initialTitle,
  onUploadAvatar,
  onSave,
}: PersonalProfileModalProps) => {
  const { _ } = useLingui();
  const modalRef = useClickOutside<HTMLDivElement>(() => onClose());

  const form = useZodForm<
    typeof personalProfileSchema,
    typeof personalProfileSchema
  >({
    schema: personalProfileSchema,
    defaultValues: {
      name: initialName || '',
      avatar: initialAvatar || '',
      title: initialTitle || '',
      description: initialDescription || '',
    },
    mode: 'onChange',
  });

  const { isValid, isSubmitting, errors } = useFormState({
    control: form.control,
  });

  const descriptionValue = form.watch('description');
  const remainingDescriptionCharacters = useMemo(
    () => 160 - (descriptionValue?.length || 0),
    [descriptionValue],
  );

  useEffect(() => {
    if (open) {
      form.reset({
        name: initialName || '',
        avatar: initialAvatar || '',
        title: initialTitle || '',
        description: initialDescription || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialName, initialAvatar, initialDescription, initialTitle]);

  const disabledSave = !isValid || isSubmitting;

  return (
    <Modal onClose={onClose} open={open} className="!px-20 !py-50">
      <Form
        form={form}
        className="flex flex-col"
        onSubmit={values => {
          onSave({
            name: values.name,
            avatar: values.avatar || undefined,
            title: values.title || undefined,
            description: values.description || undefined,
          });
          onClose();
        }}
      >
        <div className="flex-shrink-0 px-20 md:px-50 pb-30 sm:pb-50">
          <H variant="h4" className="mb-20 text-center">
            {_(PERSONAL_PROFILE_TITLE)}
          </H>
          <Body size="lg" className="text-center px-10">
            {_(PERSONAL_PROFILE_SUBHEADER)}
          </Body>
        </div>

        <div className="flex-1">
          <div className="flex flex-col bg-bc-neutral-0 border border-solid border-bc-neutral-300 rounded px-20 py-30 md:p-40">
            {/* Name */}
            <TextField
              type="text"
              label={_(NAME_LABEL)}
              {...form.register('name')}
              helperText={errors.name?.message as string | undefined}
              error={!!errors.name}
              InputProps={{ className: 'h-[60px]' }}
            />

            {/* Profile Image */}
            <ImageField
              label={_(PROFILE_IMAGE_LABEL)}
              buttonText={_(CHANGE_LABEL)}
              name="personal-profile-avatar"
              setValue={({ value }: { value: string }) =>
                form.setValue('avatar', value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              uploadText={_(CHANGE_LABEL)}
              updateText={_(CHANGE_LABEL)}
              applyText={_(CHANGE_LABEL)}
              title={_(CHANGE_LABEL)}
              titleIgnoreCrop={_(CHANGE_LABEL)}
              circularCrop
              onUpload={onUploadAvatar}
              value={form.watch('avatar') || ''}
            >
              <ImageFieldAvatar value={form.watch('avatar') || ''} />
            </ImageField>

            {/* Title */}
            <TextField
              type="text"
              optional
              label={_(TITLE_LABEL)}
              description={_(TITLE_SUBHEADER)}
              placeholder={_(TITLE_LABEL)}
              {...form.register('title')}
              helperText={errors.title?.message as string | undefined}
              error={!!errors.title}
              InputProps={{ className: 'h-[60px]' }}
            />

            {/* Description */}
            <TextAreaField
              label={_(DESCRIPTION_LABEL)}
              rows={4}
              minRows={4}
              multiline
              optional
              {...form.register('description')}
              helperText={errors.description?.message as string | undefined}
              error={!!errors.description}
            >
              <TextAreaFieldChartCounter
                value={descriptionValue}
                charsLeft={remainingDescriptionCharacters}
                remainingCharactersText={plural(
                  remainingDescriptionCharacters,
                  {
                    one: `${remainingDescriptionCharacters} character remaining`,
                    other: `${remainingDescriptionCharacters} characters remaining`,
                  },
                )}
              />
            </TextAreaField>
          </div>
        </div>

        <div className="flex-shrink-0 px-20 py-20 md:px-40 md:py-40">
          <CancelButtonFooter
            onCancel={onClose}
            cancelLabel={_(CANCEL_LABEL)}
            label={_(SAVE_LABEL)}
            disabled={disabledSave}
            type="submit"
            className="h-[53px] w-[138px] text-[18px]"
          />
        </div>
      </Form>
    </Modal>
  );
};

export default PersonalProfileModal;
