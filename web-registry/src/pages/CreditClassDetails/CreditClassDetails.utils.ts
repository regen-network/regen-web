import { computeMedianPrice } from 'utils/price/computeMedianPrice';

import { getPriceToDisplay } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

export const getProjectNameFromProjectsData = (
  projectId: string,
  projects: ProjectWithOrderData[],
): string | undefined => {
  const project = projects.find(project => project.id === projectId);
  if (!project || !project.name || project.name === projectId) return;
  return project.name;
};

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
