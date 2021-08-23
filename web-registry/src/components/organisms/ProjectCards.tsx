import React from 'react';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import { User } from 'web-components/lib/components/user/UserInfo';
import { Project } from '../../mocks';

type Props = {
  projects: Project[];
  classes?: {
    root?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      overflow: 'auto',
    },
  },
  projectCard: {
    height: '100%',
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },
  swipe: {
    display: 'flex',
    marginLeft: theme.spacing(-4),
    marginRight: theme.spacing(-4),
    overflowX: 'auto',
    minHeight: theme.spacing(104),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  swipeItem: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1.875),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1.875),
      '&:first-child': {
        paddingLeft: theme.spacing(4),
      },
      '&:last-child': {
        paddingRight: theme.spacing(4),
      },
    },
  },
}));

const ProjectCards: React.FC<Props> = props => {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  const LinkedProject: React.FC<{ project: Project; registry: User }> = ({ project, registry }) => (
    <ProjectCard
      name={project.name}
      imgSrc={project.image}
      imageStorageBaseUrl={imageStorageBaseUrl}
      apiServerUrl={apiServerUrl}
      place={project.place}
      area={project.area}
      areaUnit={project.areaUnit}
      registry={registry}
    />
  );

  return isMobile ? (
    <div className={styles.swipe}>
      {props.projects.map(project => (
        <Link className={styles.swipeItem} key={project.id} href={`/projects/${project.id}`}>
          <LinkedProject
            project={project}
            registry={{
              name: project.registry.name,
              type: 'organization',
              imgSrc: project.registry.image,
            }}
          />
        </Link>
      ))}
    </div>
  ) : (
    <Grid container className={clsx(styles.root, props.classes && props.classes.root)} spacing={5}>
      {props.projects.map(project => (
        <Grid item sm={6} md={4} key={project.id} className={styles.item}>
          <Link className={styles.projectCard} href={`/projects/${project.id}`}>
            <LinkedProject
              project={project}
              registry={{
                name: project.registry.name,
                type: 'organization',
                imgSrc: project.registry.image,
              }}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export { ProjectCards };
