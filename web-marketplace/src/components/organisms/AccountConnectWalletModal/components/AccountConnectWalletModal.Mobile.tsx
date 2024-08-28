import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import QRCode from 'qrcode.react';

import { Center } from 'web-components/src/components/box';
import { Loading } from 'web-components/src/components/loading';
import { Title } from 'web-components/src/components/typography';

import {
  CONNECTING_LABEL,
  QR_CODE_LABEL,
} from './AccountConnectWalletModal.Mobile.constants';

export interface Props {
  qrCodeUri?: string;
  connecting: boolean;
}

const LoginModalMobile = ({ qrCodeUri, connecting }: Props): JSX.Element => {
  const { _ } = useLingui();

  return (
    <Box sx={{ minHeight: 400 }}>
      <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
        {connecting && _(CONNECTING_LABEL)}
        {qrCodeUri && _(QR_CODE_LABEL)}
      </Title>
      <Center sx={{ pt: 9, height: 340 }}>
        {connecting && <Loading />}
        {qrCodeUri && <QRCode size={300} value={qrCodeUri} />}
      </Center>
    </Box>
  );
};

export { LoginModalMobile };
