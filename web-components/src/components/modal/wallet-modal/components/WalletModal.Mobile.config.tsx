import QRCode from 'qrcode.react';

import { Center } from '../../../../components/box';
import ContainedButton from '../../../../components/buttons/ContainedButton';
import { IconTabProps } from '../../../../components/tabs/IconTab';
import { Subtitle } from '../../../../components/typography';
import { MOBILE_LABEL, QR_CODE_LABEL } from './WalletModal.Mobile.constants';

type getWalletModalMobileTabsParams = {
  mobileConnectUrl?: string;
  qrCodeUri?: string;
};

export const getWalletModalMobileTabs = ({
  mobileConnectUrl,
  qrCodeUri,
}: getWalletModalMobileTabsParams): IconTabProps[] =>
  [
    {
      label: MOBILE_LABEL,
      content: (
        <Center sx={{ pt: 9, flexDirection: 'column', height: 340 }}>
          <Subtitle sx={{ color: 'info.dark' }}>
            {'Connect to Mobile Wallet'}
          </Subtitle>
          <Center sx={{ width: 300, height: 300 }}>
            <a href={mobileConnectUrl}>
              <ContainedButton>{'Connect'}</ContainedButton>
            </a>
          </Center>
        </Center>
      ),
    },
    {
      label: QR_CODE_LABEL,
      content: (
        <Center sx={{ pt: 9, height: 340 }}>
          <QRCode size={300} value={qrCodeUri ?? ''} />
        </Center>
      ),
    },
  ].filter(item => {
    // Only show QRCode on desktop
    if (!mobileConnectUrl && item.label === MOBILE_LABEL) {
      return false;
    }
    // Only show Deeplink button on mobile
    if (mobileConnectUrl && item.label === QR_CODE_LABEL) {
      return false;
    }
    return true;
  }) as IconTabProps[];
