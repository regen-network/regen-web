import React, { forwardRef, useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { Crop } from 'react-image-crop';
import { IconButtonProps } from '@mui/material';

import { getImageSrc } from '../../../image-crop/canvas-utils';
import CropImageModal from '../../../modal/CropImageModal';
import FieldFormControl, {
  FieldFormControlProps,
} from '../FieldFormControl/FieldFormControl';
import { ImageDropImage } from './ImageDrop.Image';
import { useImageDropStyles } from './ImageDrop.styles';
import { MediaPhotoType } from './ImageDrop.types';
import { toBase64 } from './ImageDrop.utils';
import { ImageDropZone } from './ImageDrop.Zone';

export interface ImageDropProps extends Partial<FieldFormControlProps> {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  isSubmitting?: boolean;
  value?: MediaPhotoType;
  label?: string;
  name: string;
  description?: string;
  optional?: boolean | string;
  buttonText?: string;
  fixedCrop?: Partial<Crop>;
  hideDragText?: boolean;
  fieldIndex?: number;
  dropZoneOption?: DropzoneOptions;
  setValue: (value: MediaPhotoType, fieldIndex: number) => void;
  onDelete?: (fileName: string) => Promise<void>;
  onUpload?: (imageFile: File) => Promise<string>;
}

/**
 * Drop an Image File and the Crop Modal will open with your image
 */
const ImageDrop = forwardRef<HTMLInputElement, ImageDropProps>(
  (
    {
      className,
      classes,
      label,
      name,
      description,
      optional,
      buttonText,
      fixedCrop,
      hideDragText,
      value,
      isSubmitting,
      fieldIndex = 0,
      setValue,
      onUpload,
      onDelete,
      ...fieldProps
    },
    ref,
  ) => {
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [initialImage, setInitialImage] = useState('');
    const [fileName, setFileName] = useState('');
    const { classes: styles, cx } = useImageDropStyles();
    const isFirstField = fieldIndex === 0;

    const handleDrop = (files: File[]): void => {
      if (files && files.length > 0) {
        const file = files[0];
        setFileName(file.name);
        toBase64(file).then(base64String => {
          if (typeof base64String === 'string') {
            setCropModalOpen(true);
            setInitialImage(base64String);
          }
        });
      }
    };

    const handleFileChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      if (
        event &&
        event.target &&
        event.target.files &&
        event.target.files.length > 0
      ) {
        const file = event.target.files[0];
        setFileName(file.name);
        toBase64(file).then(base64String => {
          if (typeof base64String === 'string') {
            setCropModalOpen(true);
            setInitialImage(base64String);
          }
        });
      }
    };

    const handleCropModalClose = (): void => {
      setInitialImage('');
      setFileName('');
      setCropModalOpen(false);
    };

    const onCropModalSubmit = async (
      croppedImage: HTMLImageElement,
    ): Promise<void> => {
      const result = await getImageSrc(croppedImage, onUpload, fileName);
      setValue(
        { 'schema:url': result, 'schema:caption': '', 'schema:creditText': '' },
        fieldIndex,
      );

      if (result) {
        setCropModalOpen(false);
      }
    };

    const handleDelete = async (valueToDelete: MediaPhotoType) => {
      setInitialImage('');
      setFileName('');
      if (onDelete) {
        await onDelete(valueToDelete['schema:url'] ?? '');
      }
    };

    return (
      <>
        <FieldFormControl
          className={cx(styles.root, classes?.root, className)}
          label={isFirstField ? label : undefined}
          description={isFirstField ? description : undefined}
          disabled={isSubmitting}
          optional={isFirstField ? optional : undefined}
          {...fieldProps}
        >
          {value && value?.['schema:url'] !== '' ? (
            <ImageDropImage
              handleDelete={handleDelete}
              value={value}
              classes={classes}
              ref={ref}
            />
          ) : (
            <ImageDropZone
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              buttonText={buttonText}
              classes={classes}
              hideDragText={hideDragText}
              name={name}
              ref={ref}
            />
          )}
        </FieldFormControl>
        <CropImageModal
          open={cropModalOpen}
          onClose={handleCropModalClose}
          onSubmit={onCropModalSubmit}
          initialImage={initialImage}
          fixedCrop={fixedCrop}
        />
      </>
    );
  },
);

export { ImageDrop };
