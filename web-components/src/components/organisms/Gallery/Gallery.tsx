import { useState } from 'react';
import { Box, ButtonBase, SxProps, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';

import { Body, Label } from 'src/components/typography';

import { Theme } from '../../../theme/muiTheme';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import { galleryImagesMock } from './Gallery.mock';

import './Gallery.styles.css';

export interface Props {
  sx?: SxProps<Theme>;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Gallery = ({ sx }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isShowMore, setIsShowMore] = useState(false);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, galleryImagesMock.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        background: theme.palette.primary.light,
        pt: { xs: 15, md: 0 },
      }}
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
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={galleryImagesMock[imageIndex].href}
            custom={direction}
            variants={variants}
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
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
      </Box>
      <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          bottom: { xs: 'auto', md: 0 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: { xs: 5, md: 37.5 },
          py: { xs: 5, md: 6.25 },
          width: '100%',
          background: {
            xs: theme.palette.primary.contrastText,
            md: 'rgba(0, 0, 0, 0.5)',
          },
          backgroundRepeat: 'no-repeat',
          color: 'primary.main',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            mb: { xs: 2.5, md: 0 },
          }}
        >
          <ButtonBase
            onClick={() => paginate(-1)}
            sx={{ fontSize: 24, mr: 6.5 }}
            disableRipple
          >
            <ArrowDownIcon
              color={theme.palette.primary.main}
              direction="prev"
            />
          </ButtonBase>
          <ButtonBase
            onClick={() => paginate(1)}
            sx={{ fontSize: 24, mr: 6.5 }}
            disableRipple
          >
            <ArrowDownIcon
              color={theme.palette.primary.main}
              direction="next"
            />
          </ButtonBase>
          <Label size="sm" sx={{ mr: 5, mt: 0.75 }}>
            {`${imageIndex + 1}/${galleryImagesMock.length}`}
          </Label>
        </Box>
        <Body
          size="sm"
          mobileSize="sm"
          sx={[
            {
              color: 'primary.main',
              maxWidth: 890,
              width: '100%',
              minHeight: { xs: 42, md: 54 },
            },
            !isShowMore && {
              height: { xs: 42, md: 54 },
              background:
                'linear-gradient(180deg, #FFFFFF 26.04%, rgba(255, 255, 255, 0) 100%);',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              cursor: 'pointer',
            },
          ]}
          onClick={() => setIsShowMore(true)}
        >
          {galleryImagesMock[imageIndex].caption}
        </Body>
      </Box>
    </Box>
  );
};

export { Gallery };
