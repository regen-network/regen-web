import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Grid } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { CreateProjectCard } from 'web-components/src/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/src/components/cards/ProjectCard';

import { useAuth } from 'lib/auth/auth';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import {
  projectsCurrentStepAtom,
  projectsDraftState,
} from 'pages/ProjectCreate/ProjectCreate.store';
import WithLoader from 'components/atoms/WithLoader';
import { PostFlow } from 'components/organisms/PostFlow/PostFlow';

import { useDashboardContext } from '../Dashboard.context';
import { useFetchProjectByAdmin } from './hooks/useFetchProjectsByAdmin';
import {
  CREATE_POST,
  CREATE_POST_DISABLED_TOOLTIP_TEXT,
  DRAFT_ID,
  MY_PROJECTS_BUTTON_TEXT,
  MY_PROJECTS_EMPTY_TITLE,
  NOT_SUPPORTED_TOOLTIP_TEXT,
} from './MyProjects.constants';
import {
  getDefaultProject,
  handleProjectsDraftStatus,
} from './MyProjects.utils';

const MyProjects = (): JSX.Element => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const location = useLocation();
  const { isIssuer, isProjectAdmin, sanityProfilePageData } =
    useDashboardContext();
  const { track } = useTracker();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);
  const { wallet, loginDisabled } = useWallet();
  const { activeAccountId, activeAccount } = useAuth();

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: activeAccountId,
    adminAddress: loginDisabled ? wallet?.address : activeAccount?.addr,
    keepUnpublished: true,
  });

  const isFirstProject = !adminProjects || adminProjects?.length < 1;

  const [postProjectId, setPostProjectId] = useState<string | undefined>();
  const [postOffChainProjectId, setPostOffChainProjectId] = useState<
    string | undefined
  >();
  const [postProjectName, setPostProjectName] = useState<string | undefined>();
  const [postProjectSlug, setPostProjectSlug] = useState<string | undefined>();

  const setProjectsDraftState = useSetAtom(projectsDraftState);

  useEffect(() => {
    setProjectsDraftState(prevState =>
      handleProjectsDraftStatus(prevState, adminProjects),
    );
  }, [adminProjects, setProjectsDraftState]);

  return (
    <>
      <Grid container spacing={8}>
        {activeAccountId && (
          <Grid item xs={12} md={6} lg={4}>
            <CreateProjectCard
              buttonText={MY_PROJECTS_BUTTON_TEXT}
              emptyTitle={MY_PROJECTS_EMPTY_TITLE}
              isFirstProject={isFirstProject}
              onClick={() => {
                if (isIssuer) {
                  navigate(`/project-pages/${DRAFT_ID}/choose-credit-class`);
                } else {
                  navigate(`/project-pages/${DRAFT_ID}/basic-info`);
                }
              }}
              sx={{ height: { xs: '100%' } }}
            />
          </Grid>
        )}

        {isProjectAdmin &&
          adminProjects?.map((project, i) => {
            return (
              <Grid key={i} item xs={12} md={6} lg={4}>
                <WithLoader
                  isLoading={isLoadingAdminProjects}
                  variant="skeleton"
                >
                  <ProjectCard
                    asAdmin
                    adminPrompt={
                      sanityProfilePageData?.allProfilePage?.[0]
                        ?.projectCardPromptRaw
                    }
                    {...getDefaultProject(!activeAccountId, _)}
                    {...project}
                    button={{
                      text: _(CREATE_POST),
                      disabled:
                        !activeAccountId || project.draft || !project.location,
                    }}
                    onButtonClick={() => {
                      setPostProjectId(project.id);
                      setPostOffChainProjectId(project.offChainId);
                      setPostProjectName(project.name);
                      setPostProjectSlug(project.slug);
                    }}
                    onContainedButtonClick={() => {
                      if (
                        !project.offChain ||
                        (project.offChain && project.published)
                      ) {
                        navigate(
                          `/project-pages/${project.id}/edit/basic-info`,
                        );
                      } else {
                        const currentStep = projectsCurrentStep[project?.id];
                        navigate(
                          `/project-pages/${project?.id}/${
                            currentStep || 'basic-info'
                          }`,
                        );
                      }
                    }}
                    track={track}
                    pathname={location.pathname}
                    createPostTooltipText={
                      loginDisabled
                        ? _(NOT_SUPPORTED_TOOLTIP_TEXT)
                        : _(CREATE_POST_DISABLED_TOOLTIP_TEXT)
                    }
                    editProjectTooltipText={_(NOT_SUPPORTED_TOOLTIP_TEXT)}
                  />
                </WithLoader>
              </Grid>
            );
          })}
      </Grid>
      {postProjectId && (
        <PostFlow
          onModalClose={() => {
            setPostProjectId(undefined);
            setPostOffChainProjectId(undefined);
            setPostProjectName(undefined);
            setPostProjectSlug(undefined);
          }}
          projectLocation={
            adminProjects.find(project => project.id === postProjectId)
              ?.location as GeocodeFeature
          }
          projectId={postProjectId}
          offChainProjectId={postOffChainProjectId}
          projectName={postProjectName}
          projectSlug={postProjectSlug}
          initialValues={{
            title: '',
            comment: '',
            files: [],
            privacyType: 'public',
            published: true,
          }}
          disableScrollLock={true}
        />
      )}
    </>
  );
};

export { MyProjects };
