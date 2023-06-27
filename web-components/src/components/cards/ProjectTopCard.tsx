import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { ProjectTagType } from '../molecules/ProjectTag/ProjectTag.types';
import { CollapseList } from '../organisms/CollapseList/CollapseList';
import { ProjectTags } from '../organisms/ProjectTags/ProjectTags';
import Card from './Card';
import ProjectImpactCard, {
  ProjectImpactCardProps,
} from './ProjectImpactCard/ProjectImpactCard';

interface ProjectTopCardProps {
  classes?: {
    root?: string;
  };
  activities?: ProjectTagType[];
  ecosystems?: ProjectTagType[];
  impact: ProjectImpactCardProps[];
}

const useStyles = makeStyles()(theme => ({
  root: {
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
    },
    '& :only-child, & :last-child': {
      marginBottom: 0,
    },
  },
}));

export default function ProjectTopCard({
  classes,
  activities,
  ecosystems,
  impact,
}: ProjectTopCardProps): JSX.Element {
  const { classes: styles, cx } = useStyles();
  return (
    <Card className={cx(styles.root, classes && classes.root)}>
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
        />
      )}
    </Card>
  );
}
