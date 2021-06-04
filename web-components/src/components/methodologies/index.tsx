import React from 'react';
import { ResourcesCardProps } from '../cards/ResourcesCard';
import { Step } from '../cards/StepCard';
import { ProjectImpactCardProps as Impact } from '../cards/ProjectImpactCard';

export interface Methodology {
  name: string;
  id: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  documentationUrl: string;
  documentationTitle: string;
  documentationImage: string;
  documentationImageAltText?: string;
  version: string;
  program: string;
  methodologyDesigner: string;
  uncertaintyDeductions: string;
  measurementApproach: string;
  creditClassName: string;
  creditClassImage: string;
  creditClassImageAltText?: string;
  creditClassUrl: string;
  testMethodologyTitle: string;
  testMethodologyDescription: string;
  steps: Step[];
  impact: Impact[];
  resources: ResourcesCardProps[];
}

function Methodologies(): JSX.Element {
  return <>TODO</>;
}

export { Methodologies };
