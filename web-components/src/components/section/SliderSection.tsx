import React from 'react';
import LazyLoad from 'react-lazyload';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import ResponsiveSlider from '../sliders/ResponsiveSlider';
import { Title } from '../typography';
import Section from './';

interface SliderSectionProps {
  items: JSX.Element[];
  title: string;
  slidesToShow?: number;
  classes?: {
    root?: string;
    title?: string;
  };
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  slider: {
    paddingTop: 0,
  },
  headerWrap: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
  },
}));

function SliderSection({
  items,
  title,
  slidesToShow,
  classes,
}: SliderSectionProps): JSX.Element {
  const { classes: styles, cx } = useStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet: boolean = useMediaQuery(
    theme.breakpoints.between('xs', 'md'),
  );
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('sm'));
  const slidesCount: number = isMobile ? 1 : isTablet ? 2 : slidesToShow || 3;
  const showArrows: boolean = (isTablet || isDesktop) && items?.length > 3;

  return (
    <Section
      className={cx(styles.root, classes?.root)}
      classes={{ title: classes?.title }}
    >
      <LazyLoad offset={300}>
        <ResponsiveSlider
          classes={{ root: styles.slider, headerWrap: styles.headerWrap }}
          arrows={showArrows}
          infinite={false}
          slidesToShow={slidesCount}
          padding={theme.spacing(2.5)}
          mobileItemWidth="100%"
          items={items}
          renderTitle={() => (
            <Title variant="h2" mobileVariant="h3" align={'left'}>
              {title}
            </Title>
          )}
        />
      </LazyLoad>
    </Section>
  );
}

export { SliderSection };
