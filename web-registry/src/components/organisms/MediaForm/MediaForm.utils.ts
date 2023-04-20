import { UseFieldArrayPrepend, UseFieldArrayRemove } from 'react-hook-form';

import { deleteImage, uploadImage } from 'web-components/lib/utils/s3';

import { MediaFormSchemaType } from './MediaForm.schema';

/* handleUpload */

export type GetHandleUploadParams = {
  projectPath: string;
  apiServerUrl: string;
  prepend: UseFieldArrayPrepend<MediaFormSchemaType>;
};

export const getHandleUpload =
  ({ apiServerUrl, projectPath, prepend }: GetHandleUploadParams) =>
  async (imageFile: File): Promise<string> => {
    const imageUrl = await uploadImage(imageFile, projectPath, apiServerUrl);
    prepend({
      'schema:url': imageUrl,
      'schema:caption': '',
      'schema:creditText': '',
    });
    return imageUrl;
  };

/* handleDelete */

export type getHandleDeleteParams = {
  projectId?: string;
  apiServerUrl: string;
  remove: UseFieldArrayRemove;
  fieldIndex: number;
};

export const gethandleDelete =
  ({ apiServerUrl, projectId, fieldIndex, remove }: getHandleDeleteParams) =>
  async (fileName: string): Promise<void> => {
    if (projectId) {
      await deleteImage(projectId, fileName, apiServerUrl);
      remove(fieldIndex);
    }
  };
