import { ProjectWithOrderData } from '../Projects.types';

export const sortProjects = (
  projects: ProjectWithOrderData[],
  sort: string,
): ProjectWithOrderData[] => {
  switch (sort) {
    case 'price-ascending':
      return projects.sort(comparePriceAscending).sort(compareCreditsAvailable);
    case 'price-descending':
      return projects.sort(comparePriceDescending);
    case 'credits-ascending':
      return projects
        .sort(compareQuantityAscending)
        .sort(compareCreditsAvailable);
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
  const priceA = a.purchaseInfo?.sellInfo?.avgPricePerTon ?? 0;
  const priceB = b.purchaseInfo?.sellInfo?.avgPricePerTon ?? 0;

  if (priceA > priceB) return 1; // sort a after b
  if (priceA < priceB) return -1; // sort a before b
  return 0;
}

// High to low price
function comparePriceDescending(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const priceA = a.purchaseInfo?.sellInfo?.avgPricePerTon ?? 0;
  const priceB = b.purchaseInfo?.sellInfo?.avgPricePerTon ?? 0;

  if (priceA < priceB) return 1; // sort a after b
  if (priceA > priceB) return -1; // sort a before b
  return 0;
}

// Low to high quantity
function compareQuantityAscending(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const { aCredits, bCredits } = getQuantities(a, b);

  if (aCredits > bCredits) {
    return 1; // sort a after b
  }
  if (aCredits < bCredits) {
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

function compareCreditsAvailable(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const { aCredits, bCredits } = getQuantities(a, b);
  if (aCredits === 0) return 1;
  if (bCredits === 0) return -1;
  return 0;
}
