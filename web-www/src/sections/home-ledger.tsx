import React from "react"
import BackgroundImage from "gatsby-background-image"
import clsx from "clsx"
import { graphql, StaticQuery, useStaticQuery } from "gatsby"
import Grid, { GridSpacing } from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import Img from "gatsby-image"

let useStyles = makeStyles({
  section: {
    height: "40vh",
    "font-size": "0.75rem",
    "padding-top": "10vh",
  },
})

interface Props {
  className?: string
}

const HomeLedger = ({ className }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "farm-background.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      ledger: file(relativePath: { eq: "ledger.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 300) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  let classes = useStyles()
  return (
    <BackgroundImage
      Tag="section"
      className={clsx(classes.section, className)}
      fluid={data.bg.childImageSharp.fluid}
    >
      <Grid className={classes.grid} container spacing={3}>
        <Grid item sm={4}>
          <Img fixed={data.ledger.childImageSharp.fixed}></Img>
        </Grid>
        <Grid item sm={8}>
          <h2>The Regen Ledger powers our work</h2>
          <p>
            Regen Ledger is a public, proof of stake (POS) blockchain developed
            with the Cosmos Software Development Kit (SDK) built for
            verification of claims, agreements & data related to ecological
            state. Regen Ledger enables multiple registries to communicate and
            transact with each other producing a public ecological accounting
            system. Get involved with our community of developers.
          </p>
        </Grid>
      </Grid>
    </BackgroundImage>
  )
}

export default HomeLedger
