import React, { useState, createContext, useContext } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Navigation from 'web-components/lib/components/faq/Navigation';
import { Title } from 'web-components/lib/components/typography';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import Banner from 'web-components/lib/components/banner';
import { Label } from 'web-components/lib/components/typography';

import { Link } from '../components/atoms';
import { toTitleCase } from '../lib/titleCase';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-evenly',
      padding: theme.spacing(8.75),
    },
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
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
    fontSize: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
  },
  nav: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
    height: 'fit-content',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(74.25),
    },
    [theme.breakpoints.between('xs', 'xl')]: {
      minWidth: theme.spacing(47.5),
    },
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
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
  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const lastPathItem = pathname.substring(pathname.lastIndexOf('/') + 1);
  const section = lastPathItem !== 'edit' ? lastPathItem : undefined;

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
                <Title variant="h3" align="center" sx={{ flex: 1 }}>
                  {section ? titleCase(section) : 'Edit Project Page'}
                </Title>
              </div>
              {isMobile && !section && <Nav />}
              <Outlet />
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
