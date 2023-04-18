import React from 'react';
import { useRouter } from 'next/router';

import CookiesFooter from 'web-components/lib/components/banner/CookiesBanner';
import Footer from 'web-components/lib/components/footer';

import { footerItems } from './Layout.config';
import { useLayoutStyles } from './Layout.styles';

import { MarketingNav } from '@/components/organisms/MarketingNav/MarketingNav';

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
