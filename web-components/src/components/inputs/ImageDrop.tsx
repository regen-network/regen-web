import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { FieldProps } from 'formik';
import { Crop } from 'react-image-crop';
import cx from 'clsx';
import { useDropzone } from 'react-dropzone';

import OutlinedButton from '../buttons/OutlinedButton';
import FieldFormControl from './FieldFormControl';
import CropImageModal from '../modal/CropImageModal';
import TrashIcon from '../icons/TrashIcon';
import { Image } from '../image';
import { Label } from '../label';
import { getImageSrc } from '../image-crop/canvas-utils';

export interface ImageDropProps extends FieldProps {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  label?: string;
  optional?: boolean;
  labelSubText?: string;
  buttonText?: string;
  fixedCrop?: Crop;
  hideDragText?: boolean;
  onDelete?: (fileName: string) => Promise<void>;
  onUpload?: (imageFile: File) => Promise<string>;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  preview: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  previewImage: {
    height: '100%',
    width: '100%',
  },
  main: {
    height: '100%',
    width: '100%',
  },
  drop: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    background: theme.palette.grey[50],
    border: `2px dashed ${theme.palette.grey[100]}`,
  },
  label: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.pxToRem(12),
  },
  or: {
    marginBottom: theme.spacing(4),
    fontSize: theme.typography.pxToRem(12),
  },
  button: {
    fontSize: theme.typography.pxToRem(18),
  },
  deleteButton: {
    background: theme.palette.primary.main,
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
}));

/**
 * Drop an Image File and the Crop Modal will open with your image
 */
function ImageDrop({
  className,
  classes,
  label,
  optional,
  labelSubText,
  buttonText,
  fixedCrop,
  hideDragText,
  onUpload,
  onDelete,
  ...fieldProps
}: ImageDropProps): JSX.Element {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [initialImage, setInitialImage] = useState('');
  const [fileName, setFileName] = useState('');
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const { form, field } = fieldProps;

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDropAccepted: handleDrop,
    onDropRejected: () => {},
    noClick: true,
    noKeyboard: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
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

  // Convert file to base64 string
  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCropModalClose = (): void => {
    setInitialImage('');
    setFileName('');
    form.setFieldTouched(field.name, true);
    setCropModalOpen(false);
  };

  const onCropModalSubmit = async (croppedImage: HTMLImageElement): Promise<void> => {
    const result = await getImageSrc(croppedImage, onUpload, fileName);

    if (result) {
      form.setFieldValue(field.name, result);
      form.setFieldTouched(field.name, true);
      setCropModalOpen(false);
    }
  };

  const handleDelete = async (imageUrl: string): Promise<void> => {
    form.setFieldValue(field.name, undefined);
    if (onDelete) {
      await onDelete(imageUrl);
    }
    setInitialImage('');
    setFileName('');
  };

  return (
    <>
      <FieldFormControl
        className={cx(styles.root, classes?.root, className)}
        label={label}
        disabled={form.isSubmitting}
        optional={optional}
        labelSubText={labelSubText}
        {...fieldProps}
      >
        {() => {
          console.log('field', field);
          return field.value ? (
            <div className={cx(styles.preview, classes?.main)}>
              <Image className={styles.previewImage} src={field.value} backgroundImage />
              <IconButton
                classes={{ root: styles.deleteButton }}
                onClick={() => handleDelete(field.value)}
                aria-label="delete"
              >
                <TrashIcon color={theme.palette.error.light} />
              </IconButton>
            </div>
          ) : (
            <div className={cx('container', styles.main, classes?.main)}>
              <div
                {...getRootProps({
                  className: cx('dropzone', styles.drop),
                })}
              >
                {isDesktop && !hideDragText && (
                  <>
                    <Label className={styles.label}>drag and drop</Label>
                    <span className={styles.or}>or</span>
                  </>
                )}
                <input
                  {...getInputProps({
                    defaultValue: '',
                    contentEditable: false,
                    draggable: false,
                    spellCheck: false,
                  })}
                />
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                  id={`btn-file-input-${field.name}`}
                />
                <label htmlFor={`btn-file-input-${field.name}`}>
                  <OutlinedButton classes={{ root: cx(styles.button, classes?.button) }} isImageBtn>
                    {buttonText || '+ add'}
                  </OutlinedButton>
                </label>
              </div>
            </div>
          );
        }}
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
}

export { ImageDrop };
