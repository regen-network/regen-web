import { ProjectWithOrderData } from '../AllProjects.types';

export const sortProjects = (
  projects: ProjectWithOrderData[],
  sort: string,
  sortPinnedIds?: string[],
) => {
  switch (sort) {
    case 'featured-projects':
      return projects
        .sort(comparePriceAscending)
        .sort(compareCreditsAvailable)
        .sort((a, b) => sortPinnedProject(a, b, sortPinnedIds));
    case 'price-ascending':
      return projects
        ?.sort(comparePriceAscending)
        .sort(compareCreditsAvailable);
    case 'price-descending':
      return projects.sort(comparePriceDescending);
    case 'credits-ascending':
      return projects
        .sort(compareQuantityAscending)
        .sort(compareCreditsAvailable);
    case 'credits-descending':
      return projects.sort(compareQuantityDescending);
    case 'admin':
      return projects.sort(compareAdminOrder);
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

// Sort pinned project at the beginning
export function sortPinnedProject(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
  pinnedIds?: string[],
): number {
  if (!pinnedIds) return 0;

  const aIdIndex = pinnedIds?.indexOf(a.id);
  const aOffChainIdIndex = pinnedIds?.indexOf(a.offChainId ?? '');
  const aSlugIndex = pinnedIds?.indexOf(a.slug ?? '');

  let aIndex = -1;
  if (aIdIndex >= 0) {
    aIndex = aIdIndex;
  } else if (aOffChainIdIndex >= 0) {
    aIndex = aOffChainIdIndex;
  } else if (aSlugIndex >= 0) {
    aIndex = aSlugIndex;
  }

  const bIdIndex = pinnedIds?.indexOf(b.id);
  const bOffChainIdIndex = pinnedIds?.indexOf(b.offChainId ?? '');
  const bSlugIndex = pinnedIds?.indexOf(b.slug ?? '');

  let bIndex = -1;
  if (bIdIndex >= 0) {
    bIndex = bIdIndex;
  } else if (bOffChainIdIndex >= 0) {
    bIndex = bOffChainIdIndex;
  } else if (bSlugIndex >= 0) {
    bIndex = bSlugIndex;
  }

  if (aIndex >= 0 && bIndex === -1) return -1;
  if (aIndex === -1 && bIndex >= 0) return 1;
  if (aIndex >= 0 && bIndex >= 0) {
    return aIndex < bIndex ? -1 : 1;
  }

  return 0;
}

/**
 * Compares two projects based on their `adminOrder` property.
 * On chain projects by a given admin will show up first, then
 * off chain projects by the given admin, finally
 * on chain projects and off chain projects.
 *
 * @param {ProjectWithOrderData} a - The first project to compare.
 * @param {ProjectWithOrderData} b - The second project to compare.
 * @returns {number} A negative value if `a` should be sorted before `b`,
 *                   a positive value if `a` should be sorted after `b`,
 *                   or zero if they are equal.
 */
function compareAdminOrder(
  a: ProjectWithOrderData,
  b: ProjectWithOrderData,
): number {
  const aAdminOrder = a.adminOrder || 0;
  const bAdminOrder = b.adminOrder || 0;

  if (aAdminOrder > bAdminOrder) {
    return 1; // sort a after b
  }
  if (aAdminOrder < bAdminOrder) {
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
