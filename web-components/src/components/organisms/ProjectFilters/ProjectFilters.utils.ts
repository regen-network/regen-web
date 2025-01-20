export const hasChangedFilters = (
  selectedFilters: Record<string, boolean>,
  initialFilters: Record<string, boolean>,
) =>
  Object.values(selectedFilters).filter(value => value).length !==
  Object.values(initialFilters).filter(value => value).length;
