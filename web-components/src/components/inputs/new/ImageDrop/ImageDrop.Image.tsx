import { IconButton, useTheme } from '@mui/material';

import TrashIcon from '../../../../components/icons/TrashIcon';
import { Image } from '../../../../components/image';
import { useImageDropStyles } from './ImageDrop.styles';

type Props = {
  value: string;
  handleDelete: (value: string) => void;
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
        onClick={() => handleDelete(value)}
        aria-label="delete"
        size="large"
      >
        <TrashIcon color={theme.palette.error.dark} />
      </IconButton>
    </div>
  );
};
