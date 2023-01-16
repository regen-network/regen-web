import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import { errorModalAtom } from 'lib/atoms/modals.atoms';

export const useResetTxModalError = (): (() => void) => {
  const [, setErrorCodeAtom] = useAtom(errorCodeAtom);
  const [, setErrorModalAtom] = useAtom(errorModalAtom);
  const resetTxModalError = useCallback((): void => {
    setErrorCodeAtom('');
    setErrorModalAtom(() => ({
      title: '',
      description: '',
      cardTitle: '',
      cardItems: [],
      txError: '',
      txHash: '',
      buttonTitle: '',
      buttonLink: '',
    }));
  }, [setErrorCodeAtom, setErrorModalAtom]);

  return resetTxModalError;
};
