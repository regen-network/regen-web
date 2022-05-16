import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/lib/components/section';
import { TitleBody } from 'web-components/lib/components/text-layouts';
import { FundFoldSectionQuery } from '../../generated/graphql';

const query = graphql`
  query fundFoldSection {
    sanityFundPage {
      foldSection {
        title
        _rawBody
      }
    }
  }
`;

const FoldSection = (): JSX.Element => {
  const { sanityFundPage } = useStaticQuery<FundFoldSectionQuery>(query);
  const data = sanityFundPage?.foldSection;

  return (
    <Section>
      <TitleBody
        title={data?.title || ''}
        body={data?._rawBody}
        sx={{ root: { '& > div': { pb: 0 } } }}
      />
    </Section>
  );
};

export default FoldSection;
