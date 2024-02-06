import { Box } from '@mui/system';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';

import {
  AccountConnectModalState,
  LoginProvider,
} from './AccountConnectWalletModal.types';
import { LoginModalSelect } from './components/AccountConnectWalletModal.Select';

export interface Props extends RegenModalProps {
  state?: AccountConnectModalState;
  wallets: LoginProvider[];
}

const AccountConnectWalletModal = ({
  open,
  onClose,
  state = 'select',
  wallets,
}: Props): JSX.Element => {
  const isSelectState = state === 'select';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>{isSelectState && <LoginModalSelect wallets={wallets} />}</Box>
    </Modal>
  );
};

export { AccountConnectWalletModal };
