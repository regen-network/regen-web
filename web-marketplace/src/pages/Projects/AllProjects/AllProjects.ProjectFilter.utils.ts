import {
  initialActiveFilterKeysByType,
  initialActiveFilters,
} from './AllProjects.ProjectFilterBody.TerrasosFilters';

export function getSetActiveFilters({
  filterIds,
  setMarketTypeFilters,
  setEnvironmentTypeFilters,
  setRegionFilters,
  marketTypeFilters,
  environmentTypeFilters,
  regionFilters,
}: {
  filterIds: string[];
  setMarketTypeFilters: (filters: Record<string, boolean>) => void;
  setEnvironmentTypeFilters: (filters: Record<string, boolean>) => void;
  setRegionFilters: (filters: Record<string, boolean>) => void;
  marketTypeFilters: Record<string, boolean>;
  environmentTypeFilters: Record<string, boolean>;
  regionFilters: Record<string, boolean>;
}) {
  // Group filter by type
  const newEnvironmentTypeFilterKeys: string[] = filterIds.filter(filter =>
    Object.keys(environmentTypeFilters).includes(filter),
  );
  const newRegionFilterKeys: string[] = filterIds.filter(filter =>
    Object.keys(regionFilters).includes(filter),
  );
  const newMarketTypeFilterKeys: string[] = filterIds.filter(filter =>
    Object.keys(marketTypeFilters).includes(filter),
  );
  const existingEnvironmentTypeFilterKeys = Object.keys(
    environmentTypeFilters,
  ).filter((type: string) => !newEnvironmentTypeFilterKeys.includes(type));
  const newEnvironmentTypeFilters = {
    ...Object.fromEntries(
      existingEnvironmentTypeFilterKeys.map((filter: string) => [
        filter,
        false,
      ]),
    ),
    ...Object.fromEntries(
      newEnvironmentTypeFilterKeys.map(filter => [filter, true]),
    ),
  };
  const existingRegionFilterKeys = Object.keys(regionFilters).filter(
    (type: string) => !newRegionFilterKeys.includes(type),
  );
  const newRegionFilters = {
    ...Object.fromEntries(
      existingRegionFilterKeys.map((filter: string) => [filter, false]),
    ),
    ...Object.fromEntries(newRegionFilterKeys.map(filter => [filter, true])),
  };
  const existingMarketTypeFilterKeys = Object.keys(marketTypeFilters).filter(
    (type: string) => !newMarketTypeFilterKeys.includes(type),
  );
  const newMarketTypeFilters = {
    ...Object.fromEntries(
      existingMarketTypeFilterKeys.map((filter: string) => [filter, false]),
    ),
    ...Object.fromEntries(
      newMarketTypeFilterKeys.map(filter => [filter, true]),
    ),
  };
  setEnvironmentTypeFilters(newEnvironmentTypeFilters);
  setRegionFilters(newRegionFilters);
  setMarketTypeFilters(newMarketTypeFilters);
}

export function getActiveFilterIds({
  marketTypeFilters,
  environmentTypeFilters,
  regionFilters,
}: {
  marketTypeFilters: Record<string, boolean>;
  environmentTypeFilters: Record<string, boolean>;
  regionFilters: Record<string, boolean>;
}) {
  return [
    ...Object.entries(marketTypeFilters)
      .filter(([k, v]) => v)
      .map(([k, v]) => k),
    ...Object.entries(environmentTypeFilters)
      .filter(([k, v]) => v)
      .map(([k, v]) => k),
    ...Object.entries(regionFilters)
      .filter(([k, v]) => v)
      .map(([k, v]) => k),
  ];
}

export function getResetFilters({
  setMarketTypeFilters,
  setEnvironmentTypeFilters,
  setRegionFilters,
}: {
  setMarketTypeFilters: (filters: Record<string, boolean>) => void;
  setEnvironmentTypeFilters: (filters: Record<string, boolean>) => void;
  setRegionFilters: (filters: Record<string, boolean>) => void;
}) {
  return () => {
    setMarketTypeFilters(initialActiveFilters.marketTypeFilters);
    setEnvironmentTypeFilters(initialActiveFilters.environmentTypeFilters);
    setRegionFilters(initialActiveFilters.regionFilters);
  };
}

export function getShowResetButton({
  marketTypeFilters,
  environmentTypeFilters,
  regionFilters,
}: {
  marketTypeFilters: Record<string, boolean>;
  environmentTypeFilters: Record<string, boolean>;
  regionFilters: Record<string, boolean>;
}) {
  const activeFilters = getActiveFilterIds({
    marketTypeFilters,
    environmentTypeFilters,
    regionFilters,
  });
  const initialActiveFilterIds = Object.values(
    initialActiveFilterKeysByType,
  ).flat();
  return activeFilters.length !== initialActiveFilterIds.length;
}
