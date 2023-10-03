import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

import OutlinedButton from 'src/components/buttons/OutlinedButton';
import WalletErrorIcon from 'src/components/icons/WalletErrorIcon';

import { Body, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';
import {
  KEPLR_WALLET_CONNECT_SUBTITLE,
  KEPLR_WALLET_CONNECT_TITLE,
} from './KeplrWalletConnectModal.constants';

export interface KeplrWalletConnectModalProps extends RegenModalProps {
  helpLink: JSX.Element;
  button: JSX.Element;
}

const KeplrWalletConnectModal = ({
  open,
  helpLink,
  button,
  onClose,
}: KeplrWalletConnectModalProps) => (
  <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
    <Box
      sx={{
        maxWidth: 460,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <WalletErrorIcon
        sx={{
          fontSize: 100,
          mb: 5,
        }}
      />
      <Title align="center" variant="h4" mb={5}>
        {KEPLR_WALLET_CONNECT_TITLE}
      </Title>
      <Body size="lg" align="center">
        {KEPLR_WALLET_CONNECT_SUBTITLE}
      </Body>
      {helpLink}
      {button}
    </Box>
  </Modal>
);

export { KeplrWalletConnectModal };
