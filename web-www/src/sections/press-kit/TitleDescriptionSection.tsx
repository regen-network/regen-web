import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(15),
    },
  },
}));

const TitleDescriptionSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: pressKitYaml {
            titleDescriptionSection {
              header
              description
            }
          }
        }
      `}
      render={data => {
        const content = data.content.titleDescriptionSection;
        return (
          <Section className={classes.root}>
            <TitleDescription title={content.header} description={content.description} />
          </Section>
        );
      }}
    />
  );
};

export default TitleDescriptionSection;
