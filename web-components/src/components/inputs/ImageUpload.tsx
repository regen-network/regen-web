import React from 'react';

import { deleteImage, uploadImage } from '../../utils/s3';
import { FileDrop, ImageDropProps } from './FileDrop';
import ImageField from './ImageField';

export interface ImageUploadProps extends ImageDropProps {
  apiServerUrl?: string;
  projectId?: string;
  isDrop?: boolean;
}

/**
 * For use with Project Images. After Cropping an Image, it will upload to S3 under that projects ID.
 */
function ImageUpload({
  apiServerUrl,
  projectId,
  isDrop,
  ...props
}: ImageUploadProps): JSX.Element {
  const projectPath = `projects/${projectId}`;

  const handleUpload = async (imageFile: File): Promise<string> => {
    return uploadImage(imageFile, projectPath, apiServerUrl);
  };

  const handleDelete = async (fileName: string): Promise<void> => {
    if (projectId) {
      deleteImage(projectId, fileName, apiServerUrl);
    }
  };

  return isDrop ? (
    <FileDrop {...props} onDelete={handleDelete} onUpload={handleUpload} />
  ) : (
    <ImageField {...props} onUpload={handleUpload} />
  );
}

export { ImageUpload };
