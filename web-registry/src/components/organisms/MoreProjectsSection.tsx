import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Section from 'web-components/lib/components/section';
import { Project } from '../../mocks';
import LazyLoad from 'react-lazyload';
import { ProjectCards } from './ProjectCards';

interface MoreProjectsProps {
  projects: Project[];
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    paddingBottom: theme.spacing(20),
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

const MoreProjectsSection = ({ projects }: MoreProjectsProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.background}>
      <Section title="More Projects" titleAlign={isMobile ? 'left' : 'center'}>
        <LazyLoad offset={300}>
          <ProjectCards projects={projects} />
        </LazyLoad>
      </Section>
    </div>
  );
};

export { MoreProjectsSection };
