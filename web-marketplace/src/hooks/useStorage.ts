import { useEffect, useState } from 'react';
import _ from 'lodash';

// type Params<T> = [T, React.Dispatch<T>];
interface StorageApi<T> {
  data: T | undefined;
  saveData: React.Dispatch<T>;
  removeData: () => void;
  isLoading: boolean;
}

const dispatchStorageEvent = (key: string): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('local-storage:update', { detail: { key } }),
  );
};

export default function useStorage<T>(
  key: string,
  withLocalStorage: boolean,
  initialValue?: T,
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(() => {
    if (withLocalStorage) {
      console.log('Loading data from localStorage', key)
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      } catch {
        return initialValue;
      }
    }
    return undefined;
  });

  const persist = (value: T | undefined) => {
    if (!withLocalStorage) return;
    try {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      dispatchStorageEvent(key);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  const saveData = (value: T) => {
    // persist first so it survives any immediate unmount
    persist(value);
    setData(value);
  };

  useEffect(() => {
    // finish bootstrapping
    setIsLoading(false);
  }, []);

  const removeData = (): void => {
    try {
      if (withLocalStorage) {
        localStorage.removeItem(key);
        dispatchStorageEvent(key);
      }
      setData(initialValue);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  return { data, saveData, removeData, isLoading };
}
