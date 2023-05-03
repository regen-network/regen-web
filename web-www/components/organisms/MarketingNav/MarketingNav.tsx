import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Header, { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/components/HeaderMenuHover/HeaderMenuHover';
import { Theme } from 'web-components/lib/theme/muiTheme';

interface BoolProps {
  [key: string]: boolean;
}

type Props = {
  location: { pathname: string };
};

const MarketingNav = ({ location }: Props) => {
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

  const menuItems: HeaderMenuItem[] = [
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
        websiteExtras={
          <Box display="flex" justifyContent="center" alignItems="center">
            <ContainedButton
              size="small"
              href="https://app.regen.network/projects"
            >
              explore credits
            </ContainedButton>
          </Box>
        }
      />
    </>
  );
};

export { MarketingNav };
