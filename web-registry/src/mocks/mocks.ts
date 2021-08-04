import { User } from 'web-components/lib/components/user/UserInfo';
import { Place } from 'web-components/lib/components/place/ProjectPlaceInfo';
import { ItemProps as ProtectedSpeciesItem } from 'web-components/lib/components/sliders/Item';
import { Media } from 'web-components/lib/components/sliders/ProjectMedia';
import { ActionProps } from 'web-components/lib/components/action';
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';
import { SDG } from 'web-components/lib/components/cards/ProjectTopCard';

import mock from './mock.json';

// imgSrc should be either web url or static image filenames within web/src/assets/
// (eg to load web/src/assets/coorong.jpg, use "coorong.jpg" as imgSrc)

export interface Impact {
  name: string;
  description: string;
  monitored: boolean;
  imgSrc: string;
}

export interface ActionGroup {
  title?: string;
  actions: ActionProps[];
}

export interface CreditClass {
  id: string;
  version: string;
  creditDesigner: string;
  ecoType: string;
  ecoServiceType: string;
  approvedMethodology: string;
  methodologyUrl: string;
  methodologyId: string;
  imgSrc: string;
}

export interface Methodology {
  id: string;
  imageSrc: string;
  version: string;
  program: string;
  methodologyDesigner: string;
  uncertaintyDeductions: string;
  measurementApproach: string;
  creditClassName: string;
  creditClassImage: string;
  creditClassImageAltText: string;
  creditClassUrl: string;
}

export interface Project {
  id: string; // human-readable id for now
  name: string;
  place: Place;
  type: string;
  area: number;
  areaUnit: string;
  developer?: User;
  steward?: User;
  owner?: User;
  broker?: User;
  shortDescription: string;
  glanceText?: string[];
  glanceImgSrc?: string;
  longDescription: string;
  media: Media[];
  image: string;
  map: string;
  keyOutcomesActivities: string[];
  landManagementActions?: ActionGroup[];
  impact: Impact[];
  creditClass: BasicCreditClass;
  methodology: ProjectMethodology;
  protectedSpecies?: ProtectedSpeciesItem[];
  fieldsOverride?: ProjectOverride;
  credits?: {
    purchased: number;
    issued: number; // total number of issued credits
  };
  creditPrice?: CreditPrice;
  presaleUrl?: string;
  hideCreditDetails?: boolean;
  stripePrice?: string;
  tagline?: string;
  quote?: {
    text: string;
    person: {
      name: string;
      role: string;
    };
  };
  sdgs?: SDG[];
}

interface BasicProject {
  id: string;
  name: string;
}

export interface BasicCreditClass {
  name: string;
  id: string;
  description: string;
  imgSrc?: string;
  pdfUrl?: string;
  tag?: string;
}

interface Purchase {
  total: number;
  date: Date | string;
}
export interface PurchasedCredits {
  userId: string;
  project: BasicProject;
  currentPurchase: Purchase;
  totalPurchased: number;
  totalAvailable: number;
}

interface ProjectDefaultFields {
  title: string;
  subtitle?: string;
}

export interface ProjectDefault {
  story: ProjectDefaultFields;
  monitoredImpact: ProjectDefaultFields;
  nonMonitoredImpact: ProjectDefaultFields;
  protectedSpecies: ProjectDefaultFields;
  landManagementActions: ProjectDefaultFields;
  keyOutcomesActivities: ProjectDefaultFields;
  timeline: ProjectDefaultFields;
}

export interface ProjectOverride {
  story?: ProjectDefaultFields;
  monitoredImpact?: ProjectDefaultFields;
  nonMonitoredImpact?: ProjectDefaultFields;
  protectedSpecies?: ProjectDefaultFields;
  landManagementActions?: ProjectDefaultFields;
  keyOutcomesActivities?: ProjectDefaultFields;
  timeline?: ProjectDefaultFields;
}

export interface ProjectMethodology {
  name: string;
  id: string;
  pdfUrl?: string;
}

export interface Mock {
  creditsIssuer: User;
  projects: Project[];
  projectDefault: ProjectDefault;
  purchasedCredits: PurchasedCredits[];
}

export const creditsIssuer: User = mock.creditsIssuer;
export const purchasedCredits: PurchasedCredits[] = mock.purchasedCredits;
export const projects: Project[] = mock.projects;
export const projectDefault: ProjectDefault = mock.projectDefault;
export const creditClasses = mock.creditClasses;
export const methodologies = mock.methodologies;
