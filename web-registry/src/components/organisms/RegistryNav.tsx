import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';
import { projects } from '../../mocks';
import { CreditClassDropdownItem, MethodologyDropdownItem } from '../molecules';
import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';

const RegistryNav: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
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
      dropdownItems: [
        {
          title: 'CarbonPlus Credits',
          href: '/TODO:',
          render: () => (
            <CreditClassDropdownItem
              isPeerReviewed
              methodology="Grasslands"
              title="Carbon<i>Plus</i> Credits"
              href="/TODO"
              svg={Cow}
            />
          ),
        },
      ],
    },
    {
      title: 'Methodologies',
      dropdownItems: [
        {
          title: 'CarbonPlus Grasslands',
          href: '/TODO:',
          render: () => (
            <MethodologyDropdownItem
              isPeerReviewed
              href="/todo"
              title="Carbon<i>Plus</i> Grasslands"
              svg={Cow}
            />
          ),
        },
      ],
    },
    // {
    //   title: 'Program',
    //   dropdownItems: [{ title: 'program' }],
    // },
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
