import React, { forwardRef, ReactNode, useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { Crop } from 'react-image-crop';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';

import { getImageSrc, srcToFile } from '../../../image-crop/canvas-utils';
import FieldFormControl, {
  FieldFormControlProps,
} from '../FieldFormControl/FieldFormControl';
import { FileDropFile } from './FileDrop.File';
import { useFileDropStyles } from './FileDrop.styles';
import { FileDropRenderModalProps } from './FileDrop.types';
import { UploadingModal } from './FileDrop.UploadingModal';
import { ExifGPSData, toBase64 } from './FileDrop.utils';
import { FileDropZone } from './FileDrop.Zone';

export interface FileDropProps extends Partial<FieldFormControlProps> {
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
  dropZoneOption?: DropzoneOptions;
  isCropSubmitDisabled?: boolean;
  renderModal: (_: FileDropRenderModalProps) => React.ReactNode;
  setValue: (params: {
    value?: string;
    mimeType: string;
    fieldIndex: number;
    lastInMultiUpload: boolean;
    location?: ExifGPSData;
    name?: string;
    iri?: string;
  }) => void;
  onDelete?: (fileName: string, doSetValue?: boolean) => Promise<void>;
  onUpload?: (
    file: File,
  ) => Promise<
    { url: string; location?: ExifGPSData; iri?: string } | undefined
  >;
  accept?: string;
  multi?: boolean;
  moveUp?: () => void;
  moveDown?: () => void;
  uploadOnAdd?: boolean;
}

/**
 * Drop file(s) and render a modal for those files
 */
const FileDrop = forwardRef<HTMLInputElement, FileDropProps>(
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
      renderModal,
      setValue,
      onUpload,
      onDelete,
      accept,
      multi = false,
      moveUp,
      moveDown,
      dropZoneOption,
      uploadOnAdd,
      ...fieldProps
    },
    ref,
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [initialFile, setInitialFile] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
    const [nextFieldIndex, setNextFieldIndex] = useState(0);

    const { classes: styles, cx } = useFileDropStyles();
    const isFirstField = fieldIndex === 0;
    const upload = async (file: File, fieldIndex: number) => {
      if (uploadOnAdd && onUpload) {
        setUploading(true);
        const timestamp = new Date().getTime();
        const fileNameWithTimestamp = `${timestamp}-${file.name}`;
        const buf = await file.arrayBuffer();
        try {
          const uploaded = await onUpload(
            new File([buf], fileNameWithTimestamp, {
              type: file.type,
            }),
          );
          if (uploaded) {
            setValue({
              value: uploaded.url,
              mimeType: file.type,
              name: file.name,
              iri: uploaded.iri,
              location: uploaded.location,
              fieldIndex,
              lastInMultiUpload: false,
            });
          }
        } finally {
          setUploading(false);
        }
      }
    };

    const handleDrop = (files: File[]): void => {
      if (files && files.length > 0) {
        const file = files[0];
        setSelectedFiles(multi ? files : [file]);
        toBase64(file).then(async base64String => {
          if (typeof base64String === 'string') {
            setInitialFile(base64String);
            await upload(file, fieldIndex + nextFieldIndex);
            setIsModalOpen(true);
          }
        });
      }
    };

    const onModalClose = async () => {
      const remainingFiles = selectedFiles.slice(1);
      const hasRemainingFiles = remainingFiles.length > 0;
      if (!isEdit && uploadOnAdd && onDelete && value) {
        await onDelete(value, !multi || (multi && !hasRemainingFiles));
      }
      setInitialFile('');
      setSelectedFiles(remainingFiles);
      setIsModalOpen(false);
      if (multi && hasRemainingFiles) {
        const file = remainingFiles[0];
        toBase64(file).then(async base64String => {
          if (typeof base64String === 'string') {
            setInitialFile(base64String);
            await upload(file, fieldIndex + nextFieldIndex);
            setIsModalOpen(true);
          }
        });
      }
    };

    const onModalSubmit = async (
      croppedImage?: HTMLImageElement,
    ): Promise<void> => {
      // Delete file that has been edited
      if (isEdit && onDelete && value) {
        if (onDelete) {
          await onDelete(value, false);
        }
      }

      let result;
      const currentFile = selectedFiles[0];

      if (croppedImage && !uploadOnAdd) {
        result = await getImageSrc({
          croppedImage,
          onUpload,
          fileName: currentFile.name,
        });
      }

      if (result || uploadOnAdd) {
        const remainingFiles = selectedFiles.slice(1);
        const lastInMultiUpload = remainingFiles.length === 0;
        setValue({
          value: result,
          mimeType: currentFile?.type,
          fieldIndex: fieldIndex + nextFieldIndex,
          lastInMultiUpload,
        });
        setSelectedFiles(remainingFiles);
        setIsModalOpen(false);
        if (multi && !lastInMultiUpload) {
          setNextFieldIndex(current => current + 1);
          const file = remainingFiles[0];
          toBase64(file).then(async base64String => {
            if (typeof base64String === 'string') {
              setInitialFile(base64String);
              await upload(file, fieldIndex + nextFieldIndex + 1);
              setIsModalOpen(true);
            }
          });
        }
      }
    };

    const handleDelete = async (valueToDelete: string) => {
      setInitialFile('');
      setSelectedFiles([]);
      if (onDelete) {
        await onDelete(valueToDelete ?? '');
      }
    };

    const handleEdit = async () => {
      if (value) {
        const fileName = decodeURI(value.split('/').pop() || '');
        if (fileName) {
          const file = await srcToFile(value, fileName);
          setSelectedFiles([file]);
          toBase64(file).then(base64String => {
            if (typeof base64String === 'string') {
              setIsEdit(true);
              setIsModalOpen(true);
              setInitialFile(base64String);
            }
          });
        }
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
              moveUp={moveUp}
              moveDown={moveDown}
            />
          )}
          <FileDropZone
            handleDrop={handleDrop}
            buttonText={buttonText}
            classes={classes}
            hideDragText={hideDragText}
            name={name}
            value={value}
            accept={accept}
            ref={ref}
            dropZoneOption={dropZoneOption}
          />
        </FieldFormControl>
        <UploadingModal open={uploading} onClose={() => setUploading(false)} />
        {renderModal({
          open: isModalOpen,
          initialFile,
          currentIndex: fieldIndex + nextFieldIndex,
          onClose: onModalClose,
          onSubmit: onModalSubmit,
        })}
      </>
    );
  },
);

export { FileDrop };
