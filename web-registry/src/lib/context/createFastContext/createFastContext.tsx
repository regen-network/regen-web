import { createContext } from 'react';

import { getFastContextProvider } from './createFastContext.getProvider';
import { getUseStore } from './createFastContext.getUseStore';
import { CreateFastContextReturn } from './createFastContext.types';
import { UseStoreDataReturn } from './hooks/createFastContext.useStoreData';

export default function createFastContext<Store>(
  initialState: Store,
): CreateFastContextReturn<Store> {
  const StoreContext = createContext<UseStoreDataReturn<Store> | null>(null);
  const Provider = getFastContextProvider<Store>({
    initialState,
    StoreContext,
  });
  const useStore = getUseStore<Store>({ initialState, StoreContext });

  return {
    Provider,
    useStore,
  };
}
