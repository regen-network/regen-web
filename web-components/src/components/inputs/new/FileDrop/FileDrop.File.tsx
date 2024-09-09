import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/es6';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import {
  Box,
  IconButton,
  Popover,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Feature } from 'geojson';
import { PlayPauseButton } from 'web-components/src/components/atoms/PlayPauseButton/PlayPauseButton';

import { cn } from '../../../../utils/styles/cn';
import ArrowDownIcon from '../../../icons/ArrowDownIcon';
import { DragIcon } from '../../../icons/DragIcon';
import EditIcon from '../../../icons/EditIcon';
import TrashIcon from '../../../icons/TrashIcon';
import { Image } from '../../../image';
import { PdfPreview } from '../../../organisms/PostFiles/components/PdfPreview';
import { TextOrIconFilePreview } from '../../../organisms/PostFiles/components/TextOrIconFilePreview';
import {
  getColors,
  parseFile,
} from '../../../organisms/PostFiles/PostFiles.utils';
import { Body } from '../../../typography/Body';
import { FileDropBottomBar } from './FileDrop.BottomBar';
import { useFileDropStyles } from './FileDrop.styles';
import {
  isAudio,
  isCsv,
  isDocx,
  isImage,
  isJson,
  isPdf,
  isVideo,
  isXlsOrXlsx,
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
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const audio = isAudio(mimeType);
  const csv = isCsv(mimeType);
  const json = isJson(mimeType);
  const xls = isXlsOrXlsx(mimeType);
  const docx = isDocx(mimeType);
  const colors = getColors(audio, csv, xls, json, docx);

  useEffect(() => {
    async function parseFileAndSetPreview() {
      const _preview = await parseFile({
        fileUrl: value,
        fileName: name,
        fileMimeType: mimeType,
      });
      if (_preview) setPreview(_preview);
    }
    parseFileAndSetPreview();
  }, [mimeType, name, value]);

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
          <PlayPauseButton playing={false} />
        </>
      ) : isPdf(mimeType) ? (
        <PdfPreview
          file={value}
          className="bg-grey-300 px-[65px] h-[100%]"
          pageHeight={mobile ? 210 : 290}
        />
      ) : (
        <TextOrIconFilePreview
          preview={preview}
          audio={audio}
          csv={csv}
          xls={xls}
          json={json}
          docx={docx}
          colors={colors}
          iconSize="100"
        />
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
