import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TeamSection from 'web-components/lib/components/team-section';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: `${theme.palette.grey[50]}`,
    borderTop: `1px solid ${theme.palette.info.light}`,
    borderBottom: `1px solid ${theme.palette.info.light}`,
  },
}));

const ContributorSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "team-bg.png" }) {
        publicURL
      }
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
  return (
    <div className={classes.root}>
      <TeamSection
        alphabetized
        bgUrl={data.background.publicURL}
        members={members.map(m => ({ imgUrl: m.image.publicURL, ...m }))}
        title={title}
      />
    </div>
  );
};

export default ContributorSection;
