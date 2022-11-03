import {
  BridgeForm,
  BridgeProps,
} from 'web-components/lib/components/form/BridgeForm';
import { ToucanIcon } from 'web-components/lib/components/icons/ToucanIcon';
import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import {
  BRIDGE_MODAL_SUBTITLE,
  BRIDGE_MODAL_TITLE,
} from './BridgeModal.constants';

interface BridgeModalProps extends RegenModalProps {
  batch?: BatchInfoWithBalance;
  onSubmit: BridgeProps['onSubmit'];
}

const BridgeModal = ({
  batch,
  open,
  onClose,
  onSubmit,
}: BridgeModalProps): JSX.Element => (
  <FormModalTemplate
    title={BRIDGE_MODAL_TITLE}
    subtitle={BRIDGE_MODAL_SUBTITLE}
    image={<ToucanIcon sx={{ width: 109, height: 32 }} />}
    open={open}
    onClose={onClose}
  >
    <BridgeForm
      onClose={onClose}
      onSubmit={onSubmit}
      availableBridgeableAmount={Number(batch?.balance?.tradableAmount) ?? 0}
      batchDenom={batch?.denom ?? ''}
    />
  </FormModalTemplate>
);

export { BridgeModal };
