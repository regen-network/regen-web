import { lazy, Suspense, useState } from 'react';
import { pdfjs } from 'react-pdf';
import ReactPlayer from 'react-player/es6';
import { Box, CircularProgress, SxProps, useTheme } from '@mui/material';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { wrap } from 'popmotion';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { PlayButton } from '../../atoms/PlayButton/PlayButton';
import {
  isImage,
  isPdf,
  isVideo,
} from '../../inputs/new/FileDrop/FileDrop.utils';
import { GalleryBottomBar } from './Gallery.BottomBar';
import { galleryVariants, swipeConfidenceThreshold } from './Gallery.config';
import { GalleryItem } from './Gallery.types';
import { paginateGallery, swipePower } from './Gallery.utils';

export interface Props {
  items: GalleryItem[];
  sx?: SxProps<Theme>;
  allImages?: boolean;
  className?: { root?: string; container?: string };
  pdfPageHeight?: number;
}
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Document = lazy(() => import('../PostFiles/lib/Document'));
const Page = lazy(() => import('../PostFiles/lib/Page'));

const Gallery = ({ items, sx, allImages, className, pdfPageHeight }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We may have only a finite number of images (eg: 3), but we paginate them absolutely (eg 1, 2, 3, 4, 5...) and
  // then wrap that within (eg: 0-2) to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So we can infinitely paginate as few as 1 image.
  const imageIndex = wrap(0, items.length, page);
  const item = items[imageIndex];

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
          ) : isVideo(item?.mimeType) ? (
            <motion.div key={page} {...motionSettings}>
              <ReactPlayer url={item?.url} width="100%" height="100%" />
              <PlayButton className="w-1O0 h-100 sm:top-[33%]" />
            </motion.div>
          ) : (
            <motion.div key={page} {...motionSettings}>
              {isPdf(item?.mimeType) ? (
                <Suspense fallback={<CircularProgress color="secondary" />}>
                  <Document
                    className="px-[300px] h-[100%]"
                    file={item?.url}
                    loading={<CircularProgress color="secondary" />}
                  >
                    <Page height={pdfPageHeight} pageNumber={1} />
                  </Document>
                </Suspense>
              ) : (
                <></>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <GalleryBottomBar
        items={items}
        imageIndex={imageIndex}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};

export { Gallery };
