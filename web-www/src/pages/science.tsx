import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import TopSection from '../sections/science/TopSection';
import TitleDescriptionSection from '../sections/science/TitleDescriptionSection';
import OpenScienceSection from '../sections/science/OpenScienceSection';
import PartnershipsSection from '../sections/science/PartnershipsSection';
import CommunitySection from '../sections/science/CommunitySection';
import BlogSection from '../sections/shared/BlogSection';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';
import SEO from '../components/seo';

const SciencePage = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "science-newsletter-bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <>
      <SEO title="Science" />
      <TopSection />
      <TitleDescriptionSection />
      <OpenScienceSection />
      <PartnershipsSection />
      <CommunitySection />
      <EmailSubmitSection image={data.image.childImageSharp.fluid} />
      <BlogSection />
    </>
  );
};

export default SciencePage;
