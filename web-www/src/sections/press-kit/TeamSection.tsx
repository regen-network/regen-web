import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import TeamSection from 'web-components/lib/components/team-section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const PressKitTeamSection = (): JSX.Element => {
  return (
    <StaticQuery
      query={graphql`
        query {
          teamBackground: file(relativePath: { eq: "press-kit-team-bg.png" }) {
            publicURL
          }
          background: file(relativePath: { eq: "waterfall-bg.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: pressKitYaml {
            teamSection {
              header
              buttonText
              members {
                name
                title
                image {
                  publicURL
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.teamSection;
        return (
          <BackgroundImage fluid={data.background.childImageSharp.fluid}>
            <TeamSection
              gridMd={3}
              bgUrl={data.teamBackground.publicURL}
              members={content.members.map(m => ({ imgUrl: m.image.publicURL, ...m }))}
              title={content.header}
            >
              <ContainedButton href="/team">{content.buttonText}</ContainedButton>
            </TeamSection>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default PressKitTeamSection;
