import { Box } from '@mui/material';

import { SadBeeIcon } from 'src/components/icons/SadBeeIcon';

import { Body, Subtitle, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';
import {
  SWITCH_WALLET_WARNING_MODAL_MESSAGE,
  SWITCH_WALLET_WARNING_MODAL_TITLE,
} from './SwitchWalletWarningModal.constants';

export interface KeplrWalletConnectModalProps extends RegenModalProps {
  address: string;
}

const SwitchWalletWarningModal = ({
  open,
  address,
  onClose,
}: KeplrWalletConnectModalProps) => {
  return (
    <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
      <Box
        sx={{
          maxWidth: 460,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SadBeeIcon className="mb-20" />
        <Title align="center" variant="h4" mb={5}>
          {SWITCH_WALLET_WARNING_MODAL_TITLE}
        </Title>
        <Subtitle size="lg" className="mb-20">
          {address}
        </Subtitle>
        <Body size="lg" align="center">
          {SWITCH_WALLET_WARNING_MODAL_MESSAGE}
        </Body>
      </Box>
    </Modal>
  );
};

export { SwitchWalletWarningModal };
