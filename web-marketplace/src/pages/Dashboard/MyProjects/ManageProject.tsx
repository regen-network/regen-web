import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';

//import { useAuth } from 'lib/auth/auth';
//import { useWallet } from 'lib/wallet/wallet';
import { Link } from 'components/atoms';

import { CollaboratorsManagement } from './components/Collaborators';
//import { useFetchProjectByAdmin } from './hooks/useFetchProjectsByAdmin';

const ManageProject = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const { _ } = useLingui();
  const location = useLocation();

  // Ucomment code when project banner is being implemented
  // const { activeAccountId, activeAccount } = useAuth();
  // const { wallet, loginDisabled } = useWallet();

  // const { adminProjects } = useFetchProjectByAdmin({
  //   adminAccountId: activeAccountId,
  //   adminAddress: loginDisabled ? wallet?.address : activeAccount?.addr,
  //   keepUnpublished: true,
  // });

  // const project = adminProjects?.find(p => p.id === projectId);

  // const canEditProject = true; // Replace with actual admin/editor check logic

  const tabs = useMemo(
    () => [
      {
        label: _(msg`Data Posts`),
        href: `/dashboard/projects/${projectId}/manage/posts`,
        disabled: true,
      },
      {
        label: _(msg`Collaborators`),
        href: `/dashboard/projects/${projectId}/manage/collaborators`,
      },
      {
        label: _(msg`Project Portfolio`),
        href: `/dashboard/projects/${projectId}/manage/projectportfolio`,
        disabled: true,
      },
    ],
    [_, projectId],
  );

  const activeTab = useMemo(() => {
    const index = tabs.findIndex(tab => location.pathname.includes(tab.href));
    return Math.max(index, 0);
  }, [tabs, location.pathname]);

  const getCurrentTabContent = () => {
    if (location.pathname.includes('/posts')) return 0;
    if (location.pathname.includes('/collaborators')) return 1;
    if (location.pathname.includes('/projectportfolio')) return 2;
    return 0;
  };

  const currentTab = getCurrentTabContent();

  const renderDataPostsContent = () => (
    <div>
      <Title variant="h4" className="mb-20">
        {_(msg`Data Posts`)}
      </Title>
      <p>Coming soon...</p>
    </div>
  );

  const renderCollaboratorsContent = () => (
    <CollaboratorsManagement
      onInvite={() => {
        // Implement invitation flow
      }}
      onRoleChange={(collaboratorId, newRole) => {
        console.log(`Changed role for ${collaboratorId} to ${newRole}`);
        // Update role in your backend
      }}
      onRemove={collaboratorId => {
        console.log(`Removing collaborator ${collaboratorId}`);
        // Remove collaborator from your backend
      }}
    />
  );

  const renderPortfolioContent = () => (
    <div>
      <Title variant="h4" className="mb-20">
        {_(msg`Project Portfolio`)}
      </Title>
      <p>Coming soon...</p>
    </div>
  );

  return (
    <>
      {/* {project && <ProjectBanner project={project} canEdit={canEditProject} />} */}

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
      <div
        className="p-30 border border-bc-neutral-300 rounded-lg bg-bc-neutral-0"
        style={{ border: '1px solid #D2D5D9' }}
      >
        {currentTab === 0 && renderDataPostsContent()}
        {currentTab === 1 && renderCollaboratorsContent()}
        {currentTab === 2 && renderPortfolioContent()}
      </div>
    </>
  );
};

export default ManageProject;
