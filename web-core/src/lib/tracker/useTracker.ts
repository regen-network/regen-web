import { useCallback } from 'react';
import { useTrack } from 'use-analytics';

import { Track } from './types';

interface UseTracker {
  track: Track;
}

export const useTracker = (): UseTracker => {
  const track = useTrack();
  const wrapTrack = useCallback<Track>(
    (eventName, payload?) => {
      return track(eventName, payload);
    },
    [track],
  );
  return {
    track: wrapTrack,
  };
};
