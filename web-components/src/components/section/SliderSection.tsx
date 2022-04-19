import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LazyLoad from 'react-lazyload';
import cx from 'clsx';

import ResponsiveSlider from '../sliders/ResponsiveSlider';
import { Title } from '../typography';
import Section from './';

interface SliderSectionProps {
  items: JSX.Element[];
  title: string;
  classes?: {
    root?: string;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
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
  classes,
}: SliderSectionProps): JSX.Element {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet: boolean = useMediaQuery(
    theme.breakpoints.between('xs', 'md'),
  );
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('sm'));
  const slidesCount: number = isMobile ? 1 : isTablet ? 2 : 3;
  const showArrows: boolean = (isTablet || isDesktop) && items?.length > 3;

  return (
    <Section className={cx(styles.root, classes?.root)}>
      <LazyLoad offset={300}>
        <ResponsiveSlider
          classes={{ root: styles.slider, headerWrap: styles.headerWrap }}
          arrows={showArrows}
          infinite={false}
          slidesToShow={slidesCount}
          padding={theme.spacing(2.5)}
          itemWidth="100%"
          items={items}
          renderTitle={() => (
            <Title variant="h2" mobileVariant="h3" align="left">
              {title}
            </Title>
          )}
        />
      </LazyLoad>
    </Section>
  );
}

export { SliderSection };
