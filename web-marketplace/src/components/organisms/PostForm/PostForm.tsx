import { useEffect } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { LocationIcon } from 'web-components/src/components/icons/LocationIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import { PrivateFile } from 'web-components/src/components/icons/PrivateFile';
import { UnlockIcon } from 'web-components/src/components/icons/UnlockIcon';
import {
  FileDrop,
  FileDropProps,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import { ReorderFields } from 'web-components/src/components/inputs/new/ReorderFields/ReorderFields';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

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

  const imageDropCommonProps: Partial<FileDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: FILE_UPLOAD_BUTTON_LABEL,
    fixedCrop: cropAspectMediaForm,
  };

  const title = useWatch({ control: form.control, name: 'title' });
  const files = useWatch({ control: form.control, name: 'files' });
  const privacy = useWatch({ control: form.control, name: 'privacyType' });

  const noFiles = (files?.length ?? 0) <= 1;

  const { fields, append, remove, move } = useFieldArray({
    name: 'files',
    control: form.control,
  });

  const setFiles = (
    value: string,
    mimeType: string,
    fieldIndex: number,
    lastInMultiUpload: boolean,
  ): void => {
    if (lastInMultiUpload) {
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
      <ReorderFields
        label={'Files'}
        description={
          <Body>
            {
              '5MB max. Supported file types include text, spreadsheets, images, and video files. '
            }
            <Link href="#">{'View all supported file types»'}</Link>
          </Body>
        }
        fields={fields}
        move={move}
        getFieldElement={(_: Record<'id', string>, index: number) => {
          const file = files?.[index];
          const url = file?.url;

          return (
            <FileDrop
              moveUp={index === 0 ? undefined : () => move(index, index - 1)}
              moveDown={
                index === fields.length - 2
                  ? undefined
                  : () => move(index, index + 1)
              }
              onDelete={() => getHandleDeleteWithIndex(index)}
              value={url === DEFAULT ? '' : url}
              caption={file?.description}
              credit={file?.credit}
              fileName={file?.name}
              mimeType={file?.mimeType}
              location={
                file?.locationType === 'none' ? undefined : file?.location
              }
              setValue={setFiles}
              className={cn(
                index === fields.length - 1
                  ? 'mb-40 sm:mb-50'
                  : 'mb-20 sm:mb-30',
                ' mt-0',
                classes.galleryItem,
              )}
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
        }}
      />

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
              tooltip={<b>This post and all of its files will be visible.</b>}
              value={'public'}
              selectedValue={privacy}
              sx={{ mb: 2.5 }}
              {...form.register('privacyType')}
            />
            <Radio
              label={
                <div className={cn('flex items-center')}>
                  <LocationIcon className="mr-15" />
                  {'Make the location data private'}
                </div>
              }
              description={
                <span className="ml-[39px]">Post and files are public</span>
              }
              tooltip={
                <>
                  <b>
                    Only the locations of the files will be hidden from public
                    view.
                  </b>
                  <br />
                  <i>
                    File locations can still be shared privately via a secret
                    link.
                  </i>
                </>
              }
              value={'private_locations'}
              selectedValue={privacy}
              disabled={noFiles}
              sx={{ mb: 2.5 }}
              {...form.register('privacyType')}
            />
            <Radio
              label={
                <span className={cn('flex items-center')}>
                  <PrivateFile className="mr-15" />
                  {'Make the files and location data private'}
                </span>
              }
              description={<span className="ml-[39px]">Post is public</span>}
              tooltip={
                <>
                  <b>
                    All uploaded files and their location data will be hidden
                    from public view.
                  </b>
                  <br />
                  <i>Files can still be shared privately via secret link.</i>
                </>
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
                  <LockIcon className="mr-15" />
                  {'Make the entire post private'}
                </span>
              }
              tooltip={
                <>
                  <b>
                    The post and all of its contents will be hidden from public
                    view.
                  </b>
                  <br />
                  <i>
                    The post and files still can be shared privately via secret
                    link.
                  </i>
                </>
              }
              value={'private'}
              selectedValue={privacy}
              {...form.register('privacyType')}
            />
          </>
        </RadioGroup>
      </div>
      <CancelButtonFooter label="publish" onCancel={onClose} type="submit" />
    </Form>
  );
};
