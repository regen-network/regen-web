import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import { CreditRetireForm, CreditRetireProps } from '../form/CreditRetireForm';

interface CreditRetireModalProps extends RegenModalProps, CreditRetireProps {}

export const title = 'Retire';

const CreditRetireModal: React.FC<CreditRetireModalProps> = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CreditRetireForm
      availableTradableAmount={availableTradableAmount}
      batchDenom={batchDenom}
      mapboxToken={mapboxToken}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </FormModalTemplate>
);

export { CreditRetireModal };
