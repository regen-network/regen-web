import { UseFormReturn } from 'react-hook-form';

import { deleteImage, uploadImage } from 'web-components/lib/utils/s3';

import {
  DEFAULT_URL,
  GALLERY_PHOTOS_MAX,
  GALLERY_PHOTOS_MIN,
  MAX_PHOTOS_ERROR_MESSAGE,
  MIN_PHOTOS_ERROR_MESSAGE,
} from './MediaForm.constants';
import { MediaFormSchemaType } from './MediaForm.schema';

/* handleUpload */

export type GetHandleUploadParams = {
  projectPath: string;
  apiServerUrl: string;
};

export const getHandleUpload =
  ({ apiServerUrl, projectPath }: GetHandleUploadParams) =>
  async (imageFile: File): Promise<string> => {
    const imageUrl = await uploadImage(imageFile, projectPath, apiServerUrl);
    return imageUrl;
  };

/* handleDelete */

export type getHandleDeleteParams = {
  projectId?: string;
  apiServerUrl: string;
  callback?: () => void;
};

export const gethandleDelete =
  ({ apiServerUrl, projectId, callback }: getHandleDeleteParams) =>
  async (fileName: string): Promise<void> => {
    if (projectId) {
      callback && callback();
      await deleteImage(projectId, fileName, apiServerUrl);
    }
  };

/* validateEditProfileForm */

type ValidateMediaFormParams = {
  values: MediaFormSchemaType;
  setError: UseFormReturn<MediaFormSchemaType>['setError'];
};

export const validateMediaFormForm = ({
  values,
  setError,
}: ValidateMediaFormParams): boolean => {
  let hasError = false;
  const galleryPhotosCount =
    values['regen:galleryPhotos']?.filter(
      item => item['schema:url'] !== DEFAULT_URL,
    ).length ?? 0;

  if (galleryPhotosCount < GALLERY_PHOTOS_MIN) {
    setError('regen:galleryPhotos', {
      type: 'min',
      message: MIN_PHOTOS_ERROR_MESSAGE,
    });
    hasError = true;
  }
  if (galleryPhotosCount > GALLERY_PHOTOS_MAX) {
    setError('regen:galleryPhotos', {
      type: 'max',
      message: MAX_PHOTOS_ERROR_MESSAGE,
    });
    hasError = true;
  }

  return hasError;
};
