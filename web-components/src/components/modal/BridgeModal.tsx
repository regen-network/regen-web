import React from 'react';

import { BridgeForm, BridgeProps } from '../form/BridgeForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

interface BridgeModalProps extends RegenModalProps, BridgeProps {}

export const BRIDGE_TITLE = 'Bridge Ecocredits to Polygon';
const BRIDGE_SUBTITLE =
  'This service allows you to bridge NCT-elligible ecocredits to Polygon in the form of TCO2s.';
const TOUCAN_LOGO =
  'https://toucan.earth/_next/image?url=%2Fimg%2Ftoucan-logo.svg&w=256&q=75';
const TOUCAN_ALT = 'Toucan logo';

const BridgeModal: React.FC<BridgeModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate
    title={BRIDGE_TITLE}
    subtitle={BRIDGE_SUBTITLE}
    imgSrc={TOUCAN_LOGO}
    imgHeight={34}
    imgAlt={TOUCAN_ALT}
    open={open}
    onClose={onClose}
  >
    <BridgeForm onClose={onClose} onSubmit={onSubmit} />
  </FormModalTemplate>
);

export { BridgeModal };
