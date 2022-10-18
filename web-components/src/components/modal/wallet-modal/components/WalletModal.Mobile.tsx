import { Box } from '@mui/system';

import { IconTabs } from '../../../../components/tabs/IconTabs';
import { getWalletModalMobileTabs } from './WalletModal.Mobile.config';

export interface Props {
  uri?: string;
  mobileConnectUrl?: string;
}

const WalletModalMobile = ({ uri, mobileConnectUrl }: Props): JSX.Element => {
  const walletModalMobileTabs = getWalletModalMobileTabs({
    uri,
    mobileConnectUrl,
  });
  return (
    <Box sx={{ minHeight: 530 }}>
      <IconTabs tabs={walletModalMobileTabs} />
    </Box>
  );
};

export { WalletModalMobile };
