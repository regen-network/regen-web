import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';

import { BodyText, ButtonText } from '../typography';
import Section from '../section';
import NewsletterForm from '../form/NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { Box, SxProps } from '@mui/material';

export interface FooterItemProps {
  title: string;
  items: { title: string; href: string; target?: string }[];
}

interface FooterProps {
  footerItems: [FooterItemProps, FooterItemProps, FooterItemProps];
  termsUrl: string;
  privacyUrl: string;
  apiUri?: string;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  textField: {
    paddingRight: theme.spacing(2.5),
    '& .MuiInputBase-root': {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(12.5),
    },
  },
  button: {
    fontSize: theme.spacing(3.5),
    height: theme.spacing(12.5),
    padding: theme.spacing(2.5),
  },
  community: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: theme.spacing(16.25),
    },
  },
  footerItem: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(11.25),
    },
  },
}));

const sxs = {
  btn: {
    mb: {
      xs: 4.5,
      sm: 3.75,
    },
  } as SxProps,
};

const FooterItem = ({ title, items }: FooterItemProps): JSX.Element => {
  const classes = useStyles({});
  return (
    <div className={classes.footerItem}>
      <ButtonText size="lg" sx={sxs.btn}>
        {title}
      </ButtonText>
      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <ListItem sx={{ py: 0.75, px: 0 }} key={index}>
            <Link
              href={item.href}
              rel="noopener noreferrer"
              target={item.target}
              sx={{
                fontSize: [16, 18],
                lineHeight: '150%',
              }}
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
  apiUri = 'http://localhost:5000',
}: FooterProps): JSX.Element {
  const classes = useStyles({ paddingBottom: false });

  return (
    <Box sx={{ backgroundColor: 'info.dark', color: 'primary.main' }}>
      <Section>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <FooterItem
              title={footerItems[0].title}
              items={footerItems[0].items}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FooterItem
              title={footerItems[1].title}
              items={footerItems[1].items}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FooterItem
              title={footerItems[2].title}
              items={footerItems[2].items}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.footerItem}>
            <ButtonText size="lg" sx={sxs.btn}>
              subscribe
            </ButtonText>
            <BodyText size="lg">
              Stay up to date! Sign up for our monthly newsletter.
            </BodyText>
            <Box sx={{ pt: 4 }}>
              <NewsletterForm
                submitLabel="subscribe"
                buttonClassName={classes.button}
                textFieldClassName={classes.textField}
                apiUri={apiUri}
                gridXs={{ textField: 7, button: 5 }}
              />
            </Box>
          </Grid>
        </Grid>
        <SocialLinks className={classes.community} />
        <Box
          component="hr"
          sx={{
            borderTop: 1,
            borderColor: 'grey.50',
            mt: { xs: 10, sm: 19.75 },
          }}
        />
        <Grid
          container
          sx={{
            mt: { xs: 6, sm: 8.25 },
            mb: { xs: 9, sm: 8.25 },
          }}
          justifyContent="space-between"
        >
          <Grid item>
            <Link variant="textSmall" href={termsUrl}>
              Terms
            </Link>{' '}
            |{' '}
            <Link variant="textSmall" href={privacyUrl}>
              Privacy
            </Link>
          </Grid>
          <Grid item>
            <BodyText size="sm">© 2021 Regen Network Development, Inc</BodyText>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}
