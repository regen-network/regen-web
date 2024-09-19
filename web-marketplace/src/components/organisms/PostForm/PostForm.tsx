import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useFieldArray, useWatch } from 'react-hook-form';
import { msg, plural, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { MAPBOX_TOKEN } from 'config/globals';
import { Feature, Point } from 'geojson';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { LocationIcon } from 'web-components/src/components/icons/LocationIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import { PrivateFile } from 'web-components/src/components/icons/PrivateFile';
import { SaveIcon } from 'web-components/src/components/icons/SaveIcon';
import { UnlockIcon } from 'web-components/src/components/icons/UnlockIcon';
import {
  FileDrop,
  FileDropProps,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop';
import {
  ExifGPSData,
  exifToFeature,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop.utils';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import { ReorderFields } from 'web-components/src/components/inputs/new/ReorderFields/ReorderFields';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  FILE_DROP_BUTTON_TEXT,
  FILE_DROP_LOCATION_TEXT,
  FILE_DROP_MOVE_DOWN_TEXT,
  FILE_DROP_MOVE_UP_TEXT,
  FILE_UPLOADING_DESCRIPTION,
  FILE_UPLOADING_TITLE,
  REQUIRED_MESSAGE,
} from 'lib/constants/shared.constants';

import { Link } from 'components/atoms';
import { DragAndDropLabel } from 'components/atoms/DragAndDropLabel';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { EditFileFormSchemaType } from '../EditFileForm/EditFileForm.schema';
import { EditFileModal } from '../EditFileModal/EditFileModal';
import { cropAspectMediaForm, DEFAULT } from '../MediaForm/MediaForm.constants';
import { getHandleDelete } from '../MediaForm/MediaForm.utils';
import { useMediaFormStyles } from '../MediaForm/useMediaFormStyles';
import { useMetadataFormStyles } from '../MetadataForm/MetadataForm.styles';
import {
  FILE_UPLOAD_BUTTON_LABEL,
  POST_MAX_TITLE_LENGTH,
  POST_PRIVACY_DESCRIPTION,
} from './PostForm.constants';
import { getPostFormSchema, PostFormSchemaType } from './PostForm.schema';
import { Warning } from './PostForm.Warning';

export interface Props {
  initialValues?: PostFormSchemaType;
  className?: string;
  onClose: () => void;
  projectLocation: GeocodeFeature;
  offChainProjectId?: string;
  onSubmit?: SubmitHandler<PostFormSchemaType>;
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  handleUpload: (file: File) => Promise<
    | {
        url: string;
        location?: ExifGPSData;
        iri?: string | undefined;
      }
    | undefined
  >;
  onUpdateDirtyState?: (isDirty: boolean) => void;
}

export const PostForm = ({
  initialValues,
  className,
  projectLocation,
  offChainProjectId: _offChainProjectId,
  onClose,
  onSubmit,
  fileNamesToDeleteRef,
  handleUpload,
  onUpdateDirtyState,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const postFormSchema = useMemo(
    () =>
      getPostFormSchema({
        requiredMessage: _(REQUIRED_MESSAGE),
      }),
    [_],
  );
  const form = useZodForm({
    schema: postFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { classes } = useMediaFormStyles();
  const { classes: textAreaClasses } = useMetadataFormStyles();
  const { errors, isValid, dirtyFields } = form.formState;
  const { setValue } = form;

  const imageDropCommonProps: Partial<FileDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: _(FILE_UPLOAD_BUTTON_LABEL),
    fixedCrop: cropAspectMediaForm,
  };

  const title = useWatch({ control: form.control, name: 'title' });
  const files = useWatch({ control: form.control, name: 'files' });
  const privacy = useWatch({ control: form.control, name: 'privacyType' });
  const noFiles = (files?.length ?? 0) <= 1;

  const remainingTitleCharacters = useMemo(
    () =>
      getRemainingCharacters({
        value: title,
        charLimit: POST_MAX_TITLE_LENGTH,
      }),
    [title],
  );

  const { fields, append, remove, move } = useFieldArray({
    name: 'files',
    control: form.control,
  });

  const [fileLocation, setFileLocation] = useState<{
    [index: number]: Feature<Point>;
  }>({});

  const setFiles = ({
    value,
    mimeType,
    fieldIndex,
    lastInMultiUpload,
    location,
    name,
    iri,
  }: {
    value?: string;
    mimeType: string;
    fieldIndex: number;
    lastInMultiUpload: boolean;
    location?: ExifGPSData;
    name?: string;
    iri?: string;
  }): void => {
    if (lastInMultiUpload) {
      append({
        iri: DEFAULT,
        url: DEFAULT,
        name: DEFAULT,
        location: projectLocation,
        locationType: 'none',
        mimeType: '',
      });
    }
    if (value) setValue(`files.${fieldIndex}.url`, decodeURI(value));
    if (mimeType) setValue(`files.${fieldIndex}.mimeType`, mimeType);
    if (name) setValue(`files.${fieldIndex}.name`, name);
    if (iri) setValue(`files.${fieldIndex}.iri`, iri);

    let featureLocation: Feature<Point> | undefined;
    if (location) {
      featureLocation = exifToFeature(location) as Feature<Point> | undefined;
      if (featureLocation) {
        setValue(`files.${fieldIndex}.location`, featureLocation);
        setFileLocation(prev => ({
          ...prev,
          [fieldIndex]: featureLocation as Feature<Point>,
        }));
        setValue(`files.${fieldIndex}.locationType`, 'file');
      } else {
        setValue(`files.${fieldIndex}.location`, projectLocation);
        setValue(`files.${fieldIndex}.locationType`, 'none');
      }
    } else if (!files?.[fieldIndex]?.location) {
      setValue(`files.${fieldIndex}.location`, projectLocation);
      setValue(`files.${fieldIndex}.locationType`, 'none');
    }
  };

  const getHandleDeleteWithIndex = (fieldIndex: number) =>
    getHandleDelete({
      fileNamesToDeleteRef,
      callback: (doSetValue: boolean = true) => {
        if (doSetValue) remove(fieldIndex);
        setFileLocation(prev => {
          const newFileLocation = { ...prev };
          delete newFileLocation[fieldIndex];
          return newFileLocation;
        });
      },
    });

  /* Effect */

  useEffect(() => {
    if (
      fields?.length === 0 ||
      fields?.every(field => field['url'] !== DEFAULT)
    ) {
      append({
        iri: DEFAULT,
        url: DEFAULT,
        name: DEFAULT,
        location: projectLocation,
        locationType: 'none',
        mimeType: '',
      });
    }
  }, [append, fields, projectLocation]);

  const isFormDirty = (
    Object.keys(dirtyFields) as Array<keyof PostFormSchemaType>
  ).some(key =>
    key === 'files'
      ? dirtyFields.files && dirtyFields.files.length > 1
      : dirtyFields[key] === true,
  );

  useEffect(() => {
    if (onUpdateDirtyState) {
      onUpdateDirtyState(isFormDirty);
    }
  }, [isFormDirty, onUpdateDirtyState]);

  return (
    <Form
      className={cn('max-w-full w-[560px]', className)}
      form={form}
      onSubmit={onSubmit}
      fieldsetClassName="min-w-full"
    >
      <Title
        variant="h3"
        sx={{ textAlign: 'center' }}
        className="mb-40 sm:mb-50"
      >
        <Trans>New post</Trans>
      </Title>
      <TextField
        required
        type="text"
        label={_(msg`Title`)}
        description={_(msg`Summarize this update.`)}
        className="mb-40 sm:mb-50"
        error={!!errors.title}
        helperText={
          errors.title?.message || (
            <TextAreaFieldChartCounter
              value={title}
              charsLeft={remainingTitleCharacters}
              remainingCharactersText={plural(remainingTitleCharacters, {
                one: `${remainingTitleCharacters} character remaining`,
                other: `${remainingTitleCharacters} characters remaining`,
              })}
              sx={{ mb: { xs: 0, sm: 0 } }}
            />
          )
        }
        {...form.register('title')}
      />
      <TextAreaField
        required
        type="text"
        label={_(msg`Comment`)}
        description={_(msg`Write a short comment or longer project update. `)}
        rows={4}
        minRows={4}
        multiline
        className={cn(textAreaClasses.field, 'mt-0')}
        error={!!errors.comment}
        helperText={errors.comment?.message}
        {...form.register('comment')}
      />
      <ReorderFields
        label={_(msg`Files`)}
        description={
          <Body>
            <Trans>
              5MB max. Supported file types include text, spreadsheets, images,
              and video files.
            </Trans>
            &nbsp;
            <Link href="https://guides.regen.network/guides/regen-marketplace-project-developers-and-land-stewards/creating-posts">
              <Trans>View all supported file types»</Trans>
            </Link>
          </Body>
        }
        fields={fields}
        move={move}
        getFieldElement={(field: Record<'id', string>, index: number) => {
          const file = files?.[index] as EditFileFormSchemaType;
          const url = file?.url;
          return (
            <FileDrop
              dragAndDropLabel={<DragAndDropLabel />}
              fileUploadingTitle={_(FILE_UPLOADING_TITLE)}
              fileUploadingDescription={_(FILE_UPLOADING_DESCRIPTION)}
              locationText={_(FILE_DROP_LOCATION_TEXT)}
              moveUpText={_(FILE_DROP_MOVE_UP_TEXT)}
              moveDownText={_(FILE_DROP_MOVE_DOWN_TEXT)}
              buttonText={_(FILE_DROP_BUTTON_TEXT)}
              moveUp={index === 0 ? undefined : () => move(index, index - 1)}
              moveDown={
                index === fields.length - 2
                  ? undefined
                  : () => move(index, index + 1)
              }
              onUpload={handleUpload}
              onDelete={getHandleDeleteWithIndex(index)}
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
                ' mt-0 overflow-hidden',
                classes.galleryItem,
              )}
              fieldIndex={index}
              dropZoneOption={{ multiple: true }}
              error={!!errors['files']}
              helperText={errors['files']?.message}
              renderModal={({ open, currentIndex, onClose, onSubmit }) => (
                <EditFileModal
                  currentIndex={currentIndex}
                  open={open}
                  onClose={onClose}
                  projectLocation={projectLocation}
                  mapboxToken={MAPBOX_TOKEN}
                  onSubmit={onSubmit}
                  fileLocation={fileLocation[currentIndex]}
                />
              )}
              optional
              multi
              uploadOnAdd
              {...imageDropCommonProps}
              {...form.register(`files.${index}.url`)}
            />
          );
        }}
      />

      <div className="flex flex-col mb-40 sm:mb-50">
        <RadioGroup
          required
          label={
            <span className="inline-flex items-center">
              <LockIcon className="mr-10" />
              <Trans>Privacy settings</Trans>
            </span>
          }
          description={_(POST_PRIVACY_DESCRIPTION)}
          error={!!errors.privacyType}
          helperText={errors.privacyType?.message}
        >
          <>
            <Radio
              label={
                <span className={cn('flex items-center')}>
                  <UnlockIcon className="mr-15" />
                  <Trans>Make the entire post public</Trans>
                </span>
              }
              tooltip={
                <b>
                  <Trans>This post and all of its files will be visible.</Trans>
                </b>
              }
              value={'public'}
              selectedValue={privacy}
              sx={{ mb: 2.5 }}
              {...form.register('privacyType')}
            />
            <Radio
              label={
                <div className={cn('flex items-center')}>
                  <LocationIcon className="mr-15" />
                  <Trans>Make the location data private</Trans>
                </div>
              }
              description={
                <span className="ml-[39px]">
                  <Trans>Post and files are public</Trans>
                </span>
              }
              tooltip={
                <>
                  <b>
                    <Trans>
                      Only the locations of the files will be hidden from public
                      view.
                    </Trans>
                  </b>
                  <br />
                  <i>
                    <Trans>
                      File locations can still be shared privately via a secret
                      link.
                    </Trans>
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
                  <Trans>Make the files and location data private</Trans>
                </span>
              }
              description={
                <span className="ml-[39px]">
                  <Trans>Post is public</Trans>
                </span>
              }
              tooltip={
                <>
                  <b>
                    <Trans>
                      All uploaded files and their location data will be hidden
                      from public view.
                    </Trans>
                  </b>
                  <br />
                  <i>
                    <Trans>
                      Files can still be shared privately via secret link.
                    </Trans>
                  </i>
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
                  <Trans>Make the entire post private</Trans>
                </span>
              }
              tooltip={
                <>
                  <b>
                    <Trans>
                      The post and all of its contents will be hidden from
                      public view.
                    </Trans>
                  </b>
                  <br />
                  <i>
                    <Trans>
                      The post and files still can be shared privately via
                      secret link.
                    </Trans>
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
      <CancelButtonFooter
        disabled={!isValid}
        label="publish"
        onCancel={onClose}
        type="submit"
      >
        <OutlinedButton
          className="mr-10 flex justify-center gap-10"
          onClick={() => {
            setValue('published', false);
            onSubmit && onSubmit(form.getValues());
          }}
        >
          <SaveIcon className="mb-2" />
          <Trans>save draft</Trans>
        </OutlinedButton>
      </CancelButtonFooter>
      <div className="flex flex-col items-end mt-20">
        <Warning
          text={_(
            msg`NOTE: As posts are anchored to the blockchain, they are not editable once published`,
          )}
        />
      </div>
    </Form>
  );
};
