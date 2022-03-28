import React from 'react';
import { useTheme } from '@mui/styles';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Header, { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/HeaderMenuHover';
import { NavLink } from 'web-components/lib/components/header/NavLink';
import {
  HeaderDropdownColumn,
  HeaderDropdownItem,
  HeaderDropdownItemProps,
} from 'web-components/lib/components/header/HeaderDropdownItems';

import RegistryIcon from '../../static/media/svgs/nav-dropdown/registry.svg';
import BuyersIcon from '../../static/media/svgs/nav-dropdown/buyers.svg';
import LandStewardsIcon from '../../static/media/svgs/nav-dropdown/land-stewards.svg';
import DevelopersIcon from '../../static/media/svgs/nav-dropdown/developers.svg';
import ScientistIcon from '../../static/media/svgs/nav-dropdown/scientists.svg';
import ValidatorsIcon from '../../static/media/svgs/nav-dropdown/validators.svg';

interface BoolProps {
  [key: string]: boolean;
}

const MarketingNav: React.FC<{ location: Location }> = ({ location }) => {
  const theme = useTheme<Theme>();
  const headerColors: HeaderColors = {
    '/': theme.palette.primary.main,
    '/resources/': theme.palette.primary.main,
    '/privacy-policy/': theme.palette.primary.light,
    '/terms-service/': theme.palette.primary.light,
    '/team/': theme.palette.primary.light,
    '/developers/': theme.palette.primary.main,
    '/science/': theme.palette.primary.main,
    '/validators/': theme.palette.primary.main,
    '/community/': theme.palette.primary.main,
    '/wallet-address-registration/': theme.palette.primary.light,
    '/mainnet/': theme.palette.primary.light,
    '/token/': theme.palette.primary.main,
  };

  const headerTransparent: BoolProps = {
    '/faq/': false,
  };

  // Links in rest of the site must use the trailing '/'
  // in order for these to work appropriately
  const headerNoBorderBottomPages: RegExp = new RegExp(
    '//|/partners/|/contact/|/validators/|/resources/|/media/|/team/|/developers/|/science/|/case-studies/|/press-kit/|/community/|/wallet-address-registration/|/mainnet/|/token/|/fund/|/case-studies/[a-z-]+//',
  );

  const standardItems: HeaderDropdownItemProps[] = [
    {
      title: 'Program Guide',
      href: 'https://library.regen.network/v/regen-registry-program-guide/',
      linkComponent: NavLink,
    },
  ];

  const howToItems: HeaderDropdownItemProps[] = [
    // {
    //   title: 'Create a Credit Class',
    //   href: 'https://registry.regen.network/create-credit-class/',
    //   linkComponent: NavLink,
    // },
    {
      title: 'Create a Methodology',
      href: 'https://registry.regen.network/create-methodology/',
      linkComponent: NavLink,
    },
    {
      title: 'Methodology Review Process',
      href: 'https://registry.regen.network/methodology-review-process/',
      linkComponent: NavLink,
    },
  ];

  const stakeholderItemsRegistry: HeaderDropdownItemProps[] = [
    {
      title: 'Buyers',
      href: 'https://registry.regen.network/buyers/',
      svg: BuyersIcon,
      linkComponent: NavLink,
    },
    {
      title: 'Land Stewards',
      href: 'https://registry.regen.network/land-stewards/',
      svg: LandStewardsIcon,
      linkComponent: NavLink,
    },
  ];

  const stakeholderItemsCommunity: HeaderDropdownItemProps[] = [
    { title: 'Developers', href: '/developers/', svg: DevelopersIcon, linkComponent: NavLink },
    { title: 'Scientists', href: '/science/', svg: ScientistIcon, linkComponent: NavLink },
    { title: 'Validators', href: '/validators/', svg: ValidatorsIcon, linkComponent: NavLink },
  ];

  const mobileProgramItems: HeaderDropdownItemProps[] = [
    { title: 'Registry Homepage', href: 'https://registry.regen.network/', linkComponent: NavLink },
    ...standardItems,
    ...howToItems,
  ];

  const STACKED_COL_SPACE = 12;

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Program',
      dropdownItems: mobileProgramItems,
      render: () => (
        <Box display="flex">
          <Box mr={STACKED_COL_SPACE}>
            <HeaderDropdownItem
              title="Homepage"
              href="https://registry.regen.network"
              svg={RegistryIcon}
              linkComponent={NavLink}
            />
            <Box mt={4}>
              <HeaderDropdownColumn title="Standard" items={standardItems} linkComponent={NavLink} />
            </Box>
          </Box>
          <Box>
            <HeaderDropdownColumn title="How Tos" items={howToItems} linkComponent={NavLink} />
          </Box>
        </Box>
      ),
    },
    {
      title: 'Stakeholders',
      dropdownItems: [...stakeholderItemsRegistry, ...stakeholderItemsCommunity],
      render: () => (
        <Box display="flex">
          <Box mr={STACKED_COL_SPACE}>
            <HeaderDropdownColumn title="Registry" items={stakeholderItemsRegistry} linkComponent={NavLink} />
          </Box>
          <Box>
            <HeaderDropdownColumn
              title="Community"
              items={stakeholderItemsCommunity}
              linkComponent={NavLink}
            />
          </Box>
        </Box>
      ),
    },
    {
      title: 'Blockchain',
      dropdownItems: [
        { title: 'Mainnet', href: '/mainnet/', linkComponent: NavLink },
        { title: 'Token', href: '/token/', linkComponent: NavLink },
        {
          title: 'Community',
          href: '/community/',
          linkComponent: NavLink,
        },
      ],
    },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/case-studies/', linkComponent: NavLink },
        { title: 'Resources', href: '/resources/', linkComponent: NavLink },
        { title: 'FAQ', href: '/faq/', linkComponent: NavLink },
        { title: 'Team', href: '/team/', linkComponent: NavLink },
        { title: 'Fund', href: '/fund/', linkComponent: NavLink },
        { title: 'Careers', href: 'https://apply.workable.com/regen-network/', linkComponent: NavLink },
      ],
    },
  ];

  const desktopColor: string = headerColors[location.pathname] ?? theme.palette.primary.light;
  const transparent: boolean = headerTransparent[location.pathname] ?? true;

  return (
    <>
      <Header
        menuItems={menuItems}
        transparent={transparent}
        absolute={location.pathname === '/' || headerNoBorderBottomPages.test(location.pathname)}
        color={desktopColor}
        borderBottom={location.pathname !== '/' && !headerNoBorderBottomPages.test(location.pathname)}
        pathName={location.pathname}
      />
    </>
  );
};

export { MarketingNav };
