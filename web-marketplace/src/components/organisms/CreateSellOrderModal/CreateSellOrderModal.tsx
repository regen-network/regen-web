import { PropsWithChildren } from 'react';

import { RegenModalProps } from 'web-components/src/components/modal';
import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';

import {
  CreateSellOrderForm,
  Props as CreateSellOrderProps,
} from '../CreateSellOrderForm/CreateSellOrderForm';

interface CreateSellOrderModalProps
  extends RegenModalProps,
    CreateSellOrderProps {
  title: string;
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
}: PropsWithChildren<CreateSellOrderModalProps>) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CreateSellOrderForm
      batchDenoms={batchDenoms}
      allowedDenoms={allowedDenoms}
      sellDenom={sellDenom}
      availableAmountByBatch={availableAmountByBatch}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </FormModalTemplate>
);

export { CreateSellOrderModal };
