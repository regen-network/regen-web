import React, { forwardRef, ReactNode, useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { Crop } from 'react-image-crop';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';

import { getImageSrc } from '../../../image-crop/canvas-utils';
import FieldFormControl, {
  FieldFormControlProps,
} from '../FieldFormControl/FieldFormControl';
import { FileDropFile } from './FileDrop.File';
import { useFileDropStyles } from './FileDrop.styles';
import { FileDropRenderModalProps } from './FileDrop.types';
import { toBase64 } from './FileDrop.utils';
import { FileDropZone } from './FileDrop.Zone';

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
  location?: GeocodeFeature | Feature;
  label?: string;
  name: string;
  fileName?: string;
  mimeType?: string;
  description?: ReactNode;
  optional?: boolean | string;
  buttonText?: string;
  fixedCrop?: Partial<Crop>;
  hideDragText?: boolean;
  fieldIndex?: number;
  children?: React.ReactNode;
  dropZoneOption?: DropzoneOptions;
  isCropSubmitDisabled?: boolean;
  renderModal: (_: FileDropRenderModalProps) => React.ReactNode;
  setValue: (value: string, mimeType: string, fieldIndex: number) => void;
  onDelete?: (fileName: string) => Promise<void>;
  onUpload?: (imageFile: File) => Promise<string | undefined>;
  accept?: string;
  multi?: boolean;
}

/**
 * Drop file(s) and render a modal for those files
 */
const FileDrop = forwardRef<HTMLInputElement, ImageDropProps>(
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
      fileName,
      location,
      mimeType,
      isSubmitting,
      fieldIndex = 0,
      isCropSubmitDisabled = false,
      children,
      renderModal,
      setValue,
      onUpload,
      onDelete,
      accept,
      multi = false,
      ...fieldProps
    },
    ref,
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialImage, setInitialImage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
    const { classes: styles, cx } = useFileDropStyles();
    const isFirstField = fieldIndex === 0;

    const handleDrop = (files: File[]): void => {
      if (files && files.length > 0) {
        const file = files[0];
        setSelectedFiles(multi ? files : [file]);
        toBase64(file).then(base64String => {
          if (typeof base64String === 'string') {
            setIsModalOpen(true);
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
        const files = event.target.files;
        const file = files[0];
        setSelectedFiles(multi ? Array.from(files) : [file]);
        toBase64(file).then(base64String => {
          if (typeof base64String === 'string') {
            setIsModalOpen(true);
            setInitialImage(base64String);
          }
        });
      }
    };

    const onModalClose = (): void => {
      setInitialImage('');
      const remainingFiles = selectedFiles.slice(1);
      setSelectedFiles(remainingFiles);
      setIsModalOpen(false);
      if (multi && remainingFiles.length > 0) {
        toBase64(remainingFiles[0]).then(base64String => {
          if (typeof base64String === 'string') {
            setIsModalOpen(true);
            setInitialImage(base64String);
          }
        });
      }
    };

    const onModalSubmit = async (
      croppedImage: HTMLImageElement,
    ): Promise<void> => {
      const currentFile = selectedFiles[0];
      const result = await getImageSrc(
        croppedImage,
        onUpload,
        currentFile.name,
      );

      if (result) {
        setValue(result, currentFile.type, fieldIndex);
        const remainingFiles = selectedFiles.slice(1);
        setSelectedFiles(remainingFiles);
        setIsModalOpen(false);
        if (multi && remainingFiles.length > 0) {
          toBase64(remainingFiles[0]).then(base64String => {
            if (typeof base64String === 'string') {
              setIsModalOpen(true);
              setInitialImage(base64String);
            }
          });
        }
      }
    };

    const handleDelete = async (valueToDelete: string) => {
      setInitialImage('');
      setSelectedFiles([]);
      if (onDelete) {
        await onDelete(valueToDelete ?? '');
      }
    };

    const handleEdit = () => setIsModalOpen(true);
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
            <FileDropFile
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              value={value}
              caption={caption}
              name={fileName}
              credit={credit}
              location={location}
              mimeType={mimeType}
              accept={accept}
              classes={classes}
            />
          )}
          <FileDropZone
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            buttonText={buttonText}
            classes={classes}
            hideDragText={hideDragText}
            name={name}
            value={value}
            accept={accept}
            ref={ref}
          />
        </FieldFormControl>
        {renderModal({
          open: isModalOpen,
          initialImage,
          children,
          onClose: onModalClose,
          onSubmit: onModalSubmit,
        })}
      </>
    );
  },
);

export { FileDrop };
