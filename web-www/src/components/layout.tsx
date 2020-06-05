/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from 'web-components/lib/components/header';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import './layout.css';

let logo = 'images/logo.png';
interface propTypes {
  children: Array<React.ReactElement>;
  color: string;
}

const Layout = ({ children, color }: propTypes): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  //   const theme = useTheme();

  //   const url = typeof window !== 'undefined' ? window.location.href : '';

  //   let color = theme.palette.primary.contrastText;
  //   console.log(`url: ${url}`);
  //   if (url.includes('page')) {
  //     color = theme.palette.primary.main;
  //   }

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

  return (
    <>
      <Header menuItems={menuItems} absolute transparent color={color ? color : null}></Header>
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
