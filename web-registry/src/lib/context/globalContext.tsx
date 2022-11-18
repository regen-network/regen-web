import createFastContext from './createFastContext';

export const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createFastContext({
    txCount: 0,
  });
