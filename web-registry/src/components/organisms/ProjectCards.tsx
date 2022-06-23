import React from 'react';
import clsx from 'clsx';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Theme } from 'web-components/lib/theme/muiTheme';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import { MoreProjectFieldsFragment, Maybe } from '../../generated/graphql';
import { qudtUnit, qudtUnitMap } from '../../lib/rdf';
import DefaultProject from '../../assets/default-project.jpg';

type Props = {
  projects: Array<Maybe<MoreProjectFieldsFragment | undefined>>;
  classes?: {
    root?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
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

const ProjectCards: React.FC<Props> = props => {
  const styles = useStyles();
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  const LinkedProject: React.FC<{
    project: MoreProjectFieldsFragment;
  }> = ({ project }) => (
    <ProjectCard
      sx={theme => ({ width: { xs: theme.spacing(73), md: '100%' } })}
      name={project.metadata?.['schema:name']}
      imgSrc={
        project.metadata?.['regen:previewPhoto']?.['@value'] || DefaultProject
      }
      imageStorageBaseUrl={imageStorageBaseUrl}
      apiServerUrl={apiServerUrl}
      place={project.metadata?.['schema:location']?.place_name}
      area={
        project.metadata?.['regen:projectSize']?.['qudt:numericValue']?.[
          '@value'
        ]
      }
      areaUnit={
        qudtUnitMap[
          project.metadata?.['regen:projectSize']?.['qudt:unit']?.[
            '@value'
          ] as qudtUnit
        ]
      }
      registry={project.partyByRegistryId}
    />
  );

  return isMobile ? (
    <div className={styles.swipe}>
      {props.projects.map((project, i) => {
        return (
          project && (
            <Link
              className={styles.swipeItem}
              key={project.handle || i}
              href={`/projects/${project.handle}`}
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
      className={clsx(styles.root, props.classes && props.classes.root)}
      spacing={5}
    >
      {props.projects.map((project, i) => {
        return (
          project && (
            <Grid
              item
              sm={6}
              md={4}
              key={project.handle || i}
              className={styles.item}
            >
              <Link
                className={styles.projectCard}
                href={`/projects/${project.handle}`}
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
