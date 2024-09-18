import React from 'react';
import { useRouter } from 'next/router';

import Footer from 'web-components/src/components/footer';
import { Body } from 'web-components/src/components/typography';

import { footerItems } from './Layout.config';
import { LayoutCookiesTopBanner } from './Layout.CookiesTopBanner';
import { useLayoutStyles } from './Layout.styles';

import { MarketingNav } from '@/components/organisms/MarketingNav/MarketingNav';
import {
  INVALID_EMAIL_MESSAGE,
  REQUIRED_MESSAGE,
} from '@/lib/constants/shared.constants';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { classes: styles } = useLayoutStyles();
  const router = useRouter();
  const location = { pathname: router.pathname };

  return (
    <>
      <MarketingNav location={location} />
      <div>
        <main className={styles.root}>{children}</main>
      </div>
      <LayoutCookiesTopBanner />
      <footer>
        <Footer
          footerItems={footerItems}
          privacyUrl="/privacy-policy"
          termsUrl="/terms-service"
          apiUri={process.env.NEXT_PUBLIC_API_URI}
          newsletterText="Stay up to date! Sign up for our monthly newsletter."
          subscribeText="subscribe"
          termsText="Terms"
          privacyText="Privacy"
          joinText="join the community"
          newsletterInputPlaceholder="Your email"
          newsletterSubmitLabel="subscribe"
          newsletterSuccessChildren={
            <>
              <Body color="primary.main" align="center">
                Thank you!
              </Body>
              <Body color="primary.main" align="center">
                You have successfully joined our subscriber list.
              </Body>
            </>
          }
          requiredMessage={REQUIRED_MESSAGE}
          invalidEmailMessage={INVALID_EMAIL_MESSAGE}
        />
      </footer>
    </>
  );
};

export default Layout;
