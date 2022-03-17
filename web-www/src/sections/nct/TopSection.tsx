import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Title from 'web-components/lib/components/title';
import BackgroundSection from '../../components/BackgroundSection';
import { BlockContent } from 'web-components/src/components/block-content';

import type { NctTopSectionQuery } from '../../generated/graphql';

const query = graphql`
  query nctTopSection {
    sanityNctPage {
      topSection {
        title
        _rawBody
        image {
          ...fluidCustomImageFields_withWebp
        }
      }
    }
  }
`;

export const TopSection = (): JSX.Element => {
  const { sanityNctPage } = useStaticQuery<NctTopSectionQuery>(query);
  const data = sanityNctPage?.topSection;

  return (
    <BackgroundSection
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      header={
        <Title color="primary" variant="h1">
          {data?.title}
        </Title>
      }
      body={
        <BlockContent
          noYMargin
          content={data?._rawBody}
          sxWrap={{ '& p > a': { color: 'primary.main' } }}
        />
      }
      imageData={data?.image?.image?.asset?.fluid}
    />
  );
};
