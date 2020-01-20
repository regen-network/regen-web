import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ProtectedSpeciesItem, { ItemProps } from './Item';
import Slider from 'react-slick';
import PrevNextButton from '../buttons/PrevNextButton';

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

export default function ProtectedSpecies({ species }: ProtectedSpeciesProps): JSX.Element {
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
        {species.map((item, index) => (
          <div className={classes.item}>
            <ProtectedSpeciesItem name={item.name} imgSrc={item.imgSrc} />
          </div>
        ))}
      </Slider>
      {species.length > 4 && (
        <Grid container justify="flex-end" className={classes.buttons}>
          <PrevNextButton direction="prev" onClick={slickPrev} />
          <PrevNextButton direction="next" onClick={slickNext} />
        </Grid>
      )}
    </div>
  );
}
