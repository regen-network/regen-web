import { useState } from 'react';
import ReactPlayer from 'react-player/es6';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Box, IconButton, Popover, useTheme } from '@mui/material';
import { Feature } from 'geojson';

import { PlayButton } from '../../../../components/atoms/PlayButton/PlayButton';
import { cn } from '../../../../utils/styles/cn';
import ArrowDownIcon from '../../../icons/ArrowDownIcon';
import { AudioFileIcon } from '../../../icons/AudioFileIcon';
import { DragIcon } from '../../../icons/DragIcon';
import EditIcon from '../../../icons/EditIcon';
import { OtherDocumentsIcon } from '../../../icons/OtherDocumentsIcon';
import { PdfFileIcon } from '../../../icons/PdfFileIcon';
import { SpreadsheetFileIcon } from '../../../icons/SpreadsheetFileIcon';
import TrashIcon from '../../../icons/TrashIcon';
import { Image } from '../../../image';
import { Body } from '../../../typography/Body';
import { FileDropBottomBar } from './FileDrop.BottomBar';
import { useFileDropStyles } from './FileDrop.styles';
import {
  isAudio,
  isImage,
  isPdf,
  isSpreadSheet,
  isVideo,
} from './FileDrop.utils';

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
  moveUp?: () => void;
  moveDown?: () => void;
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
  moveUp,
  moveDown,
}: Props) => {
  const { classes: styles, cx } = useFileDropStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
          <PlayButton />
        </>
      ) : (
        <div className="bg-grey-300 text-grey-400 h-[100%] flex justify-center items-center">
          {isAudio(mimeType) ? (
            <AudioFileIcon />
          ) : isPdf(mimeType) ? (
            <PdfFileIcon />
          ) : isSpreadSheet(mimeType) ? (
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
          <TrashIcon className="text-error-300" />
        </IconButton>
      </Box>
      {(moveUp || moveDown) && (
        <>
          <DragIcon
            className="cursor-grab absolute top-0 right-0"
            // onPointerDown={e => {
            //   dragControls.start(e);
            // }}
            onClick={handleClick}
          />
          <Popover
            className="sm:hidden"
            classes={{
              paper:
                'w-[216px] p-20 rounded-[2px] shadow-[0_0_4px_0_rgba(0,0,0,0.05)]',
            }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            {moveUp && (
              <Body
                className={moveDown && 'pb-20'}
                mobileSize="sm"
                onClick={() => {
                  moveUp();
                  handleClose();
                }}
              >
                <div className="flex items-center justify-between">
                  Move up <ArrowDownIcon direction="up" />
                </div>
              </Body>
            )}
            {moveDown && (
              <Body
                mobileSize="sm"
                onClick={() => {
                  moveDown();
                  handleClose();
                }}
              >
                <div className="flex items-center justify-between">
                  Move down
                  <ArrowDownIcon direction="down" />
                </div>
              </Body>
            )}
          </Popover>
        </>
      )}

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
