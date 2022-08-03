import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import SEO from '../components/seo';
import TopSection from '../sections/press-kit//TopSection';
import AwardsSection from '../sections/press-kit/AwardsSection';
import ConnectSection from '../sections/press-kit/ConnectSection';
import EnableSection from '../sections/press-kit/EnableSection';
import FeaturedSection from '../sections/press-kit/FeaturedSection';
import LogosSection from '../sections/press-kit/LogosSection';
import PhotosSection from '../sections/press-kit/PhotosSection';
import TeamSection from '../sections/press-kit/PresskitTeamSection';
import TimelineSection from '../sections/press-kit/TimelineSection';
import TitleDescriptionSection from '../sections/press-kit/TitleDescriptionSection';

const PressKitPage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "press-kit-topo-bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  return (
    <>
      <SEO
        title="Press Kit"
        location={location}
        description="Regen Network aligns economics with ecology to drive regenerative land management."
      />
      <TopSection />
      <TitleDescriptionSection />
      <EnableSection />
      <TimelineSection />
      <TeamSection />
      <BackgroundImage fluid={data.background.childImageSharp.fluid}>
        <FeaturedSection />
        <AwardsSection />
        <LogosSection />
      </BackgroundImage>
      <ConnectSection />
      <PhotosSection />
    </>
  );
};

export default PressKitPage;
