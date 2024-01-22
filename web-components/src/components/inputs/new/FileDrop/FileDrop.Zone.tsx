import { forwardRef } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import OutlinedButton from '../../../buttons/OutlinedButton';
import { Label } from '../../../typography';
import { useFileDropStyles } from './FileDrop.styles';

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
  accept?: string;
};

export const FileDropZone = forwardRef<HTMLInputElement, Props>(
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
      accept,
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useFileDropStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'));

    const { getRootProps, getInputProps } = useDropzone({
      accept,
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
            accept={accept}
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
