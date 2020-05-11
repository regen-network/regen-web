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
import { MenuItem, MenuList, Link } from '@material-ui/core';

let logo = 'images/logo.png';
interface propTypes {
  children: Array<React.ReactElement>;
}

let StyledMenuItem = styled(MenuItem)`
  a {
    color: #000;
  }
`;

let StyledMenuList = styled(MenuList)`
  display: flex;
`;

let StyledMenuHover = styled(MenuHover)`
  div {
    width: auto;
    overflow: hidden;
    font-size: 1rem;
    box-sizing: border-box;
    min-height: 48px;
    font-family: 'Lato', -apple-system, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    padding-top: 6px;
    white-space: nowrap;
    padding-bottom: 6px;
  }
`;

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
        <StyledMenuList>
          <StyledMenuItem>
            <Link href="">Buyers</Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link href="">Land Stewards</Link>
          </StyledMenuItem>
          <MenuItem>
            <MenuHover color="black" text="Learn More">
              <MenuItem>
                <Link href="https://regen.network/#">Case Studies</Link>
              </MenuItem>
              <MenuItem>
                <Link href="https://regen.network/#">FAQ</Link>
              </MenuItem>
              <MenuItem>
                <Link href="https://regen.network/#">Team</Link>
              </MenuItem>
            </MenuHover>
          </MenuItem>
        </StyledMenuList>
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
