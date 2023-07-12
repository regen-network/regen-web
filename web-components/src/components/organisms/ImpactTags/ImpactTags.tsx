import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import ProjectImpactCard, {
  ProjectImpactCardProps,
} from '../../cards/ProjectImpactCard/ProjectImpactCard';
import { ProjectTagType } from '../../molecules/ProjectTag/ProjectTag.types';
import { CollapseList } from '../../organisms/CollapseList/CollapseList';
import { ProjectTags } from '../../organisms/ProjectTags/ProjectTags';

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
}: Props) => (
  <Box
    sx={[
      {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 367,
      },
      ...sxToArray(sx),
    ]}
  >
    <CollapseList
      sx={{ pb: [7.5, 10] }}
      items={impact.map(imp => (
        <Box key={imp.name} sx={{ pb: [2.5, 4.25] }}>
          <ProjectImpactCard {...imp} />
        </Box>
      ))}
    />
    {(activities || ecosystems) && (
      <ProjectTags
        activities={activities}
        ecosystems={ecosystems}
        sx={{
          mb: 5,
        }}
        activitiesLabel={activitiesLabel}
      />
    )}
  </Box>
);

export { ImpactTags };
