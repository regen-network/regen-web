import { useState, useEffect } from 'react';

type ReturnType<T> = [T, React.Dispatch<T>];

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): ReturnType<T> => {
  const [state, setState] = useState<T>(() => {
    // this initialization happens just once
    if (!initialValue) return;
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  }, [state, key]);

  return [state, setState];
};
