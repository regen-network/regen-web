import { useEffect, useState } from 'react';
import _ from 'lodash';

// type Params<T> = [T, React.Dispatch<T>];
interface StorageApi<T> {
  data: T | undefined;
  saveData: React.Dispatch<T>;
  removeData: () => void;
  isLoading: boolean;
}

export default function useStorage<T>(
  key: string,
  withLocalStorage: boolean,
  initialValue?: T,
): StorageApi<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, saveData] = useState<T | undefined>(() => {
    // this way, as a fn, this initialization happens just once
    if (withLocalStorage) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      } catch (err) {
        return initialValue;
      }
    } else return undefined;
  });

  useEffect(() => {
    setIsLoading(false);
    if (withLocalStorage && data) {
      const storedValue = localStorage.getItem(key);
      const currentValue = storedValue ? JSON.parse(storedValue) : {};
      if (!_.isEqual(data, currentValue)) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }
  }, [data, key, withLocalStorage]);

  // TODO: Remove data (key/value)
  const removeData = (): void => {
    try {
      if (withLocalStorage) localStorage.removeItem(key);
      // reset state to initial values
      saveData(initialValue);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return { data, saveData, removeData, isLoading };
}
