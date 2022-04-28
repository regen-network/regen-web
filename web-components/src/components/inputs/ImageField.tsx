import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Box, Avatar } from '@mui/material';
import { FieldProps } from 'formik';

import OutlinedButton from '../buttons/OutlinedButton';
import FieldFormControl from './FieldFormControl';
import CropImageModal from '../modal/CropImageModal';
import AvatarIcon from '../icons/AvatarIcon';
import { getImageSrc } from '../image-crop/canvas-utils';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(22),
      width: theme.spacing(22),
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(20),
      width: theme.spacing(20),
      marginRight: theme.spacing(3),
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      paddingRight: theme.spacing(8),
      paddingLeft: theme.spacing(8),
    },
  },
}));

interface Props extends FieldProps {
  className?: string;
  description?: string;
  label?: string;
  optional?: boolean;
  fallbackAvatar?: JSX.Element;
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
  onUpload?: (imageFile: File) => Promise<string>;
}

export default function ImageField({
  description,
  className,
  label,
  optional,
  fallbackAvatar,
  transformValue,
  triggerOnChange,
  onUpload,
  ...fieldProps
}: Props): JSX.Element {
  const [initialImage, setInitialImage] = useState('');
  const [fileName, setFileName] = useState('');
  const styles = useStyles();
  const {
    form,
    field: { name, value },
  } = fieldProps;
  const inputId = `image-upload-input-${name.toString()}`;

  function toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onCropModalSubmit = async (
    croppedImage: HTMLImageElement,
  ): Promise<void> => {
    const result = await getImageSrc(croppedImage, onUpload, fileName);

    setInitialImage('');
    form.setFieldValue(name, result);
    form.setFieldTouched(name, true);
  };

  const handleCropModalClose = (): void => {
    setInitialImage('');
    setFileName('');
    form.setFieldTouched(name, true);
  };

  return (
    <>
      <FieldFormControl
        className={className}
        label={label}
        disabled={form.isSubmitting}
        optional={optional}
        {...fieldProps}
      >
        {() => (
          <Box display="flex" alignItems="center">
            <Avatar className={styles.avatar} src={value}>
              {fallbackAvatar || <AvatarIcon />}
            </Avatar>

            <input
              type="file"
              hidden
              onChange={({ target: { files } }) => {
                if (files && files.length) {
                  const [file] = files;
                  toBase64(file).then(image => {
                    if (typeof image === 'string') {
                      setInitialImage(image);
                      setFileName(file.name);
                    }
                  });
                }
              }}
              accept="image/*"
              id={inputId}
            />
            <label htmlFor={inputId}>
              <OutlinedButton isImageBtn className={styles.button}>
                Add Image
              </OutlinedButton>
            </label>
          </Box>
        )}
      </FieldFormControl>
      <CropImageModal
        circularCrop
        initialImage={initialImage}
        open={!!initialImage}
        onClose={handleCropModalClose}
        onSubmit={onCropModalSubmit}
      />
    </>
  );
}
