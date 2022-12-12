import { useCallback } from 'react';

import { SetGlobalStoreType } from 'lib/context/globalContext';

interface Props {
  setGlobalStore: SetGlobalStoreType;
}

export const useResetTxModalError = ({
  setGlobalStore,
}: Props): (() => void) => {
  const resetTxModalError = useCallback(
    (): void =>
      setGlobalStore({
        errorCode: '',
        errorModal: {
          title: '',
          description: '',
          cardTitle: '',
          cardItems: [],
          txError: '',
          txHash: '',
          buttonTitle: '',
          buttonLink: '',
        },
      }),
    [setGlobalStore],
  );

  return resetTxModalError;
};
