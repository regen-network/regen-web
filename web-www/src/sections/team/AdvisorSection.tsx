import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';

const AdvisorSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: teamYaml {
        advisorSection {
          title
          advisors {
            name
            title
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
  const members = data.text.advisorSection.advisors;
  const title = data.text.advisorSection.title;
  return <TeamSection members={members} title={title} />;
};

export default AdvisorSection;
