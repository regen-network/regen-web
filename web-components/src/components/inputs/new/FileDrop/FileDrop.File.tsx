import ReactPlayer from 'react-player/es6';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Box, IconButton, useTheme } from '@mui/material';
import { Feature } from 'geojson';

import { cn } from '../../../../utils/styles/cn';
import { useArticleCardStyles } from '../../../cards/ArticleCard';
import { AudioFileIcon } from '../../../icons/AudioFileIcon';
import EditIcon from '../../../icons/EditIcon';
import { OtherDocumentsIcon } from '../../../icons/OtherDocumentsIcon';
import { PdfFileIcon } from '../../../icons/PdfFileIcon';
import PlayIcon from '../../../icons/PlayIcon';
import { SpreadsheetFileIcon } from '../../../icons/SpreadsheetFileIcon';
import TrashIcon from '../../../icons/TrashIcon';
import { Image } from '../../../image';
import { FileDropBottomBar } from './FileDrop.BottomBar';
import { useFileDropStyles } from './FileDrop.styles';
import { isAudio, isImage, isVideo } from './FileDrop.utils';

type Props = {
  value: string;
  handleDelete: (value: string) => void;
  handleEdit: () => void;
  name?: string;
  caption?: string;
  credit?: string;
  mimeType?: string;
  accept?: string;
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
  mimeType,
  accept,
  handleDelete,
  handleEdit,
  classes,
}: Props) => {
  const { classes: styles, cx } = useFileDropStyles();
  const { classes: articleCardStyles } = useArticleCardStyles();
  const theme = useTheme();

  return (
    <div className={cx(styles.preview, classes?.main)}>
      {/* If FileDrop only accepts images, we can default to Image,
      even if mimeType is not provided */}
      {accept === 'image/*' || isImage(mimeType) ? (
        <Image className={styles.previewImage} src={value} backgroundImage />
      ) : isVideo(mimeType) ? (
        <>
          <ReactPlayer
            url={value}
            width="100%"
            height="100%"
            className={cn(
              styles.previewVideo,
              'absolute top-0 left-0 bg-grey-700 rounded-[5px] overflow-hidden',
            )}
          />
          <div className={articleCardStyles.play}>
            <PlayIcon
              width={theme.spacing(8.75)}
              height={theme.spacing(8.75)}
            />
          </div>
        </>
      ) : (
        <div className="bg-grey-300 text-grey-400 h-[100%] flex justify-center items-center">
          {isAudio(mimeType) ? (
            <AudioFileIcon />
          ) : mimeType === 'application/pdf' ? (
            <PdfFileIcon />
          ) : mimeType === 'text/csv' ? (
            <SpreadsheetFileIcon />
          ) : (
            <OtherDocumentsIcon />
          )}
        </div>
      )}

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
      {(caption || credit || name) && (
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
