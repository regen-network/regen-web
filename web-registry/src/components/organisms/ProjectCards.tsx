import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import Theme from 'web-components/lib/theme/muiTheme';
import { Project } from '../../mocks';
import getRegistryUrl from '../../lib/registryUrl';

type Props = {
  projects: Project[];
};

const useStyles = makeStyles((theme: typeof Theme) => ({
  root: {
    paddingTop: theme.spacing(8.75),
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'nowrap',
      overflow: 'auto',
    },
  },
  projectCard: {
    height: '100%',
  },
  item: {
    // display: 'flex',
    // justifyContent: 'center',
    // [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
    //   flexGrow: 0,
    //   // maxWidth: '100%',
    //   flexBasis: '100%',
    // },
  },
}));

const ProjectCards: React.FC<Props> = p => {
  const styles = useStyles();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  return (
    <Grid container className={styles.root} spacing={5}>
      {p.projects.map((project, i) => (
        <Grid item xs={12} sm={6} md={4} key={project.id} className={styles.item}>
          <Link className={styles.projectCard} href={getRegistryUrl(`/projects/${project.id}`)}>
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
