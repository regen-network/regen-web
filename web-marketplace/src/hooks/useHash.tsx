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

export const useHash = (): string => {
  const hash = useSyncExternalStore(subscribeToWindow, getHash);

  return hash;
};
