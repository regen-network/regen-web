import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/';

import BackgroundSection from '../../components/BackgroundSection';
import TitleDescription from 'web-components/lib/components/title-description';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(25),
      paddingBottom: theme.spacing(37.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.75),
      paddingBottom: theme.spacing(15.25),
    },
  },
}));

const WhatSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "what-validators-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: validatorsYaml {
            whatSection {
              header
              body
            }
          }
        }
      `}
      render={data => {
        return (
          <BackgroundSection
            linearGradient="unset"
            className={classes.section}
            imageData={data.background.childImageSharp.fluid}
          >
            <TitleDescription title={data.text.whatSection.header} description={data.text.whatSection.body} />
          </BackgroundSection>
        );
      }}
    />
  );
};

export default WhatSection;
