import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import TopSection from '../sections/science/TopSection';
import TitleDescriptionSection from '../sections/science/TitleDescriptionSection';
import OpenScienceSection from '../sections/science/OpenScienceSection';
import PartnershipsSection from '../sections/science/PartnershipsSection';
import CommunitySection from '../sections/science/CommunitySection';
import BlogSection from '../sections/shared/BlogSection';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';
import SEO from '../components/seo';

const SciencePage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "science.png" }) {
        publicURL
      }
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
      <SEO
        description="Regen Network is building an open, peer to peer scientific data and methodology commons in service to cutting edge earth observation science for climate action."
        title="Science"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
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
