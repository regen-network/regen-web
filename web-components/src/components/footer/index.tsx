import React from 'react';
import { Box, SxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import NewsletterForm from '../form/NewsletterForm';
import Section from '../section';
import { Body, Label } from '../typography';
import { SocialLinks } from './SocialLinks';

export interface FooterItemProps {
  title: string;
  items: { title: string; href: string; target?: string }[];
}

interface FooterProps {
  footerItems: [
    FooterItemProps,
    FooterItemProps,
    FooterItemProps,
    FooterItemProps,
  ];
  termsUrl: string;
  privacyUrl: string;
  apiUri?: string;
  subscribeText: string;
  termsText: string;
  privacyText: string;
  joinText: string;
  newsletterText: string;
  newsletterSuccessChildren: React.ReactNode;
  newsletterSubmitLabel: string;
  newsletterInputPlaceholder: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  textField: {
    paddingRight: theme.spacing(2.5),
    '& .MuiInputBase-root': {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(12.5),
    },
  },
  button: {
    height: '100%',
  },
  community: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
      marginTop: theme.spacing(16.25),
    },
  },
  footerItem: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(11.25),
    },
  },
}));

const sxs = {
  text: {
    color: 'primary.main',
    mb: {
      xs: 4.5,
      md: 3.75,
    },
  } as SxProps,
};

const FooterItem = ({ title, items }: FooterItemProps): JSX.Element => {
  const { classes } = useStyles();
  return (
    <div className={classes.footerItem}>
      <Label size="lg" mobileSize="sm" sx={sxs.text}>
        {title}
      </Label>
      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <ListItem
            sx={{
              lineHeight: { xs: '24px', sm: '27px' },
              py: 0.75,
              px: 0,
              ':first-of-type': { pt: 0 },
            }}
            key={index}
          >
            <Link
              href={item.href}
              rel="noopener noreferrer"
              target={item.target}
              sx={{ typography: ['textMedium', 'textLarge'] }}
            >
              {item.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default function Footer({
  footerItems,
  termsUrl,
  privacyUrl,
  subscribeText,
  newsletterText,
  newsletterInputPlaceholder,
  newsletterSubmitLabel,
  newsletterSuccessChildren,
  termsText,
  privacyText,
  joinText,
  apiUri = 'http://localhost:5000',
}: FooterProps): JSX.Element {
  const { classes } = useStyles();

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
        <Grid container>
          <Grid item xs={12} md={2}>
            <FooterItem
              title={footerItems[0].title}
              items={footerItems[0].items}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterItem
              title={footerItems[1].title}
              items={footerItems[1].items}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterItem
              title={footerItems[2].title}
              items={footerItems[2].items}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FooterItem
              title={footerItems[3].title}
              items={footerItems[3].items}
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.footerItem}>
            <Label size="lg" sx={sxs.text}>
              {subscribeText}
            </Label>
            <Body size="lg" color="primary.main">
              {newsletterText}
            </Body>
            <Box sx={{ pt: 4 }}>
              <NewsletterForm
                submitLabel={newsletterSubmitLabel}
                inputPlaceholder={newsletterInputPlaceholder}
                buttonClassName={classes.button}
                textFieldClassName={classes.textField}
                apiUri={apiUri}
                gridXs={{ textField: 7, button: 5 }}
                successChildren={newsletterSuccessChildren}
              />
            </Box>
          </Grid>
        </Grid>
        <SocialLinks className={classes.community} joinText={joinText} />
        <Box
          component="hr"
          sx={{
            borderTop: 1,
            borderColor: 'grey.50',
            mt: { xs: 10, md: 19.75 },
          }}
        />
        <Grid
          container
          sx={{
            mt: { xs: 6, md: 8.25 },
            mb: { xs: 9, md: 8.25 },
          }}
          justifyContent="space-between"
        >
          <Grid item>
            <Link variant="textSmall" href={termsUrl}>
              {termsText}
            </Link>{' '}
            |{' '}
            <Link variant="textSmall" href={privacyUrl}>
              {privacyText}
            </Link>
          </Grid>
          <Grid item>
            <Body sx={{ color: 'primary.main' }} size="sm">
              {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
              {`© ${new Date().getUTCFullYear()} Regen Network Development, PBC`}
            </Body>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}
