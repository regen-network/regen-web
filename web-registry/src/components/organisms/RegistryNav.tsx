import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@material-ui/core/styles';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';
import { projects } from '../../mocks';
import { CreditClassDropdown, MethodologyDropdown, ProgramDropdown } from '../molecules';
import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';

const RegistryNav: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const theme = useTheme();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const projectDropdownItems: HeaderMenuItem['dropdownItems'] = projects.map(p => ({
    title: p.name,
    href: `/projects/${p.id}`,
  }));

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      dropdownItems: projectDropdownItems,
    },
    {
      title: 'Credit Classes',
      render: () => (
        <CreditClassDropdown
          carbonPlusCredits={[{ title: 'Grasslands', to: '/TODO', svg: Cow, isPeerReviewed: true }]}
        />
      ),
    },
    {
      title: 'Methodologies',
      render: () => (
        <MethodologyDropdown
          methodologies={[
            { title: 'Carbon<i>Plus</i> Grasslands', isPeerReviewed: true, svg: Cow, to: '/TODO' },
          ]}
        />
      ),
    },
    {
      title: 'Program',
      render: () => (
        <ProgramDropdown
          standardLinks={[
            { to: '/program-guide', title: 'Program Guide' },
            // { to: '/process', title: 'Process' },
          ]}
          howToLinks={[
            { to: '/create-credit-class', title: 'Create Credit Class' },
            { to: '/create-methodology', title: 'Create a Methodology' },
            { to: '/methodology-review-process', title: 'Methodology Review Process' },
            // { to: '/become-a-monitor', title: 'Become a Monitor' },
            // { to: '/become-a-verifier', title: 'Become a Verifier' },
          ]}
        />
      ),
    },
  ];

  const headerColors: HeaderColors = {
    '/certificate': theme.palette.primary.main,
    '/create-methodology': theme.palette.primary.main,
    '/create-credit-class': theme.palette.primary.main,
    '/methodology-review-process': theme.palette.primary.main,
  };

  const isTransparent = [
    '/create-methodology',
    '/methodology-review-process',
    '/create-credit-class',
    '/certificate',
  ].some(route => pathname.startsWith(route));

  return (
    <Header
      isRegistry
      isAuthenticated={isAuthenticated}
      onLogin={() => loginWithRedirect({ redirectUri: window.location.origin })}
      onLogout={() => logout({ returnTo: window.location.origin })}
      onSignup={() => history.push('/signup')}
      menuItems={menuItems}
      color={headerColors[pathname] ? headerColors[pathname] : theme.palette.primary.light}
      transparent={isTransparent}
      absolute={isTransparent}
      borderBottom={!isTransparent}
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
};

export { RegistryNav };
