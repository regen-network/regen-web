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
  const lowA = getExtreme(a, 'low');
  const highA = getExtreme(a, 'high');
  const lowB = getExtreme(b, 'low');
  const highB = getExtreme(b, 'high');

  return { highA, lowA, highB, lowB };
}

function getExtreme(
  project: ProjectWithOrderData,
  highOrLow: 'high' | 'low',
): number {
  const prices = project.purchaseInfo?.sellInfo?.pricePerTon?.split('-');
  const index = highOrLow === 'high' ? 1 : 0;
  const extreme = (prices?.[index] && parseInt(String(prices[index]))) || 0;
  return extreme;
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
