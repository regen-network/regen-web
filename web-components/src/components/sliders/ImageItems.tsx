import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from 'react-slick';
import ImageItem, { ImageItemProps } from '../image-item';

export interface ImageItemsProps {
  items: ImageItemProps[];
  titleVariant?: Variant;
  imageHeight?: string;
}

interface StyleProps {
  gridView: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(11.75),
      width: '70%',
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        [theme.breakpoints.down('xs')]: {
          paddingRight: theme.spacing(5),
          '&:last-child': {
            paddingRight: 0,
          },
        },
      },
    },
  }),
  item: props => ({
    height: '100%',
    paddingBottom: props.gridView ? theme.spacing(5) : 0,
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  }),
}));

export default function ImageItems({ items, imageHeight, titleVariant }: ImageItemsProps): JSX.Element {
  const theme = useTheme();

  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const desktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const gridView: boolean = desktop && !xl && items.length > 3;
  const rows: number = gridView ? 2 : 1;
  const slides: number = gridView ? 2 : desktop ? items.length : mobile ? 1 : 2;

  const classes = useStyles({ gridView });

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
    initialSlide: 0,
    arrows: false,
    rows,
  };
  return (
    <div>
      <Slider {...settings} className={classes.root}>
        {items.map((item, index) => (
          <div className={classes.item} key={index}>
            <ImageItem
              imageHeight={imageHeight}
              img={item.img}
              title={item.title}
              titleVariant={titleVariant}
              description={item.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
