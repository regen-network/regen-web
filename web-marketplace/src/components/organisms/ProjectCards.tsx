import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import ProjectCard from 'web-components/src/components/cards/ProjectCard';
import { Theme } from 'web-components/src/theme/muiTheme';

import { DRAFT_TEXT } from 'lib/constants/shared.constants';
import { QUDT_UNIT_MAP, qudtUnit } from 'lib/rdf';
import { useTracker } from 'lib/tracker/useTracker';

import { Maybe, MoreProjectFieldsFragment } from '../../generated/graphql';

type Props = {
  projects: Array<Maybe<MoreProjectFieldsFragment | undefined>>;
  classes?: {
    root?: string;
  };
};

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      flexWrap: 'nowrap',
      overflow: 'auto',
    },
  },
  projectCard: {
    height: '100%',
  },
  item: {
    [theme.breakpoints.down('md')]: {
      flexGrow: 0,
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },
  swipe: {
    display: 'flex',
    marginLeft: theme.spacing(-4),
    marginRight: theme.spacing(-4),
    overflowX: 'auto',
    minHeight: theme.spacing(104),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  swipeItem: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1.875),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1.875),
      '&:first-child': {
        paddingLeft: theme.spacing(4),
      },
      '&:last-child': {
        paddingRight: theme.spacing(4),
      },
    },
  },
}));

const ProjectCards: React.FC<React.PropsWithChildren<Props>> = props => {
  const { _ } = useLingui();
  const { classes: styles, cx } = useStyles();
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const imageStorageBaseUrl = import.meta.env.VITE_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = import.meta.env.VITE_API_URI;
  const { track } = useTracker();
  const location = useLocation();

  const LinkedProject: React.FC<
    React.PropsWithChildren<{
      project: MoreProjectFieldsFragment;
    }>
  > = ({ project }) => (
    <ProjectCard
      sx={theme => ({ width: { xs: theme.spacing(73), md: '100%' } })}
      name={project.metadata?.['schema:name']}
      imgSrc={
        project.metadata?.['regen:previewPhoto']?.['schema:url'] ||
        '/jpg/default-project.jpg'
      }
      imageStorageBaseUrl={imageStorageBaseUrl}
      apiServerUrl={apiServerUrl}
      place={project.metadata?.['schema:location']?.place_name}
      area={project.metadata?.['regen:projectSize']?.['qudt:numericValue']}
      areaUnit={
        QUDT_UNIT_MAP[
          project.metadata?.['regen:projectSize']?.['qudt:unit'] as qudtUnit
        ]
      }
      track={track}
      pathname={location.pathname}
      draftText={_(DRAFT_TEXT)}
    />
  );

  return isMobile ? (
    <div className={styles.swipe}>
      {props.projects.map((project, i) => {
        const projectId = project?.onChainId || project?.slug;
        return (
          project && (
            <Link
              className={styles.swipeItem}
              key={projectId || i}
              href={`/project/${projectId}`}
            >
              <LinkedProject project={project} />
            </Link>
          )
        );
      })}
    </div>
  ) : (
    <Grid
      container
      className={cx(styles.root, props.classes && props.classes.root)}
      spacing={5}
    >
      {props.projects.map((project, i) => {
        const projectId = project?.onChainId || project?.slug;
        return (
          project && (
            <Grid
              item
              sm={6}
              md={4}
              key={projectId || i}
              className={styles.item}
            >
              <Link
                className={styles.projectCard}
                href={`/project/${projectId}`}
              >
                <LinkedProject project={project} />
              </Link>
            </Grid>
          )
        );
      })}
    </Grid>
  );
};

export { ProjectCards };
