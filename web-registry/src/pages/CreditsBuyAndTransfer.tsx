import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';

import { CreditsTransfer } from './CreditsTransfer';
import { CreditsRetire } from './CreditsRetire';
import { BuyerCreate } from './BuyerCreate';

const useStyles = makeStyles(theme => ({
  stepper: {
    background: theme.palette.grey[100],
  },
  label: {
    cursor: 'pointer',
  },
}));

const CreditsBuyAndTransfer: React.FC = () => {
  const [buyerId, setBuyerId] = useState('');
  const [step, setStep] = useState(1);

  function getStepContent(stepIndex: number): JSX.Element {
    switch (stepIndex) {
      case 1:
        return <BuyerCreate onCreate={onBuyerCreate} />;
      case 2:
        return <CreditsTransfer buyerId={buyerId} />;
      case 3:
        return <CreditsRetire />;
      default:
        return <></>;
    }
  }

  function onBuyerCreate(buyerId: string): void {
    setBuyerId(buyerId);
    setStep(2);
  }

  const styles = useStyles();

  return (
    <Box>
      <Stepper className={styles.stepper} activeStep={step} alternativeLabel>
        {['Create Buyer', 'Transfer Credits', 'Complete'].map((label, i) => (
          <Step key={label}>
            <StepLabel className={styles.label} onClick={() => setStep(i + 1)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box display="flex" justifyContent="center" alignItems="center" minWidth="33%">
        {getStepContent(step)}
      </Box>
    </Box>
  );
};

export { CreditsBuyAndTransfer };
