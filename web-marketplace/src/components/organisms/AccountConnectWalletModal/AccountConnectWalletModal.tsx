import { Box } from '@mui/system';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';

import {
  AccountConnectModalState,
  LoginProvider,
} from './AccountConnectWalletModal.types';
import { LoginModalMobile } from './components/AccountConnectWalletModal.Mobile';
import { LoginModalSelect } from './components/AccountConnectWalletModal.Select';

export interface Props extends RegenModalProps {
  state?: AccountConnectModalState;
  wallets: LoginProvider[];
  qrCodeUri?: string;
  connecting: boolean;
}

const AccountConnectWalletModal = ({
  open,
  onClose,
  state = 'select',
  wallets,
  qrCodeUri,
  connecting,
}: Props): JSX.Element => {
  const isSelectState = state === 'select';
  const isMobileState = state === 'wallet-mobile';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        {isSelectState && <LoginModalSelect wallets={wallets} />}
        {isMobileState && (
          <LoginModalMobile qrCodeUri={qrCodeUri} connecting={connecting} />
        )}
      </Box>
    </Modal>
  );
};

export { AccountConnectWalletModal };
