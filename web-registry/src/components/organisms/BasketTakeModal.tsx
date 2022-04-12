import React from 'react';
import { Basket } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/types';
import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';
import {
  BasketTakeForm,
  MsgTakeValues,
} from 'web-components/lib/components/form/BasketTakeForm';

export interface TakeModalProps extends RegenModalProps {
  basket: Basket;
  accountAddress: string;
  balance: number;
  open: boolean;
  mapboxToken: string;
  onClose: () => void;
  onSubmit: (values: MsgTakeValues) => void;
}

const BasketTakeModal: React.FC<TakeModalProps> = ({
  basket,
  balance,
  accountAddress,
  open,
  mapboxToken,
  onClose,
  onSubmit,
}) => {
  return (
    <FormModalTemplate title="Take from basket" open={open} onClose={onClose}>
      <BasketTakeForm
        mapboxToken={mapboxToken}
        accountAddress={accountAddress}
        availableTradableAmount={balance}
        basket={basket}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModalTemplate>
  );
};

export { BasketTakeModal };
