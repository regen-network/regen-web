import { MutableRefObject } from 'react';

import { uploadImage } from 'web-components/lib/utils/s3';

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
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  callback?: () => void;
};

export const getHandleDelete =
  ({ fileNamesToDeleteRef, callback }: getHandleDeleteParams) =>
  async (fileName: string): Promise<void> => {
    fileNamesToDeleteRef.current.push(fileName);
    callback && callback();
  };
