import { useEffect } from 'react';

type Props = {
  mobileConnectUrl?: string;
  isWaitingForSigning: boolean;
  isConnected: boolean | null;
};

export const useNavigateToMobileUrl = ({
  mobileConnectUrl,
  isWaitingForSigning,
  isConnected,
}: Props): void => {
  useEffect(() => {
    // Effect for account login
    if (mobileConnectUrl && isConnected === false) {
      window.location.href = mobileConnectUrl;
    }
  }, [mobileConnectUrl, isConnected]);

  useEffect(() => {
    // Effect for tx signing
    if (mobileConnectUrl && isWaitingForSigning) {
      window.location.href = mobileConnectUrl;
    }
  }, [mobileConnectUrl, isWaitingForSigning]);
};
