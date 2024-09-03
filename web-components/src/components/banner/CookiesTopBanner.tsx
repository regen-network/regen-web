import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Cookies from 'js-cookie';

// TODO use Section component
import ContainedButton from '../buttons/ContainedButton';
import { Body } from '../typography';

interface CookiesTopBannerProps {
  acceptLabel: string;
  rejectLabel: string;
  children: ReactNode;
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

export default function CookiesTopBanner({
  acceptLabel,
  rejectLabel,
  children,
}: CookiesTopBannerProps): JSX.Element | null {
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
      <Backdrop open sx={{ zIndex: 100 }}>
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
            boxShadow: 7,
          })}
        >
          <Box
            sx={theme => ({
              display: 'flex',
              flexWrap: 'nowrap',
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
            <Body mobileSize="xs" pr={5}>
              {children}
            </Body>
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
                sx={({ spacing }) => ({
                  minWidth: [spacing(22), spacing(33.25)],
                  height: spacing(8.75),
                })}
              >
                {acceptLabel}
              </ContainedButton>
              <Body
                size="sm"
                onClick={reject}
                sx={{
                  color: 'info.main',
                  cursor: 'pointer',
                  textAlign: ['center', 'initial'],
                  pt: [2.5, 0],
                  pl: [null, 8.5],
                }}
              >
                {rejectLabel}
              </Body>
            </Box>
          </Box>
        </Box>
      </Backdrop>
    );
  }
  return null;
}
