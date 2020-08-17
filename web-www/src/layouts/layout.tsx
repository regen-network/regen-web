/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'web-components/lib/components/header';
import CookiesFooter from 'web-components/lib/components/fixed-footer/CookiesFooter';
import { useTheme } from '@material-ui/core/styles';
import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

interface HeaderColors {
  [key: string]: string;
}

interface HeaderProps {
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
  };

  const headerAbsolute: HeaderProps = {
    '/faq/': false,
  };

  const headerTransparent: HeaderProps = {
    '/faq/': false,
  };

  // Links in rest of the site must use the trailing '/' in order for these to work appropriately
  const headerNoBorderBottomPages: Array<string> = ['/', '/buyers/', '/land-stewards/'];

  const menuItems = [
    { title: 'Buyers', href: '/buyers' },
    { title: 'Land Stewards', href: '/land-stewards' },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/case-studies' },
        { title: 'Resources', href: '/resources' },
        { title: 'FAQ', href: '/faq' },
        { title: 'Team', href: '/team' },
      ],
    },
  ];
  const desktopColor: string = headerColors[location.pathname]
    ? headerColors[location.pathname]
    : theme.palette.primary.light;

  const absolute: boolean =
    headerAbsolute[location.pathname] !== undefined ? headerAbsolute[location.pathname] : true;
  const transparent: boolean =
    headerTransparent[location.pathname] !== undefined ? headerTransparent[location.pathname] : true;

  return (
    <>
      <Header
        menuItems={menuItems}
        transparent={transparent}
        absolute={absolute}
        color={desktopColor}
        borderBottom={!headerNoBorderBottomPages.includes(location.pathname)}
      />
      <div>
        <main>{children}</main>
        <footer></footer>
      </div>
      <CookiesFooter privacyUrl="/privacy-policy/" />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
