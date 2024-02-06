import { WalletModalProps } from '@cosmos-kit/core';
import { Box } from '@mui/material';
import QRCode from 'qrcode.react';

import { Center } from 'web-components/src/components/box';
import { Loading } from 'web-components/src/components/loading';
import Modal from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { CONNECTING_LABEL, QR_CODE_LABEL } from './LoginModal.Mobile.constants';

export interface Props {
  qrCodeUri?: string;
}

const LoginModalMobile = ({
  isOpen,
  setOpen,
  walletRepo,
}: WalletModalProps) => {
  const onCloseModal = () => {
    setOpen(false);
  };
  const wallet = walletRepo?.wallets[0];
  const qrCodeUri = wallet?.qrUrl?.data;
  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <Box sx={{ minHeight: 400 }}>
        <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
          {qrCodeUri ? QR_CODE_LABEL : CONNECTING_LABEL}
        </Title>
        <Center sx={{ pt: 9, height: 340 }}>
          {qrCodeUri ? <QRCode size={300} value={qrCodeUri} /> : <Loading />}
        </Center>
      </Box>
    </Modal>
  );
};

export { LoginModalMobile };
