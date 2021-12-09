import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';

const CoreTeamSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "team-bg.png" }) {
        publicURL
      }
      text: teamYaml {
        coreSection {
          title
          coreMembers {
            name
            title
            description
            image {
              extension
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
  const members = data.text.coreSection.coreMembers;
  const title = data.text.coreSection.title;
  return (
    <TeamSection
      alphabetized
      bgUrl={data.background.publicURL}
      members={members.map(m => ({ imgUrl: m.image.publicURL, ...m }))}
      title={title}
    />
  );
};

export default CoreTeamSection;
