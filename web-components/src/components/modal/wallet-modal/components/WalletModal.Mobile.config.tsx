import QRCode from 'qrcode.react';

import { Center } from '../../../../components/box';
import ContainedButton from '../../../../components/buttons/ContainedButton';
import { IconTabProps } from '../../../../components/tabs/IconTab';
import { Subtitle } from '../../../../components/typography';

type getWalletModalMobileTabsParams = {
  mobileConnectUrl?: string;
  uri?: string;
};

export const getWalletModalMobileTabs = ({
  mobileConnectUrl,
  uri,
}: getWalletModalMobileTabsParams): IconTabProps[] =>
  [
    mobileConnectUrl
      ? {
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
        }
      : undefined,
    {
      label: 'Scan the QR code',
      content: (
        <Center sx={{ pt: 9, height: 340 }}>
          <QRCode size={300} value={uri ?? ''} />
        </Center>
      ),
    },
  ].filter(item => item !== undefined) as IconTabProps[];
