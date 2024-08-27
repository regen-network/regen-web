import React from 'react';

import { RegenModalProps } from 'web-components/src/components/modal';
import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';

import {
  CreditSendForm,
  CreditSendFormProps,
} from 'components/organisms/CreditSendForm/CreditSendForm';

interface CreditSendModalProps extends RegenModalProps, CreditSendFormProps {
  title: string;
}

const CreditSendModal: React.FC<React.PropsWithChildren<CreditSendModalProps>> =
  ({
    title,
    sender,
    batchDenom,
    availableTradableAmount,
    mapboxToken,
    open,
    addressPrefix,
    onSubmit,
    onClose,
  }) => (
    <FormModalTemplate title={title} open={open} onClose={onClose}>
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
