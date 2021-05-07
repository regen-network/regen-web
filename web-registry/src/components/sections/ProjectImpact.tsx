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
      paddingBottom: theme.spacing(20.5),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(10),
    },
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
      '&:nth-child(odd)': {
        paddingRight: theme.spacing(3.75),
      },
      '&:nth-child(even)': {
        paddingLeft: theme.spacing(3.75),
      },
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.75),
      marginRight: theme.spacing(3.75),
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
  swipe: {
    display: 'flex',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

export default function ProjectImpact({ impacts }: ProjectImpactProps): JSX.Element {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('xs'));
  const slides: number = isMobile ? 1 : 3;

  const settings = {
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
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

  const Impacts = (): JSX.Element[] =>
    impacts.map(({ name, description, imgSrc, monitored }: Impact, index: number) => (
      <div className={classes.item} key={index}>
        <ProjectImpactCard
          name={name}
          description={description}
          imgSrc={getOptimizedImageSrc(imgSrc, imageStorageBaseUrl, apiServerUrl)}
          monitored={monitored}
        />
      </div>
    ));

  return (
    <div className={`project-background`}>
      <Section
        className={classes.section}
        title="Impact"
        titleVariant="h2"
        titleClassName={classes.title}
        titleAlign="left"
        topRight={
          <>
            {!isMobile && impacts.length > slides && (
              <Grid container justify="flex-end" className={classes.buttons}>
                <PrevNextButton direction="prev" onClick={slickPrev} />
                <PrevNextButton direction="next" onClick={slickNext} />
              </Grid>
            )}
          </>
        }
      >
        <LazyLoad offset={300}>
          {isMobile ? (
            <div className={classes.swipe}>{Impacts()}</div>
          ) : (
            <Slider {...settings} ref={slider}>
              {Impacts()}
            </Slider>
          )}
        </LazyLoad>
      </Section>
    </div>
  );
}
