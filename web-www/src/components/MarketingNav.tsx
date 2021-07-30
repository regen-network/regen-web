import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Header, { HeaderColors, HeaderMenuItem } from 'web-components/lib/components/header';
import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';
import CookiesFooter from 'web-components/lib/components/banner/CookiesBanner';
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
  const theme = useTheme();
  const headerColors: HeaderColors = {
    '/': theme.palette.primary.main,
    '/land-stewards/': theme.palette.primary.main,
    '/buyers/': theme.palette.primary.light,
    '/resources/': theme.palette.primary.main,
    '/privacy-policy/': theme.palette.primary.light,
    '/terms-service/': theme.palette.primary.light,
    '/team/': theme.palette.primary.light,
    '/developers/': theme.palette.primary.main,
    '/invest/': theme.palette.primary.light,
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
    '//|/buyers/|/partners/|/contact/|/validators/|/land-stewards/|/resources/|/media/|/team/|/developers/|/science/|/invest/|/case-studies/|/press-kit/|/community/|/wallet-address-registration/|/mainnet/|/token/|/case-studies/[a-z-]+//',
  );

  const standardItems: HeaderDropdownItemProps[] = [
    { title: 'Program Guide', href: 'https://registry.regen.network/program-guide/' },
  ];

  const howToItems: HeaderDropdownItemProps[] = [
    {
      title: 'Create a Credit Class',
      href: 'https://registry.regen.network/create-credit-class/',
    },
    {
      title: 'Create a Methodology',
      href: 'https://registry.regen.network/create-a-methodology/',
    },
    {
      title: 'Methodology Review Process',
      href: 'https://registry.regen.network/methodology-review-process/',
    },
  ];

  const stakeholderItemsRegistry: HeaderDropdownItemProps[] = [
    { title: 'Buyers', href: '/buyers/', svg: BuyersIcon },
    { title: 'Land Stewards', href: '/land-stewards/', svg: LandStewardsIcon },
  ];

  const stakeholderItemsCommunity: HeaderDropdownItemProps[] = [
    { title: 'Developers', href: '/developers/', svg: DevelopersIcon },
    { title: 'Scientists', href: '/science/', svg: ScientistIcon },
    { title: 'Validators', href: '/validators/', svg: ValidatorsIcon },
  ];

  const mobileProgramItems: HeaderDropdownItemProps[] = [
    { title: 'Registry Homepage', href: 'https://registry.regen.network/' },
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
            <HeaderDropdownItem title="Homepage" href="https://registry.regen.network" svg={RegistryIcon} />
            <Box mt={4}>
              <HeaderDropdownColumn title="Standard" items={standardItems} />
            </Box>
          </Box>
          <Box>
            <HeaderDropdownColumn title="How Tos" items={howToItems} />
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
            <HeaderDropdownColumn title="Registry" items={stakeholderItemsRegistry} />
          </Box>
          <Box>
            <HeaderDropdownColumn title="Community" items={stakeholderItemsCommunity} />
          </Box>
        </Box>
      ),
    },
    {
      title: 'Blockchain',
      dropdownItems: [
        { title: 'Mainnet', href: '/mainnet/' },
        { title: 'Token', href: '/token/' },
      ],
    },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/case-studies/' },
        { title: 'Resources', href: '/resources/' },
        { title: 'FAQ', href: '/faq/' },
        { title: 'Team', href: '/team/' },
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
