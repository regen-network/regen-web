import React from 'react';

import { ImageDrop, ImageDropProps } from './ImageDrop';
import ImageField from './ImageField';
import { uploadImage, deleteImage } from '../../utils/s3';

export interface ImageUploadProps extends ImageDropProps {
  apiServerUrl?: string;
  projectId?: string;
  isDrop?: boolean;
}

/**
 * For use with Project Images. After Cropping an Image, it will upload to S3 under that projects ID.
 */
function ImageUpload({ apiServerUrl, projectId, isDrop, ...props }: ImageUploadProps): JSX.Element {
  const projectPath = `projects/${projectId}`;

  const handleUpload = async (imageFile: File): Promise<string> => {
    return uploadImage(imageFile, projectPath, apiServerUrl);
  };

  const handleDelete = async (fileName: string): Promise<void> => {
    if (projectId) {
      return deleteImage(projectId, fileName, apiServerUrl);
    }
  };

  return isDrop ? (
    <ImageDrop {...props} onDelete={handleDelete} onUpload={handleUpload} />
  ) : (
    <ImageField {...props} onDelete={handleDelete} onUpload={handleUpload} />
  );
}

export { ImageUpload };
