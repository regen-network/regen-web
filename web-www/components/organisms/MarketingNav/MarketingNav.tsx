import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Header from 'web-components/src/components/header';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  getHeaderColors,
  headerNoBorderBottomPages,
  headerTransparent,
  menuItems,
} from './MarketingNav.config';

type Props = {
  location: { pathname: string };
};

const MarketingNav = ({ location }: Props) => {
  const theme = useTheme<Theme>();
  const headerColors = getHeaderColors(theme);

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
          headerNoBorderBottomPages.includes(location.pathname)
        }
        color={desktopColor}
        borderBottom={
          location.pathname !== '/' &&
          !headerNoBorderBottomPages.includes(location.pathname)
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
