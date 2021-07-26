import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { FieldProps } from 'formik';
import { Crop } from 'react-image-crop';
import cx from 'clsx';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import FieldFormControl from 'web-components/lib/components/inputs/FieldFormControl';
import CropImageModal from 'web-components/lib/components/modal/CropImageModal';
import TrashIcon from 'web-components/lib/components/icons/TrashIcon';
import { Label } from '../atoms/Label';

export interface FileDropProps extends FieldProps {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
  };
  label?: string;
  optional?: boolean;
  buttonText?: string;
  onChange: (file: string) => void;
  fixedCrop?: Crop;
}

const useStyles = makeStyles((theme: Theme) => ({
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
    padding: theme.spacing(4),
    background: theme.palette.grey[50],
    border: `2px dashed ${theme.palette.grey[100]}`,
  },
  label: {
    marginBottom: theme.spacing(2),
  },
  or: {
    marginBottom: theme.spacing(4),
  },
  deleteButton: {
    background: theme.palette.primary.main,
    position: 'absolute',
    right: 0,
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
  onChange,
  buttonText,
  fixedCrop,
  ...fieldProps
}: FileDropProps): JSX.Element {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [initialImage, setInitialImage] = useState('');
  const styles = useStyles();
  const { form, field } = fieldProps;

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
        {...fieldProps}
      >
        {() =>
          field.value ? (
            <div className={cx(styles.preview, classes?.main)}>
              <img className={styles.previewImage} src={field.value} alt="preview" />
              <IconButton classes={{ root: styles.deleteButton }} onClick={handleDelete} aria-label="delete">
                <TrashIcon color="red" />
              </IconButton>
            </div>
          ) : (
            <div className={cx(styles.drop, classes?.main)}>
              <Label className={styles.label}>drag and drop</Label>
              <span className={styles.or}>or</span>
              <input type="file" hidden onChange={handleFileChange} accept="image/*" id="file-drop-input" />
              <label htmlFor="file-drop-input">
                <OutlinedButton isImageBtn>{buttonText || '+ add'}</OutlinedButton>
              </label>
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
