import React from 'react';

import { deleteImage, uploadImage } from 'src/utils/s3';

import { ImageDrop, ImageDropProps } from '../ImageDrop/ImageDrop';
import { ImageField } from '../ImageField/ImageField';
import { ImageFieldBackground } from '../ImageField/ImageField.Background';

export interface ImageUploadProps extends ImageDropProps {
  apiServerUrl?: string;
  projectId?: string;
  isDrop?: boolean;
  setValue: (value: string) => void;
}

/**
 * For use with Project Images. After Cropping an Image, it will upload to S3 under that projects ID.
 */
function ImageUpload({
  apiServerUrl,
  projectId,
  isDrop,
  setValue,
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
    <ImageDrop {...props} onDelete={handleDelete} onUpload={handleUpload} />
  ) : (
    <ImageField {...props} onUpload={handleUpload} setValue={setValue}>
      <ImageFieldBackground value={props.value ?? ''} />
    </ImageField>
  );
}

export { ImageUpload };
