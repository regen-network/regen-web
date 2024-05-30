import React from 'react';

import { deleteImage, uploadFile } from '../../utils/s3';
import { ImageDrop, ImageDropProps } from './ImageDrop';
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
    return uploadFile(imageFile, projectPath, apiServerUrl);
  };

  const handleDelete = async (fileName: string): Promise<void> => {
    if (projectId) {
      deleteImage('projects', projectId, fileName, apiServerUrl);
    }
  };

  return isDrop ? (
    <ImageDrop {...props} onDelete={handleDelete} onUpload={handleUpload} />
  ) : (
    <ImageField {...props} onUpload={handleUpload} />
  );
}

export { ImageUpload };
