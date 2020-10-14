import React from 'react';
import { Variant } from '@material-ui/core/styles/createTypography';
import { useTheme, Theme, makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';

import ResourcesCard, { ResourcesCardProps } from '../cards/ResourcesCard';

export interface ResourceCardsProps {
  items: ResourcesCardProps[];
  titleVariant?: Variant;
  imageClassName?: string;
  title?: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  slider: {
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
    '& .slick-list': {
      [theme.breakpoints.down('md')]: {
        overflow: 'visible',
      },
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        [theme.breakpoints.down('xs')]: {
          paddingRight: theme.spacing(4.125),
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
    height: 'inherit',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      paddingRight: theme.spacing(5.25),
      paddingBottom: theme.spacing(5.25),
    },
  },
}));

export default function ResourceCards({
  items,
  titleVariant,
  title,
  className,
}: ResourceCardsProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));
  let slides;
  if (desktop) slides = 2;
  if (mobile) slides = 1;
  if (tablet) slides = 2;

  const settings = {
    infinite: false,
    speed: 500,
    // slidesToShow: slides,
    // slidesToScroll: slides,
    initialSlide: 0,
    arrows: false,
    rows: 1,
    slidesPerRow: slides,
  };
  return (
    <div className={classes.slider}>
      {!desktop ? (
        <Slider {...settings} className={clsx(className, classes.slider)}>
          {items.map((item, index) => (
            <div key={index} className={classes.item}>
              <ResourcesCard
                image={item.image}
                title={item.title}
                updated={item.updated ? item.updated : null}
                description={item.description}
                buttonText={item.buttonText}
                link={item.link}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Grid container>
          {items.map((item, index) => (
            <Grid item xs={4} md={5} lg={4} key={index} className={classes.item}>
              <ResourcesCard
                image={item.image}
                title={item.title}
                updated={item.updated ? item.updated : null}
                description={item.description}
                buttonText={item.buttonText}
                link={item.link}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
