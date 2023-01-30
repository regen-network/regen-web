import { useCallback } from 'react';
import { useSetAtom } from 'jotai';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import { errorModalAtom } from 'lib/atoms/modals.atoms';

export const useResetTxModalError = (): (() => void) => {
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);
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
