import { TRANSPARENT_PIXEL } from 'utils/image/transparentPixel';
import { computeMedianPrice } from 'utils/price/computeMedianPrice';

import { ProjectImpactCardProps } from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';

import { CreditClassByOnChainIdQuery, Maybe } from 'generated/graphql';
import { EcologicalImpact } from 'generated/sanity-graphql';
import { getSanityImgSrc } from 'lib/imgSrc';

import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { getSdgsImages } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

/* getProjectNameFromProjectsData */

export const getProjectNameFromProjectsData = (
  projectId: string,
  projects: ProjectWithOrderData[],
): string | undefined => {
  const project = projects.find(project => project.id === projectId);
  if (!project || !project.name || project.name === projectId) return;
  return project.name;
};

/* getValue */

// This can be deleted if all class metadata is updated to latest standard
export const getValue = (val: any): string => {
  let value = val;
  if (val?.['@value']) value = val['@value'];
  return value.replace(/\w+/g, (str: string) =>
    str
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  );
};

type GetCreditClassAvgPricePerTonLabelPArams = {
  projectsWithOrderData: ProjectWithOrderData[];
};

export const getCreditClassAvgPricePerTonLabel = ({
  projectsWithOrderData,
}: GetCreditClassAvgPricePerTonLabelPArams) => {
  const prices = projectsWithOrderData
    .map(project => project.purchaseInfo?.sellInfo?.avgPricePerTon)
    .filter((price): price is number => typeof price === 'number');
  const medianPrice = computeMedianPrice({ prices });
  const avgPricePerTonLabel = getPriceToDisplay({ price: medianPrice });

  return avgPricePerTonLabel;
};

/* parseCreditClassVersion  */

export const parseCreditClassVersion = (
  creditClassByOnChainId?: Maybe<
    CreditClassByOnChainIdQuery['creditClassByOnChainId']
  >,
) => {
  const creditClassVersion =
    creditClassByOnChainId?.creditClassVersionsById.nodes?.[0];
  const coBenefitsIRIs =
    creditClassVersion?.metadata?.['regen:coBenefits']?.map(
      (impact: { '@id': string }) => impact['@id'],
    ) || [];
  const primaryImpactIRI =
    creditClassVersion?.metadata?.['regen:indicator']?.['@id'];

  return {
    primaryImpactIRI,
    coBenefitsIRIs,
  };
};

/* normalizeProjectImpactCard */

export const normalizeProjectImpactCards = (
  impact: EcologicalImpact[],
): ProjectImpactCardProps[] => {
  const hasStandardLogo = impact.some(item => !!item.standard);
  const standardDefaultValue = hasStandardLogo ? TRANSPARENT_PIXEL : undefined;

  return impact.map(({ name, image, standard, sdgs }, index: number) => ({
    name,
    imgSrc: getSanityImgSrc(image),
    sdgs: getSdgsImages({ sdgs }),
    standard: getSanityImgSrc(standard, standardDefaultValue),
    monitored: index === 0,
  }));
};
