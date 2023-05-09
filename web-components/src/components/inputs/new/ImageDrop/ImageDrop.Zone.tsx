import { forwardRef } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import OutlinedButton from '../../../buttons/OutlinedButton';
import { Label } from '../../../typography';
import { useImageDropStyles } from './ImageDrop.styles';

type Props = {
  buttonText?: string;
  name?: string;
  hideDragText?: boolean;
  dropZoneOption?: DropzoneOptions;
  value?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (files: File[]) => void;
};

export const ImageDropZone = forwardRef<HTMLInputElement, Props>(
  (
    {
      buttonText,
      name,
      hideDragText,
      dropZoneOption = {},
      value,
      classes,
      handleFileChange,
      handleDrop,
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useImageDropStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'));

    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDropAccepted: handleDrop,
      onDropRejected: () => {},
      noClick: true,
      noKeyboard: true,
      ...dropZoneOption,
    });

    return (
      <Box
        className={cx('container', styles.main, classes?.main)}
        sx={{ display: !!value ? 'none' : 'block' }}
      >
        <div
          {...getRootProps({
            className: cx('dropzone', styles.drop),
          })}
        >
          {isDesktop && !hideDragText && (
            <>
              <Label size="xs" mb={2}>
                drag and drop
              </Label>
              <span className={styles.or}>or</span>
            </>
          )}

          <input
            type="file"
            hidden
            accept="image/*"
            id={`btn-file-input-${name}`}
            {...getInputProps({
              defaultValue: '',
              contentEditable: false,
              draggable: false,
              spellCheck: false,
              onChange: handleFileChange,
            })}
            {...props}
            ref={ref}
          />
          <label htmlFor={`btn-file-input-${name}`}>
            <OutlinedButton
              component="span"
              classes={{ root: classes?.button }}
            >
              {buttonText || '+ add'}
            </OutlinedButton>
          </label>
        </div>
      </Box>
    );
  },
);
