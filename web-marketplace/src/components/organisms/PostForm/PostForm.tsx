import { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { DocumentIconRaw } from 'web-components/lib/components/icons/DocumentIconRaw';
import { LocationIcon } from 'web-components/lib/components/icons/LocationIcon';
import { LockIcon } from 'web-components/lib/components/icons/LockIcon';
import { PrivateFile } from 'web-components/lib/components/icons/PrivateFile';
import { UnlockIcon } from 'web-components/lib/components/icons/UnlockIcon';
import {
  ImageDrop,
  ImageDropProps,
} from 'web-components/lib/components/inputs/new/ImageDrop/ImageDrop';
import { Radio } from 'web-components/lib/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/lib/components/inputs/new/RadioGroup/RadioGroup';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { Body, Title } from 'web-components/lib/components/typography';
import { cn } from 'web-components/lib/utils/styles/cn';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';

import { Link } from 'components/atoms';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  cropAspectMediaForm,
  DEFAULT_URL,
  IMAGE_UPLOAD_BUTTON_LABEL,
} from '../MediaForm/MediaForm.constants';
import { useMediaFormStyles } from '../MediaForm/useMediaFormStyles';
import {
  POST_MAX_TITLE_LENGTH,
  POST_PRIVACY_DESCRIPTION,
} from './PostForm.constants';
import { postFormSchema, PostFormSchemaType } from './PostForm.schema';

export interface Props {
  initialValues: PostFormSchemaType;
  className?: string;
}

export const PostForm = ({ initialValues, className }: Props): JSX.Element => {
  const form = useZodForm({
    schema: postFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { classes } = useMediaFormStyles();
  const { errors } = form.formState;
  const { setValue } = form;

  const imageDropCommonProps: Partial<ImageDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: IMAGE_UPLOAD_BUTTON_LABEL,
    fixedCrop: cropAspectMediaForm,
  };

  const title = useWatch({ control: form.control, name: 'title' });
  const files = useWatch({ control: form.control, name: 'files' });
  const privacy = useWatch({ control: form.control, name: 'privacyType' });

  const noFiles = (files?.length ?? 0) <= 1;

  const { fields, append, remove } = useFieldArray({
    name: 'files',
    control: form.control,
  });

  const setFiles = (value: string, fieldIndex: number): void => {
    if (files?.[fieldIndex]?.['schema:url'] === DEFAULT_URL) {
      append({
        'schema:url': DEFAULT_URL,
      });
    }
    setValue(`files.${fieldIndex}.schema:url`, encodeURI(value));
  };

  const getHandleDeleteWithIndex = async (fieldIndex: number) => {
    remove(fieldIndex);
  };

  /* Effect */

  useEffect(() => {
    if (
      fields?.length === 0 ||
      fields?.every(field => field['schema:url'] !== DEFAULT_URL)
    ) {
      append({
        'schema:url': DEFAULT_URL,
      });
    }
  }, [append, fields]);

  return (
    <Form className={cn('max-w-[560px]', className)} form={form}>
      <Title variant="h3" sx={{ textAlign: 'center' }} className="mb-50">
        New post
      </Title>
      <TextField
        type="text"
        label="Title"
        description="Summarize this update."
        className="mb-50"
        helperText={
          <TextAreaFieldChartCounter
            value={title}
            charLimit={POST_MAX_TITLE_LENGTH}
            sx={{ mb: { xs: 0, sm: 0 } }}
          />
        }
        {...form.register('title')}
      />
      <TextAreaField
        type="text"
        label="Comment"
        description="Write a short comment or longer project update. "
        rows={4}
        minRows={4}
        multiline
        className="mb-50 mt-0"
        {...form.register('comment')}
      />
      {fields.map((field, index) => {
        const url = files?.[index]?.['schema:url'];

        return (
          <ImageDrop
            label={'Files'}
            description={
              <Body>
                {
                  '5MB max. Supported file types include text, spreadsheets, images, and video files. '
                }
                <Link href="#">{'View all supported file types»'}</Link>
              </Body>
            }
            onDelete={() => getHandleDeleteWithIndex(index)}
            value={url === DEFAULT_URL ? '' : url}
            setValue={setFiles}
            className={cn('mb-50 mt-0', classes.galleryItem)}
            key={field.id}
            fieldIndex={index}
            error={!!errors['files']}
            helperText={errors['files']?.message}
            renderModal={() => <div />}
            optional
            {...imageDropCommonProps}
            {...form.register('files')}
          />
        );
      })}
      <div className="flex flex-col mb-50">
        <RadioGroup
          label={
            <span className="inline-flex items-center">
              <LockIcon className="mr-10" />
              {'Privacy settings'}
            </span>
          }
          description={POST_PRIVACY_DESCRIPTION}
        >
          <>
            <Radio
              label={
                <span className={cn('flex items-center')}>
                  <UnlockIcon className="mr-15" />
                  {'Make the entire post public'}
                </span>
              }
              value={'public'}
              selectedValue={privacy}
              sx={{ mb: 2.5 }}
              {...form.register('privacyType')}
            />
            <Radio
              label={
                <span className={cn('flex items-center')}>
                  <LockIcon className="mr-15" />
                  {'Make the entire post private'}
                </span>
              }
              value={'private'}
              selectedValue={privacy}
              sx={{ mb: 2.5 }}
              {...form.register('privacyType')}
            />
            <Radio
              label={
                <span className={cn('flex items-center')}>
                  <PrivateFile className="mr-15" />
                  {'Make the files private'}
                </span>
              }
              value={'private_files'}
              selectedValue={privacy}
              disabled={noFiles}
              sx={{ mb: 2.5 }}
              {...form.register('privacyType')}
            />
            <Radio
              label={
                <span className={cn('flex items-center')}>
                  <LocationIcon className="mr-15" />
                  {'Make the location data private'}
                </span>
              }
              value={'private_locations'}
              selectedValue={privacy}
              disabled={noFiles}
              {...form.register('privacyType')}
            />
          </>
        </RadioGroup>
      </div>
      <div className="flex justify-end">
        <OutlinedButton className="mr-40">{'Cancel'}</OutlinedButton>
        <ContainedButton type="submit">{'Publish'}</ContainedButton>
      </div>
    </Form>
  );
};
