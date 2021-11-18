import React from 'react';

import { ImageDrop, ImageDropProps } from './ImageDrop';
import { uploadImage, deleteImage } from '../../utils/s3';

export interface ImageUploadProps extends ImageDropProps {
  apiServerUrl?: string;
  projectId?: string;
}

/**
 * For use with Project Images. After Cropping an Image, it will upload to S3 under that projects ID.
 */
function ImageUpload({ apiServerUrl, projectId, ...props }: ImageUploadProps): JSX.Element {
  const projectPath = `projects/${projectId}`;

  const handleUpload = async (imageFile: File): Promise<string> => {
    return uploadImage(imageFile, projectPath, apiServerUrl);
  };

  const handleDelete = async (fileName: string): Promise<void> => {
    if (projectId) {
      return deleteImage(projectId, fileName, apiServerUrl);
    }
  };

  return <ImageDrop {...props} onDelete={handleDelete} onUpload={handleUpload} />;
}

export { ImageUpload };
