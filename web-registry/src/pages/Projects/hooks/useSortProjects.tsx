import { useEffect, useState } from 'react';

import { ProjectWithOrderData } from './useProjectsSellOrders';

type Props = {
  projects: ProjectWithOrderData[];
  sort: string;
};

export const useSortProjects = ({
  projects,
  sort,
}: Props): ProjectWithOrderData[] => {
  const [sortedProjects, setSortedProjects] =
    useState<ProjectWithOrderData[]>(projects);

  useEffect(() => {
    const projectsCopy = [...projects]; // to make sure render picks up change
    const _sortedProjects = sortProjects(projectsCopy, sort);
    setSortedProjects(_sortedProjects);
  }, [projects, sort]);

  return sortedProjects;
};

const sortProjects = (
  projects: ProjectWithOrderData[],
  sort: string,
): ProjectWithOrderData[] => {
  switch (sort) {
    case 'price-ascending':
      return projects.sort(comparePriceAscending);
    case 'price-descending':
      return projects.sort(comparePriceDescending);
    case 'credits-ascending':
      return projects.sort(compareQuantityAscending);
    case 'credits-descending':
      return projects.sort(compareQuantityDescending);
    default:
      return projects;
  }
};

// Low to high price
function comparePriceAscending(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const { lowA, lowB } = getPriceExtremes(a, b);

  if (lowA > lowB) {
    return 1; // sort a after b
  }
  if (lowA < lowB || lowA === 0) {
    return -1; // sort a before b
  }
  return 0;
}

// High to low price
function comparePriceDescending(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const { highA, highB } = getPriceExtremes(a, b);

  if (highA < highB || highA === 0) {
    return 1; // sort a after b
  }
  if (highA > highB) {
    return -1; // sort a before b
  }
  return 0;
}

// Low to high quantity
function compareQuantityAscending(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const { aCredits, bCredits } = getQuantities(a, b);

  if (aCredits > bCredits || bCredits === 0) {
    return 1; // sort a after b
  }
  if (aCredits < bCredits || aCredits === 0) {
    return -1; // sort a before b
  }
  return 0;
}

// High to low quantity
function compareQuantityDescending(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const { aCredits, bCredits } = getQuantities(a, b);

  if (aCredits < bCredits || aCredits === 0) {
    return 1; // sort a after b
  }
  if (aCredits > bCredits || bCredits === 0) {
    return -1; // sort a before b
  }
  return 0;
}

function getPriceExtremes(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): {
  highA: number;
  lowA: number;
  highB: number;
  lowB: number;
} {
  const pricesA = a.purchaseInfo?.sellInfo?.pricePerTon.split('-');
  const lowA = (pricesA?.[0] && parseInt(pricesA[0] as string)) || 0;
  const highA = (pricesA?.[1] && parseInt(pricesA[1] as string)) || 0;

  const pricesB = b.purchaseInfo?.sellInfo?.pricePerTon.split('-');
  const lowB = (pricesB?.[0] && parseInt(pricesB[0] as string)) || 0;
  const highB = (pricesB?.[1] && parseInt(pricesB[1] as string)) || 0;

  return { highA, lowA, highB, lowB };
}

function getQuantities(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): {
  aCredits: number;
  bCredits: number;
} {
  const aCredits = a.purchaseInfo?.sellInfo?.creditsAvailable || 0;
  const bCredits = b.purchaseInfo?.sellInfo?.creditsAvailable || 0;
  return { aCredits, bCredits };
}
