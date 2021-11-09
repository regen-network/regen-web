import React, { useRef, useCallback } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
// import LandManagementActionsItem, { ItemProps } from './Item';
import Slider from 'react-slick';
import PrevNextButton from '../buttons/PrevNextButton';
import Action, { ActionProps } from '../action';

export interface LandManagementActionsProps {
  actions: ActionProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-2.5),
    },
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(3.5)} ${theme.spacing(2.5)} ${theme.spacing(
        2.5,
      )}`,
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

export default function LandManagementActions({
  actions,
}: LandManagementActionsProps): JSX.Element {
  const classes = useStyles({});
  const theme: Theme = useTheme();
  const slides: number = useMediaQuery(theme.breakpoints.up('sm')) ? 3 : 1;

  const settings = {
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
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
    <div>
      <Slider {...settings} ref={slider} className={classes.root}>
        {actions.map((action, index) => (
          <div className={classes.item} key={index}>
            <Action
              name={action.name}
              description={action.description}
              imgSrc={action.imgSrc}
            />
          </div>
        ))}
      </Slider>
      {actions.length > slides && (
        <Grid container justify="flex-end" className={classes.buttons}>
          <PrevNextButton direction="prev" onClick={slickPrev} />
          <PrevNextButton direction="next" onClick={slickNext} />
        </Grid>
      )}
    </div>
  );
}
