import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import PlayIcon from '../icons/PlayIcon';
import { Image, OptimizeImageProps } from '../image';
import { getOptimizedImageSrc } from '../../utils/optimizedImageSrc';

export interface Media {
  src: string;
  thumbnail?: string;
  type: string;
  preview?: string;
}

interface ProjectMediaProps extends OptimizeImageProps {
  gridView?: boolean;
  assets: Media[];
  xsBorderRadius?: boolean;
  mobileHeight?: string | number;
}

interface StyleProps {
  xsBorderRadius: boolean;
  mobileHeight?: string | number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8.75),
    },
    '& .slick-slide img': {
      [theme.breakpoints.down('xs')]: {
        height: props.mobileHeight ? props.mobileHeight : 'inherit',
        objectFit: props.mobileHeight ? 'cover' : 'inherit',
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
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(6),
        '& ul': {
          margin: '8px 0 -6.5px',
          '& li': {
            height: theme.spacing(2.5),
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
  }),
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
  item: props => ({
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      borderRadius: '5px',
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: props.xsBorderRadius ? '5px' : 'none',
    },
  }),
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
    objectPosition: '0% 0%',
  },
  grid: {
    padding: theme.spacing(2.5),
  },
}));

function getThumbnailStyle(thumbsTranslate: number): object {
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
}: ProjectMediaProps): JSX.Element {
  const classes = useStyles({ mobileHeight, xsBorderRadius });
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

  useLayoutEffect(() => {
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
      return matches ? (
        <div className={classes.thumbnail}>
          <img
            width={60}
            height={60}
            src={
              imageStorageBaseUrl && apiServerUrl
                ? getOptimizedImageSrc(assets[i].thumbnail, imageStorageBaseUrl, apiServerUrl)
                : assets[i].thumbnail || ''
            }
            alt={assets[i].thumbnail}
          />
          {assets[i].type === 'video' && (
            <div className={classes.play}>
              <PlayIcon width="10.85px" height="10.85px" />
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
      {matches && gridView && assets.length >= 4 ? (
        <Grid container className={classes.grid}>
          <Grid item className={classes.sideGrid}>
            <Image
              className={classes.image}
              src={assets[0].src}
              alt={assets[0].src}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
            />
          </Grid>
          <Grid item className={classes.centreGrid}>
            <div className={classes.imageContainer}>
              <Image
                className={classes.image}
                src={assets[1].src}
                alt={assets[1].src}
                imageStorageBaseUrl={imageStorageBaseUrl}
                apiServerUrl={apiServerUrl}
              />
            </div>
            <div className={classes.imageContainer}>
              <Image
                className={classes.image}
                src={assets[2].src}
                alt={assets[2].src}
                imageStorageBaseUrl={imageStorageBaseUrl}
                apiServerUrl={apiServerUrl}
              />
            </div>
          </Grid>
          <Grid item className={classes.sideGrid}>
            <Image
              className={classes.image}
              src={assets[3].src}
              alt={assets[3].src}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
            />
          </Grid>
        </Grid>
      ) : (
        <Slider
          {...settings}
          className={classes.root}
          beforeChange={(oldIndex: number, newIndex: number) => {
            const indexDifference: number = Math.abs(oldIndex - newIndex);
            const thumbnailsElement = thumbnailsWrapper && thumbnailsWrapper.current;
            if (thumbnailsElement) {
              if (thumbnailsElement.scrollWidth > thumbnailsWrapperWidth && thumbnailsWrapperWidth > 0) {
                const perIndexScroll =
                  (thumbnailsElement.scrollWidth - thumbnailsWrapperWidth) / (assets.length - 1);
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
            if (item.type === 'image') {
              return imageStorageBaseUrl && apiServerUrl ? (
                <Image
                  key={index}
                  src={item.src}
                  className={classes.item}
                  alt={item.src}
                  delay={index > 0 ? 1000 : 0}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                />
              ) : (
                <img key={index} src={item.src} className={classes.item} alt={item.src} />
              );
            } else if (item.type === 'video') {
              return (
                <video key={index} className={classes.item} controls poster={item.preview}>
                  <source src={item.src} />
                </video>
              );
            } else {
              return null;
            }
          })}
        </Slider>
      )}
    </div>
  );
}
