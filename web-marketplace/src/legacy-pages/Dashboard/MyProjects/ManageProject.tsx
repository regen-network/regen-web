import { useMemo, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import {
  CREATE_POST_DISABLED_TOOLTIP_TEXT,
  NOT_SUPPORTED_TOOLTIP_TEXT,
} from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';

import { Loading } from 'web-components/src/components/loading';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { PostFlow } from 'components/organisms/PostFlow/PostFlow';
import ProjectDashboardBanner from 'components/organisms/ProjectDashboardBanner/ProjectDashboardBanner';
import { getCanEditProject } from 'components/templates/ProjectFormTemplate/ProjectFormAccessTemplate.utils';

import { useCanAccessManageProjectWithRole } from './hooks/useCanAccessManageProjectWithRole';
import { useFetchProject } from './hooks/useFetchProject';
import { useMigrateProject } from './hooks/useMigrateProject';

const ManageProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { _ } = useLingui();
  const location = useLocation();
  const { activeAccountId, activeAccount } = useAuth();
  const { project, offChainProject, onChainProject, isLoading } =
    useFetchProject();
  const { loginDisabled, wallet } = useWallet();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const createPostDisabled =
    !activeAccountId || project.draft || !project.location;

  const [postProjectId, setPostProjectId] = useState<string | undefined>();
  const [postOffChainProjectId, setPostOffChainProjectId] = useState<
    string | undefined
  >();
  const [postProjectName, setPostProjectName] = useState<string | undefined>();
  const [postProjectSlug, setPostProjectSlug] = useState<string | undefined>();

  const tabs = useMemo(
    () => [
      // Data posts, credit issuance and manage credits tabs are hidden until implemented
      {
        label: _(msg`Data Posts`),
        href: `/dashboard/projects/${projectId}/manage/data-posts`,
        hidden: true,
      },
      {
        label: _(msg`Credit Issuance`),
        href: `/dashboard/projects/${projectId}/manage/credit-issuance`,
        hidden: true,
      },
      {
        label: _(msg`Manage Credits`),
        href: `/dashboard/projects/${projectId}/manage/manage-credits`,
        hidden: true,
      },
      {
        label: _(msg`Collaborators`),
        href: `/dashboard/projects/${projectId}/manage/collaborators`,
      },
    ],
    [_, projectId],
  );

  const activeTab = useMemo(
    () =>
      Math.max(
        tabs
          .filter(tab => !tab.hidden)
          .findIndex(tab => location.pathname.includes(tab.href ?? '')),
        0,
      ),
    [tabs, location.pathname],
  );

  const { migrateProject } = useMigrateProject(project);

  const { canAccessManageProject, role } = useCanAccessManageProjectWithRole({
    onChainProject,
    offChainProject,
    activeAccountId,
    wallet,
  });

  const { canEdit: canEditProject } = getCanEditProject({
    role,
  });
  const canCreatePost = canEditProject || role === ROLE_AUTHOR;

  if (isLoading) return <Loading />;

  if (!isLoading && !canAccessManageProject) return null; // TODO show 403 page (design?) or navigate back to My Projects

  return (
    <>
      {project && (
        <ProjectDashboardBanner
          project={project}
          canEdit={canEditProject}
          canCreatePost={canCreatePost}
          onCreatePost={() => {
            setPostProjectId(project.id);
            setPostOffChainProjectId(project.offChainId);
            setPostProjectName(project.name);
            setPostProjectSlug(project.slug);
          }}
          createPostDisabled={createPostDisabled}
          createPostTooltipText={
            loginDisabled
              ? _(NOT_SUPPORTED_TOOLTIP_TEXT)
              : _(CREATE_POST_DISABLED_TOOLTIP_TEXT)
          }
          // We need an offchain ID to migrate
          migrateProject={project.offChainId ? migrateProject : undefined}
        />
      )}

      {/* Tabs section */}
      <div className="w-full py-30 md:mb-8 lg:mb-0">
        <IconTabs
          aria-label={_(msg`manage project tabs`)}
          tabs={tabs}
          activeTab={activeTab}
          linkComponent={Link}
          mobileFullWidth
        />
      </div>

      {/* Content section */}
      <div className="p-30 border border-bc-neutral-300 border-solid rounded-lg bg-bc-neutral-0">
        <Outlet context={{ project, isLoading }} />
      </div>

      {canCreatePost && postProjectId && (
        <PostFlow
          onModalClose={() => {
            setPostProjectId(undefined);
            setPostOffChainProjectId(undefined);
            setPostProjectName(undefined);
            setPostProjectSlug(undefined);
          }}
          projectLocation={project?.location as GeocodeFeature}
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

export default ManageProject;
