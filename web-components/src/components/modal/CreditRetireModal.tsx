import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import { CreditRetireForm } from '../form/CreditRetireForm';

interface CreditRetireModalProps extends RegenModalProps {
  holder: string;
  batchDenom: string;
}

const CreditRetireModal: React.FC<CreditRetireModalProps> = ({
  holder,
  batchDenom,
  open,
  onClose,
}) => (
  <FormModalTemplate title="Retire Credits" open={open} onClose={onClose}>
    <CreditRetireForm
      holder={holder}
      availableTradableAmount={1000}
      batchDenom={batchDenom}
      onClose={() => null}
    />
  </FormModalTemplate>
);

export { CreditRetireModal };
