import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/src/components/section';
import { TitleBody } from 'web-components/src/components/text-layouts';
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
      <TitleBody title={data?.title || ''} body={data?._rawBody} />
    </Section>
  );
};

export default ThesisSection;
