import { useLingui } from '@lingui/react';

import { Flex } from 'web-components/src/components/box/Box';
import RegenNetworkIcon from 'web-components/src/components/icons/RegenNetworkIcon';
import ToucanIcon from 'web-components/src/components/icons/ToucanIcon';
import { RegenModalProps } from 'web-components/src/components/modal';
import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';

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
  maxLabel: string;
  availableLabel: string;
  onSubmit: BridgeProps['onSubmit'];
}

const BridgeModal = ({
  batch,
  open,
  maxLabel,
  availableLabel,
  onClose,
  onSubmit,
}: BridgeModalProps): JSX.Element => {
  const { _ } = useLingui();

  return (
    <FormModalTemplate
      title={_(BRIDGE_MODAL_TITLE)}
      subtitle={_(BRIDGE_MODAL_SUBTITLE)}
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
        maxLabel={maxLabel}
        availableLabel={availableLabel}
        onClose={onClose}
        onSubmit={onSubmit}
        availableBridgeableAmount={Number(batch?.balance?.tradableAmount) ?? 0}
        batchDenom={batch?.denom ?? ''}
      />
    </FormModalTemplate>
  );
};

export { BridgeModal };
