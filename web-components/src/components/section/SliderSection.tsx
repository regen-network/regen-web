import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LazyLoad from 'react-lazyload';
import cx from 'clsx';

import ResponsiveSlider from '../sliders/ResponsiveSlider';
import Title from '../title';
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
    [theme.breakpoints.down('xs')]: {
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
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

function SliderSection({ items, title, classes }: SliderSectionProps): JSX.Element {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet: boolean = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('sm'));
  const slidesCount: number = isMobile ? 1 : isTablet ? 2 : 3;
  const showArrows: boolean = (isTablet || isDesktop) && items?.length > 3;

  return (
    <Section className={cx(styles.root, classes?.root)}>
      <LazyLoad offset={300}>
        <ResponsiveSlider
          className={styles.slider}
          headerWrapClassName={styles.headerWrap}
          arrows={showArrows}
          infinite={false}
          slidesToShow={slidesCount}
          padding={theme.spacing(2.5)}
          itemWidth="100%"
          items={items}
          renderTitle={() => (
            <Title className={styles.title} variant="h2" align="left">
              {title}
            </Title>
          )}
        />
      </LazyLoad>
    </Section>
  );
}

export { SliderSection };
