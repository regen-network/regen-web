import { useMemo, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useAtom } from 'jotai';
import { projectsCurrentStepAtom } from 'legacy-pages/ProjectCreate/ProjectCreate.store';

import { IconTabs } from 'web-components/src/components/tabs/IconTabs';

//import { useAuth } from 'lib/auth/auth';
//import { useWallet } from 'lib/wallet/wallet';
import { Link } from 'components/atoms';
import { PostFlow } from 'components/organisms/PostFlow/PostFlow';
import ProjectDashboardBanner from 'components/organisms/ProjectDashboardBanner/ProjectDashboardBanner';

import { useFetchProject } from './hooks/useFetchProject';

const ManageProject = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const { _ } = useLingui();
  const location = useLocation();
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);

  const { project, isLoading } = useFetchProject();
  console.log('project in ManageProject', project);
  // Ucomment code when project banner is being implemented
  // const { activeAccountId, activeAccount } = useAuth();
  // const { wallet, loginDisabled } = useWallet();
  const canEditProject = true; // TODO

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

  return (
    <>
      {project && (
        <ProjectDashboardBanner project={project} canEdit={canEditProject} />
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
        <Outlet />
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
