import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { creditClasses, BasicCreditClass } from '../mocks';
import { getImgSrc } from '../lib/imgSrc';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(0, 4),
  },
}));

const ChooseCreditClass: React.FC = () => {
  const classes = useStyles();

  function handleSelection(cc: BasicCreditClass): void {
    console.log('Selected credit class:  :>> ', cc); // eslint-disable-line no-console
  }

  return (
    <OnBoardingSection title="Choose a credit class">
      <Grid container justify="center">
        {creditClasses.map((c, i) => (
          <ImageActionCard
            key={i}
            className={classes.card}
            description={c.description}
            imgSrc={getImgSrc(c.imgSrc)}
            onClick={() => handleSelection(c)}
            title={() => <>{ReactHtmlParser(c.title)}</>}
          />
        ))}
      </Grid>
    </OnBoardingSection>
  );
};

export default ChooseCreditClass;
