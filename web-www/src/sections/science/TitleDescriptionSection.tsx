import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Box from '@material-ui/core/Box';
import Img from 'gatsby-image';

import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';

const TitleDescriptionSection = (): JSX.Element => {
  return (
    <StaticQuery
      query={graphql`
        query {
          content: scienceYaml {
            titleDescriptionSection {
              header
              description
              imageMobile {
                childImageSharp {
                  fluid(quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              imageDesktop {
                childImageSharp {
                  fluid(quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.titleDescriptionSection;
        return (
          <Section>
            <TitleDescription title={content.header} description={content.description}>
              <Box display={{ xs: 'none', sm: 'block' }}>
                <Img fluid={content.imageDesktop.childImageSharp.fluid} />
              </Box>
              <Box display={{ xs: 'block', sm: 'none' }}>
                <Img fluid={content.imageMobile.childImageSharp.fluid} />
              </Box>
            </TitleDescription>
          </Section>
        );
      }}
    />
  );
};

export default TitleDescriptionSection;
