import { useRef, useState } from 'react';
import { Box, ButtonBase, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { containerPaddingX, containerStyles } from '../../../styles/container';
import { UseStateSetter } from '../../../types/react/useState';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import { isImage, isVideo } from '../../inputs/new/FileDrop/FileDrop.utils';
import { Body, Label } from '../../typography';
import { GalleryItem } from './Gallery.types';
import { paginateGallery } from './Gallery.utils';

type Props = {
  items: GalleryItem[];
  itemIndex: number;
  page: number;
  photoCredit: string;
  setPage: UseStateSetter<[number, number]>;
};

export const GalleryBottomBar = ({
  items,
  itemIndex,
  page,
  photoCredit,
  setPage,
}: Props) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const theme = useTheme();

  const item = items[itemIndex];
  const description = item?.description;
  const credit = item?.credit;
  const name = item?.name;
  const mimeType = item?.mimeType;
  const hasDescription = description !== undefined && description !== '';
  const hasCredit = credit !== undefined && credit !== '';
  const image = isImage(mimeType);
  const video = isVideo(mimeType);
  const ref = useRef<HTMLParagraphElement | null>(null);
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

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
            {`${itemIndex + 1}/${items.length}`}
          </Label>
        </Box>
        {name && (!(image || video) || ((image || video) && !hasDescription)) && (
          <Body size="sm" mobileSize="sm" className="font-bold text-grey-0">
            {name}&nbsp;
          </Body>
        )}
        {(hasDescription || hasCredit) && (
          <Body
            ref={ref}
            size="sm"
            mobileSize="sm"
            sx={[
              {
                color: 'primary.main',
                maxWidth: 890,
                cursor: 'pointer',
              },
              !isShowMore &&
                !!ref.current?.clientHeight &&
                ref.current.clientHeight > (desktop ? 54 : 42) && {
                  background:
                    'linear-gradient(180deg, #FFFFFF 26.04%, rgba(255, 255, 255, 0) 100%);',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                },
            ]}
            onClick={() => setIsShowMore(isShowMore => !isShowMore)}
          >
            {description && (
              <Box component="span" sx={{ display: 'inline-block', mr: 0.5 }}>
                {description}
              </Box>
            )}
            {credit && (
              <Box
                component="span"
                sx={{ display: 'inline-block', fontWeight: 300 }}
              >
                {`${photoCredit}: ${credit}`}
              </Box>
            )}
          </Body>
        )}
      </Box>
    </Box>
  );
};
