import { useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import ConnectWallet from 'web-components/src/components/organisms/ConnectWallet';

import { Link } from 'components/atoms';
import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import {
  CONNECT_WALLET_MODAL_ACTION_DESCRIPTION,
  CONNECT_WALLET_MODAL_ACTION_TITLE,
  CONNECT_WALLET_MODAL_DESCRIPTION,
  CONNECT_WALLET_MODAL_HREF,
  CONNECT_WALLET_MODAL_LINK,
  CONNECT_WALLET_MODAL_TITLE,
} from './ConnectWalletModal.constants';

interface Props extends RegenModalProps {}

export const ConnectWalletModal = ({ open, onClose }: Props) => {
  const { _ } = useLingui();
  const location = useLocation();
  const isOnProjectBuy = /^\/project\/([A-Za-z0-9%\-_.~]+)\/buy$/.test(
    location.pathname,
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ConnectWallet
        title={
          isOnProjectBuy
            ? _(CONNECT_WALLET_MODAL_ACTION_TITLE)
            : _(CONNECT_WALLET_MODAL_TITLE)
        }
        description={
          <>
            {isOnProjectBuy && (
              <p>{_(CONNECT_WALLET_MODAL_ACTION_DESCRIPTION)}</p>
            )}
            {_(CONNECT_WALLET_MODAL_DESCRIPTION)}{' '}
            <Link
              href={CONNECT_WALLET_MODAL_HREF}
              sx={{ display: 'inline-block', color: 'secondary.main' }}
            >
              {_(CONNECT_WALLET_MODAL_LINK)}
            </Link>
          </>
        }
        button={<LoginButton size="large" onlyWallets />}
        variant="modal"
      />
    </Modal>
  );
};
