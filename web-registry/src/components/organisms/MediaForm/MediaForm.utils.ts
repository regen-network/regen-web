import { deleteImage, uploadImage } from 'web-components/lib/utils/s3';

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
      await deleteImage(projectId, fileName, apiServerUrl);
      callback && callback();
    }
  };
