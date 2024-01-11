import { useState } from 'react';
import { Box, ButtonBase, useTheme } from '@mui/material';

import { Body, Label } from '../../../components/typography';
import { containerPaddingX, containerStyles } from '../../../styles/container';
import { UseStateSetter } from '../../../types/react/useState';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import { GalleryPhoto } from './Gallery.types';
import { paginateGallery } from './Gallery.utils';

type Props = {
  photos: GalleryPhoto[];
  imageIndex: number;
  page: number;
  setPage: UseStateSetter<[number, number]>;
};

export const GalleryBottomBar = ({
  photos,
  imageIndex,
  page,
  setPage,
}: Props) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const theme = useTheme();
  const caption = photos[imageIndex]?.caption;
  const credit = photos[imageIndex]?.credit;
  const hasCaption = caption !== undefined && caption !== '';
  const hasCredit = credit !== undefined && credit !== '';

  return (
    <Box
      sx={{
        position: { xs: 'relative', md: 'absolute' },
        bottom: { xs: 'auto', md: 0 },
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
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          ...containerPaddingX,
          ...containerStyles,
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
            onClick={() => paginateGallery({ newDirection: -1, page, setPage })}
            sx={{ fontSize: 24, mr: 6.5 }}
            disableRipple
          >
            <ArrowDownIcon
              color={theme.palette.primary.main}
              direction="prev"
            />
          </ButtonBase>
          <ButtonBase
            onClick={() => paginateGallery({ newDirection: 1, page, setPage })}
            sx={{ fontSize: 24, mr: 6.5 }}
            disableRipple
          >
            <ArrowDownIcon
              color={theme.palette.primary.main}
              direction="next"
            />
          </ButtonBase>
          <Label size="sm" sx={{ mr: 5, mt: 0.75 }}>
            {`${imageIndex + 1}/${photos.length}`}
          </Label>
        </Box>
        {(hasCaption || hasCredit) && (
          <Body
            size="sm"
            mobileSize="sm"
            sx={[
              {
                color: 'primary.main',
                maxWidth: 890,
                width: '100%',
                minHeight: { xs: 42, md: 54 },
                cursor: 'pointer',
              },
              !isShowMore && {
                height: { xs: 42, md: 54 },
                background:
                  'linear-gradient(180deg, #FFFFFF 26.04%, rgba(255, 255, 255, 0) 100%);',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              },
            ]}
            onClick={() => setIsShowMore(isShowMore => !isShowMore)}
          >
            {caption && (
              <Box sx={{ display: 'inline-block', mr: 0.5 }}>{caption}</Box>
            )}
            {credit && (
              <Box sx={{ display: 'inline-block', fontWeight: 300 }}>
                Photo credit: {credit}
              </Box>
            )}
          </Body>
        )}
      </Box>
    </Box>
  );
};
