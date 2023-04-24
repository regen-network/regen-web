import { forwardRef } from 'react';
import { IconButton, IconButtonProps, useTheme } from '@mui/material';

import TrashIcon from '../../../../components/icons/TrashIcon';
import { Image } from '../../../../components/image';
import { useImageDropStyles } from './ImageDrop.styles';

type Props = {
  value: string;
  handleDelete: IconButtonProps['onClick'];
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
        <Image className={styles.previewImage} src={value} backgroundImage />
        <IconButton
          classes={{ root: styles.deleteButton }}
          onClick={handleDelete}
          aria-label="delete"
          size="large"
        >
          <TrashIcon color={theme.palette.error.light} />
        </IconButton>
      </div>
    );
  },
);
