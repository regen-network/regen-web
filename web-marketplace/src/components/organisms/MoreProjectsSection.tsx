import LazyLoad from 'react-lazyload';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { Maybe, MoreProjectFieldsFragment } from '../../generated/graphql';
import { ProjectCards } from './ProjectCards';

interface MoreProjectsProps {
  projects: Array<Maybe<MoreProjectFieldsFragment | undefined>>;
  title?: string;
  classes?: {
    root?: string;
    title?: string;
  };
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(22.25),
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
}));

const MoreProjectsSection = ({
  classes,
  projects,
  title,
}: MoreProjectsProps): JSX.Element => {
  const { classes: styles, cx } = useStyles();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Section
      title={title || 'More Projects'}
      titleAlign={isMobile ? 'left' : 'center'}
      classes={{
        root: cx(styles.root, classes?.root),
        title: cx(styles.title, classes?.title),
      }}
    >
      <LazyLoad offset={300}>
        <ProjectCards projects={projects} />
      </LazyLoad>
    </Section>
  );
};

export { MoreProjectsSection };
