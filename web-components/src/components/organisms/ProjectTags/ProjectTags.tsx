import { Box, SxProps } from '@mui/material';

import { Label } from 'src/components/typography';

import { ProjectTag } from '../../../components/molecules/ProjectTag/ProjectTag';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { TagType } from '../../molecules/ProjectTag/ProjectTag.types';
import {
  ECOSYSTEM_LABEL,
  PROJECT_ACTIVITY_LABEL,
} from './ProjectTags.constants';

export interface Props {
  activity: TagType;
  ecosystem: TagType;
  sx?: SxProps<Theme>;
}

const ProjectTags = ({ activity, ecosystem, sx = [] }: Props): JSX.Element => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        },
        ...sxToArray(sx),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mr: { sm: 3.25 },
          mb: { xs: 10, sm: 0 },
        }}
      >
        <Label sx={{ fontSize: 11, mb: 2 }}>{PROJECT_ACTIVITY_LABEL}</Label>
        <ProjectTag tag={activity} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Label sx={{ fontSize: 11, mb: 2 }}>{ECOSYSTEM_LABEL}</Label>
        <ProjectTag tag={ecosystem} />
      </Box>
    </Box>
  );
};

export { ProjectTags };
