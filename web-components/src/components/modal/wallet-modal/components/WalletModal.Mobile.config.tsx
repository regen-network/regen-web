import QRCode from 'qrcode.react';

import { Center } from '../../../../components/box';
import ContainedButton from '../../../../components/buttons/ContainedButton';
import { IconTabProps } from '../../../../components/tabs/IconTab';
import { Subtitle } from '../../../../components/typography';

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
      label: 'Mobile',
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
      label: 'Scan with the Keplr mobile app',
      content: (
        <Center sx={{ pt: 9, height: 340 }}>
          <QRCode size={300} value={qrCodeUri ?? ''} />
        </Center>
      ),
    },
  ].filter(item => {
    if (!mobileConnectUrl && item.label === 'Mobile') {
      return false;
    }
    return true;
  }) as IconTabProps[];
