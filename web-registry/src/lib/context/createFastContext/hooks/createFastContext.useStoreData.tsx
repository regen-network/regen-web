import { useCallback, useRef } from 'react';

interface UseStoreDataParams<Store> {
  initialState: Store;
}

/* Fast Context internal data/logic */
// store all data into a ref to prevent rerenders
// subscription mecanism also store in a ref
// -> register subscribers on useStore(selector) call
// -> call all subscribers on setStore({field: value}) call
export interface UseStoreDataReturn<Store> {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void;
}

export function useStoreData<Store>({
  initialState,
}: UseStoreDataParams<Store>): UseStoreDataReturn<Store> {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach(callback => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}
