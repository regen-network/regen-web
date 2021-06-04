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
    <div className={styles.background}>
      <Section
        title="More Projects"
        titleAlign={isMobile ? 'left' : 'center'}
        classes={{ title: styles.title }}
      >
        <LazyLoad offset={300}>
          <ProjectCards projects={projects} />
        </LazyLoad>
      </Section>
    </div>
  );
};

export { MoreProjectsSection };
