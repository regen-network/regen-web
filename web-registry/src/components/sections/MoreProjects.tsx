import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Section from 'web-components/lib/components/section';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import { Project } from '../../mocks';
import LazyLoad from 'react-lazyload';

interface MoreProjectsProps {
  projects: Project[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(22.25),
  },
  grid: {
    paddingTop: theme.spacing(8.75),
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

const MoreProjects = ({ projects }: MoreProjectsProps): JSX.Element => {
  const styles = useStyles();
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Section title="More Projects" titleAlign={isMobile ? 'left' : 'center'} classes={{ root: styles.root }}>
      <LazyLoad offset={300}>
        <Grid container className={styles.grid} spacing={5}>
          {projects.map((project, i) => (
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
      </LazyLoad>
    </Section>
  );
};

export default MoreProjects;
