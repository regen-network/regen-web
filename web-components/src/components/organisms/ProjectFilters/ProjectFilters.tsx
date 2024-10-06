import React, { cloneElement } from 'react';
import { Trans } from '@lingui/macro';
import { Box, ButtonBase, Divider, FormControlLabel } from '@mui/material';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';

import { ProjectTag } from '../../molecules/ProjectTag/ProjectTag';
import { Title } from '../../typography';

export interface ProjectFiltersProps {
  // Add props here
}

const tagSx = {
  cursor: 'pointer',
  boxShadow:
    '0px 2px 2px 0px var(--tag-filter-outer-shadow, rgba(0, 0, 0, 0.20))',
  '&:hover': {
    filter: 'brightness(0.9)',
  },
};

interface TagFilterProps {
  icon: JSX.Element;
  name: string;
  isSelected: boolean;
  onClick?: () => void;
}

function TagFilter({ icon, name, isSelected, onClick }: TagFilterProps) {
  // add isSelected prop to icon
  const iconWithProps = cloneElement(icon, { isSelected });
  return (
    <ProjectTag
      sx={tagSx}
      tag={{
        name,
        icon: iconWithProps,
      }}
      onClick={onClick}
    />
  );
}

function CheckboxFilter({
  icon,
  name,
  isSelected,
  onChange,
}: {
  icon: JSX.Element;
  name: string;
  isSelected: boolean;
  onChange?: () => void;
}) {
  return (
    <FormControlLabel
      control={<Checkbox checked={isSelected} onChange={onChange} />}
      label={
        <Box display="flex" flexWrap="nowrap" alignItems="center">
          {name}
          {icon}
        </Box>
      }
      sx={{ mb: 2 }}
    />
  );
}

export interface FilterOptions {
  name: string;
  icon: JSX.Element;
  id: string;
}

export interface Filter {
  title: string;
  displayType: 'tag' | 'checkbox';
  options: FilterOptions[];
}

export default function ProjectFilters({
  filters,
  activeFilterIds,
  onFilterChange,
}: {
  filters: Filter[];
  activeFilterIds: string[];
  onFilterChange: (id: string) => void;
}) {
  return (
    <>
      <Title variant="h4">
        <Trans>Filters</Trans>
      </Title>
      <Divider sx={{ my: 5 }} />
      {filters.map(filter => {
        return (
          <Box sx={{ mb: 5 }} key={filter.title}>
            <Title variant="h5" sx={{ mb: 5 }}>
              {filter.title}
            </Title>
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
            <Divider sx={{ my: 5 }} />
          </Box>
        );
      })}
    </>
  );
}
