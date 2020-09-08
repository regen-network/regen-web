/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

import Header, { HeaderMenuItem } from 'web-components/lib/components/header';
import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';
import CookiesFooter from 'web-components/lib/components/fixed-footer/CookiesFooter';

import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

interface HeaderColors {
  [key: string]: string;
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
  };

  const headerTransparent: BoolProps = {
    '/faq/': false,
    '/team/': true,
    '/developers/': true,
  };

  const footerPaddingBottom: BoolProps = {
    '/buyers/': true,
    '/land-stewards/': true,
  };

  // Links in rest of the site must use the trailing '/' in order for these to work appropriately
  const headerNoBorderBottomPages: Array<string> = [
    '/',
    '/buyers/',
    '/land-stewards/',
    '/resources/',
    '/team/',
    '/developers/',
  ];

  const menuItems: HeaderMenuItem[] = [
    { title: 'Buyers', href: '/buyers/' },
    { title: 'Land Stewards', href: '/land-stewards/' },
    {
      title: 'Learn More',
      dropdownItems: [
        // { title: 'Case Studies', href: '/case-studies/' },
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
        // {
        //   title: 'Developers & Validators',
        //   href: '/developers/',
        // },
        // {
        //   title: 'Scientists & Verifiers',
        //   href: '/scientists/',
        // },
        {
          title: 'Invest',
          href: '/invest/',
        },
      ],
    },
    {
      title: 'learn more',
      items: [
        // {
        //   title: 'Case Studies',
        //   href: '/case-studies/',
        // },
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
        // {
        //   title: 'Contact',
        //   href: '/contact/',
        // },
      ],
    },
    {
      title: 'regen',
      items: [
        // {
        //   title: 'Partners',
        //   href: '/partners/',
        // },
        // {
        //   title: 'Media',
        //   href: '/media/',
        // },
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
        // {
        //   title: 'Press Kit',
        //   href: '/press-kit/',
        // },
      ],
    },
  ];

  return (
    <>
      <Header
        menuItems={menuItems}
        transparent={transparent}
        absolute={headerNoBorderBottomPages.includes(location.pathname)}
        color={desktopColor}
        borderBottom={!headerNoBorderBottomPages.includes(location.pathname)}
        pathname={location.pathname}
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
