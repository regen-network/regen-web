import { useEffect } from 'react';

type Props = {
  mobileConnectUrl?: string;
};

export const useNavigateToMobileUrl = ({ mobileConnectUrl }: Props): void => {
  useEffect(() => {
    if (mobileConnectUrl) {
      window.location.href = mobileConnectUrl;
    }
  }, [mobileConnectUrl]);
};
