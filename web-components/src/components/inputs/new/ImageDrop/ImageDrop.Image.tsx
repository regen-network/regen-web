import { IconButton, IconButtonProps, useTheme } from '@mui/material';

import TrashIcon from 'src/components/icons/TrashIcon';
import { Image } from 'src/components/image';

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

export const ImageDropImage = ({ value, handleDelete, classes }: Props) => {
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
};
