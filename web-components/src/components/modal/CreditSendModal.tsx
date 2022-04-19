import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import { CreditSendForm, CreditSendProps } from '../form/CreditSendForm';

interface CreditSendModalProps extends RegenModalProps, CreditSendProps {}

const CreditSendModal: React.FC<CreditSendModalProps> = ({
  sender,
  batchDenom,
  availableTradableAmount,
  open,
  onSubmit,
  onClose,
}) => (
  <FormModalTemplate title="Send" open={open} onClose={onClose}>
    <CreditSendForm
      sender={sender}
      batchDenom={batchDenom}
      availableTradableAmount={availableTradableAmount}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  </FormModalTemplate>
);

export { CreditSendModal };
