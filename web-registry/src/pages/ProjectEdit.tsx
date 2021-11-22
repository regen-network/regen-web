import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory, useParams, Route } from 'react-router-dom';

import Navigation from 'web-components/lib/components/faq/Navigation';
import Title from 'web-components/lib/components/title';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { Label } from 'web-components/lib/components/label';
import { BasicInfo, ProjectLocation, Roles, EntityDisplay, Media, Story } from '../pages';
import { Link } from '../components/atoms';
import { ProtectedRoute } from '../components/atoms';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8.75),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8.75),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6, 3.75),
    },
  },
  top: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(6),
    },
  },
  bottom: {
    display: 'flex',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(12),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(74.25),
    },
    [theme.breakpoints.down('xs')]: {
      flex: 0,
    },
  },
  arrow: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
    },
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  nav: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
    height: 'fit-content',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(74.25),
    },
    [theme.breakpoints.down('xs')]: {
      flex: 1,
    },
  },
  sectionContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    '& form > div': {
      marginTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 7.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: 'none',
    },
  },
  section: {
    flex: 1,
    maxWidth: theme.spacing(185.75),
  },
  navItem: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderLeft: 'none !important', //todo: maybe style selected instead
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

function ProjectEdit(): JSX.Element {
  const styles = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { projectId, section } = useParams<{ projectId: string; section: string }>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = (sectionName: string): void => {
    const hyphenated = sectionName.replace(' ', '-');
    history.push(`/project-pages/edit/${projectId}/${hyphenated}`);
  };

  const Nav = (): JSX.Element => (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={['basic info', 'location', 'roles', 'entity display', 'media', 'story', 'settings']}
      category={section?.replace('-', ' ')}
      onClick={sectionName => navigate(sectionName)}
      showIcon
    />
  );

  const toTitleCase = (str: string): string => {
    return str.replace('-', ' ').replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Link
          href={section && isMobile ? `/project-pages/edit/${projectId}` : '/project-pages'}
          className={styles.back}
        >
          <ArrowDownIcon className={styles.arrow} color={theme.palette.secondary.main} direction="prev" />
          {!isMobile && <Label>back to projects</Label>}
        </Link>
        <Title className={styles.title} variant="h3" align="center">
          {section && isMobile ? toTitleCase(section) : 'Edit Project Page'}
        </Title>
      </div>
      <div className={styles.bottom}>
        <Hidden smDown>
          <Nav />
        </Hidden>
        <div className={styles.sectionContainer}>
          <div className={styles.section}>
            <Route
              path="/project-pages/edit/:projectId"
              render={({ match: { path } }) => (
                <>
                  <ProtectedRoute
                    path={path}
                    exact
                    component={() => (
                      <Hidden smUp>
                        <Nav />
                      </Hidden>
                    )}
                  />
                  <ProtectedRoute path={`${path}/basic-info`} component={() => <BasicInfo isEdit />} />
                  <ProtectedRoute path={`${path}/location`} component={() => <ProjectLocation isEdit />} />
                  <ProtectedRoute path={`${path}/story`} component={() => <Story isEdit />} />
                  <ProtectedRoute path={`${path}/media`} component={() => <Media isEdit />} />
                  <ProtectedRoute path={`${path}/roles`} component={() => <Roles isEdit />} />
                  <ProtectedRoute
                    path={`${path}/entity-display`}
                    component={() => <EntityDisplay isEdit />}
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectEdit };
