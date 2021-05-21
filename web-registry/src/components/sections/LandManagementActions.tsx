import React, { useRef, useCallback } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';

import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import Action, { ActionProps } from 'web-components/lib/components/action';

export interface LandManagementActionsProps {
  actions: ActionProps[];
  title: string;
  subtitle?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(13),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2),
    },
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
    flex: 1,
    position: 'relative',
    top: theme.spacing(9.5),
    '& div': {
      marginLeft: theme.spacing(2.5),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(7),
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

export default function LandManagementActions({
  actions,
  title,
  subtitle,
}: LandManagementActionsProps): JSX.Element {
  const classes = useStyles({});
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet: boolean = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const slidesCount = isTablet ? 2 : 3;

  const settings = {
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: slidesCount,
    arrows: false,
  };

  // TODO build reusable HOC slider component
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
      classes={{ root: classes.section, title: classes.title }}
      title={title}
      titleVariant="h2"
      titleAlign="left"
      topRight={
        <>
          {!isMobile && actions.length > slidesCount && (
            <Grid container justify="flex-end" className={classes.buttons}>
              <PrevNextButton direction="prev" onClick={slickPrev} />
              <PrevNextButton direction="next" onClick={slickNext} />
            </Grid>
          )}
        </>
      }
    >
      <Description className={classes.description}>{subtitle}</Description>
      {isMobile ? (
        <div className={classes.swipe}>
          {actions.map(action => (
            <div className={classes.item}>
              <Action
                key={action.name}
                name={action.name}
                description={action.description}
                imgSrc={action.imgSrc}
              />
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings} ref={slider} className={classes.slider}>
          {actions.map(action => (
            <Action
              className={classes.item}
              key={action.name}
              name={action.name}
              description={action.description}
              imgSrc={action.imgSrc}
            />
          ))}
        </Slider>
      )}
    </Section>
  );
}
