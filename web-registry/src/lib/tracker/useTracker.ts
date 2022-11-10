import { useTrack } from 'use-analytics';

import { Buy2Event, LoginEvent } from './types';

interface UseTracker {
  track: (
    eventName: string,
    payload?: any | LoginEvent | Buy2Event,
    options?: any,
    callback?: (...params: any[]) => any,
  ) => Promise<any>;
}

export const useTracker = (): UseTracker => {
  const track = useTrack();
  return { track };
};
