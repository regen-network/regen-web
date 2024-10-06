import { useState } from 'react';
import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import RegionIndicatorIcon from '../../icons/terassos/ColombiaRegionIcon';
import ComplianceBadge from '../../icons/terassos/ComplianceBadge';
import SvgWithSelectedColor from '../../icons/utils/SvgWithSelectedColor';
import ProjectFilters, { Filter, FilterOptions } from './ProjectFilters';

export default {
  title: 'Organisms/ProjectFilters',
  component: ProjectFilters,
} as Meta;

const initialActiveFilters = [
  'AMAZON',
  'TROPICAL_VERY_HUMID_FOREST',
  'VOLUNTARY',
];



const Template: StoryFn = args => {
  const [activeFilters, setActiveFilters] =
    useState<string[]>(initialActiveFilters);
  const onFilterChange = (id: string) => {
    const newFilters = activeFilters.includes(id)
      ? activeFilters.filter(filterId => filterId !== id)
      : [...activeFilters, id];
    setActiveFilters(newFilters);
  };
  return (
    <ProjectFilters
      {...args}
      filters={args.filters}
      activeFilterIds={activeFilters}
      onFilterChange={onFilterChange}
      onFilterReset={() => setActiveFilters([])}
    />
  );
};
// add another component

const ecosystemIconSx = {
  width: '30px',
  height: '30px',
  mr: 2,
};

const ecosystemTags: FilterOptions[] = [
  {
    name: 'Tropical very humid forest',
    id: 'TROPICAL_VERY_HUMID_FOREST',
    icon: (
      <SvgWithSelectedColor
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        unselectedColor="#A5A4A4"
        selectedColor="#BD9A11"
      />
    ),
  },
  {
    name: 'Tropical humid forest',
    id: 'TROPICAL_HUMID_FOREST',
    icon: (
      <SvgWithSelectedColor
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        unselectedColor="#A5A4A4"
        selectedColor="#BD9A11"
      />
    ),
  },
  {
    name: 'Tropical dry forest',
    id: 'TROPICAL_DRY_FOREST',
    icon: (
      <SvgWithSelectedColor
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        unselectedColor="#A5A4A4"
        selectedColor="#BD9A11"
      />
    ),
  },
  {
    name: 'Premontane humid forest',
    id: 'PREMONTANE_HUMID_FOREST',
    icon: (
      <SvgWithSelectedColor
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        unselectedColor="#A5A4A4"
        selectedColor="#BD9A11"
      />
    ),
  },
  {
    name: 'Low montane very humid forest',
    id: 'LOW_MONTANE_VERY_HUMID_FOREST',
    icon: (
      <SvgWithSelectedColor
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        unselectedColor="#A5A4A4"
        selectedColor="#BD9A11"
      />
    ),
  },
];

const regionTags: FilterOptions[] = [
  {
    name: 'Amazon',
    id: 'AMAZON',
    icon: <RegionIndicatorIcon region="AMAZON" />,
  },
  {
    name: 'Pacific',
    id: 'PACIFIC',
    icon: <RegionIndicatorIcon region="PACIFIC" />,
  },
  {
    name: 'Orinoco',
    id: 'ORINOCO',
    icon: <RegionIndicatorIcon region="ORINOCO" />,
  },
  {
    name: 'Caribbean',
    id: 'CARIBBEAN',
    icon: <RegionIndicatorIcon region="CARIBBEAN" />,
  },
  {
    name: 'Andean',
    id: 'ANDEAN',
    icon: <RegionIndicatorIcon region="ANDEAN" />,
  },
];

const marketCheckboxes = [
  {
    name: 'Voluntary',
    id: 'VOLUNTARY',
    icon: (
      <Box
        component="img"
        sx={{ width: '24px', ml: 2 }}
        src="/logos/tebu-badge.png"
        alt="Tebu"
      />
    ),
  },
  {
    name: 'Compliance',
    id: 'COMPLIANCE',
    icon: <ComplianceBadge />,
  },
];

const filters: Filter[] = [
  {
    displayType: 'tag',
    title: 'Region',
    options: regionTags,
  },
  {
    displayType: 'tag',
    title: 'Ecosystem',
    options: ecosystemTags,
  },
  {
    displayType: 'checkbox',
    title: 'Market',
    options: marketCheckboxes,
  },
];

export const Default = Template.bind({});
Default.args = {
  filters: filters,
};
