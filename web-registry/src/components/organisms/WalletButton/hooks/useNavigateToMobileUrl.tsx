import { useEffect } from 'react';

type Props = {
  mobileConnectUrl?: string;
  txCount: number;
};

export const useNavigateToMobileUrl = ({
  mobileConnectUrl,
  txCount,
}: Props): void => {
  useEffect(() => {
    if (mobileConnectUrl) {
      window.location.href = mobileConnectUrl;
    }
  }, [mobileConnectUrl, txCount]);
};
