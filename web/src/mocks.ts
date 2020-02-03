import { User } from 'web-components/lib/components/user/UserInfo';
import { ItemProps as ProtectedSpeciesItem } from 'web-components/lib/components/protected-species/Item';
import { Event } from 'web-components/lib/components/timeline';

import mock from './mock.json';

// imgSrc should be either web url or static image filenames within web/src/assets/
// (eg to load web/src/assets/coorong.png, use « coorong.png » as imgSrc)

interface Action {
  name: string;
  description: string;
  imgSrc: string;
}

export interface Impact {
  name: string;
  description: string;
  imgSrc: string;
  monitored: boolean;
}

interface Metholody {
  name: string;
}

interface CreditClass {
  name: string;
  description: string;
  methodology?: Metholody;
  imgSrc: string;
}

export interface Project {
  id: string; // human-readable id for now
  name: string;
  place: string;
  type: string;
  area: number;
  areaUnit: string; // 'hectares' | 'acres';
  startDate: Date | string;
  endDate: Date | string;
  developer: User;
  steward: User;
  owner?: User;
  creditsIssuer: User;
  shortDescription: string;
  longDescription: string;
  photos: string[];
  keyOutcomesActivities: string[];
  landManagementActions: Action[];
  impact: Impact[];
  creditClass: CreditClass;
  protectedSpecies?: ProtectedSpeciesItem[];
  timeline: Event[];
  // missing: gis, documents
}

export const project = mock.projects[0];
