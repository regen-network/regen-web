import { useState } from 'react';
import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import RegionIndicatorIcon from '../../icons/terrasos/ColombiaRegionIcon';
import HectaresBadge from '../../icons/terrasos/HectaresBadge';
import SvgWithSelectedColor from '../../icons/utils/SvgWithSelectedColor';
import ProjectFilters, { Filter, FilterOption } from './ProjectFilters';
import { hasChangedFilters } from './ProjectFilters.utils';

const INITIAL_FILTERS = {};
const INITIAL_MARKET_FILTERS = {
  COMPLIANCE: true,
  VOLUNTARY: true,
};
export default {
  title: 'Organisms/ProjectFilters',
  component: ProjectFilters,
} as Meta;

const Template: StoryFn = args => {
  const [regionFilters, setRegionFilters] =
    useState<Record<string, boolean>>(INITIAL_FILTERS);
  const [ecosystemFilters, setEcosystemFilters] =
    useState<Record<string, boolean>>(INITIAL_FILTERS);
  const [marketFilters, setMarketFilters] = useState<Record<string, boolean>>(
    INITIAL_MARKET_FILTERS,
  );

  return (
    <ProjectFilters
      filters={[
        {
          displayType: 'tag',
          title: 'Region',
          options: regionTags,
          selectedFilters: regionFilters,
          onFilterChange: id => {
            setRegionFilters(prev => ({ ...prev, [id]: !prev[id] }));
          },
        },
        {
          displayType: 'tag',
          title: 'Ecosystem',
          options: ecosystemTags,
          hasCollapse: true,
          selectedFilters: ecosystemFilters,
          onFilterChange: id => {
            setEcosystemFilters(prev => ({ ...prev, [id]: !prev[id] }));
          },
        },
        {
          displayType: 'checkbox',
          title: 'Market',
          options: marketCheckboxes,
          selectedFilters: marketFilters,
          onFilterChange: id => {
            setMarketFilters(prev => ({ ...prev, [id]: !prev[id] }));
          },
        },
      ]}
      showResetButton={
        hasChangedFilters(regionFilters, INITIAL_FILTERS) ||
        hasChangedFilters(ecosystemFilters, INITIAL_FILTERS) ||
        hasChangedFilters(marketFilters, INITIAL_MARKET_FILTERS)
      }
      onFilterReset={() => {
        setRegionFilters(INITIAL_FILTERS);
        setEcosystemFilters(INITIAL_FILTERS);
        setMarketFilters(INITIAL_MARKET_FILTERS);
      }}
      labels={{
        title: 'Filters',
        reset: 'Reset',
        expand: '+ See more',
        collapse: '- See less',
      }}
    />
  );
};

const ecosystemIconSx = {
  width: '30px',
  height: '30px',
  mr: 2,
};

const ecosystemTags: FilterOption[] = [
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

const regionTags: FilterOption[] = [
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
    icon: <HectaresBadge />,
  },
];

export const Default = Template.bind({});
Default.args = {};
