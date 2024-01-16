import { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { LocationIcon } from 'web-components/lib/components/icons/LocationIcon';
import { LockIcon } from 'web-components/lib/components/icons/LockIcon';
import { PrivateFile } from 'web-components/lib/components/icons/PrivateFile';
import { UnlockIcon } from 'web-components/lib/components/icons/UnlockIcon';
import {
  FileDrop,
  ImageDropProps,
} from 'web-components/lib/components/inputs/new/FileDrop/FileDrop';
import { Radio } from 'web-components/lib/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/lib/components/inputs/new/RadioGroup/RadioGroup';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { CancelButtonFooter } from 'web-components/lib/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/lib/components/typography';
import { cn } from 'web-components/lib/utils/styles/cn';

import { Link } from 'components/atoms';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { cropAspectMediaForm, DEFAULT } from '../MediaForm/MediaForm.constants';
import { useMediaFormStyles } from '../MediaForm/useMediaFormStyles';
import { useMetadataFormStyles } from '../MetadataForm/MetadataForm.styles';
import {
  FILE_UPLOAD_BUTTON_LABEL,
  POST_MAX_TITLE_LENGTH,
  POST_PRIVACY_DESCRIPTION,
} from './PostForm.constants';
import { postFormSchema, PostFormSchemaType } from './PostForm.schema';

export interface Props {
  initialValues: PostFormSchemaType;
  className?: string;
  onClose: () => void;
  projectLocation: GeocodeFeature;
}

export const PostForm = ({
  initialValues,
  className,
  projectLocation,
  onClose,
}: Props): JSX.Element => {
  const form = useZodForm({
    schema: postFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { classes } = useMediaFormStyles();
  const { classes: textAreaClasses } = useMetadataFormStyles();
  const { errors } = form.formState;
  const { setValue } = form;

  const imageDropCommonProps: Partial<ImageDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: FILE_UPLOAD_BUTTON_LABEL,
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

  const setFiles = (
    value: string,
    mimeType: string,
    fieldIndex: number,
  ): void => {
    if (files?.[fieldIndex]?.['url'] === DEFAULT) {
      append({
        url: DEFAULT,
        name: DEFAULT,
        location: projectLocation,
        locationType: 'none',
        mimeType: '',
      });
    }
    setValue(`files.${fieldIndex}.url`, encodeURI(value));
    setValue(`files.${fieldIndex}.mimeType`, encodeURI(mimeType));
  };

  const getHandleDeleteWithIndex = async (fieldIndex: number) => {
    remove(fieldIndex);
  };

  /* Effect */

  useEffect(() => {
    if (
      fields?.length === 0 ||
      fields?.every(field => field['url'] !== DEFAULT)
    ) {
      append({
        url: DEFAULT,
        name: DEFAULT,
        location: projectLocation,
        locationType: 'none',
        mimeType: '',
      });
    }
  }, [append, fields, projectLocation]);

  return (
    <Form className={cn('max-w-[560px]', className)} form={form}>
      <Title
        variant="h3"
        sx={{ textAlign: 'center' }}
        className="mb-40 sm:mb-50"
      >
        New post
      </Title>
      <TextField
        type="text"
        label="Title"
        description="Summarize this update."
        className="mb-40 sm:mb-50"
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
        className={cn(textAreaClasses.field, 'mb-40 sm:mb-50 mt-0')}
        {...form.register('comment')}
      />
      {fields.map((field, index) => {
        const file = files?.[index];
        const url = file?.url;

        return (
          <FileDrop
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
            value={url === DEFAULT ? '' : url}
            caption={file?.description}
            credit={file?.credit}
            fileName={file?.name}
            mimeType={file?.mimeType}
            location={
              !file?.locationType && file?.locationType === 'none'
                ? undefined
                : file?.location
            }
            setValue={setFiles}
            className={cn(
              index === fields.length - 1 ? 'mb-40 sm:mb-50' : 'mb-20 sm:mb-30',
              ' mt-0',
              classes.galleryItem,
            )}
            key={field.id}
            fieldIndex={index}
            error={!!errors['files']}
            helperText={errors['files']?.message}
            renderModal={() => <div />}
            optional
            multi
            {...imageDropCommonProps}
            {...form.register('files')}
          />
        );
      })}
      <div className="flex flex-col mb-40 sm:mb-50">
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
      <CancelButtonFooter label="publish" onCancel={onClose} type="submit" />
    </Form>
  );
};
