import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';

import ProjectBanner from './components/ProjectBanner';
import { useFetchProjectByAdmin } from './hooks/useFetchProjectsByAdmin';

const ManageProject = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const { _ } = useLingui();
  const location = useLocation();
  const { activeAccountId, activeAccount } = useAuth();
  const { wallet, loginDisabled } = useWallet();

  const { adminProjects } = useFetchProjectByAdmin({
    adminAccountId: activeAccountId,
    adminAddress: loginDisabled ? wallet?.address : activeAccount?.addr,
    keepUnpublished: true,
  });

  const project = adminProjects?.find(p => p.id === projectId);

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
    return 1;
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
    <div>
      <Title variant="h4" className="mb-20">
        {_(msg`Collaborators`)}
      </Title>
      <p>Collaborator management will be implemented here.</p>
    </div>
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
      {/* Project Banner */}
      {project && <ProjectBanner project={project} />}

      {/* Tabs section */}
      <div className="w-full mb-20 md:mb-8 lg:mb-0">
        <IconTabs
          aria-label={_(msg`manage project tabs`)}
          tabs={tabs}
          activeTab={activeTab}
          linkComponent={Link}
          mobileFullWidth
        />
      </div>

      {/* Content section */}
      <div className="p-30">
        {currentTab === 0 && renderDataPostsContent()}
        {currentTab === 1 && renderCollaboratorsContent()}
        {currentTab === 2 && renderPortfolioContent()}
      </div>
    </>
  );
};

export default ManageProject;
