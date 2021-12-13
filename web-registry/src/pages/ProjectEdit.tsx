import React, { useState, createContext, useContext } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';

import Navigation from 'web-components/lib/components/faq/Navigation';
import Title from 'web-components/lib/components/title';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import Banner from 'web-components/lib/components/banner';
import { Label } from 'web-components/lib/components/label';
import {
  BasicInfo,
  ProjectLocation,
  Roles,
  EntityDisplay,
  Media,
  Story,
} from '../pages';
import { Link } from '../components/atoms';
import { ProtectedRoute } from '../components/atoms';
import { toTitleCase } from '../lib/titleCase';
import { EditProjectPageFooter } from '../components/molecules';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-evenly',
      padding: theme.spacing(8.75),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.between('xs', 'lg')]: {
      minWidth: theme.spacing(47.5),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
  },
}));

type ContextType = {
  confirmSave?: () => void;
  isEdit?: boolean;
};

const ProjectEditContext = createContext<ContextType>({
  confirmSave: () => {},
  isEdit: false,
});

function ProjectEdit(): JSX.Element {
  const styles = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lastPathItem = pathname.substring(pathname.lastIndexOf('/') + 1);
  const section = lastPathItem !== 'edit' ? lastPathItem : undefined;
  console.log('section', section);
  console.log('isMobile', isMobile);
  const navigateSection = (sectionName: string): void => {
    const hyphenated = sectionName.replace(' ', '-');
    navigate(`/project-pages/${projectId}/edit/${hyphenated}`);
  };
  const Nav = (): JSX.Element => (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={[
        'basic info',
        'location',
        'roles',
        'entity display',
        'media',
        'story',
        'settings',
      ]}
      category={section?.replace('-', ' ')}
      onClick={sectionName => navigateSection(sectionName)}
      showIcon
    />
  );

  const titleCase = (str: string): string => {
    return toTitleCase(str.replace('-', ' '));
  };

  const confirmSave = (): void => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };

  return (
    <ProjectEditContext.Provider value={{ confirmSave, isEdit: true }}>
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.topAlign}>
            <Link
              href={
                section && isMobile
                  ? `/project-pages/${projectId}/edit/`
                  : '/project-pages'
              }
              className={styles.back}
            >
              <ArrowDownIcon
                className={styles.arrow}
                color={theme.palette.secondary.main}
                direction="prev"
              />
              {!isMobile && <Label>back to projects</Label>}
            </Link>
          </div>
          {!isMobile && <Nav />}
        </div>
        <div className={styles.right}>
          <div className={styles.sectionContainer}>
            <div className={styles.section}>
              <div className={styles.topAlign}>
                <Title className={styles.title} variant="h3" align="center">
                  {section ? titleCase(section) : 'Edit Project Page'}
                </Title>
              </div>
              {isMobile && !section && <Nav />}
              <Outlet />
              {/* <Route
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
                    <ProtectedRoute
                      path={`${path}/basic-info`}
                      component={() => <BasicInfo />}
                    />
                    <ProtectedRoute
                      path={`${path}/location`}
                      component={() => <ProjectLocation />}
                    />
                    <ProtectedRoute
                      path={`${path}/story`}
                      component={() => <Story />}
                    />
                    <ProtectedRoute
                      path={`${path}/media`}
                      component={() => <Media />}
                    />
                    <ProtectedRoute
                      path={`${path}/roles`}
                      component={() => <Roles />}
                    />
                    <ProtectedRoute
                      path={`${path}/entity-display`}
                      component={() => <EntityDisplay />}
                    />
                  </>
                )}
              /> */}
            </div>
          </div>
        </div>
        {saved && <Banner text="Changes have been saved" />}
      </div>
    </ProjectEditContext.Provider>
  );
}

const useProjectEditContext = (): ContextType => useContext(ProjectEditContext);

export { ProjectEdit, useProjectEditContext };
