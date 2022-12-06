import { Item } from 'web-components/lib/components/modal/TxModal';

import createFastContext from './createFastContext/createFastContext';

const initialState = {
  isWaitingForSigning: false,
  errorCode: '',
  errorModal: {
    title: '',
    description: '',
    txHash: '',
    txError: '',
    cardTitle: '',
    cardItems: [] as Item[],
    buttonLink: '',
    buttonTitle: '',
  },
};

export const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createFastContext(initialState);

export type GlobalContextType = typeof initialState;
export type SetGlobalStoreType = (value: Partial<GlobalContextType>) => void;
