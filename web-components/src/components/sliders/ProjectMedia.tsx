import React, { useCallback, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { makeStyles } from 'tss-react/mui';

import { containerPaddingX, containerStyles } from '../../styles/container';
import { getOptimizedImageSrc } from '../../utils/optimizedImageSrc';
import { ProjectCardBodyTextsMapping } from '../cards/ProjectCard/ProjectCard.types';
import PlayIcon from '../icons/PlayIcon';
import { OptimizeImageProps } from '../image';
import { PrefinanceTag } from '../PrefinanceTag/PrefinanceTag';
import { ProjectAsset } from './ProjectMedia.ProjectAsset';

export interface Media {
  src: string;
  thumbnail?: string;
  type: string;
  preview?: string;
}

export type Asset = Media | React.ReactNode;
interface ProjectMediaProps extends OptimizeImageProps {
  gridView?: boolean;
  assets: Asset[];
  imageCredits?: string;
  xsBorderRadius?: boolean;
  mobileHeight?: string | number;
  isPrefinanceProject?: boolean | null;
  bodyTexts: ProjectCardBodyTextsMapping;
}

interface StyleProps {
  xsBorderRadius: boolean;
  mobileHeight?: string | number;
}

export function isMedia(a: Asset): a is Media {
  return (a as Media).src !== undefined;
}

const useStyles = makeStyles<StyleProps>()(
  (theme, { xsBorderRadius, mobileHeight }) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(8.75),
      },
      '& .slick-slide img': {
        [theme.breakpoints.down('sm')]: {
          height: mobileHeight ? mobileHeight : 'inherit',
          objectFit: mobileHeight ? 'cover' : 'inherit',
          objectPosition: '0% 0%',
        },
      },
      '& .slick-dots': {
        bottom: 'auto',
        overflow: 'hidden',
        '& ul': {
          padding: 0,
          whiteSpace: 'nowrap',
        },
        [theme.breakpoints.up('sm')]: {
          textAlign: 'left',
          paddingTop: theme.spacing(3.5),
          '& ul': {
            marginLeft: '-8px',
            '& li': {
              width: 60,
              height: 60,
              margin: '0 8px',
              '&.slick-active': {
                '& img': {
                  border: `2px solid ${theme.palette.secondary.dark}`,
                },
              },
            },
          },
        },
        [theme.breakpoints.down('sm')]: {
          height: theme.spacing(6),
          '& ul': {
            margin: '8px 0 -6.5px',
            '& li': {
              width: theme.spacing(2.5),
              margin: '0 6.5px',
              '&.slick-active': {
                '& div': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              },
            },
          },
        },
      },
    },
    thumbnail: {
      position: 'relative',
      display: 'inline-block',
      '& img': {
        width: 60,
        height: 60,
        borderRadius: '5px',
        // border: `1px solid ${theme.palette.info.light}`,
        boxSizing: 'border-box',
        objectFit: 'cover',
      },
    },
    play: {
      position: 'absolute',
      left: 19,
      top: 19,
      width: 22,
      height: 22,
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        borderRadius: '5px',
      },
      [theme.breakpoints.down('sm')]: {
        borderRadius: xsBorderRadius ? '5px' : 'none',
      },
    },
    dot: {
      height: theme.spacing(2.5),
      width: theme.spacing(2.5),
      backgroundColor: theme.palette.grey[100],
      borderRadius: '50%',
    },
    sideGrid: {
      flexGrow: 0,
      maxWidth: '37%',
      flexBasis: '37%',
      maxHeight: theme.spacing(113),
      position: 'relative',
    },
    centreGrid: {
      flexGrow: 0,
      maxWidth: '26%',
      flexBasis: '26%',
      maxHeight: theme.spacing(113),
    },
    imageContainer: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      height: '50%',
      '&:first-child': {
        paddingBottom: theme.spacing(1.25),
      },
      '&:last-child': {
        paddingTop: theme.spacing(1.25),
      },
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '5px',
      objectPosition: '50% 50%',
    },
    imageCredits: {
      color: theme.palette.primary.main,
      position: 'absolute',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(12),
        left: theme.typography.pxToRem(13),
        bottom: theme.typography.pxToRem(9),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(11),
        left: theme.typography.pxToRem(9),
        bottom: theme.typography.pxToRem(6),
      },
    },
    sliderImageContainer: {
      position: 'relative',
    },
    elementContainer: {
      position: 'relative',
      paddingRight: theme.spacing(5),
      '&:last-child': {
        paddingRight: 0,
      },
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(100),
      },
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(56),
      },
    },
    element: {
      [theme.breakpoints.up('sm')]: {
        borderRadius: '5px',
        overflow: 'hidden',
        height: '100%',
      },
    },
  }),
);

function getThumbnailStyle(thumbsTranslate: number): object {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  const translate: string = `translate(${thumbsTranslate}px, 0)`;
  return {
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    transform: translate,
  };
}

