import { useState } from 'react';
import { Box, Step, StepContent, Stepper } from '@mui/material';
import { AXELAR_USDC_DENOM } from 'config/allowedBaseDenoms';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { Body, Label } from 'web-components/lib/components/typography';

import { coinsTableBuyModalConfig } from './CoinsTable.config';

type CoinsTableBuyModalProps = { selectedBaseDenom: string } & RegenModalProps;

export const CoinsTableBuyModal = ({
  open,
  selectedBaseDenom,
  onClose,
}: CoinsTableBuyModalProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps =
    coinsTableBuyModalConfig[selectedBaseDenom] ??
    coinsTableBuyModalConfig[AXELAR_USDC_DENOM];

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <Label size="sm" sx={{ mb: 2, color: 'info.dark' }}>
                {step.label}
              </Label>
              <StepContent>
                <Body size="md" sx={{ mb: 2, whiteSpace: 'normal' }}>
                  {step.description}
                </Body>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <ContainedButton
                      size="small"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </ContainedButton>
                    <ContainedButton
                      size="small"
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </ContainedButton>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Box>
            <Body>All steps completed - you&apos;re finished</Body>
            <ContainedButton
              size="small"
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
            >
              Reset
            </ContainedButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};
