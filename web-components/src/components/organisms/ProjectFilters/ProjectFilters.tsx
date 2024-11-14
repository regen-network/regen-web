import { useState } from 'react';
import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import TagFilter from './ProjectFilter.TagFilter';
import CheckboxFilter from './ProjectFilters.CheckboxFilter';

export interface FilterOptions {
  name: string;
  icon: JSX.Element;
  id: string;
}

export interface Filter {
  title: string;
  displayType: 'tag' | 'checkbox';
  options: FilterOptions[];
  hasCollapse?: boolean;
}

export interface ProjectFilterLabels {
  title: string;
  reset: string;
  expand: string;
  collapse: string;
}

export default function ProjectFilters({
  filters,
  activeFilterIds,
  onFilterChange,
  onFilterReset,
  labels,
  showResetButton = true,
}: {
  filters: Filter[];
  activeFilterIds: string[];
  onFilterChange: (id: string) => void;
  onFilterReset: () => void;
  labels: ProjectFilterLabels;
  showResetButton?: boolean;
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});
  const handleExpand = (index: number) => {
    setIsExpanded({ ...isExpanded, [index]: !isExpanded[index] });
  };
  return (
    <>
      <div className="justify-between items-baseline flex">
        <div className="text-[18px] font-bold">{labels.title}</div>
        <div
          className="cursor-pointer text-[14px] text-sc-text-link font-bold"
          onClick={onFilterReset}
        >
          {showResetButton && labels.reset}
        </div>
      </div>
      <Divider sx={{ my: 5 }} />
      {filters.map((filter, index) => {
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
              collapsedSize={isXs ? 110 : 110}
            >
              {filter.displayType === 'tag' && (
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {filter.options.map(({ name, icon, id }) => (
                    <TagFilter
                      name={name}
                      icon={icon}
                      key={id}
                      isSelected={activeFilterIds.includes(id)}
                      onClick={() => onFilterChange(id)}
                      sx={{ fontFamily: theme => theme.typography.fontFamily }}
                    />
                  ))}
                </Box>
              )}
              {filter.displayType === 'checkbox' && (
                <div className="flex flex-column flex-wrap">
                  {filter.options.map(({ name, icon, id }) => (
                    <CheckboxFilter
                      isSelected={activeFilterIds.includes(id)}
                      name={name}
                      icon={icon}
                      key={id}
                      onChange={() => onFilterChange(id)}
                    />
                  ))}
                </div>
              )}
            </Collapse>
            {filter.hasCollapse && (
              <ButtonBase
                disableRipple
                onClick={() => handleExpand(index)}
                sx={{ fontWeight: '700' }}
                className="text-sc-text-link"
              >
                {isExpanded[index] ? labels.collapse : labels.expand}
              </ButtonBase>
            )}

            <Divider sx={{ my: 5 }} />
          </Box>
        );
      })}
    </>
  );
}
