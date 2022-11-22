import createFastContext from './createFastContext/createFastContext';

export const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createFastContext({
    isWaitingForSigning: false,
  });
