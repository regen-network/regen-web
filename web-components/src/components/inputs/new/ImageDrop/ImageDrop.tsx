import React, { forwardRef, useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { Crop } from 'react-image-crop';

import { getImageSrc } from '../../../image-crop/canvas-utils';
import CropImageModal from '../../../modal/CropImageModal';
import FieldFormControl, {
  FieldFormControlProps,
} from '../FieldFormControl/FieldFormControl';
import { ImageDropImage } from './ImageDrop.Image';
import { useImageDropStyles } from './ImageDrop.styles';
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
  value?: string;
  caption?: string;
  credit?: string;
  label?: string;
  name: string;
  description?: string;
  optional?: boolean | string;
  buttonText?: string;
  fixedCrop?: Partial<Crop>;
  hideDragText?: boolean;
  fieldIndex?: number;
  children?: React.ReactNode;
  dropZoneOption?: DropzoneOptions;
  isCropSubmitDisabled?: boolean;
  setValue: (value: string, fieldIndex: number) => void;
  onDelete?: (fileName: string) => Promise<void>;
  onUpload?: (imageFile: File) => Promise<string | undefined>;
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
      caption,
      credit,
      isSubmitting,
      fieldIndex = 0,
      isCropSubmitDisabled = false,
      children,
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

      if (result) {
        setValue(result, fieldIndex);
        setCropModalOpen(false);
      }
    };

    const handleDelete = async (valueToDelete: string) => {
      setInitialImage('');
      setFileName('');
      if (onDelete) {
        await onDelete(valueToDelete ?? '');
      }
    };

    const handleEdit = () => setCropModalOpen(true);

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
          {value && (
            <ImageDropImage
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              value={value}
              caption={caption}
              credit={credit}
              classes={classes}
            />
          )}
          <ImageDropZone
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            buttonText={buttonText}
            classes={classes}
            hideDragText={hideDragText}
            name={name}
            value={value}
            ref={ref}
          />
        </FieldFormControl>
        <CropImageModal
          open={cropModalOpen}
          onClose={handleCropModalClose}
          onSubmit={onCropModalSubmit}
          initialImage={initialImage}
          fixedCrop={fixedCrop}
          isCropSubmitDisabled={isCropSubmitDisabled}
          isIgnoreCrop={!!value}
        >
          {children}
        </CropImageModal>
      </>
    );
  },
);

export { ImageDrop };
