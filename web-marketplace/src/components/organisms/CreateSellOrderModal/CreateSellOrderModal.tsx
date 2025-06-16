import { PropsWithChildren } from 'react';

import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import {
  CreateSellOrderForm,
  Props as CreateSellOrderProps,
} from '../CreateSellOrderForm/CreateSellOrderForm';

interface CreateSellOrderModalProps
  extends RegenModalPropsWithOnClose,
    CreateSellOrderProps {
  title: string;
  placeholderText?: string;
}

const CreateSellOrderModal = ({
  batchDenoms,
  allowedDenoms,
  sellDenom,
  availableAmountByBatch,
  open,
  title,
  onClose,
  onSubmit,
  placeholderText,
}: PropsWithChildren<CreateSellOrderModalProps>) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CreateSellOrderForm
      batchDenoms={batchDenoms}
      allowedDenoms={allowedDenoms}
      sellDenom={sellDenom}
      availableAmountByBatch={availableAmountByBatch}
      onClose={onClose}
      onSubmit={onSubmit}
      placeholderText={placeholderText}
    />
  </FormModalTemplate>
);

export { CreateSellOrderModal };
