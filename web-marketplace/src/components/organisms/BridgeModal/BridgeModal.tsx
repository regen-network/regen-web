import { Flex } from 'web-components/lib/components/box/Box';
import RegenNetworkIcon from 'web-components/lib/components/icons/RegenNetworkIcon';
import ToucanIcon from 'web-components/lib/components/icons/ToucanIcon';
import { RegenModalProps } from 'web-components/lib/components/modal';
import { FormModalTemplate } from 'web-components/lib/components/modal/FormModalTemplate';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import {
  BridgeForm,
  BridgeProps,
} from 'components/organisms/BridgeForm/BridgeForm';

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
    image={
      <Flex sx={{ alignItems: 'center' }}>
        <ToucanIcon sx={{ width: 88, height: 26, mr: 4 }} />
        <RegenNetworkIcon sx={{ width: 80, height: 36 }} />
      </Flex>
    }
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
