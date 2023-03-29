import { useState } from 'react';
import { Box, SxProps, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { GalleryBottomBar } from './Gallery.BottomBar';
import { galleryVariants, swipeConfidenceThreshold } from './Gallery.config';
import { GalleryPhoto } from './Gallery.types';
import { paginateGallery, swipePower } from './Gallery.utils';

export interface Props {
  photos: GalleryPhoto[];
  sx?: SxProps<Theme>;
}

const Gallery = ({ photos, sx }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, photos.length, page);

  const theme = useTheme();

  return (
    <Box
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          background: theme.palette.primary.light,
          pt: { xs: 15, md: 0 },
        },
        ...sxToArray(sx),
      ]}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'end',
          aspectRatio: '1441 / 650',
          mb: { xs: 15, md: 0 },
          '& img': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            objectFit: 'cover',
          },
        }}
      >
        {/* @ts-ignore */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={photos[imageIndex]?.href}
            custom={direction}
            variants={galleryVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginateGallery({ newDirection: 1, page, setPage });
              } else if (swipe > swipeConfidenceThreshold) {
                paginateGallery({ newDirection: -1, page, setPage });
              }
            }}
          />
        </AnimatePresence>
      </Box>
      <GalleryBottomBar
        photos={photos}
        imageIndex={imageIndex}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};

export { Gallery };
