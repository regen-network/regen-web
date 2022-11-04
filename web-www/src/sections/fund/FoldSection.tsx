import React from 'react';
import Section from '@regen-network/web-components/lib/components/section';
import { TitleBody } from '@regen-network/web-components/lib/components/text-layouts';
import { graphql, useStaticQuery } from 'gatsby';

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
