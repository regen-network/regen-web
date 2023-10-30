import { Box } from '@mui/material';
import QRCode from 'qrcode.react';

import { Center } from 'web-components/lib/components/box';
import { Loading } from 'web-components/lib/components/loading';
import { Title } from 'web-components/lib/components/typography';

import { CONNECTING_LABEL, QR_CODE_LABEL } from './LoginModal.Mobile.constants';

export interface Props {
  qrCodeUri?: string;
  connecting: boolean;
}

const LoginModalMobile = ({ qrCodeUri, connecting }: Props): JSX.Element => {
  return (
    <Box sx={{ minHeight: 400 }}>
      <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
        {connecting && CONNECTING_LABEL}
        {qrCodeUri && QR_CODE_LABEL}
      </Title>
      <Center sx={{ pt: 9, height: 340 }}>
        {connecting && <Loading />}
        {qrCodeUri && <QRCode size={300} value={qrCodeUri} />}
      </Center>
    </Box>
  );
};

export { LoginModalMobile };
