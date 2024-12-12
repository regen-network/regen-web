export const hasChangedFilters = (
  selectedFilters: Record<string, boolean>,
  initialFilters: Record<string, boolean>,
) =>
  Object.entries(selectedFilters).filter(([_, value]) => value).length !==
  Object.entries(initialFilters).filter(([_, value]) => value).length;
