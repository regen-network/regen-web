import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import { CreditSendForm } from '../form/CreditSendForm';

interface CreditSendModalProps extends RegenModalProps {
  sender: string;
  batchDenom: string;
}

const CreditSendModal: React.FC<CreditSendModalProps> = ({
  sender,
  batchDenom,
  open,
  onClose,
}) => (
  <FormModalTemplate title="Send" open={open} onClose={onClose}>
    <CreditSendForm
      sender={sender}
      availableTradableAmount={1000}
      batchDenom={batchDenom}
      onClose={() => null}
    />
  </FormModalTemplate>
);

export { CreditSendModal };
