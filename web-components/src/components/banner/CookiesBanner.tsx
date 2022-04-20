import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Cookies from 'js-cookie';

// TODO use Section component
// import Section from '../section';
import ContainedButton from '../buttons/ContainedButton';
import { Theme } from '../../theme/muiTheme';
import { BodyText } from '../typography';
import { Box } from '@mui/material';

interface CookiesBannerProps {
  privacyUrl: string;
}

const rejectCookieName: string = 'cookies-rejected';
const cookieName: string =
  'gatsby-plugin-google-analytics-gdpr_cookies-enabled';

function getCookieValue(name: string): string | undefined {
  let cookieValue = Cookies.get(name);

  if (cookieValue === undefined) {
    cookieValue = Cookies.get(getLegacyCookieName(name));
  }
  return cookieValue;
}

function getLegacyCookieName(name: string): string {
  return `${name}-legacy`;
}

function setCookie(name: string, cookieValue: string): void {
  // const secure: boolean = window.location ? window.location.protocol === 'https:' : true;

  // const cookieOptions: CookieAttributes = { expires: 365, sameSite: 'None', secure };

  // Fallback for older browsers that can not set SameSite=None
  // https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
  // Cookies.set(getLegacyCookieName(cookieName), cookieValue, cookieOptions);

  // set the regular cookie
  Cookies.set(name, cookieValue, { expires: 730 });
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.secondary.main,
  },
  backdrop: {
    zIndex: 100,
  },
}));

export default function CookiesBanner({
  privacyUrl,
}: CookiesBannerProps): JSX.Element | null {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      getCookieValue(rejectCookieName) !== 'true' &&
      (getCookieValue(cookieName) === undefined ||
        getCookieValue(cookieName) === 'false')
    ) {
      setVisible(true);
    }
  }, [setVisible]);

  const accept = useCallback(() => {
    setCookie(cookieName, 'true');
    setVisible(false);
  }, []);

  const reject = useCallback(() => {
    setCookie(rejectCookieName, 'true');
    setVisible(false);
  }, []);

  if (visible) {
    return (
      <Backdrop className={classes.backdrop} open>
        <Box
          sx={theme => ({
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            backgroundColor: 'info.light',
            width: '100%',
            height: { sm: theme.spacing(19) },
            py: [5, 0],
            boxShadow: theme.shadows[7],
          })}
        >
          <Grid
            container
            sx={theme => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              m: '0 auto',
              maxWidth: theme.breakpoints.values.lg,
              px: {
                xs: 4,
                sm: 10,
                md: 37.5,
                xl: 5,
              },
              height: [theme.spacing(19), '100%'],
            })}
          >
            <BodyText mobileSize="xs">
              We use cookies to provide you with a great user experience. By
              using this site, you accept our use of{' '}
              <Link className={classes.link} href={privacyUrl}>
                cookies policy
              </Link>
              .
            </BodyText>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: ['column', 'row'],
              }}
            >
              <ContainedButton
                size="small"
                onClick={accept}
                sx={theme => ({
                  minWidth: [theme.spacing(22), theme.spacing(33.25)],
                })}
              >
                accept
              </ContainedButton>
              <BodyText
                size="sm"
                sx={{
                  color: 'info.main',
                  cursor: 'pointer',
                  textAlign: ['center', 'initial'],
                  pt: [2.5, 0],
                  pl: [null, 8.5],
                }}
              >
                Reject
              </BodyText>
            </Box>
          </Grid>
        </Box>
      </Backdrop>
    );
  }
  return null;
}
