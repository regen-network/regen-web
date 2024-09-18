import React from 'react';

import { BasketTakeForm, BasketTakeProps } from '../form/BasketTakeForm';
import { FormModalTemplate } from './FormModalTemplate';
import { RegenModalProps } from './index';

export interface TakeModalProps extends RegenModalProps, BasketTakeProps {
  title: string;
  subtitle: string;
  maxLabel: string;
  availableLabel: string;
  requiredMessage: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
  invalidMemoLength: string;
}

const BasketTakeModal: React.FC<React.PropsWithChildren<TakeModalProps>> = ({
  title,
  subtitle,
  basket,
  basketDisplayDenom,
  balance,
  accountAddress,
  open,
  mapboxToken,
  amountErrorText,
  amountLabel,
  retireOnTakeLabel,
  retireOnTakeTooltip,
  submitLabel,
  submitErrorText,
  bottomTextMapping,
  retirementInfoText,
  stateProvinceErrorText,
  maxLabel,
  availableLabel,
  requiredMessage,
  invalidAmount,
  insufficientCredits,
  invalidDecimalCount,
  invalidMemoLength,
  onClose,
  onSubmit,
}) => {
  return (
    <FormModalTemplate
      title={title}
      subtitle={subtitle}
      open={open}
      onClose={onClose}
    >
      <BasketTakeForm
        maxLabel={maxLabel}
        availableLabel={availableLabel}
        mapboxToken={mapboxToken}
        accountAddress={accountAddress}
        balance={balance}
        basket={basket}
        basketDisplayDenom={basketDisplayDenom}
        onClose={onClose}
        onSubmit={onSubmit}
        amountErrorText={amountErrorText}
        amountLabel={amountLabel}
        retireOnTakeLabel={retireOnTakeLabel}
        retireOnTakeTooltip={retireOnTakeTooltip}
        submitLabel={submitLabel}
        submitErrorText={submitErrorText}
        bottomTextMapping={bottomTextMapping}
        retirementInfoText={retirementInfoText}
        stateProvinceErrorText={stateProvinceErrorText}
        requiredMessage={requiredMessage}
        invalidAmount={invalidAmount}
        insufficientCredits={insufficientCredits}
        invalidDecimalCount={invalidDecimalCount}
        invalidMemoLength={invalidMemoLength}
      />
    </FormModalTemplate>
  );
};

export { BasketTakeModal };
