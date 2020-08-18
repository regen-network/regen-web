import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import Section from '../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  section: {},
}));

const CoreTeamSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: teamYaml {
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
  `);
  const classes = useStyles();
  return <Section className={classes.section}></Section>;
};

export default CoreTeamSection;
