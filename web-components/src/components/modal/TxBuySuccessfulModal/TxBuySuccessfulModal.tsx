import React from 'react';

import RegenStepper from '../../stepper';
import { TxModal, TxModalProps } from '../TxModal';

export interface TxBuySuccessfulModalProps extends TxModalProps {
  title: string;
  description?: string;
  steps: string[];
}

const TxBuySuccessfulModal: React.FC<TxBuySuccessfulModalProps> = ({
  steps,
  ...props
}) => {
  return (
    <TxModal
      {...props}
      classes={{
        root: '!pt-0 !px-0',
        description: 'text-sm',
        content: 'px-5 sm:px-30 ',
      }}
      titleVariant="h5"
      titleMobileVariant="h5"
      header={
        <RegenStepper
          classes={{
            root: "bg-[url('./topography-pattern-stepper.png')] bg-[0%_0%] bg-[100px_100px] bg-repeat w-full mb-30 sm:mb-40",
            stepper: 'p-10 pt-40',
            stepIcon: 'h-20 w-20',
            stepConnector: '!top-10 left-[-50%] right-[50%]',
            stepLabel: '!text-xs',
            stepConnectorLine: '!border-brand-400',
          }}
          activeStep={steps.length}
          steps={steps}
        />
      }
    />
  );
};

export { TxBuySuccessfulModal };
