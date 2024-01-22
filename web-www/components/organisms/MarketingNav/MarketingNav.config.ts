import { HeaderColors } from 'web-components/src/components/header';
import { Item } from 'web-components/src/components/header/components/HeaderMenuItem/HeaderMenuItem';
import { Theme } from 'web-components/src/theme/muiTheme';

interface BoolProps {
  [key: string]: boolean;
}

export const getHeaderColors = (theme: Theme): HeaderColors => ({
  '/': theme.palette.primary.main,
  '/resources': theme.palette.primary.main,
  '/privacy-policy': theme.palette.primary.light,
  '/terms-service': theme.palette.primary.light,
  '/developers': theme.palette.primary.main,
  '/science': theme.palette.primary.main,
  '/validators': theme.palette.primary.main,
  '/community': theme.palette.primary.main,
  '/wallet-address-registration': theme.palette.primary.light,
  '/mainnet': theme.palette.primary.light,
  '/token': theme.palette.primary.main,
  '/buyers': theme.palette.primary.light,
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
  '/buyers',
];

export const menuItems: Item[] = [
  {
    title: 'Corporate buying',
    href: '/buyers',
  },
  {
    title: 'Registry',
    href: 'https://registry.regen.network/',
  },
];
