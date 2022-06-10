import { useState, useEffect } from 'react';

type ReturnType<T> = [T, React.Dispatch<T>];

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): ReturnType<T> {
  const [state, setState] = useState<T>(() => {
    // this way, as a fn, this initialization happens just once
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

  // TODO: Remove data (key/value)

  return [state, setState];
}
