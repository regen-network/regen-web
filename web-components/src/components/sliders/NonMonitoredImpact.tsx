import React, { useRef, useCallback } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Slider from 'react-slick';
import PrevNextButton from '../buttons/PrevNextButton';
import ImpactCard, { ImpactCardProps } from '../cards/ImpactCard';

export interface NonMonitoredImpactProps {
  impact: ImpactCardProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(-5.25),
    // paddingTop: theme.spacing(3),
  },
  item: {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5.75),
    },
    [theme.breakpoints.down('sm')]: {
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

export default function NonMonitoredImpact({
  impact,
}: NonMonitoredImpactProps): JSX.Element {
  const classes = useStyles({});
  const settings = {
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
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
        <Grid container justifyContent="flex-end" className={classes.buttons}>
          <PrevNextButton direction="prev" onClick={slickPrev} />
          <PrevNextButton direction="next" onClick={slickNext} />
        </Grid>
      )}
    </div>
  );
}
