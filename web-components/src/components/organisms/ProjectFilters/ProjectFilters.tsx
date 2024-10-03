import { Box, Divider, FormControlLabel } from '@mui/material';
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

function TagFilter({ icon, name }: { icon: JSX.Element; name: string }) {
  return (
    <ProjectTag
      // onClick={() => console.log('clicked')}
      sx={tagSx}
      tag={{
        name,
        icon,
      }}
    />
  );
}

function CheckboxFilter({ icon, name }: { icon: JSX.Element; name: string }) {
  return (
    <FormControlLabel
      control={<Checkbox />}
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
}: {
  filters: Filter[];
  activeFilterIds: string[];
}) {
  return (
    <>
      <Title variant="h4">Filters</Title>
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
                  <TagFilter name={name} icon={icon} key={id} />
                ))}
              </Box>
            )}

            {filter.displayType === 'checkbox' && (
              <Box display="flex" flexDirection="column">
                {filter.options.map(({ name, icon, id }) => (
                  <CheckboxFilter name={name} icon={icon} key={id} />
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
