import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/src/components/section';
import TitleDescription from 'web-components/src/components/title-description';

type QueryData = {
  text: {
    thesisSection: {
      title: string;
      body: string;
    };
  };
};

const ThesisSection = (): JSX.Element => {
  const {
    text: {
      thesisSection: { title, body },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: fundYaml {
        thesisSection {
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

export default ThesisSection;
