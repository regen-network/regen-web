import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';

const ContributorSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: teamYaml {
        contributorSection {
          title
          contributors {
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
  const members = data.text.contributorSection.contributors;
  const title = data.text.contributorSection.title;
  return <TeamSection members={members} title={title} />;
};

export default ContributorSection;
