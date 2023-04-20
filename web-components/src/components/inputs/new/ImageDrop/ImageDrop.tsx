import React, { forwardRef, useState } from 'react';
import { Crop } from 'react-image-crop';
import { IconButtonProps } from '@mui/material';

import { getImageSrc } from '../../../image-crop/canvas-utils';
import CropImageModal from '../../../modal/CropImageModal';
import FieldFormControl from '../FieldFormControl/FieldFormControl';
import { ImageDropImage } from './ImageDrop.Image';
import { useImageDropStyles } from './ImageDrop.styles';
import { toBase64 } from './ImageDrop.utils';
import { ImageDropZone } from './ImageDrop.Zone';

export interface ImageDropProps {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  isSubmitting?: boolean;
  value?: string;
  label?: string;
  name: string;
  optional?: boolean | string;
  buttonText?: string;
  fixedCrop?: Partial<Crop>;
  hideDragText?: boolean;
  fieldId: string;
  fieldIndex: number;
  setValue: (value: any, fieldIndex: number) => void;
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
      optional,
      buttonText,
      fixedCrop,
      hideDragText,
      value,
      isSubmitting,
      fieldId,
      fieldIndex,
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

    const handleDrop = (files: File[]): void => {
      if (files && files.length > 0) {
        const file = files[0];

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
      setValue(result, fieldIndex);

      if (result) {
        setCropModalOpen(false);
      }
    };

    const handleDelete: IconButtonProps['onClick'] = e => {
      if (value) {
        setInitialImage('');
        setFileName('');
      }
      return async (imageUrl: string): Promise<void> => {
        if (onDelete) await onDelete(imageUrl);
      };
    };

    return (
      <>
        <FieldFormControl
          className={cx(styles.root, classes?.root, className)}
          label={label}
          disabled={isSubmitting}
          optional={optional}
          {...fieldProps}
        >
          {value ? (
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
