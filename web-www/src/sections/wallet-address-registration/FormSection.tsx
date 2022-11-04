import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import { Body } from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import axios from 'axios';
import { graphql, useStaticQuery } from 'gatsby';

import type { WalletAddrRegFormSectionQuery } from '../../generated/graphql';
import WalletConnectionButton from './WalletConnectionButton';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(12),
    },
  },
  iframe: {
    display: 'flex',
    flex: 1,
    height: '1172px',
  },
  recaptcha: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(12),
  },
  flex: {
    display: 'flex',
  },
}));

const query = graphql`
  query walletAddrRegFormSection {
    sanityWalletAddressRegistrationPage {
      formSection {
        airtableLink
        recaptchaMessage
      }
    }
  }
`;

const FormSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityWalletAddressRegistrationPage } =
    useStaticQuery<WalletAddrRegFormSectionQuery>(query);
  const data = sanityWalletAddressRegistrationPage?.formSection;
  const [isRecaptchaVerified, setIsRecaptchaVerified] =
    useState<any>(undefined);
  const [isKeplrDetected, setIsKeplrDetected] = useState(false);
  const recaptchaSiteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    setTimeout(checkForKeplr, 300);
  });

  const verifyRecaptchaResponse = async (
    userResponse: string | null,
  ): Promise<void> => {
    const apiUri: string =
      process.env.GATSBY_API_URI || 'http://localhost:5000';
    axios
      .post(`${apiUri}/recaptcha/verify`, {
        userResponse,
      })
      .then(response => response.data)
      .then(data => setIsRecaptchaVerified(data.success))
      .catch(e => {
        console.error(e); // eslint-disable-line no-console
      });
  };

  const checkForKeplr = (): void => {
    if (!isKeplrDetected) {
      if (window && !!window.keplr) {
        setIsKeplrDetected(true);
      } else {
        setIsKeplrDetected(false);
      }
    }
  };

  return (
    <Section className={styles.section}>
      <div onMouseEnter={checkForKeplr}>
        <WalletConnectionButton isKeplrDetected={isKeplrDetected} />
        {recaptchaSiteKey && !isRecaptchaVerified && (
          <div className={styles.recaptcha}>
            <Body size="xl">
              <p>{data?.recaptchaMessage}</p>
            </Body>
            <ReCAPTCHA
              onChange={verifyRecaptchaResponse}
              sitekey={recaptchaSiteKey}
            />
          </div>
        )}
        <Collapse
          in={isRecaptchaVerified}
          classes={{ wrapperInner: styles.flex }}
        >
          <iframe
            className={styles.iframe}
            title="airtable-wallet-form"
            src={data?.airtableLink || ''}
          />
        </Collapse>
      </div>
    </Section>
  );
};

export default FormSection;
