import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from 'react-slick';

import PrevNextButton from '../buttons/PrevNextButton';
import Title from '../title';

export interface ResponsiveSliderProps {
  items: JSX.Element[];
  titleVariant?: Variant;
  imageHeight?: string;
  arrows?: boolean;
  slidesToShow?: number;
  title?: string;
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
    '& .slick-list': {
      [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
        overflow: 'hidden',
      },
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
  buttons: {
    '& div:last-child': {
      marginLeft: theme.spacing(2),
    },
  },
  title: {
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    color: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  item: props => ({
    height: '100%',
    paddingBottom: props.gridView ? theme.spacing(5) : 0,
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  }),
}));

export default function ResponsiveSlider({
  items,
  imageHeight,
  titleVariant,
  slidesToShow,
  arrows = false,
  title,
}: ResponsiveSliderProps): JSX.Element {
  const theme = useTheme();

  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const desktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const gridView: boolean = !slidesToShow && desktop && !xl && items.length > 3;
  const rows: number = gridView ? 2 : 1;
  const slides: number = gridView ? 2 : desktop ? slidesToShow || items.length : mobile ? 1 : 2;

  const classes = useStyles({ gridView });
  let slider: any = null;

  function slickPrev(): void {
    if (slider) {
      slider.slickPrev();
    }
  }

  function slickNext(): void {
    if (slider) {
      slider.slickNext();
    }
  }
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
      <Grid container wrap="nowrap" alignItems="center">
        {title && (
          <Grid xs={12} sm={8} item>
            <Title variant="h6" className={classes.title}>
              {title}
            </Title>
          </Grid>
        )}
        {items.length > 1 && arrows && desktop && (
          <Grid xs={12} sm={4} container item justify="flex-end" className={classes.buttons}>
            <PrevNextButton direction="prev" onClick={slickPrev} />
            <PrevNextButton direction="next" onClick={slickNext} />
          </Grid>
        )}
      </Grid>

      <Slider
        {...settings}
        ref={e => {
          slider = e;
        }}
        className={classes.root}
      >
        {items.map((item, index) => (
          <div className={classes.item} key={index}>
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
}
