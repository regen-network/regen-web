import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    backgroundColor: `${theme.palette.grey[50]}`,
    border: `1px solid ${theme.palette.info.light}`,
  },
}));

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
  const classes = useStyles();
  const members = data.text.contributorSection.contributors;
  const title = data.text.contributorSection.title;
  return <TeamSection className={classes.section} members={members} title={title} />;
};

export default ContributorSection;
