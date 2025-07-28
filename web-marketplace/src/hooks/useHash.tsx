'use client';

import { useSyncExternalStore } from 'react';

const subscribeToWindow = (callback: () => void): (() => void) => {
  window.addEventListener('hashchange', callback);
  return () => {
    window.removeEventListener('hashchange', callback);
  };
};

const getHash = (): string => {
  return window.location.hash;
};

/**
 * A custom hook that returns the current hash from the URL.
 * It subscribes to the 'hashchange' event and updates the component
 * whenever the hash changes.
 *
 * @returns {string} The current hash from `window.location.hash`.
 */
export const useHash = (): string => {
  const hash = useSyncExternalStore(subscribeToWindow, getHash);

  return hash;
};
