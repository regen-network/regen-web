import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import ConnectWallet from 'web-components/src/components/organisms/ConnectWallet';

import { Link } from 'components/atoms';
import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import {
  CONNECT_WALLET_MODAL_DESCRIPTION,
  CONNECT_WALLET_MODAL_HREF,
  CONNECT_WALLET_MODAL_LINK,
  CONNECT_WALLET_MODAL_TITLE,
} from './ConnectWalletModal.constants';

interface Props extends RegenModalProps {}

export const ConnectWalletModal = ({ open, onClose }: Props) => (
  <Modal open={open} onClose={onClose}>
    <ConnectWallet
      title={CONNECT_WALLET_MODAL_TITLE}
      description={
        <>
          {CONNECT_WALLET_MODAL_DESCRIPTION}
          <Link
            href={CONNECT_WALLET_MODAL_HREF}
            sx={{ display: 'inline-block', color: 'secondary.main' }}
          >
            {CONNECT_WALLET_MODAL_LINK}
          </Link>
        </>
      }
      button={<LoginButton size="large" />}
      variant="modal"
    />
  </Modal>
);
