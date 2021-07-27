import React, { useCallback, useRef } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';
import cx from 'clsx';

import ProjectImpactCard from 'web-components/lib/components/cards/ProjectImpactCard';
import Section from 'web-components/lib/components/section';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import { Impact } from '../../mocks/cms-duplicates';

interface ProjectImpactProps {
  impacts: Impact[];
  title?: string;
  classes?: {
    root?: string;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
    },
  },
  title: {
    paddingBottom: theme.spacing(7.5),
  },
  slider: {
    margin: theme.spacing(0, -1.75),
  },
  swipe: {
    display: 'flex',
    marginLeft: theme.spacing(-4),
    marginRight: theme.spacing(-4),
    overflowX: 'auto',
    minHeight: theme.spacing(104),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    minWidth: theme.spacing(73),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1.875),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1.875),
      '&:first-child': {
        paddingLeft: theme.spacing(4),
      },
      '&:last-child': {
        paddingRight: theme.spacing(4),
      },
    },
  },
  buttons: {
    paddingTop: theme.spacing(0.25),
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.75),
      paddingBottom: theme.spacing(10),
    },
    '& div': {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

function ProjectImpactSection({ impacts, title, classes }: ProjectImpactProps): JSX.Element {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet: boolean = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const slidesCount: number = isTablet ? 2 : 3;

  const settings = {
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: slidesCount,
    arrows: false,
    lazyload: true,
  };

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

  return (
    <Section
      classes={{ root: cx(styles.root, classes?.root), title: styles.title }}
      title={title || 'Impact'}
      titleVariant="h2"
      titleAlign="left"
      topRight={
        <>
          {!isMobile && impacts.length > slidesCount && (
            <Grid container justify="flex-end" className={styles.buttons}>
              <PrevNextButton direction="prev" onClick={slickPrev} />
              <PrevNextButton direction="next" onClick={slickNext} />
            </Grid>
          )}
        </>
      }
    >
      <LazyLoad offset={300}>
        {isMobile ? (
          <div className={styles.swipe}>
            {impacts.map(({ name, description, imgSrc, monitored }: Impact, index: number) => (
              <div className={styles.item} key={index}>
                <ProjectImpactCard
                  name={name}
                  description={description}
                  imgSrc={imgSrc}
                  monitored={monitored}
                />
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings} ref={slider} className={styles.slider}>
            {impacts.map(({ name, description, imgSrc, monitored }: Impact, index: number) => (
              <ProjectImpactCard
                key={index}
                className={styles.item}
                name={name}
                description={description}
                imgSrc={imgSrc}
                monitored={monitored}
              />
            ))}
          </Slider>
        )}
      </LazyLoad>
    </Section>
  );
}

export { ProjectImpactSection };
