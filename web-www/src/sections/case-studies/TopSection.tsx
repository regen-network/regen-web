import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { CaseStudyTopSectionQuery } from '../../generated/graphql';

const query = graphql`
  query caseStudyTopSection {
    background: file(relativePath: { eq: "case-studies-top-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityCaseStudiesPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection: React.FC = () => {
  const gradient =
    'linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)';

  const { background, sanityCaseStudiesPage: data } =
    useStaticQuery<CaseStudyTopSectionQuery>(query);

  return (
    <BackgroundSection
      linearGradient={gradient}
      header={data?.topSection?.title || ''}
      body={data?.topSection?.body || ''}
      imageData={background?.childImageSharp?.fluid as any}
    />
  );
};

export default TopSection;
