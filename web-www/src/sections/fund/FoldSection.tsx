import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/lib/components/section';
import TitleDescription from 'web-components/lib/components/title-description';

type QueryData = {
  text: {
    foldSection: {
      title: string;
      body: string;
    };
  };
};

const FoldSection = (): JSX.Element => {
  const {
    text: {
      foldSection: { title, body },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: fundYaml {
        foldSection {
          title
          body
        }
      }
    }
  `);

  return (
    <Section>
      <TitleDescription title={title} description={body} />
    </Section>
  );
};

export default FoldSection;
