import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Img from "gatsby-image";
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  // root: {
  // },
  image: {
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
    },
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "investing-land-stewards.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: contentYaml {
        investingSection {
          header
          items {
            image {
              childImageSharp {
                fixed(quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
              extension
              publicURL
            }
            caption
            header
            description
            note
          }
        }
      }
    }
  `);
  const classes = useStyles();

  const content = data.text.investingSection;
  const imageData = data.background.childImageSharp.fluid;

  return (
    <BackgroundImage Tag="section" className={classes.image} fluid={imageData} backgroundColor="#040e18">
      <Section title={content.header}></Section>
    </BackgroundImage>
  );
};

export default ApproachSection;
