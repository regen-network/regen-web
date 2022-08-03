import React, { useCallback, useRef } from 'react';
import Slider from 'react-slick';
import Grid from '@mui/material/Grid';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';

import PrevNextButton from '../buttons/PrevNextButton';
import ProtectedSpeciesItem, { ItemProps } from './Item';

export interface ProtectedSpeciesProps {
  species: ItemProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(-5.25),
  },
  item: {
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

export default function ProtectedSpecies({
  species,
}: ProtectedSpeciesProps): JSX.Element {
  const classes = useStyles({});
  const settings = {
    // className: 'center',
    // centerMode: true,
    // infinite: false,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
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
        {species.map((item, index) => (
          <div className={classes.item} key={index}>
            <ProtectedSpeciesItem name={item.name} imgSrc={item.imgSrc} />
          </div>
        ))}
      </Slider>
      {species.length > 4 && (
        <Grid container justifyContent="flex-end" className={classes.buttons}>
          <PrevNextButton direction="prev" onClick={slickPrev} />
          <PrevNextButton direction="next" onClick={slickNext} />
        </Grid>
      )}
    </div>
  );
}
