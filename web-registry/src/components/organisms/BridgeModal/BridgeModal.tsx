import {
  BridgeForm,
  BridgeProps,
} from 'web-components/lib/components/form/BridgeForm';
import { ToucanIcon } from 'web-components/lib/components/icons/ToucanIcon';
import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

interface BridgeModalProps extends RegenModalProps {
  batch?: BatchInfoWithBalance;
  onSubmit: BridgeProps['onSubmit'];
}

export const BRIDGE_TITLE = 'Bridge Ecocredits to Polygon';
const BRIDGE_SUBTITLE =
  'This service allows you to bridge NCT-eligible ecocredits to Polygon in the form of TCO2s.';

const BridgeModal = ({
  batch,
  open,
  onClose,
  onSubmit,
}: BridgeModalProps): JSX.Element => (
  <FormModalTemplate
    title={BRIDGE_TITLE}
    subtitle={BRIDGE_SUBTITLE}
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
