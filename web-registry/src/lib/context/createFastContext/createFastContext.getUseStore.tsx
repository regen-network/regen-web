/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useContext, useSyncExternalStore } from 'react';

import { UseStoreDataReturn } from './hooks/createFastContext.useStoreData';

interface GetUseStoreParams<Store> {
  StoreContext: React.Context<UseStoreDataReturn<Store> | null>;
  initialState: Store;
}

export function getUseStore<Store>({
  StoreContext,
  initialState,
}: GetUseStoreParams<Store>) {
  /* Fast Context exposed API */
  // Arg: select any field from the store, ie: (store) => store.myField
  // Response: [myField, storeSetter]
  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState),
    );

    return [state, store.set];
  }

  return useStore;
}
