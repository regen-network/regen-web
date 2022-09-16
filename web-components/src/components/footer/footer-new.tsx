import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box, Grid, Link, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/styles';

import { HeaderLogoLink } from '../header/HeaderLogoLink';
import CoinGeckoIcon from '../icons/CoinGeckoIcon';
import Section from '../section';
import { Body, Label } from '../typography';
import { SocialLinks } from './SocialLinks';

export interface LinkItem {
  href: string;
  target?: '_blank' | '_self' | string;
}

interface FooterItemItem extends LinkItem {
  title: string;
}

export interface FooterItemProps {
  title: string;
  items: FooterItemItem[];
  linkComponent?: React.FC<{ href: string }>;
}

const FooterItem: React.FC<FooterItemProps> = ({
  title,
  items,
  linkComponent: LinkComponent = Link,
}) => {
  return (
    <>
      <Label size="lg" mobileSize="sm" sx={{ mb: { xs: 3.5, sm: 3.75 } }}>
        {ReactHtmlParser(title)}
      </Label>
      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <ListItem sx={{ py: 0.75, px: 0 }} key={index}>
            <Box
              component={'span'}
              sx={{ typography: ['textMedium', 'textLarge'] }}
            >
              <LinkComponent
                style={{ fontWeight: 'normal' }}
                href={item.href}
                rel="noopener noreferrer"
                target={item.target}
              >
                {ReactHtmlParser(item.title)}
              </LinkComponent>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const Footer: React.FC<{
  footerItems: [
    FooterItemProps,
    FooterItemProps,
    FooterItemProps,
    FooterItemProps,
  ];
  termsUrl: string;
  privacyUrl: string;
  iconLink?: React.FC<{ color: string }>;
  linkComponent?: React.FC<{ href: string }>;
}> = ({
  footerItems,
  termsUrl,
  privacyUrl,
  linkComponent: LinkComponent = Link,
  iconLink: IconLink = HeaderLogoLink,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'info.dark',
        color: 'primary.main',
        '& a': {
          fontWeight: 'normal',
          transition: 'color 200ms ease-in-out',
          ':hover': {
            color: 'info.contrastText',
          },
        },
      }}
    >
      <Section>
        <Grid container spacing={10} sx={{ mt: 3 }}>
          <Grid item xs={12} lg={4}>
            <Box
              pb={[0, 8]}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <IconLink color={theme.palette.primary.main} />
              <Box mt={4}>
                <Body size="lg" color="primary">
                  A project of{' '}
                  <Link
                    href="https://www.regen.network"
                    sx={{ color: 'secondary.main' }}
                  >
                    Regen Network
                    <br /> Development, Inc.
                  </Link>
                </Body>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ mt: 5 }}>
            <FooterItem
              title={footerItems[0].title}
              items={footerItems[0].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ mt: 5 }}>
            <FooterItem
              title={footerItems[1].title}
              items={footerItems[1].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ mt: 5 }}>
            <FooterItem
              title={footerItems[2].title}
              items={footerItems[2].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ mt: 5 }}>
            <FooterItem
              title={footerItems[3].title}
              items={footerItems[3].items}
              linkComponent={LinkComponent}
            />
          </Grid>
        </Grid>

        <Box mt={[10, 20]}>
          <SocialLinks />
        </Box>
        <Box
          component="hr"
          sx={{
            borderTop: 1,
            borderColor: 'grey.50',
            mt: 10,
          }}
        />
        <Grid
          sx={{
            mt: { xs: 6, sm: 8.25 },
            mb: { xs: 9, sm: 8.25 },
          }}
          container
          justifyContent="space-between"
        >
          <Grid item>
            <Body styleLinks={false} color="primary">
              <LinkComponent href={termsUrl}>Terms</LinkComponent> |{' '}
              <LinkComponent href={privacyUrl}>Privacy</LinkComponent>
            </Body>
          </Grid>
          <Grid item>
            <Body styleLinks={false} color="primary" size="sm" sx={{ mr: 1.5 }}>
              <LinkComponent
                href={'https://www.coingecko.com/'}
                target="_blank"
                rel="noreferrer"
                sx={{ display: 'flex' }}
              >
                data provided by <CoinGeckoIcon sx={{ width: 80 }} />
              </LinkComponent>
            </Body>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
};

export { Footer };
