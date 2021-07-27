/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';
import CookiesFooter from 'web-components/lib/components/banner/CookiesBanner';

import { MarketingNav } from '../components/MarketingNav';

import './layout.css';
interface Props {
  location: Location;
}

interface BoolProps {
  [key: string]: boolean;
}

const Layout: React.FC<Props> = ({ children, location }) => {
  const footerPaddingBottom: BoolProps = {
    '/buyers/': true,
    '/land-stewards/': true,
  };

  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'get involved',
      items: [
        {
          title: 'Buyers',
          href: '/buyers/',
        },
        {
          title: 'Land Stewards',
          href: '/land-stewards/',
        },
        {
          title: 'Community',
          href: '/community/',
        },
        {
          title: 'Developers',
          href: '/developers/',
        },
        {
          title: 'Scientists',
          href: '/science/',
        },
        {
          title: 'Validators',
          href: '/validators/',
        },
      ],
    },
    {
      title: 'learn more',
      items: [
        {
          title: 'Case Studies',
          href: '/case-studies/',
        },
        {
          title: 'Resources',
          href: '/resources/',
        },
        {
          title: 'FAQ',
          href: '/faq/',
        },
        {
          title: 'Team',
          href: '/team/',
        },
        {
          title: 'Contact',
          href: '/contact/',
        },
      ],
    },
    {
      title: 'regen',
      items: [
        {
          title: 'Partners',
          href: '/partners/',
        },
        {
          title: 'Media',
          href: '/media/',
        },
        {
          title: 'Careers',
          href: 'https://apply.workable.com/regen-network/',
          target: '_blank',
        },
        {
          title: 'Forum',
          href: 'https://forum.regen.network/',
          target: '_blank',
        },
        {
          title: 'Press Kit',
          href: '/press-kit/',
        },
        {
          title: 'Invest',
          href: '/invest/',
        },
      ],
    },
  ];
  return (
    <>
      <MarketingNav location={location} />
      <div>
        <main>{children}</main>
      </div>
      <CookiesFooter privacyUrl="/privacy-policy/" />
      <footer>
        <Footer
          footerItems={footerItems}
          privacyUrl="/privacy-policy"
          termsUrl="/terms-service"
          apiUri={process.env.GATSBY_API_URI}
          paddingBottom={footerPaddingBottom[location.pathname]}
        />
      </footer>
    </>
  );
};

export default Layout;
