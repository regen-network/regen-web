import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/src/components/section';
import TitleDescription from 'web-components/src/components/title-description';
import { FundThesisSectionQuery } from '../../generated/graphql';

const query = graphql`
  query fundThesisSection {
    sanityFundPage {
      thesisSection {
        title
        _rawBody
      }
    }
  }
`;

const ThesisSection = (): JSX.Element => {
  const { sanityFundPage } = useStaticQuery<FundThesisSectionQuery>(query);
  const data = sanityFundPage?.thesisSection;

  return (
    <Section>
      <TitleDescription title={data?.title || ''} description={data?._rawBody} />
    </Section>
  );
};

export default ThesisSection;
