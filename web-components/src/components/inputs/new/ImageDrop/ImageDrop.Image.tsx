import { forwardRef } from 'react';
import { IconButton, useTheme } from '@mui/material';

import TrashIcon from '../../../../components/icons/TrashIcon';
import { Image } from '../../../../components/image';
import { useImageDropStyles } from './ImageDrop.styles';
import { MediaPhotoType } from './ImageDrop.types';

type Props = {
  value: MediaPhotoType;
  handleDelete: (value: MediaPhotoType) => void;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
};

export const ImageDropImage = forwardRef<HTMLInputElement, Props>(
  ({ value, handleDelete, classes }, ref) => {
    const { classes: styles, cx } = useImageDropStyles();
    const theme = useTheme();

    return (
      <div className={cx(styles.preview, classes?.main)}>
        <Image
          className={styles.previewImage}
          src={value['schema:url']}
          backgroundImage
        />
        <IconButton
          classes={{ root: styles.deleteButton }}
          onClick={() => handleDelete(value)}
          aria-label="delete"
          size="large"
        >
          <TrashIcon color={theme.palette.error.dark} />
        </IconButton>
      </div>
    );
  },
);
