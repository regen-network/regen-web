import React from 'react';

import { RegenModalProps } from 'web-components/src/components/modal';
import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';

import {
  CreditSendForm,
  CreditSendFormProps,
} from 'components/organisms/CreditSendForm/CreditSendForm';

interface CreditSendModalProps extends RegenModalProps, CreditSendFormProps {}

export const CREDIT_SEND_TITLE = 'Send';

const CreditSendModal: React.FC<React.PropsWithChildren<CreditSendModalProps>> =
  ({
    sender,
    batchDenom,
    availableTradableAmount,
    mapboxToken,
    open,
    addressPrefix,
    onSubmit,
    onClose,
  }) => (
    <FormModalTemplate title={CREDIT_SEND_TITLE} open={open} onClose={onClose}>
      <CreditSendForm
        sender={sender}
        batchDenom={batchDenom}
        availableTradableAmount={availableTradableAmount}
        mapboxToken={mapboxToken}
        onSubmit={onSubmit}
        onClose={onClose}
        addressPrefix={addressPrefix}
      />
    </FormModalTemplate>
  );

export { CreditSendModal };
