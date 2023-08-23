import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import ProjectImpactCard, {
  ProjectImpactCardProps,
} from '../../cards/ProjectImpactCard/ProjectImpactCard';
import { ProjectTagType } from '../../molecules/ProjectTag/ProjectTag.types';
import { CollapseList } from '../../organisms/CollapseList/CollapseList';
import { ProjectTags } from '../../organisms/ProjectTags/ProjectTags';
import { DEFAULT_COLLAPSED_ITEMS } from '../CollapseList/CollapseList.constants';

export interface Props {
  classes?: {
    root?: string;
  };
  activities?: ProjectTagType[];
  ecosystems?: ProjectTagType[];
  impact: ProjectImpactCardProps[];
  sx?: SxProps<Theme>;
  activitiesLabel?: string;
}

const ImpactTags = ({
  activities,
  ecosystems,
  impact,
  sx,
  activitiesLabel,
}: Props) => {
  const isImpactCollapsed = impact.length > DEFAULT_COLLAPSED_ITEMS;
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 500,
        },
        ...sxToArray(sx),
      ]}
    >
      <Box sx={{ mb: isImpactCollapsed ? { xs: 7.5, sm: 10 } : 0 }}>
        <CollapseList
          items={impact.map(imp => (
            <Box
              key={imp.name}
              sx={{
                pb: [2.5, 3.75],
                ':last-child': {
                  pb: isImpactCollapsed ? 0 : { xs: 7.5, sm: 10 },
                },
              }}
            >
              <ProjectImpactCard {...imp} />
            </Box>
          ))}
        />
      </Box>
      {(activities || ecosystems) && (
        <ProjectTags
          activities={activities}
          ecosystems={ecosystems}
          sx={{
            mb: { xs: 7.5, sm: 10 },
          }}
          activitiesLabel={activitiesLabel}
        />
      )}
    </Box>
  );
};

export { ImpactTags };
