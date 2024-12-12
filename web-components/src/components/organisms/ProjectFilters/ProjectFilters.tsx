import { useState } from 'react';
import { Box, ButtonBase, Collapse, Divider } from '@mui/material';

import TagFilter from './ProjectFilter.TagFilter';
import CheckboxFilter from './ProjectFilters.CheckboxFilter';

export interface FilterOptions {
  name: string;
  icon: JSX.Element;
  id: string;
}

export interface Filter {
  selectedFilters?: Record<string, boolean>;
  onFilterChange?: (id: string) => void;
  title: string;
  displayType: 'tag' | 'checkbox' | 'children';
  options: FilterOptions[];
  hasCollapse?: boolean;
  children?: JSX.Element;
  hidden?: boolean;
}

export interface ProjectFilterLabels {
  title: string;
  reset: string;
  expand: string;
  collapse: string;
}

export default function ProjectFilters({
  filters,
  onFilterReset,
  labels,
  showResetButton = true,
}: {
  filters: Filter[];
  onFilterReset: () => void;
  labels: ProjectFilterLabels;
  showResetButton?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});
  const handleExpand = (index: number) => {
    setIsExpanded({ ...isExpanded, [index]: !isExpanded[index] });
  };
  const displayedFilters = filters.filter(filter => !filter.hidden);
  const filtersLength = displayedFilters.length;

  return (
    <>
      <div className="justify-between items-baseline flex">
        <div className="text-[18px] font-bold">{labels.title}</div>
        {showResetButton && (
          <div
            className="cursor-pointer text-[14px] text-sc-text-link font-bold"
            onClick={onFilterReset}
          >
            {labels.reset}
          </div>
        )}
      </div>
      <Divider sx={{ my: 5 }} />
      {displayedFilters.map((filter, index) => {
        return (
          <Box sx={{ mb: 5 }} key={filter.title}>
            <div className="text-[16px] font-bold mb-[20px] ">
              {filter.title}
            </div>

            <Collapse
              in={
                // always show expanded for filter without hasCollapse
                !filter.hasCollapse || (filter.hasCollapse && isExpanded[index])
              }
              collapsedSize={filter.hasCollapse ? 105 : undefined}
            >
              {filter.displayType === 'tag' && (
                <Box display="flex" flexWrap="wrap" gap={2} className="ml-1">
                  {filter.options.map(({ name, icon, id }) => (
                    <TagFilter
                      name={name}
                      icon={icon}
                      key={id}
                      isSelected={filter.selectedFilters?.[id] ?? false}
                      onClick={() =>
                        filter.onFilterChange && filter.onFilterChange(id)
                      }
                      sx={{ fontFamily: theme => theme.typography.fontFamily }}
                    />
                  ))}
                </Box>
              )}
              {filter.displayType === 'checkbox' && (
                <div className="flex flex-col">
                  {filter.options.map(({ name, icon, id }) => (
                    <CheckboxFilter
                      isSelected={filter.selectedFilters?.[id] ?? false}
                      name={name}
                      icon={icon}
                      key={id}
                      onChange={() =>
                        filter.onFilterChange && filter.onFilterChange(id)
                      }
                    />
                  ))}
                </div>
              )}
              {filter.displayType === 'children' && filter.children}
            </Collapse>
            {filter.hasCollapse && (
              <ButtonBase
                disableRipple
                onClick={() => handleExpand(index)}
                sx={{ fontWeight: '700' }}
                className="text-sc-text-link uppercase"
              >
                {isExpanded[index] ? labels.collapse : labels.expand}
              </ButtonBase>
            )}
            {index !== filtersLength - 1 && <Divider sx={{ my: 5 }} />}
          </Box>
        );
      })}
    </>
  );
}
