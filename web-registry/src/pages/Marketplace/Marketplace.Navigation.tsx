import { Box } from '@mui/system';
import { Outlet, useLocation } from 'react-router-dom';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';
import { Link } from '../../components/atoms';
import { marketplaceNavigationItems } from './Marketplace.config';

export const MarketplaceNavigation = () => {
  const location = useLocation();

  return (
    <Section>
      <Box component="nav" sx={{ mb: 14.5 }}>
        <Box component="ul" sx={{ display: 'flex', listStyle: 'none', pl: 0 }}>
          {marketplaceNavigationItems.map(({ label, href }) => (
            <Box
              component="li"
              key={label}
              sx={{
                mr: 19.5,
                pb: 1.75,
                borderBottom: '3px solid',
                borderColor:
                  location.pathname === href ? 'secondary.main' : 'transparent',
              }}
            >
              <Link href={href} sx={{ color: 'primary.light' }}>
                <Title variant="h4">{label}</Title>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      <Outlet />
    </Section>
  );
};
