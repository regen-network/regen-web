import { useState } from 'react';
import { Box, SxProps, useTheme } from '@mui/material';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { wrap } from 'popmotion';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { OpenInNewIcon } from '../../icons/OpenInNewIcon';
import {
  isAudio,
  isCsv,
  isDocx,
  isImage,
  isJson,
  isPdf,
  isVideo,
  isXlsOrXlsx,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { PdfPreview } from '../PostFiles/components/PdfPreview';
import { TextOrIconFilePreview } from '../PostFiles/components/TextOrIconFilePreview';
import { VideoPreview } from '../PostFiles/components/VideoPreview';
import { FilesPreviews } from '../PostFiles/PostFiles.types';
import { getColors } from '../PostFiles/PostFiles.utils';
import { GalleryBottomBar } from './Gallery.BottomBar';
import { galleryVariants, swipeConfidenceThreshold } from './Gallery.config';
import { GalleryItem } from './Gallery.types';
import { paginateGallery, swipePower } from './Gallery.utils';

export interface Props {
  items: GalleryItem[];
  sx?: SxProps<Theme>;
  allImages?: boolean;
  className?: { root?: string; container?: string };
  photoCredit: string;
  pdfPageHeight?: number;
  filesPreviews?: FilesPreviews;
}

const Gallery = ({
  items,
  sx,
  allImages,
  className,
  photoCredit,
  pdfPageHeight,
  filesPreviews,
}: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We may have only a finite number of images (eg: 3), but we paginate them absolutely (eg 1, 2, 3, 4, 5...) and
  // then wrap that within (eg: 0-2) to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So we can infinitely paginate as few as 1 image.
  const itemIndex = wrap(0, items.length, page);
  const item = items[itemIndex];

  const theme = useTheme();

  const motionSettings = {
    custom: direction,
    variants: galleryVariants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
    drag: 'x' as 'x',
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 1,
    onDragEnd: (_e: Event, { offset, velocity }: PanInfo) => {
      const swipe = swipePower(offset.x, velocity.x);

      if (swipe < -swipeConfidenceThreshold) {
        paginateGallery({ newDirection: 1, page, setPage });
      } else if (swipe > swipeConfidenceThreshold) {
        paginateGallery({ newDirection: -1, page, setPage });
      }
    },
  };

  const audio = isAudio(item?.mimeType);
  const csv = isCsv(item?.mimeType);
  const json = isJson(item?.mimeType);
  const xls = isXlsOrXlsx(item?.mimeType);
  const docx = isDocx(item?.mimeType);
  const colors = getColors(audio, csv, xls, json, docx);
  const preview = filesPreviews?.[item?.url];

  return (
    <Box
      className={className?.root}
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          background: theme.palette.primary.light,
          pt: { xs: 35.5, md: 0 },
        },
        ...sxToArray(sx),
      ]}
    >
      <Box
        className={className?.container}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'end',
          maxHeight: 750,
          aspectRatio: '3/2',
          width: '100%',
          mb: { xs: 10, md: 0 },
          '& > img, > div': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            objectFit: { xs: 'cover', md: 'contain' },
          },
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {allImages || isImage(item?.mimeType) ? (
            <motion.img key={page} src={item?.url} {...motionSettings} />
          ) : isVideo(item?.mimeType) && item?.url ? (
            <motion.div key={page} {...motionSettings}>
              <VideoPreview url={item?.url} buttonClassName="lg:top-[42%]" />
            </motion.div>
          ) : (
            <motion.div key={page} {...motionSettings}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item?.url}
                className="outline-none cursor-pointer absolute top-20 right-20"
              >
                <OpenInNewIcon className="h-[24px] w-[24px] rounded-[50%] text-grey-0 bg-grey-700/[.6] p-3" />
              </a>
              {isPdf(item?.mimeType) ? (
                <PdfPreview
                  file={item?.url}
                  className="px-50 sm:px-[300px] h-[100%]"
                  pageHeight={pdfPageHeight}
                />
              ) : (
                <TextOrIconFilePreview
                  className="lg:h-[550px]"
                  previewClassName={docx ? 'px-50 sm:px-[300px]' : undefined}
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
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <GalleryBottomBar
        items={items}
        itemIndex={itemIndex}
        page={page}
        setPage={setPage}
        photoCredit={photoCredit}
      />
    </Box>
  );
};

export { Gallery };
