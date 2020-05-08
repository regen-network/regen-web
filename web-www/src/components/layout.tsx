/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Header from 'web-components/lib/components/header';
import './layout.css';
import MenuHover from '../components/menuHover';
import { MenuItem, Link } from '@material-ui/core';

let logo = 'images/logo.png';
interface propTypes {
  children: Array<React.ReactElement>;
}

const Layout = ({ children }: propTypes): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header logo={logo}>
        <MenuHover text="Resources">
          <MenuItem>
            <Link href="https://github.com/regen-network">GitHub</Link>
          </MenuItem>
          <MenuItem>
            <Link href="whitepaper/WhitePaper.pdf">WhitePaper</Link>
          </MenuItem>
        </MenuHover>
      </Header>
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
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
