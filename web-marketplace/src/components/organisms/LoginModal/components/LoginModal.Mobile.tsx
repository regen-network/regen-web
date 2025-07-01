'use client';

import { useEffect, useState } from 'react';
import { State, WalletModalProps, WalletStatus } from '@cosmos-kit/core';
import { useLingui } from '@lingui/react';
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
  const { _ } = useLingui();
  const onCloseModal = () => {
    setOpen(false);
  };
  const [qrState, setQRState] = useState<State>(State.Init); // state of QRCode
  const [qrMsg, setQRMsg] = useState<string>(''); // message of QRCode error
  const [connecting, setConnecting] = useState<boolean>(false);

  const current = walletRepo?.current;

  (current?.client as any)?.setActions?.({
    qrUrl: {
      state: setQRState,
      message: setQRMsg,
    },
  });

  const walletStatus = current?.walletStatus;
  const message = current?.message;

  useEffect(() => {
    if (isOpen) {
      switch (walletStatus) {
        case WalletStatus.Connecting:
          if (qrState === State.Init) {
            setConnecting(true);
          } else {
            setConnecting(false);
          }
          break;
      }
    }
  }, [qrState, walletStatus, qrMsg, message, isOpen]);

  const qrCodeUri = current?.qrUrl?.data;

  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <Box sx={{ minHeight: 400 }}>
        <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
          {connecting ? _(CONNECTING_LABEL) : qrCodeUri && _(QR_CODE_LABEL)}
        </Title>
        <Center sx={{ pt: 9, height: 340 }}>
          {connecting ? (
            <Loading />
          ) : (
            qrCodeUri && <QRCode size={300} value={qrCodeUri} />
          )}
        </Center>
      </Box>
    </Modal>
  );
};

export { LoginModalMobile };
