import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FieldProps } from 'formik';
import { Crop } from 'react-image-crop';
import cx from 'clsx';
import { useDropzone } from 'react-dropzone';
// import Dropzone from 'react-dropzone';

import OutlinedButton from '../buttons/OutlinedButton';
import FieldFormControl from '../inputs/FieldFormControl';
import CropImageModal from '../modal/CropImageModal';
import TrashIcon from '../icons/TrashIcon';
import { Image } from '../image';
import { Label } from '../label';

export interface FileDropProps extends FieldProps {
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
    margin: theme.spacing(4),
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
}));

function FileDrop({
  className,
  classes,
  label,
  optional,
  labelSubText,
  buttonText,
  fixedCrop,
  hideDragText,
  ...fieldProps
}: FileDropProps): JSX.Element {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [initialImage, setInitialImage] = useState('');
  const styles = useStyles();
  const theme = useTheme();
  const { form, field } = fieldProps;

  const handleDrop = (event: any): void => {
    const fileList = event.dataTransfer ? event.dataTransfer.files : [];
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      console.log('handleDrop', file);

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
    onDrop: handleDrop,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event && event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];
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
    setCropModalOpen(false);
  };

  const handleCropModalSubmit = (croppedImage: HTMLImageElement): void => {
    form.setFieldValue(field.name, croppedImage.src);
    setCropModalOpen(false);
  };

  const handleDelete = (): void => {
    form.setFieldValue(field.name, undefined);
    setInitialImage('');
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
        {() =>
          field.value ? (
            <div className={cx(styles.preview, classes?.main)}>
              <Image className={styles.previewImage} src={field.value} backgroundImage />
              <IconButton classes={{ root: styles.deleteButton }} onClick={handleDelete} aria-label="delete">
                <TrashIcon color={theme.palette.error.light} />
              </IconButton>
            </div>
          ) : (
            <div className={cx('container')}>
              <div
                {...getRootProps({
                  className: cx('dropzone', classes?.main, styles.drop),
                  onDrop: handleDrop,
                })}
              >
                {!hideDragText && (
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
                  // type="file"
                  // hidden
                  onChange={handleFileChange}
                  // accept="image/*"
                  id={`file-drop-input-${field.name}`}
                />
                <label htmlFor={`file-drop-input-${field.name}`}>
                  <OutlinedButton classes={{ root: cx(styles.button, classes?.button) }} isImageBtn>
                    {buttonText || '+ add'}
                  </OutlinedButton>
                </label>
              </div>
            </div>
          )
        }
      </FieldFormControl>
      <CropImageModal
        open={cropModalOpen}
        onClose={handleCropModalClose}
        onSubmit={handleCropModalSubmit}
        initialImage={initialImage}
        fixedCrop={fixedCrop}
      />
    </>
  );
}

export { FileDrop };
