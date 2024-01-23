import React from 'react';
import Slider from 'react-slick';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import BlogPost, { BlogPostProps } from '../blog-post';

export interface BlogPostsProps {
  posts: BlogPostProps[];
  classes?: {
    item?: string;
  };
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
      justifyContent: 'center',
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
    width: '100%',
    verticalAlign: 'top',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 308,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 366,
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
    },
  },
}));

export default function BlogPosts({
  posts,
  classes,
}: BlogPostsProps): JSX.Element {
  const { classes: styles, cx } = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('xl'));
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const slides: number = desktop ? 3 : mobile ? 1 : 2;

  const settings = {
    infinite: false,
    speed: 500,
    initialSlide: 0,
    arrows: false,
    slidesToShow: slides,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.root}>
      <Slider {...settings} className={styles.slider} variableWidth>
        {posts.map((post, index) => (
          <div key={index} className={cx(styles.item, classes?.item)}>
            <BlogPost {...post} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
