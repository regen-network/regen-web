/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes, { string } from 'prop-types';
import Header from 'web-components/lib/components/header';
import { useTheme } from '@material-ui/core/styles';
import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
}

const Layout = ({ children }: propTypes): JSX.Element => {
  const theme = useTheme();
  const menuItems = [
    { title: 'Buyers', href: '/buyers' },
    { title: 'Land Steward', href: '/landsteward' },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/casestudies' },
        { title: 'FAQ', href: '/faq' },
        { title: 'Team', href: '/team' },
      ],
    },
  ];
  const color = theme.palette.primary.main;
  return (
    <>
      <Header menuItems={menuItems} absolute transparent color={color ? color : undefined}></Header>
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
