import { forwardRef, ReactNode, useState } from 'react';
import { Crop } from 'react-image-crop';
import { Box, ButtonBase, SxProps } from '@mui/material';

import { Theme } from '../../../../theme/muiTheme';
import OutlinedButton from '../../../buttons/OutlinedButton';
import { getImageSrc } from '../../../image-crop/canvas-utils';
import CropImageModal from '../../../modal/CropImageModal';
import FieldFormControl from '../FieldFormControl/FieldFormControl';
import {
  DEFAULT_IMAGE_EXTENSION,
  EXTENSION_REGEX,
} from './ImageField.constants';
import { useImageFieldStyles } from './ImageField.styles';

interface Props {
  name: string;
  label?: string;
  description?: string;
  buttonText?: string;
  initialFileName?: string;
  disabled?: boolean;
  optional?: boolean | string;
  circularCrop?: boolean;
  fixedCrop?: Partial<Crop>;
  children: ReactNode;
  setValue: (value: string) => void;
  onUpload?: (imageFile: File) => Promise<{ url: string } | undefined>;
  sx?: {
    label?: SxProps<Theme>;
    button?: SxProps<Theme>;
  };
  value?: string;
}

export const ImageField = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      description,
      optional,
      buttonText,
      initialFileName,
      disabled = false,
      circularCrop = false,
      fixedCrop = {},
      children,
      setValue,
      onUpload,
      sx = {},
      value,
      ...props
    }: Props,
    ref,
  ): JSX.Element => {
    const [initialImage, setInitialImage] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const { classes: styles } = useImageFieldStyles();
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
      const result = await getImageSrc({
        croppedImage,
        onUpload,
        fileName,
        fileType,
        value,
      });
      console.log(result);

      if (result) {
        setInitialImage('');
        setValue(result);
      }
    };

    const handleCropModalClose = (): void => {
      setInitialImage('');
      setFileName('');
      setFileType('');
    };

    return (
      <>
        <FieldFormControl
          label={label}
          description={description}
          disabled={disabled}
          optional={optional}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box component="label" htmlFor={inputId} sx={sx.label}>
              <ButtonBase component="span" disableRipple sx={sx.button}>
                {children}
              </ButtonBase>
            </Box>
            {buttonText && (
              <label htmlFor={inputId}>
                <OutlinedButton component="span" className={styles.button}>
                  {buttonText}
                </OutlinedButton>
              </label>
            )}
            <input
              {...props}
              type="file"
              hidden
              onChange={({ target: { files } }) => {
                if (files && files.length) {
                  const [file] = files;
                  toBase64(file).then(image => {
                    if (typeof image === 'string') {
                      const fileName = file.name;
                      const fileExtension =
                        fileName.match(EXTENSION_REGEX)?.[1] ??
                        DEFAULT_IMAGE_EXTENSION;
                      setInitialImage(image);
                      setFileType(file.type);
                      setFileName(
                        `${initialFileName}.${fileExtension}` ?? fileName,
                      );
                    }
                  });
                }
              }}
              accept="image/*"
              id={inputId}
              ref={ref}
            />
          </Box>
        </FieldFormControl>
        <CropImageModal
          circularCrop={circularCrop}
          fixedCrop={fixedCrop}
          initialImage={initialImage}
          open={!!initialImage}
          onClose={handleCropModalClose}
          onSubmit={onCropModalSubmit}
        />
      </>
    );
  },
);