export default function ProjectMedia({
  assets,
  xsBorderRadius = false,
  gridView = false,
  mobileHeight,
  imageStorageBaseUrl,
  apiServerUrl,
  imageCredits,
  isPrefinanceProject,
  bodyTexts,
}: ProjectMediaProps): JSX.Element {
  const { classes } = useStyles({ mobileHeight, xsBorderRadius });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  let thumbnailsWrapper: any = useRef(null);
  const [thumbnailsWrapperWidth, setThumbnailsWrapperWidth] = useState(0);
  const [thumbnailsTranslate, setThumbnailsTranslate] = useState(0);

  const handleResize = useCallback(() => {
    if (thumbnailsWrapper && thumbnailsWrapper.current) {
      setThumbnailsWrapperWidth(thumbnailsWrapper.current.offsetWidth);
    }
  }, [thumbnailsWrapper]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const thumbnailStyle: object = getThumbnailStyle(thumbnailsTranslate);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    easing: 'ease',
    adaptiveHeight: true,
    infinite: false,
    appendDots: (dots: any) => (
      <div>
        <ul style={thumbnailStyle} ref={thumbnailsWrapper}>
          {' '}
          {dots}{' '}
        </ul>
      </div>
    ),
    customPaging: (i: number) => {
      const mediaAsset = isMedia(assets[i]) ? (assets[i] as Media) : undefined;
      return matches ? (
        <div className={classes.thumbnail}>
          <img
            width={60}
            height={60}
            src={
              mediaAsset
                ? getOptimizedImageSrc(
                    mediaAsset.thumbnail,
                    imageStorageBaseUrl,
                    apiServerUrl,
                  )
                : ''
            }
            alt={mediaAsset?.thumbnail}
          />
          {mediaAsset?.type === 'video' && (
            <div className={classes.play}>
              <PlayIcon
                width="10.85px"
                height="10.85px"
                className="text-ac-primary-500"
              />
            </div>
          )}
        </div>
      ) : (
        <div className={classes.dot} />
      );
    },
  };

  return (
    <div>
      {matches && gridView ? (
        <>
          {assets.length > 0 && (
            <Grid
              container
              columns={15}
              sx={{
                ...containerStyles,
                ...containerPaddingX,
              }}
            >
              {assets.slice(0, 2).map((a, i) => (
                <Grid
                  xs={assets.length === 1 ? 15 : i === 0 ? 8 : 7}
                  item
                  className={classes.elementContainer}
                  key={i}
                >
                  <ProjectAsset
                    asset={a}
                    apiServerUrl={apiServerUrl}
                    imageStorageBaseUrl={imageStorageBaseUrl}
                    classes={classes}
                  />
                  {i === 0 && isMedia(a) && imageCredits && (
                    <Box className={classes.imageCredits}>{imageCredits}</Box>
                  )}
                  {i === 0 && isPrefinanceProject && (
                    <PrefinanceTag
                      classNames={{
                        root: 'sm:py-10 sm:top-50',
                        label: 'sm:text-[11px]',
                      }}
                      iconSize={{ width: '24', height: '24' }}
                      bodyTexts={bodyTexts}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <div className="relative">
          <Slider
            {...settings}
            className={classes.root}
            beforeChange={(oldIndex: number, newIndex: number) => {
              const indexDifference: number = Math.abs(oldIndex - newIndex);
              const thumbnailsElement =
                thumbnailsWrapper && thumbnailsWrapper.current;
              if (thumbnailsElement) {
                if (
                  thumbnailsElement.scrollWidth > thumbnailsWrapperWidth &&
                  thumbnailsWrapperWidth > 0
                ) {
                  const perIndexScroll =
                    (thumbnailsElement.scrollWidth - thumbnailsWrapperWidth) /
                    (assets.length - 1);
                  const scroll = indexDifference * perIndexScroll;
                  if (scroll > 0) {
                    if (oldIndex < newIndex) {
                      setThumbnailsTranslate(thumbnailsTranslate - scroll);
                    } else if (oldIndex > newIndex) {
                      setThumbnailsTranslate(thumbnailsTranslate + scroll);
                    }
                  }
                }
              }
            }}
          >
            {assets.map((item, index) => {
              if (isMedia(item)) {
                if (item.type === 'image') {
                  const image = (
                    <Image
                      src={item.src}
                      className={classes.item}
                      alt={item.src}
                      fill
                    />
                  );

                  return (
                    <div key={index} className={classes.sliderImageContainer}>
                      {image}{' '}
                      {imageCredits && (
                        <div className={classes.imageCredits}>
                          {imageCredits}
                        </div>
                      )}
                    </div>
                  );
                } else if (item.type === 'video') {
                  return (
                    <video
                      key={index}
                      className={classes.item}
                      controls
                      poster={item.preview}
                    >
                      <source src={item.src} />
                    </video>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <div key={index} className={classes.elementContainer}>
                    {item}
                  </div>
                );
              }
            })}
          </Slider>
          {isPrefinanceProject && (
            <PrefinanceTag
              bodyTexts={bodyTexts}
              classNames={{
                root: 'sm:py-10 sm:top-50',
                label: 'sm:text-[11px]',
              }}
              iconSize={{ width: '24', height: '24' }}
            />
          )}
        </div>
      )}
    </div>
  );
}
