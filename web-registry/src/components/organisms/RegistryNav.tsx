import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';
import { projects } from '../../mocks';
import { CreditClassDropdownItem, MethodologyDropdownItem } from '../molecules';
import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';

const RegistryNav: React.FC = () => {
  const { pathname } = useLocation();
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
  ];

  const headerColors: HeaderColors = {
    '/certificate': theme.palette.primary.main,
  };

  return (
    <Header
      isRegistry
      menuItems={menuItems}
      color={headerColors[pathname] ? headerColors[pathname] : theme.palette.primary.light}
      transparent={pathname === '/certificate'}
      absolute={pathname === '/certificate'}
      borderBottom={pathname !== '/certificate'}
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
};

export { RegistryNav };
