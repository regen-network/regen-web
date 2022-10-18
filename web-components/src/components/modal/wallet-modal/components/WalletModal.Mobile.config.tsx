import { Box } from '@mui/system';
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
}: getWalletModalMobileTabsParams): IconTabProps[] => [
  {
    label: 'Mobile',
    content: (
      <Center sx={{ pt: 2, flexDirection: 'column' }}>
        <Subtitle sx={{ color: 'info.dark' }}>
          {'Connect to Mobile Wallet'}
        </Subtitle>
        <Center sx={{ py: 44 }}>
          <a href={mobileConnectUrl}>
            <ContainedButton>{'Connect'}</ContainedButton>
          </a>
        </Center>
      </Center>
    ),
  },
  {
    label: 'QR Code',
    content: (
      <Box sx={{ pt: 2 }}>
        <QRCode
          size={500}
          style={{ width: '100%', height: '100%' }}
          value={uri ?? ''}
        />
      </Box>
    ),
  },
];
