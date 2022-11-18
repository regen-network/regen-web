import createFastContext from './createFastContext';

export const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createFastContext({
    isWaitingForSigning: false,
  });
