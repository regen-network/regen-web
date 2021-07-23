import { User } from 'web-components/lib/components/user/UserInfo';
import { Place } from 'web-components/lib/components/place/ProjectPlaceInfo';
import { ItemProps as ProtectedSpeciesItem } from 'web-components/lib/components/sliders/Item';
import { Media } from 'web-components/lib/components/sliders/ProjectMedia';
import { ActionProps } from 'web-components/lib/components/action';
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';
import { SDG } from 'web-components/lib/components/cards/ProjectTopCard';

import { Resource, FAQ, HeroSection } from './cms-duplicates';
import mock from './mock.json';

// imgSrc should be either web url or static image filenames within web/src/assets/
// (eg to load web/src/assets/coorong.jpg, use "coorong.jpg" as imgSrc)

export interface ActionGroup {
  title?: string;
  actions: ActionProps[];
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
  basicCreditClasses: BasicCreditClass[];
  purchasedCredits: PurchasedCredits[];
}

export interface CreditClass {
  name: string;
  id: string;
  version: string;
  creditDesigner: string;
  ecoType: string;
  ecoServiceType: string;
  approvedMethodology: string;
  methodologyUrl: string;
  methodologyId: string;
  description: string;
  imgSrc: string;
  overviewCards: OverviewCard[];
  buyer: Buyer;
  landSteward: LandSteward;
  impact: Impact[];
  sdgs: Sdg[];
}

export interface Buyer {
  heroSection: HeroSection;
  projectsTitle: string;
  resources: Resource[];
  videos: Article[];
}

export interface Article {
  title: string;
  date: string;
  author: string;
  imgSrc: string;
  url: string;
  btnText: string;
  type: string;
}

export interface Impact {
  name: string;
  description: string;
  monitored: boolean;
  imgSrc: string;
}

export interface LandSteward {
  ctaHref: string;
  heroSection: HeroSection;
  featuredProjectIds: string[];
  connectSection: ConnectSection;
  resources: Resource[];
  videos: Article[];
  steps: LandStewardStep[];
}

export interface ConnectSection {
  header: string;
  links: Link[];
}

export interface Link {
  name: string;
  description: string;
  icon: string;
  href: string;
}

export interface LandStewardStep {
  title: string;
  steps: StepStep[];
  preTitle?: string;
  description?: string;
}

export interface StepStep {
  stepNumber: number;
  title: string;
  icon: string;
  isActive: boolean;
  description: string;
  tagName: string;
  btnText?: string;
  href?: string;
  videoSrc?: string;
}

export interface OverviewCard {
  title: string;
  description: string;
  icon: string;
}

export interface Sdg {
  imageUrl: string;
  title: string;
}

export interface Methodology {
  name: string;
  id: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  documentationUrl: string;
  documentationTitle: string;
  documentationImage: string;
  documentationImageAltText: string;
  version: string;
  program: string;
  methodologyDesigner: string;
  uncertaintyDeductions: string;
  measurementApproach: string;
  creditClassName: string;
  creditClassImage: string;
  creditClassImageAltText: string;
  creditClassUrl: string;
  testMethodologyTitle: string;
  testMethodologyDescription: string;
  steps: MethodologyStep[];
  impact: Impact[];
  resources: Resource[];
}

export interface MethodologyStep {
  stepNumber: number;
  title: string;
  isActive: boolean;
  description: string;
  imageSrc: string;
  imageAlt: string;
  faqs: FAQ[];
}

export const creditsIssuer: User = mock.creditsIssuer;
export const purchasedCredits: PurchasedCredits[] = mock.purchasedCredits;
export const projects: Project[] = mock.projects;
export const projectDefault: ProjectDefault = mock.projectDefault;
export const basicCreditClasses: BasicCreditClass[] = mock.basicCreditClasses;
export const creditClasses: CreditClass[] = mock.creditClasses;
export const methodologies: Methodology[] = mock.methodologies;
