import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ImageDrop } from 'web-components/lib/components/inputs/new/ImageDrop/ImageDrop';
import { ImageUploadProps } from 'web-components/lib/components/inputs/new/ProjectImageUpload/ProjectImageUpload';

import { apiUri } from '../../../lib/apiUri';
import {
  cropAspectMediaForm,
  GALLERY_PHOTOS,
  GALLERY_PHOTOS_DESCRIPTION,
  MAIN_PHOTO,
  MAIN_PHOTO_DESCRIPTION,
} from './MediaForm.constants';
import { MediaFormSchemaType } from './MediaForm.schema';
import {
  MediaBaseErrors,
  MediaBaseValues,
  MediaPhotoType,
} from './MediaForm.types';
import { gethandleDelete, getHandleUpload } from './MediaForm.utils';
import { useMediaFormStyles } from './useMediaFormStyles';

export interface MediaValuesSimple extends MediaBaseValues {
  'schema:creditText'?: string;
}

export interface MediaErrorsSimple extends MediaBaseErrors {
  'schema:creditText'?: string;
  'regen:galleryPhotos'?: Array<string>;
}

/** Simplified media form content for new project-page flow */

const MediaFormSimple = ({
  projectId,
}: {
  projectId?: string;
}): JSX.Element => {
  const { classes } = useMediaFormStyles();
  const ctx = useFormContext<MediaFormSchemaType>();
  const { register, control, setValue, formState } = ctx;
  const { errors } = formState;
  const imgDefaultProps: Partial<ImageUploadProps> = {
    apiServerUrl: apiUri,
    projectId,
    optional: true,
    classes: { main: classes.fullSizeMedia },
    buttonText: '+ Add Photo',
    fixedCrop: cropAspectMediaForm,
  };

  const shouldRenderGalleryPhoto = (i: number): boolean => {
    // don't show option for gallery if there is no preview photo or first
    // if (!values['regen:previewPhoto']) return false;
    // if there is a preview photo, render the first gallery photo
    // if (values['regen:previewPhoto'] && i === 0) return true;
    // otherwise, render based on the presence of last index
    // return Boolean(values['regen:galleryPhotos']?.[i - 1]);
    return false;
  };

  const { fields, append, remove } = useFieldArray({
    name: 'regen:galleryPhotos',
    control: control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        'schema:url': '',
        'schema:caption': '',
        'schema:creditText': '',
      });
    }
  }, [append, fields]);

  /* Watcher */

  const previewPhoto = useWatch({ control, name: 'regen:previewPhoto' });
  const galleryPhotos = useWatch({ control, name: 'regen:galleryPhotos' });

  /* Setter */

  const setPreviewPhoto = (value: MediaPhotoType): void => {
    setValue('regen:previewPhoto', value);
  };
  const setGalleryPhotos = (
    value: MediaPhotoType,
    fieldIndex: number,
  ): void => {
    setValue(`regen:galleryPhotos.${fieldIndex}`, value);
    append({
      'schema:url': '',
      'schema:caption': '',
      'schema:creditText': '',
    });
  };

  /* Callbacks  */

  const projectPath = `projects/${projectId}`;
  const handleUpload = getHandleUpload({
    apiServerUrl: apiUri,
    projectPath,
  });
  const handleDelete = gethandleDelete({
    apiServerUrl: apiUri,
    projectId,
  });
  const getHandleDeleteWithIndex = (fieldIndex: number) =>
    gethandleDelete({
      apiServerUrl: apiUri,
      projectId,
      callback: () => remove(fieldIndex),
    });

  return (
    <>
      <ImageDrop
        label={MAIN_PHOTO}
        description={MAIN_PHOTO_DESCRIPTION}
        value={previewPhoto}
        setValue={setPreviewPhoto}
        onUpload={handleUpload}
        onDelete={handleDelete}
        dropZoneOption={{ maxFiles: 1 }}
        error={!!errors['regen:previewPhoto']}
        helperText={errors['regen:previewPhoto']?.message}
        optional
        {...imgDefaultProps}
        {...register('regen:previewPhoto')}
      />
      {fields.map((field, index) => (
        <ImageDrop
          label={GALLERY_PHOTOS}
          description={GALLERY_PHOTOS_DESCRIPTION}
          onDelete={getHandleDeleteWithIndex(index)}
          onUpload={handleUpload}
          setValue={setGalleryPhotos}
          value={galleryPhotos?.[index]}
          error={!!errors['regen:galleryPhotos']?.[index]}
          helperText={errors['regen:galleryPhotos']?.[index]?.message}
          key={field.id}
          fieldIndex={index}
          dropZoneOption={{ maxFiles: 1 }}
          optional
          {...register('regen:galleryPhotos')}
          {...imgDefaultProps}
        />
      ))}
    </>
  );
};

export { MediaFormSimple };
