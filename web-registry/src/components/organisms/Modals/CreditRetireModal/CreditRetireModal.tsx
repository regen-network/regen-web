import React from 'react';

import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';

import {
  CreditRetireForm,
  CreditRetireFormProps,
} from 'components/organisms/CreditRetireForm/CreditRetireForm';

import { CREDIT_RETIRE_TITLE } from './CreditRetireModal.constants';

interface CreditRetireModalProps
  extends RegenModalProps,
    CreditRetireFormProps {}

export const CREDIT_SEND_TITLE = 'Send';

const CreditRetireModal: React.FC<
  React.PropsWithChildren<CreditRetireModalProps>
> = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  open,
  onSubmit,
  onClose,
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
