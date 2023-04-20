import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ImageDrop } from 'web-components/lib/components/inputs/new/ImageDrop/ImageDrop';
import { ImageField } from 'web-components/lib/components/inputs/new/ImageField/ImageField';
import { ImageFieldBackground } from 'web-components/lib/components/inputs/new/ImageField/ImageField.Background';
import { ImageUploadProps } from 'web-components/lib/components/inputs/new/ProjectImageUpload/ProjectImageUpload';

import { apiUri } from '../../../lib/apiUri';
import { cropAspectMediaForm } from './MediaForm.constants';
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
  const { register, control, setValue } = ctx;
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

  const { fields, append, prepend, remove } = useFieldArray({
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

  /* Setter */

  const setPreviewPhoto = (value: MediaPhotoType): void => {
    setValue('regen:previewPhoto', value);
  };
  const setGalleryPhotos = (
    value: MediaPhotoType,
    fieldIndex: number,
  ): void => {
    setValue(`regen:galleryPhotos.${fieldIndex}`, value);
  };

  /* Callbacks  */

  const projectPath = `projects/${projectId}`;
  const handleUpload = getHandleUpload({
    apiServerUrl: apiUri,
    projectPath,
    prepend,
  });
  const getHandleDeleteWithIndex = (fieldIndex: number) =>
    gethandleDelete({
      apiServerUrl: apiUri,
      projectId,
      remove,
      fieldIndex,
    });

  return (
    <>
      <ImageField
        {...imgDefaultProps}
        label="Photos"
        setValue={setPreviewPhoto}
        onUpload={handleUpload}
        {...register('regen:previewPhoto')}
        name="preview-photo"
      >
        <ImageFieldBackground value={previewPhoto?.['schema:url'] ?? ''} />
      </ImageField>
      {fields.map((field, index) => (
        <ImageDrop
          onDelete={getHandleDeleteWithIndex(index)}
          onUpload={handleUpload}
          setValue={setGalleryPhotos}
          key={field.id}
          fieldId={field.id}
          fieldIndex={index}
          {...register('regen:galleryPhotos')}
          {...imgDefaultProps}
          name="gallery-photos"
        />
      ))}
    </>
  );
};

export { MediaFormSimple };
