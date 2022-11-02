import React from 'react';

import { BridgeForm, BridgeProps } from '../form/BridgeForm';
import { ToucanIcon } from '../icons/ToucanIcon';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BridgeModalProps extends RegenModalProps, BridgeProps {}

export const BRIDGE_TITLE = 'Bridge Ecocredits to Polygon';
const BRIDGE_SUBTITLE =
  'This service allows you to bridge NCT-eligible ecocredits to Polygon in the form of TCO2s.';

const BridgeModal = ({
  availableBridgeableAmount,
  batchDenom,
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
      availableBridgeableAmount={availableBridgeableAmount}
      batchDenom={batchDenom}
    />
  </FormModalTemplate>
);

export { BridgeModal };
