import { Location } from 'react-router-dom';

import { ProjectWithOrderData } from 'legacy-pages/Projects/AllProjects/AllProjects.types';

import { BuyModalEvent, Track } from './types';

interface TrackBuyI {
  track: Track | undefined;
  location: Location | undefined;
  selectedProject: ProjectWithOrderData | undefined;
}

interface useBuyModalOptionsTrackerI {
  trackBuyScheduleCall: ({
    track,
    location,
    selectedProject,
  }: TrackBuyI) => void;
  trackBuyKeplr: ({ track, location, selectedProject }: TrackBuyI) => void;
}

export const useBuyModalOptionsTracker = (): useBuyModalOptionsTrackerI => {
  const trackBuyKeplr = ({
    track,
    location,
    selectedProject,
  }: TrackBuyI): void => {
    if (track && location) {
      track<BuyModalEvent>('buyKeplr', {
        url: location.pathname,
        projectId: selectedProject?.id,
        creditClassId: selectedProject?.creditClassId,
      });
    }
  };
  const trackBuyScheduleCall = ({
    track,
    location,
    selectedProject,
  }: TrackBuyI): void => {
    if (track && location) {
      track<BuyModalEvent>('buyScheduleCall', {
        url: location.pathname,
        projectId: selectedProject?.id,
        creditClassId: selectedProject?.creditClassId,
      });
    }
  };
  return {
    trackBuyKeplr,
    trackBuyScheduleCall,
  };
};
