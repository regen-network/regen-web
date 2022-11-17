import React from 'react';

import { CreditRetireForm, CreditRetireProps } from '../form/CreditRetireForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface CreditRetireModalProps extends RegenModalProps, CreditRetireProps {}

export const CREDIT_RETIRE_TITLE = 'Retire';

const CreditRetireModal: React.FC<
  React.PropsWithChildren<CreditRetireModalProps>
> = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title={CREDIT_RETIRE_TITLE} open={open} onClose={onClose}>
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
