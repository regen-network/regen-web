import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { creditClasses, BasicCreditClass } from '../../mocks';
import { getImgSrc } from '../../lib/imgSrc';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0),
    },
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.75),
    },
  },
}));

const ChooseCreditClass: React.FC = () => {
  const classes = useStyles();

  function handleSelection(cc: BasicCreditClass): void {
    console.log('Selected credit class:  :>> ', cc); // eslint-disable-line no-console
  }

  return (
    <OnBoardingSection title="Choose a credit class">
      <Grid container justify="center" className={classes.main}>
        {creditClasses.map((c, i) => (
          <ImageActionCard
            key={i}
            className={classes.card}
            description={c.description}
            imgSrc={getImgSrc(c.imgSrc)}
            onClick={() => handleSelection(c)}
            title={c.title}
          />
        ))}
      </Grid>
    </OnBoardingSection>
  );
};

export default ChooseCreditClass;
