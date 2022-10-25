import { Center } from '../../../../components/box';
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
    <Center sx={{ minHeight: 400 }}>
      <IconTabs
        tabs={walletModalMobileTabs}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </Center>
  );
};

export { WalletModalMobile };
