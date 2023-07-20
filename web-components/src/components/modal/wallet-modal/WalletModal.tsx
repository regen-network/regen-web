import { Box } from '@mui/system';

import Modal, { RegenModalProps } from '..';
import { WalletModalMobile } from './components/WalletModal.Mobile';
import { WalletModalSelect } from './components/WalletModal.Select';
import { Wallet, WalletModalState } from './WalletModal.types';

export interface Props extends RegenModalProps {
  state?: WalletModalState;
  wallets: Wallet[];
  qrCodeUri?: string;
  connecting: boolean;
}

const WalletModal = ({
  open,
  onClose,
  state = 'wallet-select',
  wallets,
  qrCodeUri,
  connecting,
}: Props): JSX.Element => {
  const isSelectState = state === 'wallet-select';
  const isMobileState = state === 'wallet-mobile';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        {isSelectState && <WalletModalSelect wallets={wallets} />}
        {isMobileState && (
          <WalletModalMobile qrCodeUri={qrCodeUri} connecting={connecting} />
        )}
      </Box>
    </Modal>
  );
};

export { WalletModal };
