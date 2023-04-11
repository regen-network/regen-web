/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import CookiesFooter from 'web-components/lib/components/banner/CookiesBanner';
import Footer from 'web-components/lib/components/footer';

import { MarketingNav } from '@/components/organisms/MarketingNav/MarketingNav';
import { footerItems } from './Layout.config';
import { useLayoutStyles } from './Layout.styles';
import { useRouter } from 'next/router';

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
      <CookiesFooter privacyUrl="/privacy-policy/" TOSUrl="" />
      <footer>
        <Footer
          footerItems={footerItems}
          privacyUrl="/privacy-policy"
          termsUrl="/terms-service"
          apiUri={process.env.NEXT_PUBLIC_API_URI}
        />
      </footer>
    </>
  );
};

export default Layout;
