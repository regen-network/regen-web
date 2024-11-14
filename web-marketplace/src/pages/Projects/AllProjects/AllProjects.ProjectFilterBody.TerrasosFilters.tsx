// import RegionIndicatorIcon from '../../icons/terrasos/ColombiaRegionIcon';
import { msg } from '@lingui/macro';
import { Box } from '@mui/material';

import RegionIndicatorIcon from 'web-components/src/components/icons/terrasos/ColombiaRegionIcon';
import HectaresBadge from 'web-components/src/components/icons/terrasos/HectaresBadge';
import SvgWithSelectedColor from 'web-components/src/components/icons/utils/SvgWithSelectedColor';
import {
  Filter,
  FilterOptions,
} from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { TranslatorType } from 'lib/i18n/i18n.types';

const ecosystemIconSx = {
  width: '30px',
  height: '30px',
  mr: 2,
};

// TODO A more viable solution would be to get those from the actual data
const ecosystemTags = [
  {
    name: msg`Tropical very humid forest`,
    id: 'Tropical Very Humid Forest',
  },
  {
    name: msg`Tropical humid forest`,
    id: 'Tropical Humid Forest',
  },
  {
    name: msg`Tropical dry forest`,
    id: 'Tropical Dry Forest',
  },
  {
    name: msg`Premontane humid forest`,
    id: 'Premontane Humid Forest',
  },
  {
    name: msg`Low montane very humid forest`,
    id: 'Low Montane Very Humid Forest',
  },
  {
    name: msg`Orinoco savannah`,
    id: 'Orinoco Savannah',
  },
  {
    name: msg`Riparian forest`,
    id: 'Riparian Forest',
  },
  {
    name: msg`High andean forest`,
    id: 'High Andean Forest',
  },
];

export const filterEcosystemIds = ecosystemTags.map(({ id }) => id);

export function getEcosystemTags(
  _: TranslatorType,
  ecosystemIcons: Record<string, string>,
): FilterOptions[] {
  return ecosystemTags.map(({ id, name }) => ({
    name: _(name),
    id: id,
    icon: (
      <SvgWithSelectedColor
        src={ecosystemIcons[id]}
        sx={ecosystemIconSx}
        unselectedColor="rgba(var(--sc-icon-standard-disabled))"
        selectedColor="rgba(var(--sc-icon-ecosystem-400))"
      />
    ),
  }));
}

const regionTags = [
  {
    name: msg`Amazon`,
    id: 'Amazon',
    icon: <RegionIndicatorIcon region="AMAZON" />,
  },
  {
    name: msg`Pacific`,
    id: 'Pacific',
    icon: <RegionIndicatorIcon region="PACIFIC" />,
  },
  {
    name: msg`Orinoco`,
    id: 'Orinoco',
    icon: <RegionIndicatorIcon region="ORINOCO" />,
  },
  {
    name: msg`Caribbean`,
    id: 'Carribean',
    icon: <RegionIndicatorIcon region="CARIBBEAN" />,
  },
  {
    name: msg`Andean`,
    id: 'Andean',
    icon: <RegionIndicatorIcon region="ANDEAN" />,
  },
];

export function getRegionTags(_: TranslatorType): FilterOptions[] {
  return regionTags.map(({ name, id, icon }) => ({
    name: _(name),
    id: id,
    icon: icon,
  }));
}

const marketCheckboxes = [
  {
    name: msg`Voluntary`,
    id: 'VOLUNTARY_MARKET',
    icon: (
      <Box
        component="img"
        sx={{ width: '24px', ml: 2 }}
        src="/svg/tebu-badge.svg"
        // eslint-disable-next-line lingui/no-unlocalized-strings
        alt="Tebu"
      />
    ),
  },
  {
    name: msg`Compliance`,
    id: 'COMPLIANCE_MARKET',
    icon: (
      <div className="ml-[8px] w-[24px]">
        <HectaresBadge />
      </div>
    ),
  },
];

function getMarketCheckboxes(_: TranslatorType): FilterOptions[] {
  return marketCheckboxes.map(({ name, id, icon }) => ({
    name: _(name),
    id: id,
    icon: icon,
  }));
}

export const initialActiveFilterKeysByType = {
  regionFilters: regionTags.map(({ id }) => id),
  environmentTypeFilters: ecosystemTags.map(({ id }) => id),
  marketTypeFilters: marketCheckboxes.map(({ id }) => id),
};

export const initialActiveFilters = {
  regionFilters: Object.fromEntries(regionTags.map(({ id }) => [id, true])),
  environmentTypeFilters: Object.fromEntries(
    ecosystemTags.map(({ id }) => [id, true]),
  ),
  marketTypeFilters: Object.fromEntries(
    marketCheckboxes.map(({ id }) => [id, true]),
  ),
};

export function getFilters(
  _: TranslatorType,
  ecosystemIcons: Record<string, string>,
): Filter[] {
  return [
    {
      displayType: 'tag',
      title: _(msg`Region`),
      options: getRegionTags(_),
    },
    {
      displayType: 'tag',
      title: _(msg`Ecosystem`),
      options: getEcosystemTags(_, ecosystemIcons),
      hasCollapse: true,
    },
    {
      displayType: 'checkbox',
      title: _(msg`Market`),
      options: getMarketCheckboxes(_),
    },
  ];
}
