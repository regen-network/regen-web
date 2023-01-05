import { ProcessingModalProps } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModalProps } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModalProps } from 'web-components/lib/components/modal/TxSuccessfulModal';

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
  } as Partial<TxErrorModalProps>,
  txSuccessfulModal: {
    cardItems: [],
    title: '',
    cardTitle: '',
  } as Partial<TxSuccessfulModalProps>,
  processingModal: { open: false } as Partial<ProcessingModalProps>,
};

export const {
  Provider: GlobalProvider,
  useStore: useGlobalStore,
  useSetStore: useGlobalSetStore,
} = createFastContext(initialState);

export type GlobalContextType = typeof initialState;
export type SetGlobalStoreType = (value: Partial<GlobalContextType>) => void;
