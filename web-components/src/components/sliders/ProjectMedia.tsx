import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Slider from 'react-slick';
import PlayIcon from '../icons/PlayIcon';

export interface Media {
  src: string;
  thumbnail?: string;
  type?: string;
}
export interface ProjectMediaProps {
  assets: Media[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .slick-track': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .slick-dots': {
      bottom: 'auto',
      textAlign: 'left',
      '& ul': {
        padding: 0,
        marginLeft: '-8px',
        '& li': {
          width: 60,
          height: 60,
          margin: '0 8px',
          '&.slick-active': {
            '& img': {
              border: '2px solid #7BC796',
            },
          },
        },
      },
    },
  },
  thumbnail: {
    position: 'relative',
    '& img': {
      width: 60,
      height: 60,
      borderRadius: '5px',
      border: `1px solid ${theme.palette.info.light}`,
      boxSizing: 'border-box',
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
    borderRadius: '5px',
  },
}));

export default function ProjectMedia({ assets }: ProjectMediaProps): JSX.Element {
  const classes = useStyles({});

  const imageReg = /[\.](gif|jpg|jpeg|tiff|png)/g;
  const videoReg = /[\.](m4v|avi|mpg|mp4)/g;

  const filteredAssets: Media[] = assets
    .map(item => {
      let type: string | undefined;
      if (imageReg.test(item.src.toLowerCase())) {
        type = 'image';
      } else if (videoReg.test(item.src.toLowerCase())) {
        type = 'video';
      }
      return { ...item, type };
    })
    .filter(item => item.type === 'image' || item.type === 'video');

  const settings = {
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
    dots: true,
    appendDots: (dots: any) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className={classes.thumbnail}>
        <img width={60} height={60} src={filteredAssets[i].thumbnail} alt={filteredAssets[i].thumbnail} />
        {filteredAssets[i].type === 'video' && (
          <div className={classes.play}>
            <PlayIcon width="10.85px" height="10.85px" />
          </div>
        )}
      </div>
    ),
  };

  return (
    <div>
      <Slider {...settings} className={classes.root}>
        {filteredAssets.map((item, index) => {
          if (item.type === 'image') {
            return <img key={index} className={classes.item} src={item.src} alt={item.src} />;
          } else if (item.type === 'video') {
            return (
              <video key={index} controls className={classes.item}>
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
