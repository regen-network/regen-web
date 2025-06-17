import {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { useAtom, useSetAtom } from 'jotai';
import { usePathSection } from 'legacy-pages/Dashboard/hooks/usePathSection';
import { OnTxSuccessfulProps } from 'legacy-pages/Dashboard/MyEcocredits/MyEcocredits.types';
import NotFoundPage from 'legacy-pages/NotFound';
import { startCase } from 'lodash';

import Banner from 'web-components/src/components/banner';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { Label, Title } from 'web-components/src/components/typography';
import type { Theme } from 'web-components/src/theme/muiTheme';

import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { errorCodeAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
  DISCARD_CHANGES_TITLE,
} from 'lib/constants/shared.constants';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import {
  getIsOnChainId,
  getIsUuid,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { useMsgClient } from 'hooks';

import { ProjectDenied } from '../../components/organisms/ProjectDenied/ProjectDenied';
import useProjectEditSubmit, {
  UseProjectEditSubmitParams,
} from './hooks/useProjectEditSubmit';
import { EDIT_PROJECT } from './ProjectEdit.constants';
import { ProjectEditNav } from './ProjectEdit.Nav';
import { useProjectEditStyles } from './ProjectEdit.styles';

type ContextType = {
  confirmSave?: () => void;
  isEdit?: boolean;
  onChainProject?: ProjectInfo;
  projectEditSubmit: UseProjectEditSubmitParams;
  isDirtyRef: MutableRefObject<boolean>;
  isLoading: boolean;
  setIsWarningModalOpen: UseStateSetter<string | undefined>;
};

const ProjectEditContext = createContext<ContextType>({
  confirmSave: () => {},
  projectEditSubmit: async () => {},
  isEdit: false,
  isDirtyRef: { current: false },
  isLoading: false,
  setIsWarningModalOpen: () => {},
});

function ProjectEdit(): JSX.Element {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
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
  const { queryClient } = useLedger();

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
      atom.buttonTitle = _(EDIT_PROJECT);
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
        projectId: projectId as string,
      },
      enabled: !!projectId && isOnChainId && !!queryClient,
      client: queryClient,
    }),
  );

  const onChainProject = projectRes?.project;
  const { data: projectByOffChainIdRes, isFetching: isFetchingProjectById } =
    useQuery(
      getProjectByIdQuery({
        client: graphqlClient,
        languageCode: selectedLanguage,
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
        : '/dashboard/projects';
      if (isFormDirty) {
        setIsWarningModalOpen(path);
      } else {
        navigate(path);
      }
    } else {
      navigate('/dashboard/projects');
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
        setIsWarningModalOpen,
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
                {!isMobile && (
                  <Label>
                    <Trans>back to projects</Trans>
                  </Label>
                )}
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
                    {section ? startCase(section) : _(msg`Edit Project Page`)}
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
          {saved && <Banner text={_(msg`Changes have been saved`)} />}
          <SaveChangesWarningModal
            open={!!isWarningModalOpen}
            title={_(DISCARD_CHANGES_TITLE)}
            bodyText={_(DISCARD_CHANGES_BODY)}
            buttonText={_(DISCARD_CHANGES_BUTTON)}
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
