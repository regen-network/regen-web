import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({}));

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
          <Section>
            <TitleDescription title={content.header} description={content.description} />
          </Section>
        );
      }}
    />
  );
};

export default TitleDescriptionSection;
