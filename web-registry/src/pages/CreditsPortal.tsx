import React, { useState } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { CreditsIssue } from './CreditsIssue';
import { CreditsTransfer } from './CreditsTransfer';
import { CreditsRetire } from './CreditsRetire';
import { BuyerCreate } from './BuyerCreate';

const CreditsPortal: React.FC = () => {
  const [buyerId, setBuyerId] = useState('');
  const [step, setStep] = useState(0);

  function getStepContent(stepIndex: number): JSX.Element {
    switch (stepIndex) {
      case 0:
        return <BuyerCreate onCreate={onBuyerCreate} />;
      case 1:
        return <CreditsTransfer />;
      case 2:
        return <CreditsRetire />;
      default:
        return <></>;
    }
  }

  function onBuyerCreate(buyerId: string): void {
    console.log('buyerId', buyerId);
    setBuyerId(buyerId);
  }

  return (
    <Box>
      <Stepper activeStep={step} alternativeLabel>
        {['Create Buyer', 'Transfer Credits', 'Complete'].map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box display="flex" justifyContent="center" alignItems="center" minWidth="33%">
        {getStepContent(step)}
      </Box>
      {/* {step === 0 && (
        <>
        <BuyerCreate onCreate={onBuyerCreate} />
        </>
      )}
      {}
      <CreditsTransfer />
      <CreditsRetire /> */}
    </Box>
  );
};

export { CreditsPortal };
