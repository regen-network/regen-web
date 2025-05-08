import { msg } from '@lingui/macro';
import { Box } from '@mui/material';

import RegionIndicatorIcon from 'web-components/src/components/icons/terrasos/ColombiaRegionIcon';
import HectaresBadge from 'web-components/src/components/icons/terrasos/HectaresBadge';
import SvgWithSelectedColor from 'web-components/src/components/icons/utils/SvgWithSelectedColor';
import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { COMPLIANCE_MARKET, VOLUNTARY_MARKET } from './AllProjects.constants';
import { ProjectWithOrderData } from './AllProjects.types';

const ecosystemIconSx = {
  width: '30px',
  height: '30px',
  mr: 2,
};

// TODO A more viable solution would be to get those from the actual data
// once we use JSON-LD @id's for identifying ecosystem types instead of simple strings
export const ecosystemTags = [
  {
    name: msg`Tropical forest`,
    id: 'Tropical Forest',
  },
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
  {
    name: msg`Savanna`,
    id: 'Savanna',
  },
  {
    name: msg`Orinoco savanna`,
    id: 'Orinoco Savanna',
  },
];

export const filterEcosystemIds = ecosystemTags.map(({ id }) => id);

export function getEcosystemTags(
  _: TranslatorType,
  ecosystemIcons: Record<string, string>,
  ecosystemTypes: string[],
): FilterOption[] {
  return ecosystemTags
    .filter(tag => ecosystemTypes.includes(tag.id.toLowerCase()))
    .map(({ id, name }) => ({
      name: _(name),
      id: id,
      startIcon: (
        <SvgWithSelectedColor
          src={ecosystemIcons[id]}
          sx={ecosystemIconSx}
          unselectedColor="rgba(var(--sc-icon-standard-disabled))"
          selectedColor="rgba(var(--sc-icon-ecosystem-400))"
        />
      ),
    }));
}

export const regionTags = [
  {
    name: msg`Amazon`,
    id: 'Amazon',
    startIcon: <RegionIndicatorIcon region="AMAZON" />,
  },
  {
    name: msg`Pacific`,
    id: 'Pacific',
    startIcon: <RegionIndicatorIcon region="PACIFIC" />,
  },
  {
    name: msg`Orinoco`,
    id: 'Orinoco',
    startIcon: <RegionIndicatorIcon region="ORINOCO" />,
  },
  {
    name: msg`Caribbean`,
    id: 'Caribbean',
    startIcon: <RegionIndicatorIcon region="CARIBBEAN" />,
  },
  {
    name: msg`Andean`,
    id: 'Andean',
    startIcon: <RegionIndicatorIcon region="ANDEAN" />,
  },
];

export function getRegionTags(
  _: TranslatorType,
  regions: string[],
): FilterOption[] {
  return regionTags
    .filter(tag => regions.includes(tag.id.toLowerCase()))
    .map(({ name, id, startIcon }) => ({
      name: _(name),
      id,
      startIcon,
    }));
}

const marketCheckboxes = [
  {
    name: msg`Voluntary`,
    id: VOLUNTARY_MARKET,
    endIcon: (
      <Box
        component="img"
        sx={{ width: '24px' }}
        src="/svg/tebu-badge.svg"
        // eslint-disable-next-line lingui/no-unlocalized-strings
        alt="Tebu"
      />
    ),
  },
  {
    name: msg`Compliance`,
    id: COMPLIANCE_MARKET,
    endIcon: (
      <div className="w-[24px]">
        <HectaresBadge />
      </div>
    ),
  },
];

export function getMarketCheckboxes(
  _: TranslatorType,
  marketTypes: string[],
): FilterOption[] {
  return marketCheckboxes
    .filter(marketType => marketTypes.includes(marketType.id))
    .map(({ name, id, endIcon }) => ({
      name: _(name),
      id,
      endIcon,
    }));
}

export const initialActiveFilters = {
  buyingOptionsFilters: {},
  regionFilters: {},
  environmentTypeFilters: {},
  marketTypeFilters: Object.fromEntries(
    marketCheckboxes.map(({ id }) => [id, true]),
  ),
};

export const extractUniqueValues = (
  allProjects: ProjectWithOrderData[],
  key: keyof ProjectWithOrderData,
  toLowerCase: boolean,
): string[] => {
  return [
    ...new Set(
      allProjects.flatMap(
        project =>
          (toLowerCase
            ? project[key]?.map((value: string) => value.toLowerCase())
            : project[key]) || [],
      ),
    ),
  ];
};
