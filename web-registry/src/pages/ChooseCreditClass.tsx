import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

import { creditClasses, BasicCreditClass } from '../mocks';
import { CreditClassCards } from '../components/organisms';

const useStyles = makeStyles((theme: Theme) => ({
  cards: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.75),
    },
  },
}));

const ChooseCreditClass: React.FC = () => {
  function handleSelection(cc: BasicCreditClass): void {
    console.log('Selected credit class:  :>> ', cc); // eslint-disable-line no-console
  }

  const styles = useStyles();

  return (
    <OnBoardingSection title="Choose a credit class">
      <CreditClassCards
        creditClasses={creditClasses}
        onClickCard={handleSelection}
        classes={{ root: styles.cards }}
      />
    </OnBoardingSection>
  );
};

export { ChooseCreditClass };
