import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Box, IconButton, useTheme } from '@mui/material';
import { Feature } from 'geojson';

import EditIcon from '../../../icons/EditIcon';
import TrashIcon from '../../../icons/TrashIcon';
import { Image } from '../../../image';
import { FileDropBottomBar } from './FileDrop.BottomBar';
import { useFileDropStyles } from './FileDrop.styles';

type Props = {
  value: string;
  handleDelete: (value: string) => void;
  handleEdit: () => void;
  name?: string;
  caption?: string;
  credit?: string;
  location?: Feature | GeocodeFeature;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
};

export const FileDropFile = ({
  value,
  caption,
  name,
  credit,
  location,
  handleDelete,
  handleEdit,
  classes,
}: Props) => {
  const { classes: styles, cx } = useFileDropStyles();
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
        <FileDropBottomBar
          name={name}
          caption={caption}
          credit={credit}
          location={location}
          sx={{ position: 'absolute', bottom: 0 }}
        />
      )}
    </div>
  );
};
