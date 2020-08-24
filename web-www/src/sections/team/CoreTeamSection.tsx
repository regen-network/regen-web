import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';

const CoreTeamSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
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
  return <TeamSection members={members} title={title} />;
};

export default CoreTeamSection;
