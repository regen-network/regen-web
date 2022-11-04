import React from 'react';
import Section from '@regen-network/web-components/lib/components/section';
import { TitleBody } from '@regen-network/web-components/lib/components/text-layouts';
import { graphql, useStaticQuery } from 'gatsby';

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
