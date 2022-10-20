import { MutableRefObject, useEffect } from 'react';

type Props = {
  walletConnectUri?: string;
  onQrCloseCallback: MutableRefObject<(() => void) | undefined>;
};

export const useWalletConnectCallback = ({
  onQrCloseCallback,
  walletConnectUri,
}: Props): void => {
  useEffect(() => {
    if (!walletConnectUri && onQrCloseCallback) {
      onQrCloseCallback.current?.();
      onQrCloseCallback.current = undefined;
    }
  }, [walletConnectUri, onQrCloseCallback]);
};
