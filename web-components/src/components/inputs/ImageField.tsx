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
  imageBox: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
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
  const [image, setImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const { form, field } = fieldProps; // passed from Formik <Field />

  // On file select (from the pop up)
  const onFileChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>): void => {
    if (files && files.length) {
      const [file] = files;
      toBase64(file).then(image => {
        if (typeof image === 'string') {
          setUploadedImage(image);
          // setModalOpen(true);
        }
      });
    }
  };

  const handleClose = (): void => {
    setUploadedImage('');
    setImage('');
    setModalOpen(false);
  };

  const handleSelectImage = (croppedImage: HTMLImageElement): void => {
    const imageUrl = croppedImage.src;
    setImage(imageUrl);
    form.setFieldValue(field.name, imageUrl);
    setModalOpen(false);
  };

  // Convert file to base64 string
  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const classes = useStyles();

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
          // TODO: typescript takes issue if you just pass children  so the empty render prop is a hack
          <Box className={classes.imageBox} display="flex" alignItems="center">
            <Avatar className={classes.avatar} src={image} />

            <input type="file" hidden onChange={onFileChange} accept="image/*" id="image-upload-input" />
            <label htmlFor="image-upload-input">
              <OutlinedButton isImageBtn className={classes.button}>
                Add Image
              </OutlinedButton>
            </label>
          </Box>
        )}
      </FieldFormControl>
      <CropImageModal
        circularCrop
        image={uploadedImage}
        open={!!uploadedImage.length}
        onClose={handleClose}
        onSubmit={handleSelectImage}
      />
    </>
  );
}
