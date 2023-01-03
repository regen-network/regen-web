/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useContext } from 'react';

import { UseStoreDataReturn } from './hooks/createFastContext.useStoreData';

interface GetUseStoreParams<Store> {
  StoreContext: React.Context<UseStoreDataReturn<Store> | null>;
}

export function getUseSetStore<Store>({
  StoreContext,
}: GetUseStoreParams<Store>) {
  /* Fast Context exposed API */
  // Arg: select any field from the store, ie: (store) => store.myField
  // Response: [myField, storeSetter]
  function useSetStore(): (value: Partial<Store>) => void {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }

    return store.set;
  }

  return useSetStore;
}
