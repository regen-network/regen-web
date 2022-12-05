import { useCallback, useRef, useState } from 'react';
import Slider, { Settings as SlickSettings } from 'react-slick';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Variant } from '@mui/material/styles/createTypography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import PrevNextButton from '../buttons/PrevNextButton';
import { Title } from '../typography';

export interface ResponsiveSliderProps {
  items?: JSX.Element[];
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
  padding?: string | number;
  itemWidth?: string;
  infinite?: boolean;
  dots?: boolean;
  onChange?: (i: number) => void;
  visibleOverflow?: boolean;
}

interface StyleProps {
  gridView: boolean;
  padding?: string | number;
  title?: string;
  itemWidth?: string;
  visibleOverflow: boolean;
}

const useStyles = makeStyles<StyleProps>()(
  (theme, { gridView, itemWidth, padding, title, visibleOverflow }) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(11.75),
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(8),
      },
    },
    slider: {
      [theme.breakpoints.down('sm')]: {
        width: itemWidth || '70%',
        paddingTop: title ? theme.spacing(4) : 0,
      },
      [theme.breakpoints.up('sm')]: {
        marginLeft: padding ? `-${padding}` : 0,
        paddingTop: title ? theme.spacing(8) : 0,
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
        overflow: visibleOverflow ? 'visible' : 'hidden',
        [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
          overflow: 'visible',
        },
        '& .slick-slide': {
          display: 'flex',
          '& > div': {
            width: '97%',
          },
        },
      },
      '& .slick-track': {
        display: 'flex',
        '& .slick-slide': {
          height: 'inherit',
          display: 'flex',
          margin: theme.spacing(4, 0),
          [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(5),
            '&:last-child': {
              paddingRight: 0,
            },
          },
        },
      },
    },
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
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3.5),
      },
    },
    dot: {
      height: theme.spacing(3.75),
      width: theme.spacing(3.75),
      backgroundColor: theme.palette.grey[100],
      borderRadius: '50%',
    },
    item: {
      height: '100%',
      paddingBottom: gridView ? theme.spacing(5) : 0,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: padding || theme.spacing(4),
        paddingRight: padding || theme.spacing(4),
        '&:last-child': {
          paddingRight: 0,
        },
      },
    },
  }),
);

export default function ResponsiveSlider({
  items = [],
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
  visibleOverflow = false,
}: ResponsiveSliderProps): JSX.Element {
  const theme = useTheme();
  const [currSlide, setCurrSlide] = useState(0);

  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const desktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const gridView: boolean = !slidesToShow && desktop && !xl && items.length > 3;
  const rows: number = gridView ? 2 : 1;
  const slides: number = gridView
    ? 2
    : desktop
    ? slidesToShow || items.length
    : mobile
    ? 1
    : Math.min(items.length, 2);

  const { classes: styles, cx } = useStyles({
    gridView,
    padding,
    title,
    itemWidth,
    visibleOverflow,
  });

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

  const settings: SlickSettings = {
    rows,
    dots,
    infinite,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
    initialSlide: 0,
    arrows: false,
    appendDots: (dots: any) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => <div className={styles.dot} />,
  };

  const prevDisabled = currSlide === 0 && !infinite;
  const nextDisabled = currSlide >= items.length - slides && !infinite;

  return (
    <div className={cx(styles.root, className || (classes && classes.root))}>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        className={classes && classes.headerWrap}
      >
        {renderTitle ? (
          renderTitle()
        ) : title ? (
          <Grid xs={12} sm={8} item>
            <Title
              variant={titleVariant}
              className={cx(styles.title, classes && classes.title)}
            >
              {title}
            </Title>
          </Grid>
        ) : null}
        {items.length > 1 && arrows && desktop && (
          <Grid
            xs={12}
            sm={4}
            container
            item
            justifyContent="flex-end"
            className={styles.buttons}
          >
            <PrevNextButton
              direction="prev"
              onClick={slickPrev}
              disabled={prevDisabled}
            />
            <PrevNextButton
              direction="next"
              onClick={slickNext}
              disabled={nextDisabled}
            />
          </Grid>
        )}
      </Grid>

      <Slider
        {...settings}
        ref={slider}
        className={styles.slider}
        beforeChange={(_, newIdx) => {
          setCurrSlide(newIdx);
        }}
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
