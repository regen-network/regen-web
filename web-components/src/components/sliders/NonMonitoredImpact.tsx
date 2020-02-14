import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import PrevNextButton from '../buttons/PrevNextButton';
import ImpactCard, { ImpactCardProps } from '../cards/ImpactCard';

export interface NonMonitoredImpactProps {
  impact: ImpactCardProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(-5.25),
    paddingTop: theme.spacing(3),
  },
  item: {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4.5),
    },
  },
  buttons: {
    paddingTop: theme.spacing(0.25),
    '& div': {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

export default function NonMonitoredImpact({ impact }: NonMonitoredImpactProps): JSX.Element {
  const classes = useStyles({});
  const settings = {
    // className: 'center',
    // centerMode: true,
    // infinite: false,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
  };

  let slider: any = null;

  function slickPrev(): void {
    if (slider) {
      slider.slickPrev();
    }
  }

  function slickNext(): void {
    if (slider) {
      slider.slickNext();
    }
  }

  return (
    <div>
      <Slider
        {...settings}
        ref={e => {
          slider = e;
        }}
        className={classes.root}
      >
        {impact.map((item, index) => (
          <div className={classes.item} key={index}>
            <ImpactCard
              name={item.name}
              imgSrc={item.imgSrc}
              description={item.description}
              monitored={item.monitored}
            />
          </div>
        ))}
      </Slider>
      {impact.length > 1 && (
        <Grid container justify="flex-end" className={classes.buttons}>
          <PrevNextButton direction="prev" onClick={slickPrev} />
          <PrevNextButton direction="next" onClick={slickNext} />
        </Grid>
      )}
    </div>
  );
}
