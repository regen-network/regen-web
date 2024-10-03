import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import SvgThemeWrapper from '../../icons/SvgThemeWrapper';
import RegionIndicatorIcon, {
  Region,
} from '../../icons/terassos/ColombiaRegionIndicatorIcon';
import ProjectFilters, { Filter, FilterOptions } from './ProjectFilters';

export default {
  title: 'Organisms/ProjectFilters',
  component: ProjectFilters,
} as Meta;

const activeFilters = ['AMAZON', 'TROPICAL_VERY_HUMID_FOREST'];

export function ComplianceBadge() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="24px"
      height="24px"
      padding="3px"
      borderRadius="50%"
      fontSize="12px"
      fontWeight={700}
      sx={{
        borderRadius: '40px',
        border: '1px dashed var(--surface-stroke, #D2D5D9)',
        background: 'var(--surface-selected-item-background, #EFEFEF)',
        ml: 2,
      }}
    >
      ha.
    </Box>
  );
}

const Template: StoryFn = args => (
  <ProjectFilters
    {...args}
    filters={args.filters}
    activeFilterIds={activeFilters}
  />
);
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
      <SvgThemeWrapper
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        color="#A5A4A4"
      />
    ),
  },
  {
    name: 'Tropical humid forest',
    id: 'TROPICAL_HUMID_FOREST',
    icon: (
      <SvgThemeWrapper
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        color="#A5A4A4"
      />
    ),
  },
  {
    name: 'Tropical dry forest',
    id: 'TROPICAL_DRY_FOREST',
    icon: (
      <SvgThemeWrapper
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        color="#A5A4A4"
      />
    ),
  },
  {
    name: 'Premontane humid forest',
    id: 'PREMONTANE_HUMID_FOREST',
    icon: (
      <SvgThemeWrapper
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        color="#A5A4A4"
      />
    ),
  },
  {
    name: 'Low montane very humid forest',
    id: 'LOW_MONTANE_VERY_HUMID_FOREST',
    icon: (
      <SvgThemeWrapper
        src="/tag/forest.svg"
        sx={ecosystemIconSx}
        color="#A5A4A4"
      />
    ),
  },
];

const regionTags: FilterOptions[] = [
  {
    name: 'Amazon',
    id: 'AMAZON',
    icon: (
      <RegionIndicatorIcon
        isSelected={activeFilters.includes('AMAZON')}
        region={'AMAZON'}
      />
    ),
  },
  {
    name: 'Pacific',
    id: 'PACIFIC',
    icon: (
      <RegionIndicatorIcon
        isSelected={activeFilters.includes('PACIFIC')}
        region="PACIFIC"
      />
    ),
  },
  {
    name: 'Orinoco',
    id: 'ORINOCO',
    icon: (
      <RegionIndicatorIcon
        isSelected={activeFilters.includes('ORINOCO')}
        region="ORINOCO"
      />
    ),
  },
  {
    name: 'Caribbean',
    id: 'CARIBBEAN',
    icon: (
      <RegionIndicatorIcon
        isSelected={activeFilters.includes('CARIBBEAN')}
        region="CARIBBEAN"
      />
    ),
  },
  {
    name: 'Andean',
    id: 'ANDEAN',
    icon: (
      <RegionIndicatorIcon
        isSelected={activeFilters.includes('ANDEAN')}
        region="ANDEAN"
      />
    ),
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
