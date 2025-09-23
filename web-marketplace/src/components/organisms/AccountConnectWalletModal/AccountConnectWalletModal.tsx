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
  title?: string;
  description?: string;
}

const AccountConnectWalletModal = ({
  open,
  onClose,
  state = 'select',
  wallets,
  title,
  description,
}: Props): JSX.Element => {
  const isSelectState = state === 'select';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>{isSelectState && <LoginModalSelect wallets={wallets} title={title} description={description} />}</Box>
    </Modal>
  );
};

export { AccountConnectWalletModal };
