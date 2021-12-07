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
import { toTitleCase } from '../lib/titleCase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-evenly',
      padding: theme.spacing(8.75),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6, 3.75),
    },
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  back: {
    display: 'flex',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(12),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(74.25),
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
  },
  nav: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
    height: 'fit-content',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(74.25),
    },
    [theme.breakpoints.between('xs', 'md')]: {
      minWidth: theme.spacing(47.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  sectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    '& form > div': {
      marginTop: 0,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 'none',
    },
  },
  section: {
    flex: 1,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(185.75),
    },
  },
  navItem: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderLeft: 'none !important',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  topAlign: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(10),
      marginBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(6),
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

  const titleCase = (str: string): string => {
    return toTitleCase(str.replace('-', ' '));
  };

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.topAlign}>
          <Link
            href={section && isMobile ? `/project-pages/edit/${projectId}` : '/project-pages'}
            className={styles.back}
          >
            <ArrowDownIcon className={styles.arrow} color={theme.palette.secondary.main} direction="prev" />
            {!isMobile && <Label>back to projects</Label>}
          </Link>
        </div>
        <Hidden xsDown>
          <Nav />
        </Hidden>
      </div>
      <div className={styles.right}>
        <div className={styles.sectionContainer}>
          <div className={styles.section}>
            <div className={styles.topAlign}>
              <Title className={styles.title} variant="h3" align="center">
                {section && isMobile ? titleCase(section) : 'Edit Project Page'}
              </Title>
            </div>
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
