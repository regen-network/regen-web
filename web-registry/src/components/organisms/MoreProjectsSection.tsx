import React from 'react';
import LazyLoad from 'react-lazyload';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Section from 'web-components/lib/components/section';
import { Project } from '../../mocks';
import { ProjectCards } from './ProjectCards';

interface MoreProjectsProps {
  projects: Project[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(22.25),
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
}));

const MoreProjectsSection = ({ projects }: MoreProjectsProps): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Section
      title="More Projects"
      titleAlign={isMobile ? 'left' : 'center'}
      classes={{ root: styles.root, title: styles.title }}
    >
      <LazyLoad offset={300}>
        <ProjectCards projects={projects} />
      </LazyLoad>
    </Section>
  );
};

export { MoreProjectsSection };
