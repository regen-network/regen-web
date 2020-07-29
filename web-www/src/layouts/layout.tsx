/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'web-components/lib/components/header';
import { useTheme } from '@material-ui/core/styles';
import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

interface HeaderColors {
  [key: string]: string;
}

const Layout = ({ children, location }: propTypes): JSX.Element => {
  const theme = useTheme();

  const headerColors: HeaderColors = {
    '/': theme.palette.primary.main,
    '/land-stewards/': theme.palette.primary.main,
    '/buyers/': theme.palette.primary.light,
    '/privacy-policy/': theme.palette.primary.light,
    '/terms-service/': theme.palette.primary.light,
  };

  // Links in rest of the site must use the trailing '/' in order for these to work appropriately
  const headerBorderBottomPages: Array<string> = ['/privacy-policy/', '/terms-service/'];

  const menuItems = [
    { title: 'Buyers', href: '/buyers' },
    { title: 'Land Stewards', href: '/land-stewards' },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/case-studies' },
        { title: 'FAQ', href: '/faq' },
        { title: 'Team', href: '/team' },
      ],
    },
  ];
  const desktopColor: string = headerColors[location.pathname]
    ? headerColors[location.pathname]
    : theme.palette.primary.light;

  return (
    <>
      <Header
        menuItems={menuItems}
        transparent
        color={desktopColor}
        borderBottom={headerBorderBottomPages.includes(location.pathname)}
      />
      <div>
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
