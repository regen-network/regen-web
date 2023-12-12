import { MutableRefObject, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import {
  ImageDrop,
  ImageDropProps,
} from 'web-components/src/components/inputs/new/ImageDrop/ImageDrop';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useProjectEditContext } from 'pages';

import { apiUri } from '../../../lib/apiUri';
import { useHandleUpload } from './hooks/useHandleUpload';
import {
  CAPTION_CHART_LIMIT,
  cropAspectMediaForm,
  DEFAULT_URL,
  GALLERY_PHOTOS,
  GALLERY_PHOTOS_DESCRIPTION,
  IMAGE_UPLOAD_BUTTON_LABEL,
  MAIN_PHOTO,
  MAIN_PHOTO_DESCRIPTION,
} from './MediaForm.constants';
import { MediaFormSchemaType } from './MediaForm.schema';
import { MediaBaseErrors, MediaBaseValues } from './MediaForm.types';
import { getHandleDelete } from './MediaForm.utils';
import { useMediaFormStyles } from './useMediaFormStyles';

export interface MediaValuesSimple extends MediaBaseValues {
  'schema:creditText'?: string;
}

export interface MediaErrorsSimple extends MediaBaseErrors {
  'schema:creditText'?: string;
  'regen:galleryPhotos'?: Array<string>;
}

type Props = {
  offChainProjectId?: string;
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  setOffChainProjectId: UseStateSetter<string | undefined>;
};

/** Simplified media form content for new project-page flow */

export const MediaFormPhotos = ({
  offChainProjectId,
  fileNamesToDeleteRef,
  setOffChainProjectId,
}: Props): JSX.Element => {
  const { classes } = useMediaFormStyles();
  const ctx = useFormContext<MediaFormSchemaType>();
  const { register, control, setValue, formState } = ctx;
  const { errors } = formState;
  // Since the form is getting modified by default, to add an empty input field for the gallery,
  // we need to manually keep track of the dirty state.
  // Update this ref whenever an action is performed in the form
  const { isDirtyRef } = useProjectEditContext();
  const imageDropCommonProps: Partial<ImageDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: IMAGE_UPLOAD_BUTTON_LABEL,
    fixedCrop: cropAspectMediaForm,
  };

  const { fields, append, remove } = useFieldArray({
    name: 'regen:galleryPhotos',
    control: control,
  });

  /* Watcher */

  const previewPhoto = useWatch({ control, name: 'regen:previewPhoto' });
  const galleryPhotos = useWatch({ control, name: 'regen:galleryPhotos' });

  /* Setter */

  const setPreviewPhoto = (value: string): void => {
    setValue('regen:previewPhoto.schema:url', encodeURI(value), {
      shouldDirty: true,
    });
    isDirtyRef.current = true;
  };
  const setGalleryPhotos = (value: string, fieldIndex: number): void => {
    if (galleryPhotos?.[fieldIndex]?.['schema:url'] === DEFAULT_URL) {
      append({
        'schema:url': DEFAULT_URL,
        'schema:caption': '',
        'schema:creditText': '',
      });
    }
    setValue(`regen:galleryPhotos.${fieldIndex}.schema:url`, encodeURI(value));
    isDirtyRef.current = true;
  };

  /* Callbacks  */

  const { handleUpload } = useHandleUpload({
    offChainProjectId,
    apiServerUrl: apiUri,
    setOffChainProjectId,
  });
  const handleDelete = getHandleDelete({
    fileNamesToDeleteRef,
    callback: () => {
      setValue('regen:previewPhoto', {
        'schema:url': '',
        'schema:creditText': '',
      });
      isDirtyRef.current = true;
    },
  });
  const getHandleDeleteWithIndex = (fieldIndex: number) =>
    getHandleDelete({
      fileNamesToDeleteRef,
      callback: () => {
        remove(fieldIndex);
        isDirtyRef.current = true;
      },
    });

  /* Effect */

  useEffect(() => {
    if (
      fields?.length === 0 ||
      fields?.every(field => field['schema:url'] !== DEFAULT_URL)
    ) {
      append({
        'schema:url': DEFAULT_URL,
        'schema:caption': '',
        'schema:creditText': '',
      });
    }
  }, [append, fields]);

  return (
    <>
      <ImageDrop
        label={MAIN_PHOTO}
        description={MAIN_PHOTO_DESCRIPTION}
        value={previewPhoto?.['schema:url']}
        credit={previewPhoto?.['schema:creditText']}
        setValue={setPreviewPhoto}
        onUpload={handleUpload}
        onDelete={handleDelete}
        dropZoneOption={{ maxFiles: 1 }}
        error={!!errors['regen:previewPhoto']}
        helperText={errors['regen:previewPhoto']?.message}
        optional
        {...imageDropCommonProps}
        {...register('regen:previewPhoto.schema:url')}
      >
        <TextField
          type="text"
          label="Photo credit"
          {...register('regen:previewPhoto.schema:creditText')}
          helperText={
            errors['regen:previewPhoto']?.['schema:creditText']?.message
          }
          error={!!errors['regen:previewPhoto']?.['schema:creditText']}
          optional
        />
      </ImageDrop>
      {fields.map((field, index) => {
        const url = galleryPhotos?.[index]?.['schema:url'];
        const isFirst = index === 0;
        const isLast = index === fields.length - 1;
        const hasFieldError = !!errors['regen:galleryPhotos']?.[index];
        const fieldErrorMessage =
          errors['regen:galleryPhotos']?.[index]?.['schema:caption']?.message;

        return (
          <ImageDrop
            label={GALLERY_PHOTOS}
            description={GALLERY_PHOTOS_DESCRIPTION}
            onDelete={getHandleDeleteWithIndex(index)}
            onUpload={handleUpload}
            setValue={setGalleryPhotos}
            value={url === DEFAULT_URL ? '' : url}
            caption={galleryPhotos?.[index]?.['schema:caption']}
            credit={galleryPhotos?.[index]?.['schema:creditText']}
            error={(!!errors['regen:galleryPhotos'] && isLast) || hasFieldError}
            helperText={
              fieldErrorMessage ?? errors['regen:galleryPhotos']?.message
            }
            key={field.id}
            fieldIndex={index}
            dropZoneOption={{ maxFiles: 1 }}
            isCropSubmitDisabled={hasFieldError}
            className={classes.galleryItem}
            defaultStyle={isFirst ? true : false}
            optional
            {...register(`regen:galleryPhotos.${index}.schema:url`)}
            {...imageDropCommonProps}
          >
            <TextAreaField
              type="text"
              label="Caption"
              rows={3}
              minRows={3}
              multiline
              optional
              helperText={
                errors['regen:galleryPhotos']?.[index]?.['schema:caption']
                  ?.message
              }
              error={
                !!errors['regen:galleryPhotos']?.[index]?.['schema:caption']
              }
              {...register(`regen:galleryPhotos.${index}.schema:caption`)}
            >
              <TextAreaFieldChartCounter
                value={galleryPhotos?.[index]?.['schema:caption']}
                charLimit={CAPTION_CHART_LIMIT}
              />
            </TextAreaField>
            <TextField
              type="text"
              label="Photo credit"
              helperText={
                errors['regen:galleryPhotos']?.[index]?.['schema:creditText']
                  ?.message
              }
              error={
                !!errors['regen:galleryPhotos']?.[index]?.['schema:creditText']
              }
              optional
              {...register(`regen:galleryPhotos.${index}.schema:creditText`)}
            />
          </ImageDrop>
        );
      })}
    </>
  );
};
