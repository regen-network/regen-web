import React from 'react';
import { useRouter } from 'next/router';

import CookiesTopBanner from 'web-components/src/components/banner/CookiesTopBanner';
import Footer from 'web-components/src/components/footer';

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
      <CookiesTopBanner privacyUrl="/privacy-policy/" TOSUrl="" />
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
