'use client';

// import { useEffect, useState } from 'react';
import { isAndroid, isIOS } from '@interchain-kit/core';
import { useWalletManager, WalletModalProps } from '@interchain-kit/react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { isMobile } from '@walletconnect/utils';
import { QRCodeSVG } from 'qrcode.react';

import { Center } from 'web-components/src/components/box';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { Loading } from 'web-components/src/components/loading';
import Modal from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { CONNECTING_LABEL, QR_CODE_LABEL } from './LoginModal.Mobile.constants';

export interface Props {
  qrCodeUri?: string;
}

const LoginModalMobile = ({ isOpen, close }: WalletModalProps) => {
  const { _ } = useLingui();
  const { walletConnectQRCodeUri } = useWalletManager();

  const showQrCode = Boolean(walletConnectQRCodeUri) && !isMobile();

  return (
    <Modal open={isOpen} onClose={close}>
      <div className="min-h-[400px]">
        <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
          {showQrCode ? _(QR_CODE_LABEL) : _(CONNECTING_LABEL)}
        </Title>
        <Center sx={{ pt: 9, height: 340 }}>
          {showQrCode ? (
            <QRCodeSVG size={300} value={walletConnectQRCodeUri} />
          ) : (
            <>
              <Loading />
              {walletConnectQRCodeUri && (
                <OutlinedButton
                  onClick={() => {
                    let wcUrl: string | undefined = '';
                    const encodedUri = encodeURIComponent(
                      walletConnectQRCodeUri,
                    );
                    if (isAndroid()) {
                      wcUrl = `intent://wcV2?${encodedUri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`;
                    }
                    if (isIOS()) {
                      wcUrl = `keplrwallet://wcV2?${encodedUri}`;
                    }
                    window.open(wcUrl, '_self');
                  }}
                >
                  <Trans>Open Keplr Mobile</Trans>
                </OutlinedButton>
              )}
            </>
          )}
        </Center>
      </div>
    </Modal>
  );
};

export { LoginModalMobile };
