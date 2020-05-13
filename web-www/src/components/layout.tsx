/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Header from 'web-components/lib/components/header';
import './layout.css';
import MenuHover from '../components/menuHover';
import { MenuItem, MenuList, Link } from '@material-ui/core';
import { UserProvider } from './UserContext';

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
      <UserProvider value={{ transparent: true, textColor: '#FFF' }}>
        <Header logo={logo} absolute={true}>
          <StyledMenuList>
            <StyledMenuItem>
              <Link href="">Buyers</Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link href="">Land Stewards</Link>
            </StyledMenuItem>
            <MenuItem>
              <MenuHover text="Learn More">
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
      </UserProvider>
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
