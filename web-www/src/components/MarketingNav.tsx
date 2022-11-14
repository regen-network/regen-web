import React from 'react';
import { useTheme } from '@mui/styles';
import Header, {
  HeaderColors,
} from '@regen-network/web-components/lib/components/header';
import { HeaderDropdownItemProps } from '@regen-network/web-components/lib/components/header/HeaderDropdownItems';
import { HeaderMenuItem } from '@regen-network/web-components/lib/components/header/HeaderMenuHover';
import { NavLink } from '@regen-network/web-components/lib/components/header/NavLink';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { PageProps } from 'gatsby';

// import RegistryIcon from '../../static/media/svgs/nav-dropdown/registry.svg';
import BuyersIcon from '../../static/media/svgs/nav-dropdown/buyers.svg';
import DevelopersIcon from '../../static/media/svgs/nav-dropdown/developers.svg';
import LandStewardsIcon from '../../static/media/svgs/nav-dropdown/land-stewards.svg';
import ScientistIcon from '../../static/media/svgs/nav-dropdown/scientists.svg';
import ValidatorsIcon from '../../static/media/svgs/nav-dropdown/validators.svg';

interface BoolProps {
  [key: string]: boolean;
}

const MarketingNav: React.FC<{ location: PageProps['location'] }> = ({
  location,
}) => {
  const { pathname } = location;
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
    '/nct/': theme.palette.primary.main,
  };

  const headerTransparent: BoolProps = {
    '/faq/': false,
  };

  // Links in rest of the site must use the trailing '/'
  // in order for these to work appropriately
  const headerNoBorderBottomPages: RegExp = new RegExp(
    '//|/partners/|/contact/|/validators/|/resources/|/media/|/team/|/developers/|/science/|/case-studies/|/press-kit/|/community/|/wallet-address-registration/|/mainnet/|/nct/|/token/|/fund/|/case-studies/[a-z-]+//',
  );

  const standardItems: HeaderDropdownItemProps[] = [
    {
      pathname,
      title: 'Program Guide',
      href: 'https://library.regen.network/v/regen-registry-program-guide/',
      linkComponent: NavLink,
    },
  ];

  const howToItems: HeaderDropdownItemProps[] = [
    // {
    //   title: 'Create a Credit Class',
    //   href: 'https://app.regen.network/create-credit-class/',
    //   linkComponent: NavLink,
    // },
    {
      pathname,
      title: 'Create a Methodology',
      href: 'https://app.regen.network/create-methodology/',
      linkComponent: NavLink,
    },
    {
      pathname,
      title: 'Methodology Review Process',
      href: 'https://app.regen.network/methodology-review-process/',
      linkComponent: NavLink,
    },
  ];

  const stakeholderItemsRegistry: HeaderDropdownItemProps[] = [
    {
      pathname,
      title: 'Buyers',
      href: 'https://app.regen.network/buyers/',
      svg: BuyersIcon,
      linkComponent: NavLink,
    },
    {
      pathname,
      title: 'Land Stewards',
      href: 'https://app.regen.network/land-stewards/',
      svg: LandStewardsIcon,
      linkComponent: NavLink,
    },
  ];

  const stakeholderItemsCommunity: HeaderDropdownItemProps[] = [
    {
      pathname,
      title: 'Developers',
      href: '/developers/',
      svg: DevelopersIcon,
      linkComponent: NavLink,
    },
    {
      pathname,
      title: 'Scientists',
      href: '/science/',
      svg: ScientistIcon,
      linkComponent: NavLink,
    },
    {
      pathname,
      title: 'Validators',
      href: '/validators/',
      svg: ValidatorsIcon,
      linkComponent: NavLink,
    },
  ];

  const mobileProgramItems: HeaderDropdownItemProps[] = [
    {
      pathname,
      title: 'Registry Homepage',
      href: 'https://app.regen.network/',
      linkComponent: NavLink,
    },
    ...standardItems,
    ...howToItems,
  ];

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'NCT',
      href: '/nct/',
    },
    {
      title: 'Program',
      dropdownItems: mobileProgramItems,
    },
    {
      title: 'Stakeholders',
      dropdownItems: [
        ...stakeholderItemsRegistry,
        ...stakeholderItemsCommunity,
      ],
    },
    {
      title: 'Blockchain',
      dropdownItems: [
        {
          pathname,
          title: 'Mainnet',
          href: '/mainnet/',
          linkComponent: NavLink,
        },
        { pathname, title: 'Token', href: '/token/', linkComponent: NavLink },
        {
          pathname,
          title: 'Community',
          href: '/community/',
          linkComponent: NavLink,
        },
      ],
    },
    {
      title: 'Learn More',
      dropdownItems: [
        {
          pathname,
          title: 'Case Studies',
          href: '/case-studies/',
          linkComponent: NavLink,
        },
        {
          pathname,
          title: 'Resources',
          href: '/resources/',
          linkComponent: NavLink,
        },
        { pathname, title: 'FAQ', href: '/faq/', linkComponent: NavLink },
        { pathname, title: 'Team', href: '/team/', linkComponent: NavLink },
        { pathname, title: 'Fund', href: '/fund/', linkComponent: NavLink },
        {
          pathname,
          title: 'Careers',
          href: 'https://regennetwork.notion.site/Careers-at-Regen-Network-fe7d9645a39843cfb7eaceb7171d95af',
          linkComponent: NavLink,
        },
      ],
    },
  ];

  const desktopColor: string =
    headerColors[location.pathname] ?? theme.palette.primary.light;
  const transparent: boolean = headerTransparent[location.pathname] ?? true;

  return (
    <>
      <Header
        menuItems={menuItems}
        transparent={transparent}
        absolute={
          location.pathname === '/' ||
          headerNoBorderBottomPages.test(location.pathname)
        }
        color={desktopColor}
        borderBottom={
          location.pathname !== '/' &&
          !headerNoBorderBottomPages.test(location.pathname)
        }
        pathname={location.pathname}
      />
    </>
  );
};

export { MarketingNav };
