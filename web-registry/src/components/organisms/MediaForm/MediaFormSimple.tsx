import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ImageUpload,
  ImageUploadProps,
} from 'web-components/lib/components/inputs/new/ProjectImageUpload/ProjectImageUpload';

import { apiUri } from '../../../lib/apiUri';
import { cropAspectMediaForm, PHOTO_COUNT } from './MediaForm.constants';
import { MediaBaseErrors, MediaBaseValues } from './MediaForm.types';
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
  const form = useForm();

  const imgDefaultProps: Partial<ImageUploadProps> = {
    apiServerUrl: apiUri,
    projectId,
    optional: true,
    isDrop: true,
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

  /* Setter */

  const setPreviewPhoto = (value: string): void => {
    form.setValue('previewPhoto', value);
  };
  const setGalleryPhotos = (value: string): void => {
    form.setValue('galleryPhotos', value);
  };

  return (
    <>
      <ImageUpload
        {...imgDefaultProps}
        isDrop={false}
        name="regen:previewPhoto"
        label="Photos"
        setValue={setPreviewPhoto}
      />
      {Array(PHOTO_COUNT)
        .fill(undefined)
        .map((_photo, i) => (
          <ImageUpload
            {...imgDefaultProps}
            setValue={setGalleryPhotos}
            key={i}
            name={`regen:galleryPhotos[${i}]`}
          />
        ))}
    </>
  );
};

export { MediaFormSimple };
