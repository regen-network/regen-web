import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import { ProjectTagType } from '../molecules/ProjectTag/ProjectTag.types';
import { ProjectTags } from '../organisms/ProjectTags/ProjectTags';
import { Title } from '../typography';
import Card from './Card';

export interface SDG {
  imageUrl: string;
  title?: string;
}

interface ProjectTopCardProps {
  classes?: {
    root?: string;
  };
  sdgs?: SDG[];
  activities?: ProjectTagType[];
  ecosystems?: ProjectTagType[];
}

const useStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(8)} ${theme.spacing(7.5)} ${theme.spacing(9)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.9)} ${theme.spacing(5)} ${theme.spacing(
        12.5,
      )}`,
    },
    '& :only-child, & :last-child': {
      marginBottom: 0,
    },
  },
  image: {
    borderRadius: '2px',
    width: '100%',
  },
  sdgs: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(21.25),
    },
  },
  sdgGridItem: {
    '&:nth-of-type(odd)': {
      [theme.breakpoints.down('sm')]: {
        paddingRight: theme.spacing(5.5 / 2),
      },
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing(6.8 / 2),
      },
    },
    '&:nth-of-type(even)': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(5.5 / 2),
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(6.8 / 2),
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(5.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6.8),
    },
  },
  sdgGrid: {
    '&:not(:last-child)': {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(6.25),
      },
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(8.75),
      },
    },
  },
}));

export default function ProjectTopCard({
  classes,
  sdgs,
  activities,
  ecosystems,
}: ProjectTopCardProps): JSX.Element {
  const { classes: styles, cx } = useStyles();
  return (
    <Card className={cx(styles.root, classes && classes.root)}>
      {sdgs && sdgs.length > 0 && (
        <div className={styles.sdgs}>
          <Title variant="h3" sx={{ pb: { xs: 3, sm: 4 } }}>
            SDGs
          </Title>
          <Grid container>
            {sdgs.map((sdg: SDG, index: number) => (
              <Grid className={styles.sdgGridItem} key={index} item xs={6}>
                <img
                  className={styles.image}
                  alt={sdg.title || sdg.imageUrl}
                  src={sdg.imageUrl}
                />
              </Grid>
              // Previous layout version, keep it here in case we wanna use it in the future
              // <Grid key={index} className={styles.sdgGrid} container wrap="nowrap" alignItems="center">
              //   <Grid item>
              //     <img className={styles.image} alt={sdg.imageUrl} src={sdg.imageUrl} />
              //   </Grid>
              //   <Grid item>
              //     <Title variant="h5">{sdg.title}</Title>
              //   </Grid>
              // </Grid>
            ))}
          </Grid>
        </div>
      )}
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
