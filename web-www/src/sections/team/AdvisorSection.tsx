import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';

const AdvisorSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "team-bg.png" }) {
        publicURL
      }
      text: teamYaml {
        advisorSection {
          title
          advisors {
            name
            title
            image {
              publicURL
            }
            linkedUrl
            twitterUrl
            githubUrl
          }
        }
      }
    }
  `);
  const members = data.text.advisorSection.advisors;
  const title = data.text.advisorSection.title;
  return (
    <TeamSection
      bgUrl={data.background.publicURL}
      members={members.map(m => ({ imgUrl: m.image.publicURL, ...m }))}
      title={title}
    />
  );
};

export default AdvisorSection;
