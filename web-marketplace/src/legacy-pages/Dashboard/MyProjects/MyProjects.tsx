import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { projectsDraftState } from 'legacy-pages/ProjectCreate/ProjectCreate.store';
import { useRouter } from 'next/navigation';

import { CreateProjectCard } from 'web-components/src/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/src/components/cards/ProjectCard';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';

import { useAuth } from 'lib/auth/auth';
import { getOrganizationByDaoAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getOrganizationByDaoAddressQuery/getOrganizationByDaoAddressQuery';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';

import { useDashboardContext } from '../Dashboard.context';
import { useFetchProjectByAdmin } from './hooks/useFetchProjectsByAdmin';
import {
  DRAFT_ID,
  MANAGE_PROJECT_BUTTON_TEXT,
  MY_PROJECTS_BUTTON_TEXT,
  MY_PROJECTS_EMPTY_TITLE,
} from './MyProjects.constants';
import {
  getDefaultProject,
  handleProjectsDraftStatus,
} from './MyProjects.utils';

const MyProjects = (): JSX.Element => {
  const { _ } = useLingui();
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sanityProfilePageData,
    isOrganizationDashboard,
    organizationDaoAddress,
  } = useDashboardContext();
  const { track } = useTracker();
  const { wallet, loginDisabled } = useWallet();
  const { activeAccountId, activeAccount } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const {
    data: organizationData,
    isFetching: isLoadingOrganizationByDaoAddress,
  } = useQuery(
    getOrganizationByDaoAddressQuery({
      client: graphqlClient,
      daoAddress: organizationDaoAddress as string,
      enabled:
        !!isOrganizationDashboard &&
        !!organizationDaoAddress &&
        !!graphqlClient,
    }),
  );

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: activeAccountId,
    adminAddress: loginDisabled ? wallet?.address : activeAccount?.addr,
    keepUnpublished: true,
    organization: isOrganizationDashboard
      ? organizationData?.organizationByDaoAddress
      : undefined,
    isLoading: isLoadingOrganizationByDaoAddress,
  });

  const isFirstProject = !adminProjects || adminProjects?.length < 1;

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
                const params = new URLSearchParams({
                  from: location.pathname,
                  ...(isOrganizationDashboard && { isOrganization: 'true' }),
                });
                router.push(
                  `/project-pages/${DRAFT_ID}/account?${params.toString()}`,
                );
              }}
              sx={{ height: { xs: '100%' } }}
            />
          </Grid>
        )}

        {adminProjects &&
          adminProjects.length > 0 &&
          adminProjects.map((project, i) => {
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
                      text: _(MANAGE_PROJECT_BUTTON_TEXT),
                      disabled: false,
                      startIcon: <CogIcon linearGradient />,
                    }}
                    onButtonClick={() => {
                      // Navigate to new manage project page
                      navigate(
                        isOrganizationDashboard
                          ? `/dashboard/organization/projects/${project.id}/manage`
                          : `/dashboard/projects/${project.id}/manage`,
                      );
                    }}
                    track={track}
                    pathname={location.pathname}
                  />
                </WithLoader>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export { MyProjects };
