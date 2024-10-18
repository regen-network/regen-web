import { useEffect, useState } from 'react';

// type Params<T> = [T, React.Dispatch<T>];
interface StorageApi<T> {
  data: T | undefined;
  saveData: React.Dispatch<T>;
  removeData: () => void;
}

export default function useStorage<T>(
  key: string,
  withLocalStorage: boolean,
  initialValue?: T,
): StorageApi<T> {
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
    if (withLocalStorage && data) {
      // TODO: if (_.isEqual(data, initialValues)) return;
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
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

  return { data, saveData, removeData };
}
