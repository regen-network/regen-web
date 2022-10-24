import React from 'react';

import { BridgeForm, BridgeProps } from '../form/BridgeForm';
import { Image } from '../image';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BridgeModalProps extends RegenModalProps, BridgeProps {}

export const BRIDGE_TITLE = 'Bridge Ecocredits to Polygon';
export const BRIDGE_SUBTITLE =
  'This service allows you to bridge NCT-elligible ecocredits to Polyon in the form of TCO2s.';

const BridgeModal: React.FC<BridgeModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate
    title={BRIDGE_TITLE}
    subtitle={BRIDGE_SUBTITLE}
    open={open}
    onClose={onClose}
  >
    <Image
      height={34}
      src="https://toucan.earth/_next/image?url=%2Fimg%2Ftoucan-logo.svg&w=256&q=75"
    />
    <BridgeForm onClose={onClose} onSubmit={onSubmit} />
  </FormModalTemplate>
);

export { BridgeModal };
