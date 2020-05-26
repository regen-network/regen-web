/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes, { string } from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Header from "web-components/lib/components/header"
import "./layout.css"

let logo = "images/logo.png"
interface propTypes {
  children: Array<React.ReactElement>
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
  `)

  const url = typeof window !== "undefined" ? window.location.href : ""

  let color = "#000"
  if (url.includes("page")) {
    color = "#fff"
  }

  return (
    <>
      <Header
        transparent={true}
        color={color}
        logo={logo}
        absolute={true}
      ></Header>
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
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
