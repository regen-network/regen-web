import React, { useRef, useCallback } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from 'react-slick';
import cx from 'clsx';

import PrevNextButton from '../buttons/PrevNextButton';
import Title from '../title';

export interface ResponsiveSliderProps {
  items: JSX.Element[];
  titleVariant?: Variant;
  arrows?: boolean;
  slidesToShow?: number;
  title?: string;
  renderTitle?: () => JSX.Element;
  className?: string;
  classes?: {
    root?: string;
    title?: string;
    headerWrap?: string;
  };
  padding?: number;
  itemWidth?: string;
  infinite?: boolean;
  dots?: boolean;
  onChange?: (i: number) => void;
}

interface StyleProps {
  gridView: boolean;
  padding?: number;
  title?: string;
  itemWidth?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(11.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  slider: props => ({
    [theme.breakpoints.down('xs')]: {
      width: props.itemWidth || '70%',
      paddingTop: props.title ? theme.spacing(4) : 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: props.padding ? `-${props.padding}` : 0,
      paddingTop: props.title ? theme.spacing(8) : 0,
    },
    '& .slick-dots': {
      bottom: 'auto',
      overflow: 'hidden',
      height: theme.spacing(6),
      '& ul': {
        padding: 0,
        whiteSpace: 'nowrap',
        margin: '8px 0 -6.5px',
        '& li': {
          height: theme.spacing(3.75),
          width: theme.spacing(3.75),
          margin: '0 6.5px',
          '&.slick-active': {
            '& div': {
              backgroundColor: theme.palette.secondary.dark,
            },
          },
        },
      },
    },
    '& .slick-list': {
      [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
        overflow: 'visible',
      },
      '& .slick-slide .slick-active': {
        display: 'flex',
      },
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        display: 'flex',
        margin: theme.spacing(4, 0),
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
  dot: {
    height: theme.spacing(3.75),
    width: theme.spacing(3.75),
    backgroundColor: theme.palette.grey[100],
    borderRadius: '50%',
  },
  item: props => ({
    height: '100%',
    paddingBottom: props.gridView ? theme.spacing(5) : 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: props.padding || theme.spacing(4),
      paddingRight: props.padding || theme.spacing(4),
      '&:last-child': {
        paddingRight: 0,
      },
    },
  }),
}));

export default function ResponsiveSlider({
  items,
  titleVariant = 'h6',
  slidesToShow,
  arrows = false,
  title,
  renderTitle,
  className,
  classes,
  padding,
  itemWidth,
  infinite = true,
  dots = false,
  onChange,
}: ResponsiveSliderProps): JSX.Element {
  const theme = useTheme();

  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const desktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const gridView: boolean = !slidesToShow && desktop && !xl && items.length > 3;
  const rows: number = gridView ? 2 : 1;
  const slides: number = gridView ? 2 : desktop ? slidesToShow || items.length : mobile ? 1 : 2;

  const styles = useStyles({ gridView, padding, title, itemWidth });

  let slider: any = useRef(null);

  const slickPrev = useCallback(() => {
    if (slider && slider.current) {
      slider.current.slickPrev();
    }
  }, [slider]);

  const slickNext = useCallback(() => {
    if (slider && slider.current) {
      slider.current.slickNext();
    }
  }, [slider]);

  const settings = {
    infinite,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
    initialSlide: 0,
    arrows: false,
    rows,
    dots,
    appendDots: (dots: any) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => <div className={styles.dot} />,
  };

  return (
    <div className={cx(styles.root, className || (classes && classes.root))}>
      <Grid container wrap="nowrap" alignItems="center" className={classes && classes.headerWrap}>
        {renderTitle ? (
          renderTitle()
        ) : title ? (
          <Grid xs={12} sm={8} item>
            <Title variant={titleVariant} className={cx(styles.title, classes && classes.title)}>
              {title}
            </Title>
          </Grid>
        ) : null}
        {items.length > 1 && arrows && desktop && (
          <Grid xs={12} sm={4} container item justify="flex-end" className={styles.buttons}>
            <PrevNextButton direction="prev" onClick={slickPrev} />
            <PrevNextButton direction="next" onClick={slickNext} />
          </Grid>
        )}
      </Grid>

      <Slider
        {...settings}
        ref={slider}
        className={styles.slider}
        afterChange={i => {
          if (onChange) onChange(i);
        }}
      >
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
}
