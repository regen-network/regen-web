import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';
import Typography from '@material-ui/core/Typography';
import Title from 'web-components/lib/components/title';

interface props {
  location: object;
}

const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {},
}));

const TopSection = ({ location }: props): JSX.Element => {
  const classes = useStyles({});
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "community-header.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: communityYaml {
        topSection {
          header
          body
        }
      }
    }
  `);
  const imageData = data.desktop.childImageSharp.fluid;
  const content = data.text.topSection;
  return (
    <>
      <BackgroundSection
        linearGradient="linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%), linear-gradient(235.95deg, rgba(250, 235, 209, 0.7) 22.17%, rgba(125, 201, 191, 0.7) 46.11%, rgba(81, 93, 137, 0.7) 70.05%)"
        header={content.header}
        imageData={imageData}
      >
        <Title variant="h1" align="left">
          {content.header}
        </Title>
        <Typography>{content.body}</Typography>
      </BackgroundSection>
    </>
  );
};

export default TopSection;
