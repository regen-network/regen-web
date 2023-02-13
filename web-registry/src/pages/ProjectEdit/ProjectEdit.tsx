import React, { createContext, useContext, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';
import { startCase } from 'lodash';
import { makeStyles } from 'tss-react/mui';

import Banner from 'web-components/lib/components/banner';
import Navigation from 'web-components/lib/components/faq/Navigation';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { Label, Title } from 'web-components/lib/components/typography';
import type { Theme } from 'web-components/lib/theme/muiTheme';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';

import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import { useMsgClient } from 'hooks';

import { Link } from '../../components/atoms';
import useProjectEditSubmit, {
  UseProjectEditSubmitParams,
} from './hooks/useProjectEditSubmit';
import { EDIT_PROJECT } from './ProjectEdit.constants';

const useStyles = makeStyles()((theme: Theme) => ({
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
  onChainProject?: ProjectInfo;
  projectEditSubmit: UseProjectEditSubmitParams;
};

const ProjectEditContext = createContext<ContextType>({
  confirmSave: () => {},
  projectEditSubmit: async () => {},
  isEdit: false,
});

function ProjectEdit(): JSX.Element {
  const { classes: styles } = useStyles();
  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const lastPathItem = pathname.substring(pathname.lastIndexOf('/') + 1);
  const section = lastPathItem !== 'edit' ? lastPathItem : undefined;

  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);

  const onBroadcast = (): void => {
    setProcessingModalAtom(atom => void (atom.open = true));
  };

  const onTxSuccessful = ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps): void => {
    setProcessingModalAtom(atom => void (atom.open = false));
    setTxSuccessfulModalAtom(atom => {
      atom.open = true;
      atom.cardItems = cardItems;
      atom.title = title;
      atom.cardTitle = cardTitle;
      atom.buttonTitle = EDIT_PROJECT;
    });
  };

  const onErrorCallback = (error?: Error): void => {
    setErrorCodeAtom(ERRORS.DEFAULT);
    setErrorModalAtom(atom => (atom.description = String(error)));
    setProcessingModalAtom(atom => void (atom.open = false));
  };

  const { signAndBroadcast } = useMsgClient();
  const { data: projectRes } = useQuery(
    getProjectQuery({
      request: {
        projectId,
      },
      enabled: !!projectId,
    }),
  );
  const onChainProject = projectRes?.project;
  const projectEditSubmit = useProjectEditSubmit({
    projectId,
    admin: onChainProject?.admin,
    signAndBroadcast,
    onBroadcast,
    onErrorCallback,
    onTxSuccessful,
  });

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
        'description',
        'media',
        'metadata',
      ]}
      category={section?.replace('-', ' ')}
      onClick={(sectionName: string) => navigateSection(sectionName)}
      showIcon
    />
  );

  const confirmSave = (): void => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };

  return (
    <ProjectEditContext.Provider
      value={{ confirmSave, isEdit: true, onChainProject, projectEditSubmit }}
    >
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.topAlign}>
            <Link
              href={
                section && isMobile
                  ? `/project-pages/${projectId}/edit/`
                  : '/ecocredits/projects'
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
                  {section ? startCase(section) : 'Edit Project Page'}
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
