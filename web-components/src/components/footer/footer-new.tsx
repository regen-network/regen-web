import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useTheme } from '@mui/styles';
import { Grid, List, ListItem, Link, Box, Typography } from '@mui/material';

import { Body, Label } from '../typography';
import Section from '../section';
import { HeaderLogoLink } from '../header/HeaderLogoLink';

import { SocialLinks } from './SocialLinks';

export interface LinkItem {
  href: string;
  target?: '_blank' | '_self';
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
  footerItems: [FooterItemProps, FooterItemProps, FooterItemProps];
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
        <Grid container spacing={10}>
          <Grid item xs={12} lg={3}>
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
          <Grid item xs={12} md={4} lg={3}>
            <FooterItem
              title={footerItems[0].title}
              items={footerItems[0].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FooterItem
              title={footerItems[1].title}
              items={footerItems[1].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FooterItem
              title={footerItems[2].title}
              items={footerItems[2].items}
              linkComponent={LinkComponent}
            />
          </Grid>
        </Grid>

        <Box mt={[10, 16.25]}>
          <SocialLinks />
        </Box>
        <Box
          component="hr"
          sx={{
            borderTop: 1,
            borderColor: 'grey.50',
            mt: { xs: 10, sm: 19.75 },
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
            <Typography sx={{ typography: ['textMedium', 'textSmall'] }}>
              <LinkComponent href={termsUrl}>Terms</LinkComponent> |{' '}
              <LinkComponent href={privacyUrl}>Privacy</LinkComponent>
            </Typography>
          </Grid>
          <Grid item>
            <Body size="sm">© 2021 Regen Network Development, Inc</Body>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
};

export { Footer };
