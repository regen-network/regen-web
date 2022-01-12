import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, Collapse } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import WalletConnectionButton from './WalletConnectionButton';
import { FontSizes } from 'web-components/lib/theme/sizing';
import { WalletAddrRegFormSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(2),
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
  const { sanityWalletAddressRegistrationPage } = useStaticQuery<WalletAddrRegFormSectionQuery>(query);
  const data = sanityWalletAddressRegistrationPage?.formSection;
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState<any>(undefined);
  const [isKeplrDetected, setIsKeplrDetected] = useState(false);
  const recaptchaSiteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY;
  const fontSize: FontSizes = { xs: '1rem', sm: '1.375rem' };

  useEffect(() => {
    setTimeout(checkForKeplr, 300);
  });

  const verifyRecaptchaResponse = async (userResponse: string | null): Promise<void> => {
    const apiUri: string = process.env.GATSBY_API_URI || 'http://localhost:5000';
    axios
      .post(`${apiUri}/recaptcha/verify`, {
        userResponse,
      })
      .then(response => response.data)
      .then(data => setIsRecaptchaVerified(data.success))
      .catch(e => {
        console.error(e);
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
            <Description fontSize={fontSize}>
              <p>{data?.recaptchaMessage}</p>
            </Description>
            <ReCAPTCHA onChange={verifyRecaptchaResponse} sitekey={recaptchaSiteKey} />
          </div>
        )}
        <Collapse in={isRecaptchaVerified} classes={{ wrapperInner: styles.flex }}>
          <iframe className={styles.iframe} title="airtable-wallet-form" src={data?.airtableLink || ''} />
        </Collapse>
      </div>
    </Section>
  );
};

export default FormSection;
