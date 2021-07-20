import React from 'react';
import LazyLoad from 'react-lazyload';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import { Project } from '../../mocks';
import { ProjectCards } from './ProjectCards';

interface MoreProjectsProps {
  projects: Project[];
  title?: string;
  classes?: {
    root?: string;
    title?: string;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(22.25),
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
}));

const MoreProjectsSection = ({ classes, projects, title }: MoreProjectsProps): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Section
      title={title || 'More Projects'}
      titleAlign={isMobile ? 'left' : 'center'}
      classes={{ root: cx(styles.root, classes?.root), title: cx(styles.title, classes?.title) }}
    >
      <LazyLoad offset={300}>
        <ProjectCards projects={projects} />
      </LazyLoad>
    </Section>
  );
};

export { MoreProjectsSection };
