import { useCallback, useRef, useState } from 'react';
import Slider, { Settings as SlickSettings } from 'react-slick';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Variant } from '@mui/material/styles/createTypography';
import useMediaQuery from '@mui/material/useMediaQuery';

import PrevNextButton from '../buttons/PrevNextButton';
import { Title } from '../typography';
import { useStyles } from './ResponsiveSlider.styles';
import { cn } from '../../utils/styles/cn';
import { Root } from '../section';

interface ResponsiveSliderProps {
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
    slider?: string;
  };
  padding?: string | number;
  mobileItemWidth?: string;
  itemWidth?: string;
  infinite?: boolean;
  dots?: boolean;
  onChange?: (i: number) => void;
  visibleOverflow?: boolean;
  adaptiveHeight?: boolean;
}

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
  mobileItemWidth,
  itemWidth,
  infinite = true,
  dots = false,
  onChange,
  visibleOverflow = false,
  adaptiveHeight = false,
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
    ? slidesToShow ?? items.length
    : mobile
    ? 1
    : Math.min(slidesToShow ?? items.length, 2);

  const { classes: styles, cx } = useStyles({
    gridView,
    padding,
    title,
    mobileItemWidth,
    itemWidth,
    visibleOverflow,
  });

  let sliderRef: any = useRef(null);

  const slickPrev = useCallback(() => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  }, [sliderRef]);

  const slickNext = useCallback(() => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickNext();
    }
  }, [sliderRef]);

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

  const hasHeader =
    renderTitle || title || (items.length > 1 && arrows && desktop);

  const slider = (
    <Slider
      {...settings}
      ref={sliderRef}
      className={cx(styles.slider, classes?.slider)}
      beforeChange={(_, newIdx) => {
        setCurrSlide(newIdx);
      }}
      afterChange={i => {
        if (onChange) onChange(i);
      }}
      adaptiveHeight={adaptiveHeight}
    >
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          {item}
        </div>
      ))}
    </Slider>
  );

  return (
    <div className={cx(styles.root, className || (classes && classes.root))}>
      {hasHeader && (
        <Root className="pt-0">
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
                xs={renderTitle || title ? 4 : 12}
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
        </Root>
      )}
      {visibleOverflow ? (
        <div className={cn(styles.hiddenScrollBar, 'overflow-x-scroll')}>
          <Root visibleOverflow withSlider className="pt-0">
            {slider}
          </Root>
        </div>
      ) : (
        slider
      )}
    </div>
  );
}
