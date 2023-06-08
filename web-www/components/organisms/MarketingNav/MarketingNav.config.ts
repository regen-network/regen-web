import { HeaderColors } from 'web-components/lib/components/header';
import { Item } from 'web-components/lib/components/header/components/HeaderMenuItem/HeaderMenuItem';
import { Theme } from 'web-components/lib/theme/muiTheme';

interface BoolProps {
  [key: string]: boolean;
}

export const getHeaderColors = (theme: Theme): HeaderColors => ({
  '/': theme.palette.primary.main,
  '/resources': theme.palette.primary.main,
  '/privacy-policy': theme.palette.primary.light,
  '/terms-service': theme.palette.primary.light,
  '/team': theme.palette.primary.light,
  '/developers': theme.palette.primary.main,
  '/science': theme.palette.primary.main,
  '/validators': theme.palette.primary.main,
  '/community': theme.palette.primary.main,
  '/wallet-address-registration': theme.palette.primary.light,
  '/mainnet': theme.palette.primary.light,
  '/token': theme.palette.primary.main,
});

export const headerTransparent: BoolProps = {
  '/faq/[header]': false,
};

// Links in rest of the site must use the trailing '/'
// in order for these to work appropriately
export const headerNoBorderBottomPages = [
  '/',
  '/partners',
  '/contact',
  '/validators',
  '/resources',
  '/media',
  '/team',
  '/developers',
  '/science',
  '/case-studies',
  '/press-kit',
  '/community',
  '/wallet-address-registration',
  '/mainnet',
  '/token',
  '/fund',
  '/case-studies',
];

export const menuItems: Item[] = [
  {
    title: 'NCT',
    href: 'https://regennetwork.notion.site/A-Guide-to-Nature-Carbon-Ton-NCT-8204ea9d20d0436281f49b8fd1b3fbd2',
  },
  {
    title: 'Corporate buying',
    href: 'https://app.regen.network/buyers/',
  },
  {
    title: 'Project developers',
    href: 'https://app.regen.network/land-stewards/',
  },
  {
    title: 'Registry',
    href: 'https://regennetwork.notion.site/Welcome-to-Regen-Registry-0d55aab2a2d64f27aee2a468df172990',
  },
];
