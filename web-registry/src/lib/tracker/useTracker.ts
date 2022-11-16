import { useTrack } from 'use-analytics';

import { Track } from './types';

interface UseTracker {
  track: Track;
}

export const useTracker = (): UseTracker => {
  const track = useTrack();
  return {
    track: <IEventName extends string, IPayload = void>(
      eventName: IEventName,
      payload?: IPayload,
    ) => {
      return track(eventName, payload);
    },
  };
};
