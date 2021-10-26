import mock from './mock.json';

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

export const creditClasses = mock.creditClasses;
export const methodologies = mock.methodologies;
