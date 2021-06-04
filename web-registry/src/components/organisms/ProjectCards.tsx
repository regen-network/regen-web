import React from 'react';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
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
}));

const ProjectCards: React.FC<Props> = props => {
  const styles = useStyles();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  return (
    <Grid container className={clsx(props.classes && props.classes.root, styles.root)} spacing={5}>
      {props.projects.map(project => (
        <Grid item sm={6} md={4} key={project.id} className={styles.item}>
          <Link className={styles.projectCard} href={`/projects/${project.id}`}>
            <ProjectCard
              name={project.name}
              imgSrc={project.image}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
              place={project.place}
              area={project.area}
              areaUnit={project.areaUnit}
              developer={
                project.developer && {
                  name: project.developer.name,
                  type: project.developer.type,
                  imgSrc: project.developer.imgSrc,
                }
              }
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export { ProjectCards };
