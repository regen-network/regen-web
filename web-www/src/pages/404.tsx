import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import NotFound from 'web-components/lib/components/not-found';

interface props {
  location: object;
}

const NotFoundPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      grazing: file(relativePath: { eq: "rotational-grazing.png" }) {
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
      <SEO location={location} title="404: Not found" />
      <NotFound img={<Img fluid={data.grazing.childImageSharp.fluid} />} />
    </>
  );
};

export default NotFoundPage;
