import { MutableRefObject, useEffect } from 'react';

type Props = {
  walletConnectUri?: string;
  onQrCloseCallbackRef: MutableRefObject<(() => void) | undefined>;
};

export const useWalletConnectCallback = ({
  onQrCloseCallbackRef,
  walletConnectUri,
}: Props): void => {
  useEffect(() => {
    if (!walletConnectUri && onQrCloseCallbackRef) {
      onQrCloseCallbackRef.current?.();
      onQrCloseCallbackRef.current = undefined;
    }
  }, [walletConnectUri, onQrCloseCallbackRef]);
};
