import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import { CreditRetireForm, CreditRetireProps } from '../form/CreditRetireForm';

interface CreditRetireModalProps extends RegenModalProps, CreditRetireProps {}

const CreditRetireModal: React.FC<CreditRetireModalProps> = ({
  holder,
  batchDenom,
  availableTradableAmount,
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title="Retire Credits" open={open} onClose={onClose}>
    <CreditRetireForm
      holder={holder}
      availableTradableAmount={availableTradableAmount}
      batchDenom={batchDenom}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </FormModalTemplate>
);

export { CreditRetireModal };
