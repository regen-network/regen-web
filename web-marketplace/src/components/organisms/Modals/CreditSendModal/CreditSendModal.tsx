import React from 'react';

import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import {
  CreditSendForm,
  CreditSendFormProps,
} from 'components/organisms/CreditSendForm/CreditSendForm';

interface CreditSendModalProps
  extends RegenModalPropsWithOnClose,
    CreditSendFormProps {
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
