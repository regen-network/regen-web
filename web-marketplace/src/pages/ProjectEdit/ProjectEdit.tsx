import {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import Banner from 'web-components/src/components/banner';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import { Label, Title } from 'web-components/src/components/typography';
import type { Theme } from 'web-components/src/theme/muiTheme';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import NotFoundPage from 'pages/NotFound';
import { usePathSection } from 'pages/ProfileEdit/hooks/usePathSection';
import WithLoader from 'components/atoms/WithLoader';
import {
  getIsUuid,
  getIsOnChainId,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { useMsgClient } from 'hooks';

import { ProjectDenied } from '../../components/organisms/ProjectDenied/ProjectDenied';
import useProjectEditSubmit, {
  UseProjectEditSubmitParams,
} from './hooks/useProjectEditSubmit';
import { EDIT_PROJECT } from './ProjectEdit.constants';
import { ProjectEditNav } from './ProjectEdit.Nav';
import { useProjectEditStyles } from './ProjectEdit.styles';
import { WarningModal } from './ProjectEdit.WarningModal';

type ContextType = {
  confirmSave?: () => void;
  isEdit?: boolean;
  onChainProject?: ProjectInfo;
  projectEditSubmit: UseProjectEditSubmitParams;
  isDirtyRef: MutableRefObject<boolean>;
  isLoading: boolean;
};

const ProjectEditContext = createContext<ContextType>({
  confirmSave: () => {},
  projectEditSubmit: async () => {},
  isEdit: false,
  isDirtyRef: { current: false },
  isLoading: false,
});

function ProjectEdit(): JSX.Element {
  const { classes: styles } = useProjectEditStyles();
  const theme = useTheme<Theme>();
  const [saved, setSaved] = useState(false);
  const { projectId } = useParams();
  const { wallet } = useWallet();
  const { activeAccountId } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const section = usePathSection();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const navigate = useNavigate();
  const graphqlClient = useApolloClient();

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
    setErrorModalAtom(atom => void (atom.description = String(error)));
    setProcessingModalAtom(atom => void (atom.open = false));
  };

  const { signAndBroadcast } = useMsgClient();
  const isOnChainId = getIsOnChainId(projectId);
  const isOffChainUUid = getIsUuid(projectId);
  const { data: projectRes, isFetching: isFetchingProject } = useQuery(
    getProjectQuery({
      request: {
        projectId,
      },
      enabled: !!projectId && isOnChainId,
    }),
  );
  const onChainProject = projectRes?.project;
  const { data: projectByOffChainIdRes, isFetching: isFetchingProjectById } =
    useQuery(
      getProjectByIdQuery({
        client: graphqlClient,
        enabled: !!projectId && isOffChainUUid,
        id: projectId,
      }),
    );
  const offChainProject = projectByOffChainIdRes?.data?.projectById;
  const isLoading = isFetchingProject || isFetchingProjectById;

  const isNotAdmin =
    ((onChainProject?.admin && wallet?.address !== onChainProject.admin) ||
      (offChainProject?.adminAccountId &&
        activeAccountId !== offChainProject?.adminAccountId)) &&
    !isLoading;
  const hasProject = !!onChainProject || !!offChainProject;
  const isOnChain = !isLoading && !!onChainProject;

  const projectEditSubmit = useProjectEditSubmit({
    projectId,
    admin: onChainProject?.admin,
    creditClassId: onChainProject?.classId,
    signAndBroadcast,
    onBroadcast,
    onErrorCallback,
    onTxSuccessful,
  });

  const confirmSave = (): void => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 5000);
  };

  // For react-hook-form based forms
  const isDirtyRef = useRef<boolean>(false);

  if (isNotAdmin) {
    return (
      <ProjectDenied
        isEdit
        address={onChainProject?.admin}
        projectId={projectId}
      />
    );
  }
  if (!isLoading && !hasProject) {
    return <NotFoundPage />;
  }

  const onBackClick = (): void => {
    const isFormDirty = isDirtyRef.current;
    if (section) {
      const path = isMobile
        ? `/project-pages/${projectId}/edit`
        : '/profile/projects';
      if (isFormDirty) {
        setIsWarningModalOpen(path);
      } else {
        navigate(path);
      }
    } else {
      navigate('/profile/projects');
    }
  };

  const onNavClick = (sectionName: string): void => {
    const isFormDirty = isDirtyRef.current;
    const path = `/project-pages/${projectId}/edit/${sectionName.replace(
      ' ',
      '-',
    )}`;
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      navigate(path);
    }
  };

  return (
    <ProjectEditContext.Provider
      value={{
        confirmSave,
        isEdit: true,
        onChainProject,
        projectEditSubmit,
        isDirtyRef,
        isLoading,
      }}
    >
      <WithLoader
        isLoading={isLoading}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mt: 20,
        }}
      >
        <div className={styles.root}>
          <div className={styles.left}>
            <div className={styles.topAlign}>
              <Box onClick={onBackClick} className={styles.back}>
                <ArrowDownIcon
                  className={styles.arrow}
                  color={theme.palette.secondary.main}
                  direction="prev"
                />
                {!isMobile && <Label>back to projects</Label>}
              </Box>
            </div>
            {!isMobile && (
              <ProjectEditNav
                isOnChain={isOnChain}
                section={section}
                onNavClick={onNavClick}
              />
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.sectionContainer}>
              <div className={styles.section}>
                <div className={styles.topAlign}>
                  <Title variant="h3" align="center" sx={{ flex: 1 }}>
                    {section ? startCase(section) : 'Edit Project Page'}
                  </Title>
                </div>
                {isMobile && !section && (
                  <ProjectEditNav
                    isOnChain={isOnChain}
                    section={section}
                    onNavClick={onNavClick}
                  />
                )}
                <Outlet />
              </div>
            </div>
          </div>
          {saved && <Banner text="Changes have been saved" />}
          <WarningModal
            open={!!isWarningModalOpen}
            navigate={() => {
              if (isWarningModalOpen) navigate(isWarningModalOpen);
              isDirtyRef.current = false;
            }}
            onClose={() => {
              setIsWarningModalOpen(undefined);
            }}
          />
        </div>
      </WithLoader>
    </ProjectEditContext.Provider>
  );
}

const useProjectEditContext = (): ContextType => useContext(ProjectEditContext);

export { ProjectEdit, useProjectEditContext };
