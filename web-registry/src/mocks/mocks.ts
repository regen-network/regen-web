import mock from './mock.json';

// TODO Remove as part of https://github.com/regen-network/regen-registry/issues/726
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

export const methodologies = mock.methodologies;
