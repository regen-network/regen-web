import React, { useCallback, useRef } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';

import ProjectImpactCard, {
  ProjectImpactCardProps as Impact,
} from 'web-components/lib/components/cards/ProjectImpactCard';
import Section from 'web-components/lib/components/section';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import { getOptimizedImageSrc } from 'web-components/lib/utils/optimizedImageSrc';

interface ProjectImpactProps {
  impacts: Impact[];
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.75),
      paddingBottom: theme.spacing(10),
    },
    '& div': {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

function ProjectImpactSection({ impacts }: ProjectImpactProps): JSX.Element {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;
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
    <LazyLoad offset={300}>
      <Section
        classes={{ root: styles.section, title: styles.title }}
        title="Impact"
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
        {isMobile ? (
          <div className={styles.swipe}>
            {impacts.map(({ name, description, imgSrc, monitored }: Impact, index: number) => (
              <div className={styles.item}>
                <ProjectImpactCard
                  key={index}
                  name={name}
                  description={description}
                  imgSrc={getOptimizedImageSrc(imgSrc, imageStorageBaseUrl, apiServerUrl)}
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
                imgSrc={getOptimizedImageSrc(imgSrc, imageStorageBaseUrl, apiServerUrl)}
                monitored={monitored}
              />
            ))}
          </Slider>
        )}
      </Section>
    </LazyLoad>
  );
}

export { ProjectImpactSection };
