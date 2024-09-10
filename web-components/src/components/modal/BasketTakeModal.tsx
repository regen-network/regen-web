import React from 'react';

import { BasketTakeForm, BasketTakeProps } from '../form/BasketTakeForm';
import { FormModalTemplate } from './FormModalTemplate';
import { RegenModalProps } from './index';

export interface TakeModalProps extends RegenModalProps, BasketTakeProps {
  title: string;
  subtitle: string;
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
      />
    </FormModalTemplate>
  );
};

export { BasketTakeModal };
