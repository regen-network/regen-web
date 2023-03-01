import { createContext, useContext, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { ERRORS } from 'config/errors';
import { FormikProps, FormikValues } from 'formik';
import { useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import Banner from 'web-components/lib/components/banner';
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
import { useWallet } from 'lib/wallet/wallet';

import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import WithLoader from 'components/atoms/WithLoader';
import { useMsgClient } from 'hooks';

import useProjectEditSubmit, {
  UseProjectEditSubmitParams,
} from './hooks/useProjectEditSubmit';
import { EDIT_PROJECT } from './ProjectEdit.constants';
import { ProjectEditDenied } from './ProjectEdit.Denied';
import { ProjectEditNav } from './ProjectEdit.Nav';
import { useProjectEditStyles } from './ProjectEdit.styles';
import { FormRef, Values } from './ProjectEdit.types';
import { WarningModal } from './ProjectEdit.WarningModal';

type ContextType = {
  confirmSave?: () => void;
  isEdit?: boolean;
  onChainProject?: ProjectInfo;
  projectEditSubmit: UseProjectEditSubmitParams;
  formRef: FormRef<Values>;
};

const ProjectEditContext = createContext<ContextType>({
  confirmSave: () => {},
  projectEditSubmit: async () => {},
  isEdit: false,
  formRef: { current: null },
});

function ProjectEdit(): JSX.Element {
  const { classes: styles } = useProjectEditStyles();
  const theme = useTheme<Theme>();
  const [saved, setSaved] = useState(false);
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const { wallet } = useWallet();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const lastPathItem = pathname.substring(pathname.lastIndexOf('/') + 1);
  const section = lastPathItem !== 'edit' ? lastPathItem : undefined;
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const navigate = useNavigate();

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
  const { data: projectRes, isLoading } = useQuery(
    getProjectQuery({
      request: {
        projectId,
      },
      enabled: !!projectId,
    }),
  );
  const onChainProject = projectRes?.project;
  const isNotAdmin =
    onChainProject?.admin &&
    wallet?.address !== onChainProject.admin &&
    !isLoading;

  const projectEditSubmit = useProjectEditSubmit({
    projectId,
    admin: onChainProject?.admin,
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

  const formRef = useRef<FormikProps<FormikValues>>(null);

  if (isNotAdmin) {
    return (
      <ProjectEditDenied
        address={onChainProject?.admin}
        projectId={projectId}
      />
    );
  }

  const onBackClick = (): void => {
    if (section) {
      const path = isMobile
        ? `/project-pages/${projectId}/edit`
        : '/ecocredits/projects';
      if (formRef.current?.dirty) {
        setIsWarningModalOpen(path);
      } else {
        navigate(path);
      }
    } else {
      navigate('/ecocredits/projects');
    }
  };

  const onNavClick = (sectionName: string): void => {
    const path = `/project-pages/${projectId}/edit/${sectionName.replace(
      ' ',
      '-',
    )}`;
    if (formRef.current?.dirty) {
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
        formRef,
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
              <ProjectEditNav section={section} onNavClick={onNavClick} />
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
                  <ProjectEditNav section={section} onNavClick={onNavClick} />
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
