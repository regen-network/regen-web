import { useState } from 'react';
import { Trans } from '@lingui/macro';
import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Subtitle, Title } from '../../typography';
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

export default function ProjectFilters({
  filters,
  activeFilterIds,
  onFilterChange,
  onFilterReset,
}: {
  filters: Filter[];
  activeFilterIds: string[];
  onFilterChange: (id: string) => void;
  onFilterReset: () => void;
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});
  const handleExpand = (index: number) => {
    setIsExpanded({ ...isExpanded, [index]: !isExpanded[index] });
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Title variant="h4">
          <Trans>Filters</Trans>
        </Title>
        <Subtitle onClick={onFilterReset} sx={{ cursor: 'pointer' }}>
          <Trans>Reset filters</Trans>
        </Subtitle>
      </Box>
      <Divider sx={{ my: 5 }} />
      {filters.map((filter, index) => {
        return (
          <Box sx={{ mb: 5 }} key={filter.title}>
            <Title variant="h5" sx={{ mb: 5 }}>
              {filter.title}
            </Title>

            <Collapse
              in={
                // always show expanded for filter without hasCollapse
                !filter.hasCollapse || (filter.hasCollapse && isExpanded[index])
              }
              collapsedSize={isXs ? 110 : 130}
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
                    />
                  ))}
                </Box>
              )}
              {filter.displayType === 'checkbox' && (
                <Box display="flex" flexDirection="column">
                  {filter.options.map(({ name, icon, id }) => (
                    <CheckboxFilter
                      isSelected={activeFilterIds.includes(id)}
                      name={name}
                      icon={icon}
                      key={id}
                      onChange={() => onFilterChange(id)}
                    />
                  ))}
                </Box>
              )}
            </Collapse>
            {filter.hasCollapse && (
              <ButtonBase
                disableRipple
                onClick={() => handleExpand(index)}
                sx={{ fontWeight: '700' }}
              >
                {isExpanded[index] ? (
                  <Trans>- See Less</Trans>
                ) : (
                  <Trans>+ See More</Trans>
                )}
              </ButtonBase>
            )}

            <Divider sx={{ my: 5 }} />
          </Box>
        );
      })}
    </>
  );
}
