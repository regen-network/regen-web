import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Section from 'web-components/lib/components/section';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import { Project } from '../../mocks';
import background from '../../assets/more-projects-bg.jpg';
import getRegistryUrl from '../../lib/registryUrl';

interface MoreProjectsProps {
  projects: Project[];
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    paddingBottom: theme.spacing(20),
    backgroundImage: `url("${background}")`,
    backgroundRepeat: 'no-repeat',
  },
  grid: {
    paddingTop: theme.spacing(8.75),
  },
}));

const MoreProjects = ({ projects }: MoreProjectsProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Section title="More Projects">
        <Grid container className={classes.grid} spacing={5}>
          {projects.map((project, i) => (
            <Grid item xs={12} sm={4} key={project.id}>
              <Link href={getRegistryUrl(`/projects/${project.id}`)}>
                <ProjectCard
                  name={project.name}
                  imgSrc={project.image}
                  place={project.place}
                  area={project.area}
                  areaUnit={project.areaUnit}
                  developer={{
                    name: project.developer.name,
                    type: project.developer.type,
                    imgSrc: project.developer.imgSrc,
                  }}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
};

export default MoreProjects;
