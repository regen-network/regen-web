import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from 'react-slick';

import BlogPost, { BlogPostProps } from '../blog-post';

export interface BlogPostsProps {
  posts: BlogPostProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12),
    },
  },
  slider: {
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
    '& .slick-list': {
      [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
        overflow: 'visible',
      },
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        [theme.breakpoints.down('xs')]: {
          paddingRight: theme.spacing(4.75),
          '&:last-child': {
            paddingRight: 0,
          },
        },
        '& > div:first-child': {
          height: '100%',
        },
      },
    },
  },
  item: {
    height: '100%',
    verticalAlign: 'top',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
    },
  },
}));

export default function BlogPosts({ posts }: BlogPostsProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const slides: number = desktop ? 3 : mobile ? 1 : 2;

  const settings = {
    infinite: false,
    speed: 500,
    initialSlide: 0,
    arrows: false,
    rows: 1,
    slidesPerRow: slides,
  };
  return (
    <div className={classes.root}>
      <Slider {...settings} className={classes.slider}>
        {posts.map((post, index) => (
          <div key={index} className={classes.item}>
            <BlogPost {...post} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
