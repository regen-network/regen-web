import { Box, ButtonBase, IconButton, useTheme } from '@mui/material';

import EditIcon from '../../../../components/icons/EditIcon';
import TrashIcon from '../../../../components/icons/TrashIcon';
import { Image } from '../../../../components/image';
import { ImageDropBottomBar } from './ImageDrop.BottomBar';
import { useImageDropStyles } from './ImageDrop.styles';

type Props = {
  value: string;
  name: string;
  handleDelete: (value: string) => void;
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
  name,
  handleDelete,
  classes,
}: Props) => {
  const { classes: styles, cx } = useImageDropStyles();
  const theme = useTheme();

  return (
    <div className={cx(styles.preview, classes?.main)}>
      <Image className={styles.previewImage} src={value} backgroundImage />
      <Box className={styles.buttons}>
        <label htmlFor={`btn-file-input-${name}`}>
          <ButtonBase
            component="span"
            disableRipple
            className={styles.button}
            sx={{
              borderRadius: '50%',
              padding: 3,
              fontSize: '1.75rem',
              mr: 2.5,
            }}
          >
            <EditIcon />
          </ButtonBase>
        </label>
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
