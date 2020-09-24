import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Slider from 'react-slick';
import PlayIcon from '../icons/PlayIcon';

export interface Media {
  src: string;
  thumbnail?: string;
  type?: string;
  preview?: string;
}

interface ProjectMediaProps {
  assets: Media[];
  xsBorderRadius?: boolean;
}

interface StyleProps {
  xsBorderRadius: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8.75),
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

export default function ProjectMedia({ assets, xsBorderRadius = false }: ProjectMediaProps): JSX.Element {
  const classes = useStyles({ xsBorderRadius });
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

  const filteredAssets: Media[] = assets
    .map(item => {
      const imageReg = /[\.](gif|jpg|jpeg|tiff|png)/g;
      const videoReg = /[\.](m4v|avi|mpg|mp4|mov)/g;

      if (imageReg.test(item.src.toLowerCase())) {
        return { ...item, type: 'image' };
      } else if (videoReg.test(item.src.toLowerCase())) {
        return { ...item, type: 'video' };
      }
      return item;
    })
    .filter(item => item.type === 'image' || item.type === 'video');

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
          <img width={60} height={60} src={filteredAssets[i].thumbnail} alt={filteredAssets[i].thumbnail} />
          {filteredAssets[i].type === 'video' && (
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
      <Slider
        {...settings}
        className={classes.root}
        beforeChange={(oldIndex: number, newIndex: number) => {
          const indexDifference: number = Math.abs(oldIndex - newIndex);
          const thumbnailsElement = thumbnailsWrapper && thumbnailsWrapper.current;
          if (thumbnailsElement) {
            if (thumbnailsElement.scrollWidth > thumbnailsWrapperWidth && thumbnailsWrapperWidth > 0) {
              const perIndexScroll =
                (thumbnailsElement.scrollWidth - thumbnailsWrapperWidth) / (filteredAssets.length - 1);
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
        {filteredAssets.map((item, index) => {
          if (item.type === 'image') {
            return <img key={index} src={item.src} className={classes.item} alt={item.src} />;
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
    </div>
  );
}
