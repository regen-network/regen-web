import React from 'react';
import { useStaticQuery, graphql, PageProps, StaticQuery } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/mainnet/TopSection';

interface Props extends PageProps {}

type QueryData = {
  background: {
    publicURL: string;
  };
};

const Mainnet = ({ location }: Props): JSX.Element => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      background: file(relativePath: { eq: "mainnet-globe.png" }) {
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
        location={location}
        description="With the help of our fantastic community and extraordinary team, mainnet is on the horizon!"
        title="For Buyers"
        imageUrl={data.background.publicURL}
      />
      <TopSection />
    </>
  );
};

export default Mainnet;
