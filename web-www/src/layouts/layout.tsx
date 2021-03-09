/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

import Header, { HeaderColors, HeaderMenuItem } from 'web-components/lib/components/header';
import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';
import CookiesFooter from 'web-components/lib/components/banner/CookiesBanner';

import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

interface BoolProps {
  [key: string]: boolean;
}

const Layout = ({ children, location }: propTypes): JSX.Element => {
  const theme = useTheme();

  const headerColors: HeaderColors = {
    '/': theme.palette.primary.main,
    '/land-stewards/': theme.palette.primary.main,
    '/buyers/': theme.palette.primary.light,
    '/resources/': theme.palette.primary.main,
    '/privacy-policy/': theme.palette.primary.light,
    '/terms-service/': theme.palette.primary.light,
    '/team/': theme.palette.primary.light,
    '/developers/': theme.palette.primary.main,
    '/invest/': theme.palette.primary.light,
    '/science/': theme.palette.primary.main,
    '/validators/': theme.palette.primary.main,
    '/community/': theme.palette.primary.main,
    '/wallet-address-registration/': theme.palette.primary.light,
    '/mainnet/': theme.palette.primary.light,
  };

  const headerTransparent: BoolProps = {
    '/faq/': false,
  };

  const footerPaddingBottom: BoolProps = {
    '/buyers/': true,
    '/land-stewards/': true,
  };

  // Links in rest of the site must use the trailing '/'
  // in order for these to work appropriately
  const headerNoBorderBottomPages: RegExp = new RegExp(
    '//|/buyers/|/partners/|/contact/|/validators/|/land-stewards/|/resources/|/media/|/team/|/developers/|/science/|/invest/|/case-studies/|/press-kit/|/community/|/wallet-address-registration/|/case-studies/[a-z-]+//',
  );

  const menuItems: HeaderMenuItem[] = [
    { title: 'Mainnet', href: '/mainnet/' },
    { title: 'Buyers', href: '/buyers/' },
    { title: 'Land Stewards', href: '/land-stewards/' },
    {
      title: 'Community',
      dropdownItems: [
        { title: 'Community Overview', href: '/community/' },
        { title: 'Developers', href: '/developers/' },
        { title: 'Scientists', href: '/science/' },
        { title: 'Validators', href: '/validators/' },
      ],
    },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/case-studies/' },
        { title: 'Resources', href: '/resources/' },
        { title: 'FAQ', href: '/faq/' },
        { title: 'Team', href: '/team/' },
      ],
    },
  ];

  const desktopColor: string = headerColors[location.pathname]
    ? headerColors[location.pathname]
    : theme.palette.primary.light;

  const transparent: boolean =
    headerTransparent[location.pathname] !== undefined ? headerTransparent[location.pathname] : true;

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
          href: 'http://forum.goatech.org/c/regen-network/19',
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
      <Header
        menuItems={menuItems}
        transparent={transparent}
        absolute={location.pathname === '/' || headerNoBorderBottomPages.test(location.pathname)}
        color={desktopColor}
        borderBottom={location.pathname !== '/' && !headerNoBorderBottomPages.test(location.pathname)}
        pathName={location.pathname}
      />
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
