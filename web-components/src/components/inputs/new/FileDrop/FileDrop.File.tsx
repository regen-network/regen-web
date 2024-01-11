import { Box, IconButton, useTheme } from '@mui/material';

import EditIcon from '../../../icons/EditIcon';
import TrashIcon from '../../../icons/TrashIcon';
import { Image } from '../../../image';
import { ImageDropBottomBar } from './FileDrop.BottomBar';
import { useImageDropStyles } from './FileDrop.styles';

type Props = {
  value: string;
  handleDelete: (value: string) => void;
  handleEdit: () => void;
  caption?: string;
  credit?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
};

export const ImageDropImage = ({
  value,
  caption,
  credit,
  handleDelete,
  handleEdit,
  classes,
}: Props) => {
  const { classes: styles, cx } = useImageDropStyles();
  const theme = useTheme();

  return (
    <div className={cx(styles.preview, classes?.main)}>
      <Image className={styles.previewImage} src={value} backgroundImage />
      <Box className={styles.buttons}>
        <IconButton
          classes={{ root: styles.button }}
          onClick={() => handleEdit()}
          aria-label="edit"
          size="large"
          sx={{ mr: 2.5 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          classes={{ root: styles.button }}
          onClick={() => handleDelete(value)}
          aria-label="delete"
          size="large"
        >
          <TrashIcon color={theme.palette.error.dark} />
        </IconButton>
      </Box>
      {(caption || credit) && (
        <ImageDropBottomBar
          caption={caption}
          credit={credit}
          sx={{ position: 'absolute', bottom: 0 }}
        />
      )}
    </div>
  );
};
