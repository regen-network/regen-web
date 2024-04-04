import { atomWithStorage } from 'jotai/utils';

type ProjectsBannerCard = {
  [projectId: string]: boolean;
};

export const projectsBannerCardAtom = atomWithStorage(
  'projectsBannerCard',
  {} as ProjectsBannerCard,
);
