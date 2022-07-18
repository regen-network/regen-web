import { useState, useEffect } from 'react';

// type ReturnType<T> = [T, React.Dispatch<T>];
interface StorageApi<T> {
  data: T | undefined;
  saveData: React.Dispatch<T>;
  removeData: () => void;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): StorageApi<T> {
  const [data, saveData] = useState<T | undefined>(() => {
    // this way, as a fn, this initialization happens just once
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (data) {
      // TODO: if (_.isEqual(data, initialValues)) return;
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  }, [data, key]);

  // TODO: Remove data (key/value)
  const removeData = (): void => {
    try {
      localStorage.removeItem(key);
      // reset state to initial values
      saveData(initialValue);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return { data, saveData, removeData };
}
