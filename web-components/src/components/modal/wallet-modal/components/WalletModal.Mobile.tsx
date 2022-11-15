import { Center } from '../../../../components/box';
import { IconTabs } from '../../../../components/tabs/IconTabs';
import { getWalletModalMobileTabs } from './WalletModal.Mobile.config';

export interface Props {
  qrCodeUri?: string;
  mobileConnectUrl?: string;
}

const WalletModalMobile = ({
  qrCodeUri,
  mobileConnectUrl,
}: Props): JSX.Element => {
  const walletModalMobileTabs = getWalletModalMobileTabs({
    qrCodeUri,
    mobileConnectUrl,
  });
  return (
    <Center sx={{ minHeight: 400 }}>
      <IconTabs
        tabs={walletModalMobileTabs}
        sxs={{
          tab: {
            outer: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
        }}
      />
    </Center>
  );
};

export { WalletModalMobile };
