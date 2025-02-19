import React from 'react';
import { useLingui } from '@lingui/react';

import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import { RETIREMENT_INFO_TEXT } from 'lib/constants/shared.constants';

import {
  CreditRetireForm,
  CreditRetireFormProps,
} from 'components/organisms/CreditRetireForm/CreditRetireForm';

import { CREDIT_RETIRE_TITLE } from './CreditRetireModal.constants';

interface CreditRetireModalProps
  extends RegenModalPropsWithOnClose,
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
        retirementInfoText={_(RETIREMENT_INFO_TEXT)}
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
