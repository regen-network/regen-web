import React, { useState } from 'react';
import { makeStyles, Theme, Box, Avatar } from '@material-ui/core';
import { FieldProps } from 'formik';
import OutlinedButton from '../buttons/OutlinedButton';
import FieldFormControl from './FieldFormControl';
import CropImageModal from '../modal/CropImageModal';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(22),
      width: theme.spacing(22),
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
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
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
}

export default function ImageField({
  description,
  className,
  label,
  optional,
  transformValue,
  triggerOnChange,
  ...fieldProps
}: Props): JSX.Element {
  const [initialImage, setInitialImage] = useState('');
  const { form, field } = fieldProps;

  function toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const styles = useStyles();

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
            <Avatar className={styles.avatar} src={field.value} />

            <input
              type="file"
              hidden
              onChange={({ target: { files } }) => {
                if (files && files.length) {
                  const [file] = files;
                  toBase64(file).then(image => {
                    if (typeof image === 'string') {
                      setInitialImage(image);
                    }
                  });
                }
              }}
              accept="image/*"
              id="image-upload-input"
            />
            <label htmlFor="image-upload-input">
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
        onClose={() => setInitialImage('')}
        onSubmit={croppedImage => {
          setInitialImage('');
          form.setFieldValue(field.name, croppedImage.src);
        }}
      />
    </>
  );
}
