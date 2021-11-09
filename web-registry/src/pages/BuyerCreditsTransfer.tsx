import React, { useState, useEffect } from 'react';

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

const BuyerCreditsTransfer: React.FC = () => {
  const [step, setStep] = useState(1);
  const [buyerWalletId, setBuyerWalletId] = useState('');
  const [vintageId, setVintageId] = useState('');
  const [addressId, setAddressId] = useState('');

  useEffect(() => {
    if (!buyerWalletId) setStep(1);
    if (buyerWalletId && addressId && !vintageId) setStep(2);
    if (buyerWalletId && addressId && vintageId) setStep(3);
  }, [buyerWalletId, vintageId, addressId]);

  function renderStep(stepIndex: number): JSX.Element {
    switch (stepIndex) {
      case 1:
        return (
          <BuyerCreate
            onCreate={(walletId, addressId) => {
              setBuyerWalletId(walletId);
              setAddressId(addressId);
            }}
          />
        );
      case 2:
        return (
          <CreditsTransfer
            addressId={addressId}
            buyerWalletId={buyerWalletId}
            onTransfer={setVintageId}
          />
        );
      case 3:
        return (
          <CreditsRetire
            buyerWalletId={buyerWalletId}
            creditVintageId={vintageId}
            addressId={addressId}
          />
        );
      default:
        return <></>;
    }
  }

  const styles = useStyles();

  return (
    <Box>
      <Stepper className={styles.stepper} activeStep={step} alternativeLabel>
        {['Create Buyer', 'Transfer Credits', 'Retire'].map((label, i) => (
          <Step key={label}>
            <StepLabel className={styles.label} onClick={() => setStep(i + 1)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth="33%"
      >
        {renderStep(step)}
      </Box>
    </Box>
  );
};

export { BuyerCreditsTransfer };
