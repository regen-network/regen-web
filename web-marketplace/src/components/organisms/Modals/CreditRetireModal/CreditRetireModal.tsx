import React from 'react';
import { useLingui } from '@lingui/react';

import { RegenModalProps } from 'web-components/src/components/modal';
import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';

import {
  CreditRetireForm,
  CreditRetireFormProps,
} from 'components/organisms/CreditRetireForm/CreditRetireForm';

import { CREDIT_RETIRE_TITLE } from './CreditRetireModal.constants';

interface CreditRetireModalProps
  extends RegenModalProps,
    CreditRetireFormProps {}

const CreditRetireModal: React.FC<CreditRetireModalProps> = ({
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  open,
  onSubmit,
  onClose,
}) => {
  const { _ } = useLingui();

  return (
    <FormModalTemplate
      title={_(CREDIT_RETIRE_TITLE)}
      open={open}
      onClose={onClose}
    >
      <CreditRetireForm
        availableTradableAmount={availableTradableAmount}
        batchDenom={batchDenom}
        mapboxToken={mapboxToken}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModalTemplate>
  );
};

export { CreditRetireModal };
