import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import styled from "styled-components"
import HomeLedger from "../sections/home-ledger"

const IndexPage = (): JSX.Element => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <HomeLedger></HomeLedger>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
