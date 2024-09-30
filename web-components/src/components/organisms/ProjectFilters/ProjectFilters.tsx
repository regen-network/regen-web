import { Box, Divider, FormControlLabel } from '@mui/material';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';

import { ImageType } from 'src/types/shared/imageType';

import RegionIndicatorIcon, {
  Region,
} from '../../icons/terassos/RegionIndicatorIcon';
import { ProjectTag } from '../../molecules/ProjectTag/ProjectTag';
import { Title } from '../../typography';

export interface ProjectFiltersProps {
  // Add props here
}

const regionTags: { name: string; region: Region }[] = [
  {
    name: 'Amazon',
    region: 'AMAZON',
  },
  {
    name: 'Pacific',
    region: 'PACIFIC',
  },
  {
    name: 'Orinoco',
    region: 'ORINOCO',
  },
  {
    name: 'Caribbean',
    region: 'CARIBBEAN',
  },
  {
    name: 'Andean',
    region: 'ANDEAN',
  },
];

const ecosystemTags: { name: string; icon: ImageType | JSX.Element }[] = [
  {
    name: 'Tropical very humid forest',
    icon: { src: '/tag/forest.svg' },
  },
  {
    name: 'Tropical humid forest',
    icon: { src: '/tag/forest.svg' },
  },
  {
    name: 'Tropical dry forest',
    icon: { src: '/tag/forest.svg' },
  },
  {
    name: 'Premontane humid forest',
    icon: { src: '/tag/forest.svg' },
  },
  {
    name: 'Low montane very humid forest',
    icon: { src: '/tag/forest.svg' },
  },
];

function RegionFilters() {
  return (
    <div>
      <Title variant="h5" sx={{ mb: 3 }}>
        Region
      </Title>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {regionTags.map(({ name, region }) => (
          <ProjectTag
            // onClick={() => console.log('clicked')}
            sx={{
              cursor: 'pointer',
              boxShadow:
                '0px 2px 2px 0px var(--tag-filter-outer-shadow, rgba(0, 0, 0, 0.20))',
              '&:hover': {
                filter: 'brightness(0.9)',
              },
            }}
            tag={{
              name: name,
              icon: (
                <RegionIndicatorIcon
                  region={region}
                  sx={{
                    height: '30px',
                    width: '30px',
                    mr: 1,
                  }}
                />
              ),
            }}
          />
        ))}
      </Box>
      <Divider sx={{ my: 5 }} />
    </div>
  );
}

function EcosystemFilters() {
  return (
    <div>
      <Title variant="h5" sx={{ mb: 3 }}>
        Ecosystem Type
      </Title>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {ecosystemTags.map(({ name, icon }) => (
          <ProjectTag
            // onClick={() => console.log('clicked')}
            sx={{
              cursor: 'pointer',
              // boxShadow: '0px 2px 2px 2px var(--tag-filter-outer-shadow, rgba(0, 0, 0, 0.20))';
              boxShadow:
                '0px 2px 2px 0px var(--tag-filter-outer-shadow, rgba(0, 0, 0, 0.20))',
              '&:hover': {
                filter: 'brightness(0.9)',
              },
            }}
            tag={{
              name,
              icon: icon,
            }}
          />
        ))}
      </Box>
      <Divider sx={{ my: 5 }} />
    </div>
  );
}

function ComplianceBadge() {
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

function MarketFilters() {
  return (
    <>
      <Title variant="h5" sx={{ mb: 3 }}>
        Market
      </Title>
      <Box display="flex" flexDirection="column">
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Box display="flex" alignItems="center">
              Voluntary
              <Box
                component="img"
                sx={{ width: '24px', ml: 2 }}
                src="/logos/tebu-badge.png"
                alt="Tebu"
              />
            </Box>
          }
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Box display="flex" flexWrap="nowrap">
              Compliance
              <ComplianceBadge />
            </Box>
          }
          sx={{ mb: 2 }}
        />
      </Box>
    </>
  );
}

export default function ProjectFilters({}: ProjectFiltersProps) {
  return (
    <div>
      <Title variant="h4">Filters</Title>
      <Divider sx={{ my: 5 }} />
      {/* <Title variant="h5">Region</Title>
      <Divider sx={{ my: 5 }} /> */}
      <RegionFilters />
      {/* <Title variant="h5">Ecosystem Type</Title>
      <Divider sx={{ my: 5 }} /> */}
      <EcosystemFilters />
      {/* <Title variant="h5">Market</Title> */}
      <MarketFilters />
    </div>
  );
}
