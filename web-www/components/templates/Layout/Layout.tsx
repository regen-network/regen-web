import React from 'react';
import { useRouter } from 'next/router';

import Footer from 'web-components/src/components/footer';

import { footerItems } from './Layout.config';
import { LayoutCookiesTopBanner } from './Layout.CookiesTopBanner';
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
      <LayoutCookiesTopBanner />
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
