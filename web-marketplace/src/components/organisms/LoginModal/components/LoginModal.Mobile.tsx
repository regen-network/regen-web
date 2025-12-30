'use client';

// import { useEffect, useState } from 'react';
import { useWalletManager, WalletModalProps } from '@interchain-kit/react';
import { useLingui } from '@lingui/react';
import { QRCodeSVG } from 'qrcode.react';

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
  close,
}: // wallets,
// currentWallet,
WalletModalProps) => {
  const { _ } = useLingui();
  const { walletConnectQRCodeUri } = useWalletManager();

  // console.log('walletConnectQRCodeUri', walletConnectQRCodeUri);
  // const onCloseModal = () => {
  //   setOpen(false);
  // };
  // const [qrState, setQRState] = useState<State>(State.Init); // state of QRCode
  // const [qrMsg, setQRMsg] = useState<string>(''); // message of QRCode error
  // const [connecting, setConnecting] = useState<boolean>(false);

  // const current = walletRepo?.current;

  // (current?.client as any)?.setActions?.({
  //   qrUrl: {
  //     state: setQRState,
  //     message: setQRMsg,
  //   },
  // });

  // const walletStatus = current?.walletStatus;
  // const message = current?.message;

  // useEffect(() => {
  //   if (isOpen) {
  //     switch (walletStatus) {
  //       case WalletStatus.Connecting:
  //         if (qrState === State.Init) {
  //           setConnecting(true);
  //         } else {
  //           setConnecting(false);
  //         }
  //         break;
  //     }
  //   }
  // }, [qrState, walletStatus, qrMsg, message, isOpen]);

  // const qrCodeUri = current?.qrUrl?.data;

  return (
    <Modal open={isOpen} onClose={close}>
      <div className="min-h-[400px]">
        <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
          {walletConnectQRCodeUri ? _(QR_CODE_LABEL) : _(CONNECTING_LABEL)}
        </Title>
        <Center sx={{ pt: 9, height: 340 }}>
          {walletConnectQRCodeUri ? (
            <QRCodeSVG size={300} value={walletConnectQRCodeUri} />
          ) : (
            <Loading />
          )}
        </Center>
      </div>
    </Modal>
  );
};

export { LoginModalMobile };
