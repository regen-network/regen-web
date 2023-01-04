import createFastContext from 'lib/context/createFastContext/createFastContext';

const initialState = {
  isPutModalOpen: false,
  creditBatchDenom: '',
};

export const {
  Provider: BasketDetailProvider,
  useStore: useBasketDetailStore,
  useSetStore: useBasketDetailSetStore,
} = createFastContext(initialState);

export type BasketDetailContextType = typeof initialState;
export type SetBasketDetailStoreType = (
  value: Partial<BasketDetailContextType>,
) => void;
