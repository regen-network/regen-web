import { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useAtom } from 'jotai';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';
import { projectsCurrentStepAtom } from 'legacy-pages/ProjectCreate/ProjectCreate.store';

import { IconTabs } from 'web-components/src/components/tabs/IconTabs';

import { Link } from 'components/atoms';
import { PostFlow } from 'components/organisms/PostFlow/PostFlow';
import ProjectDashboardBanner from 'components/organisms/ProjectDashboardBanner/ProjectDashboardBanner';

import { useFetchProject } from './hooks/useFetchProject';
import { useAuth } from 'lib/auth/auth';

const ManageProject = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const { _ } = useLingui();
  const location = useLocation();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);
  const { activeAccountId } = useAuth();
  const { project, isLoading } = useFetchProject();

  const canEditProject = true; // TODO
  const canCreatePost = true; // TODO
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

  const { migrateProjects } = useMigrateProjects([project]);

  const migrateProject = useCallback(async () => {
    await migrateProjects({
      selectedProjectIds: [project.id],
    });
  }, [migrateProjects, project.id]);

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

      {postProjectId && (
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
