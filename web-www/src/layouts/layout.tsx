/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { makeStyles } from '@mui/styles';
import CookiesFooter from '@regen-network/web-components/lib/components/banner/CookiesBanner';
import Footer, {
  FooterItemProps as FooterItem,
} from '@regen-network/web-components/lib/components/footer';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { PageProps } from 'gatsby';

import { MarketingNav } from '../components/MarketingNav';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
}));

const Layout: React.FC<PageProps> = ({ children, location }) => {
  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'get involved',
      items: [
        {
          title: 'Buyers',
          href: 'https://app.regen.network/buyers/',
        },
        {
          title: 'Land Stewards',
          href: 'https://app.regen.network/land-stewards/',
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
          title: 'Fund',
          href: '/fund/',
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
          href: 'https://regennetwork.notion.site/Careers-at-Regen-Network-fe7d9645a39843cfb7eaceb7171d95af',
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
          title: 'Developer Docs',
          href: 'https://docs.regen.network',
        },
      ],
    },
  ];
  const styles = useStyles();
  return (
    <>
      <MarketingNav location={location} />
      <div>
        <main className={styles.root}>{children}</main>
      </div>
      <CookiesFooter privacyUrl="/privacy-policy/" />
      <footer>
        <Footer
          footerItems={footerItems}
          privacyUrl="/privacy-policy"
          termsUrl="/terms-service"
          apiUri={process.env.GATSBY_API_URI}
        />
      </footer>
    </>
  );
};

export default Layout;
