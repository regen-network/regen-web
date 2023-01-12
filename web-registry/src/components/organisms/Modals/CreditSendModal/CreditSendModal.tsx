import React from 'react';

import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';

// import {
//   // CreditSendForm,
//   CreditSendProps,
// } from 'components/organisms/CreditSendForm/CreditSendForm';
import {
  CreditSendForm,
  FormProps,
} from 'components/organisms/forms/CreditSendForm/CreditSendForm';

// interface CreditSendModalProps extends RegenModalProps, CreditSendProps {}
interface CreditSendModalProps extends RegenModalProps, FormProps {}

export const CREDIT_SEND_TITLE = 'Send';

// const CreditSendModal: React.FC<React.PropsWithChildren<FormProps>> = ({
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
