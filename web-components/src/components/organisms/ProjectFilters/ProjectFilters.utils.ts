export const hasChangedFilters = (
  selectedFilters: Record<string, boolean>,
  initialFilters: Record<string, boolean>,
) =>
  Object.values(selectedFilters).filter(value => value).length !==
  Object.values(initialFilters).filter(value => value).length;

export const countChangedFilters = (
  selectedFilters: Record<string, boolean>,
  initialFilters: Record<string, boolean>,
) => (hasChangedFilters(selectedFilters, initialFilters) ? 1 : 0);

export const countChangedBoolFilters = (
  selectedFilter: boolean | undefined,
  initialFilter: boolean,
) => (selectedFilter !== initialFilter ? 1 : 0);
