import React from 'react';
import Slider from 'react-slick';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import BlogPost, { BlogPostProps } from '../blog-post';

export interface BlogPostsProps {
  posts: BlogPostProps[];
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12),
    },
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
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
  const { classes } = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
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
