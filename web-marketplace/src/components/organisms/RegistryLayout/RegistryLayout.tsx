import { Outlet, useLocation } from 'react-router-dom';

import { LayoutFooter } from 'components/layout/Layout.Footer';
import { LayoutHeader } from 'components/layout/Layout.Header';

type RegistryLayoutProps = {
  showHeaderFooter?: boolean;
};

export const RegistryLayout = ({
  showHeaderFooter = false,
}: RegistryLayoutProps) => {
  const { pathname } = useLocation();
  const isFullScreen =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/organizations/create') ||
    pathname.startsWith('/project-pages/');

  if (!showHeaderFooter) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col">
      {!isFullScreen && <LayoutHeader />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isFullScreen && <LayoutFooter />}
    </div>
  );
};
