import { Box } from '@mui/system';

import Modal, { RegenModalProps } from '..';
import { WalletModalMobile } from './components/WalletModal.Mobile';
import { WalletModalSelect } from './components/WalletModal.Select';
import { LoginProvider, WalletModalState } from './WalletModal.types';

export interface Props extends RegenModalProps {
  state?: WalletModalState;
  wallets: LoginProvider[];
  socialProviders: LoginProvider[];
  qrCodeUri?: string;
  connecting: boolean;
}

const WalletModal = ({
  open,
  onClose,
  state = 'wallet-select',
  wallets,
  socialProviders,
  qrCodeUri,
  connecting,
}: Props): JSX.Element => {
  const isSelectState = state === 'wallet-select';
  const isMobileState = state === 'wallet-mobile';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        {isSelectState && (
          <WalletModalSelect
            wallets={wallets}
            socialProviders={socialProviders}
          />
        )}
        {isMobileState && (
          <WalletModalMobile qrCodeUri={qrCodeUri} connecting={connecting} />
        )}
      </Box>
    </Modal>
  );
};

export { WalletModal };
