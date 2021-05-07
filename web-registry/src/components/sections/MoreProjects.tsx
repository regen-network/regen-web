import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Section from 'web-components/lib/components/section';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import Theme from 'web-components/lib/theme/muiTheme';
import { Project } from '../../mocks';
import getRegistryUrl from '../../lib/registryUrl';
import LazyLoad from 'react-lazyload';

interface MoreProjectsProps {
  projects: Project[];
}

const useStyles = makeStyles((theme: typeof Theme) => ({
  background: {
    paddingBottom: theme.spacing(20),
  },
  grid: {
    paddingTop: theme.spacing(8.75),
  },
  projectCard: {
    height: '100%',
  },
  item: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },
}));

const MoreProjects = ({ projects }: MoreProjectsProps): JSX.Element => {
  const classes = useStyles();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  return (
    <div className={classes.background}>
      <Section title="More Projects">
        <LazyLoad offset={300}>
          <Grid container className={classes.grid} spacing={5}>
            {projects.map((project, i) => (
              <Grid item xs={12} sm={6} md={4} key={project.id} className={classes.item}>
                <Link className={classes.projectCard} href={getRegistryUrl(`/projects/${project.id}`)}>
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
        </LazyLoad>
      </Section>
    </div>
  );
};

export default MoreProjects;
